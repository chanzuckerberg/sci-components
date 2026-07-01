import{i as e}from"./preload-helper-usAeo7Bx.js";import{Gi as t}from"./iframe-Bjh1LYUt.js";import{n,t as r}from"./Icon-D5aq3JJF.js";import{a as i,n as a}from"./utils-CHt6irz9.js";import{n as o,t as s}from"./Callout-CDE4bMFy.js";import{i as c,r as l}from"./Button-BT0OC4_c.js";import{a as u,i as d,n as f,r as p,t as m}from"./constants-B_LBjIPu2.js";import{n as h,t as g}from"./ButtonDropdown-vVxI3aQ9.js";var _,v,y,b=e((()=>{c(),h(),o(),_=t(),v=(0,_.jsx)(s,{intent:`negative`,title:`Invalid Props!`,body:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`strong`,{children:`ButtonDropdown`}),` does not support the`,` `,(0,_.jsx)(`strong`,{children:`destructive`}),` type. Please choose either`,` `,(0,_.jsx)(`strong`,{children:`primary`}),` or `,(0,_.jsx)(`strong`,{children:`secondary`}),`.`]})}),y=e=>{let{backgroundAppearance:t,sdsStyle:n,startIcon:r,sdsType:i,...a}=e;return i===`destructive`?v:(0,_.jsx)(l,{backgroundAppearance:e.backgroundAppearance,children:(0,_.jsx)(g,{backgroundAppearance:t,startIcon:r,sdsStyle:n,sdsType:i,...a})})}})),x,S,C,w,T;e((()=>{n(),u(),b(),i(),x=t(),S={argTypes:{backgroundAppearance:{control:{type:a},options:[`matchBackground`,`dark`]},backgroundOnHover:{control:{type:`boolean`}},children:{control:{type:`text`}},disabled:{control:{type:`boolean`}},startIcon:{control:{labels:p,type:`select`},mapping:d,options:Object.keys(d)},size:{control:{type:a},options:[`small`,`medium`,`large`]},sdsStyle:{control:{type:a},options:[`solid`,`outline`,`minimal`],required:!0},sdsType:{control:{type:a},options:[`primary`,`secondary`],required:!0}},component:y,tags:[`beta`],title:`Components/Buttons/ButtonDropdown`},C={args:{backgroundAppearance:`matchBackground`,backgroundOnHover:!0,children:`Label`,disabled:!1,startIcon:d[0],onClick:m.onClick,size:`large`,sdsStyle:`solid`,sdsType:`primary`}},w={args:{backgroundAppearance:`matchBackground`,disabled:!1,startIcon:(0,x.jsx)(r,{sdsIcon:`Download`,sdsSize:`s`}),onClick:m.onClick,sdsStyle:`solid`,size:`large`,sdsType:`primary`},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,x.jsx)(y,{...e,"aria-label":`button-dropdown`,"data-testid":`button-dropdown`})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Test`]}))();export{C as Default,w as Test,T as __namedExportsOrder,S as default};