// ListItemLabel is a semibold span for the term at the start of an item, so
// definition-style lists stay readable without hand-rolled font weights.

import { List, ListItem, ListItemLabel } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List>
        <ListItem fontSize="s">
          <span>
            <ListItemLabel>Draft</ListItemLabel> Only you can see the dataset.
          </span>
        </ListItem>
        <ListItem fontSize="s">
          <span>
            <ListItemLabel>Private</ListItemLabel> Everyone in your collection
            can see the dataset.
          </span>
        </ListItem>
        <ListItem fontSize="s">
          <span>
            <ListItemLabel>Published</ListItemLabel> The dataset is visible to
            anyone with the link, and the version is frozen.
          </span>
        </ListItem>
      </List>
    </div>
  );
}

export default App;
