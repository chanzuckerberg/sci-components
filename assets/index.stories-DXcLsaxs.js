import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{bt as n,t as r}from"./material-DlyzFPof.js";import{t as i}from"./jsx-runtime-cM__dR4X.js";import{a,n as o}from"./utils-CbT4iKc5.js";import{n as s,t as c}from"./InputText-DxfsNTo_.js";var l,u,d=t((()=>{s(),l=e(i()),u=e=>{let{id:t,intent:n,disabled:r,hideLabel:i,placeholder:a,label:o,sdsType:s,...u}=e;return(0,l.jsx)(c,{id:t,sdsType:s,label:o,placeholder:a,intent:n,hideLabel:i,disabled:r,name:`input-text-name`,autoComplete:`off`,sx:{width:`200px`},...u})}})),f,p=t((()=>{f=[`disabled`,`hideLabel`,`id`,`intent`,`label`,`placeholder`,`sdsType`]})),m,h,g=t((()=>{r(),s(),m=e(i()),h=e=>(0,m.jsx)(n,{children:(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,m.jsx)(c,{...e,id:`test-textField`,sdsType:`textField`,label:`Label`,hideLabel:!1,placeholder:`Value`,"data-testid":`inputTextBase`}),(0,m.jsx)(c,{sdsType:`textField`,hideLabel:!1,"data-testid":`inputTextFail`}),(0,m.jsx)(c,{id:`test-hide-label`,sdsType:`textField`,label:`Hidden Label`,hideLabel:!0,"data-testid":`inputTextHideLabel`}),(0,m.jsx)(c,{id:`test-textArea`,sdsType:`textArea`,label:`Label`,hideLabel:!1,placeholder:`Value`,"data-testid":`inputTextArea`})]})})})),_,v,y,b,x;t((()=>{d(),p(),g(),a(),_=e(i()),v={argTypes:{disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},hideLabel:{control:{type:`boolean`},description:`If true, the label is hidden.`,table:{defaultValue:{summary:`false`}}},id:{control:{type:`text`},description:"The id of the `input` element. Use this prop to make `label` and `helperText` accessible for screen readers.",required:!0},intent:{control:{type:o},description:`Alters the border color and visual intent of the input.`,options:[`default`,`negative`,`notice`,`positive`],table:{defaultValue:{summary:`default`}}},label:{control:{type:`text`},description:`The label content.`},placeholder:{control:{type:`text`},description:"The short hint displayed in the `input` before the user enters a value."},sdsType:{control:{type:o},description:`Defines the type of component to render, with options for a text input or text area.`,options:[`textField`,`textArea`],table:{defaultValue:{summary:`textField`}}},classes:{control:{type:`object`},description:`Class names for the internal elements: root, label, input, endAdornment, startAdornment, clearButton, and searchButton, alongside MUI's TextField classes.`}},component:u,title:`Components/Inputs/InputText`},y={args:{disabled:!1,hideLabel:!1,id:`Test`,label:`Label`,placeholder:`Value`,sdsType:`textField`,classes:{root:``,label:``,input:``}}},b={parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,_.jsx)(h,{...e})},x=[`Default`,`Test`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    hideLabel: false,
    id: "Test",
    label: "Label",
    placeholder: "Value",
    sdsType: "textField",
    classes: {
      root: "",
      label: "",
      input: ""
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: INPUT_TEXT_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...b.parameters?.docs?.source}}}}))();export{y as Default,b as Test,x as __namedExportsOrder,v as default};