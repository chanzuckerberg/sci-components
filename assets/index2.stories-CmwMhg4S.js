import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-8L1H2VAU.js";import{n as i,t as a}from"./InputCheckbox-LpPgRAl2.js";var o,s,c,l=e((()=>{o=t(n()),i(),s=t(r()),c=e=>{let{disabled:t}=e,[n,r]=(0,o.useState)(!0);return(0,s.jsx)(a,{disabled:t,onChange:()=>r(e=>!e),stage:n?`unchecked`:`checked`,...e})}})),u,d,f,p=e((()=>{u=[`caption`,`label`,`stage`,`disabled`,`intent`,`id`],d=`test-story`,f={display:`grid`,gridColumnGap:`10px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(2, 100px)`,gridTemplateRows:`1fr`}})),m,h,g,_=e((()=>{p(),l(),i(),m=t(r()),h=e=>{let{caption:t,label:n,disabled:r}=e;return(0,m.jsx)(`div`,{children:(0,m.jsx)(a,{caption:t,label:n,disabled:r,value:`Demo`,...e})})},g=()=>(0,m.jsxs)(`div`,{style:f,children:[(0,m.jsx)(`div`,{children:(0,m.jsx)(h,{caption:`Caption`,label:`Label A`,disabled:!1,"data-testid":`labelCheckbox`})}),(0,m.jsx)(`div`,{children:(0,m.jsx)(c,{"data-testid":`checkbox`,label:`Label`})})]})})),v,y,b,x,S;e((()=>{l(),p(),_(),v=t(r()),y={argTypes:{caption:{control:{type:`text`},description:`The caption of the InputCheckbox appears beneath the label in a lighter text color.`},disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},intent:{control:{type:`radio`},description:`Colors the border of the empty box. The checked box always uses the accent color.`,options:[`default`,`negative`,`notice`,`positive`],table:{defaultValue:{summary:`default`}}},label:{control:{type:`text`},description:`The label of the InputCheckbox. When omitted, the box renders on its own with no label element.`},stage:{control:{type:`radio`},description:`Sets the state of the checkbox. It overrides checked, so a checkbox with a stage only changes when you recompute the stage from an onChange handler. Omit it to let the checkbox manage its own state.`,options:[`checked`,`unchecked`,`indeterminate`]},classes:{control:{type:`object`},description:`Class names for the internal elements: root, labelCaptionContainer, label, caption, checkbox, checkboxCheckedIcon, checkboxDefaultIcon, and checkboxIndeterminateIcon.`}},component:c,title:`Components/Inputs/InputCheckbox`},b={args:{caption:`Caption`,intent:`default`,label:`Label`,classes:{root:``,labelCaptionContainer:``,label:``,caption:``,checkbox:``,checkboxCheckedIcon:``,checkboxDefaultIcon:``,checkboxIndeterminateIcon:``}}},x={args:{id:d},parameters:{controls:{exclude:u},snapshot:{skip:!0}},render:e=>(0,v.jsx)(g,{...e,"data-testid":`input-checkbox`})},S=[`Default`,`Test`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    caption: "Caption",
    intent: "default",
    label: "Label",
    classes: {
      root: "",
      labelCaptionContainer: "",
      label: "",
      caption: "",
      checkbox: "",
      checkboxCheckedIcon: "",
      checkboxDefaultIcon: "",
      checkboxIndeterminateIcon: ""
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    id: INPUT_CHECKBOX_TEST_ID
  },
  parameters: {
    controls: {
      exclude: INPUT_CHECKBOX_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} data-testid="input-checkbox" />
}`,...x.parameters?.docs?.source}}}}))();export{b as Default,x as Test,S as __namedExportsOrder,y as default};