// Vertical orientation is only honored when every button is icon-only

import { Button, ButtonGroup } from "@czi-sds/components";
import {
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonGroup sdsType="secondary">
        <Button aria-label="Search">
          <MagnifyingGlassIcon weight="bold" />
        </Button>
        <Button aria-label="Edit">
          <PencilSimpleIcon weight="bold" />
        </Button>
        <Button aria-label="Delete">
          <TrashIcon weight="bold" />
        </Button>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary" orientation="vertical">
        <Button aria-label="Search">
          <MagnifyingGlassIcon weight="bold" />
        </Button>
        <Button aria-label="Edit">
          <PencilSimpleIcon weight="bold" />
        </Button>
        <Button aria-label="Delete">
          <TrashIcon weight="bold" />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
