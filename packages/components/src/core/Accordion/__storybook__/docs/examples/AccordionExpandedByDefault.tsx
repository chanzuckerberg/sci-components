// An Accordion that is already open on first render

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" defaultExpanded>
        <AccordionHeader chevronSize="xs">Accordion Header</AccordionHeader>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
