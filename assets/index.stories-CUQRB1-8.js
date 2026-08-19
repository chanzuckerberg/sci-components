import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-CLRePdsX.js";import{a as r,s as i}from"./utils-BxIa431Z.js";import{n as a,t as o}from"./ComplexFilter-DVGGukqT.js";import{n as s,t as c}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-LXEOAXt6.js";import{s as l,t as u}from"./constants-CXXVOOEG.js";import{s as d,t as f}from"./constants-B38A85H3.js";var p,m,h=e((()=>{r(),p=[`label`,`multiple`,`onChange`,`search`,`keepSearchOnSelect`],m=[i,e=>{console.log(e)}]})),g,_,v=e((()=>{s(),a(),g=t(n()),_=e=>{let{DropdownMenuProps:t={},options:n=c,...r}=e;return(0,g.jsx)(o,{label:`Click Target`,options:n,DropdownMenuProps:{groupBy:e=>e.section,...t},onOpen:e=>console.log(`onOpen complex filter`,e),onClose:(e,t)=>console.log(`onClose complex filter`,t),buttons:!1,...r})}})),y,b,x=e((()=>{s(),r(),a(),y=t(n()),b=e=>(0,y.jsx)(o,{label:`Click Target`,onChange:i,options:c,...e})})),S,C,w,T,E;e((()=>{h(),v(),x(),l(),d(),S=t(n()),C={argTypes:{DropdownMenuProps:{control:{type:`object`},description:`Props to pass to the underlying DropdownMenu component`},InputDropdownProps:{control:{type:`object`},description:`Props to pass to the underlying InputDropdown component`},isTriggerChangeOnOptionClick:{control:{type:`boolean`}},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},onChange:{control:{labels:[`Noop`,`console.log(value)`],type:`select`},mapping:m,options:Object.keys(m)},options:{control:{labels:[`One Column`,`Two Columns`,`Three Columns`],type:`select`},mapping:u,options:Object.keys(u)},search:{control:{type:`boolean`}},buttonPosition:{control:{labels:[`left`,`right`],type:`select`},mapping:f,options:Object.keys(f)},buttons:{control:{type:`boolean`}}},component:_,title:`Components/Dropdowns/ComplexFilter`},w={args:{DropdownMenuProps:{PopperPlacement:`bottom-start`,title:`Complex Filter Title`,width:250},InputDropdownProps:{sdsStyle:`square`,width:250},isTriggerChangeOnOptionClick:!1,label:`Click Target`,multiple:!0,onChange:m[1],search:!0,buttonPosition:`left`,buttons:!1}},T={parameters:{controls:{exclude:p},snapshot:{skip:!0}},render:e=>(0,S.jsx)(b,{...e,"data-testid":`complex-filter`})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: COMPLEX_FILTER_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} data-testid="complex-filter" />
}`,...T.parameters?.docs?.source}}},E=[`Default`,`Test`]}))();export{w as Default,T as Test,E as __namedExportsOrder,C as default};