import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-8L1H2VAU.js";import{a as r,n as i,r as a,t as o}from"./Accordion-MclYqMvH.js";import{n as s,o as c}from"./loremIpsum-BqYjZDri.js";var l,u,d=e((()=>{i(),c(),l=t(n()),u=e=>{let{id:t,subtitle:n,useDivider:i,togglePosition:c}=e;return(0,l.jsxs)(o,{id:t,useDivider:i,togglePosition:c,...e,children:[(0,l.jsx)(a,{subtitle:n,children:`Accordion Header`}),(0,l.jsx)(r,{children:s})]})}})),f,p=e((()=>{f=[`id`,`subtitle`,`useDivider`,`togglePosition`]})),m,h,g,_,v;e((()=>{d(),p(),m=t(n()),h={argTypes:{defaultExpanded:{control:{type:`boolean`},description:"If `true`, expands the accordion by default.",table:{defaultValue:{summary:`false`}}},id:{control:{type:`text`},description:`Required. A unique id for each accordion item, also used to derive the ids that link the header and its content for screen readers.`,required:!0},subtitle:{control:{type:`text`},description:`Set on AccordionHeader. A text that will be displayed as a subtitle beneath the accordion title.`},togglePosition:{control:{type:`select`},description:`Position of the toggle chevron icon.`,options:[`right`,`left`],table:{defaultValue:{summary:`right`}}},useDivider:{control:{type:`boolean`},description:`Display a divider line between accordion items.`,table:{defaultValue:{summary:`false`}}}},component:u,title:`Components/Accordion`},g={args:{id:`default-story`,togglePosition:`right`}},_={args:{id:`test-story`,togglePosition:`right`},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,m.jsx)(u,{...e,"data-testid":`accordion`})},v=[`Default`,`Test`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    id: "default-story",
    togglePosition: "right"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    id: "test-story",
    togglePosition: "right"
  },
  parameters: {
    controls: {
      exclude: ACCORDION_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (props: Args): JSX.Element => <Accordion {...props} data-testid="accordion" />
}`,..._.parameters?.docs?.source}}}}))();export{g as Default,_ as Test,v as __namedExportsOrder,h as default};