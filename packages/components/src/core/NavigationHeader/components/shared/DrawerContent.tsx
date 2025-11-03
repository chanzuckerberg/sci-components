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
} from "../../style";
import { DropdownItem } from "../NavigationHeaderPrimaryNav";

interface DrawerContentProps {
  drawerItems: DropdownItem[];
  section: string;
  hasMultipleSections: boolean;
  hasInvertedStyle?: boolean;
  onItemClick: () => void;
}

/**
 * Shared drawer content component used by both NavigationHeaderPrimaryNav and NavigationHeaderSecondaryNav
 * This implementation is based on the NavigationHeaderPrimaryNav version as the source of truth
 */
export default function DrawerContent({
  drawerItems,
  section,
  hasMultipleSections,
  hasInvertedStyle,
  onItemClick,
}: DrawerContentProps) {
  return (
    <>
      {section && hasMultipleSections && (
        <StyledHoverDrawerColumnHeader hasInvertedStyle={hasInvertedStyle}>
          {section}
        </StyledHoverDrawerColumnHeader>
      )}
      {drawerItems.map((subItem: DropdownItem, index: number) => {
        const {
          label: subLabel,
          details,
          icon,
          onClick,
          ...subItemRest
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
            sdsStyle="minimal"
            sdsType="secondary"
            hasInvertedStyle={hasInvertedStyle}
            hasIcon={hasIcon}
            hasDetails={hasDetails}
            {...subItemRest}
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
                  <StyledHoverDrawerItemDetails
                    hasInvertedStyle={hasInvertedStyle}
                  >
                    {details}
                  </StyledHoverDrawerItemDetails>
                )}
              </StyledHoverDrawerItemText>
            </StyledHoverDrawerItemContent>
          </StyledHoverDrawerItem>
        );
      })}
    </>
  );
}
