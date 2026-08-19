import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-CLRePdsX.js";import{n as i,t as a}from"./Callout-B8_fsr0X.js";import{a as o,n as s}from"./utils-BxIa431Z.js";import{n as c,t as l}from"./DropdownMenu-BjL771Zr.js";import{n as u,t as d}from"./InputDropdown-UDX7BFIL.js";import{a as f,i as p,r as m}from"./constants-DNIcSaMQ.js";var h,g,_,v=e((()=>{h=t(n()),i(),c(),u(),g=t(r()),_=e=>{let{disabled:t,label:n,sdsStyle:r,multiple:i,value:o,sdsType:s,...c}=e,[u,f]=(0,h.useState)(null),[p,m]=(0,h.useState)(!1),[_,v]=(0,h.useState)(),[y,b]=(0,h.useState)(),[x,S]=(0,h.useState)(),[C,w]=(0,h.useState)(!1),[T,E]=(0,h.useState)(`Label`),[D,O]=(0,h.useState)(i?[]:null),k=o!==void 0;(0,h.useEffect)(()=>{k&&O(o)},[o,k]),(0,h.useEffect)(()=>{k||O(i?[]:null)},[i,k]),(0,h.useEffect)(()=>{w(!!(s===`value`&&i))},[i,s]),(0,h.useEffect)(()=>{E(s===`value`?`Value`:n)},[n,s]);let A=e=>{p?(m(!1),u&&u.focus(),f(null)):(f(e.currentTarget),m(!0))},j=(e,t)=>{i?(O(t),v(t?.length.toString())):(m(!1),O(t),v(void 0),t&&!Array.isArray(t)?(b(t.name),t?.details?S(t.details):S(void 0)):(b(void 0),S(void 0)))},M=()=>{},N=()=>{p&&m(!1)},P=[{details:`Details`,name:`Menu Item 1`},{details:`A very long Details for the second Menu Item`,name:`Menu Item 2`},{name:`Menu Item 3`}];return(0,g.jsxs)(`div`,{children:[C?(0,g.jsx)(a,{autoDismiss:!1,intent:`negative`,title:`Invalid props!`,body:`When using the InputDropdown component, please note that the combination of setting the sdsType prop to "value" and the multiple prop to "true" is not allowed.`}):(0,g.jsx)(d,{disabled:t,label:T,onClick:A,state:p?`open`:`default`,sdsStyle:r,sdsType:s,multiple:i,details:x,value:y,counter:_,"data-testid":`InputDropdown`,...c}),(0,g.jsx)(l,{open:p,anchorEl:u,onClose:M,onChange:j,search:!1,multiple:i,disableCloseOnSelect:i,options:P,value:D,onClickAway:N,width:300})]})}})),y,b=e((()=>{y=[`fullWidth`,`counter`,`disabled`,`intent`,`label`,`multiple`,`sdsStyle`,`sdsType`,`shouldPutAColonAfterLabel`,`shouldTruncateMinimalDetails`,`width`,`style`]})),x,S,C,w,T;e((()=>{v(),b(),o(),f(),x=t(r()),S={argTypes:{counter:{control:{type:`number`}},classes:{control:{type:`object`}},disabled:{control:{type:`boolean`}},intent:{control:{type:s},options:[`default`,`negative`,`notice`,`positive`]},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},sdsStyle:{control:{type:`select`},options:[`square`,`rounded`,`minimal`]},sdsType:{control:{type:s},options:[`label`,`value`]},shouldPutAColonAfterLabel:{control:{type:`boolean`}},shouldTruncateMinimalDetails:{control:{type:`boolean`}},startIcon:{control:{labels:m,type:`select`},mapping:p,options:Object.keys(p)},style:{control:{type:`object`}},width:{control:{type:`text`}}},component:_,title:`Components/Inputs/InputDropdown`},C={args:{disabled:!1,label:`Label`,sdsStyle:`square`,classes:{root:``,contentWrapper:``,labelDetailsWrapper:``,label:``,details:``,counter:``,iconWrapper:``,chevronIcon:``,minimalDetails:``}}},w={args:{disabled:!1,label:`Label`,multiple:!1,sdsStyle:`square`},parameters:{controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,x.jsx)(_,{...e})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Test`]}))();export{C as Default,w as Test,T as __namedExportsOrder,S as default};