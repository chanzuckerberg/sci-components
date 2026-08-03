import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";
import {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
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
} from "@components/src/core/styles";
import {
  catalog,
  type CatalogEntry,
} from "../design-docs/pages/Overview/catalog";
import { CATALOG_PREVIEW_CLASS } from "./constants";
import {
  ExampleErrorBoundary,
  exampleLoaders,
  exampleStyles,
  modulePath,
  scopeCss,
} from "./exampleRegistry";
import { previewTheme } from "./previewTheme";
import { useThemeMode } from "./useThemeMode";

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
 * The cropped window a card shows its component through. Painted in the
 * previews' theme rather than the page's, so a miniature sits on the surface it
 * was designed against when the toolbar is switched to dark.
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
      background-color: ${semanticColors?.base?.backgroundPrimary};
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: ${corners?.m}px;
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

  /* Left-aligned, and vertically centred only while there is room to centre:
     "safe" hands the alignment back to the start once the component is taller
     than the card, so a table is cropped along its bottom edge instead of
     losing the header row off the top. Either way the crop is on one edge, and
     reads as a view into something larger rather than as a piece with both ends
     missing. */
  display: grid;
  align-content: safe center;
  justify-items: start;
  padding: ${STAGE_PADDING}px;

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

  a {
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

  a::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${(props) => getCorners(props)?.m}px;
  }

  &:hover ${Frame} {
    border-color: ${(props) => getSemanticColors(props)?.accent?.border};
  }
  &:hover a {
    color: ${(props) => getSemanticColors(props)?.accent?.textActionHover};
  }

  a:focus-visible {
    outline: none;
  }
  a:focus-visible::after {
    outline: 2px solid
      ${(props) => getSemanticColors(props)?.accent?.borderSelected};
    outline-offset: 2px;
  }
`;

/**
 * Whether the element has come near enough to the window to be worth building.
 * Latches on: a card that has been rendered once stays rendered, so scrolling
 * back over the page does not rebuild it.
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

/** The example itself, plus whatever stylesheet it brought with it. */
function CardPreview({ id }: { id: string }): ReactElement | null {
  const Example = useMemo(() => {
    const load = exampleLoaders[`${modulePath(id)}.tsx`];
    return load ? lazy(load) : null;
  }, [id]);

  const css = useMemo(() => {
    const raw = exampleStyles[`${modulePath(id)}.css`];
    return raw ? scopeCss(raw, `.${CATALOG_PREVIEW_CLASS}`) : null;
  }, [id]);

  if (!Example) return null;

  return (
    <>
      {css ? <style>{css}</style> : null}
      <Suspense fallback={null}>
        <Example />
      </Suspense>
    </>
  );
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
  const theme = useMemo(() => previewTheme(mode), [mode]);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef);

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
            {inView ? (
              <Stage>
                <ExampleErrorBoundary fallback={() => null} id={entry.example}>
                  <CardPreview id={entry.example} />
                </ExampleErrorBoundary>
              </Stage>
            ) : null}
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
