import{i as e}from"./preload-helper-xPQekRTU.js";import{Fi as t}from"./iframe-DocVhSSI.js";import{a as n,n as r}from"./utils-BxIa431Z.js";import{n as i,t as a}from"./InputSearch-C1NfFN_U.js";var o,s=e((()=>{o=[`disabled`,`id`,`intent`,`label`,`placeholder`,`sdsStyle`]})),c,l,u=e((()=>{i(),c=t(),l=e=>{let{id:t,placeholder:n,label:r,disabled:i,sdsStyle:o,intent:s,...l}=e;return(0,c.jsx)(a,{id:t,placeholder:n,label:r,disabled:i,sdsStyle:o,intent:s,handleSubmit:e=>{console.log(e)},name:`input-search-name`,sx:{width:`200px`},...l})}})),d,f,p,m=e((()=>{i(),d=t(),{action:f}=__STORYBOOK_MODULE_ACTIONS__,p=e=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,d.jsx)(a,{id:`test-round`,sdsStyle:`rounded`,label:`Round Search`,placeholder:`Search`,"data-testid":`inputSearchRound`,handleSubmit:f(`onSubmit`),name:`round-search`,sx:{width:`200px`},...e}),(0,d.jsx)(a,{id:`test-square`,sdsStyle:`square`,label:`Square Search`,placeholder:`Search`,"data-testid":`inputSearchSquare`,handleSubmit:f(`onSubmit`),name:`square-search`,sx:{width:`200px`},...e}),(0,d.jsx)(a,{sdsStyle:`square`,placeholder:`Search`,"data-testid":`inputSearchFail`,handleSubmit:f(`onSubmit`),name:`with-error`})]})})),h,g,_,v,y;e((()=>{s(),u(),m(),n(),h=t(),g={argTypes:{disabled:{control:{type:`boolean`}},id:{control:{type:`text`},required:!0},intent:{control:{type:r},options:[`default`,`negative`,`notice`,`positive`]},label:{control:{type:`text`},required:!0},placeholder:{control:{type:`text`}},sdsStyle:{control:{type:r},options:[`rounded`,`square`]},classes:{control:{type:`object`}}},component:l,title:`Components/Inputs/InputSearch`},_={args:{disabled:!1,id:`Test`,label:`Search`,placeholder:`Search`,classes:{root:``,label:``,input:``,endAdornment:``,startAdornment:``,clearButton:``,searchButton:``}}},v={parameters:{controls:{exclude:o},snapshot:{skip:!0}},render:e=>(0,h.jsx)(p,{...e})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    id: "Test",
    label: "Search",
    placeholder: "Search",
    classes: {
      root: "",
      label: "",
      input: "",
      endAdornment: "",
      startAdornment: "",
      clearButton: "",
      searchButton: ""
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: INPUT_SEARCH_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...v.parameters?.docs?.source}}},y=[`Default`,`Test`]}))();export{_ as Default,v as Test,y as __namedExportsOrder,g as default};