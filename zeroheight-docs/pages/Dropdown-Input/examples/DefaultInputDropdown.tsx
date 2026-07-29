// Most minimal InputDropdown (just has the basic requirements)

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { InputDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputDropdown label="Label" onClick={() => {}} />
    </div>
  );
}

export default App;
