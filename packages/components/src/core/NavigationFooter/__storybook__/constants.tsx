import { ReactNode } from "react";
import { getSemanticColors } from "../../styles";
import { useTheme } from "@mui/material";

export function ExampleLogo({
  children,
  height,
  width,
}: {
  children?: ReactNode;
  height: number;
  width: number;
}) {
  const theme = useTheme();
  const colors = getSemanticColors({ theme });

  return (
    <div
      style={{
        alignItems: "center",
        border: `1px dashed ${colors?.base.borderPrimary}`,
        color: colors?.base.textSecondary,
        display: "flex",
        fontSize: 10,
        fontWeight: "normal",
        height,
        justifyContent: "center",
        whiteSpace: "nowrap",
        width,
      }}
    >
      {children}
    </div>
  );
}

export const NAVIGATION_FOOTER_LOGO_OPTIONS = [
  <ExampleLogo key="logo" width={50} height={24}>
    Logo Slot
  </ExampleLogo>,
  null,
];

export const NAVIGATION_FOOTER_EXCLUDED_CONTROLS = [
  "hasInvertedStyle",
  "images",
  "logo",
  "logoUrl",
  "navItems",
  "navLinks",
  "tag",
  "tagColor",
  "title",
];
