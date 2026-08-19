import { useState } from "react";
import { InputCheckbox } from "@czi-sds/components";

const CHILDREN = ["Child 1", "Child 2"];

function App() {
  const [checked, setChecked] = useState([true, false]);

  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);

  return (
    <div className="app">
      <InputCheckbox
        label="Parent"
        stage={
          allChecked ? "checked" : someChecked ? "indeterminate" : "unchecked"
        }
        onChange={() => setChecked(checked.map(() => !allChecked))}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "24px",
        }}
      >
        {CHILDREN.map((label, index) => (
          <InputCheckbox
            key={label}
            label={label}
            stage={checked[index] ? "checked" : "unchecked"}
            onChange={() =>
              setChecked((previous) =>
                previous.map((value, position) =>
                  position === index ? !value : value
                )
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
