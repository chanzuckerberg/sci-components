import { StyledCalloutBody } from "./style";

const CalloutBody = ({
  children,
  hideTitle,
}: {
  children: React.ReactNode;
  hideTitle?: boolean;
}): JSX.Element => {
  return (
    <StyledCalloutBody hideTitle={hideTitle}>{children}</StyledCalloutBody>
  );
};

export default CalloutBody;
