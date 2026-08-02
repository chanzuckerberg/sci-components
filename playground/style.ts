import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  fontBodyS,
  fontBodyXs,
  fontHeaderS,
  getCorners,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@components/src/core/styles";

/** Height of the toolbar, and the grab area either side of the split. */
const HEADER_HEIGHT = 48;
const DIVIDER_WIDTH = 9;

/** Below this the two panes have nowhere to go, so they stack. */
export const STACK_BELOW = 840;

export const Layout = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      background-color: ${semanticColors?.base?.backgroundPrimary};
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const Header = styled.header<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      flex: none;
      display: flex;
      align-items: center;
      gap: ${spaces?.m}px;
      height: ${HEADER_HEIGHT}px;
      padding: 0 ${spaces?.l}px;
      border-bottom: 1px solid ${semanticColors?.base?.divider};
    `;
  }}
`;

export const Title = styled.h1`
  ${fontHeaderS}
  margin: 0;
`;

/**
 * Pushes what follows it to the trailing edge of the toolbar, separating the
 * controls that act on the code from those that act on the preview.
 */
export const Spacer = styled.div`
  flex: 1 1 auto;
`;

export const Actions = styled.div<CommonThemeProps>`
  ${(props) => `
    display: flex;
    align-items: center;
    gap: ${getSpaces(props)?.s}px;
  `}
`;

export const Panes = styled.div`
  flex: 1 1 auto;
  display: flex;
  min-height: 0;

  @media (max-width: ${STACK_BELOW}px) {
    flex-direction: column;
  }
`;

/**
 * The editor's column. Its width is driven from the divider below; stacked, the
 * two panes split the height evenly instead and the width is ignored.
 */
export const EditorPane = styled.div<{ widthPercent: number }>`
  ${(props) => `
    flex: 0 0 ${props.widthPercent}%;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;

    @media (max-width: ${STACK_BELOW}px) {
      flex: 1 1 50%;
    }
  `}
`;

export const PreviewPane = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
`;

/**
 * The drag handle between the panes. It is wider than the line it draws so
 * there is something to catch with a pointer, and it disappears when the panes
 * stack, where the split it controls no longer exists.
 */
export const Divider = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      flex: none;
      width: ${DIVIDER_WIDTH}px;
      cursor: col-resize;
      background-color: ${semanticColors?.base?.backgroundPrimary};
      background-clip: content-box;
      border-left: 1px solid ${semanticColors?.base?.divider};
      border-right: 1px solid transparent;

      &:hover {
        border-left-color: ${semanticColors?.accent?.border};
      }

      &:focus-visible {
        outline: 2px solid ${semanticColors?.accent?.borderFocus};
        outline-offset: -2px;
      }

      @media (max-width: ${STACK_BELOW}px) {
        display: none;
      }
    `;
  }}
`;

/**
 * The backdrop the device sits on, which carries the theme being previewed. It
 * is the recessed colour of the two so that the device below reads as a screen
 * laid on top of it rather than as part of the playground's chrome.
 */
export const Surface = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      justify-content: center;
      overflow: auto;
      padding: ${getSpaces(props)?.l}px;
      background-color: ${semanticColors?.base?.backgroundSecondary};
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

/**
 * The device the example is rendered on: the full pane for desktop, a phone's
 * width for mobile. Content reflows at that width natively rather than being
 * scaled, so what is on screen is what the device would render.
 *
 * Drawn as a frame on the backdrop rather than only being narrowed, so that
 * switching between the two reads as a change of device. Narrowing alone is
 * ambiguous at the desktop end, where a wide example fills the pane either way
 * and nothing on screen says which device is selected.
 *
 * The inset reads as the bezel around the screen. A page-width component is
 * given none and fills the screen to its edges, which is the same call the
 * documentation pages make with `data-example-padding`.
 */
export const Viewport = styled.div<
  CommonThemeProps & { padded: boolean; width?: number }
>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      flex: ${props.width === undefined ? "1 1 auto" : "none"};
      width: ${props.width === undefined ? "100%" : `${props.width}px`};
      max-width: 100%;
      min-width: 0;
      display: flex;
      padding: ${props.padded ? getSpaces(props)?.xl : 0}px;

      /* Against the border-box default the reset lays down, so that a device
         width is the width of the screen and not of the bezel around it. */
      box-sizing: content-box;
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: ${getCorners(props)?.xl}px;
      background-color: ${semanticColors?.base?.backgroundPrimary};

      /* The screen scrolls, as a device's does, and what it scrolls is clipped
         to the rounding — which an example that reaches the edges needs. Menus
         and tooltips are laid out against the window and escape this, as they
         should: they are drawn over the device, not on it. */
      overflow: auto;
    `;
  }}
`;

/**
 * The device's screen: the area an example is given, and the box the overlays
 * that fill a screen — a drawer, a dialog — are sized and placed against. The
 * frame holds the padding rather than the stage, which is what lines the top of
 * one of those up with the bottom of the header that opened it.
 */
export const Stage = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  box-sizing: border-box;
  position: relative;

  /* Whatever an example stacks, it stacks against itself. A navigation header
     sits at 2100 so that an app's own content cannot ride over it, which is
     above the 1500 a tooltip gets: without a context of its own here, an
     example would paint over the playground's toolbar. */
  isolation: isolate;

  /* Components count on the reset a story gets from <CssBaseline />: a padded
     \`width: 100%\` content box otherwise overflows its own card. */
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

/** A compile, evaluate or render failure, reported in place of the example. */
export const Message = styled.p<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      ${fontBodyS(props)}
      margin: 0 0 ${spaces?.l}px;
      padding: ${spaces?.m}px ${spaces?.l}px;
      border: 1px solid ${semanticColors?.negative?.border};
      border-radius: 4px;
      background-color: ${semanticColors?.negative?.surfaceSecondary};
      color: ${semanticColors?.negative?.text};
      white-space: pre-wrap;
    `;
  }}
`;

/** Editor-pane status line: what the last run did, and whether one is pending. */
export const Status = styled.div<CommonThemeProps & { isError: boolean }>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      ${fontBodyXs(props)}
      flex: none;
      padding: ${spaces?.xs}px ${spaces?.l}px;
      border-top: 1px solid ${semanticColors?.base?.divider};
      color: ${props.isError
        ? semanticColors?.negative?.text
        : semanticColors?.base?.textSecondary};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  }}
`;

export const EditorSurface = styled.div`
  flex: 1 1 auto;
  min-height: 0;
`;
