import Icon from "src/core/Icon";
import {
  StyledHoverDrawerColumnHeader,
  StyledHoverDrawerItem,
  StyledHoverDrawerItemContent,
  StyledHoverDrawerItemIcon,
  StyledHoverDrawerItemText,
  StyledHoverDrawerItemTitle,
  StyledHoverDrawerItemDetails,
  EmptyIcon,
  StyledHoverDrawerActions,
  StyledButton,
  StyledContentWrapper,
} from "../../style";
import {
  DropdownItem,
  ActionItem,
  SectionProps,
} from "../NavigationHeaderPrimaryNav";

interface DrawerContentProps {
  drawerItems: DropdownItem[];
  sectionProps?: SectionProps;
  section: string;
  hasMultipleSections: boolean;
  hasInvertedStyle?: boolean;
  onItemClick: () => void;
  showHeader?: boolean;
  isLastColumn?: boolean;
}

/**
 * Shared drawer content component used by both NavigationHeaderPrimaryNav and NavigationHeaderSecondaryNav
 * This implementation is based on the NavigationHeaderPrimaryNav version as the source of truth
 */
export default function DrawerContent({
  drawerItems,
  sectionProps,
  section,
  hasMultipleSections,
  hasInvertedStyle,
  onItemClick,
  showHeader = true,
  isLastColumn = true,
}: DrawerContentProps) {
  const actions = sectionProps?.actions;

  // Function to render a single item
  const renderItem = (subItem: DropdownItem, index: number) => {
    const {
      label: subLabel,
      details,
      icon,
      onClick,
      ...restSubItemProps
    } = subItem;

    const hasDetails = !!details;
    const hasIcon = !!icon;
    const iconSize = hasDetails ? "l" : "s";

    const renderIcon = () => {
      // Based on primaryNav: return EmptyIcon when no icon
      if (!icon) return <EmptyIcon hasDetails={hasDetails} />;

      const iconContent =
        typeof icon !== "string" ? (
          icon
        ) : (
          // Based on primaryNav: include color="indigo"
          <Icon sdsIcon={icon} sdsSize={iconSize} color="indigo" />
        );

      return (
        <StyledHoverDrawerItemIcon
          hasDetails={hasDetails}
          hasInvertedStyle={hasInvertedStyle}
        >
          {iconContent}
        </StyledHoverDrawerItemIcon>
      );
    };

    return (
      <StyledHoverDrawerItem
        key={`drawer-item-${section || "default"}-${subLabel}-${index}`}
        onClick={(e) => {
          onClick?.(e);
          onItemClick();
        }}
        hasInvertedStyle={hasInvertedStyle}
        hasIcon={hasIcon}
        hasDetails={hasDetails}
        {...restSubItemProps}
      >
        {/* Based on primaryNav: include hasDetails prop */}
        <StyledHoverDrawerItemContent hasDetails={hasDetails}>
          {renderIcon()}
          <StyledHoverDrawerItemText>
            <StyledHoverDrawerItemTitle
              hasDetails={hasDetails}
              hasInvertedStyle={hasInvertedStyle}
            >
              {subLabel}
            </StyledHoverDrawerItemTitle>
            {details && (
              <StyledHoverDrawerItemDetails hasInvertedStyle={hasInvertedStyle}>
                {details}
              </StyledHoverDrawerItemDetails>
            )}
          </StyledHoverDrawerItemText>
        </StyledHoverDrawerItemContent>
      </StyledHoverDrawerItem>
    );
  };

  // Need padding if this is part of a multi-column section but not showing header
  const needsHeaderPadding =
    hasMultipleSections && !showHeader && section !== "";

  return (
    <>
      {section && hasMultipleSections && showHeader && (
        <StyledHoverDrawerColumnHeader hasInvertedStyle={hasInvertedStyle}>
          {section}
        </StyledHoverDrawerColumnHeader>
      )}
      <StyledContentWrapper needsHeaderPadding={needsHeaderPadding}>
        {drawerItems.map(renderItem)}
      </StyledContentWrapper>
      {actions && actions.length > 0 && isLastColumn && (
        <StyledHoverDrawerActions>
          {actions.map((action: ActionItem, index: number) => {
            const { label, onClick, href, component, target, rel } = action;

            // If href is provided without a component, default to anchor tag
            const componentProp = href && !component ? "a" : component;

            return (
              <StyledButton
                key={`action-${section || "default"}-${index}`}
                sdsStyle="rounded"
                sdsType="primary"
                onClick={(e) => {
                  onClick?.(e);
                  // Only close drawer if action has href (navigation)
                  if (href) {
                    onItemClick();
                  }
                }}
                hasInvertedStyle={hasInvertedStyle}
                component={componentProp}
                href={href}
                target={target}
                rel={rel}
              >
                {label}
              </StyledButton>
            );
          })}
        </StyledHoverDrawerActions>
      )}
    </>
  );
}
