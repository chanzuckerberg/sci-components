import{i as e}from"./preload-helper-usAeo7Bx.js";import{Gi as t,ct as n,kn as r}from"./iframe-ZT52KRhI.js";import{a as i,n as a}from"./utils-CHt6irz9.js";import{n as o,t as s}from"./InputText-Dn7Lk3tf.js";var c,l,u=e((()=>{o(),c=t(),l=e=>{let{id:t,intent:n,disabled:r,hideLabel:i,placeholder:a,label:o,sdsType:l,...u}=e;return(0,c.jsx)(s,{id:t,sdsType:l,label:o,placeholder:a,intent:n,hideLabel:i,disabled:r,name:`input-text-name`,autoComplete:`off`,sx:{width:`200px`},...u})}})),d,f=e((()=>{d=[`disabled`,`hideLabel`,`id`,`intent`,`label`,`placeholder`,`sdsType`]})),p,m,h=e((()=>{n(),o(),p=t(),m=e=>(0,p.jsx)(r,{children:(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,p.jsx)(s,{...e,id:`test-textField`,sdsType:`textField`,label:`Label`,hideLabel:!1,placeholder:`Value`,"data-testid":`inputTextBase`}),(0,p.jsx)(s,{sdsType:`textField`,hideLabel:!1,"data-testid":`inputTextFail`}),(0,p.jsx)(s,{id:`test-hide-label`,sdsType:`textField`,label:`Hidden Label`,hideLabel:!0,"data-testid":`inputTextHideLabel`}),(0,p.jsx)(s,{id:`test-textArea`,sdsType:`textArea`,label:`Label`,hideLabel:!1,placeholder:`Value`,"data-testid":`inputTextArea`})]})})})),g,_,v,y,b;e((()=>{u(),f(),h(),i(),g=t(),_={argTypes:{disabled:{control:{type:`boolean`}},hideLabel:{control:{type:`boolean`}},id:{control:{type:`text`},required:!0},intent:{control:{type:a},options:[`default`,`negative`,`notice`,`positive`]},label:{control:{type:`text`}},placeholder:{control:{type:`text`}},sdsType:{control:{type:a},options:[`textField`,`textArea`]},classes:{control:{type:`object`}}},component:l,title:`Components/Inputs/InputText`},v={args:{disabled:!1,hideLabel:!1,id:`Test`,label:`Label`,placeholder:`Value`,sdsType:`textField`,classes:{root:``,label:``,input:``}}},y={parameters:{controls:{exclude:d},snapshot:{skip:!0}},render:e=>(0,g.jsx)(m,{...e})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: INPUT_TEXT_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...y.parameters?.docs?.source}}},b=[`Default`,`Test`]}))();export{v as Default,y as Test,b as __namedExportsOrder,_ as default};