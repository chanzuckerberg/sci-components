// Most minimal InputDropdown (just has the basic requirements)

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider={true} togglePosition="right">
        <AccordionHeader subtitle="Explore the functionalities of our amazing product">
          Product Features
        </AccordionHeader>
        <AccordionDetails>
          Unveil the multitude of features that make our product stand out. From
          seamless integration with your existing workflow to advanced
          customization options, each feature has been meticulously crafted to
          empower you. Navigate through this section to discover how our product
          can revolutionize the way you work.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-2" useDivider={true} togglePosition="right">
        <AccordionHeader
          id={`accordion-2-header`}
          subtitle="Answers to commonly asked questions about our service"
        >
          FAQ Section
        </AccordionHeader>
        <AccordionDetails>
          Delve into a comprehensive compilation of frequently asked questions
          and their detailed answers. This section is your go-to resource for
          clarifying any doubts you might have about our service. Whether it's
          about pricing, compatibility, or functionality, we've got you covered
          with clear and concise explanations, ensuring a smooth and informed
          experience.
        </AccordionDetails>
      </Accordion>

      <Accordion id="accordion-3" useDivider={false} togglePosition="right">
        <AccordionHeader
          id={`accordion-3-header`}
          subtitle="Enhance your skills with our collection of educational materials"
        >
          Learning Resources
        </AccordionHeader>
        <AccordionDetails>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding. Whether you're a beginner or an expert,
          these resources offer valuable insights to help you grow and excel in
          your endeavors.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
