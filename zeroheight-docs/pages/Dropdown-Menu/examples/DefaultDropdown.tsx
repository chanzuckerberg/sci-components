import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Dropdown, DefaultDropdownMenuOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  {
    name: "Menu item 1",
  },
  {
    name: "Menu item 2",
  },
  {
    name: "Menu item 3",
  },
  {
    name: "Menu item 4",
  },
];

function App() {
  return (
    <div className="app">
      <Dropdown label="Click Target" onChange={() => {}} options={MENU_ITEMS} />
    </div>
  );
}

export default App;
