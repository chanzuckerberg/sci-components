import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// DropdownMenu with search

import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";
import styled from "@emotion/styled";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Fruit: Apple",
  },
  {
    name: "Fruit: Orange",
  },
  {
    name: "Vegetable: Carrot",
  },
  {
    name: "Vegetable: Kale",
  },
];

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
          noOptionsText="No matches found, try again!"
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
          search
        />
      )}
    </div>
  );
}

export default App;
`}))();export{t as default};