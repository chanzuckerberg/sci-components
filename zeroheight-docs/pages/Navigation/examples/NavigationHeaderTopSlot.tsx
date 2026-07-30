// Anything in topComponentSlot renders above the header. The header measures
// that slot and offsets its own sticky top by the slot's height, so dismissing
// the banner moves the header back up on its own.
//
// This one keeps the default sticky position: the offset is applied as a CSS
// top, which a relatively positioned header would read as a second gap below
// the slot.

import {
  Banner,
  NavigationHeader,
  type NavigationHeaderPrimaryNavItem,
} from "@czi-sds/components";
import { useState } from "react";

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "text",
    key: "datasets",
    label: "Datasets",
    onClick: () => console.log("Datasets clicked"),
  },
  {
    itemType: "text",
    key: "about",
    label: "About",
    onClick: () => console.log("About clicked"),
  },
];

function App() {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div className="app">
      <NavigationHeader
        primaryNavItems={primaryNavItems}
        showSearch={false}
        title="Cell Atlas"
        topComponentSlot={
          <Banner
            dismissed={bannerDismissed}
            onClose={() => setBannerDismissed(true)}
            sdsType="primary"
          >
            Scheduled maintenance this Saturday from 8am to noon PT.
          </Banner>
        }
      />
    </div>
  );
}

export default App;
