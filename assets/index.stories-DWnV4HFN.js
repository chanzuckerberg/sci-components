import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{f as i,n as a}from"./index.es-C6oPQJ8c.js";import{n as o,t as s}from"./Tag-Bv6IRmUS.js";import{_ as c,a as l,c as u,d,f,g as p,h as m,i as h,l as g,m as _,n as v,o as y,p as b,r as x,s as S,t as C,u as w}from"./constants-Hh9gbQuS.js";var T,E,D=t((()=>{o(),T=e(r()),E=e=>{let{label:t}=e;return(0,T.jsx)(s,{label:t,...e})}}));function O({color:e,sdsStyle:t,state:n}){let r=n===`disabled`;return(0,A.jsx)(`div`,{style:L,children:p.map(i=>(0,A.jsx)(`div`,{style:R,children:P.map(({name:a,props:o})=>(0,j.createElement)(s,{...o,className:r?void 0:`pseudo-${n}`,color:e,"data-testid":`tag`,disabled:r,key:a,label:`Tag Label`,onClick:()=>{},sdsStyle:t,size:i}))},i))})}var k,A,j,M,N,P,F,I,L,R,z,B=t((()=>{a(),k=e(n()),o(),c(),A=e(r()),j=e(n()),M=[...b,`disabled`],N=[...u.map(e=>({color:e,name:e})),{color:v,name:`custom`}],P=[{name:`text`,props:{}},{name:`text + icon + link`,props:{icon:(0,A.jsx)(i,{weight:`bold`}),showLinkIcon:!0}},{name:`icon only`,props:{icon:(0,A.jsx)(i,{weight:`bold`}),iconOnly:!0}}],F={..._,display:`flex`,flexDirection:`column`,gap:40},I={alignItems:`center`,columnGap:32,display:`grid`,gridTemplateColumns:`max-content repeat(${M.length}, max-content)`,rowGap:16},L={display:`flex`,flexDirection:`column`,gap:8},R={alignItems:`center`,display:`flex`,gap:8},z=()=>(0,A.jsx)(`div`,{style:F,children:m.map(e=>(0,A.jsxs)(`section`,{children:[(0,A.jsxs)(`h2`,{children:[`sdsStyle: `,(0,A.jsx)(`b`,{children:e})]}),(0,A.jsxs)(`div`,{style:I,children:[(0,A.jsx)(`span`,{}),M.map(e=>(0,A.jsx)(`b`,{children:e},e)),N.map(({color:t,name:n})=>(0,A.jsxs)(k.Fragment,{children:[(0,A.jsx)(`b`,{children:n}),M.map(n=>(0,A.jsx)(O,{color:t,sdsStyle:e,state:n},n))]},n))]})]},e))})})),V,H,U=t((()=>{o(),V=e(r()),H=e=>{let{label:t}=e;return(0,V.jsx)(s,{label:t,...e,"data-testid":`tags`})}})),W,G,K,q,J,Y,X;t((()=>{c(),D(),B(),U(),W=e(r()),G={argTypes:{color:{control:{labels:f,type:`select`},description:"One of the seven intents, or CSS colors for a tag the intents do not cover: `[label, background]` or `[label, background, icon]`. The icon takes the label color when the third value is left out.",mapping:d,options:Object.keys(d),table:{defaultValue:{summary:`neutral`}}},disabled:{control:{type:`boolean`},description:`Greys the tag out. On a clickable tag or a link it also takes the tag out of the tab order.`,table:{defaultValue:{summary:`false`}}},href:{control:{labels:h,type:`select`},description:"Turns the tag into a link. It renders as an `<a>` unless `component` says otherwise, as with a router's link component.",mapping:l,options:Object.keys(l)},icon:{control:{labels:S,type:`select`},description:"An icon on the leading edge, usually a Phosphor or `@czi-sds/icons` icon. The tag draws it at its own icon size and color.",mapping:y,options:Object.keys(y)},iconOnly:{control:{type:`boolean`},description:`Draws only the icon, in a square tag. The label is hidden from view but stays the tag's accessible name. Has no effect without an icon.`,table:{defaultValue:{summary:`false`}}},label:{control:{type:`text`},description:`The tag's text, and its accessible name. It is cut off with an ellipsis rather than wrapped, so keep it to a word or two. An icon-only tag still needs it: the text is hidden from view but read by screen readers.`,required:!0},onClick:{control:{labels:g,type:`select`},description:`MUI's prop. Makes the tag a button: a tab stop that answers Enter and Space, with hover and pressed states.`,mapping:w,options:Object.keys(w)},sdsStyle:{control:{type:`radio`},description:"`solid` fills the tag with the intent color. `outline` tints the fill and draws the label, the icons and a 1px border in the intent color.",options:m,table:{defaultValue:{summary:`solid`}}},showLinkIcon:{control:{type:`boolean`},description:"Adds an arrow after the label to say the tag leads somewhere. Usually paired with `href`, though a tag can be a link without it.",table:{defaultValue:{summary:`false`}}},size:{control:{type:`radio`},description:"`medium` is 24px tall with a 13px label and 12px icons, `small` is 20px tall with a 10px label and 10px icons.",options:p,table:{defaultValue:{summary:`medium`}}}},component:E,parameters:{a11y:{config:{rules:[{enabled:!1,id:C}]}}},title:`Components/Tag`},K={args:{disabled:!1,iconOnly:!1,label:`Label`,sdsStyle:`solid`,showLinkIcon:!1,size:`medium`}},q={parameters:{controls:{exclude:x}},render:()=>(0,W.jsx)(z,{})},J={globals:{theme:`dark`},parameters:{controls:{exclude:x},snapshot:{skip:!0}},render:()=>(0,W.jsx)(z,{})},Y={args:{label:`Label`},parameters:{controls:{exclude:x},snapshot:{skip:!0}},render:e=>(0,W.jsx)(H,{...e})},X=[`Default`,`ScreenshotTest`,`ScreenshotTestDark`,`Test`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    iconOnly: false,
    label: "Label",
    sdsStyle: "solid",
    showLinkIcon: false,
    size: "medium"
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS
    }
  },
  render: (): JSX.Element => <ScreenshotTestDemo />
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: "dark"
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (): JSX.Element => <ScreenshotTestDemo />
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...Y.parameters?.docs?.source}}}}))();export{K as Default,q as ScreenshotTest,J as ScreenshotTestDark,Y as Test,X as __namedExportsOrder,G as default};