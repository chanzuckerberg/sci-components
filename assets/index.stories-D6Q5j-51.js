import{i as e}from"./preload-helper-usAeo7Bx.js";import{Aa as t,Gi as n}from"./iframe-Bjh1LYUt.js";import{n as r,t as i}from"./Icon-D5aq3JJF.js";import{a,n as o}from"./utils-CHt6irz9.js";import{i as s,n as c,r as l,t as u}from"./Button-BT0OC4_c.js";import{n as d,t as f}from"./customSdsIcon-RDVqJP4X.js";import{n as p,t as m}from"./customSvgIcon-BOV60bjp.js";var h,g,_,v,y,b,x,S,C,w=e((()=>{d(),p(),r(),h=n(),{action:g}=__STORYBOOK_MODULE_ACTIONS__,_=[`endIcon`,`startIcon`,`onClick`,`sdsStyle`,`sdsType`,`text`,`label`,`disabled`,`sdsSize`,`icon`,`sdsIconProps`,`isAllCaps`,`backgroundOnHover`,`size`,`children`,`backgroundAppearance`],v=[`solid`,`outline`,`minimal`],y=[`small`,`medium`,`large`],b=[`primary`,`secondary`,`destructive`],x=[void 0,(0,h.jsx)(i,{sdsIcon:`XMark`,sdsSize:`s`},`xmark`),(0,h.jsx)(i,{sdsIcon:`Download`,sdsSize:`s`},`download`),(0,h.jsx)(i,{sdsIcon:`Copy`,sdsSize:`s`},`copy`),(0,h.jsx)(i,{sdsIcon:`DotsHorizontal`,sdsSize:`s`},`dotsHorizontal`),(0,h.jsx)(i,{sdsIcon:`Cube`,sdsSize:`s`},`cube`),(0,h.jsx)(f,{sdsSize:`s`},`customSdsIcon`),(0,h.jsx)(m,{style:{height:`16px`,width:`16px`}},`customIcon`)],S=[`No Icon`,`SDS Icon: XMark`,`SDS Icon: Download`,`SDS Icon: Copy`,`SDS Icon: DotsHorizontal`,`SDS Icon: Cube`,`Custom SDS Icon`,`Custom SVG Icon`],C={onClick:g(`onClick`)}})),T,E,D=e((()=>{t(),c(),s(),T=n(),E=e=>{let{sdsStyle:t}=e;return(0,T.jsx)(l,{backgroundAppearance:e.backgroundAppearance,children:(0,T.jsx)(u,{...e,sdsStyle:t})})}})),O,k,A,j,M;e((()=>{w(),D(),a(),O=n(),k={argTypes:{backgroundOnHover:{control:{type:`boolean`}},backgroundAppearance:{control:{type:o},options:[`matchBackground`,`dark`]},children:{control:{type:`text`}},endIcon:{control:{labels:S,type:`select`},mapping:x,options:Object.keys(x)},onClick:{action:C.onClick},size:{control:{labels:y,type:o},mapping:y,options:Object.keys(y)},sdsStyle:{control:{type:o},options:v},sdsType:{control:{type:o},options:b},startIcon:{control:{labels:S,type:`select`},mapping:x,options:Object.keys(x)}},component:E,tags:[`beta`],title:`Components/Buttons/Button`},A={args:{disabled:!1,size:`large`,sdsStyle:`rounded`,sdsType:`primary`,children:`Label`,backgroundOnHover:!0,backgroundAppearance:`matchBackground`}},j={args:{disabled:!1,sdsStyle:`rounded`,sdsType:`primary`,children:`Label`,size:`large`},parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,O.jsx)(E,{...e,"data-testid":`button`})},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    size: "large",
    sdsStyle: "rounded",
    sdsType: "primary",
    children: "Label",
    backgroundOnHover: true,
    backgroundAppearance: "matchBackground"
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M=[`Default`,`Test`]}))();export{A as Default,j as Test,M as __namedExportsOrder,k as default};