// DropdownMenu with customized `onInputChange`

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
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
    name: "Longer menu item than the others",
  },
];

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

function handleClickAway() {}

type ChangeMessage = { reason: string; value: unknown };

function Message({ message }: { message?: ChangeMessage }) {
  return (
    <div
      style={{ position: "absolute", top: "170px", fontFamily: "sans-serif" }}
    >
      <p>{JSON.stringify(message)}</p>
    </div>
  );
}

function App() {
  const [message, setMessage] = useState<ChangeMessage>();

  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <>
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            keepSearchOnSelect
            onClickAway={handleClickAway}
            onChange={(_: SyntheticEvent, value: unknown, reason: string) =>
              setMessage({ reason, value })
            }
            open
            options={MENU_ITEMS}
          />
          <Message message={message} />
        </>
      )}
    </div>
  );
}

export default App;
