# Colors

Color helps communicate usage and intent while providing brand distinction. The SDS palette has been selected for meaning, accessibility, and cohesion.

## Semantic Colors

## Color Overview

SDS uses a pragmatic naming system for its color variables that ensures consistency around how colors are used across UI elements. Colors are split into three types—Primitive, Semantic, and Visualization—and two modes—Light and Dark (Visualization Colors are currently only available in Light Mode); see Theming for more details about implementing Dark Mode.

Primitive Colors are base variables that tie directly to hex codes whereas Semantic Colors take these Primitive Color variables and map them to new variables that are specific to UI elements, intents, and states. Visualization Colormaps are specifically for use in data visualizations.

## Semantic Colors

While Primitive Color variables define the individual colors within the design system, Semantic Color variables define how those colors are used throughout it. Each element in the design system that can have color applied to it, whether a border, a background, a piece of text, etc., is built using Semantic Color variables.

Semantic Color variables are named in such a way as to create predictable usage across SDS. They start with the variable group, followed by the element it is applied to, and then add any number of modifiers to communicate the color's specific application within the UI, such as prominence or state.

Because Semantic Color variables are scoped to individual UI elements, a single Primitive Color variable, such as _blue500_ (Light Mode) or _blue600_ (Dark Mode), can be mapped to a range of Semantic Color variables like _Accent.border_, _Accent.ornament_, _Accent.text-action_, etc. since all of these elements are the same color.

| Light Mode | Dark Mode |
| :--------: | :-------: |

### Semantic Color Variable Groups

---

### Base Colors

#### Background and Surface

Base Surface and Background colors create dimension, hierarchy, and separation between content.

_Background-primary_ is used for the empty space that a page's content is placed upon (i.e., the page's main or base-level background). _Background-secondary_ and _background-tertiary_ are used when additional hierarchy is needed within one layer.

Always implement the Background Colors in order, such that _background-secondary_ is layered on top of _background-primary_ and _background-tertiary_ is layered on top of _background-secondary_; never layer _background-tertiary_ directly on top of _background-primary_.

Use _surface_ for elements that are placed at a higher elevation than the page's main content such as the case with Dropdown Menu or Dialog.

When greater visual contrast is needed use _background-primary-inverse, background-secondary-inverse,_ and _surface-inverse_.

| Light Mode | Dark Mode |
| :--------: | :-------: |

| Name                         |     | Figma Variable                                                                                       |     | CSS / SCSS Variables                                                                                                                                                                                                                                 |
| ---------------------------- | --- | ---------------------------------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| background-primary           |     | Light: Base.background-primary (#ffffff) Dark: Base.background-primary (#101010)                     |     | CSS light / dark: `--sds-color-semantic-component-base-background-primary` SCSS light: `$sds-color-semantic-component-base-background-primary` SCSS dark: `$sds-color-semantic-component-base-background-primary-dark`                               |
| background-secondary         |     | Light: Base.background-secondary (#f8f8f8) Dark: Base.background-secondary (#333333)                 |     | CSS light / dark: `--sds-color-semantic-component-base-background-secondary` SCSS light: `$sds-color-semantic-component-base-background-secondary` SCSS dark: `$sds-color-semantic-component-base-background-secondary-dark`                         |
| background-tertiary          |     | Light: Base.background-tertiary (#ededed) Dark: Base.background-tertiary (#494949)                   |     | CSS light / dark: `--sds-color-semantic-component-base-background-tertiary` SCSS light: `$sds-color-semantic-component-base-background-tertiary` SCSS dark: `$sds-color-semantic-component-base-background-tertiary-dark`                            |
| background-primary-inverse   |     | Light: Base.background-primary-inverse (#000000) Dark: Base.background-primary-inverse (#ffffff)     |     | CSS light / dark: `--sds-color-semantic-component-base-background-primary-inverse` SCSS light: `$sds-color-semantic-component-base-background-primary-inverse` SCSS dark: `$sds-color-semantic-component-base-background-primary-inverse-dark`       |
| background-secondary-inverse |     | Light: Base.background-secondary-inverse (#3b3b3b) Dark: Base.background-secondary-inverse (#ededed) |     | CSS light / dark: `--sds-color-semantic-component-base-background-secondary-inverse` SCSS light: `$sds-color-semantic-component-base-background-secondary-inverse` SCSS dark: `$sds-color-semantic-component-base-background-secondary-inverse-dark` |
| surface                      |     | Light: Base.surface (#ffffff) Dark: Base.surface (#333333)                                           |     | CSS light / dark: `--sds-color-semantic-component-base-surface` SCSS light: `$sds-color-semantic-component-base-surface` SCSS dark: `$sds-color-semantic-component-base-surface-dark`                                                                |
| surface-inverse              |     | Light: Base.surface-inverse (#000000) Dark: Base.surface-inverse (#ededed)                           |     | CSS light / dark: `--sds-color-semantic-component-base-surface-inverse` SCSS light: `$sds-color-semantic-component-base-surface-inverse` SCSS dark: `$sds-color-semantic-component-base-surface-inverse-dark`                                        |

#### Fill

Base Fill colors are used for element backgrounds that are interactive and change in response to users hovering, pressing, etc.

| Light Mode | Dark Mode |
| :--------: | :-------: |

| Name          |     | Figma Variable                                                                                               |     | CSS / SCSS Variable                                                                                                                                                                                     |
| ------------- | --- | ------------------------------------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary  |     | Light: Base.fill-primary (#ffffff) Dark: Base.fill-primary (#333333)                                         |     | CSS light / dark: `--sds-color-semantic-component-base-fill-primary` SCSS light: `$sds-color-semantic-component-base-fill-primary` SCSS dark: `$sds-color-semantic-component-base-fill-primary-dark`    |
| fill-hover    |     | Light: Base.fill-hover (rgba(195, 195, 195, 0.2800)) Dark: Base.fill-hover (rgba(105, 105, 105, 0.2800))     |     | CSS light / dark: `--sds-color-semantic-component-base-fill-hover` SCSS light: `$sds-color-semantic-component-base-fill-hover` SCSS dark: `$sds-color-semantic-component-base-fill-hover-dark`          |
| fill-pressed  |     | Light: Base.fill-pressed (rgba(195, 195, 195, 0.2800)) Dark: Base.fill-pressed (rgba(105, 105, 105, 0.2800)) |     | CSS light / dark: `--sds-color-semantic-component-base-fill-pressed` SCSS light: `$sds-color-semantic-component-base-fill-pressed` SCSS dark: `$sds-color-semantic-component-base-fill-pressed-dark`    |
| fill-open     |     | Light: Base.fill-open (rgba(195, 195, 195, 0.2800)) Dark: Base.fill-open (rgba(105, 105, 105, 0.2800))       |     | CSS light / dark: `--sds-color-semantic-component-base-fill-open` SCSS light: `$sds-color-semantic-component-base-fill-open` SCSS dark: `$sds-color-semantic-component-base-fill-open-dark`             |
| fill-selected |     | Light: Base.fill-selected (#000000) Dark: Base.fill-selected (#ffffff)                                       |     | CSS light / dark: `--sds-color-semantic-component-base-fill-selected` SCSS light: `$sds-color-semantic-component-base-fill-selected` SCSS dark: `$sds-color-semantic-component-base-fill-selected-dark` |
| fill-disabled |     | Light: Base.fill-disabled (#dfdfdf) Dark: Base.fill-disabled (#494949)                                       |     | CSS light / dark: `--sds-color-semantic-component-base-fill-disabled` SCSS light: `$sds-color-semantic-component-base-fill-disabled` SCSS dark: `$sds-color-semantic-component-base-fill-disabled-dark` |

#### Border and Divider

Base Border colors are used for element borders.

Base _border-table_ is intended to be used only on the borders that separate rows and columns in Tables.

Base _divider_ is intended to be used only on horizontal dividers that separate blocks of content.

| Light Mode | Dark Mode |
| :--------: | :-------: |

| **Name**                        |     | **Figma Variable**                                                                                         |     | **CSS / SCSS Variable**                                                                                                                                                                                                                                       |
| ------------------------------- | --- | ---------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border-primary                  |     | Light: Base.border-primary (#7a7a7a) Dark: Base.border-primary (#cdcdcd)                                   |     | CSS light / dark: `--sds-color-semantic-component-base-border-primary` SCSS light: `$sds-color-semantic-component-base-border-primary` SCSS dark: `$sds-color-semantic-component-base-border-primary-dark`                                                    |
| border-primary-hover            |     | Light: Base.border-primary-hover (#000000) Dark: Base.border-primary-hover (#ffffff)                       |     | CSS light / dark: `--sds-color-semantic-component-base-border-hover` SCSS light: `$sds-color-semantic-component-base-border-primary-hover` SCSS dark: `$sds-color-semantic-component-base-border-primary-hover-dark`                                          |
| border-primary-pressed          |     | Light: Base.border-primary-pressed (#000000) Dark: Base.border-primary-pressed (#ffffff)                   |     | CSS light / dark: `--sds-color-semantic-component-base-border-primary-pressed` SCSS light: `$sds-color-semantic-component-base-border-primary-pressed` SCSS dark: `$sds-color-semantic-component-base-border-primary-pressed-dark`                            |
| border-primary-disabled         |     | Light: Base.border-primary-disabled (#c3c3c3) Dark: Base.border-primary-disabled (#696969)                 |     | CSS light / dark: `--sds-color-semantic-component-base-border-primary-disabled` SCSS light: `$sds-color-semantic-component-base-border-primary-disabled` SCSS dark: `$sds-color-semantic-component-base-border-primary-disabled-dark`                         |
| border-secondary                |     | Light: Base.border-secondary (#c3c3c3) Dark: Base.border-secondary (#696969)                               |     | CSS light / dark: `--sds-color-semantic-component-base-border-secondary` SCSS light: `$sds-color-semantic-component-base-border-secondary` SCSS dark: `$sds-color-semantic-component-base-border-secondary-dark`                                              |
| border-primary-inverse          |     | Light: Base.border-primary-inverse (#c3c3c3) Dark: Base.border-primary-inverse (#696969)                   |     | CSS light / dark: `--sds-color-semantic-component-base-border-primary-inverse` SCSS light: `$sds-color-semantic-component-base-border-primary-inverse` SCSS dark: `$sds-color-semantic-component-base-border-primary-inverse-dark`                            |
| border-primary-hover-inverse    |     | Light: Base.border-primary-hover-inverse (#ffffff) Dark: Base.border-primary-hover-inverse (#000000)       |     | CSS light / dark: `--sds-color-semantic-component-base-border-primary-hover-inverse` SCSS light: `$sds-color-semantic-component-base-border-primary-hover-inverse` SCSS dark: `$sds-color-semantic-component-base-border-primary-hover-inverse-dark`          |
| border-primary-pressed-inverse  |     | Light: Base.border-primary-pressed-inverse (#ffffff) Dark: Base.border-primary-pressed-inverse (#000000)   |     | CSS light / dark: `--sds-color-semantic-component-base-border-primary-pressed-inverse` SCSS light: `$sds-color-semantic-component-base-border-primary-pressed-inverse` SCSS dark: `$sds-color-semantic-component-base-border-primary-pressed-inverse-dark`    |
| border-primary-disabled-inverse |     | Light: Base.border-primary-disabled-inverse (#7a7a7a) Dark: Base.border-primary-disabled-inverse (#cdcdcd) |     | CSS light / dark: `--sds-color-semantic-component-base-border-primary-disabled-inverse` SCSS light: `$sds-color-semantic-component-base-border-primary-disabled-inverse` SCSS dark: `$sds-color-semantic-component-base-border-primary-disabled-inverse-dark` |
| border-on-fill                  |     | Light: Base.border-on-fill (#ffffff) Dark: Base.border-on-fill (#000000)                                   |     | CSS light / dark: `--sds-color-semantic-component-base-border-on-fill` SCSS light: `$sds-color-semantic-component-base-border-on-fill` SCSS dark: `$sds-color-semantic-component-base-border-on-fill-dark`                                                    |
| divider                         |     | Light: Base.divider (#dfdfdf) Dark: Base.divider (#494949)                                                 |     | CSS light / dark: `--sds-color-semantic-component-base-divider` SCSS light: `$sds-color-semantic-component-base-divider` SCSS dark: `$sds-color-semantic-component-base-divider-dark`                                                                         |
| divider-inverse                 |     | Light: Base.divider-inverse (#7a7a7a) Dark: Base.divider-inverse (#cdcdcd)                                 |     | CSS light / dark: `--sds-color-semantic-component-base-divider-inverse` SCSS light: `$sds-color-semantic-component-base-divider-inverse` SCSS dark: `$sds-color-semantic-component-base-divider-inverse-dark`                                                 |

#### Ornament

Base Ornament colors are used primarily in components that contain icons that are integral to their functionality, such as Accordions, Dropdown Inputs, etc.

When the fill of the element that the ornament is placed on top of is too dark in both Light Mode and Dark Mode, and using the same color in both modes is needed to pass visual accessibility, such as the icon inside primary Buttons, use _ornament-on-fill_.

When visual contrast is needed use _ornament-primary-inverse_.

| Light Mode | Dark Mode |
| :--------: | :-------: |

| **Name**                   |     | **Figma Variable**                                                                               |     | **CSS / SCSS Variable**                                                                                                                                                                                                                        |
| -------------------------- | --- | ------------------------------------------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament-primary           |     | Light: Base.ornament-primary (#000000) Dark: Base.ornament-primary (#ffffff)                     |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-primary` SCSS light: `$sds-color-semantic-component-base-ornament-primary` SCSS dark: `$sds-color-semantic-component-base-ornament-primary-dark`                               |
| ornament-secondary         |     | Light: Base.ornament-secondary (#7a7a7a) Dark: Base.ornament-secondary (#cdcdcd)                 |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-secondary` SCSS light: `$sds-color-semantic-component-base-ornament-secondary` SCSS dark: `$sds-color-semantic-component-base-ornament-secondary-dark`                         |
| ornament-secondary-hover   |     | Light: Base.ornament-secondary-hover (#000000) Dark: Base.ornament-secondary-hover (#ffffff)     |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-secondary-hover` SCSS light: `$sds-color-semantic-component-base-ornament-secondary-hover` SCSS dark: `$sds-color-semantic-component-base-ornament-secondary-hover-dark`       |
| ornament-secondary-pressed |     | Light: Base.ornament-secondary-pressed (#000000) Dark: Base.ornament-secondary-pressed (#ffffff) |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-secondary-pressed` SCSS light: `$sds-color-semantic-component-base-ornament-secondary-pressed` SCSS dark: `$sds-color-semantic-component-base-ornament-secondary-pressed-dark` |
| ornament-primary-inverse   |     | Light: Base.ornament-primary-inverse (#ffffff) Dark: Base.ornament-primary-inverse (#000000)     |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-primary-inverse` SCSS light: `$sds-color-semantic-component-base-ornament-primary-inverse` SCSS dark: `$sds-color-semantic-component-base-ornament-primary-inverse-dark`       |
| ornament-secondary-inverse |     | Light: Base.ornament-secondary-inverse (#c3c3c3) Dark: Base.ornament-secondary-inverse (#696969) |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-secondary-inverse` SCSS light: `$sds-color-semantic-component-base-ornament-secondary-inverse` SCSS dark: `$sds-color-semantic-component-base-ornament-secondary-inverse-dark` |
| ornament-on-fill           |     | Light: Base.ornament-on-fill (#ffffff) Dark: Base.ornament-on-fill (#ffffff)                     |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-on-fill` SCSS light: `$sds-color-semantic-component-base-ornament-on-fill` SCSS dark: `$sds-color-semantic-component-base-ornament-on-fill-dark`                               |
| ornament-disabled          |     | Light: Base.ornament-disabled (#c3c3c3) Dark: Base.ornament-disabled (#696969)                   |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-disabled` SCSS light: `$sds-color-semantic-component-base-ornament-disabled` SCSS dark: `$sds-color-semantic-component-base-ornament-disabled-dark`                            |
| ornament-disabled-inverse  |     | Light: Base.ornament-disabled-inverse (#7a7a7a) Dark: Base.ornament-disabled-inverse (#cdcdcd)   |     | CSS light / dark: `--sds-color-semantic-component-base-ornament-disabled-inverse` SCSS light: `$sds-color-semantic-component-base-ornament-disabled-inverse` SCSS dark: `$sds-color-semantic-component-base-ornament-disabled-inverse-dark`    |

#### Text

Base Text colors are to be used for text throughout applications built using SDS.

If there is a need to communicate that a text element is interactive, such as a Link, or indicate a specific intent, such as beta, info, negative, neutral, notice, or positive, use the Text Color variable that aligns to those needs as shown in the corresponding sections below.

Base _text-primary-inverse_ and _text-secondary-inverse_ are used only when the fill of the element that the text is placed on top of is too dark or light to be legible and an alternate color is needed to pass visual accessibility, such as the text inside inverted Tooltips.

When the fill of the element that the text is placed on top of is too dark in both Light Mode and Dark Mode, and using the same color in both modes is needed to pass visual accessibility, such as the text inside primary Buttons, use _text-on-fill_.

| Light Mode | Dark Mode |
| :--------: | :-------: |

| **Name**          |     | **Figma Variable**                                                             |     | **CSS / SCSS Variable**                                                                                                                                                                              |
| ----------------- | --- | ------------------------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| primary           |     | Light: Text.primary (#000000) Dark: Text.primary (#ffffff)                     |     | CSS light / dark: `--sds-color-semantic-base-text-primary` SCSS light: `$sds-color-semantic-base-text-primary` SCSS dark: `$sds-color-semantic-base-text-primary-dark`                               |
| secondary         |     | Light: Text.secondary (#7a7a7a) Dark: Text.secondary (#cdcdcd)                 |     | CSS light / dark: `--sds-color-semantic-base-text-secondary` SCSS light: `$sds-color-semantic-base-text-secondary` SCSS dark: `$sds-color-semantic-base-text-secondary-dark`                         |
| tertiary          |     | Light: Text.tertiary (#a5a5a5) Dark: Text.tertiary (#9b9b9b)                   |     | CSS light / dark: `--sds-color-semantic-base-text-tertiary` SCSS light: `$sds-color-semantic-base-text-tertiary` SCSS dark: `$sds-color-semantic-base-text-tertiary-dark`                            |
| primary-inverse   |     | Light: Text.primary-inverse (#ffffff) Dark: Text.primary-inverse (#000000)     |     | CSS light / dark: `--sds-color-semantic-base-text-primary-inverse` SCSS light: `$sds-color-semantic-base-text-primary-inverse` SCSS dark: `$sds-color-semantic-base-text-primary-inverse-dark`       |
| secondary-inverse |     | Light: Text.secondary-inverse (#c3c3c3) Dark: Text.secondary-inverse (#696969) |     | CSS light / dark: `--sds-color-semantic-base-text-secondary-inverse` SCSS light: `$sds-color-semantic-text-base-secondary-inverse` SCSS dark: `$sds-color-semantic-text-base-secondary-inverse-dark` |
| tertiary-inverse  |     | Light: Text.tertiary-inverse (#969696) Dark: Text.tertiary-inverse (#aaaaaa)   |     | CSS light / dark: `--sds-color-semantic-base-text-tertiary-inverse` SCSS light: `$sds-color-semantic-base-text-tertiary-inverse` SCSS dark: `$sds-color-semantic-base-text-tertiary-inverse-dark`    |
| on-fill           |     | Light: Text.on-fill (#ffffff) Dark: Text.on-fill (#ffffff)                     |     | CSS light / dark: `--sds-color-semantic-base-text-on-fill` SCSS light: `$sds-color-semantic-base-text-on-fill` SCSS dark: `$sds-color-semantic-base-text-on-fill-dark`                               |
| disabled          |     | Light: Text.disabled (#c3c3c3) Dark: Text.disabled (#696969)                   |     | CSS light / dark: `--sds-color-semantic-base-text-disabled` SCSS light: `$sds-color-semantic-base-text-disabled` SCSS dark: `$sds-color-semantic-base-text-disabled-dark`                            |
| disabled-inverse  |     | Light: Text.disabled-inverse (#7a7a7a) Dark: Text.disabled-inverse (#cdcdcd)   |     | CSS light / dark: `--sds-color-semantic-base-text-disabled-inverse` SCSS light: `$sds-color-semantic-base-text-disabled-inverse` SCSS dark: `$sds-color-semantic-base-text-disabled-inverse-dark`    |

---

### Action Colors

#### Text

Action Text colors are used to communicate that a block of text is interactive, such as a Link.

| **Name**       |     | **Figma Variable**                                                       |     | **CSS / SCSS Variable**                                                                                                                                                                           |
| -------------- | --- | ------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action         |     | Light: Text.action (#1a6cef) Dark: Text.action (#a2c9ff)                 |     | CSS light / dark: `--sds-color-semantic-accent-text-action` SCSS light: `$sds-color-semantic-accent-text-action` SCSS dark: `$sds-color-semantic-accent-text-action-dark`                         |
| action-hover   |     | Light: Text.action-hover (#0041b9) Dark: Text.action-hover (#cde3ff)     |     | CSS light / dark: `--sds-color-semantic-accent-text-action-hover` SCSS light: `$sds-color-semantic-accent-text-action-hover` SCSS dark: `$sds-color-semantic-accent-text-action-hover-dark`       |
| action-pressed |     | Light: Text.action-pressed (#002d90) Dark: Text.action-pressed (#e2eeff) |     | CSS light / dark: `--sds-color-semantic-accent-text-action-pressed` SCSS light: `$sds-color-semantic-accent-text-action-pressed` SCSS dark: `$sds-color-semantic-accent-text-action-pressed-dark` |

---

### Accent Colors

#### Surface

Accent Surface colors are used for the background and fills of non-interactive elements or sections that use an application's primary color.

| **Name**          |     | **Figma Variable**                                                                 |     | **CSS / SCSS Variable**                                                                                                                                                                                                   |
| ----------------- | --- | ---------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| surface-primary   |     | Light: Accent.surface-primary (#1a6cef) Dark: Accent.surface-primary (#2573f4)     |     | CSS light / dark: `--sds-color-semantic-component-accent-surface-primary` SCSS light: `$sds-color-semantic-component-accent-surface-primary` SCSS dark: `$sds-color-semantic-component-accent-surface-primary-dark`       |
| surface-secondary |     | Light: Accent.surface-secondary (#edf3fd) Dark: Accent.surface-secondary (#0f1d4a) |     | CSS light / dark: `--sds-color-semantic-component-accent-surface-secondary` SCSS light: `$sds-color-semantic-component-accent-surface-secondary` SCSS dark: `$sds-color-semantic-component-accent-surface-secondary-dark` |

#### Fill

Accent Fill Colors are used on elements where the primary color is needed that are interactive and change in response to users hovering, pressing, etc.

| **Name**     |     | **Figma Variable**                                                       |     | **CSS / SCSS Variable**                                                                                                                                                                                    |
| ------------ | --- | ------------------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary |     | Light: Accent.fill-primary (#1a6cef) Dark: Accent.fill-primary (#2573f4) |     | CSS light / dark: `--sds-color-semantic-component-accent-fill-primary` SCSS light: `$sds-color-semantic-component-accent-fill-primary` SCSS dark: `$sds-color-semantic-component-accent-fill-primary-dark` |
| fill-hover   |     | Light: Accent.fill-hover (#0041b9) Dark: Accent.fill-hover (#cde3ff)     |     | CSS light / dark: `--sds-color-semantic-component-accent-fill-hover` SCSS light: `$sds-color-semantic-component-accent-fill-hover` SCSS dark: `$sds-color-semantic-component-accent-fill-hover-dark`       |
| fill-pressed |     | Light: Accent.fill-pressed (#002d90) Dark: Accent.fill-pressed (#e2eeff) |     | CSS light / dark: `--sds-color-semantic-component-accent-fill-pressed` SCSS light: `$sds-color-semantic-component-accent-fill-pressed` SCSS dark: `$sds-color-semantic-component-accent-fill-pressed-dark` |

#### Border

Accent Border Colors are used on interactive elements with borders.

| **Name**        |     | **Figma Variable**                                                             |     | **CSS / SCSS Variable**                                                                                                                                                                                             |
| --------------- | --- | ------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border          |     | Light: Accent.border (#1a6cef) Dark: Accent.border (#a2c9ff)                   |     | CSS light / dark: `--sds-color-semantic-component-accent-border` SCSS light: `$sds-color-semantic-component-accent-border` SCSS dark: `$sds-color-semantic-component-accent-border-dark`                            |
| border-hover    |     | Light: Accent.border-hover (#0041b9) Dark: Accent.border-hover (#cde3ff)       |     | CSS light / dark: `--sds-color-semantic-component-accent-border-hover` SCSS light: `$sds-color-semantic-component-accent-border-hover` SCSS dark: `$sds-color-semantic-component-accent-border-hover-dark`          |
| border-pressed  |     | Light: Accent.border-pressed (#002d90) Dark: Accent.border-pressed (#e2eeff)   |     | CSS light / dark: `--sds-color-semantic-component-accent-border-pressed` SCSS light: `$sds-color-semantic-component-accent-border-pressed` SCSS dark: `$sds-color-semantic-component-accent-border-pressed-dark`    |
| border-open     |     | Light: Accent.border-open (#1a6cef) Dark: Accent.border-open (#a2c9ff)         |     | CSS light / dark: `--sds-color-semantic-component-accent-border-open` SCSS light: `$sds-color-semantic-component-accent-border-open` SCSS dark: `$sds-color-semantic-component-accent-border-open-dark`             |
| border-focus    |     | Light: Accent.border-focus (#1a6cef) Dark: Accent.border-focus (#a2c9ff)       |     | CSS light / dark: `--sds-color-semantic-component-accent-border-focus` SCSS light: `$sds-color-semantic-component-accent-border-focus` SCSS dark: `$sds-color-semantic-component-accent-border-focus-dark`          |
| border-selected |     | Light: Accent.border-selected (#1a6cef) Dark: Accent.border-selected (#a2c9ff) |     | CSS light / dark: `--sds-color-semantic-component-accent-border-selected` SCSS light: `$sds-color-semantic-component-accent-border-selected` SCSS dark: `$sds-color-semantic-component-accent-border-selected-dark` |

#### Ornament

Accent _ornament_ is used whenever an interactive element contains an icon or other small area of color that needs to be displayed in the accent color.

| **Name**          |     | **Figma Variable**                                                                 |     | **CSS / SCSS Variable**                                                                                                                                                                                                   |
| ----------------- | --- | ---------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament          |     | Light: Accent.ornament (#1a6cef) Dark: Accent.ornament (#a2c9ff)                   |     | CSS light / dark: `--sds-color-semantic-component-accent-ornament` SCSS light: `$sds-color-semantic-component-accent-ornament` SCSS dark: `$sds-color-semantic-component-accent-ornament-dark`                            |
| ornament-hover    |     | Light: Accent.ornament-hover (#0041b9) Dark: Accent.ornament-hover (#cde3ff)       |     | CSS light / dark: `--sds-color-semantic-component-accent-ornament-hover` SCSS light: `$sds-color-semantic-component-accent-ornament-hover` SCSS dark: `$sds-color-semantic-component-accent-ornament-hover-dark`          |
| ornament-pressed  |     | Light: Accent.ornament-pressed (#002d90) Dark: Accent.ornament-pressed (#e2eeff)   |     | CSS light / dark: `--sds-color-semantic-component-accent-ornament-pressed` SCSS light: `$sds-color-semantic-component-accent-ornament-pressed` SCSS dark: `$sds-color-semantic-component-accent-ornament-pressed-dark`    |
| ornament-open     |     | Light: Accent.ornament-open (#1a6cef) Dark: Accent.ornament-open (#a2c9ff)         |     | CSS light / dark: `--sds-color-semantic-component-accent-ornament-open` SCSS light: `$sds-color-semantic-component-accent-ornament-open` SCSS dark: `$sds-color-semantic-component-accent-ornament-open-dark`             |
| ornament-focus    |     | Light: Accent.ornament-focus (#1a6cef) Dark: Accent.ornament-focus (#a2c9ff)       |     | CSS light / dark: `--sds-color-semantic-component-accent-ornament-focus` SCSS light: `$sds-color-semantic-component-accent-ornament-focus` SCSS dark: `$sds-color-semantic-component-accent-ornament-focus-dark`          |
| ornament-selected |     | Light: Accent.ornament-selected (#1a6cef) Dark: Accent.ornament-selected (#a2c9ff) |     | CSS light / dark: `--sds-color-semantic-component-accent-ornament-selected` SCSS light: `$sds-color-semantic-component-accent-ornament-selected` SCSS dark: `$sds-color-semantic-component-accent-ornament-selected-dark` |

---

### Beta Colors

#### Surface

Beta Surface colors are used for the backgrounds and fills of non-interactive elements or sections that communicate a Beta intent.

| **Name**          |     | **Figma Variable**                                                             |     | **CSS / SCSS Variable**                                                                                                                                                                                             |
| ----------------- | --- | ------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| surface-primary   |     | Light: Beta.surface-primary (#8b54e2) Dark: Beta.surface-primary (#905de6)     |     | CSS light / dark: `--sds-color-semantic-component-beta-surface-primary` SCSS light: `$sds-color-semantic-component-beta-surface-primary` SCSS dark: `$sds-color-semantic-component-beta-surface-primary-dark`       |
| surface-secondary |     | Light: Beta.surface-secondary (#efeafe) Dark: Beta.surface-secondary (#331252) |     | CSS light / dark: `--sds-color-semantic-component-beta-surface-secondary` SCSS light: `$sds-color-semantic-component-beta-surface-secondary` SCSS dark: `$sds-color-semantic-component-beta-surface-secondary-dark` |

#### Fill

Beta Fill Colors are used on elements that are interactive and change in response to users hovering, pressing, etc. where a Beta intent needs to be communicated.

| **Name**       |     | **Figma Variable**                                                       |     | **CSS / SCSS Variable**                                                                                                                                                                                    |
| -------------- | --- | ------------------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary   |     | Light: Beta.fill-primary (#8b54e2) Dark: Beta.fill-primary (#905de6)     |     | CSS light / dark: `--sds-color-semantic-component-beta-fill-primary` SCSS light: `$sds-color-semantic-component-beta-fill-primary` SCSS dark: `$sds-color-semantic-component-beta-fill-primary-dark`       |
| fill-hover     |     | Light: Beta.fill-hover (#6526b5) Dark: Beta.fill-hover (#e4dcfc)         |     | CSS light / dark: `--sds-color-semantic-component-beta-fill-hover` SCSS light: `$sds-color-semantic-component-beta-fill-hover` SCSS dark: `$sds-color-semantic-component-beta-fill-hover-dark`             |
| fill-pressed   |     | Light: Beta.fill-pressed (#490092) Dark: Beta.fill-pressed (#f0ebfe)     |     | CSS light / dark: `--sds-color-semantic-component-beta-fill-pressed` SCSS light: `$sds-color-semantic-component-beta-fill-pressed` SCSS dark: `$sds-color-semantic-component-beta-fill-pressed-dark`       |
| fill-secondary |     | Light: Beta.fill-secondary (#efeafe) Dark: Beta.fill-secondary (#331252) |     | CSS light / dark: `--sds-color-semantic-component-beta-fill-secondary` SCSS light: `$sds-color-semantic-component-beta-fill-secondary` SCSS dark: `$sds-color-semantic-component-beta-fill-secondary-dark` |

#### Border

Beta _border_ is used on element borders that need to communicate a Beta intent.

| **Name** |     | **Figma Variable**                                       |     | **CSS / SCSS Variable**                                                                                                                                                            |
| -------- | --- | -------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border   |     | Light: Beta.border (#6526b5) Dark: Beta.border (#cebef8) |     | CSS light / dark: `--sds-color-semantic-component-beta-border` SCSS light: `$sds-color-semantic-component-beta-border` SCSS dark: `$sds-color-semantic-component-beta-border-dark` |

#### Ornament

Beta _ornament_ is used whenever a Beta intent needs to be communicated visually on an icon or other small colored element.

| **Name** |     | **Figma Variable**                                           |     | **CSS / SCSS Variable**                                                                                                                                                                  |
| -------- | --- | ------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament |     | Light: Beta.ornament (#6526b5) Dark: Beta.ornament (#cebef8) |     | CSS light / dark: `--sds-color-semantic-component-beta-ornament` SCSS light: `$sds-color-semantic-component-beta-ornament` SCSS dark: `$sds-color-semantic-component-beta-ornament-dark` |

#### Text

The Beta _text_ variable is used whenever text needs to communicate a Beta intent.

| **Name**  |     | **Figma Variable**                                   |     | **CSS / SCSS Variable**                                                                                                                                                      |
| --------- | --- | ---------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-beta |     | Light: Text.beta (#6526b5) Dark: Text.beta (#cebef8) |     | CSS light / dark: `--sds-color-semantic-component-beta-text` SCSS light: `$sds-color-semantic-component-beta-text` SCSS dark: `$sds-color-semantic-component-beta-text-dark` |

---

### Info Colors

#### Surface

Info Surface colors are used for the backgrounds and fills of non-interactive elements or sections that communicate an Info intent.

| **Name**          |     | **Figma Variable**                                                             |     | **CSS / SCSS Variable**                                                                                                                                                                                             |
| ----------------- | --- | ------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| surface-primary   |     | Light: Info.surface-primary (#1a6cef) Dark: Info.surface-primary (#2573f4)     |     | CSS light / dark: `--sds-color-semantic-component-info-surface-primary` SCSS light: `$sds-color-semantic-component-info-surface-primary` SCSS dark: `$sds-color-semantic-component-info-surface-primary-dark`       |
| surface-secondary |     | Light: Info.surface-secondary (#edf3fd) Dark: Info.surface-secondary (#0f1d4a) |     | CSS light / dark: `--sds-color-semantic-component-info-surface-secondary` SCSS light: `$sds-color-semantic-component-info-surface-secondary` SCSS dark: `$sds-color-semantic-component-info-surface-secondary-dark` |

#### Fill

Info Fill Colors are used on elements that are interactive and change in response to users hovering, pressing, etc. where an Info intent needs to be communicated.

| **Name**       |     | **Figma Variable**                                                       |     | **CSS / SCSS Variable**                                                                                                                                                                                    |
| -------------- | --- | ------------------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary   |     | Light: Info.fill-primary (#1a6cef) Dark: Info.fill-primary (#2573f4)     |     | CSS light / dark: `--sds-color-semantic-component-info-fill-primary` SCSS light: `$sds-color-semantic-component-info-fill-primary` SCSS dark: `$sds-color-semantic-component-info-fill-primary-dark`       |
| fill-hover     |     | Light: Info.fill-hover (#0041b9) Dark: Info.fill-hover (#cde3ff)         |     | CSS light / dark: `--sds-color-semantic-component-info-fill-hover` SCSS light: `$sds-color-semantic-component-info-fill-hover` SCSS dark: `$sds-color-semantic-component-info-fill-hover-dark`             |
| fill-pressed   |     | Light: Info.fill-pressed (#002d90) Dark: Info.fill-pressed (#e2eeff)     |     | CSS light / dark: `--sds-color-semantic-component-info-fill-pressed` SCSS light: `$sds-color-semantic-component-info-fill-pressed` SCSS dark: `$sds-color-semantic-component-info-fill-pressed-dark`       |
| fill-secondary |     | Light: Info.fill-secondary (#edf3fd) Dark: Info.fill-secondary (#0f1d4a) |     | CSS light / dark: `--sds-color-semantic-component-info-fill-secondary` SCSS light: `$sds-color-semantic-component-info-fill-secondary` SCSS dark: `$sds-color-semantic-component-info-fill-secondary-dark` |

#### Border

Info _border_ is used on element borders that need to communicate an Info intent.

| **Name** |     | **Figma Variable**                                       |     | **CSS / SCSS Variable**                                                                                                                                                            |
| -------- | --- | -------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border   |     | Light: Info.border (#0041b9) Dark: Info.border (#a2c9ff) |     | CSS light / dark: `--sds-color-semantic-component-info-border` SCSS light: `$sds-color-semantic-component-info-border` SCSS dark: `$sds-color-semantic-component-info-border-dark` |

#### Ornament

Info _ornament_ is used whenever an Info intent needs to be communicated visually on an icon or other small colored element.

| **Name** |     | **Figma Variable**                                           |     | **CSS / SCSS Variable**                                                                                                                                                                 |
| -------- | --- | ------------------------------------------------------------ | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament |     | Light: Info.ornament (#0041b9) Dark: Info.ornament (#a2c9ff) |     | CSS light / dark: `--sds-color-semantic-component-info-ornament` SCSS light:`$sds-color-semantic-component-info-ornament` SCSS dark: `$sds-color-semantic-component-info-ornament-dark` |

#### Text

The info _text_ variable is used whenever text needs to communicate an Info intent.

| **Name**  |     | **Figma Variable**                                   |     | **CSS / SCSS Variable**                                                                                                                                                      |
| --------- | --- | ---------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-info |     | Light: Text.info (#0041b9) Dark: Text.info (#a2c9ff) |     | CSS light / dark: `--sds-color-semantic-component-info-text` SCSS light: `$sds-color-semantic-component-info-text` SCSS dark: `$sds-color-semantic-component-info-text-dark` |

---

### Negative Colors

#### Surface

Negative Surface colors are used for the backgrounds and fills of non-interactive elements or sections that communicate a Negative intent.

| **Name**          |     | **Figma Variable**                                                                     |     | **CSS / SCSS Variable**                                                                                                                                                                                                         |
| ----------------- | --- | -------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| surface-primary   |     | Light: Negative.surface-primary (#db2131) Dark: Negative.surface-primary (#c73028)     |     | CSS light / dark: `--sds-color-semantic-component-negative-surface-primary` SCSS light: `$sds-color-semantic-component-negative-surface-primary` SCSS dark: `$sds-color-semantic-component-negative-surface-primary-dark`       |
| surface-secondary |     | Light: Negative.surface-secondary (#ffe8e6) Dark: Negative.surface-secondary (#330603) |     | CSS light / dark: `--sds-color-semantic-component-negative-surface-secondary` SCSS light: `$sds-color-semantic-component-negative-surface-secondary` SCSS dark: `$sds-color-semantic-component-negative-surface-secondary-dark` |

#### Fill

Negative Fill Colors are used on elements that are interactive and change in response to users hovering, pressing, etc. where a Negative intent needs to be communicated.

| **Name**       |     | **Figma Variable**                                                               |     | **CSS / SCSS Variable**                                                                                                                                                                                                |
| -------------- | --- | -------------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary   |     | Light: Negative.fill-primary (#db2131) Dark: Negative.fill-primary (#c73028)     |     | CSS light / dark: `--sds-color-semantic-component-negative-fill-primary` SCSS light: `$sds-color-semantic-component-negative-fill-primary` SCSS dark: `$sds-color-semantic-component-negative-fill-primary-dark`       |
| fill-hover     |     | Light: Negative.fill-hover (#b80017) Dark: Negative.fill-hover (#ffbdb3)         |     | CSS light / dark: `--sds-color-semantic-component-negative-fill-hover` SCSS light: `$sds-color-semantic-component-negative-fill-hover` SCSS dark: `$sds-color-semantic-component-negative-fill-hover-dark`             |
| fill-pressed   |     | Light: Negative.fill-pressed (#6f0008) Dark: Negative.fill-pressed (#ffd8d1)     |     | CSS light / dark: `--sds-color-semantic-component-negative-fill-pressed` SCSS light: `$sds-color-semantic-component-negative-fill-pressed` SCSS dark: `$sds-color-semantic-component-negative-fill-pressed-dark`       |
| fill-secondary |     | Light: Negative.fill-secondary (#ffe8e6) Dark: Negative.fill-secondary (#330603) |     | CSS light / dark: `--sds-color-semantic-component-negative-fill-secondary` SCSS light: `$sds-color-semantic-component-negative-fill-secondary` SCSS dark: `$sds-color-semantic-component-negative-fill-secondary-dark` |

#### Border

Negative _border_ is used on element borders that need to communicate a Negative intent.

| **Name** |     | **Figma Variable**                                               |     | **CSS / SCSS Variable**                                                                                                                                                                        |
| -------- | --- | ---------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border   |     | Light: Negative.border (#b80017) Dark: Negative.border (#ff988a) |     | CSS light / dark: `--sds-color-semantic-component-negative-border` SCSS light: `$sds-color-semantic-component-negative-border` SCSS dark: `$sds-color-semantic-component-negative-border-dark` |

#### Ornament

Negative _ornament_ is used whenever a Negative intent needs to be communicated visually on an icon or other small colored element.

| **Name** |     | **Figma Variable**                                                   |     | **CSS / SCSS Variable**                                                                                                                                                                              |
| -------- | --- | -------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament |     | Light: Negative.ornament (#b80017) Dark: Negative.ornament (#ff988a) |     | CSS light / dark: `--sds-color-semantic-component-negative-ornament` SCSS light: `$sds-color-semantic-component-negative-ornament` SCSS dark: `$sds-color-semantic-component-negative-ornament-dark` |

#### Text

The negative _text_ variable is used whenever text needs to communicate a Negative intent.

| **Name**      |     | **Figma Variable**                                           |     | **CSS / SCSS Variable**                                                                                                                                                                  |
| ------------- | --- | ------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-negative |     | Light: Text.negative (#b80017) Dark: Text.negative (#ff988a) |     | CSS light / dark: `--sds-color-semantic-component-negative-text` SCSS light: `$sds-color-semantic-component-negative-text` SCSS dark: `$sds-color-semantic-component-negative-text-dark` |

---

### Neutral Colors

> **Note:** Neutral Colors are only used in components that display an intent, such as Tags. For these elements, Neutral Colors communicate that there is no intent indicated.

#### Surface

Neutral Surface colors are used for the backgrounds and fills of non-interactive elements or sections that communicate have no intent.

| **Name**          |     | **Figma Variable**                                                                   |     | **CSS / SCSS Variable**                                                                                                                                                                                                      |
| ----------------- | --- | ------------------------------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| surface-primary   |     | Light: Neutral.surface-primary (#969696) Dark: Neutral.surface-primary (#aaaaaa)     |     | CSS light / dark: `--sds-color-semantic-component-neutral-surface-primary` SCSS light: `$sds-color-semantic-component-neutral-surface-primary` SCSS dark: `$sds-color-semantic-component-neutral-surface-primary-dark`       |
| surface-secondary |     | Light: Neutral.surface-secondary (#dfdfdf) Dark: Neutral.surface-secondary (#494949) |     | CSS light / dark: `--sds-color-semantic-component-neutral-surface-secondary` SCSS light: `$sds-color-semantic-component-neutral-surface-secondary` SCSS dark: `$sds-color-semantic-component-neutral-surface-secondary-dark` |

#### Fill

Neutral Fill Colors are used on elements that are interactive and change in response to users hovering, pressing, etc. where there is no intent to be communicated.

| **Name**       |     | **Figma Variable**                                                             |     | **CSS / SCSS Variable**                                                                                                                                                                                             |
| -------------- | --- | ------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary   |     | Light: Neutral.fill-primary (#969696) Dark: Neutral.fill-primary (#aaaaaa)     |     | CSS light / dark: `--sds-color-semantic-component-neutral-fill-primary` SCSS light: `$sds-color-semantic-component-neutral-fill-primary` SCSS dark: `$sds-color-semantic-component-neutral-fill-primary-dark`       |
| fill-hover     |     | Light: Neutral.fill-hover (#7a7a7a) Dark: Neutral.fill-hover (#cdcdcd)         |     | CSS light / dark: `--sds-color-semantic-component-neutral-fill-hover` SCSS light: `$sds-color-semantic-component-neutral-fill-hover` SCSS dark: `$sds-color-semantic-component-neutral-fill-hover-dark`             |
| fill-pressed   |     | Light: Neutral.fill-pressed (#3b3b3b) Dark: Neutral.fill-pressed (#ededed)     |     | CSS light / dark: `--sds-color-semantic-component-neutral-fill-pressed` SCSS light: `$sds-color-semantic-component-neutral-fill-pressed` SCSS dark: `$sds-color-semantic-component-neutral-fill-pressed-dark`       |
| fill-secondary |     | Light: Neutral.fill-secondary (#dfdfdf) Dark: Neutral.fill-secondary (#494949) |     | CSS light / dark: `--sds-color-semantic-component-neutral-fill-secondary` SCSS light: `$sds-color-semantic-component-neutral-fill-secondary` SCSS dark: `$sds-color-semantic-component-neutral-fill-secondary-dark` |

#### Border

Neutral _border_ is used on element borders that need to communicate there is no intent.

| **Name** |     | **Figma Variable**                                             |     | **CSS / SCSS Variable**                                                                                                                                                                     |
| -------- | --- | -------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border   |     | Light: Neutral.border (#969696) Dark: Neutral.border (#aaaaaa) |     | CSS light / dark: `--sds-color-semantic-component-neutral-border` SCSS light: `$sds-color-semantic-component-neutral-border` SCSS dark: `$sds-color-semantic-component-neutral-border-dark` |

#### Ornament

Neutral _ornament_ is used whenever there is no intent to be communicated visually on an icon or other small colored element.

| **Name** |     | **Figma Variable**                                                 |     | **CSS / SCSS Variable**                                                                                                                                                                           |
| -------- | --- | ------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament |     | Light: Neutral.ornament (#3b3b3b) Dark: Neutral.ornament (#ededed) |     | CSS light / dark: `--sds-color-semantic-component-neutral-ornament` SCSS light: `$sds-color-semantic-component-neutral-ornament` SCSS dark: `$sds-color-semantic-component-neutral-ornament-dark` |

#### Text

The neutral _text_ variable is used whenever text needs to communicate there is no intent.

| **Name**     |     | **Figma Variable**                                         |     | **CSS / SCSS Variable**                                                                                                                                                               |
| ------------ | --- | ---------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-neutral |     | Light: Text.neutral (#3b3b3b) Dark: Text.neutral (#ededed) |     | CSS light / dark: `--sds-color-semantic-component-neutral-text` SCSS light: `$sds-color-semantic-component-neutral-text` SCSS dark: `$sds-color-semantic-component-neutral-text-dark` |

---

### Notice Colors

#### Surface

Notice Surface colors are used for the backgrounds and fills of non-interactive elements or sections that communicate a Notice intent.

| **Name**          |     | **Figma Variable**                                                                 |     | **CSS / SCSS Variable**                                                                                                                                                                                                   |
| ----------------- | --- | ---------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| surface-primary   |     | Light: Notice.surface-primary (#da9900) Dark: Notice.surface-primary (#bd8804)     |     | CSS light / dark: `--sds-color-semantic-component-notice-surface-primary` SCSS light: `$sds-color-semantic-component-notice-surface-primary` SCSS dark: `$sds-color-semantic-component-notice-surface-primary-dark`       |
| surface-secondary |     | Light: Notice.surface-secondary (#fff3db) Dark: Notice.surface-secondary (#361b07) |     | CSS light / dark: `--sds-color-semantic-component-notice-surface-secondary` SCSS light: `$sds-color-semantic-component-notice-surface-secondary` SCSS dark: `$sds-color-semantic-component-notice-surface-secondary-dark` |

#### Fill

Notice Fill Colors are used on elements that are interactive and change in response to users hovering, pressing, etc. where a Notice intent needs to be communicated.

| **Name**       |     | **Figma Variable**                                                           |     | **CSS / SCSS Variable**                                                                                                                                                                                          |
| -------------- | --- | ---------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary   |     | Light: Notice.fill-primary (#da9900) Dark: Notice.fill-primary (#bd8804)     |     | CSS light / dark: `--sds-color-semantic-component-notice-fill-primary` SCSS light: `$sds-color-semantic-component-notice-fill-primary` SCSS dark: `$sds-color-semantic-component-notice-fill-primary-dark`       |
| fill-hover     |     | Light: Notice.fill-hover (#b07300) Dark: Notice.fill-hover (#f5d789)         |     | CSS light / dark: `--sds-color-semantic-component-notice-fill-hover` SCSS light: `$sds-color-semantic-component-notice-fill-hover` SCSS dark: `$sds-color-semantic-component-notice-fill-hover-dark`             |
| fill-pressed   |     | Light: Notice.fill-pressed (#7c3e00) Dark: Notice.fill-pressed (#ffe6a8)     |     | CSS light / dark: `--sds-color-semantic-component-notice-fill-pressed` SCSS light: `$sds-color-semantic-component-notice-fill-pressed` SCSS dark: `$sds-color-semantic-component-notice-fill-pressed-dark`       |
| fill-secondary |     | Light: Notice.fill-secondary (#fff3db) Dark: Notice.fill-secondary (#361b07) |     | CSS light / dark: `--sds-color-semantic-component-notice-fill-secondary` SCSS light: `$sds-color-semantic-component-notice-fill-secondary` SCSS dark: `$sds-color-semantic-component-notice-fill-secondary-dark` |

#### Border

Notice _border_ is used on element borders that need to communicate a Notice intent.

| **Name** |     | **Figma Variable**                                           |     | **CSS / SCSS Variable**                                                                                                                                                                  |
| -------- | --- | ------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border   |     | Light: Notice.border (#b07300) Dark: Notice.border (#e5bc63) |     | CSS light / dark: `--sds-color-semantic-component-notice-border` SCSS light: `$sds-color-semantic-component-notice-border` SCSS dark: `$sds-color-semantic-component-notice-border-dark` |

#### Ornament

Notice _ornament_ is used whenever a Notice intent needs to be communicated visually on an icon or other small colored element.

| **Name** |     | **Figma Variable**                                               |     | **CSS / SCSS Variable**                                                                                                                                                                        |
| -------- | --- | ---------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament |     | Light: Notice.ornament (#b07300) Dark: Notice.ornament (#e5bc63) |     | CSS light / dark: `--sds-color-semantic-component-notice-ornament` SCSS light: `$sds-color-semantic-component-notice-ornament` SCSS dark: `$sds-color-semantic-component-notice-ornament-dark` |

#### Text

The notice _text_ variable is used whenever text needs to communicate a Notice intent.

| **Name**    |     | **Figma Variable**                                       |     | **CSS / SCSS Variable**                                                                                                                                                            |
| ----------- | --- | -------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-notice |     | Light: Text.notice (#b07300) Dark: Text.notice (#e5bc63) |     | CSS light / dark: `--sds-color-semantic-component-notice-text` SCSS light: `$sds-color-semantic-component-notice-text` SCSS dark: `$sds-color-semantic-component-notice-text-dark` |

---

### Positive Colors

#### Surface

Positive Surface colors are used for the backgrounds and fills of non-interactive elements or sections that communicate a Positive intent.

| **Name**          |     | **Figma Variable**                                                                     |     | **CSS / SCSS Variable**                                                                                                                                                                                                         |
| ----------------- | --- | -------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| surface-primary   |     | Light: Positive.surface-primary (#238444) Dark: Positive.surface-primary (#278b48)     |     | CSS light / dark: `--sds-color-semantic-component-positive-surface-primary` SCSS light: `$sds-color-semantic-component-positive-surface-primary` `$sds-color-semantic-component-positive-surface-primary-dark`                  |
| surface-secondary |     | Light: Positive.surface-secondary (#ebf9ed) Dark: Positive.surface-secondary (#082608) |     | CSS light / dark: `--sds-color-semantic-component-positive-surface-secondary` SCSS light: `$sds-color-semantic-component-positive-surface-secondary` SCSS dark: `$sds-color-semantic-component-positive-surface-secondary-dark` |

#### Fill

Positive Fill Colors are used on elements that are interactive and change in response to users hovering, pressing, etc. where a Positive intent needs to be communicated.

| **Name**       |     | **Figma Variable**                                                               |     | **CSS / SCSS Variable**                                                                                                                                                                                                |
| -------------- | --- | -------------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill-primary   |     | Light: Positive.fill-primary (#238444) Dark: Positive.fill-primary (#278b48)     |     | CSS light / dark: `--sds-color-semantic-component-positive-fill-primary` SCSS light: `$sds-color-semantic-component-positive-fill-primary` SCSS dark: `$sds-color-semantic-component-positive-fill-primary-dark`       |
| fill-hover     |     | Light: Positive.fill-hover (#105b2b) Dark: Positive.fill-hover (#bcecc5)         |     | CSS light / dark: `--sds-color-semantic-component-positive-fill-hover` SCSS light: `$sds-color-semantic-component-positive-fill-hover` SCSS dark: `$sds-color-semantic-component-positive-fill-hover-dark`             |
| fill-pressed   |     | Light: Positive.fill-pressed (#07431d) Dark: Positive.fill-pressed (#daf4de)     |     | CSS light / dark: `--sds-color-semantic-component-positive-fill-pressed` SCSS light: `$sds-color-semantic-component-positive-fill-pressed` SCSS dark: `$sds-color-semantic-component-positive-fill-pressed-dark`       |
| fill-secondary |     | Light: Positive.fill-secondary (#ebf9ed) Dark: Positive.fill-secondary (#082608) |     | CSS light / dark: `--sds-color-semantic-component-positive-fill-secondary` SCSS light: `$sds-color-semantic-component-positive-fill-secondary` SCSS dark: `$sds-color-semantic-component-positive-fill-secondary-dark` |

#### Border

Positive _border_ is used on element borders that need to communicate a Positive intent.

| **Name** |     | **Figma Variable**                                               |     | **CSS / SCSS Variable**                                                                                                                                                                        |
| -------- | --- | ---------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border   |     | Light: Positive.border (#105b2b) Dark: Positive.border (#85d898) |     | CSS light / dark: `--sds-color-semantic-component-positive-border` SCSS light: `$sds-color-semantic-component-positive-border` SCSS dark: `$sds-color-semantic-component-positive-border-dark` |

#### Ornament

Positive _ornament_ is used whenever a Positive intent needs to be communicated visually on an icon or other small colored element.

| **Name** |     | **Figma Variable**                                                   |     | **CSS / SCSS Variable**                                                                                                                                                                              |
| -------- | --- | -------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ornament |     | Light: Positive.ornament (#105b2b) Dark: Positive.ornament (#85d898) |     | CSS light / dark: `--sds-color-semantic-component-positive-ornament` SCSS light: `$sds-color-semantic-component-positive-ornament` SCSS dark: `$sds-color-semantic-component-positive-ornament-dark` |

#### Text

The positive _text_ variable is used whenever text needs to communicate a Positive intent.

| **Name**      |     | **Figma Variable**                                           |     | **CSS / SCSS Variable**                                                                                                                                                                  |
| ------------- | --- | ------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-positive |     | Light: Text.positive (#105b2b) Dark: Text.positive (#85d898) |     | CSS light / dark: `--sds-color-semantic-component-positive-text` SCSS light: `$sds-color-semantic-component-positive-text` SCSS dark: `$sds-color-semantic-component-positive-text-dark` |

## Primitive Colors

## Color Overview

SDS uses a pragmatic naming system for its color variables that ensures consistency around how colors are used across UI elements. Colors are split into three types—Primitive, Semantic, and Visualization—and two modes—Light and Dark (Visualization Colors are currently only available in Light Mode); see Theming for more details about implementing Dark Mode.

Primitive Colors are base variables that tie directly to hex codes whereas Semantic Colors take these Primitive Color variables and map them to new variables that are specific to UI elements, intents, and states. Visualization Colormaps are specifically for use in data visualizations.

## Primitive Colors

The most basic color elements in the design system are Primitive Colors. They are organized by hue into different ramps and saved as variables within the codebase; each ramp is composed of a range of color variables from light to dark within that color hue (e.g., _blue800_, _blue700_, _blue600_, etc.).

Primitive Color variables are **not** intended to be used on their own and are instead mapped to Semantic Color variables that communicate how a Primitive Color is applied to different elements in the design system. This helps ensure the colors are applied consistently and removes the guess work for designers and engineers as to which colors should be used where when designing and building features.

### Light

Storybook

### Dark

Storybook

## Visualization Colors

## Color Overview

SDS uses a pragmatic naming system for its color variables that ensures consistency around how colors are used across UI elements. Colors are split into three types—Primitive, Semantic, and Visualization—and two modes—Light and Dark (Visualization Colors are currently only available in Light Mode); see Theming for more details about implementing Dark Mode. Primitive Colors are base variables that tie directly to hex codes whereas Semantic Colors take these Primitive Color variables and map them to new variables that are specific to UI elements, intents, and states. Visualization Colormaps are specifically for use in data visualizations.

## Visualization Colormaps

Colormaps are an array of colors, generally displayed as a gradient or spectrum, and are used to map datapoints to individual color values. Selecting effective colors to represent datapoints within a data visualization plays a major role in how well users are able to interpret that visualization. There are many factors to consider including the type of data is being represented in the dataset, whether the colors are interpretable for folks with visual deficiencies, and if the colors effectively help communicate the intended data story.

> **Note:** Visualization Colors are currently only available for Light Mode. If Visualization Colors need to be used in an application in Dark Mode, we recommend placing a light background behind the visualization element.

### Magma

Magma is a well-vetted, industry-standard colormap from Matplotlib and is the first colormap available natively in SDS. It provides an array of colors that designers can confidently use as part of their data visualization work since it is so commonly used in the scientific community. This provides the benefit of recognizability, knowing that scientists are already used to interpreting data with these colors.

Magma is perceptually uniform, meaning it has consistent and even changes in brightness and hue across the entire colormap. This ensures the colors that get mapped to each datapoint in a visualization are not only an equivalent distance away from each other technically, but visually appear as such, even for folks with visual accessibility concerns who might have trouble perceiving differences between colors.

> **Note:** any color from the Magma colormap can be used in implementation, however the following nine colors have been created as variables for easy use in Figma.

| **Name** |     | **Figma Variable** |     | **CSS / SCSS Variables** |
| -------- | --- | ------------------ | --- | ------------------------ |
| magma900 |     |                    |     | [variable to come]       |
| magma800 |     |                    |     | [variable to come]       |
| magma700 |     |                    |     | [variable to come]       |
| magma600 |     |                    |     | [variable to come]       |
| magma500 |     |                    |     | [variable to come]       |
| magma400 |     |                    |     | [variable to come]       |
| magma300 |     |                    |     | [variable to come]       |
| magma200 |     |                    |     | [variable to come]       |
| magma100 |     |                    |     | [variable to come]       |

---

Color helps communicate usage and intent while providing brand distinction. Our palette has been selected for meaning, accessibility, and cohesion.

## Primary Colors

These are the most frequently used colors in the UI's design. Primary400 is the main brand color and is the default color choice for most interactive elements across the product. Black is featured prominently through headlines and body text with the other shades of Gray and Primary Blue used to help distinguish and differentiate elements throughout the UI.

For the sake of specificity, only those colors used in each scale are documented in our design system.

### Primary Blue

###  Grays

---

## Admonition Colors

These colors are used on admonition blocks only and should not be used anywhere else in the UI. Each color should be used for the specific admonition type named.

---

## Code Colors

These colors are used in code snippets only and should not be used anywhere else in the UI. Each color should be used for the specific code element type named.

---

Color helps communicate usage and intent while providing brand distinction. Our palette has been selected for meaning, accessibility, and cohesion.

## Primary Colors

These are the most frequently used colors in the UI's design. Primary400 is the main brand color and is the default color choice for most interactive elements across the product. Black is featured prominently through headlines and body text with the other shades of Gray and Primary Purple used to help distinguish and differentiate elements throughout the UI.

### Primary Purple

###  Grays

---

## Feedback Colors

These colors are used for product feedback only, i.e., showing info, success, warnings, and errors. For the sake of specificity, only those colors used in each scale are documented in our design system.

### Info

### Success

### Error

### Warning

---

Color helps communicate usage and intent while providing brand distinction. Our palette has been selected for meaning, accessibility, and cohesion.

## Primary Colors

These are the most frequently used colors in the UI's design. Primary400 is the main brand color and is the default color choice for most interactive elements across the product. Black is featured prominently through headlines and body text with the other shades of Gray and Primary Blue used to help distinguish and differentiate elements throughout the UI.

### Primary Blue

###  Grays

### Secondary Green

---

## Feedback Colors

These colors are used for product feedback only, i.e., showing info, success, warnings, and errors. For the sake of specificity, only those colors used in each scale are documented in our design system.

### Info

### Success

### Error

### Warning

### Beta
