import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-s0DqqZ6S.js";import{n as r,t as i}from"./Icon-BAm62WT8.js";import{n as a,t as o}from"./Callout-oiikP58h.js";import{i as s,r as c}from"./Button-Knlg9A8k.js";import{a as l,n as u}from"./utils-BxIa431Z.js";import{n as d,t as f}from"./ButtonDropdown-BBlSSCqi.js";import{a as p,i as m,n as h,r as g,t as _}from"./constants-s7tD1yJc.js";var v,y,b,x=e((()=>{s(),d(),a(),v=t(n()),y=(0,v.jsx)(o,{intent:`negative`,title:`Invalid Props!`,body:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`strong`,{children:`ButtonDropdown`}),` does not support the`,` `,(0,v.jsx)(`strong`,{children:`destructive`}),` type. Please choose either`,` `,(0,v.jsx)(`strong`,{children:`primary`}),` or `,(0,v.jsx)(`strong`,{children:`secondary`}),`.`]})}),b=e=>{let{backgroundAppearance:t,sdsStyle:n,startIcon:r,sdsType:i,...a}=e;return i===`destructive`?y:(0,v.jsx)(c,{backgroundAppearance:e.backgroundAppearance,children:(0,v.jsx)(f,{backgroundAppearance:t,startIcon:r,sdsStyle:n,sdsType:i,...a})})}})),S,C,w,T,E;e((()=>{r(),p(),x(),l(),S=t(n()),C={argTypes:{backgroundAppearance:{control:{type:u},options:[`matchBackground`,`dark`]},backgroundOnHover:{control:{type:`boolean`}},children:{control:{type:`text`}},disabled:{control:{type:`boolean`}},startIcon:{control:{labels:g,type:`select`},mapping:m,options:Object.keys(m)},size:{control:{type:u},options:[`small`,`medium`,`large`]},sdsStyle:{control:{type:u},options:[`solid`,`outline`,`minimal`],required:!0},sdsType:{control:{type:u},options:[`primary`,`secondary`],required:!0}},component:b,title:`Components/Buttons/ButtonDropdown`},w={args:{backgroundAppearance:`matchBackground`,backgroundOnHover:!0,children:`Label`,disabled:!1,startIcon:m[0],onClick:_.onClick,size:`large`,sdsStyle:`solid`,sdsType:`primary`}},T={args:{backgroundAppearance:`matchBackground`,disabled:!1,startIcon:(0,S.jsx)(i,{sdsIcon:`Download`,sdsSize:`s`}),onClick:_.onClick,sdsStyle:`solid`,size:`large`,sdsType:`primary`},parameters:{controls:{exclude:h},snapshot:{skip:!0}},render:e=>(0,S.jsx)(b,{...e,"aria-label":`button-dropdown`,"data-testid":`button-dropdown`})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    backgroundAppearance: "matchBackground",
    backgroundOnHover: true,
    children: "Label",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS[0],
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    size: "large",
    sdsStyle: "solid",
    sdsType: "primary"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    backgroundAppearance: "matchBackground",
    disabled: false,
    startIcon: <Icon sdsIcon="Download" sdsSize="s" />,
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsStyle: "solid",
    size: "large",
    sdsType: "primary"
  },
  parameters: {
    controls: {
      exclude: BUTTON_DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (props: Args): JSX.Element => {
    return <ButtonDropdown {...props} aria-label="button-dropdown" data-testid="button-dropdown" />;
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`Test`]}))();export{w as Default,T as Test,E as __namedExportsOrder,C as default};