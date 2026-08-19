import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";
import {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import {
  getCorners,
  getSemanticColors,
  type CommonThemeProps,
} from "@components/src/core/styles";
import {
  buildPlaygroundHref,
  type PlaygroundPadding,
} from "../playground/lib/link";
import { CodeFigure } from "./CodeFigure";
import {
  CODE_ACTION_CLASS,
  PREVIEW_CLASS,
  SB_UNSTYLED_CLASS,
} from "./constants";
import { ExampleSkeleton } from "./ExampleSkeleton";
import {
  ExampleErrorBoundary,
  exampleLoaders,
  exampleStyles,
  modulePath,
  scopeCss,
  sourceLoaders,
} from "./exampleRegistry";
import { previewTheme } from "./previewTheme";
import { useThemeMode } from "./useThemeMode";

/**
 * The height a padded preview stands at whatever it has to show: most examples
 * are a control or two and framed tight against them they read as cramped, so
 * the frame is given a size of its own and the specimen sits in the middle of
 * it. Also the height the placeholder waits at, so that a preview is the same
 * height before and after its example arrives.
 *
 * Only the padded previews. A preview asking for no inset is page furniture — a
 * header, a footer, a dialog — which means to reach the edges of its frame and
 * is as tall as it needs to be; a floor under one of those would leave a header
 * bar with an empty half-page beneath it.
 */
const MIN_PREVIEW_HEIGHT = 200;

/** How wide the placeholder draws, given a preview's width to draw it in. */
const SKELETON_WIDTH = 320;

/**
 * Themed surface the example renders on. It reproduces the little the original
 * sandbox stylesheets provided (page padding, a smaller `h1`) and takes its
 * background from the SDS theme so previews read correctly in both modes.
 */
const PreviewSurface = styled.div<CommonThemeProps & { padded: boolean }>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      background-color: ${semanticColors?.base?.backgroundPrimary};
      color: ${semanticColors?.base?.textPrimary};
      border: 1px solid ${semanticColors?.base?.divider};
      border-bottom: none;
      border-radius: ${corners?.l}px ${corners?.l}px 0 0;

      /* Holds the example, and with it whatever the example opens over itself,
         while the preview is settling into shape. \`useFitPreview\` lifts this
         the moment the reader reaches the example, so that a menu they open, or
         a tooltip they hover, is free to stand outside the frame. */
      overflow: auto;

      ${props.padded ? `min-height: ${MIN_PREVIEW_HEIGHT}px;` : ""}

      /* Centred in whatever room the floor leaves over the example, and "safe"
         so that one with no room to spare is aligned to the top instead: centred
         overflow spills past both edges and only one of them can be scrolled
         back to. A preview with no floor has nothing to centre in, and this
         leaves it where it was. */
      display: grid;
      align-content: safe center;

      /* An example takes the surface's width as given. A lone auto-sized column
         would take its width from its content, so an example wider than the
         frame would widen the box rather than be scrolled inside it — and a
         component that divides that width between its parts, as a table does
         between its columns, would then measure a width it had set itself and
         grow again on every pass. */
      grid-template-columns: minmax(0, 1fr);
      > * {
        min-width: 0;
      }

      /* Containing block for the overlays the previews open, so that a menu is
         placed and measured against this box rather than the page. */
      position: relative;

      /* Stories get this reset from the <CssBaseline /> in .storybook/preview.jsx,
         which docs pages never render. Components count on it: a padded
         \`width: 100%\` content box otherwise overflows its own card. */
      box-sizing: border-box;
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      .app {
        padding: ${props.padded ? "50px" : "0"};
      }
    `;
  }}
`;

/**
 * Where the placeholder waits. Its own floor, rather than the surface's, is what
 * holds a preview open while its example is on the way: an example is fetched
 * only when the page first asks for it, and a frame that collapsed to nothing in
 * the meantime would have nowhere to show that anything was coming.
 */
const SkeletonFrame = styled.div`
  display: grid;
  place-items: center;
  min-height: ${MIN_PREVIEW_HEIGHT}px;
`;

function PreviewSkeleton(): ReactElement {
  return (
    <SkeletonFrame>
      <ExampleSkeleton maxWidth={SKELETON_WIDTH} />
    </SkeletonFrame>
  );
}

/** Room left around an overlay so it does not sit flush against the frame. */
const OVERLAY_GUTTER = 16;

/**
 * A tooltip's overlay, as MUI marks it: the tooltips proper, the condensed ones
 * that follow the cursor, and the tables they carry.
 *
 * The one overlay a preview has no business framing. A tooltip is up only while
 * the reader is on its trigger and gone the moment they leave, so there is
 * nothing that outlasts them to hold and no room worth reserving — and a frame
 * that tried would be seen doing it: a tooltip placed above its trigger pushes
 * the example down the frame to clear room over it, and one that follows the
 * cursor drags the frame taller with every step of the pointer.
 */
const TOOLTIP_OVERLAY = ".MuiTooltip-popper";

/**
 * An overlay a preview is holding: one its example opened by itself, and so
 * everything but a tooltip.
 */
const HELD_OVERLAY = `.MuiPopper-root:not(${TOOLTIP_OVERLAY})`;

/**
 * How far the overlays a preview opened reach past the room it has for them,
 * above and below.
 *
 * An overlay is positioned rather than laid out, so it contributes nothing to
 * the surface's own height. With an empty div for an anchor, as these examples
 * use, that leaves nothing to hold the frame open and the menu covers whatever
 * follows it. Measuring the overlays gives the surface a height to take.
 *
 * Both directions matter, because a menu that has no room beneath it flips and
 * opens upwards. Room above is made by padding the surface, which carries the
 * anchor down and the overlay with it.
 */
function overlayOverflow(surface: HTMLElement): {
  above: number;
  below: number;
} {
  const box = surface.getBoundingClientRect();
  const overlays = Array.from(
    surface.querySelectorAll<HTMLElement>(".MuiPopper-root")
  ).filter((overlay) => overlay.getBoundingClientRect().height > 0);

  const tops = overlays.map((o) => o.getBoundingClientRect().top);
  const bottoms = overlays.map((o) => o.getBoundingClientRect().bottom);

  const highest = Math.min(box.top, ...tops.map((t) => t - OVERLAY_GUTTER));
  const lowest = Math.max(
    box.top + surface.scrollHeight,
    ...bottoms.map((b) => b + OVERLAY_GUTTER)
  );

  return {
    above: box.top - highest,
    below: lowest - box.top - surface.clientHeight,
  };
}

/**
 * An overlay is mounted and then positioned over the frames following the
 * example's own render, so a single measurement would read it mid-flight. These
 * are the points, in milliseconds, at which the fit is retaken.
 */
const SETTLE_DELAYS = [0, 50, 150, 400, 1000];

/**
 * Give up the clip, so that what the preview opens from here is free to stand
 * over the page below it. Where it can be given up: an example genuinely wider
 * than the frame keeps its scrollbar, scrolling being the only way to reach the
 * rest of it, and a box that scrolls is a box that clips.
 */
function unclip(surface: HTMLElement): void {
  if (surface.scrollWidth <= surface.clientWidth) {
    surface.style.overflow = "visible";
  }
}

/**
 * The reader reaching an example: a pointer crossing into the frame, or focus
 * landing in it. A tooltip opens on one or the other and on nothing else, so
 * this is the frame's cue to give up its clip.
 *
 * The cue is the approach rather than the tooltip itself because an overlay
 * counts towards the frame's own width while it is up: a frame that measured
 * itself with a tooltip already out past its edge would find in that tooltip a
 * reason to keep clipping it.
 */
const REACH_EVENTS = ["focusin", "pointerover"] as const;

/**
 * The reader taking an example over: a press, or a keystroke while they are in
 * it. From here the preview is theirs and stops holding its shape.
 */
const TAKEOVER_EVENTS = ["keydown", "pointerdown"] as const;

/**
 * Hold a preview around the example in it until the reader takes it over.
 *
 * A frame that clips is a frame an overlay cannot leave, and the box it is
 * placed against as well: a menu opened inside a preview is held to it, and the
 * preview grows to hold whatever is left over. For the examples documented with
 * a menu already open — a DropdownMenu has no trigger of its own, and an
 * Autocomplete can be asked to show its list — that is exactly right. Nothing
 * else holds a preview open around an overlay, and one let loose would cover
 * the prose under it for as long as the page is on screen.
 *
 * For a menu the reader opens themselves it is not. A menu on a page stands
 * over what is beneath it and leaves the page where it is, which is what Menu
 * has always done here, its surface going to the end of the document and never
 * having been in the frame to begin with.
 *
 * Both, then, in turn: a preview frames what its example shows on its own, and
 * at the reader's first touch lets go — of the overlays, which are free to
 * reach past it from then on, and of the measuring that was keeping up with
 * them. Scrolling is the one thing it keeps hold of, and only where the example
 * is genuinely wider than the frame, which in practice means a table, and a
 * table has no menu to open.
 *
 * A tooltip asks for less and gets it sooner: the frame gives up its clip as
 * soon as the reader reaches the example, and never measures itself around one.
 * Holding a tooltip in would be holding it away from the prose it was written to
 * annotate, and there is no call to hold it: nobody sees a tooltip who did not
 * hover or tab to its trigger, and it goes when they do.
 *
 * The frame only ever grows, which is what keeps the measuring convergent: each
 * pass moves the overlays it has just made room for, prompting another, and
 * with no room left to add the measurements agree and it settles.
 */
function useFitPreview(surface: HTMLElement | null): void {
  useEffect(() => {
    if (!surface) return;

    const timers: number[] = [];

    const fit = (): void => {
      // Left as it stands while a tooltip is up: a tooltip counts towards the
      // surface's scrollable height like anything else in the frame, and a pass
      // taken now would grow the preview to swallow the one overlay it means to
      // leave alone.
      if (surface.querySelector(TOOLTIP_OVERLAY)) return;

      const { above, below } = overlayOverflow(surface);

      if (above > 1) {
        const padding = parseFloat(getComputedStyle(surface).paddingTop);
        surface.style.paddingTop = `${padding + above}px`;
      }

      if (below > 1) {
        surface.style.minHeight = `${surface.clientHeight + below}px`;
      }
    };

    const settle = (): void => {
      timers.splice(0).forEach(clearTimeout);
      SETTLE_DELAYS.forEach((delay) =>
        timers.push(window.setTimeout(fit, delay))
      );
    };

    // The example itself arrives late — its module is fetched the first time
    // the page asks for it — and an overlay it opens later still, so there is
    // no one moment at which a preview is there to be measured.
    const observer = new MutationObserver(settle);
    observer.observe(surface, { childList: true, subtree: true });

    /**
     * The clip is also the boundary MUI places an overlay against, so a frame
     * that gave it up while holding a menu open would send that menu out of
     * itself, and the measuring would follow it out and pad the frame by the
     * height of a menu. So the frame steps aside only while it is holding
     * nothing — which is every preview a tooltip turns up in, a tooltip being
     * the reader's and opening after they arrive.
     */
    const standAside = (): void => {
      if (surface.querySelector(HELD_OVERLAY)) return;
      unclip(surface);
    };

    /** Everything the frame is listening to, dropped in one go. */
    const stopListening = (): void => {
      window.removeEventListener("resize", settle);
      REACH_EVENTS.forEach((type) =>
        surface.removeEventListener(type, standAside, true)
      );
      TAKEOVER_EVENTS.forEach((type) =>
        surface.removeEventListener(type, release, true)
      );
    };

    const release = (): void => {
      timers.splice(0).forEach(clearTimeout);
      observer.disconnect();
      stopListening();

      unclip(surface);
    };

    settle();
    window.addEventListener("resize", settle);
    // Captured, so that a control which handles the event itself still counts
    // as the reader having reached the example.
    REACH_EVENTS.forEach((type) =>
      surface.addEventListener(type, standAside, true)
    );
    TAKEOVER_EVENTS.forEach((type) =>
      surface.addEventListener(type, release, true)
    );

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
      stopListening();
    };
  }, [surface]);
}

/** The extracted `App.tsx`, shown below its live preview and collapsible. */
function ExampleSource({
  id,
  padding,
}: {
  id: string;
  padding: ExamplePadding;
}): ReactElement {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const load = sourceLoaders[`${modulePath(id)}.tsx`];
    if (!load) return;

    let active = true;
    void load().then((text) => {
      if (active) setSource(text);
    });

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <CodeFigure
      action={
        source === null ? null : (
          <PlaygroundLink padding={padding} source={source} />
        )
      }
      collapsedByDefault
      code={source}
      label="Source Code"
      language="tsx"
    />
  );
}

/**
 * Opens this example in the playground, with its source already loaded and the
 * same room around it that it has here.
 *
 * The code travels in the link's own fragment, so the playground needs to know
 * nothing about the docs and the docs need no server. In a new tab, because the
 * playground fills the frame and the reader should not lose their place in the
 * page to try something out.
 */
function PlaygroundLink({
  padding,
  source,
}: {
  padding: ExamplePadding;
  source: string;
}): ReactElement {
  const mode = useThemeMode();

  return (
    <a
      className={CODE_ACTION_CLASS}
      href={buildPlaygroundHref(source, { padding, theme: mode })}
      rel="noreferrer"
      target="_blank"
    >
      Open in Playground
    </a>
  );
}

/** The docs' name for the same flag the playground reads out of a link. */
export type ExamplePadding = PlaygroundPadding;

export interface SdsExampleProps {
  /**
   * `<Page>/<Name>` (e.g. `Theming/DarkModeByDefault`),
   * `core/<Component>/<Name>` (e.g. `core/Accordion/DefaultAccordion`), or
   * `data-viz/<Component>/<Name>` (e.g. `data-viz/StackedBarChart/Default`).
   */
  id: string;
  /**
   * How much room the preview leaves around the example. `"none"` suits
   * components that span the full width of a page, such as NavigationHeader,
   * which read as inset boxes rather than page furniture when padded.
   */
  padding?: ExamplePadding;
}

/**
 * Renders one documentation code example as a live preview plus its source. The
 * SDS theme comes from the global Storybook decorator in
 * `.storybook/preview.jsx`, which is all the original sandbox `index.tsx`
 * boilerplate provided.
 */
export function SdsExample({
  id,
  padding = "default",
}: SdsExampleProps): ReactElement {
  const mode = useThemeMode();
  /*
   * Held in state rather than a ref because the theme is built from it: the
   * overlays an example opens are portaled into this node, and a ref would not
   * have told the theme when there was one.
   */
  const [surface, setSurface] = useState<HTMLDivElement | null>(null);
  const theme = useMemo(() => previewTheme(mode, surface), [mode, surface]);
  useFitPreview(surface);

  const Example = useMemo(() => {
    const load = exampleLoaders[`${modulePath(id)}.tsx`];
    return load ? lazy(load) : null;
  }, [id]);

  const css = useMemo(() => {
    const raw = exampleStyles[`${modulePath(id)}.css`];
    return raw ? scopeCss(raw, `.${PREVIEW_CLASS}`) : null;
  }, [id]);

  if (!Example) {
    return (
      <p className="sds-doc-example-error">
        Missing example module for <code>{id}</code>.
      </p>
    );
  }

  return (
    <div className={`sds-doc-example-block ${SB_UNSTYLED_CLASS}`}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <PreviewSurface
            className={PREVIEW_CLASS}
            padded={padding === "default"}
            ref={setSurface}
          >
            {css ? <style>{css}</style> : null}
            <ExampleErrorBoundary id={id}>
              <Suspense fallback={<PreviewSkeleton />}>
                <Example />
              </Suspense>
            </ExampleErrorBoundary>
          </PreviewSurface>
        </EmotionThemeProvider>
      </ThemeProvider>
      <ExampleSource id={id} padding={padding} />
    </div>
  );
}

export default SdsExample;
