import { FormLabel, styled } from "@mui/material";
import { fontBodySemiboldXxxs } from "@components/src/core/styles";

export const StyledFormLabel = styled(FormLabel)`
  ${fontBodySemiboldXxxs}
  color: ${({ theme }) => theme.palette.text.primary};
`;
