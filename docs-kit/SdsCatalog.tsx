import {
  ThemeProvider as EmotionThemeProvider,
  keyframes,
} from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";
import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactElement,
  type RefObject,
} from "react";
import {
  Theme,
  fontBodySemiboldS,
  getCorners,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SDSTheme,
} from "@components/src/core/styles";
import {
  catalog,
  type CatalogEntry,
} from "../design-docs/pages/Overview/catalog";
import { CARD_POPPER_OPTIONS, CARD_SCALE_PROPERTY } from "./cardPopper";
import { CATALOG_PREVIEW_CLASS } from "./constants";
import {
  ExampleErrorBoundary,
  exampleLoaders,
  exampleStyles,
  modulePath,
  scopeCss,
} from "./exampleRegistry";
import { previewTheme } from "./previewTheme";
import { useThemeMode, type ThemeMode } from "./useThemeMode";

/**
 * How far a miniature is zoomed out. One number for the whole catalog: a card
 * says how large a component is next to the others as much as it says what the
 * component looks like, and per-card scales would take that away.
 */
const CARD_SCALE = 0.45;

/**
 * The height of the box an example lays out in, in its own coordinates. What is
 * drawn past it is cropped, which is the point: a component as wide as a table
 * reads as continuing beyond its card rather than as a shrunken whole.
 *
 * Width is not fixed alongside it. The stage takes the card's width back out
 * through the scale, so the frame is filled edge to edge whatever width the
 * grid hands it and no card carries a gutter of empty page.
 */
const STAGE_HEIGHT = 340;

/** Room around a miniature, in stage coordinates, so it does not sit flush. */
const STAGE_PADDING = 32;

/** Narrowest a card may be before the grid drops to fewer columns. */
const CARD_MIN_WIDTH = 260;

/**
 * How far outside the window a card is mounted. Fifty-one live components is
 * more than a page should build to be scrolled past, so each waits until it is
 * nearly in view — far enough ahead that scrolling never arrives first.
 */
const MOUNT_MARGIN = "400px";

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${CARD_MIN_WIDTH}px, 1fr));
  list-style: none;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xl}px ${spaces?.l}px;
      margin: ${spaces?.l}px 0 ${spaces?.xxl}px;
      padding: 0;
    `;
  }}
`;

/**
 * The cropped window a card shows its component through. A recessed surface, so
 * that a component drawn on the background it expects still reads as a piece
 * sitting on the page. Painted in the previews' theme rather than the page's,
 * which keeps that relationship when the toolbar is switched to dark.
 */
const Frame = styled.div<CommonThemeProps>`
  position: relative;
  height: ${STAGE_HEIGHT * CARD_SCALE}px;
  overflow: hidden;

  /* The card is one link, so nothing inside the frame is a target of its own:
     the pointer falls through to the anchor, and the inert attribute the card
     sets keeps the controls a component brought with it out of the tab order. */
  pointer-events: none;

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      /* The secondary background is a translucent wash, meant to sit over an
         app's own primary background. Painted straight onto the frame it
         composites against the docs page instead, which in dark mode leaves a
         mid grey the previews are barely legible on. So: the theme's surface,
         and the wash over it. */
      background-color: ${semanticColors?.base?.backgroundPrimary};
      background-image: linear-gradient(
        ${semanticColors?.base?.backgroundSecondary},
        ${semanticColors?.base?.backgroundSecondary}
      );
      /* Text a component leaves to be inherited - a checkbox's label, a list's
         items - would otherwise come from the page, which is always light, and
         be set in near-black against a dark frame. */
      color: ${semanticColors?.base?.textPrimary};
      border: 1px solid transparent;
      border-radius: ${corners?.xl}px;
      transition: border-color 0.15s ease;
    `;
  }}
`;

/**
 * The box the example lays out in, drawn at full size and then zoomed out as a
 * whole. Scaling the box rather than the type keeps a miniature true to the
 * component: every border, gap and shadow shrinks by the same amount.
 */
const Stage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / ${CARD_SCALE});
  height: ${STAGE_HEIGHT}px;

  /* A transform rather than zoom, which would do the same to the drawing but
     leave the stage no containing block: a component that fixes itself to the
     edge of the viewport, as a panel or a drawer does, would then be fixed to
     the edge of the docs page and float over the catalog. This keeps it in the
     card it belongs to. */
  transform: scale(${CARD_SCALE});
  transform-origin: top left;

  /* An overlay positions itself from measurements it takes of its anchor, and a
     scaled anchor measures to a rounded pixel, which is a scale slightly off this
     one. Declaring the scale lets that be corrected, rather than have the overlay
     drift across the card as the page is scrolled; see ./cardPopper. */
  ${CARD_SCALE_PROPERTY}: ${CARD_SCALE};

  /* Centred, though vertically only while there is room to centre: "safe" hands
     the alignment back to the start once the component is taller than the card,
     so a table is cropped along its bottom edge instead of losing the header row
     off the top. The crop is then on one edge, and reads as a view into
     something larger rather than as a piece with both ends missing. */
  display: grid;
  align-content: safe center;
  justify-items: center;
  padding: ${STAGE_PADDING}px;

  /* An example has to take the stage's width as given. Left to themselves a
     lone grid column and a grid item are both as wide as their content, so an
     example wider than the card would widen the stage instead of being cropped
     by it - and the stage is the width a component measures to lay itself out.
     One that divides that width between its parts, as a table does between its
     columns, would then measure a width it had set itself and grow again on
     every pass, never settling. Fixing the column, and holding an example
     between no minimum and the width of the card, keeps that measurement still:
     an example with more to show than fits overflows and is cropped. */
  grid-template-columns: minmax(0, 1fr);

  > * {
    min-width: 0;
    max-width: 100%;
  }

  /* Stories get this reset from the <CssBaseline /> in .storybook/preview.jsx,
     which docs pages never render. */
  box-sizing: border-box;
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /* Every example is wrapped in a .app div, which a full preview pads to hold
     the component off its frame. Here the stage does that, at stage scale. */
  .app {
    padding: 0;
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;

/**
 * What a card shows in place of its component until the component is there: a
 * component is only built once its card is near the window, and then only when
 * the browser has a moment to spare, so a frame is empty for a while and says so.
 *
 * One shape for every card, deliberately: fifty-one placeholders each shaped like
 * the component it stands in for would be a page of noise, and a card's label
 * already says what is coming.
 */
const Skeleton = styled.div<CommonThemeProps>`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;

  &::before {
    content: "";
    width: 45%;
    height: 22%;
    animation: ${pulse} 1.6s ease-in-out infinite;

    ${(props) => {
      const semanticColors = getSemanticColors(props);
      const corners = getCorners(props);

      return `
        background-color: ${semanticColors?.base?.fillSecondary};
        border-radius: ${corners?.m}px;
      `;
    }}
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`;

/**
 * One card: a miniature, and beneath it the link that names the component.
 *
 * The link holds only the name, and reaches the rest of the card by covering it
 * with a layer of its own. A component is free to contain a link or a button of
 * its own — several do — and an anchor around the whole card would nest those
 * inside it, which is neither valid nor navigable. This way the card has one
 * link, its text is the component's name, and all of it is still clickable.
 */
const Card = styled.li<CommonThemeProps>`
  position: relative;
  margin: 0;
  min-width: 0;

  /* Only ever the card's own link: a descendant selector would dress the links
     a component brought with it too, in the page's light colours, however the
     toolbar has the preview set. */
  > a {
    ${fontBodySemiboldS}

    display: block;
    text-decoration: none;

    ${(props) => {
      const spaces = getSpaces(props);
      const semanticColors = getSemanticColors(props);

      return `
        margin-top: ${spaces?.s}px;
        color: ${semanticColors?.base?.textPrimary};
      `;
    }}
  }

  > a::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${(props) => getCorners(props)?.m}px;
  }

  &:hover ${Frame} {
    border-color: ${(props) => getSemanticColors(props)?.accent?.border};
  }
  &:hover > a {
    color: ${(props) => getSemanticColors(props)?.accent?.textActionHover};
  }

  > a:focus-visible {
    outline: none;
  }
  > a:focus-visible::after {
    outline: 2px solid
      ${(props) => getSemanticColors(props)?.accent?.borderSelected};
    outline-offset: 2px;
  }
`;

/** Components whose module has arrived, waiting their turn to be built. */
const waiting: Array<() => void> = [];

/** Whether a card has been let through and has yet to report itself drawn. */
let building = false;

/** Releases the queue if whoever holds it never reports back. */
let watchdog: ReturnType<typeof setTimeout> | undefined;

/**
 * Build one waiting component, and not another until it is drawn.
 *
 * Building a component is not cheap — its styles alone are hashed and then
 * inserted a rule at a time — and building a screenful of them at once puts all of
 * that into a single turn of the main thread, which is a page that stops
 * responding until it ends. One at a time keeps every turn to the length of one
 * card, and asking for it during idle time leaves the browser its chance to draw a
 * frame in between. The timeout on that is for a page being scrolled through,
 * which may offer no idle time at all.
 *
 * Only the building is held back like this. Fetching a module is the network's
 * work, not the main thread's, so those run as they please: a card whose module is
 * slow to arrive waits for it without keeping any other card from being drawn.
 */
function admit(): void {
  if (building || waiting.length === 0) return;
  building = true;

  const start = () => {
    const next = waiting.shift();

    if (!next) {
      building = false;
      return;
    }

    next();
    // In case the card is gone by the time it would have reported back.
    watchdog = setTimeout(release, 1000);
  };

  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(start, { timeout: 120 });
  } else {
    setTimeout(start, 16);
  }
}

/** Hands the queue on, once a card has its component on the page. */
function release(): void {
  clearTimeout(watchdog);
  building = false;
  admit();
}

/** Join the queue, and a way to leave it again. */
function queueBuild(build: () => void): () => void {
  waiting.push(build);
  admit();

  return () => {
    const index = waiting.indexOf(build);
    if (index !== -1) waiting.splice(index, 1);
  };
}

/**
 * Whether the element has come near enough to the window for its component to be
 * worth fetching. Latches on: a card that has been built once stays built, so
 * scrolling back over the page rebuilds nothing.
 */
function useInView(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setInView(true);
      },
      { rootMargin: MOUNT_MARGIN }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, ref]);

  return inView;
}

/** Stands in for an example that could not be loaded: an empty frame. */
const Nothing = () => null;

/**
 * The example's component, once its module has arrived and the queue has given it
 * its turn to be built.
 *
 * Fetched here rather than through `lazy`, so that React is handed a component it
 * can render rather than one that suspends. Suspending cards are worse than they
 * look on a page of fifty-one: React gathers them into one transition and draws
 * none of them until the last module has landed. This way each card is drawn as
 * soon as its own module is there and the queue reaches it.
 *
 * Building is a transition, which lets React do it in slices it can be interrupted
 * between rather than in one turn of the main thread nothing else can get a word in
 * during. A reader scrolling is what interrupts it.
 */
function useExample(id: string, inView: boolean): ComponentType | null {
  const [Example, setExample] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!inView) return;

    const load = exampleLoaders[`${modulePath(id)}.tsx`];
    let current = true;
    let leaveQueue: (() => void) | undefined;

    const show = (component: ComponentType) => {
      if (!current) return;
      leaveQueue = queueBuild(() =>
        startTransition(() => setExample(() => component))
      );
    };

    if (!load) {
      // eslint-disable-next-line no-console
      console.error(`Docs example "${id}" does not exist`);
      show(Nothing);
    } else {
      load()
        .then((module) => show(module.default))
        .catch((error: unknown) => {
          // eslint-disable-next-line no-console
          console.error(`Docs example "${id}" failed to load`, error);
          show(Nothing);
        });
    }

    return () => {
      current = false;
      leaveQueue?.();
    };
  }, [id, inView]);

  // Drawn, so the next component in the queue can be built.
  useEffect(() => {
    if (Example) release();
  }, [Example]);

  return Example;
}

/** The example itself, plus whatever stylesheet it brought with it. */
function CardPreview({
  Example,
  id,
}: {
  Example: ComponentType;
  id: string;
}): ReactElement {
  const css = useMemo(() => {
    const raw = exampleStyles[`${modulePath(id)}.css`];
    return raw ? scopeCss(raw, `.${CATALOG_PREVIEW_CLASS}`) : null;
  }, [id]);

  return (
    <>
      {css ? <style>{css}</style> : null}
      <Example />
    </>
  );
}

/**
 * The previews' theme, with an overlay positioned for a card rather than for a
 * page: see `./cardPopper`. A component reads this from the theme, so a card
 * example is written as an example and not as a piece of the catalog.
 *
 * Built once per mode and shared by every card. A theme of its own for each would
 * be fifty-one identical ones to build before the page first draws, and fifty-one
 * sets of styles for Emotion to hash and keep rather than one.
 */
const cardThemes = new Map<ThemeMode, SDSTheme>();

function cardTheme(mode: ThemeMode): SDSTheme {
  const cached = cardThemes.get(mode);
  if (cached) return cached;

  const base = previewTheme(mode);
  const theme: SDSTheme = {
    ...base,
    components: {
      ...base.components,
      MuiPopper: {
        ...base.components?.MuiPopper,
        defaultProps: {
          ...base.components?.MuiPopper?.defaultProps,
          popperOptions: CARD_POPPER_OPTIONS,
        },
      },
    },
  };

  cardThemes.set(mode, theme);
  return theme;
}

/**
 * One component, as the catalog presents it: a live miniature of it above its
 * name, the pair a single link to its documentation.
 *
 * The miniature is decoration — it is the component's own example, not an
 * illustration of the link — so it is hidden from assistive technology and the
 * name is left to speak for the card.
 */
function CatalogCard({ entry }: { entry: CatalogEntry }): ReactElement {
  const mode = useThemeMode();
  const theme = cardTheme(mode);
  const frameRef = useRef<HTMLDivElement>(null);
  const Example = useExample(entry.example, useInView(frameRef));

  /*
   * Set rather than rendered: `inert` reached React's typings after the version
   * the docs build against, and the attribute has to be in place before the
   * example mounts for its controls never to have been focusable.
   */
  useEffect(() => {
    frameRef.current?.setAttribute("inert", "");
  }, []);

  return (
    <Card data-card={entry.name}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <Frame
            aria-hidden="true"
            className={CATALOG_PREVIEW_CLASS}
            ref={frameRef}
          >
            {Example ? (
              <ExampleErrorBoundary fallback={() => null} id={entry.example}>
                <Stage>
                  <CardPreview Example={Example} id={entry.example} />
                </Stage>
              </ExampleErrorBoundary>
            ) : (
              /* Outside the stage, so that the placeholder is drawn at the size of
                 the card rather than shrunk with the component it stands in for. */
              <Skeleton />
            )}
          </Frame>
        </EmotionThemeProvider>
      </ThemeProvider>
      <a href={`./?path=/docs/${entry.docs}--documentation`} target="_top">
        {entry.name}
      </a>
    </Card>
  );
}

export interface SdsCatalogProps {
  /** The category to list, as its section's `data-catalog` attribute names it. */
  category: string;
}

/**
 * The components of one catalog category, as the Overview page lists them. The
 * category's heading stays in the page's own HTML, where the jump-to nav can
 * find it; this fills in the grid beneath it from
 * `design-docs/pages/Overview/catalog.ts`.
 */
export function SdsCatalog({ category }: SdsCatalogProps): ReactElement {
  const entries = useMemo(
    () => catalog.find(({ slug }) => slug === category)?.entries,
    [category]
  );

  /*
   * A portal is placed in the page but not in the tree, so nothing reaches this
   * from the theme <SdsDoc /> wraps its prose in and the cards have to name it
   * themselves. Light, as the prose is: a card's label and frame sit on the
   * page's own canvas, and only the miniature inside follows the toolbar.
   */
  const theme = useMemo(() => Theme("light"), []);

  if (!entries) {
    return (
      <p className="sds-doc-example-error">
        No such catalog category: <code>{category}</code>.
      </p>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <Grid>
          {entries.map((entry) => (
            <CatalogCard entry={entry} key={entry.docs} />
          ))}
        </Grid>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

export default SdsCatalog;
