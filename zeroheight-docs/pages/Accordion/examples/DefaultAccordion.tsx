// Most minimal Accordion (just has the basic requirements)

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider={false} togglePosition="right">
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
