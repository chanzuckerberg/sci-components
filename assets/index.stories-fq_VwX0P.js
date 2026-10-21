import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./Icon-BDRrQ0Mb.js";import{i as o,n as s,r as c,t as l}from"./Button-DIf_3EkI.js";import{a as u,n as d}from"./utils-CbT4iKc5.js";import{n as f,t as p}from"./customSdsIcon-BgZodrv6.js";import{n as m,t as h}from"./customSvgIcon-BPPsT9zB.js";var g,_,v,y,b,x,S,C,w,T=t((()=>{f(),m(),i(),g=e(r()),{action:_}=__STORYBOOK_MODULE_ACTIONS__,v=[`endIcon`,`startIcon`,`onClick`,`sdsStyle`,`sdsType`,`text`,`label`,`disabled`,`sdsSize`,`icon`,`sdsIconProps`,`isAllCaps`,`backgroundOnHover`,`size`,`children`,`backgroundAppearance`],y=[`solid`,`outline`,`minimal`],b=[`small`,`medium`,`large`],x=[`primary`,`secondary`,`destructive`],S={none:void 0,xMark:(0,g.jsx)(a,{sdsIcon:`XMark`,sdsSize:`s`},`xmark`),download:(0,g.jsx)(a,{sdsIcon:`Download`,sdsSize:`s`},`download`),copy:(0,g.jsx)(a,{sdsIcon:`Copy`,sdsSize:`s`},`copy`),dotsHorizontal:(0,g.jsx)(a,{sdsIcon:`DotsHorizontal`,sdsSize:`s`},`dotsHorizontal`),cube:(0,g.jsx)(a,{sdsIcon:`Cube`,sdsSize:`s`},`cube`),customSdsIcon:(0,g.jsx)(p,{sdsSize:`s`},`customSdsIcon`),customSvgIcon:(0,g.jsx)(h,{style:{height:`16px`,width:`16px`}},`customIcon`)},C={none:`No Icon`,xMark:`SDS Icon: XMark`,download:`SDS Icon: Download`,copy:`SDS Icon: Copy`,dotsHorizontal:`SDS Icon: DotsHorizontal`,cube:`SDS Icon: Cube`,customSdsIcon:`Custom SDS Icon`,customSvgIcon:`Custom SVG Icon`},w={onClick:_(`onClick`)}})),E,D,O=t((()=>{n(),s(),o(),E=e(r()),D=e=>{let{sdsStyle:t}=e;return(0,E.jsx)(c,{backgroundAppearance:e.backgroundAppearance,children:(0,E.jsx)(l,{...e,sdsStyle:t})})}})),k,A,j,M,N;t((()=>{T(),O(),u(),k=e(r()),A={argTypes:{backgroundOnHover:{control:{type:`boolean`},description:`Only applies when sdsStyle is "minimal". When false, the button drops its padding and renders no background on hover or press, so it sits flush with surrounding text.`,table:{defaultValue:{summary:`true`}}},backgroundAppearance:{control:{type:d},description:`Tells the button which surface it sits on so it can pick colors with enough contrast. Set it to "dark" when the button is placed on a dark background in light mode.`,options:[`matchBackground`,`dark`],table:{defaultValue:{summary:`matchBackground`}}},children:{control:{type:`text`},description:`The content of the button, usually its label.`},disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},endIcon:{control:{labels:C,type:`select`},description:`Element placed after the children.`,mapping:S,options:Object.keys(S)},onClick:{action:w.onClick},size:{control:{type:d},description:"The size of the component. `small` is equivalent to the dense button styling.",options:b,table:{defaultValue:{summary:`large`}}},sdsStyle:{control:{type:d},description:`Style of the button, in descending order of emphasis. Solid is filled, outline draws a 1px border over a transparent background, and minimal is text only.`,options:y,table:{defaultValue:{summary:`solid`}}},sdsType:{control:{type:d},description:`Color scheme of the button within the chosen style. Primary uses the accent color, secondary is neutral, and destructive signals an irreversible action.`,options:x,table:{defaultValue:{summary:`primary`}}},startIcon:{control:{labels:C,type:`select`},description:`Element placed before the children.`,mapping:S,options:Object.keys(S)}},component:D,title:`Components/Buttons/Button`},j={args:{disabled:!1,size:`large`,sdsStyle:`rounded`,sdsType:`primary`,children:`Label`,backgroundOnHover:!0,backgroundAppearance:`matchBackground`}},M={args:{disabled:!1,sdsStyle:`rounded`,sdsType:`primary`,children:`Label`,size:`large`},parameters:{controls:{exclude:v},snapshot:{skip:!0}},render:e=>(0,k.jsx)(D,{...e,"data-testid":`button`})},N=[`Default`,`Test`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}}}))();export{j as Default,M as Test,N as __namedExportsOrder,A as default};