import { useTheme, TypographyStyle, AccordionDetails } from "@mui/material";
import { getTypography, CommonThemeProps } from "src/core/styles";
import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import CellHeader from "src/core/CellHeader";
import TableRow from "src/core/TableRow";
import CellComponent from "src/core/CellComponent";
import { copyToClipboard } from "src/core/Bases/utils";
import { StyledVariable } from "src/core/Bases/style";
import {
  StyledSampleText,
  StyledCssProperties,
  StyledTableWrapper,
} from "./style";
import {
  TypographyItemData,
  getSampleText,
  generateDisplayName,
  generateMixinName,
  generateScssVariable,
  generateCssVariable,
  formatCssProperties,
  sortTypographyItems,
} from "./utils";
import Accordion, { AccordionHeader } from "src/core/Accordion";

interface TypographyProps {
  categories?: Array<
    "title" | "body" | "header" | "code" | "caps" | "tabular" | "link"
  >;
}

const Typography = ({
  categories = ["title", "header", "body", "code", "caps", "tabular", "link"],
}: TypographyProps): JSX.Element => {
  const theme = useTheme();
  const typography = getTypography({ theme } as CommonThemeProps);

  if (!typography) {
    return <div>Typography not available</div>;
  }

  const { wideStyles, narrowStyles, fontFamily } = typography;

  const createTypographyItem = (
    category: string,
    weight: string,
    size: string,
    typographyStyle: TypographyStyle,
    extraProps?: Partial<TypographyItemData>
  ): TypographyItemData => ({
    category: category as TypographyItemData["category"],
    cssProperties: typographyStyle,
    displayName: generateDisplayName(category, weight, size),
    fontFamily:
      fontFamily[category as keyof typeof fontFamily] ||
      fontFamily.body ||
      "inherit",
    mixinName: generateMixinName(category, weight, size),
    sampleText: getSampleText(category),
    size,
    weight: weight as TypographyItemData["weight"],
    ...extraProps,
  });

  const generateBodyTypography = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];
    const bodyWeights = Object.keys(styles.body) as Array<
      keyof typeof styles.body
    >;

    bodyWeights.forEach((weight) => {
      const bodySizes = Object.keys(styles.body[weight]) as Array<
        keyof (typeof styles.body)[typeof weight]
      >;
      bodySizes.forEach((size) => {
        const typographyStyle = styles.body[weight][size];
        if (typographyStyle) {
          items.push(
            createTypographyItem("body", weight, size, typographyStyle)
          );
        }
      });
    });

    return items;
  };

  const generateHeaderTypography = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];
    const headerWeights = Object.keys(styles.header) as Array<
      keyof typeof styles.header
    >;

    headerWeights.forEach((weight) => {
      const headerSizes = Object.keys(styles.header[weight]) as Array<
        keyof (typeof styles.header)[typeof weight]
      >;
      headerSizes.forEach((size) => {
        const typographyStyle = styles.header[weight][size];
        if (typographyStyle) {
          items.push(
            createTypographyItem("header", weight, size, typographyStyle)
          );
        }
      });
    });

    return items;
  };

  const generateCodeTypography = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];
    const codeWeights = Object.keys(styles.code) as Array<
      keyof typeof styles.code
    >;

    codeWeights.forEach((weight) => {
      const codeSizes = Object.keys(styles.code[weight]) as Array<
        keyof (typeof styles.code)[typeof weight]
      >;
      codeSizes.forEach((size) => {
        const typographyStyle = styles.code[weight][size];
        if (typographyStyle) {
          items.push(
            createTypographyItem("code", weight, size, typographyStyle, {
              fontFamily: fontFamily.code || "monospace",
            })
          );
        }
      });
    });

    return items;
  };

  const generateCapsTypography = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];
    const capsWeights = Object.keys(styles.caps) as Array<
      keyof typeof styles.caps
    >;

    capsWeights.forEach((weight) => {
      const capsSizes = Object.keys(styles.caps[weight]) as Array<
        keyof (typeof styles.caps)[typeof weight]
      >;
      capsSizes.forEach((size) => {
        const typographyStyle = styles.caps[weight][size];
        if (typographyStyle) {
          items.push(
            createTypographyItem("caps", weight, size, typographyStyle, {
              hasTextTransform: true,
            })
          );
        }
      });
    });

    return items;
  };

  const generateTabularTypography = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];
    const tabularWeights = Object.keys(styles.tabular) as Array<
      keyof typeof styles.tabular
    >;

    tabularWeights.forEach((weight) => {
      const tabularSizes = Object.keys(styles.tabular[weight]) as Array<
        keyof (typeof styles.tabular)[typeof weight]
      >;
      tabularSizes.forEach((size) => {
        const typographyStyle = styles.tabular[weight][size];
        if (typographyStyle) {
          items.push(
            createTypographyItem("tabular", weight, size, typographyStyle, {
              hasFontVariantNumeric: true,
            })
          );
        }
      });
    });

    return items;
  };

  const generateTitleTypography = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];
    const titleWeights = Object.keys(styles.title) as Array<
      keyof typeof styles.title
    >;

    titleWeights.forEach((weight) => {
      const titleSizes = Object.keys(styles.title[weight]) as Array<
        keyof (typeof styles.title)[typeof weight]
      >;
      titleSizes.forEach((size) => {
        const typographyStyle = styles.title[weight][size];
        if (typographyStyle) {
          items.push(
            createTypographyItem("title", weight, size, typographyStyle)
          );
        }
      });
    });

    return items;
  };

  const generateLinkTypography = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];
    const linkWeights = Object.keys(styles.link) as Array<
      keyof typeof styles.link
    >;

    linkWeights.forEach((weight) => {
      const linkSizes = Object.keys(styles.link[weight]) as Array<
        keyof (typeof styles.link)[typeof weight]
      >;
      linkSizes.forEach((size) => {
        const typographyStyle = styles.link[weight][size];
        if (typographyStyle) {
          items.push(
            createTypographyItem("link", weight, size, typographyStyle, {
              hasTextDecoration: true,
            })
          );
        }
      });
    });

    return items;
  };

  const generateTypographyData = (
    styles: typeof wideStyles
  ): TypographyItemData[] => {
    const items: TypographyItemData[] = [];

    if (categories.includes("body")) {
      items.push(...generateBodyTypography(styles));
    }
    if (categories.includes("header")) {
      items.push(...generateHeaderTypography(styles));
    }
    if (categories.includes("code")) {
      items.push(...generateCodeTypography(styles));
    }
    if (categories.includes("caps")) {
      items.push(...generateCapsTypography(styles));
    }
    if (categories.includes("tabular")) {
      items.push(...generateTabularTypography(styles));
    }
    if (categories.includes("title")) {
      items.push(...generateTitleTypography(styles));
    }
    if (categories.includes("link")) {
      items.push(...generateLinkTypography(styles));
    }

    return items;
  };

  const renderTypographyRow = (
    item: TypographyItemData,
    index: number,
    isNarrow: boolean = false
  ) => {
    const scssVariable = generateScssVariable(
      item.category,
      item.weight,
      item.size,
      isNarrow
    );
    const cssVariable = generateCssVariable(
      item.category,
      item.weight,
      item.size,
      isNarrow
    );
    const formattedCssProperties = formatCssProperties(
      item.cssProperties,
      item.fontFamily,
      item.hasTextTransform,
      item.hasFontVariantNumeric,
      item.hasTextDecoration
    );

    return (
      <TableRow
        key={`${item.category}-${item.weight}-${item.size}-${index}`}
        hover={false}
      >
        <CellComponent verticalAlign="center">
          <StyledSampleText
            mixinName={item.mixinName}
            category={item.category}
            weight={item.weight}
            size={item.size}
            isNarrow={isNarrow}
          >
            {item.sampleText}
          </StyledSampleText>
        </CellComponent>

        <CellComponent verticalAlign="center">
          <StyledVariable
            onClick={() => copyToClipboard(item.mixinName)}
            type="none"
          >
            {item.mixinName}
          </StyledVariable>
        </CellComponent>

        <CellComponent verticalAlign="center">
          <StyledVariable
            onClick={() => copyToClipboard(scssVariable)}
            type="sass"
          >
            {scssVariable}
          </StyledVariable>
          <StyledVariable
            onClick={() => copyToClipboard(cssVariable)}
            type="css"
          >
            {cssVariable}
          </StyledVariable>
        </CellComponent>

        <CellComponent verticalAlign="center">
          <StyledCssProperties
            onClick={() => copyToClipboard(formattedCssProperties)}
          >
            {formattedCssProperties}
          </StyledCssProperties>
        </CellComponent>
      </TableRow>
    );
  };

  const renderTypographyTable = (
    styles: typeof wideStyles,
    isNarrow: boolean = false
  ) => {
    const typographyData = generateTypographyData(styles);
    const filteredData = typographyData.filter((item) =>
      categories.includes(item.category)
    );
    const sortedData = sortTypographyItems(filteredData);
    const tableRows = sortedData.map((item, index) =>
      renderTypographyRow(item, index, isNarrow)
    );

    return (
      <StyledTableWrapper>
        <Table>
          <TableHeader>
            <CellHeader hideSortIcon>Sample Text</CellHeader>
            <CellHeader hideSortIcon>Mixin Names</CellHeader>
            <CellHeader hideSortIcon>Variables</CellHeader>
            <CellHeader hideSortIcon>CSS Properties</CellHeader>
          </TableHeader>
          <tbody>{tableRows}</tbody>
        </Table>
      </StyledTableWrapper>
    );
  };

  return (
    <>
      <Accordion
        id="wide-screen-typography-accordion"
        useDivider
        togglePosition="right"
        defaultExpanded
      >
        <AccordionHeader
          subtitle={`For Screens above sds-breakpoint-md ( screen width > 512px )`}
        >
          Wide Screen Font Styles
        </AccordionHeader>
        <AccordionDetails>
          {renderTypographyTable(wideStyles, false)}
        </AccordionDetails>
      </Accordion>

      <Accordion
        id="narrow-screen-typography-accordion"
        useDivider
        togglePosition="right"
      >
        <AccordionHeader
          subtitle={`For Screens below sds-breakpoint-md ( screen width <= 512px )`}
        >
          Narrow Screen Font Styles
        </AccordionHeader>
        <AccordionDetails>
          {renderTypographyTable(narrowStyles, true)}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Typography;
