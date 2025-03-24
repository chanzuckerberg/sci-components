import { memo, useRef } from "react";
import { StyledMobileLinkRow } from "../../style";
import FooterLink from "../FooterLink";
import { NavigationFooterNavItem } from "../../NavigationFooter.types";
import { useLastInRow } from "src/common/helpers/useLastInRow";

interface MobileLinkRowProps {
  links: NavigationFooterNavItem[];
  hasInvertedStyle?: boolean;
}

const MobileLinkRow = memo(
  ({ links, hasInvertedStyle }: MobileLinkRowProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const noDividerIndices = useLastInRow(containerRef, itemRefs);

    return (
      <StyledMobileLinkRow ref={containerRef}>
        {links.map((link, index) => (
          <FooterLink
            key={link.label}
            link={link}
            showDivider={!noDividerIndices.has(index)}
            hasInvertedStyle={hasInvertedStyle}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          />
        ))}
      </StyledMobileLinkRow>
    );
  }
);

MobileLinkRow.displayName = "MobileLinkRow";

export default MobileLinkRow;
