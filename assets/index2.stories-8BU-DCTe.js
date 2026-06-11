import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Kr as n,cr as r}from"./iframe-DI6qETgL.js";import{a as i,n as a}from"./utils-B1uyFjm5.js";import{n as o,t as s}from"./Callout-BE_VME0K.js";import{a as c,i as l,r as u}from"./constants-B2kVEKee2.js";import{n as d,t as f}from"./DropdownMenu-CHhpSLRX.js";import{n as p,t as m}from"./InputDropdown-DMnyt-wx.js";var h,g,_,v=t((()=>{h=e(n()),o(),d(),p(),g=r(),_=e=>{let{disabled:t,label:n,sdsStyle:r,multiple:i,value:a,sdsType:o,...c}=e,[l,u]=(0,h.useState)(null),[d,p]=(0,h.useState)(!1),[_,v]=(0,h.useState)(),[y,b]=(0,h.useState)(),[x,S]=(0,h.useState)(),[C,w]=(0,h.useState)(!1),[T,E]=(0,h.useState)(`Label`),[D,O]=(0,h.useState)(i?[]:null),k=a!==void 0;(0,h.useEffect)(()=>{k&&O(a)},[a,k]),(0,h.useEffect)(()=>{k||O(i?[]:null)},[i,k]),(0,h.useEffect)(()=>{w(!!(o===`value`&&i))},[i,o]),(0,h.useEffect)(()=>{E(o===`value`?`Value`:n)},[n,o]);let A=e=>{d?(p(!1),l&&l.focus(),u(null)):(u(e.currentTarget),p(!0))},j=(e,t)=>{i?(O(t),v(t?.length.toString())):(p(!1),O(t),v(void 0),t&&!Array.isArray(t)?(b(t.name),t?.details?S(t.details):S(void 0)):(b(void 0),S(void 0)))},M=()=>{},N=()=>{d&&p(!1)},P=[{details:`Details`,name:`Menu Item 1`},{details:`A very long Details for the second Menu Item`,name:`Menu Item 2`},{name:`Menu Item 3`}];return(0,g.jsxs)(`div`,{children:[C?(0,g.jsx)(s,{autoDismiss:!1,intent:`negative`,title:`Invalid props!`,body:`When using the InputDropdown component, please note that the combination of setting the sdsType prop to "value" and the multiple prop to "true" is not allowed.`}):(0,g.jsx)(m,{disabled:t,label:T,onClick:A,state:d?`open`:`default`,sdsStyle:r,sdsType:o,multiple:i,details:x,value:y,counter:_,"data-testid":`InputDropdown`,...c}),(0,g.jsx)(f,{open:d,anchorEl:l,onClose:M,onChange:j,search:!1,multiple:i,disableCloseOnSelect:i,options:P,value:D,onClickAway:N,width:300})]})}})),y,b=t((()=>{y=[`fullWidth`,`counter`,`disabled`,`intent`,`label`,`multiple`,`sdsStyle`,`sdsType`,`shouldPutAColonAfterLabel`,`shouldTruncateMinimalDetails`,`width`,`style`]})),x,S,C,w,T;t((()=>{v(),b(),i(),c(),x=r(),S={argTypes:{counter:{control:{type:`number`}},classes:{control:{type:`object`}},disabled:{control:{type:`boolean`}},intent:{control:{type:a},options:[`default`,`negative`,`notice`,`positive`]},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},sdsStyle:{control:{type:`select`},options:[`square`,`rounded`,`minimal`]},sdsType:{control:{type:a},options:[`label`,`value`]},shouldPutAColonAfterLabel:{control:{type:`boolean`}},shouldTruncateMinimalDetails:{control:{type:`boolean`}},startIcon:{control:{labels:u,type:`select`},mapping:l,options:Object.keys(l)},style:{control:{type:`object`}},width:{control:{type:`text`}}},component:_,title:`Components/Inputs/InputDropdown`},C={args:{disabled:!1,label:`Label`,sdsStyle:`square`,classes:{root:``,contentWrapper:``,labelDetailsWrapper:``,label:``,details:``,counter:``,iconWrapper:``,chevronIcon:``,minimalDetails:``}}},w={args:{disabled:!1,label:`Label`,multiple:!1,sdsStyle:`square`},parameters:{controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,x.jsx)(_,{...e})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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