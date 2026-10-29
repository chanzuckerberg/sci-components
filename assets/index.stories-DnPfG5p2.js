import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./jsx-runtime-cM__dR4X.js";import{a as r,s as i}from"./utils-CbT4iKc5.js";import{n as a,t as o}from"./ComplexFilter-CnnKcKFd.js";import{n as s,t as c}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-886rzoRW.js";import{s as l,t as u}from"./constants-BGG1HCOT.js";import{s as d,t as f}from"./constants-C29CYTVs.js";var p,m,h=t((()=>{r(),p=[`label`,`multiple`,`onChange`,`search`,`keepSearchOnSelect`],m={noop:i,log:e=>{console.log(e)}}})),g,_,v=t((()=>{s(),a(),g=e(n()),_=e=>{let{DropdownMenuProps:t={},options:n=c,...r}=e;return(0,g.jsx)(o,{label:`Click Target`,options:n,DropdownMenuProps:{groupBy:e=>e.section,...t},onOpen:e=>console.log(`onOpen complex filter`,e),onClose:(e,t)=>console.log(`onClose complex filter`,t),buttons:!1,...r})}})),y,b,x=t((()=>{s(),r(),a(),y=e(n()),b=e=>(0,y.jsx)(o,{label:`Click Target`,onChange:i,options:c,...e})})),S,C,w,T,E;t((()=>{h(),v(),x(),l(),d(),S=e(n()),C={argTypes:{DropdownMenuProps:{control:{type:`object`},description:`Props to pass to the underlying DropdownMenu component`},InputDropdownProps:{control:{type:`object`},description:`Passed straight to the InputDropdown that opens the filter. Note that supplying it replaces the default, so a filter that should stay minimal needs sdsStyle passed again alongside whatever else it sets.`,table:{defaultValue:{summary:`{ sdsStyle: "minimal" }`}}},isTriggerChangeOnOptionClick:{control:{type:`boolean`},description:`Determines whether changes are triggered in real-time upon clicking an option.`,table:{defaultValue:{summary:`false`}}},label:{control:{type:`text`},description:`Sets the label of the filter, shown both when closed and open.`},multiple:{control:{type:`boolean`},description:`Defines whether multiple selections can be made from the filter simultaneously, or only one.`,table:{defaultValue:{summary:`false`}}},onChange:{control:{labels:{noop:`Noop`,log:`console.log(value)`},type:`select`},description:`Function to set what happens when a new value is set via the filter.`,mapping:m,options:Object.keys(m)},options:{control:{labels:{oneColumn:`One Column`,twoColumns:`Two Columns`,threeColumns:`Three Columns`},type:`select`},description:`The items to filter by. Passing the multi-column shape lays the menu out in named columns instead of one list.`,mapping:u,options:Object.keys(u)},search:{control:{type:`boolean`},description:`Provides a search bar at the top of the filter from which users can narrow the list of menu items.`,table:{defaultValue:{summary:`false`}}},buttonPosition:{control:{type:`select`},description:`Which side of the menu footer the Apply and Cancel buttons sit on. It only applies alongside buttons.`,options:f,table:{defaultValue:{summary:`right`}}},buttons:{control:{type:`boolean`},description:`Puts Apply and Cancel buttons at the foot of the menu, so selections take effect only once Apply is pressed.`,table:{defaultValue:{summary:`true`}}}},component:_,title:`Components/Dropdowns/ComplexFilter`},w={args:{DropdownMenuProps:{PopperPlacement:`bottom-start`,title:`Complex Filter Title`,width:250},InputDropdownProps:{sdsStyle:`square`,width:250},isTriggerChangeOnOptionClick:!1,label:`Click Target`,multiple:!0,onChange:m.log,search:!0,buttonPosition:`left`,buttons:!1}},T={parameters:{controls:{exclude:p},snapshot:{skip:!0}},render:e=>(0,S.jsx)(b,{...e,"data-testid":`complex-filter`})},E=[`Default`,`Test`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
    onChange: COMPLEX_FILTER_ON_CHANGE_OPTIONS.log,
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
}`,...T.parameters?.docs?.source}}}}))();export{w as Default,T as Test,E as __namedExportsOrder,C as default};