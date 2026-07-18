import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r}from"./iframe-ZT52KRhI.js";import{n as i,t as a}from"./Icon-CXgj2pi8.js";import{n as o,t as s}from"./Callout-CoKAp_EW.js";import{n as c,t as l}from"./Tag-yY7MQ2bx.js";import{_ as u,a as ee,c as d,d as f,f as p,g as m,h,i as g,l as te,m as ne,n as _,o as re,p as v,r as y,s as b,t as x,u as S,v as C}from"./constants-6uGCiLD8.js";var w,T,E=t((()=>{o(),i(),c(),w=r(),T=e=>{let{label:t,sdsSize:n,icon:r}=e,i=typeof r==`string`?(0,w.jsx)(a,{sdsSize:n,sdsIcon:r}):r;return n===`l`&&!r?(0,w.jsx)(s,{intent:`negative`,title:`Invalid Props!`,body:`The large-size tag must include an icon. Please choose an icon from the controls section or switch the Tag size to small.`}):(0,w.jsx)(l,{label:t,...e,sdsSize:n,icon:i})}}));function D({props:e,colors:t,types:n}){return(0,N.jsx)(N.Fragment,{children:h.map(r=>(0,N.jsx)(O,{colors:t,types:n,props:e,sdsStyle:r},r))})}function O({colors:e,types:t,sdsStyle:n,props:r}){return(0,N.jsxs)(`div`,{style:{columnGap:`20px`,display:`inline-grid`,fontFamily:`sans-serif`,marginRight:`50px`},children:[(0,N.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 6`,marginBottom:0},children:[`Style: `,(0,N.jsx)(`b`,{children:n})]}),e.map(e=>(0,N.jsx)(k,{sdsStyle:n,color:e,types:t,props:r},String(e)))]})}function k({sdsStyle:e,color:t,types:n,props:r}){return(0,N.jsxs)(`div`,{style:y,children:[(0,N.jsxs)(`p`,{style:{...S,borderWidth:`5px`,fontSize:`1.5em`,margin:`20px 0 0 0`},children:[`Color: `,(0,N.jsx)(`b`,{children:typeof t==`string`?t:`custom`})]}),n.map(i=>n.includes(`secondary`)&&i===`primary`&&t===`neutral`?null:(0,N.jsx)(A,{sdsStyle:e,color:t,sdsType:i,props:r},i))]})}function A({sdsStyle:e,color:t,sdsType:n,props:r}){return(0,N.jsxs)(`div`,{style:y,children:[(0,N.jsxs)(`p`,{style:{...S,borderWidth:`2px`,fontSize:`1.17em`,margin:`20px 0`},children:[`Type: `,(0,N.jsx)(`b`,{children:n})]}),ne.map(i=>(0,N.jsx)(j,{sdsStyle:e,color:t,sdsType:n,icon:i,props:r},String(i)))]})}function j({sdsStyle:e,color:t,sdsType:n,icon:r,props:i}){return(0,N.jsxs)(`div`,{style:y,children:[(0,N.jsxs)(`p`,{style:{...S,alignSelf:`end`,borderWidth:`1px`,fontSize:`0.83em`,margin:`0 0 5px 0`},children:[`Icon: `,(0,N.jsx)(`b`,{children:r?`yes`:`no`})]}),b.map(a=>(0,P.createElement)(M,{...i,sdsStyle:e,color:t,sdsType:n,icon:r,hover:a,key:String(a)}))]})}function M(e){let{sdsStyle:t,color:n,sdsType:r,icon:i,hover:a}=e,o=[`default`,`hover`,`active`,`focus-visible`],s={display:`contents`},c={fontSize:`0.67em`,margin:`10px 0`},u={marginBottom:10};return(0,N.jsx)(`div`,{style:s,children:o.map(o=>(0,N.jsx)(`div`,{style:u,children:(a===!0||a===!1&&o==="default")&&(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(`p`,{style:c,children:[a?`State: `:`Hoverable: `,(0,N.jsx)(`br`,{}),(0,N.jsx)(`b`,{children:a?o:`false`})]}),(0,P.createElement)(l,{...e,label:`Label`,"data-testid":`tag`,sdsStyle:t,color:n,sdsType:r,icon:i,hover:a,className:a?`pseudo-${o}`:`pseudo-default`,key:o})]})},o))})}var N,P,F=t((()=>{n(),c(),C(),N=r(),P=e(n())}));function ie(e){return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`p`,{style:v,children:"This story currently excludes Tags with both `sdsType` of `primary` and `color` of `gray`, and those with `color` of `success` and `primary`, because they do not pass the a11y tests. They have their own stories wherein the a11y tests are disabled until the a11y tests are updated to accommodate APCA (for gray x primary) or until the Tag colors are updated by design (for success and primary)."}),(0,I.jsx)(D,{props:e,colors:x,types:m})]})}var I,L=t((()=>{C(),F(),I=r()}));function ae(e){return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(`p`,{style:v,children:"Tags with `color` of `gray` and `sdsType` of `primary` have their own story here because they do not currently pass the a11y tests. However, design has manually tested them with APCA, and they are accessible; our tests just do not use APCA yet. In the meantime, the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly."}),(0,R.jsx)(D,{props:e,colors:ee,types:re})]})}var R,z=t((()=>{C(),F(),R=r()}));function B(e){return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`p`,{style:v,children:"Tags with `color` of `success` or `warning`have their own story here because they do not currently pass the a11y tests. Design is aware of this and will be updating their colors. In the meantime the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly."}),(0,V.jsx)(D,{props:e,colors:u,types:m})]})}var V,H=t((()=>{C(),F(),V=r()})),U,W,G=t((()=>{c(),U=r(),W=e=>{let{label:t}=e;return(0,U.jsx)(l,{label:t,...e,"data-testid":`tags`})}})),K,q,J,Y,X,Z,Q,$;t((()=>{C(),E(),L(),z(),H(),G(),K=r(),q={argTypes:{color:{control:{labels:[`info`,`positive`,`notice`,`negative`,`beta`,`Custom colors for Label, Background, Icon`],type:`select`},mapping:p,options:Object.keys(p)},hover:{control:{type:`boolean`}},icon:{control:{labels:te,type:`select`},mapping:d,options:Object.keys(d)},label:{control:{type:`text`},required:!0},onClick:{control:{labels:[`() => {}`,`undefined`],type:`select`},mapping:f,options:Object.keys(f)},sdsSize:{control:{type:`radio`},options:[`s`,`l`]},sdsStyle:{control:{type:`radio`},options:[`rounded`,`square`]},sdsType:{control:{type:`radio`},options:[`primary`,`secondary`]}},component:T,parameters:{axe:{disabledRules:[_]}},title:`Components/Tag`},J={args:{hover:!0,label:`Label`,sdsSize:`s`,sdsStyle:`square`,sdsType:`primary`}},Y={args:{color:x[0],hover:b[0],label:`Label`,sdsStyle:h[0],sdsType:m[0]},parameters:{axe:{timeout:10*1e3},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(ie,{...e})},X={args:{color:x[0],hover:b[0],label:`Label`,sdsStyle:h[0],sdsType:m[0]},parameters:{axe:{disabledRules:[_],timeout:10*1e3},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(ae,{...e})},Z={args:{color:x[0],hover:b[0],label:`Label`,sdsStyle:h[0],sdsType:m[0]},parameters:{axe:{disabledRules:[_],timeout:10*1e3},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(B,{...e})},Q={args:{label:`Label`},parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(W,{...e})},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    hover: true,
    label: "Label",
    sdsSize: "s",
    sdsStyle: "square",
    sdsType: "primary"
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0]
  },
  parameters: {
    axe: {
      timeout: 10 * 1000
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (props: Args): JSX.Element => <ScreenshotTestDemo {...props} />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0]
  },
  parameters: {
    axe: {
      // \`color-contrast\` is disabled for this test because design tested it with
      // APCA and determined these colors pass, our test just isn't able to use APCA
      // yet; this color was pulled into its own story so the remaining colors can be
      // tested separately
      disabledRules: [TAG_COLOR_CONTRAST_RULE],
      timeout: 10 * 1000
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (props: Args): JSX.Element => <GrayPrimaryScreenshotTestDemo {...props} />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0]
  },
  parameters: {
    axe: {
      // \`color-contrast\` is disabled for this test because it is now a known
      // issue and design will work on adjusting the colors so that they pass;
      // these colors were pulled into their own story so the remaining colors
      // can be tested separately
      disabledRules: [TAG_COLOR_CONTRAST_RULE],
      timeout: 10 * 1000
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (props: Args): JSX.Element => <SuccessWarningScreenshotTestDemo {...props} />
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`ScreenshotTest`,`GrayPrimaryScreenshotTest`,`SuccessWarningScreenshotTest`,`Test`]}))();export{J as Default,X as GrayPrimaryScreenshotTest,Y as ScreenshotTest,Z as SuccessWarningScreenshotTest,Q as Test,$ as __namedExportsOrder,q as default};