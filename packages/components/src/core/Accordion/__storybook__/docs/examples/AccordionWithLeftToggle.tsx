// The toggle chevron rendered before the header text instead of after it

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" togglePosition="left" useDivider>
        <AccordionHeader subtitle="Explore the functionalities of our amazing product">
          Product Features
        </AccordionHeader>
        <AccordionDetails>
          Unveil the multitude of features that make our product stand out. From
          seamless integration with your existing workflow to advanced
          customization options, each feature has been meticulously crafted to
          empower you.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-2" togglePosition="left">
        <AccordionHeader subtitle="Answers to commonly asked questions about our service">
          FAQ Section
        </AccordionHeader>
        <AccordionDetails>
          Delve into a comprehensive compilation of frequently asked questions
          and their detailed answers. This section is your go-to resource for
          clarifying any doubts you might have about our service.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
