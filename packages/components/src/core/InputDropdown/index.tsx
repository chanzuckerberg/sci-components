import Icon from "src/core/Icon";
import {
  IconWrapper,
  LabelWrapper,
  MinimalDetails,
  InputDropdownProps as SdsInputDropdownProps,
  StyledCounter,
  StyledDetail,
  StyledInputDropdown,
  StyledLabel,
} from "./style";
import { EMPTY_OBJECT, cn } from "src/common/utils";

export type InputDropdownProps = SdsInputDropdownProps & {
  classes?: {
    root?: string;
    label?: string;
    labelDetailsWrapper?: string;
    contentWrapper?: string;
    details?: string;
    counter?: string;
    iconWrapper?: string;
    chevronIcon?: string;
    minimalDetails?: string;
  };
};

const VALID_SDS_STYLES = ["minimal", "square", "rounded"] as const;

const validateSdsStyle = (
  sdsStyle: string | undefined
): "minimal" | "square" | "rounded" => {
  if (
    sdsStyle &&
    VALID_SDS_STYLES.includes(sdsStyle as (typeof VALID_SDS_STYLES)[number])
  ) {
    return sdsStyle as "minimal" | "square" | "rounded";
  }
  return "square";
};

/**
 * @see https://mui.com/material-ui/react-button/
 */
const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const {
    label,
    multiple = false,
    sdsStyle: rawSdsStyle = "square",
    sdsType = "label",
    details,
    counter,
    shouldTruncateMinimalDetails,
    shouldPutAColonAfterLabel = true,
    value,
    classes = EMPTY_OBJECT,
    className,
  } = props;
  const sdsStyle = validateSdsStyle(rawSdsStyle);

  const isMinimal = sdsStyle === "minimal";

  const shouldRenderDetails = !multiple && (details || value) && !isMinimal;
  const shouldRenderInlineMinimalDetails =
    isMinimal && sdsType === "value" && !multiple && details;
  const shouldRenderMinimalDetails = isMinimal && sdsType === "label";
  const shouldRenderCounter =
    multiple && counter !== undefined && counter !== "0" && !isMinimal;

  const {
    root: rootClassName,
    label: labelClassName,
    contentWrapper: contentWrapperClassName,
    labelDetailsWrapper: labelDetailsWrapperClassName,
    details: detailsClassName,
    counter: counterClassName,
    iconWrapper: iconWrapperClassName,
    chevronIcon: chevronIconClassName,
    minimalDetails: minimalDetailsClassName,
  }: InputDropdownProps["classes"] = classes;

  return (
    <StyledInputDropdown
      {...props}
      className={cn(rootClassName, className)}
      sdsStyle={sdsStyle}
      aria-label="Dropdown input"
      size="small"
    >
      <LabelWrapper className={cn(contentWrapperClassName)}>
        <div className={cn(labelDetailsWrapperClassName)}>
          <StyledLabel
            className={cn("styled-label", labelClassName)}
            details={details}
            counter={counter}
            sdsType={sdsType}
          >
            {renderLabelText({
              counter,
              details,
              isMinimal,
              label,
              multiple,
              sdsType,
              shouldPutAColonAfterLabel,
              value,
            })}
          </StyledLabel>
          {shouldRenderDetails && (
            <StyledDetail className={cn(detailsClassName)}>
              {renderDetailsText({ details, sdsType, value })}
            </StyledDetail>
          )}
          {shouldRenderInlineMinimalDetails && (
            <StyledDetail className={cn(detailsClassName)}>
              {renderDetailsText({ details, sdsType, value })}
            </StyledDetail>
          )}
          {shouldRenderCounter && (
            <StyledCounter className={cn(counterClassName)}>
              {counter}
            </StyledCounter>
          )}
        </div>
        <IconWrapper className={cn(iconWrapperClassName)}>
          <Icon
            sdsIcon="ChevronDown"
            sdsSize="xs"
            className={cn(chevronIconClassName)}
          />
        </IconWrapper>
      </LabelWrapper>

      {shouldRenderMinimalDetails && (
        <MinimalDetails
          shouldTruncateMinimalDetails={shouldTruncateMinimalDetails}
          className={cn(minimalDetailsClassName)}
        >
          {renderDetailsText({ details, sdsType, value })}
        </MinimalDetails>
      )}
    </StyledInputDropdown>
  );
};

interface RenderLabelTextProps {
  counter: InputDropdownProps["counter"];
  details: InputDropdownProps["details"];
  isMinimal: boolean;
  label: InputDropdownProps["label"];
  multiple: InputDropdownProps["multiple"];
  shouldPutAColonAfterLabel: InputDropdownProps["shouldPutAColonAfterLabel"];
  sdsType: InputDropdownProps["sdsType"];
  value: InputDropdownProps["value"];
}

function renderLabelText(props: RenderLabelTextProps) {
  const { sdsType } = props;

  if (sdsType === "label") {
    return renderLabelTypeLabelText(props);
  }

  if (sdsType === "value") {
    return renderValueTypeLabelText(props);
  }

  return null;
}

function renderLabelTypeLabelText({
  isMinimal,
  label,
  counter,
  value,
  shouldPutAColonAfterLabel,
}: RenderLabelTextProps) {
  if (isMinimal) return label;

  return (counter || value) && shouldPutAColonAfterLabel ? (
    <>
      {label}
      {":"}
    </>
  ) : (
    label
  );
}

function renderValueTypeLabelText({
  value,
  multiple,
  isMinimal,
  label,
  counter,
  details,
  shouldPutAColonAfterLabel,
}: RenderLabelTextProps) {
  if (!value || multiple) {
    if (isMinimal) return label;

    return !!counter && shouldPutAColonAfterLabel ? (
      <>
        {label}
        {":"}
      </>
    ) : (
      label
    );
  }

  if (isMinimal) return value;

  return (!!counter || !!details) && shouldPutAColonAfterLabel ? (
    <>
      {value}
      {":"}
    </>
  ) : (
    value
  );
}

function renderDetailsText({
  details,
  sdsType,
  value,
}: {
  details: InputDropdownProps["details"];
  sdsType: InputDropdownProps["sdsType"];
  value: InputDropdownProps["value"];
}) {
  if (sdsType === "label" && value) {
    return value;
  } else if (sdsType === "value") {
    return details;
  }
}

export default InputDropdown;
