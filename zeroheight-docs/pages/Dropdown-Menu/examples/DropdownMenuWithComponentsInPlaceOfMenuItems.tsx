// DropdownMenu with components in place of menu items

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DefaultDropdownMenuOption,
  Tag,
  Button,
  ButtonIcon,
} from "@czi-sds/components";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  {
    component: (
      <Button sdsStyle="square" sdsType="primary">
        Button
      </Button>
    ),
    name: "Button component",
    section: "Button component",
  },
  {
    component: <ButtonIcon icon="Copy" sdsSize="large" sdsType="primary" />,
    name: "ButtonIcon component",
    section: "ButtonIcon component",
  },
  {
    component: (
      <div style={{ marginTop: 10 }}>
        <Tag
          label="Tag 1"
          sdsStyle="rounded"
          sdsType="secondary"
          color="negative"
        />
        <Tag
          label="Tag 2"
          sdsStyle="rounded"
          sdsType="secondary"
          color="notice"
        />
        <Tag
          label="Tag 3"
          sdsStyle="rounded"
          sdsType="secondary"
          color="neutral"
        />
      </div>
    ),
    name: "tag components",
    section: "Tag components",
  },
  {
    component: (
      <Tag label="Tag" sdsStyle="rounded" sdsType="secondary" color="neutral" />
    ),
    name: "Button component",
    section: "Component with count and icon",
    count: 37,
    sdsIcon: "PuzzlePiece",
  },
];

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

function handleClickAway() {}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app" style={{ paddingLeft: "10px" }}>
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          groupBy={(option: DefaultDropdownMenuOption) => {
            return option.section ?? "";
          }}
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
