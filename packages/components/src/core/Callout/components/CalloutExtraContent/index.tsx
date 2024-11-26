import { StyledCalloutExtraContent } from "./style";

const CalloutExtraContent = ({
  children,
  hideTitle,
  hideBody,
}: {
  children: React.ReactNode;
  hideTitle?: boolean;
  hideBody?: boolean;
}): JSX.Element => {
  return (
    <StyledCalloutExtraContent hideTitle={hideTitle} hideBody={hideBody}>
      {children}
    </StyledCalloutExtraContent>
  );
};

export default CalloutExtraContent;
