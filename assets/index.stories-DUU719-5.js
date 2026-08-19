import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-CLRePdsX.js";import{n as r,t as i}from"./Icon-Dm0VxswF.js";import{i as a,r as o}from"./Button-DCR2_tBD.js";import{a as s,n as c}from"./utils-BxIa431Z.js";import{n as l,t as u}from"./ButtonToggle-C-cuiW_i.js";import{a as d,i as f,r as p}from"./constants-DNIcSaMQ.js";var m,h,g=e((()=>{a(),l(),m=t(n()),h=e=>{let{backgroundAppearance:t,startIcon:n}=e;return(0,m.jsx)(o,{backgroundAppearance:t,children:(0,m.jsx)(u,{"aria-label":`button-toggle`,startIcon:n,...e})})}})),_,v=e((()=>{_=[`size`,`startIcon`,`endIcon`,`sdsType`,`sdsStyle`,`sdsStage`,`backgroundOnHover`,`disabled`,`children`,`backgroundAppearance`]})),y,b,x=e((()=>{l(),r(),y=t(n()),b=e=>(0,y.jsx)(u,{...e,"data-testid":`button-toggle`,"aria-label":`button-toggle`,sdsStyle:`outline`,startIcon:(0,y.jsx)(i,{sdsIcon:`InfoCircle`,sdsSize:`s`})})})),S,C,w,T,E;e((()=>{g(),v(),x(),d(),s(),S=t(n()),C={argTypes:{backgroundAppearance:{control:{type:c},options:[`matchBackground`,`dark`]},children:{control:{type:`text`}},disabled:{control:{type:`boolean`}},startIcon:{control:{labels:p,type:`select`},mapping:f,options:Object.keys(f)},size:{control:{type:c},options:[`small`,`medium`,`large`]},sdsType:{control:{type:c},options:[`primary`,`secondary`]},sdsStyle:{control:{type:c},options:[`outline`,`minimal`]},sdsStage:{control:{type:c},options:[`on`,`off`]}},component:h,title:`Components/Buttons/ButtonToggle`},w={args:{children:`Label`,backgroundAppearance:`matchBackground`,disabled:!1,startIcon:f[0],size:`large`,sdsType:`primary`,sdsStyle:`outline`,sdsStage:`off`}},T={parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,S.jsx)(b,{startIcon:`InfoCircle`,...e})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Label",
    backgroundAppearance: "matchBackground",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS[0],
    size: "large",
    sdsType: "primary",
    sdsStyle: "outline",
    sdsStage: "off"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: BUTTON_TOGGLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo startIcon="InfoCircle" {...args} />
}`,...T.parameters?.docs?.source}}},E=[`Default`,`Test`]}))();export{w as Default,T as Test,E as __namedExportsOrder,C as default};