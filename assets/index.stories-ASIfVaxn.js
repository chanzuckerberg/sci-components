import{i as e}from"./preload-helper-DbRxMUml.js";import{cr as t}from"./iframe-DI6qETgL.js";import{i as n,n as r,r as i,t as a}from"./Accordion-CWyDbLrX.js";import{n as o,o as s}from"./loremIpsum-DKz7K2k_.js";var c,l,u=e((()=>{r(),s(),c=t(),l=e=>{let{id:t,subtitle:r,useDivider:s,togglePosition:l}=e;return(0,c.jsxs)(a,{id:t,useDivider:s,togglePosition:l,...e,children:[(0,c.jsx)(i,{subtitle:r,children:`Accordion Header`}),(0,c.jsx)(n,{children:o})]})}})),d,f=e((()=>{d=[`id`,`subtitle`,`useDivider`,`togglePosition`]})),p,m,h,g,_;e((()=>{u(),f(),p=t(),m={argTypes:{defaultExpanded:{control:{type:`boolean`}},id:{control:{type:`text`},required:!0},subtitle:{control:{type:`text`}},togglePosition:{control:{type:`select`},options:[`right`,`left`]},useDivider:{control:{type:`boolean`}}},component:l,title:`Components/Accordion`},h={args:{id:`default-story`,togglePosition:`right`}},g={args:{id:`test-story`,togglePosition:`right`},parameters:{controls:{exclude:d},snapshot:{skip:!0}},render:e=>(0,p.jsx)(l,{...e,"data-testid":`accordion`})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: "default-story",
    togglePosition: "right"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Test`]}))();export{h as Default,g as Test,_ as __namedExportsOrder,m as default};