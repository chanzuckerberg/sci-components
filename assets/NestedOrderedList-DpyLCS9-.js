import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Nested numbering comes from a CSS counter, so sub-items read 1.1., 1.2., and
// so on. The nested List has to live inside a single wrapper element, otherwise
// it becomes a sibling of the item's text instead of a child of it.

import { List, ListItem } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List ordered>
        <ListItem ordered marginBottom="s">
          <span>
            Prepare your data
            <List ordered>
              <ListItem ordered>Upload the raw reads.</ListItem>
              <ListItem ordered>Attach the sample metadata.</ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered marginBottom="s">
          <span>
            Configure the pipeline
            <List ordered>
              <ListItem ordered>Choose a reference genome.</ListItem>
              <ListItem ordered>Set the quality thresholds.</ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered>Start the run.</ListItem>
      </List>
    </div>
  );
}

export default App;
`}))();export{t as default};