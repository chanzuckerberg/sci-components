import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The list on its own: items in the order they are given, sub-items indented
// one level under the item they belong to, and the highlight starting on the
// first item.
//
// The refs are held but never handed to an element, which keeps this to the
// shape of the component. Nothing scrolls, and the highlight moves only when an
// item is clicked. The examples below point the refs at sections, which is what
// puts the highlight under the reader's own scrolling.

import { NavigationJumpTo } from "@czi-sds/components";
import { useRef } from "react";

function App() {
  const overviewRef = useRef<HTMLElement | null>(null);
  const methodsRef = useRef<HTMLElement | null>(null);
  const samplePrepRef = useRef<HTMLElement | null>(null);
  const sequencingRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);

  return (
    <div className="app">
      <NavigationJumpTo
        items={[
          { elementRef: overviewRef, title: "Overview" },
          {
            elementRef: methodsRef,
            subItems: [
              { elementRef: samplePrepRef, title: "Sample prep" },
              { elementRef: sequencingRef, title: "Sequencing" },
            ],
            title: "Methods",
          },
          { elementRef: resultsRef, title: "Results" },
        ]}
        width="200px"
      />
    </div>
  );
}

export default App;
`}))();export{t as default};