import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-s0DqqZ6S.js";import{n as r,t as i}from"./Icon-BAm62WT8.js";import{n as a,t as o}from"./Callout-oiikP58h.js";import{n as s,t as c}from"./ButtonDropdownLegacy-j-uxJsHz.js";import{n as l,t as u}from"./customSdsIcon-Db4ceVER.js";import{n as d,t as f}from"./customSvgIcon-Dtg7hivA.js";import{a as p,i as m,n as h,r as g}from"./default-CpltzAta.js";var _,v,y,b,x,S,C,w=e((()=>{l(),d(),_=t(n()),{action:v}=__STORYBOOK_MODULE_ACTIONS__,y=[`disabled`,`icon`,`sdsStyle`,`sdsType`,`onClick`],b=`Label`,x={onClick:v(`onClick`)},S=[`Download`,`Copy`,`CirclesOverlap2`,`TrashCan`,(0,_.jsx)(u,{sdsSize:`s`},`customSdsIcon`),(0,_.jsx)(f,{style:{height:`16px`,width:`16px`}},`customIcon`)],C=[`SDS Icon: Download`,`SDS Icon: Copy`,`SDS Icon: CirclesOverlap2`,`SDS Icon: TrashCan`,`Custom SDS Icon`,`Custom SVG Icon`]})),T,E,D=e((()=>{s(),w(),p(),r(),a(),T=t(n()),E=e=>{let{sdsStyle:t,icon:n,sdsType:r,...a}=e;return t===`icon`&&n===void 0?h:t!==`icon`&&r===`tertiary`?m:t===`icon`&&r===`destructive`?g:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,T.jsx)(i,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,T.jsxs)(T.Fragment,{children:[`The `,(0,T.jsx)(`strong`,{children:`ButtonDropdownLegacy`}),` component is deprecated!`,(0,T.jsx)(`br`,{}),`Please use `,(0,T.jsx)(`strong`,{children:`ButtonDropdown`}),` component instead.`]})}),(0,T.jsx)(c,{sdsStyle:t,icon:n,sdsType:r,...a,children:b})]})}})),O,k,A,j,M;e((()=>{r(),w(),D(),O=t(n()),k={argTypes:{disabled:{control:{type:`boolean`}},icon:{control:{labels:C,type:`select`},mapping:S,options:Object.keys(S)},sdsSize:{control:{type:`radio`},if:{arg:`sdsStyle`,eq:`icon`},options:[`small`,`medium`,`large`]},sdsStyle:{control:{type:`radio`},options:[`rounded`,`square`,`icon`],required:!0},sdsType:{control:{type:`radio`},options:[`primary`,`secondary`,`tertiary`,`destructive`],required:!0}},component:E,title:`Deprecated/ButtonDropdownLegacy`},A={args:{disabled:!1,icon:`Download`,onClick:x.onClick,sdsSize:`medium`,sdsStyle:`square`,sdsType:`primary`}},j={args:{disabled:!1,icon:(0,O.jsx)(i,{sdsIcon:`Download`,sdsSize:`s`}),onClick:x.onClick,sdsStyle:`rounded`,sdsType:`primary`},parameters:{controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,O.jsx)(E,{"data-testid":`button-dropdown`,...e,children:b})},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    icon: "Download",
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsSize: "medium",
    sdsStyle: "square",
    sdsType: "primary"
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M=[`Default`,`Test`]}))();export{A as Default,j as Test,M as __namedExportsOrder,k as default};