import{i as e}from"./preload-helper-DbRxMUml.js";import{cr as t}from"./iframe-DI6qETgL.js";import{n,t as r}from"./Icon-BvRFwTEr.js";import{a as i,n as a}from"./utils-B1uyFjm5.js";import{i as o,r as s}from"./Button-K7qsdWHe.js";import{a as c,i as l,r as u}from"./constants-B2kVEKee2.js";import{n as d,t as f}from"./ButtonToggle-DJWb6qEe.js";var p,m,h=e((()=>{o(),d(),p=t(),m=e=>{let{backgroundAppearance:t,startIcon:n}=e;return(0,p.jsx)(s,{backgroundAppearance:t,children:(0,p.jsx)(f,{"aria-label":`button-toggle`,startIcon:n,...e})})}})),g,_=e((()=>{g=[`size`,`startIcon`,`endIcon`,`sdsType`,`sdsStyle`,`sdsStage`,`backgroundOnHover`,`disabled`,`children`,`backgroundAppearance`]})),v,y,b=e((()=>{d(),n(),v=t(),y=e=>(0,v.jsx)(f,{...e,"data-testid":`button-toggle`,"aria-label":`button-toggle`,sdsStyle:`outline`,startIcon:(0,v.jsx)(r,{sdsIcon:`InfoCircle`,sdsSize:`s`})})})),x,S,C,w,T;e((()=>{h(),_(),b(),c(),i(),x=t(),S={argTypes:{backgroundAppearance:{control:{type:a},options:[`matchBackground`,`dark`]},children:{control:{type:`text`}},disabled:{control:{type:`boolean`}},startIcon:{control:{labels:u,type:`select`},mapping:l,options:Object.keys(l)},size:{control:{type:a},options:[`small`,`medium`,`large`]},sdsType:{control:{type:a},options:[`primary`,`secondary`]},sdsStyle:{control:{type:a},options:[`outline`,`minimal`]},sdsStage:{control:{type:a},options:[`on`,`off`]}},component:m,tags:[`beta`],title:`Components/Buttons/ButtonToggle`},C={args:{children:`Label`,backgroundAppearance:`matchBackground`,disabled:!1,startIcon:l[0],size:`large`,sdsType:`primary`,sdsStyle:`outline`,sdsStage:`off`}},w={parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,x.jsx)(y,{startIcon:`InfoCircle`,...e})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: BUTTON_TOGGLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo startIcon="InfoCircle" {...args} />
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Test`]}))();export{C as Default,w as Test,T as __namedExportsOrder,S as default};