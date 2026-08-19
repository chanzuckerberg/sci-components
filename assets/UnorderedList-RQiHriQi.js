import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// An unordered list is the default: no props needed on List or ListItem. The
// subheader goes through MUI's subheader prop, with disableSticky so it scrolls
// with the content.

import { List, ListItem, ListSubheader } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List
        subheader={
          <ListSubheader disableSticky>Before you upload</ListSubheader>
        }
      >
        <ListItem>Files must be gzipped FASTQ or BAM.</ListItem>
        <ListItem>Every sample needs a unique identifier.</ListItem>
        <ListItem>
          Reads shorter than 30 bases are dropped during processing, so trim
          them beforehand if you want to keep them.
        </ListItem>
      </List>
    </div>
  );
}

export default App;
`}))();export{t as default};