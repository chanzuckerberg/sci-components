import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./Callout-BUXBK_ru.js";import{a as o,n as s}from"./utils-CbT4iKc5.js";import{n as c,t as l}from"./DropdownMenu-DMTFNigj.js";import{n as u,t as d}from"./InputDropdown-Bo6XJAnn.js";import{a as f,i as p,r as m}from"./constants-D6VGLSE9.js";var h,g,_,v=t((()=>{h=e(n()),i(),c(),u(),g=e(r()),_=e=>{let{disabled:t,label:n,sdsStyle:r,multiple:i,value:o,sdsType:s,...c}=e,[u,f]=(0,h.useState)(null),[p,m]=(0,h.useState)(!1),[_,v]=(0,h.useState)(),[y,b]=(0,h.useState)(),[x,S]=(0,h.useState)(),[C,w]=(0,h.useState)(!1),[T,E]=(0,h.useState)(`Label`),[D,O]=(0,h.useState)(i?[]:null),k=o!==void 0;(0,h.useEffect)(()=>{k&&O(o)},[o,k]),(0,h.useEffect)(()=>{k||O(i?[]:null)},[i,k]),(0,h.useEffect)(()=>{w(!!(s===`value`&&i))},[i,s]),(0,h.useEffect)(()=>{E(s===`value`?`Value`:n)},[n,s]);let A=e=>{p?(m(!1),u&&u.focus(),f(null)):(f(e.currentTarget),m(!0))},j=(e,t)=>{i?(O(t),v(t?.length.toString())):(m(!1),O(t),v(void 0),t&&!Array.isArray(t)?(b(t.name),t?.details?S(t.details):S(void 0)):(b(void 0),S(void 0)))},M=()=>{},N=()=>{p&&m(!1)},P=[{details:`Details`,name:`Menu Item 1`},{details:`A very long Details for the second Menu Item`,name:`Menu Item 2`},{name:`Menu Item 3`}];return(0,g.jsxs)(`div`,{children:[C?(0,g.jsx)(a,{autoDismiss:!1,intent:`negative`,title:`Invalid props!`,body:`When using the InputDropdown component, please note that the combination of setting the sdsType prop to "value" and the multiple prop to "true" is not allowed.`}):(0,g.jsx)(d,{disabled:t,label:T,onClick:A,state:p?`open`:`default`,sdsStyle:r,sdsType:s,multiple:i,details:x,value:y,counter:_,"data-testid":`InputDropdown`,...c}),(0,g.jsx)(l,{open:p,anchorEl:u,onClose:M,onChange:j,search:!1,multiple:i,disableCloseOnSelect:i,options:P,value:D,onClickAway:N,width:300})]})}})),y,b=t((()=>{y=[`fullWidth`,`counter`,`disabled`,`intent`,`label`,`multiple`,`sdsStyle`,`sdsType`,`shouldPutAColonAfterLabel`,`shouldTruncateMinimalDetails`,`width`,`style`]})),x,S,C,w,T;t((()=>{v(),b(),o(),f(),x=e(r()),S={argTypes:{counter:{control:{type:`number`},description:`If multiple set to true, this number shows the number of selected menu items.`},classes:{control:{type:`object`},description:`A class name for each part of the input, for styling one of them without reaching through the DOM: root, label, labelDetailsWrapper, contentWrapper, details, counter, iconWrapper, chevronIcon and minimalDetails.`},disabled:{control:{type:`boolean`},description:`If true, the component is disabled.`,table:{defaultValue:{summary:`false`}}},intent:{control:{type:s},description:`Alters the border color and visual intent of the input.`,options:[`default`,`negative`,`notice`,`positive`],table:{defaultValue:{summary:`default`}}},label:{control:{type:`text`},description:`The label of the Input Button.`},multiple:{control:{type:`boolean`},description:`Allows users to select multiple menu items. multiple=true cannot be used with the minimal variant.`,table:{defaultValue:{summary:`false`}}},sdsStyle:{control:{type:`select`},description:`The visual appearance of the component.`,options:[`square`,`rounded`,`minimal`],table:{defaultValue:{summary:`square`}}},sdsType:{control:{type:s},description:`The label variant includes the label within the input field and showcases the selected menu item as additional details or sets the counter when in multi-select mode. The value variant replaces the label with the selected value directly within the input field. The detailed information is then displayed in a separate section dedicated to displaying additional details. However, it's important to note that the value variant cannot be used in conjunction with multi-select mode.`,options:[`label`,`value`],table:{defaultValue:{summary:`label`}}},shouldPutAColonAfterLabel:{control:{type:`boolean`},description:`If true, a colon (:) will be added after the label or value.`,table:{defaultValue:{summary:`true`}}},shouldTruncateMinimalDetails:{control:{type:`boolean`},description:`If true, the details section of the minimal variant displays a truncated one-liner with an ellipsis (...), if false the details section expands to multiple lines for a comprehensive display.`,table:{defaultValue:{summary:`false`}}},startIcon:{control:{labels:m,type:`select`},description:`An element placed before the label, passed straight through to the underlying MUI Button.`,mapping:p,options:Object.keys(p)},style:{control:{type:`object`},description:`Inline styles for the input's root element.`},width:{control:{type:`text`},description:`How wide the input is. A bare number is read as pixels, so "240" means 240px, and any other value is used as the CSS width, such as "100%" or "20rem". Values below 90px are ignored, since the input keeps that as its minimum. Left unset, the input is as wide as its content, or as wide as its container if MUI's fullWidth is set.`}},component:_,title:`Components/Inputs/InputDropdown`},C={args:{disabled:!1,label:`Label`,sdsStyle:`square`,classes:{root:``,contentWrapper:``,labelDetailsWrapper:``,label:``,details:``,counter:``,iconWrapper:``,chevronIcon:``,minimalDetails:``}}},w={args:{disabled:!1,label:`Label`,multiple:!1,sdsStyle:`square`},parameters:{controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,x.jsx)(_,{...e})},T=[`Default`,`Test`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    label: "Label",
    sdsStyle: "square",
    classes: {
      root: "",
      contentWrapper: "",
      labelDetailsWrapper: "",
      label: "",
      details: "",
      counter: "",
      iconWrapper: "",
      chevronIcon: "",
      minimalDetails: ""
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    label: "Label",
    multiple: false,
    sdsStyle: "square"
  },
  parameters: {
    controls: {
      exclude: INPUT_DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <InputDropdown {...args} />
}`,...w.parameters?.docs?.source}}}}))();export{C as Default,w as Test,T as __namedExportsOrder,S as default};