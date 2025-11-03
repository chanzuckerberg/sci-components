import { ReactNode } from "react";
import { AccordionHeader } from "src/core/Accordion";
import MenuItem from "src/core/MenuItem";
import Icon, { IconNameToSizes } from "src/core/Icon";
import { groupItemsBySection } from "../../utils";
import {
  StyledAccordionDetails,
  StyledAccordionSection,
  StyledDivider,
  StyledSectionHeader,
} from "../style";
import { EmptyIcon, StyledAccordion } from "../../style";
import { DropdownItem } from "../NavigationHeaderPrimaryNav";
import {
  StyledDrawerNavItem,
  StyledDrawerNavItemContent,
  StyledDrawerNavItemText,
  StyledDrawerNavItemCaption,
  StyledIconWrapper,
} from "./AccordionNavItemStyle";

export interface AccordionNavItemProps {
  accordionId: string;
  label: ReactNode;
  items: DropdownItem[];
  expandedAccordion: string | null;
  setExpandedAccordion: (value: string | null) => void;
  accordionRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  scrollToAccordion?: (accordionId: string) => void;
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
  chevronSize?: "xs" | "s";
  onClose: () => void;
  sdsStyle?: "dropdown" | "drawer";
}

// Render nav item for drawer style with icon and caption
function renderDrawerStyleItem(
  subItem: DropdownItem,
  hasInvertedStyle: boolean | undefined,
  onClose: () => void
) {
  const { label: dropdownItemLabel, details, icon, onClick } = subItem;
  const hasCaption = !!details;
  const iconSize = hasCaption ? "l" : "s";

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick?.(e as unknown as React.MouseEvent);
      onClose();
    }
  };

  return (
    <StyledDrawerNavItem
      key={`nav-item-${dropdownItemLabel}`}
      hasInvertedStyle={hasInvertedStyle}
      hasCaption={hasCaption}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {!icon && <EmptyIcon hasDetails={hasCaption} />}
      {icon && (
        <StyledIconWrapper iconSize={iconSize}>
          {typeof icon === "string" ? (
            <Icon sdsIcon={icon as keyof IconNameToSizes} sdsSize={iconSize} />
          ) : (
            icon
          )}
        </StyledIconWrapper>
      )}
      <StyledDrawerNavItemContent>
        <StyledDrawerNavItemText
          hasDetails={hasCaption}
          hasInvertedStyle={hasInvertedStyle}
        >
          {dropdownItemLabel}
        </StyledDrawerNavItemText>
        {hasCaption && (
          <StyledDrawerNavItemCaption hasInvertedStyle={hasInvertedStyle}>
            {details}
          </StyledDrawerNavItemCaption>
        )}
      </StyledDrawerNavItemContent>
    </StyledDrawerNavItem>
  );
}

// Render nav item for dropdown style (simple menu item)
function renderDropdownStyleItem(subItem: DropdownItem, onClose: () => void) {
  const { label: dropdownItemLabel, onClick } = subItem;

  return (
    <MenuItem
      key={`nav-item-${dropdownItemLabel}`}
      onClick={(e) => {
        onClick?.(e);
        onClose();
      }}
      sdsType="action"
    >
      {dropdownItemLabel}
    </MenuItem>
  );
}

export default function AccordionNavItem({
  accordionId,
  label,
  items,
  expandedAccordion,
  setExpandedAccordion,
  accordionRefs,
  scrollToAccordion,
  hasInvertedStyle,
  isNarrow,
  chevronSize = "s",
  onClose,
  sdsStyle = "dropdown",
}: AccordionNavItemProps) {
  const isExpanded = expandedAccordion === accordionId;

  const handleAccordionChange = () => {
    const newExpandedState = isExpanded ? null : accordionId;
    setExpandedAccordion(newExpandedState);

    if (!isExpanded && scrollToAccordion) {
      scrollToAccordion(accordionId);
    }
  };

  const renderNavItem = (subItem: DropdownItem) => {
    return sdsStyle === "drawer"
      ? renderDrawerStyleItem(subItem, hasInvertedStyle, onClose)
      : renderDropdownStyleItem(subItem, onClose);
  };

  const groupedItems = groupItemsBySection(items);
  const sections = Object.keys(groupedItems);
  const hasMultipleSections =
    sections.length > 1 || sections.some((section) => section !== "");

  return (
    <StyledAccordion
      key={accordionId}
      id={accordionId}
      hasInvertedStyle={hasInvertedStyle}
      isNarrow={isNarrow}
      expanded={isExpanded}
      onChange={handleAccordionChange}
      ref={(el: HTMLDivElement | null) => {
        if (el) {
          accordionRefs.current.set(accordionId, el);
        } else {
          accordionRefs.current.delete(accordionId);
        }
      }}
      sdsStyle={sdsStyle}
    >
      <AccordionHeader chevronSize={chevronSize}>{label}</AccordionHeader>
      <StyledAccordionDetails sdsStyle={sdsStyle}>
        {sections.map((section, sectionIndex) => {
          const sectionItems = groupedItems[section];
          const showDivider =
            hasMultipleSections && sectionIndex > 0 && sdsStyle !== "drawer";

          return (
            <StyledAccordionSection
              sdsStyle={sdsStyle}
              hasInvertedStyle={hasInvertedStyle}
              key={`section-${section || "default"}`}
            >
              {showDivider && (
                <StyledDivider
                  hasSection={!!section}
                  isNarrow={isNarrow}
                  hasInvertedStyle={hasInvertedStyle}
                />
              )}
              {section && hasMultipleSections && (
                <StyledSectionHeader
                  isNarrow={isNarrow}
                  hasInvertedStyle={hasInvertedStyle}
                  sdsStyle={sdsStyle}
                >
                  {section}
                </StyledSectionHeader>
              )}
              {sectionItems.map((subItem) => renderNavItem(subItem))}
            </StyledAccordionSection>
          );
        })}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
}
