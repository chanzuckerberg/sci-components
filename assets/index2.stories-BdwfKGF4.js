import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r}from"./iframe-ZT52KRhI.js";import{n as i,t as a}from"./InputCheckbox-DKTTM8xr.js";var o,s,c,l=t((()=>{o=e(n()),i(),s=r(),c=e=>{let{disabled:t}=e,[n,r]=(0,o.useState)(!0);return(0,s.jsx)(a,{disabled:t,onChange:()=>r(e=>!e),stage:n?`unchecked`:`checked`,...e})}})),u,d,f,p=t((()=>{u=[`caption`,`label`,`stage`,`disabled`,`intent`,`id`],d=`test-story`,f={display:`grid`,gridColumnGap:`10px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(2, 100px)`,gridTemplateRows:`1fr`}})),m,h,g,_=t((()=>{p(),l(),i(),m=r(),h=e=>{let{caption:t,label:n,disabled:r}=e;return(0,m.jsx)(`div`,{children:(0,m.jsx)(a,{caption:t,label:n,disabled:r,value:`Demo`,...e})})},g=()=>(0,m.jsxs)(`div`,{style:f,children:[(0,m.jsx)(`div`,{children:(0,m.jsx)(h,{caption:`Caption`,label:`Label A`,disabled:!1,"data-testid":`labelCheckbox`})}),(0,m.jsx)(`div`,{children:(0,m.jsx)(c,{"data-testid":`checkbox`,label:`Label`})})]})})),v,y,b,x,S;t((()=>{l(),p(),_(),v=r(),y={argTypes:{caption:{control:{type:`text`}},disabled:{control:{type:`boolean`}},intent:{control:{type:`radio`},options:[`default`,`negative`,`notice`,`positive`]},label:{control:{type:`text`}},stage:{control:{type:`radio`},options:[`checked`,`unchecked`,`indeterminate`]},classes:{control:{type:`object`}}},component:c,title:`Components/Inputs/InputCheckbox`},b={args:{caption:`Caption`,intent:`default`,label:`Label`,classes:{root:``,labelCaptionContainer:``,label:``,caption:``,checkbox:``,checkboxCheckedIcon:``,checkboxDefaultIcon:``,checkboxIndeterminateIcon:``}}},x={args:{id:d},parameters:{controls:{exclude:u},snapshot:{skip:!0}},render:e=>(0,v.jsx)(g,{...e,"data-testid":`input-checkbox`})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Test`]}))();export{b as Default,x as Test,S as __namedExportsOrder,y as default};