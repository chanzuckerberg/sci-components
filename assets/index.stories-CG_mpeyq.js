import{i as e}from"./preload-helper-DbRxMUml.js";import{cr as t}from"./iframe-DI6qETgL.js";import{n,t as r}from"./Icon-BvRFwTEr.js";import{n as i,t as a}from"./ButtonIcon-DSsFNgLW.js";import{n as o,t as s}from"./Callout-BE_VME0K.js";import{n as c,t as l}from"./customSdsIcon-CKlsVVVI.js";import{n as u,t as d}from"./customSvgIcon-BEFdzOrQ.js";var f,p,m=e((()=>{i(),o(),n(),f=t(),p=e=>{let{icon:t,...n}=e;return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(s,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,f.jsx)(r,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,f.jsxs)(f.Fragment,{children:[`The `,(0,f.jsx)(`strong`,{children:`ButtonIcon`}),` component is deprecated!`,(0,f.jsx)(`br`,{}),`Please use `,(0,f.jsx)(`strong`,{children:`Button`}),` component instead.`]})}),(0,f.jsx)(a,{icon:t,sdsSize:`medium`,sdsType:`primary`,...n})]})}})),h,g,_,v,y,b,x,S,C=e((()=>{c(),u(),h=t(),g=[`disabled`,`icon`,`sdsSize`,`sdsType`],_=[`primary`,`secondary`,`tertiary`],v=[`large`,`medium`,`small`],y=[!1,!0],b=[`default`,`hover`,`active`,`focus`],x=[`InfoCircle`,`DotsHorizontal`,`Virus`,`XMark`,(0,h.jsx)(l,{},`customSdsIcon`),(0,h.jsx)(d,{},`customIcon`)],S=[`SDS Icon: InfoCircle`,`SDS Icon: DotsHorizontal`,`SDS Icon: Virus`,`SDS Icon: XMark`,`Custom SDS Icon`,`Custom Icon`]})),w,T,E=e((()=>{n(),i(),C(),o(),w=t(),T=()=>{let e={display:`contents`},t={borderStyle:`solid none none none`,gridColumn:`1 / 6`,justifySelf:`stretch`,paddingTop:10};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,w.jsx)(r,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,w.jsxs)(w.Fragment,{children:[`The `,(0,w.jsx)(`strong`,{children:`ButtnoIcon`}),` component is deprecated!`,(0,w.jsx)(`br`,{}),`Please use `,(0,w.jsx)(`strong`,{children:`Button`}),` component with`,` `,(0,w.jsx)(`strong`,{children:`Icon`}),` style instead.`]})}),_.map(e=>(0,w.jsx)(n,{sdsType:e},e))]});function n({sdsType:e}){return(0,w.jsxs)(`div`,{style:{columnGap:`20px`,display:`inline-grid`,fontFamily:`sans-serif`,marginRight:`50px`},children:[(0,w.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 6`,marginBottom:0},children:[`Type: `,(0,w.jsx)(`b`,{children:e})]}),v.map(t=>(0,w.jsx)(i,{sdsType:e,sdsSize:t},t))]})}function i({sdsType:n,sdsSize:r}){return(0,w.jsxs)(`div`,{style:e,children:[(0,w.jsxs)(`p`,{style:{...t,borderWidth:`2px`,fontSize:`1.17em`,margin:`20px 0`},children:[`Size: `,(0,w.jsx)(`b`,{children:r})]}),y.map(e=>(0,w.jsx)(o,{sdsType:n,sdsSize:r,disabled:e},String(e)))]})}function o({sdsType:e,sdsSize:t,disabled:n}){let r={primary:{large:`Cube`,medium:`Cube`,small:`Cube`},secondary:{large:`ExclamationMarkCircle`,medium:`ExclamationMarkCircle`,small:`ExclamationMarkCircle`},tertiary:{large:`XMark`,medium:`XMark`,small:`XMark`}},i={display:`contents`},o={marginBottom:10},s={fontSize:`0.67em`,margin:`10px 0`};return(0,w.jsx)(`div`,{style:i,children:b.map(i=>{let c=r[e][t];return(0,w.jsx)(`div`,{style:o,children:(n===!1||n===!0&&i===`default`)&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`p`,{style:s,children:[n===!1?`State: `:`Disabled: `,(0,w.jsx)(`br`,{}),(0,w.jsx)(`b`,{children:n===!1?i:`true`})]}),(0,w.jsx)(a,{"aria-label":c,icon:c,"data-testid":`button-icon`,sdsType:e,sdsSize:t,disabled:n,className:`pseudo-${i}`},i)]})},`div-${i}`)})})}}})),D,O,k,A,j,M;e((()=>{i(),m(),C(),E(),D=t(),O={argTypes:{disabled:{control:{type:`boolean`}},icon:{control:{labels:S,type:`select`},mapping:x,options:Object.keys(x)},sdsSize:{control:{type:`select`},options:[`small`,`medium`,`large`]},sdsType:{control:{type:`select`},options:[`primary`,`secondary`,`tertiary`]}},component:p,tags:[`deprecated`],title:`Deprecated/ButtonIcon`},k={args:{"aria-label":`info`,disabled:!1,icon:`InfoCircle`,sdsSize:`large`,sdsType:`primary`}},A={parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,D.jsx)(T,{...e})},j={parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:()=>(0,D.jsx)(a,{"aria-label":`dotsHorizontal`,"data-testid":`iconButton`,icon:`DotsHorizontal`,sdsSize:`medium`,sdsType:`primary`})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "info",
    disabled: false,
    icon: "InfoCircle",
    sdsSize: "large",
    sdsType: "primary"
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: BUTTON_ICON_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M=[`Default`,`ScreenshotTest`,`Test`]}))();export{k as Default,A as ScreenshotTest,j as Test,M as __namedExportsOrder,O as default};