import React from "react";
import ContentCard, {
  ContentCardActions,
  ContentCardBody,
} from "./index";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";
import figma from "@figma/code-connect";

figma.connect(
  ContentCard,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=15429%3A36061",
  {
    props: {
      sdsType: figma.enum("sdsType", {
        wide: "wide",
        narrow: "narrow",
      }),
      // Discriminating field of the ContentCardProps union.
      visualElementType: figma.enum("visualElementType", {
        image: "image",
        icon: "icon",
      }),
      // Union-gated visual content. image/imagePosition/imagePadding are `never`
      // outside "image"; icon is `never` outside "icon". Gate each on
      // visualElementType so only the matching branch's props appear.
      image: figma.enum("visualElementType", {
        image: <img src="/placeholder.png" alt="Card media" />,
      }),
      icon: figma.enum("visualElementType", {
        icon: <Icon sdsIcon="Download" sdsSize="xl" />,
      }),
      imagePosition: figma.enum("visualElementType", {
        image: figma.enum("↪️ imagePosition", {
          left: "left",
          right: "right",
        }),
      }),
      imagePadding: figma.enum("visualElementType", {
        image: figma.enum("↪️ imagePadding", {
          true: true,
          false: false,
        }),
      }),
      // Gated text, read live. All four are real ReactNode props on ContentCard.
      overlineText: figma.boolean("showOverlineText?", {
        true: figma.textContent("Overline Text"),
        false: undefined,
      }),
      titleText: figma.boolean("showTitleText?", {
        true: figma.textContent("Title text"),
        false: undefined,
      }),
      subtitleText: figma.boolean("showSubtitleText?", {
        true: figma.textContent("Subtitle text"),
        false: undefined,
      }),
      metadataText: figma.boolean("showMetadataText?", {
        true: figma.textContent("Metadata text"),
        false: undefined,
      }),
      // showBoundingBox? is a VARIANT ("true"/"false"), NOT a boolean -> enum.
      boundingBox: figma.enum("showBoundingBox?", {
        true: true,
        false: false,
      }),
      // decorativeBorder IS a real Figma boolean -> figma.boolean is correct.
      decorativeBorder: figma.boolean("showDecorativeBorder?"),
      // Children slots as whole elements (parser rejects && in JSX): gate the
      // entire element here (undefined when hidden) and reference it bare.
      body: figma.boolean("showBodyContent?", {
        true: <ContentCardBody>Body content</ContentCardBody>,
        false: undefined,
      }),
      actions: figma.boolean("showButtons?", {
        true: (
          <ContentCardActions>
            <Button sdsType="primary" sdsStyle="square">Button</Button>
            <Button sdsType="secondary" sdsStyle="square">Button</Button>
          </ContentCardActions>
        ),
        false: undefined,
      }),
      // Intentionally removed (all auto-gen errors):
      // - `square`: phantom (mapped showVisualElement? to a nonexistent prop)
      // - `image`->imagePadding enum and `titleText`->titleSlot instance
      // Intentionally unmapped:
      // - state (hover/pressed/-), showVisualElement? (redundant with the union),
      //   showTitleSlot?/titleSlotElement (no matching code prop), image size and
      //   nested Button variants (Figma authoring scaffolding).
    },
    example: ({
      sdsType,
      visualElementType,
      image,
      icon,
      imagePosition,
      imagePadding,
      overlineText,
      titleText,
      subtitleText,
      metadataText,
      boundingBox,
      decorativeBorder,
      body,
      actions,
    }) => (
      <ContentCard
        sdsType={sdsType}
        visualElementType={visualElementType}
        image={image}
        icon={icon}
        imagePosition={imagePosition}
        imagePadding={imagePadding}
        overlineText={overlineText}
        titleText={titleText}
        subtitleText={subtitleText}
        metadataText={metadataText}
        boundingBox={boundingBox}
        decorativeBorder={decorativeBorder}
      >
        {body}
        {actions}
      </ContentCard>
    ),
  }
);
