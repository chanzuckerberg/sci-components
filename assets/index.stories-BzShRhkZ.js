import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n,Hn as r,si as i}from"./iframe-s0DqqZ6S.js";import{a,n as o}from"./utils-BxIa431Z.js";import{n as s,t as c}from"./InputText-C0Q0gVbw.js";var l,u,d=e((()=>{s(),l=t(n()),u=e=>{let{id:t,intent:n,disabled:r,hideLabel:i,placeholder:a,label:o,sdsType:s,...u}=e;return(0,l.jsx)(c,{id:t,sdsType:s,label:o,placeholder:a,intent:n,hideLabel:i,disabled:r,name:`input-text-name`,autoComplete:`off`,sx:{width:`200px`},...u})}})),f,p=e((()=>{f=[`disabled`,`hideLabel`,`id`,`intent`,`label`,`placeholder`,`sdsType`]})),m,h,g=e((()=>{r(),s(),m=t(n()),h=e=>(0,m.jsx)(i,{children:(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,m.jsx)(c,{...e,id:`test-textField`,sdsType:`textField`,label:`Label`,hideLabel:!1,placeholder:`Value`,"data-testid":`inputTextBase`}),(0,m.jsx)(c,{sdsType:`textField`,hideLabel:!1,"data-testid":`inputTextFail`}),(0,m.jsx)(c,{id:`test-hide-label`,sdsType:`textField`,label:`Hidden Label`,hideLabel:!0,"data-testid":`inputTextHideLabel`}),(0,m.jsx)(c,{id:`test-textArea`,sdsType:`textArea`,label:`Label`,hideLabel:!1,placeholder:`Value`,"data-testid":`inputTextArea`})]})})})),_,v,y,b,x;e((()=>{d(),p(),g(),a(),_=t(n()),v={argTypes:{disabled:{control:{type:`boolean`}},hideLabel:{control:{type:`boolean`}},id:{control:{type:`text`},required:!0},intent:{control:{type:o},options:[`default`,`negative`,`notice`,`positive`]},label:{control:{type:`text`}},placeholder:{control:{type:`text`}},sdsType:{control:{type:o},options:[`textField`,`textArea`]},classes:{control:{type:`object`}}},component:u,title:`Components/Inputs/InputText`},y={args:{disabled:!1,hideLabel:!1,id:`Test`,label:`Label`,placeholder:`Value`,sdsType:`textField`,classes:{root:``,label:``,input:``}}},b={parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,_.jsx)(h,{...e})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Test`]}))();export{y as Default,b as Test,x as __namedExportsOrder,v as default};