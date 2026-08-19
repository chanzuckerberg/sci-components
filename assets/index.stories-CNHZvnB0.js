import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-CLRePdsX.js";import{n as i,t as a}from"./Icon-Dm0VxswF.js";import{i as o,n as s,r as c,t as l}from"./Button-DCR2_tBD.js";import{a as u,n as d}from"./utils-BxIa431Z.js";import{n as f,t as p}from"./customSdsIcon-DPhiKIIX.js";import{n as m,t as h}from"./customSvgIcon-L1t6H_T2.js";var g,_,v,y,b,x,S,C,w,T=e((()=>{f(),m(),i(),g=t(r()),{action:_}=__STORYBOOK_MODULE_ACTIONS__,v=[`endIcon`,`startIcon`,`onClick`,`sdsStyle`,`sdsType`,`text`,`label`,`disabled`,`sdsSize`,`icon`,`sdsIconProps`,`isAllCaps`,`backgroundOnHover`,`size`,`children`,`backgroundAppearance`],y=[`solid`,`outline`,`minimal`],b=[`small`,`medium`,`large`],x=[`primary`,`secondary`,`destructive`],S=[void 0,(0,g.jsx)(a,{sdsIcon:`XMark`,sdsSize:`s`},`xmark`),(0,g.jsx)(a,{sdsIcon:`Download`,sdsSize:`s`},`download`),(0,g.jsx)(a,{sdsIcon:`Copy`,sdsSize:`s`},`copy`),(0,g.jsx)(a,{sdsIcon:`DotsHorizontal`,sdsSize:`s`},`dotsHorizontal`),(0,g.jsx)(a,{sdsIcon:`Cube`,sdsSize:`s`},`cube`),(0,g.jsx)(p,{sdsSize:`s`},`customSdsIcon`),(0,g.jsx)(h,{style:{height:`16px`,width:`16px`}},`customIcon`)],C=[`No Icon`,`SDS Icon: XMark`,`SDS Icon: Download`,`SDS Icon: Copy`,`SDS Icon: DotsHorizontal`,`SDS Icon: Cube`,`Custom SDS Icon`,`Custom SVG Icon`],w={onClick:_(`onClick`)}})),E,D,O=e((()=>{n(),s(),o(),E=t(r()),D=e=>{let{sdsStyle:t}=e;return(0,E.jsx)(c,{backgroundAppearance:e.backgroundAppearance,children:(0,E.jsx)(l,{...e,sdsStyle:t})})}})),k,A,j,M,N;e((()=>{T(),O(),u(),k=t(r()),A={argTypes:{backgroundOnHover:{control:{type:`boolean`}},backgroundAppearance:{control:{type:d},options:[`matchBackground`,`dark`]},children:{control:{type:`text`}},endIcon:{control:{labels:C,type:`select`},mapping:S,options:Object.keys(S)},onClick:{action:w.onClick},size:{control:{labels:b,type:d},mapping:b,options:Object.keys(b)},sdsStyle:{control:{type:d},options:y},sdsType:{control:{type:d},options:x},startIcon:{control:{labels:C,type:`select`},mapping:S,options:Object.keys(S)}},component:D,title:`Components/Buttons/Button`},j={args:{disabled:!1,size:`large`,sdsStyle:`rounded`,sdsType:`primary`,children:`Label`,backgroundOnHover:!0,backgroundAppearance:`matchBackground`}},M={args:{disabled:!1,sdsStyle:`rounded`,sdsType:`primary`,children:`Label`,size:`large`},parameters:{controls:{exclude:v},snapshot:{skip:!0}},render:e=>(0,k.jsx)(D,{...e,"data-testid":`button`})},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    size: "large",
    sdsStyle: "rounded",
    sdsType: "primary",
    children: "Label",
    backgroundOnHover: true,
    backgroundAppearance: "matchBackground"
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    sdsStyle: "rounded",
    sdsType: "primary",
    children: "Label",
    size: "large"
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (props: Args) => <Button {...props} data-testid="button" />
}`,...M.parameters?.docs?.source}}},N=[`Default`,`Test`]}))();export{j as Default,M as Test,N as __namedExportsOrder,A as default};