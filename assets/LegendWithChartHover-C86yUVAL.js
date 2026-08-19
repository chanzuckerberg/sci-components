import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The legend describes a chart it knows nothing about, so keeping the two in
// step is the parent's job, and it takes both halves of the hover API.
//
// Pointing at a bar sets hoveredIndex, which highlights the matching legend
// item. Pointing at a legend item fires onItemMouseEnter, which the parent turns
// into a highlight on the bar. hoveredIndex only ever adds a highlight (the
// legend still tracks its own hover, and null means "nothing from outside"
// rather than "clear it"), so the two never fight over the same item.
//
// The bar here is four divs sized by flex-grow, deliberately plain: it stands in
// for whatever chart the legend is a key to. For a real stacked bar, reach for
// StackedBarChart from @czi-sds/data-viz, which renders this legend itself.

import { useState } from "react";
import {
  Legend,
  getCorners,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const ITEMS = [
  { color: "#0B6CCC", name: "Transcriptomic", value: 117 },
  { color: "#3E8F3E", name: "Prosthetics", value: 130 },
  { color: "#9A54C1", name: "Epigenomics", value: 100 },
  { color: "#C9721A", name: "Imaging", value: 61 },
];

const TOTAL = ITEMS.reduce((sum, item) => sum + item.value, 0);

const Stack = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-direction: column;
      gap: \${spaces?.m}px;
      max-width: 420px;
    \`;
  }}
\`;

const Bar = styled.div<CommonThemeProps>\`
  \${(props) => {
    const corners = getCorners(props);
    const spaces = getSpaces(props);

    return \`
      display: flex;
      gap: \${spaces?.xxxs}px;
      height: 16px;
      overflow: hidden;
      border-radius: \${corners?.s}px;
    \`;
  }}
\`;

const Segment = styled.div\`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
\`;

function App() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="app">
      <Stack>
        <Bar>
          {ITEMS.map((item, index) => (
            <Segment
              key={item.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: item.color,
                flexGrow: item.value / TOTAL,
                opacity:
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.2,
              }}
            />
          ))}
        </Bar>

        <Legend
          hoveredIndex={hoveredIndex}
          items={ITEMS}
          onItemMouseEnter={(_, index) => setHoveredIndex(index)}
          onItemMouseLeave={() => setHoveredIndex(null)}
          showValues
        />
      </Stack>
    </div>
  );
}

export default App;
`}))();export{t as default};