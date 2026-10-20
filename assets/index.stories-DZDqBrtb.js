import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-8L1H2VAU.js";import{n as i,t as a}from"./Icon-CGj7VeJw.js";import{n as o,t as s}from"./Callout-C7uWxTo4.js";import{n as c,t as l}from"./Tag-DgB8Mr-M.js";import{_ as u,a as ee,c as d,d as f,f as p,g as m,h,i as g,l as te,m as ne,n as _,o as re,p as v,r as y,s as b,t as x,u as S,v as C}from"./constants-DlKjM75n.js";var w,T,E=e((()=>{o(),i(),c(),w=t(r()),T=e=>{let{label:t,sdsSize:n,icon:r}=e,i=typeof r==`string`?(0,w.jsx)(a,{sdsSize:n,sdsIcon:r}):r;return n===`l`&&!r?(0,w.jsx)(s,{intent:`negative`,title:`Invalid Props!`,body:`The large-size tag must include an icon. Please choose an icon from the controls section or switch the Tag size to small.`}):(0,w.jsx)(l,{label:t,...e,sdsSize:n,icon:i})}}));function D({props:e,colors:t,types:n}){return(0,N.jsx)(N.Fragment,{children:h.map(r=>(0,N.jsx)(O,{colors:t,types:n,props:e,sdsStyle:r},r))})}function O({colors:e,types:t,sdsStyle:n,props:r}){return(0,N.jsxs)(`div`,{style:{columnGap:`20px`,display:`inline-grid`,fontFamily:`sans-serif`,marginRight:`50px`},children:[(0,N.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 6`,marginBottom:0},children:[`Style: `,(0,N.jsx)(`b`,{children:n})]}),e.map(e=>(0,N.jsx)(k,{sdsStyle:n,color:e,types:t,props:r},String(e)))]})}function k({sdsStyle:e,color:t,types:n,props:r}){return(0,N.jsxs)(`div`,{style:y,children:[(0,N.jsxs)(`p`,{style:{...S,borderWidth:`5px`,fontSize:`1.5em`,margin:`20px 0 0 0`},children:[`Color: `,(0,N.jsx)(`b`,{children:typeof t==`string`?t:`custom`})]}),n.map(i=>n.includes(`secondary`)&&i===`primary`&&t===`neutral`?null:(0,N.jsx)(A,{sdsStyle:e,color:t,sdsType:i,props:r},i))]})}function A({sdsStyle:e,color:t,sdsType:n,props:r}){return(0,N.jsxs)(`div`,{style:y,children:[(0,N.jsxs)(`p`,{style:{...S,borderWidth:`2px`,fontSize:`1.17em`,margin:`20px 0`},children:[`Type: `,(0,N.jsx)(`b`,{children:n})]}),ne.map(i=>(0,N.jsx)(j,{sdsStyle:e,color:t,sdsType:n,icon:i,props:r},String(i)))]})}function j({sdsStyle:e,color:t,sdsType:n,icon:r,props:i}){return(0,N.jsxs)(`div`,{style:y,children:[(0,N.jsxs)(`p`,{style:{...S,alignSelf:`end`,borderWidth:`1px`,fontSize:`0.83em`,margin:`0 0 5px 0`},children:[`Icon: `,(0,N.jsx)(`b`,{children:r?`yes`:`no`})]}),b.map(a=>(0,P.createElement)(M,{...i,sdsStyle:e,color:t,sdsType:n,icon:r,hover:a,key:String(a)}))]})}function M(e){let{sdsStyle:t,color:n,sdsType:r,icon:i,hover:a}=e,o=[`default`,`hover`,`active`,`focus-visible`],s={display:`contents`},c={fontSize:`0.67em`,margin:`10px 0`},u={marginBottom:10};return(0,N.jsx)(`div`,{style:s,children:o.map(o=>(0,N.jsx)(`div`,{style:u,children:(a===!0||a===!1&&o==="default")&&(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(`p`,{style:c,children:[a?`State: `:`Hoverable: `,(0,N.jsx)(`br`,{}),(0,N.jsx)(`b`,{children:a?o:`false`})]}),(0,P.createElement)(l,{...e,label:`Label`,"data-testid":`tag`,sdsStyle:t,color:n,sdsType:r,icon:i,hover:a,className:a?`pseudo-${o}`:`pseudo-default`,key:o})]})},o))})}var N,P,F=e((()=>{n(),c(),C(),N=t(r()),P=t(n())}));function ie(e){return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`p`,{style:v,children:"This story currently excludes Tags with both `sdsType` of `primary` and `color` of `gray`, and those with `color` of `success` and `primary`, because they do not pass the a11y tests. They have their own stories wherein the a11y tests are disabled until the a11y tests are updated to accommodate APCA (for gray x primary) or until the Tag colors are updated by design (for success and primary)."}),(0,I.jsx)(D,{props:e,colors:x,types:m})]})}var I,L=e((()=>{C(),F(),I=t(r())}));function ae(e){return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(`p`,{style:v,children:"Tags with `color` of `gray` and `sdsType` of `primary` have their own story here because they do not currently pass the a11y tests. However, design has manually tested them with APCA, and they are accessible; our tests just do not use APCA yet. In the meantime, the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly."}),(0,R.jsx)(D,{props:e,colors:ee,types:re})]})}var R,z=e((()=>{C(),F(),R=t(r())}));function B(e){return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`p`,{style:v,children:"Tags with `color` of `success` or `warning`have their own story here because they do not currently pass the a11y tests. Design is aware of this and will be updating their colors. In the meantime the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly."}),(0,V.jsx)(D,{props:e,colors:u,types:m})]})}var V,H=e((()=>{C(),F(),V=t(r())})),U,W,G=e((()=>{c(),U=t(r()),W=e=>{let{label:t}=e;return(0,U.jsx)(l,{label:t,...e,"data-testid":`tags`})}})),K,q,J,Y,X,Z,Q,$;e((()=>{C(),E(),L(),z(),H(),G(),K=t(r()),q={argTypes:{color:{control:{labels:{custom:`Custom colors for Label, Background, Icon`},type:`select`},description:"The tag's intent, given either as one of the six names or as CSS colors: `[label color, background color]`, which keeps the icon white, or `[label color, background color, icon color]`.",mapping:p,options:Object.keys(p),table:{defaultValue:{summary:`neutral`}}},hover:{control:{type:`boolean`},description:`Whether the tag responds to the pointer with a darker fill and a pointer cursor. False removes the tag from pointer events altogether, which also keeps a surrounding Tooltip from opening.`,table:{defaultValue:{summary:`true`}}},icon:{control:{labels:te,type:`select`},description:`Icon element.`,mapping:d,options:Object.keys(d)},label:{control:{type:`text`},description:`The tag's text, and its accessible name. It is cut off with an ellipsis rather than wrapped, so keep it to a word or two.`,required:!0},onClick:{control:{labels:{action:`() => {}`,none:`undefined`},type:`select`},description:`MUI's prop. Makes the tag a button: a tab stop that answers Enter and Space.`,mapping:f,options:Object.keys(f)},sdsSize:{control:{type:`radio`},description:`The size of the tag: an 11px label with a 12px icon, or a 13px label with a 24px icon. A large tag has to have an icon.`,options:[`s`,`l`],table:{defaultValue:{summary:`s`}}},sdsStyle:{control:{type:`radio`},description:`The shape of the tag. The design guidance treats rounded as the default for the system, so it is usually worth passing.`,options:[`rounded`,`square`],table:{defaultValue:{summary:`square`}}},sdsType:{control:{type:`radio`},description:`primary fills the tag with the intent color and sets the label white. secondary tints the fill and keeps the label and a 1px border in the intent color.`,options:[`primary`,`secondary`],table:{defaultValue:{summary:`primary`}}}},component:T,parameters:{a11y:{config:{rules:[{enabled:!1,id:_}]}}},title:`Components/Tag`},J={args:{hover:!0,label:`Label`,sdsSize:`s`,sdsStyle:`square`,sdsType:`primary`}},Y={args:{color:x[0],hover:b[0],label:`Label`,sdsStyle:h[0],sdsType:m[0]},parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(ie,{...e})},X={args:{color:x[0],hover:b[0],label:`Label`,sdsStyle:h[0],sdsType:m[0]},parameters:{a11y:{config:{rules:[{enabled:!1,id:_}]}},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(ae,{...e})},Z={args:{color:x[0],hover:b[0],label:`Label`,sdsStyle:h[0],sdsType:m[0]},parameters:{a11y:{config:{rules:[{enabled:!1,id:_}]}},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(B,{...e})},Q={args:{label:`Label`},parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,K.jsx)(W,{...e})},$=[`Default`,`ScreenshotTest`,`GrayPrimaryScreenshotTest`,`SuccessWarningScreenshotTest`,`Test`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
    a11y: {
      // \`color-contrast\` is disabled for this test because design tested it with
      // APCA and determined these colors pass, our test just isn't able to use APCA
      // yet; this color was pulled into its own story so the remaining colors can be
      // tested separately
      config: {
        rules: [{
          enabled: false,
          id: TAG_COLOR_CONTRAST_RULE
        }]
      }
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
    a11y: {
      // \`color-contrast\` is disabled for this test because it is now a known
      // issue and design will work on adjusting the colors so that they pass;
      // these colors were pulled into their own story so the remaining colors
      // can be tested separately
      config: {
        rules: [{
          enabled: false,
          id: TAG_COLOR_CONTRAST_RULE
        }]
      }
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
}`,...Q.parameters?.docs?.source}}}}))();export{J as Default,X as GrayPrimaryScreenshotTest,Y as ScreenshotTest,Z as SuccessWarningScreenshotTest,Q as Test,$ as __namedExportsOrder,q as default};