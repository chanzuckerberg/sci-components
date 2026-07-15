// Owned NavigationFooter preview for claude.ai/design.
//
// The NavigationFooter SDS component itself renders correctly through the
// bundled SDSPreviewProvider (the "Beta" tag is themed purple, layout matches).
// The only mismatch is the story-local `ExampleLogo` placeholder used for the
// logo + image slots: it reads its border/text color from `useTheme()` +
// `getSemanticColors()`. In the preview those resolve against a second, empty
// MUI theme instance, so `colors.base.borderPrimary` / `.textSecondary` come
// back undefined — the dashed border disappears and the text falls back to the
// inherited link color (purple). Storybook shows a gray dashed box.
//
// Fix: mirror the story JSX but give ExampleLogo the concrete resolved token
// value (base.borderPrimary === base.textSecondary === gray[600] === #767676),
// so the slots render as the gray dashed placeholders the storybook shows.
import * as React from "react";
import RawNavigationFooter from "@components/src/core/NavigationFooter";

function ExampleLogo({
  children,
  height,
  width,
}: {
  children?: React.ReactNode;
  height: number;
  width: number;
}) {
  return (
    <div
      style={{
        alignItems: "center",
        border: "1px dashed #767676",
        color: "#767676",
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

export function Default() {
  return (
    <RawNavigationFooter
      backgroundAppearance="matchBackground"
      images={[
        {
          image: (
            <ExampleLogo width={64} height={24}>
              Image Slot
            </ExampleLogo>
          ),
          url: "https://example.com/1",
        },
        {
          image: (
            <ExampleLogo width={64} height={24}>
              Image Slot
            </ExampleLogo>
          ),
          url: "https://example.com/2",
        },
      ]}
      logo={
        <ExampleLogo width={64} height={24}>
          Logo Slot
        </ExampleLogo>
      }
      logoUrl="https://example.com"
      navItems={Array.from(Array(5)).map((_, idx) => ({
        component: "a",
        label: "Nav Item",
        linkProps: { target: "_blank" },
        url: `https://example.com/nav/${idx + 1}`,
      }))}
      navLinks={Array.from(Array(5)).map((_, idx) => ({
        label: "Link Item",
        url: `https://example.com/nav/${idx + 1}`,
      }))}
      tag="Beta"
      tagColor="beta"
      title="Logo Name"
    />
  );
}

// Test story: mirrors the repo's TestDemo (just a title + divider).
export function Test() {
  return (
    <RawNavigationFooter data-testid="navigation-footer" title="Test Title" />
  );
}
