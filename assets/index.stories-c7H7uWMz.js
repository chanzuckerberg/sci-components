import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./jsx-runtime-cM__dR4X.js";import{n as r,t as i}from"./Icon-BDRrQ0Mb.js";import{n as a,t as o}from"./Callout-B6Q_89QW.js";import{n as s,t as c}from"./ButtonIcon-BpuRjopW.js";import{n as l,t as u}from"./customSdsIcon-BgZodrv6.js";import{n as d,t as f}from"./customSvgIcon-BPPsT9zB.js";var p,m,h=t((()=>{s(),a(),r(),p=e(n()),m=e=>{let{icon:t,...n}=e;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,p.jsx)(i,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,p.jsxs)(p.Fragment,{children:[`The `,(0,p.jsx)(`strong`,{children:`ButtonIcon`}),` component is deprecated!`,(0,p.jsx)(`br`,{}),`Please use `,(0,p.jsx)(`strong`,{children:`Button`}),` component instead.`]})}),(0,p.jsx)(c,{icon:t,sdsSize:`medium`,sdsType:`primary`,...n})]})}})),g,_,v,y,b,x,S,C,w=t((()=>{l(),d(),g=e(n()),_=[`disabled`,`icon`,`sdsSize`,`sdsType`],v=[`primary`,`secondary`,`tertiary`],y=[`large`,`medium`,`small`],b=[!1,!0],x=[`default`,`hover`,`active`,`focus`],S={infoCircle:`InfoCircle`,dotsHorizontal:`DotsHorizontal`,virus:`Virus`,xMark:`XMark`,customSdsIcon:(0,g.jsx)(u,{},`customSdsIcon`),customSvgIcon:(0,g.jsx)(f,{},`customIcon`)},C={infoCircle:`SDS Icon: InfoCircle`,dotsHorizontal:`SDS Icon: DotsHorizontal`,virus:`SDS Icon: Virus`,xMark:`SDS Icon: XMark`,customSdsIcon:`Custom SDS Icon`,customSvgIcon:`Custom Icon`}})),T,E,D=t((()=>{r(),s(),w(),a(),T=e(n()),E=()=>{let e={display:`contents`},t={borderStyle:`solid none none none`,gridColumn:`1 / 6`,justifySelf:`stretch`,paddingTop:10};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,T.jsx)(i,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,T.jsxs)(T.Fragment,{children:[`The `,(0,T.jsx)(`strong`,{children:`ButtnoIcon`}),` component is deprecated!`,(0,T.jsx)(`br`,{}),`Please use `,(0,T.jsx)(`strong`,{children:`Button`}),` component with`,` `,(0,T.jsx)(`strong`,{children:`Icon`}),` style instead.`]})}),v.map(e=>(0,T.jsx)(n,{sdsType:e},e))]});function n({sdsType:e}){return(0,T.jsxs)(`div`,{style:{columnGap:`20px`,display:`inline-grid`,fontFamily:`sans-serif`,marginRight:`50px`},children:[(0,T.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 6`,marginBottom:0},children:[`Type: `,(0,T.jsx)(`b`,{children:e})]}),y.map(t=>(0,T.jsx)(r,{sdsType:e,sdsSize:t},t))]})}function r({sdsType:n,sdsSize:r}){let i={...t,borderWidth:`2px`,fontSize:`1.17em`,margin:`20px 0`};return(0,T.jsxs)(`div`,{style:e,children:[(0,T.jsxs)(`p`,{style:i,children:[`Size: `,(0,T.jsx)(`b`,{children:r})]}),b.map(e=>(0,T.jsx)(a,{sdsType:n,sdsSize:r,disabled:e},String(e)))]})}function a({sdsType:e,sdsSize:t,disabled:n}){let r={primary:{large:`Cube`,medium:`Cube`,small:`Cube`},secondary:{large:`ExclamationMarkCircle`,medium:`ExclamationMarkCircle`,small:`ExclamationMarkCircle`},tertiary:{large:`XMark`,medium:`XMark`,small:`XMark`}},i={display:`contents`},a={marginBottom:10},o={fontSize:`0.67em`,margin:`10px 0`};return(0,T.jsx)(`div`,{style:i,children:x.map(i=>{let s=r[e][t];return(0,T.jsx)(`div`,{style:a,children:(n===!1||n===!0&&i==="default")&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(`p`,{style:o,children:[n===!1?`State: `:`Disabled: `,(0,T.jsx)(`br`,{}),(0,T.jsx)(`b`,{children:n===!1?i:`true`})]}),(0,T.jsx)(c,{"aria-label":s,icon:s,"data-testid":`button-icon`,sdsType:e,sdsSize:t,disabled:n,className:`pseudo-${i}`},i)]})},`div-${i}`)})})}}})),O,k,A,j,M,N;t((()=>{s(),h(),w(),D(),O=e(n()),k={argTypes:{disabled:{control:{type:`boolean`}},icon:{control:{labels:C,type:`select`},mapping:S,options:Object.keys(S)},sdsSize:{control:{type:`select`},options:[`small`,`medium`,`large`]},sdsType:{control:{type:`select`},options:[`primary`,`secondary`,`tertiary`]}},component:m,title:`Deprecated/ButtonIcon`},A={args:{"aria-label":`info`,disabled:!1,icon:`InfoCircle`,sdsSize:`large`,sdsType:`primary`}},j={parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,O.jsx)(E,{...e})},M={parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:()=>(0,O.jsx)(c,{"aria-label":`dotsHorizontal`,"data-testid":`iconButton`,icon:`DotsHorizontal`,sdsSize:`medium`,sdsType:`primary`})},N=[`Default`,`ScreenshotTest`,`Test`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "info",
    disabled: false,
    icon: "InfoCircle",
    sdsSize: "large",
    sdsType: "primary"
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: BUTTON_ICON_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: BUTTON_ICON_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (): JSX.Element => {
    return <RawButtonIcon aria-label="dotsHorizontal" data-testid="iconButton" icon="DotsHorizontal" sdsSize="medium" sdsType="primary" />;
  }
}`,...M.parameters?.docs?.source}}}}))();export{A as Default,j as ScreenshotTest,M as Test,N as __namedExportsOrder,k as default};