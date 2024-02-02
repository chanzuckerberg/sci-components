import { styled } from "@mui/material/styles";
import { Args, Meta } from "@storybook/react";
import RawBanner from "./index";
import CustomSdsIcon from "src/common/customSdsIcon";
import CustomSvgIcon from "src/common/customSvgIcon";

const BANNER_TEXT = "Banner text lorem ipsum dolor mit";

const iconOptions = [
  "checkCircle",
  "infoCircle",
  <CustomSdsIcon key="customSdsIcon" sdsSize="l" />,
  <CustomSvgIcon key="customSvgIcon" sx={{ height: 22, width: 22 }} />,
];

const Banner = (props: Args): JSX.Element => {
  const { sdsType, textChild } = props;
  return (
    <RawBanner sdsType={sdsType} {...props}>
      {textChild}
    </RawBanner>
  );
};

export default {
  argTypes: {
    dismissed: {
      control: { type: "boolean" },
    },
    dismissible: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: [
          "SDS Icon: Check Circle",
          "SDS Icon: Info Circle",
          "Custom SDS Icon",
          "Custom SVG Icon",
        ],
        type: "select",
      },
      mapping: iconOptions,
      options: Object.keys(iconOptions),
    },
    sdsIconProps: {
      control: {
        type: "object",
      },
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
      required: true,
    },
    textChild: {
      control: { type: "text" },
      required: true,
    },
  },
  component: Banner,
  parameters: {
    axe: {
      disabledRules: ["landmark-no-duplicate-banner", "landmark-unique"],
    },
  },
  title: "Banner",
} as Meta<Args>;

// Default

export const Default = {
  args: {
    dismissed: false,
    dismissible: true,
    sdsType: "primary",
    textChild: BANNER_TEXT,
  },
};

// Live Preview

const StyledBanner = styled(RawBanner)`
  background-color: Crimson;
`;

const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={{ padding: "24px", width: "600px" }}>
      <RawBanner dismissible sdsType="primary">
        {BANNER_TEXT}
      </RawBanner>
      <div style={{ height: "24px" }} />
      <RawBanner dismissible sdsType="secondary">
        {BANNER_TEXT}
      </RawBanner>
      <div style={{ height: "24px" }} />
      <StyledBanner sdsType="primary">
        Stylable. Should have Crimson background color
      </StyledBanner>
    </div>
  );
};

export const LivePreview = {
  args: {
    dismissible: true,
    sdsType: "primary",
    textChild: "test text",
  },
  parameters: {
    axe: {
      disabledRules: ["landmark-no-duplicate-banner", "landmark-unique"],
    },
    controls: {
      exclude: ["dismissible", "sdsType", "textChild", "dismissed"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    dismissible: true,
    sdsType: "primary",
    textChild: "test text",
  },
  parameters: {
    controls: {
      exclude: ["dismissible", "sdsType", "textChild", "dismissed"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => (
    <Banner {...props} data-testid="banner" />
  ),
};
