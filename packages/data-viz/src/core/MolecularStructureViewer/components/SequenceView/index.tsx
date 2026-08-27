import { Tooltip, defaultTheme, getSpaces } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { OrderedSet } from "molstar/lib/mol-data/int";
import { EveryLoci } from "molstar/lib/mol-model/loci";
import {
  Structure,
  StructureElement,
  StructureProperties,
  Unit,
} from "molstar/lib/mol-model/structure";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { PluginStateObject as PSO } from "molstar/lib/mol-plugin-state/objects";
import { PluginUIComponent } from "molstar/lib/mol-plugin-ui/base";
import {
  getChainOptions,
  getModelEntityOptions,
  getOperatorOptions,
  getSequenceWrapper,
  getStructureOptions,
  type SequenceView as MolstarSequenceView,
} from "molstar/lib/mol-plugin-ui/sequence";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { PluginCommands } from "molstar/lib/mol-plugin/commands";
import { Representation } from "molstar/lib/mol-repr/representation";
import { StateSelection } from "molstar/lib/mol-state/state/selection";
import { arrayEqual } from "molstar/lib/mol-util";
import {
  ButtonsType,
  getButton,
  getButtons,
  getModifiers,
  type ModifiersKeys,
} from "molstar/lib/mol-util/input/input-observer";
import type { MarkerAction } from "molstar/lib/mol-util/marker-action";
import { ParamDefinition as PD } from "molstar/lib/mol-util/param-definition";
import { Component, ComponentClass, createRef } from "react";
import { Subject } from "rxjs";
import { distinctUntilChanged, skip, throttleTime } from "rxjs/operators";
import {
  ResidueColors,
  ThemeModeSubject,
  residueColorsForMode,
  themeForMode,
} from "../../utils/theme";
import {
  CopyButton,
  EmptyState,
  PanelHeader,
  PanelTitle,
  ResidueCount,
  ResidueCountLabel,
  ResidueCountValue,
  SequencePanel,
  SequenceScrollArea,
  SequenceScroller,
} from "./style";

/** Residues are laid out in fixed-size sections that never split across lines. */
const SEQUENCE_GROUP_SIZE = 10;

/** Attribute carrying a residue's sequence index, used for hit testing. */
const SEQ_ID_ATTR = "data-seqid";

/** Hover updates are coalesced to roughly one every three frames. */
const HOVER_THROTTLE_MS = 3 * 16.666;

/** How long the copy button shows its confirmation state. */
const COPIED_FEEDBACK_MS = 2000;

const CAMERA_RESET_DURATION_MS = 250;

/**
 * Pull the tooltip toward the residue by the SDS `m` spacing token. Spacing
 * tokens are theme-invariant, so reading from the light theme is fine; popper's
 * offset modifier needs a number, hence deriving it from the token.
 */
const TOOLTIP_MAIN_AXIS_OFFSET = -(getSpaces({ theme: defaultTheme })?.m ?? 12);

type ResidueTooltipState = { anchorEl: HTMLElement | null; label: string };

/**
 * A single controlled tooltip anchored to the residue span currently under the
 * cursor. Kept as its own component and driven imperatively via a ref so that
 * hover updates re-render only the tooltip, not the residue grid.
 */
class ResidueTooltip extends Component<object, ResidueTooltipState> {
  state: ResidueTooltipState = { anchorEl: null, label: "" };

  show(anchorEl: HTMLElement, label: string) {
    this.setState({ anchorEl, label });
  }

  hide() {
    if (this.state.anchorEl !== null) this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl, label } = this.state;

    return (
      <Tooltip
        arrow
        disableInteractive
        open={anchorEl !== null}
        placement="top"
        // The child below is a required MUI anchor placeholder; the popper is
        // positioned against the hovered residue span passed in via anchorEl.
        // The negative offset pulls the tooltip closer to the residue than the
        // default gap.
        slotProps={{
          popper: {
            anchorEl,
            modifiers: [
              {
                name: "offset",
                options: { offset: [0, TOOLTIP_MAIN_AXIS_OFFSET] },
              },
            ],
          },
        }}
        title={label}
      >
        <span style={{ height: 0, position: "fixed", width: 0 }} />
      </Tooltip>
    );
  }
}

/**
 * Nearest ancestor that scrolls vertically, or null if none. Used to scope the
 * residue tooltip's hide-on-scroll listener to the sequence's own overflow
 * container instead of a global window listener.
 */
/** Reads the sequence index off a residue span, or undefined if it is not one. */
function readSeqIdx(el: HTMLElement | null): number | undefined {
  if (!el || !el.getAttribute) return undefined;
  return el.hasAttribute(SEQ_ID_ATTR)
    ? +(el.getAttribute(SEQ_ID_ATTR) as string)
    : undefined;
}

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") return el;
    el = el.parentElement;
  }
  return null;
}

interface SequenceProps {
  sequenceWrapper: SequenceWrapper.Any;
  /**
   * Residue colors resolved from the active theme. Passed in rather than read
   * from context because `updateMarker` writes them straight to the DOM.
   */
  residueColors: ResidueColors;
  sequenceNumberPeriod?: number;
  hideSequenceNumbers?: boolean;
}

/** Interactive residue grid, kept in sync with the 3D view's hover and selection. */
class Sequence<P extends SequenceProps> extends PluginUIComponent<P> {
  protected parentDiv = createRef<HTMLDivElement>();

  protected tooltipRef = createRef<ResidueTooltip>();

  protected scrollTarget: HTMLElement | null = null;

  protected lastMouseOverSeqIdx = -1;

  protected mouseDownLoci: StructureElement.Loci | undefined = undefined;

  protected location = StructureElement.Location.create(void 0);

  protected highlightQueue = new Subject<{
    seqIdx: number;
    buttons: number;
    button: number;
    modifiers: ModifiersKeys;
  }>();

  protected lociHighlightProvider = (
    loci: Representation.Loci,
    action: MarkerAction
  ) => {
    const changed = this.props.sequenceWrapper.markResidue(loci.loci, action);
    if (changed) this.updateMarker();
  };

  protected lociSelectionProvider = (
    loci: Representation.Loci,
    action: MarkerAction
  ) => {
    const changed = this.props.sequenceWrapper.markResidue(loci.loci, action);
    if (changed) this.updateMarker();
  };

  protected get sequenceNumberPeriod(): number {
    if (this.props.sequenceNumberPeriod !== undefined) {
      return this.props.sequenceNumberPeriod;
    }
    if (this.props.sequenceWrapper.length > 10) return 10;
    const lastSeqNum = this.getSequenceNumber(
      this.props.sequenceWrapper.length - 1
    );
    if (lastSeqNum.length > 1) return 5;
    return 1;
  }

  componentDidMount() {
    this.plugin.managers.interactivity.lociHighlights.addProvider(
      this.lociHighlightProvider
    );
    this.plugin.managers.interactivity.lociSelects.addProvider(
      this.lociSelectionProvider
    );

    this.subscribe(
      this.highlightQueue.pipe(
        throttleTime(HOVER_THROTTLE_MS, void 0, {
          leading: true,
          trailing: true,
        })
      ),
      (e) => {
        const loci = this.getLoci(e.seqIdx < 0 ? void 0 : e.seqIdx);
        this.hover(loci, e.buttons, e.button, e.modifiers);
      }
    );

    this.subscribe(
      this.plugin.managers.structure.focus.behaviors.current,
      (focus) => {
        this.updateFocus(focus?.loci);
        this.updateMarker();
      }
    );

    // Scrolling moves the residues out from under the cursor, so hide the
    // tooltip. Listen on the nearest scrollable ancestor (not window) so
    // unrelated scrolling elsewhere in the app does not dismiss it and a
    // multi-chain sequence does not register one global listener per chain.
    this.scrollTarget = getScrollParent(this.parentDiv.current);
    this.scrollTarget?.addEventListener("scroll", this.handleScroll, {
      passive: true,
    });
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.plugin.managers.interactivity.lociHighlights.removeProvider(
      this.lociHighlightProvider
    );
    this.plugin.managers.interactivity.lociSelects.removeProvider(
      this.lociSelectionProvider
    );
    this.scrollTarget?.removeEventListener("scroll", this.handleScroll);
  }

  protected handleScroll = () => {
    if (this.lastMouseOverSeqIdx === -1) return;
    this.lastMouseOverSeqIdx = -1;
    this.tooltipRef.current?.hide();
  };

  updateFocus(loci: StructureElement.Loci | undefined) {
    this.props.sequenceWrapper.markResidue(EveryLoci, "unfocus");
    if (loci) this.props.sequenceWrapper.markResidue(loci, "focus");
  }

  getLoci(seqIdx: number | undefined) {
    if (seqIdx !== undefined) {
      const loci = this.props.sequenceWrapper.getLoci(seqIdx);
      if (!StructureElement.Loci.isEmpty(loci)) return loci;
    }
    return undefined;
  }

  getSeqIdx(e: React.MouseEvent) {
    return readSeqIdx(e.target as HTMLElement);
  }

  /**
   * Extends a loci to the range between the mouse-down anchor and the current
   * residue, so dragging across the sequence selects a contiguous span.
   */
  protected extendToRange(
    loci: StructureElement.Loci,
    anchor: StructureElement.Loci
  ): StructureElement.Loci {
    const ref = anchor.elements[0];
    const ext = loci.elements[0];
    if (!ref || !ext) return loci;

    const min = Math.min(
      OrderedSet.min(ref.indices),
      OrderedSet.min(ext.indices)
    );
    const max = Math.max(
      OrderedSet.max(ref.indices),
      OrderedSet.max(ext.indices)
    );

    return StructureElement.Loci(loci.structure, [
      {
        indices: OrderedSet.ofRange(
          min as StructureElement.UnitIndex,
          max as StructureElement.UnitIndex
        ),
        unit: ref.unit,
      },
    ]);
  }

  hover(
    loci: StructureElement.Loci | undefined,
    buttons: ButtonsType,
    button: ButtonsType.Flag,
    modifiers: ModifiersKeys
  ) {
    const ev = {
      button,
      buttons,
      current: Representation.Loci.Empty,
      modifiers,
    };

    if (loci !== undefined && !StructureElement.Loci.isEmpty(loci)) {
      ev.current = { loci };
      if (this.mouseDownLoci) {
        ev.current = { loci: this.extendToRange(loci, this.mouseDownLoci) };
      }
    }

    this.plugin.behaviors.interaction.hover.next(ev);
  }

  click(
    loci: StructureElement.Loci | undefined,
    buttons: ButtonsType,
    button: ButtonsType.Flag,
    modifiers: ModifiersKeys
  ) {
    const ev = {
      button,
      buttons,
      current: Representation.Loci.Empty,
      modifiers,
    };

    if (loci !== undefined && !StructureElement.Loci.isEmpty(loci)) {
      ev.current = { loci };
    }

    this.plugin.behaviors.interaction.click.next(ev);
  }

  contextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  mouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.mouseDownLoci = this.getLoci(this.getSeqIdx(e));
  };

  mouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (this.mouseDownLoci === undefined) return;

    const loci = this.getLoci(this.getSeqIdx(e));

    if (loci) {
      const buttons = getButtons(e.nativeEvent);
      const button = getButton(e.nativeEvent);
      const modifiers = getModifiers(e.nativeEvent);

      const range = StructureElement.Loci.areEqual(this.mouseDownLoci, loci)
        ? loci
        : this.extendToRange(loci, this.mouseDownLoci);

      this.click(range, buttons, button, modifiers);
    }

    this.mouseDownLoci = undefined;
  };

  mouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();

    const buttons = getButtons(e.nativeEvent);
    const button = getButton(e.nativeEvent);
    const modifiers = getModifiers(e.nativeEvent);
    const el = e.target as HTMLElement;

    if (!el || !el.getAttribute) {
      if (this.lastMouseOverSeqIdx === -1) return;
      this.lastMouseOverSeqIdx = -1;
      this.tooltipRef.current?.hide();
      this.highlightQueue.next({ button, buttons, modifiers, seqIdx: -1 });
      return;
    }

    const seqIdx = readSeqIdx(el) ?? -1;
    if (this.lastMouseOverSeqIdx === seqIdx) return;
    this.lastMouseOverSeqIdx = seqIdx;

    if (seqIdx < 0) {
      this.tooltipRef.current?.hide();
    } else {
      this.tooltipRef.current?.show(
        el,
        this.props.sequenceWrapper.residueLabel(seqIdx)
      );
    }

    if (this.mouseDownLoci !== undefined) {
      const loci = this.getLoci(seqIdx);
      this.hover(loci, ButtonsType.Flag.None, ButtonsType.Flag.None, modifiers);
    } else {
      this.highlightQueue.next({ button, buttons, modifiers, seqIdx });
    }
  };

  mouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.mouseDownLoci = undefined;
    this.tooltipRef.current?.hide();
    if (this.lastMouseOverSeqIdx === -1) return;
    this.lastMouseOverSeqIdx = -1;

    this.highlightQueue.next({
      button: getButton(e.nativeEvent),
      buttons: getButtons(e.nativeEvent),
      modifiers: getModifiers(e.nativeEvent),
      seqIdx: -1,
    });
  };

  protected getResidueClass(seqIdx: number) {
    const seqWrapper = this.props.sequenceWrapper;
    const active =
      seqWrapper.isHighlighted(seqIdx) ||
      seqWrapper.isSelected(seqIdx) ||
      seqWrapper.isFocused(seqIdx);

    return active
      ? "msp-sequence-present msp-sequence-residue-active"
      : "msp-sequence-present msp-sequence-residue";
  }

  protected getSequenceNumber(seqIdx: number) {
    let seqNum = "";
    const loci = this.props.sequenceWrapper.getLoci(seqIdx);
    const l = StructureElement.Loci.getFirstLocation(loci, this.location);

    if (l) {
      if (Unit.isAtomic(l.unit)) {
        const seqId = StructureProperties.residue.auth_seq_id(l);
        const insCode = StructureProperties.residue.pdbx_PDB_ins_code(l);
        seqNum = `${seqId}${insCode ? insCode : ""}`;
      } else if (Unit.isCoarse(l.unit)) {
        seqNum = `${seqIdx + 1}`;
      }
    }

    return seqNum;
  }

  protected residue(seqIdx: number, label: string, showNum?: boolean) {
    const seqNum = showNum ? this.getSequenceNumber(seqIdx) : null;

    return (
      <span
        className={this.getResidueClass(seqIdx)}
        data-seqid={seqIdx}
        key={seqIdx}
        style={{
          backgroundClip: "content-box",
          display: "inline-block",
          paddingTop: "8px",
          position: "relative",
          textAlign: "center",
          width: "1ch",
        }}
      >
        {seqNum && (
          <span
            className="msp-sequence-number"
            style={{
              lineHeight: 1.2,
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              whiteSpace: "nowrap",
            }}
          >
            {seqNum}
          </span>
        )}
        {label}
      </span>
    );
  }

  /**
   * Writes hover/selection colors straight to the residue spans. Called on
   * every marker change, so it bypasses React to avoid re-rendering a grid that
   * can hold thousands of nodes.
   *
   * Residues sit at the default color until something is active. A hovered,
   * selected, or focused residue brightens and takes a translucent fill; while
   * any residue is selected, the rest dim to draw attention to the selection.
   */
  protected updateMarker() {
    if (!this.parentDiv.current) return;

    const { activeBackground, activeText, defaultText, inactiveText } =
      this.props.residueColors;

    // Residue spans are nested inside per-group wrappers, so query them by
    // their data-seqid attribute; querySelectorAll returns them in document
    // (seqIdx) order.
    const spans = this.parentDiv.current.querySelectorAll<HTMLSpanElement>(
      `[${SEQ_ID_ATTR}]`
    );
    const seqWrapper = this.props.sequenceWrapper;

    let anySelected = false;
    for (let i = 0; i < seqWrapper.length; i++) {
      if (seqWrapper.isSelected(i)) {
        anySelected = true;
        break;
      }
    }
    const inactiveColor = anySelected ? inactiveText : defaultText;

    for (let i = 0; i < seqWrapper.length; i++) {
      const span = spans[i];
      if (!span) return;

      const className = this.getResidueClass(i);
      if (span.className !== className) span.className = className;

      const active =
        seqWrapper.isSelected(i) ||
        seqWrapper.isFocused(i) ||
        seqWrapper.isHighlighted(i);

      span.style.color = active ? activeText : inactiveColor;
      span.style.backgroundColor = active ? activeBackground : "";
    }
  }

  render() {
    const sw = this.props.sequenceWrapper;
    const period = this.sequenceNumberPeriod;
    const il = sw.length;

    // Group residues into fixed sections. Each section is a nowrap unit so its
    // letters never split across lines, and each becomes one CSS grid cell. The
    // grid uses equal-width auto-fill tracks with a uniform gap, so the spacing
    // between sections is identical on every row - including a partial last
    // row, which keeps the same column width (rather than stretching) and
    // stacks from the leading edge.
    const groups: JSX.Element[] = [];
    for (let start = 0; start < il; start += SEQUENCE_GROUP_SIZE) {
      const end = Math.min(start + SEQUENCE_GROUP_SIZE, il);
      const residues: JSX.Element[] = [];
      for (let i = start; i < end; i++) {
        const showNum = !this.props.hideSequenceNumbers && i % period === 0;
        residues.push(this.residue(i, sw.residueLabel(i), showNum));
      }
      groups.push(
        <span key={`group-${start}`} style={{ whiteSpace: "nowrap" }}>
          {residues}
        </span>
      );
    }

    this.updateFocus(
      this.plugin.managers.structure.focus.behaviors.current.value?.loci
    );
    this.updateMarker();

    return (
      <>
        {/*
          Pointer-driven residue picking and drag-to-range selection. Every
          interaction here is also reachable by pointer in the 3D view, and the
          grid is a rendering of the structure rather than a control of its own,
          so it is exposed as an image with the sequence as its label. Keyboard
          traversal of individual residues is a known gap in both surfaces.
        */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          aria-label={`Residue sequence, ${sw.length} residues`}
          className="msp-sequence-wrapper"
          onContextMenu={this.contextMenu}
          onMouseDown={this.mouseDown}
          onMouseLeave={this.mouseLeave}
          onMouseMove={this.mouseMove}
          onMouseUp={this.mouseUp}
          ref={this.parentDiv}
          role="img"
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns: `repeat(auto-fill, minmax(${SEQUENCE_GROUP_SIZE}ch, 1fr))`,
            justifyItems: "start",
            paddingTop: "6px",
          }}
        >
          {groups}
        </div>
        <ResidueTooltip ref={this.tooltipRef} />
      </>
    );
  }
}

interface SequenceViewState {
  structureOptions: { options: [string, string][]; all: Structure[] };
  structure: Structure;
  structureRef: string;
  modelEntityId: string;
  chainGroupId: number;
  operatorKey: string;
  copied: boolean;
}

/**
 * Builds the Mol* sequence panel view class.
 *
 * Like the viewport, Mol* renders this inside its own React root, so the theme
 * mode arrives through `themeMode` and is watched for changes rather than read
 * once, then re-supplied through a local `ThemeProvider` for the Emotion styles
 * and the SDS `Tooltip` below. The return type is widened for the same reasons
 * given there.
 */
export function createSequenceView(
  themeMode: ThemeModeSubject
): ComponentClass {
  return class SequenceView extends PluginUIComponent<
    Record<string, never>,
    SequenceViewState
  > {
    private copyTimeoutId: ReturnType<typeof setTimeout> | null = null;

    state: SequenceViewState = {
      chainGroupId: -1,
      copied: false,
      modelEntityId: "",
      operatorKey: "",
      structure: Structure.Empty,
      structureOptions: { all: [], options: [] },
      structureRef: "",
    };

    componentDidMount() {
      if (
        this.plugin.state.data.select(
          StateSelection.Generators.rootsOfType(PSO.Molecule.Structure)
        ).length > 0
      ) {
        this.setState(this.getInitialState());
      }

      this.subscribe(
        this.plugin.state.events.object.updated,
        ({ ref, obj }) => {
          if (
            ref === this.state.structureRef &&
            obj &&
            obj.type === PSO.Molecule.Structure.type &&
            obj.data !== this.state.structure
          ) {
            this.sync();
          }
        }
      );

      this.subscribe(this.plugin.state.events.object.created, ({ obj }) => {
        if (obj && obj.type === PSO.Molecule.Structure.type) this.sync();
      });

      this.subscribe(this.plugin.state.events.object.removed, ({ obj }) => {
        if (obj && obj.type === PSO.Molecule.Structure.type) this.sync();
      });

      // `skip(1)` drops the subject's current value, which render() already
      // used. PluginUIComponent unsubscribes on unmount.
      this.subscribe(themeMode.pipe(skip(1), distinctUntilChanged()), () =>
        this.forceUpdate()
      );
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      if (this.copyTimeoutId) clearTimeout(this.copyTimeoutId);
    }

    private sync() {
      const structureOptions = getStructureOptions(this.plugin.state.data);
      if (arrayEqual(structureOptions.all, this.state.structureOptions.all)) {
        return;
      }
      this.setState(this.getInitialState());
    }

    private getStructure(ref: string) {
      const state = this.plugin.state.data;
      const cell = state.select(ref)[0];
      if (!ref || !cell || !cell.obj) return Structure.Empty;
      return (cell.obj as PSO.Molecule.Structure).data;
    }

    private getInitialState(): SequenceViewState {
      const structureOptions = getStructureOptions(this.plugin.state.data);
      const structureRef = (structureOptions.options[0] as [string, string])[0];
      const structure = this.getStructure(structureRef);
      const modelEntityId = (
        getModelEntityOptions(structure)[0] as [string, string]
      )[0];
      const chainGroupId = (
        getChainOptions(structure, modelEntityId)[0] as [number, string]
      )[0];
      const operatorKey = (
        getOperatorOptions(structure, modelEntityId, chainGroupId)[0] as [
          string,
          string,
        ]
      )[0];

      return {
        chainGroupId,
        copied: false,
        modelEntityId,
        operatorKey,
        structure,
        structureOptions,
        structureRef,
      };
    }

    private get params() {
      const { structureOptions, structure, modelEntityId } = this.state;
      const chainOptions = getChainOptions(structure, modelEntityId);

      return {
        chain: PD.Select(
          (chainOptions[0] as [number, string])[0],
          chainOptions,
          {
            shortLabel: true,
          }
        ),
        structure: PD.Select(
          (structureOptions.options[0] as [string, string])[0],
          structureOptions.options,
          { shortLabel: true }
        ),
      };
    }

    private getSequenceWrappers(_params: MolstarSequenceView["params"]) {
      const structure = this.getStructure(this.state.structureRef);
      const wrappers: {
        wrapper: string | SequenceWrapper.Any;
        label: string;
      }[] = [];

      for (const [modelEntityId, eLabel] of getModelEntityOptions(structure)) {
        for (const [chainGroupId, cLabel] of getChainOptions(
          structure,
          modelEntityId
        )) {
          for (const [operatorKey] of getOperatorOptions(
            structure,
            modelEntityId,
            chainGroupId
          )) {
            wrappers.push({
              label: `${cLabel} | ${eLabel}`,
              wrapper: getSequenceWrapper(
                { chainGroupId, modelEntityId, operatorKey, structure },
                this.plugin.managers.structure.selection
              ),
            });
          }
        }
      }

      return wrappers;
    }

    resetCamera = async () => {
      await PluginCommands.Camera.Reset(this.plugin, {
        durationMs: CAMERA_RESET_DURATION_MS,
      });
    };

    copySequence = (
      sequenceWrappers: {
        wrapper: string | SequenceWrapper.Any;
        label: string;
      }[]
    ) => {
      const sequence = sequenceWrappers
        .filter((s) => typeof s.wrapper !== "string")
        .map((s) => {
          const w = s.wrapper as SequenceWrapper.Any;
          return Array.from({ length: w.length }, (_, i) =>
            w.residueLabel(i)
          ).join("");
        })
        .join("");

      navigator.clipboard.writeText(sequence).then(() => {
        this.setState({ copied: true });
        if (this.copyTimeoutId) clearTimeout(this.copyTimeoutId);
        this.copyTimeoutId = setTimeout(
          () => this.setState({ copied: false }),
          COPIED_FEEDBACK_MS
        );
      });
    };

    render() {
      const mode = themeMode.value;
      const theme = themeForMode(mode);

      if (this.getStructure(this.state.structureRef) === Structure.Empty) {
        return (
          <ThemeProvider theme={theme}>
            <EmptyState className="msp-sequence">
              No structure available
            </EmptyState>
          </ThemeProvider>
        );
      }

      const sequenceWrappers = this.getSequenceWrappers(
        this.params as unknown as MolstarSequenceView["params"]
      );
      const sequenceLength = sequenceWrappers.reduce(
        (sum, s) =>
          sum + (typeof s.wrapper === "string" ? 0 : s.wrapper.length),
        0
      );

      return (
        <ThemeProvider theme={theme}>
          <SequencePanel>
            <PanelHeader>
              <PanelTitle>Sequence</PanelTitle>
              <Tooltip
                arrow
                placement="top"
                title={this.state.copied ? "Copied!" : "Copy"}
              >
                <CopyButton
                  aria-label="Copy sequence to clipboard"
                  onClick={() => this.copySequence(sequenceWrappers)}
                  type="button"
                >
                  {this.state.copied ? (
                    <CheckIcon size={16} />
                  ) : (
                    <CopyIcon size={16} />
                  )}
                </CopyButton>
              </Tooltip>
              <ResidueCount>
                <ResidueCountLabel>Residues</ResidueCountLabel>
                <ResidueCountValue>{sequenceLength}</ResidueCountValue>
              </ResidueCount>
            </PanelHeader>
            <SequenceScroller>
              <SequenceScrollArea className="msp-sequence msp-sequence-wrapper-non-empty">
                {sequenceWrappers.map((s, i) =>
                  typeof s.wrapper === "string" ? (
                    <div className="msp-sequence-wrapper" key={i}>
                      {s.wrapper}
                    </div>
                  ) : (
                    <Sequence
                      key={i}
                      residueColors={residueColorsForMode(mode)}
                      sequenceWrapper={s.wrapper}
                    />
                  )
                )}
              </SequenceScrollArea>
            </SequenceScroller>
          </SequencePanel>
        </ThemeProvider>
      );
    }
  };
}
