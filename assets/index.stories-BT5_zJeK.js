import{i as e}from"./preload-helper-xPQekRTU.js";import{Fi as t}from"./iframe-DocVhSSI.js";import{n,t as r}from"./Icon-CQ-y6cAL.js";import{n as i,t as a}from"./Callout-C9pGampS.js";import{n as o,t as s}from"./customSdsIcon-DJ7jYb_X.js";import{n as c,t as l}from"./customSvgIcon-D5sv3OTJ.js";import{n as u,t as d}from"./ButtonDropdownLegacy-Dixi3Zl7.js";import{a as f,i as p,n as m,r as h}from"./default-Dlv-PRBo.js";var g,_,v,y,b,x,S,C=e((()=>{o(),c(),g=t(),{action:_}=__STORYBOOK_MODULE_ACTIONS__,v=[`disabled`,`icon`,`sdsStyle`,`sdsType`,`onClick`],y=`Label`,b={onClick:_(`onClick`)},x=[`Download`,`Copy`,`CirclesOverlap2`,`TrashCan`,(0,g.jsx)(s,{sdsSize:`s`},`customSdsIcon`),(0,g.jsx)(l,{style:{height:`16px`,width:`16px`}},`customIcon`)],S=[`SDS Icon: Download`,`SDS Icon: Copy`,`SDS Icon: CirclesOverlap2`,`SDS Icon: TrashCan`,`Custom SDS Icon`,`Custom SVG Icon`]})),w,T,E=e((()=>{u(),C(),f(),n(),i(),w=t(),T=e=>{let{sdsStyle:t,icon:n,sdsType:i,...o}=e;return t===`icon`&&n===void 0?m:t!==`icon`&&i===`tertiary`?p:t===`icon`&&i===`destructive`?h:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(a,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,w.jsx)(r,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,w.jsxs)(w.Fragment,{children:[`The `,(0,w.jsx)(`strong`,{children:`ButtonDropdownLegacy`}),` component is deprecated!`,(0,w.jsx)(`br`,{}),`Please use `,(0,w.jsx)(`strong`,{children:`ButtonDropdown`}),` component instead.`]})}),(0,w.jsx)(d,{sdsStyle:t,icon:n,sdsType:i,...o,children:y})]})}})),D,O,k,A,j;e((()=>{n(),C(),E(),D=t(),O={argTypes:{disabled:{control:{type:`boolean`}},icon:{control:{labels:S,type:`select`},mapping:x,options:Object.keys(x)},sdsSize:{control:{type:`radio`},if:{arg:`sdsStyle`,eq:`icon`},options:[`small`,`medium`,`large`]},sdsStyle:{control:{type:`radio`},options:[`rounded`,`square`,`icon`],required:!0},sdsType:{control:{type:`radio`},options:[`primary`,`secondary`,`tertiary`,`destructive`],required:!0}},component:T,tags:[`deprecated`],title:`Deprecated/ButtonDropdownLegacy`},k={args:{disabled:!1,icon:`Download`,onClick:b.onClick,sdsSize:`medium`,sdsStyle:`square`,sdsType:`primary`}},A={args:{disabled:!1,icon:(0,D.jsx)(r,{sdsIcon:`Download`,sdsSize:`s`}),onClick:b.onClick,sdsStyle:`rounded`,sdsType:`primary`},parameters:{controls:{exclude:v},snapshot:{skip:!0}},render:e=>(0,D.jsx)(T,{"data-testid":`button-dropdown`,...e,children:y})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    icon: "Download",
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsSize: "medium",
    sdsStyle: "square",
    sdsType: "primary"
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    icon: <Icon sdsIcon="Download" sdsSize="s" />,
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsStyle: "rounded",
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
    return <ButtonDropdownLegacy data-testid="button-dropdown" {...props}>
        {BUTTON_DROPDOWN_TEXT}
      </ButtonDropdownLegacy>;
  }
}`,...A.parameters?.docs?.source}}},j=[`Default`,`Test`]}))();export{k as Default,A as Test,j as __namedExportsOrder,O as default};