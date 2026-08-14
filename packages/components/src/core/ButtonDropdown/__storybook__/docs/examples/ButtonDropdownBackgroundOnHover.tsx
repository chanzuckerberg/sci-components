// backgroundOnHover only applies to the minimal style. Turning it off drops the
// button's padding along with the hover and pressed backgrounds, which is what
// lets it sit flush with the text around it.

import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonDropdown sdsStyle="minimal" sdsType="primary">
        Hover for a background
      </ButtonDropdown>

      <ButtonDropdown
        backgroundOnHover={false}
        sdsStyle="minimal"
        sdsType="primary"
      >
        Flush with the text
      </ButtonDropdown>
    </div>
  );
}

export default App;
