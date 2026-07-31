// fontSize sets the body type scale on each item, and marginBottom sets the gap
// below it. Both live on ListItem, not on List, so a list can mix sizes.

import { List, ListItem } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <List>
        <ListItem fontSize="l" marginBottom="s">
          fontSize=&quot;l&quot;, marginBottom=&quot;s&quot;
        </ListItem>
        <ListItem fontSize="m" marginBottom="s">
          fontSize=&quot;m&quot;, marginBottom=&quot;s&quot;
        </ListItem>
        <ListItem fontSize="s" marginBottom="xs">
          fontSize=&quot;s&quot;, marginBottom=&quot;xs&quot; (the defaults)
        </ListItem>
        <ListItem fontSize="xs" marginBottom="xs">
          fontSize=&quot;xs&quot;, marginBottom=&quot;xs&quot;
        </ListItem>
        <ListItem fontSize="xxs" marginBottom="xs">
          fontSize=&quot;xxs&quot;, marginBottom=&quot;xs&quot;
        </ListItem>
        <ListItem fontSize="xxxs" marginBottom="xxs">
          fontSize=&quot;xxxs&quot;, marginBottom=&quot;xxs&quot;
        </ListItem>
      </List>
    </div>
  );
}

export default App;
