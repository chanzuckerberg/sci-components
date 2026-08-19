import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Dropdown with grouped sections

import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";
import styled from "@emotion/styled";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Menu item A.1",
    section: "Section A",
  },
  {
    name: "Menu item A.2",
    section: "Section A",
  },
  {
    name: "Menu item without a specified section",
  },
  {
    name: "Menu item B.1",
    section: "Section B",
  },
  {
    name: "Menu item C.1",
    section: "Section C",
  },
  {
    name: "Menu item C.2",
    section: "Section C",
  },
  {
    name: "Menu item C.3",
    section: "Section C",
  },
  {
    name: "Menu item B.2",
    section: "Section B",
  },
];

/**
 * Items need to be sorted by the same groupBy dimension
 * In this example, we're grouping by the last character of the item name
 */
const SORTED_ITEMS = [...MENU_ITEMS].sort((a, b) => {
  const aLastLetter = a.name.slice(-1);
  const bLastLetter = b.name.slice(-1);

  if (aLastLetter < bLastLetter) {
    return -1;
  }
  if (aLastLetter > bLastLetter) {
    return 1;
  }
  return 0;
});

function groupBy(option: DefaultAutocompleteOption) {
  return option.name.slice(-1);
}

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

const Anchor = styled.div\`
  position: absolute;
  top: 12px;
  left: 20px;
\`;

function handleClickAway() {}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <Anchor ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          groupBy={groupBy}
          onClickAway={handleClickAway}
          open
          options={SORTED_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
`}))();export{t as default};