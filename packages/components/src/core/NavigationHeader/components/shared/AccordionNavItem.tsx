import { Fragment, ReactNode } from "react";
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";
import MenuItem from "src/core/MenuItem";
import { groupItemsBySection } from "../../utils";
import { StyledDivider, StyledSectionHeader } from "../style";
import { StyledAccordion } from "../../style";
import { DropdownItem } from "../NavigationHeaderPrimaryNav";

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
}: AccordionNavItemProps) {
  const isExpanded = expandedAccordion === accordionId;

  const handleAccordionChange = () => {
    const newExpandedState = isExpanded ? null : accordionId;
    setExpandedAccordion(newExpandedState);

    // Scroll to the accordion if it's being opened
    if (!isExpanded && scrollToAccordion) {
      scrollToAccordion(accordionId);
    }
  };

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
    >
      <AccordionHeader chevronSize={chevronSize}>{label}</AccordionHeader>
      <AccordionDetails>
        {(() => {
          const groupedItems = groupItemsBySection(items);
          const sections = Object.keys(groupedItems);
          const hasMultipleSections =
            sections.length > 1 || sections.some((section) => section !== "");

          return sections.map((section, sectionIndex) => {
            const sectionItems = groupedItems[section];
            const showDivider = hasMultipleSections && sectionIndex > 0;

            return (
              <Fragment key={`section-${section || "default"}`}>
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
                  >
                    {section}
                  </StyledSectionHeader>
                )}
                {sectionItems.map((subItem) => {
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
                })}
              </Fragment>
            );
          });
        })()}
      </AccordionDetails>
    </StyledAccordion>
  );
}
