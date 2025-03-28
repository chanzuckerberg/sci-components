import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces, Spaces } from "src/core/styles";
import { css, SerializedStyles } from "@emotion/react";

const doNotForwardProps = ["isNarrow"];

const NarrowStyledSection = (): SerializedStyles => {
  return css`
    align-items: start;
    flex-direction: column;
  `;
};

export const StyledSection = styled("section", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps & { gap?: keyof Spaces; isNarrow?: boolean }) => {
    const { isNarrow } = props;
    const spaces = getSpaces(props);

    return css`
      column-gap: ${spaces?.[props?.gap ?? "xl"]}px;

      ${isNarrow && NarrowStyledSection()}
    `;
  }}
`;
