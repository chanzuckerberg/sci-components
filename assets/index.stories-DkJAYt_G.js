import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{n as i,t as a}from"./Icon-DpYImm5o.js";import{n as o,t as s}from"./Callout-BVhNhxYM.js";import{n as c,t as l}from"./TagLegacy-BAqsfkor.js";import{n as u,t as d}from"./icons-material-rEkmWPVI.js";import{n as ee,t as te}from"./customSvgIcon-ULG9WQaF.js";var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j=e((()=>{i(),d(),ee(),f=t(r()),{action:p}=__STORYBOOK_MODULE_ACTIONS__,m=[`color`,`hover`,`label`,`sdsSize`,`sdsStyle`,`sdsType`,`icon`],h=[void 0,`CheckCircle`,`Loading`,`ExclamationMarkCircle`,`Person`,(0,f.jsx)(u,{},`WBSunny`),(0,f.jsx)(te,{},`CustomSvgIcon`)],g=[`No Icon`,`SDS Check Circle`,`SDS Loading`,`SDS Exclamation Mark`,`SDS Person`,`MUI Wb Sunny`,`Custom SVG Icon`],_=[`rounded`,`square`],v=[`primary`,`secondary`],y=[p(`onClick`),void 0],b=`color-contrast`,x=[`info`,`positive`,`notice`,`negative`,`beta`,[`#000000`,`#C65FA7`,`#FFD400`]],S={fontFamily:`sans-serif`},C=x.slice(0,8).splice(2,2),w={display:`contents`},T={borderStyle:`solid none none none`,gridColumn:`1 / 6`,justifySelf:`stretch`,paddingTop:10},E=[void 0,(0,f.jsx)(a,{sdsSize:`l`,sdsIcon:`CheckCircle`},`CheckCircle`)],D=[!0,!1],O=[`neutral`],k=[`primary`],A=[`positive`,`notice`]})),M,N,ne=e((()=>{o(),i(),c(),M=t(r()),N=e=>{let{label:t,sdsSize:n,icon:r}=e,i=typeof r==`string`?(0,M.jsx)(a,{sdsSize:n,sdsIcon:r}):r;return n===`l`&&!r?(0,M.jsx)(s,{intent:`negative`,title:`Invalid Props!`,body:`The large-size tag must include an icon. Please choose an icon from the controls section or switch the Tag size to small.`}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(s,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,M.jsx)(a,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,M.jsxs)(M.Fragment,{children:[`The `,(0,M.jsx)(`strong`,{children:`TagLegacy`}),` component is deprecated!`,(0,M.jsx)(`br`,{}),`Please use `,(0,M.jsx)(`strong`,{children:`Tag`}),` component instead.`]})}),(0,M.jsx)(l,{label:t,...e,sdsSize:n,icon:i})]})}}));function P({props:e,colors:t,types:n}){return(0,R.jsx)(R.Fragment,{children:_.map(r=>(0,R.jsx)(re,{colors:t,types:n,props:e,sdsStyle:r},r))})}function re({colors:e,types:t,sdsStyle:n,props:r}){return(0,R.jsxs)(`div`,{style:{columnGap:`20px`,display:`inline-grid`,fontFamily:`sans-serif`,marginRight:`50px`},children:[(0,R.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 6`,marginBottom:0},children:[`Style: `,(0,R.jsx)(`b`,{children:n})]}),e.map(e=>(0,R.jsx)(ie,{sdsStyle:n,color:e,types:t,props:r},String(e)))]})}function ie({sdsStyle:e,color:t,types:n,props:r}){return(0,R.jsxs)(`div`,{style:w,children:[(0,R.jsxs)(`p`,{style:{...T,borderWidth:`5px`,fontSize:`1.5em`,margin:`20px 0 0 0`},children:[`Color: `,(0,R.jsx)(`b`,{children:typeof t==`string`?t:`custom`})]}),n.map(i=>n.includes(`secondary`)&&i===`primary`&&t===`neutral`?null:(0,R.jsx)(F,{sdsStyle:e,color:t,sdsType:i,props:r},i))]})}function F({sdsStyle:e,color:t,sdsType:n,props:r}){return(0,R.jsxs)(`div`,{style:w,children:[(0,R.jsxs)(`p`,{style:{...T,borderWidth:`2px`,fontSize:`1.17em`,margin:`20px 0`},children:[`Type: `,(0,R.jsx)(`b`,{children:n})]}),E.map(i=>(0,R.jsx)(I,{sdsStyle:e,color:t,sdsType:n,icon:i,props:r},String(i)))]})}function I({sdsStyle:e,color:t,sdsType:n,icon:r,props:i}){return(0,R.jsxs)(`div`,{style:w,children:[(0,R.jsxs)(`p`,{style:{...T,alignSelf:`end`,borderWidth:`1px`,fontSize:`0.83em`,margin:`0 0 5px 0`},children:[`Icon: `,(0,R.jsx)(`b`,{children:r?`yes`:`no`})]}),D.map(a=>(0,z.createElement)(L,{...i,sdsStyle:e,color:t,sdsType:n,icon:r,hover:a,key:String(a)}))]})}function L(e){let{sdsStyle:t,color:n,sdsType:r,icon:i,hover:a}=e,o=[`default`,`hover`,`active`,`focus-visible`],s={display:`contents`},c={fontSize:`0.67em`,margin:`10px 0`},u={marginBottom:10};return(0,R.jsx)(`div`,{style:s,children:o.map(o=>(0,R.jsx)(`div`,{style:u,children:(a===!0||a===!1&&o==="default")&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(`p`,{style:c,children:[a?`State: `:`Hoverable: `,(0,R.jsx)(`br`,{}),(0,R.jsx)(`b`,{children:a?o:`false`})]}),(0,z.createElement)(l,{...e,label:`Label`,"data-testid":`tag`,sdsStyle:t,color:n,sdsType:r,icon:i,hover:a,className:a?`pseudo-${o}`:`pseudo-default`,key:o})]})},o))})}var R,z,B=e((()=>{n(),c(),j(),R=t(r()),z=t(n())}));function ae(e){return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`p`,{style:S,children:"This story currently excludes Tags with both `sdsType` of `primary` and `color` of `gray`, and those with `color` of `success` and `primary`, because they do not pass the a11y tests. They have their own stories wherein the a11y tests are disabled until the a11y tests are updated to accommodate APCA (for gray x primary) or until the Tag colors are updated by design (for success and primary)."}),(0,V.jsx)(P,{props:e,colors:C,types:v})]})}var V,oe=e((()=>{j(),B(),V=t(r())}));function se(e){return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`p`,{style:S,children:"Tags with `color` of `gray` and `sdsType` of `primary` have their own story here because they do not currently pass the a11y tests. However, design has manually tested them with APCA, and they are accessible; our tests just do not use APCA yet. In the meantime, the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly."}),(0,H.jsx)(P,{props:e,colors:O,types:k})]})}var H,ce=e((()=>{j(),B(),H=t(r())}));function le(e){return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`p`,{style:S,children:"Tags with `color` of `success` or `warning`have their own story here because they do not currently pass the a11y tests. Design is aware of this and will be updating their colors. In the meantime the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly."}),(0,U.jsx)(P,{props:e,colors:A,types:v})]})}var U,ue=e((()=>{j(),B(),U=t(r())})),W,G,de=e((()=>{c(),W=t(r()),G=e=>{let{label:t}=e;return(0,W.jsx)(l,{label:t,...e,"data-testid":`tags`})}})),K,q,J,Y,X,Z,Q,$;e((()=>{j(),ne(),oe(),ce(),ue(),de(),K=t(r()),q={argTypes:{color:{control:{labels:[`info`,`positive`,`notice`,`negative`,`beta`,`Custom colors for Label, Background, Icon`],type:`select`},mapping:x,options:Object.keys(x)},hover:{control:{type:`boolean`}},icon:{control:{labels:g,type:`select`},mapping:h,options:Object.keys(h)},label:{control:{type:`text`},required:!0},onClick:{control:{labels:[`() => {}`,`undefined`],type:`select`},mapping:y,options:Object.keys(y)},sdsSize:{control:{type:`radio`},options:[`s`,`l`]},sdsStyle:{control:{type:`radio`},options:[`rounded`,`square`]},sdsType:{control:{type:`radio`},options:[`primary`,`secondary`]}},component:N,parameters:{a11y:{config:{rules:[{enabled:!1,id:b}]}}},title:`Deprecated/TagLegacy`},J={args:{hover:!0,label:`Label`,sdsSize:`s`,sdsStyle:`square`,sdsType:`primary`}},Y={args:{color:C[0],hover:D[0],label:`Label`,sdsStyle:_[0],sdsType:v[0]},parameters:{controls:{exclude:m},snapshot:{skip:!0}},render:e=>(0,K.jsx)(ae,{...e})},X={args:{color:C[0],hover:D[0],label:`Label`,sdsStyle:_[0],sdsType:v[0]},parameters:{a11y:{config:{rules:[{enabled:!1,id:b}]}},controls:{exclude:m},snapshot:{skip:!0}},render:e=>(0,K.jsx)(se,{...e})},Z={args:{color:C[0],hover:D[0],label:`Label`,sdsStyle:_[0],sdsType:v[0]},parameters:{a11y:{config:{rules:[{enabled:!1,id:b}]}},controls:{exclude:m},snapshot:{skip:!0}},render:e=>(0,K.jsx)(le,{...e})},Q={args:{label:`Label`},parameters:{controls:{exclude:m},snapshot:{skip:!0}},render:e=>(0,K.jsx)(G,{...e})},$=[`Default`,`ScreenshotTest`,`GrayPrimaryScreenshotTest`,`SuccessWarningScreenshotTest`,`Test`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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