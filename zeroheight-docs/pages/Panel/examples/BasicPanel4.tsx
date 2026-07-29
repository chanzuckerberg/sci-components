import { useState } from "react";
import { Button, Panel } from "@czi-sds/components";
import { Box, Typography } from "@mui/material";

function App() {
  const [open, setOpen] = useState(true);

  const HeaderComponent = <Typography variant="h2">Panel Header</Typography>;

  const CloseButton = (
    <Button
      sdsStyle="icon"
      sdsSize="small"
      sdsType="secondary"
      icon="ChevronDown"
      aria-label="Panel Toggle"
    />
  );

  return (
    <div className="app">
      <Button
        sdsType="primary"
        sdsStyle="icon"
        icon="InfoCircle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Panel Toggle"
      >
        Toggle Panel
      </Button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        facilisis tortor et pellentesque pulvinar. Ut at convallis ipsum. Nullam
        scelerisque tempor arcu, quis pretium magna semper eu. Nam hendrerit
        lectus in enim scelerisque, sed ornare sapien consequat. Proin sed
        congue quam. Integer consequat elit tristique sodales rhoncus. In
        bibendum dolor sit amet erat porta, nec posuere nibh consectetur. Cras
        scelerisque interdum eros ut porta. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Ut in
        lacus et mi efficitur scelerisque. Pellentesque congue purus eu feugiat
        cursus. Phasellus urna massa, sollicitudin id elit et, efficitur
        faucibus nibh.
      </p>
      <p>
        Nam sit amet tortor varius, lacinia velit quis, lacinia metus. Quisque
        dictum, nulla at luctus fringilla, ligula diam fringilla nisl, non
        consequat nulla turpis at ex. Donec hendrerit facilisis nisl at
        fringilla. Pellentesque posuere tortor ac ante luctus, at euismod augue
        vulputate. Vivamus pretium pretium nisi, non convallis nunc volutpat ac.
        Nam finibus justo leo, vel pellentesque velit gravida vel. Sed in turpis
        non sem efficitur eleifend vel ac lacus. Sed volutpat feugiat dictum.
        Pellentesque tristique mollis magna sit amet vestibulum. Nulla ac tellus
        eu orci volutpat congue. In vitae dolor et est feugiat fringilla. Sed
        varius neque nunc, sed pulvinar neque lobortis posuere.
      </p>
      <Panel
        open={open}
        sdsType="overlay"
        closeButtonOnClick={() => setOpen(false)}
        HeaderComponent={HeaderComponent}
        CloseButtonComponent={CloseButton}
        position="bottom"
      >
        [Panel Content]
      </Panel>
    </div>
  );
}

export default App;
