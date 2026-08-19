// ordered has to go on both the List and every ListItem: the List switches the
// element to ol and starts the counter, and each item increments it and draws
// its own number.

import { List, ListItem, ListSubheader } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List
        ordered
        subheader={
          <ListSubheader disableSticky>Running an analysis</ListSubheader>
        }
      >
        <ListItem ordered>Pick the samples you want to include.</ListItem>
        <ListItem ordered>Choose a reference genome.</ListItem>
        <ListItem ordered>Start the run and wait for the report.</ListItem>
      </List>
    </div>
  );
}

export default App;
