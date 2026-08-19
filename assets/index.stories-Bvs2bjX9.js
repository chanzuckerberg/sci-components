import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-s0DqqZ6S.js";import{a as r,n as i,r as a,t as o}from"./Accordion-B8IysJfY.js";import{n as s,o as c}from"./loremIpsum-BqYjZDri.js";var l,u,d=e((()=>{i(),c(),l=t(n()),u=e=>{let{id:t,subtitle:n,useDivider:i,togglePosition:c}=e;return(0,l.jsxs)(o,{id:t,useDivider:i,togglePosition:c,...e,children:[(0,l.jsx)(a,{subtitle:n,children:`Accordion Header`}),(0,l.jsx)(r,{children:s})]})}})),f,p=e((()=>{f=[`id`,`subtitle`,`useDivider`,`togglePosition`]})),m,h,g,_,v;e((()=>{d(),p(),m=t(n()),h={argTypes:{defaultExpanded:{control:{type:`boolean`}},id:{control:{type:`text`},required:!0},subtitle:{control:{type:`text`}},togglePosition:{control:{type:`select`},options:[`right`,`left`]},useDivider:{control:{type:`boolean`}}},component:u,title:`Components/Accordion`},g={args:{id:`default-story`,togglePosition:`right`}},_={args:{id:`test-story`,togglePosition:`right`},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,m.jsx)(u,{...e,"data-testid":`accordion`})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Test`]}))();export{g as Default,_ as Test,v as __namedExportsOrder,h as default};