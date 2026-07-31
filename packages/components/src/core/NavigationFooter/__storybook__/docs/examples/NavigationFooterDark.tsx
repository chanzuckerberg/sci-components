// backgroundAppearance="dark" puts the footer on a dark surface and inverts its
// text and dividers. In dark mode it makes no difference: the footer is already
// dark, so the prop only ever adds darkness, never removes it.

import { NavigationFooter } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <NavigationFooter
        backgroundAppearance="dark"
        navItems={[
          { label: "Datasets", url: "/datasets" },
          { label: "Documentation", url: "/docs" },
        ]}
        navLinks={[
          { label: "Privacy", url: "/privacy" },
          { label: "Terms", url: "/terms" },
        ]}
        title="Cell Atlas"
      />
    </div>
  );
}

export default App;
