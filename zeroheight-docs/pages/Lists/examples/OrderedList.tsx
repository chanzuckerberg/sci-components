import { List, ListItem, ListSubheader } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <List
        ordered
        subheader={
          <ListSubheader disableSticky>
            Font sizes and spacing for a nested ordered list
          </ListSubheader>
        }
      >
        <ListItem ordered>
          <span>
            Nested List 1
            <List ordered>
              <ListItem ordered fontSize="l" marginBottom="s">
                fontSize=l marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="m" marginBottom="s">
                fontSize=m marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="s" marginBottom="xs">
                fontSize=s marginBottom=xs
              </ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered>
          <span>
            Nested List 2
            <List ordered>
              <ListItem ordered fontSize="l">
                <span>
                  Nested List 2
                  <List ordered>
                    <ListItem ordered fontSize="l" marginBottom="s">
                      fontSize=l marginBottom=s
                    </ListItem>
                    <ListItem ordered fontSize="m" marginBottom="s">
                      fontSize=m marginBottom=s
                    </ListItem>
                    <ListItem ordered fontSize="s" marginBottom="xs">
                      fontSize=s marginBottom=xs
                    </ListItem>
                  </List>
                </span>
              </ListItem>
              <ListItem ordered fontSize="m" marginBottom="s">
                fontSize=m marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="s" marginBottom="xs">
                fontSize=s marginBottom=xs
              </ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered>
          <span>
            Nested List 3
            <List ordered>
              <ListItem ordered fontSize="l" marginBottom="s">
                fontSize=l marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="m" marginBottom="s">
                fontSize=m marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="s" marginBottom="xs">
                fontSize=s marginBottom=xs
              </ListItem>
            </List>
          </span>
        </ListItem>
      </List>
    </div>
  );
}

export default App;
