import { List, ListItem } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <List>
        <ListItem fontSize="l" marginBottom="s">
          fontSize=l marginBottom=s
        </ListItem>
        <ListItem fontSize="m" marginBottom="s">
          fontSize=m marginBottom=s
        </ListItem>
        <ListItem fontSize="s" marginBottom="xs">
          fontSize=s marginBottom=xs
        </ListItem>
        <ListItem fontSize="xs" marginBottom="xs">
          fontSize=xs marginBottom=xs
        </ListItem>
        <ListItem fontSize="xxs" marginBottom="xs">
          fontSize=xxs marginBottom=xs
        </ListItem>
        <ListItem fontSize="xxxs" marginBottom="xxs">
          fontSize=xxxs marginBottom=xxs
        </ListItem>
      </List>
    </div>
  );
}

export default App;
