import{i as e}from"./preload-helper-DbRxMUml.js";import{cr as t}from"./iframe-DI6qETgL.js";import{a as n,s as r}from"./utils-B1uyFjm5.js";import{n as i,t as a}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-DJ2R9ntu.js";import{s as o,t as s}from"./constants-9L2SZdpC.js";import{n as c,t as l}from"./ComplexFilter-Dz8TEAPH.js";import{s as u,t as d}from"./constants-CFg-KII1.js";var f,p,m=e((()=>{n(),f=[`label`,`multiple`,`onChange`,`search`,`keepSearchOnSelect`],p=[r,e=>{console.log(e)}]})),h,g,_=e((()=>{i(),c(),h=t(),g=e=>{let{DropdownMenuProps:t={},options:n=a,...r}=e;return(0,h.jsx)(l,{label:`Click Target`,options:n,DropdownMenuProps:{groupBy:e=>e.section,...t},onOpen:e=>console.log(`onOpen complex filter`,e),onClose:(e,t)=>console.log(`onClose complex filter`,t),buttons:!1,...r})}})),v,y,b=e((()=>{i(),n(),c(),v=t(),y=e=>(0,v.jsx)(l,{label:`Click Target`,onChange:r,options:a,...e})})),x,S,C,w,T;e((()=>{m(),_(),b(),o(),u(),x=t(),S={argTypes:{DropdownMenuProps:{control:{type:`object`},description:`Props to pass to the underlying DropdownMenu component`},InputDropdownProps:{control:{type:`object`},description:`Props to pass to the underlying InputDropdown component`},isTriggerChangeOnOptionClick:{control:{type:`boolean`}},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},onChange:{control:{labels:[`Noop`,`console.log(value)`],type:`select`},mapping:p,options:Object.keys(p)},options:{control:{labels:[`One Column`,`Two Columns`,`Three Columns`],type:`select`},mapping:s,options:Object.keys(s)},search:{control:{type:`boolean`}},buttonPosition:{control:{labels:[`left`,`right`],type:`select`},mapping:d,options:Object.keys(d)},buttons:{control:{type:`boolean`}}},component:g,title:`Components/Dropdowns/ComplexFilter`},C={args:{DropdownMenuProps:{PopperPlacement:`bottom-start`,title:`Complex Filter Title`,width:250},InputDropdownProps:{sdsStyle:`square`,width:250},isTriggerChangeOnOptionClick:!1,label:`Click Target`,multiple:!0,onChange:p[1],search:!0,buttonPosition:`left`,buttons:!1}},w={parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,x.jsx)(y,{...e,"data-testid":`complex-filter`})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    DropdownMenuProps: {
      PopperPlacement: "bottom-start",
      title: "Complex Filter Title",
      width: 250
    },
    InputDropdownProps: {
      sdsStyle: "square",
      width: 250
    },
    isTriggerChangeOnOptionClick: false,
    label: "Click Target",
    multiple: true,
    onChange: COMPLEX_FILTER_ON_CHANGE_OPTIONS[1],
    search: true,
    buttonPosition: "left",
    buttons: false
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: COMPLEX_FILTER_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} data-testid="complex-filter" />
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Test`]}))();export{C as Default,w as Test,T as __namedExportsOrder,S as default};