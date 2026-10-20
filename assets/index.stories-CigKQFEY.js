import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-8L1H2VAU.js";import{n as r,t as i}from"./Icon-CGj7VeJw.js";import{n as a,t as o}from"./Callout-C7uWxTo4.js";import{n as s,t as c}from"./ButtonToggleLegacy-CgWm95UB.js";import{n as l,t as u}from"./customSdsIcon-KZ55RhX8.js";import{n as d,t as f}from"./customSvgIcon-FL7KVyDY.js";var p,m,h=e((()=>{s(),a(),r(),p=t(n()),m=e=>{let{icon:t}=e;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,p.jsx)(i,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,p.jsxs)(p.Fragment,{children:[`The `,(0,p.jsx)(`strong`,{children:`ButtonToggleLegacy`}),` component is deprecated!`,(0,p.jsx)(`br`,{}),`Please use `,(0,p.jsx)(`strong`,{children:`ButtonToggle`}),` component instead.`]})}),(0,p.jsx)(c,{"aria-label":`button-toggle`,icon:t,...e})]})}})),g,_,v,y,b=e((()=>{l(),d(),g=t(n()),_=[`sdsSize`,`icon`,`sdsStage`,`sdsType`],v={infoCircle:`InfoCircle`,slidersHorizontal:`SlidersHorizontal`,filter:`Filter`,dotsHorizontal:`DotsHorizontal`,linesHorizontal3:`LinesHorizontal3`,customSdsIcon:(0,g.jsx)(u,{},`customSdsIcon`),customSvgIcon:(0,g.jsx)(f,{},`customIcon`)},y={infoCircle:`SDS Icon: InfoCircle (s/m/l)`,slidersHorizontal:`SDS Icon: SlidersHorizontal (m/l)`,filter:`SDS Icon: Filter (s)`,dotsHorizontal:`SDS Icon: DotsHorizontal (s/m/l)`,linesHorizontal3:`SDS Icon: LinesHorizontal3 (s/m/l)`,customSdsIcon:`Custom SDS Icon (s/m/l)`,customSvgIcon:`Custom SVG Icon (s/m/l)`}})),x,S,C=e((()=>{s(),x=t(n()),S=e=>{let{icon:t}=e;return(0,x.jsx)(c,{"data-testid":`button-toggle`,"aria-label":`button-toggle`,icon:t,...e})}})),w,T,E,D,O;e((()=>{h(),b(),C(),w=t(n()),T={argTypes:{disabled:{control:{type:`boolean`}},icon:{control:{labels:y,type:`select`},mapping:v,options:Object.keys(v)},sdsSize:{control:{type:`select`},options:[`small`,`medium`,`large`]},sdsStage:{control:{type:`radio`},options:[`on`,`off`]},sdsType:{control:{type:`radio`},options:[`primary`,`secondary`]}},component:m,title:`Deprecated/ButtonToggleLegacy`},E={args:{disabled:!1,icon:`InfoCircle`,sdsSize:`medium`,sdsStage:`off`,sdsType:`primary`}},D={parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,w.jsx)(S,{icon:`InfoCircle`,...e})},O=[`Default`,`Test`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    icon: "InfoCircle",
    sdsSize: "medium",
    sdsStage: "off",
    sdsType: "primary"
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: BUTTON_TOGGLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo icon="InfoCircle" {...args} />
}`,...D.parameters?.docs?.source}}}}))();export{E as Default,D as Test,O as __namedExportsOrder,T as default};