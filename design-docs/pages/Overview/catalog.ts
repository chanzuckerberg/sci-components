/**
 * The component library, as the Overview page lists it: every component in
 * `@czi-sds/components`, `@czi-sds/data-viz` and `@czi-sds/icons`, grouped by
 * what a reader is trying to do rather than by the atomic taxonomy the design
 * pages use.
 *
 * The grouping is this page's own. The Storybook sidebar keeps its own shape,
 * which follows the packages, and neither has to answer to the other.
 *
 * `docs-kit/catalog.test.ts` holds this to the libraries: every component with
 * stories appears here exactly once, and every id below resolves to a file.
 */

export interface CatalogEntry {
  /** The component's name, as the card is labelled. */
  name: string;
  /**
   * The component's own documentation page, as Storybook addresses it: the
   * story title lowercased with its separators turned to dashes, e.g.
   * `Components/Buttons/Button` -> `components-buttons-button`.
   */
  docs: string;
  /**
   * The example the card renders live, as an id the docs' example registry
   * understands (see `docs-kit/exampleRegistry.tsx`). Each is the component's
   * default example, so a card follows the component as it changes; where the
   * default reads poorly at card size, another of its examples stands in.
   *
   * An `Overview/…` id is one of this page's own examples, in `./examples`. A
   * component that shows itself only on hover or on a click has nothing to show
   * in a card, which takes no pointer, so those few are staged open there. Their
   * own pages keep examples that behave as they would in an app.
   */
  example: string;
}

export interface CatalogCategory {
  /** Matches the `data-catalog` attribute of the section's placeholder. */
  slug: string;
  /** The section heading, repeated here for the cards' accessible name. */
  title: string;
  entries: CatalogEntry[];
}

export const catalog: CatalogCategory[] = [
  {
    slug: "action",
    title: "Action",
    entries: [
      {
        name: "Button",
        docs: "components-buttons-button",
        example: "core/Button/DefaultButton",
      },
      {
        name: "ButtonDropdown",
        docs: "components-buttons-buttondropdown",
        example: "core/ButtonDropdown/DefaultButtonDropdown",
      },
      {
        name: "ButtonGroup",
        docs: "components-buttons-buttongroup",
        example: "core/ButtonGroup/DefaultButtonGroup",
      },
      {
        name: "ButtonToggle",
        docs: "components-buttons-buttontoggle",
        example: "core/ButtonToggle/DefaultButtonToggle",
      },
      {
        name: "SegmentedControl",
        docs: "components-segmentedcontrol",
        example: "core/SegmentedControl/DefaultSegmentedControl",
      },
    ],
  },
  {
    slug: "container-and-layout",
    title: "Container & Layout",
    entries: [
      {
        name: "Accordion",
        docs: "components-accordion",
        example: "core/Accordion/DefaultAccordion",
      },
      {
        name: "ContentCard",
        docs: "components-contentcard",
        example: "core/ContentCard/DefaultContentCard",
      },
      {
        name: "Hero",
        docs: "components-hero",
        example: "core/Hero/DefaultHero",
      },
      {
        name: "Panel",
        docs: "components-panel",
        example: "core/Panel/BasicPanel",
      },
    ],
  },
  {
    slug: "data-display",
    title: "Data Display",
    entries: [
      {
        name: "Icons",
        docs: "icons-overview",
        example: "Overview/IconsCard",
      },
      {
        name: "List",
        docs: "components-list",
        example: "core/List/UnorderedList",
      },
      {
        name: "Tag",
        docs: "components-tag",
        example: "core/Tag/DefaultTag",
      },
    ],
  },
  {
    slug: "data-input",
    title: "Data Input",
    entries: [
      {
        name: "Autocomplete",
        docs: "components-dropdowns-autocomplete",
        example: "core/Autocomplete/DefaultAutocomplete",
      },
      {
        name: "ComplexFilter",
        docs: "components-dropdowns-complexfilter",
        example: "core/ComplexFilter/DefaultComplexFilter",
      },
      {
        name: "Dropdown",
        docs: "components-dropdowns-dropdown",
        example: "Overview/DropdownCard",
      },
      {
        /*
         * Not the default example, which mounts its menu open against an empty
         * anchor. Popper measures the page to place a menu, and a card is a
         * scaled-down view of one, so the two disagree and the menu lands
         * outside the frame. A card shows the click target instead.
         */
        name: "DropdownMenu",
        docs: "components-dropdowns-dropdownmenu",
        example: "Overview/DropdownMenuCard",
      },
      {
        name: "InputCheckbox",
        docs: "components-inputs-inputcheckbox",
        example: "core/InputCheckbox/InputCheckboxStages",
      },
      {
        name: "InputDropdown",
        docs: "components-inputs-inputdropdown",
        example: "core/InputDropdown/Default",
      },
      {
        name: "InputRadio",
        docs: "components-inputs-inputradio",
        example: "core/InputRadio/InputRadioGroup",
      },
      {
        name: "InputSearch",
        docs: "components-inputs-inputsearch",
        example: "core/InputSearch/DefaultInputSearch",
      },
      {
        name: "InputSlider",
        docs: "components-inputs-inputslider",
        example: "core/InputSlider/DefaultInputSlider",
      },
      {
        name: "InputText",
        docs: "components-inputs-inputtext",
        example: "core/InputText/InputTextTextField",
      },
      {
        name: "InputToggle",
        docs: "components-inputs-inputtoggle",
        example: "core/InputToggle/DefaultInputToggle",
      },
      {
        name: "TagFilter",
        docs: "components-tagfilter",
        example: "core/TagFilter/DefaultTagFilter",
      },
    ],
  },
  {
    slug: "data-visualization",
    title: "Data Visualization",
    entries: [
      {
        name: "HeatmapChart",
        docs: "data-viz-heatmapchart",
        example: "data-viz/HeatmapChart/DefaultHeatmapChart",
      },
      {
        name: "Legend",
        docs: "components-legend",
        example: "core/Legend/DefaultLegend",
      },
      {
        name: "StackedBarChart",
        docs: "data-viz-stackedbarchart",
        example: "data-viz/StackedBarChart/DefaultStackedBarChart",
      },
    ],
  },
  {
    slug: "feedback-and-status",
    title: "Feedback & Status",
    entries: [
      {
        name: "Banner",
        docs: "components-banner",
        example: "core/Banner/DefaultBanner",
      },
      {
        name: "Callout",
        docs: "components-callout",
        example: "core/Callout/DefaultCallout",
      },
      {
        name: "IntentMessage",
        docs: "components-intentmessage",
        example: "core/IntentMessage/IntentMessageIntents",
      },
      {
        name: "LoadingIndicator",
        docs: "components-loadingindicator",
        example: "core/LoadingIndicator/LoadingIndicatorMinimal",
      },
      {
        name: "Notification",
        docs: "components-notification",
        example: "core/Notification/DefaultNotification",
      },
    ],
  },
  {
    slug: "navigation",
    title: "Navigation",
    entries: [
      {
        name: "NavigationHeader",
        docs: "components-navigationheader",
        example: "core/NavigationHeader/NavigationHeaderDefault",
      },
      {
        name: "NavigationFooter",
        docs: "components-navigationfooter",
        example: "core/NavigationFooter/NavigationFooterDefault",
      },
      {
        name: "NavigationJumpTo",
        docs: "components-navigationjumpto",
        example: "core/NavigationJumpTo/DefaultNavigationJumpTo",
      },
      {
        name: "Tabs",
        docs: "components-tabs",
        example: "core/Tabs/TabsLarge",
      },
    ],
  },
  {
    slug: "overlay",
    title: "Overlay",
    entries: [
      {
        name: "Dialog",
        docs: "components-dialog",
        example: "Overview/DialogCard",
      },
      {
        name: "Menu",
        docs: "components-dropdowns-menu",
        example: "Overview/MenuCard",
      },
      {
        name: "MenuItem",
        docs: "components-dropdowns-menuitem",
        example: "core/MenuItem/DefaultMenuItem",
      },
      {
        name: "Popover",
        docs: "components-popover",
        example: "Overview/PopoverCard",
      },
      {
        name: "Tooltip",
        docs: "components-tooltip",
        example: "Overview/TooltipCard",
      },
      {
        name: "TooltipCondensed",
        docs: "components-tooltipcondensed",
        example: "Overview/TooltipCondensedCard",
      },
      {
        name: "TooltipTable",
        docs: "components-tooltiptable",
        example: "Overview/TooltipTableCard",
      },
    ],
  },
  {
    slug: "table",
    title: "Table",
    entries: [
      {
        name: "Table",
        docs: "components-table-table",
        example: "core/Table/DefaultTable",
      },
      {
        name: "PreComposedTable",
        docs: "components-table-precomposedtable",
        example: "core/PreComposedTable/DefaultPreComposedTable",
      },
      {
        name: "TableHeader",
        docs: "components-table-tableheader",
        example: "core/TableHeader/DefaultTableHeader",
      },
      {
        name: "TableRow",
        docs: "components-table-tablerow",
        example: "core/TableRow/DefaultTableRow",
      },
      {
        name: "CellBasic",
        docs: "components-table-cellbasic",
        example: "core/CellBasic/DefaultCellBasic",
      },
      {
        name: "CellComponent",
        docs: "components-table-cellcomponent",
        example: "core/CellComponent/DefaultCellComponent",
      },
      {
        name: "CellHeader",
        docs: "components-table-cellheader",
        example: "core/CellHeader/DefaultCellHeader",
      },
      {
        name: "Pagination",
        docs: "components-table-pagination",
        example: "core/Pagination/DefaultPagination",
      },
    ],
  },
];

export default catalog;
