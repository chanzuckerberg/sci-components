import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-8L1H2VAU.js";import{n as r,t as i}from"./Icon-CGj7VeJw.js";import{n as a,t as o}from"./Callout-C7uWxTo4.js";import{i as s,r as c}from"./Button-B4RvJGJF.js";import{a as l,n as u}from"./utils-BxIa431Z.js";import{n as d,t as f}from"./ButtonDropdown-YWRjNBbe.js";import{a as p,i as m,n as h,r as g,t as _}from"./constants-Cljl4toe.js";var v,y,b,x=e((()=>{s(),d(),a(),v=t(n()),y=(0,v.jsx)(o,{intent:`negative`,title:`Invalid Props!`,body:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`strong`,{children:`ButtonDropdown`}),` does not support the`,` `,(0,v.jsx)(`strong`,{children:`destructive`}),` type. Please choose either`,` `,(0,v.jsx)(`strong`,{children:`primary`}),` or `,(0,v.jsx)(`strong`,{children:`secondary`}),`.`]})}),b=e=>{let{backgroundAppearance:t,sdsStyle:n,startIcon:r,sdsType:i,...a}=e;return i===`destructive`?y:(0,v.jsx)(c,{backgroundAppearance:e.backgroundAppearance,children:(0,v.jsx)(f,{backgroundAppearance:t,startIcon:r,sdsStyle:n,sdsType:i,...a})})}})),S,C,w,T,E;e((()=>{r(),p(),x(),l(),S=t(n()),C={argTypes:{backgroundAppearance:{control:{type:u},description:`Tells the button which surface it sits on so it can pick colors with enough contrast. Set it to "dark" when the button is placed on a dark background in light mode.`,options:[`matchBackground`,`dark`],table:{defaultValue:{summary:`matchBackground`}}},backgroundOnHover:{control:{type:`boolean`},description:`Only applies when sdsStyle is "minimal". When false, the button drops its padding and renders no background on hover or press, so it sits flush with surrounding text.`,table:{defaultValue:{summary:`true`}}},children:{control:{type:`text`},description:`The button label. The trailing chevron is only rendered when a label is present.`},disabled:{control:{type:`boolean`},description:`Disables the button when set to true.`,table:{defaultValue:{summary:`false`}}},startIcon:{control:{labels:g,type:`select`},description:'An optional icon placed before the label. Pass the SDS Icon component, for example `<Icon sdsIcon="Download" sdsSize="s" />`.',mapping:m,options:Object.keys(m)},size:{control:{type:u},description:`Size of the button. Also sets the size of the trailing chevron.`,options:[`small`,`medium`,`large`],table:{defaultValue:{summary:`large`}}},sdsStyle:{control:{type:u},description:`Style of the button. Same values as Button.`,options:[`solid`,`outline`,`minimal`],required:!0,table:{defaultValue:{summary:`solid`}}},sdsType:{control:{type:u},description:`Color scheme of the button. Unlike Button, "destructive" is not supported.`,options:[`primary`,`secondary`],required:!0,table:{defaultValue:{summary:`primary`}}}},component:b,title:`Components/Buttons/ButtonDropdown`},w={args:{backgroundAppearance:`matchBackground`,backgroundOnHover:!0,children:`Label`,disabled:!1,startIcon:m.download,onClick:_.onClick,size:`large`,sdsStyle:`solid`,sdsType:`primary`}},T={args:{backgroundAppearance:`matchBackground`,disabled:!1,startIcon:(0,S.jsx)(i,{sdsIcon:`Download`,sdsSize:`s`}),onClick:_.onClick,sdsStyle:`solid`,size:`large`,sdsType:`primary`},parameters:{controls:{exclude:h},snapshot:{skip:!0}},render:e=>(0,S.jsx)(b,{...e,"aria-label":`button-dropdown`,"data-testid":`button-dropdown`})},E=[`Default`,`Test`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    backgroundAppearance: "matchBackground",
    backgroundOnHover: true,
    children: "Label",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS.download,
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
}`,...T.parameters?.docs?.source}}}}))();export{w as Default,T as Test,E as __namedExportsOrder,C as default};