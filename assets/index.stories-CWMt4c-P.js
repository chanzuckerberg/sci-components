import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Qa as r}from"./iframe-DocVhSSI.js";import{o as i,t as a}from"./loremIpsum-BqYjZDri.js";import{a as o,n as s}from"./utils-BxIa431Z.js";import{n as c,t as l}from"./Button-CfkvkcRt.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./Dialog-CucxiFH7.js";import{n as g,t as _}from"./DialogContent-Ba2pZycp.js";var v,y,b,x=e((()=>{v=t(r()),c(),f(),p(),g(),d(),i(),y=n(),b=e=>{let{buttonPosition:t,longContent:n=!1,isOpen:r=!1,titleOnClose:i,sdsSize:o,...s}=e,[c,d]=(0,v.useState)(r);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(l,{size:`large`,sdsStyle:`minimal`,sdsType:`primary`,onClick:p,children:[`Open `,o.toUpperCase()]}),(0,y.jsxs)(h,{onClose:g,open:c,sdsSize:o,...s,children:[(0,y.jsx)(u,{title:`Title`,subtitle:`Optional Subtitle`,overline:`Optional Overline`,onClose:i?g:void 0,"data-testid":`dialog-title`}),(0,y.jsx)(_,{"data-testid":`dialog-content`,children:n?a:`Content Module`}),(0,y.jsx)(m,{"data-testid":`dialog-actions`,buttonPosition:t,children:(0,y.jsx)(f,{})})]})]});function f(){return t===`left`?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(l,{size:`large`,sdsStyle:`solid`,sdsType:`primary`,onClick:g,children:`Primary Action`}),(0,y.jsx)(l,{size:`large`,sdsStyle:`outline`,sdsType:`primary`,onClick:g,children:`Secondary Action`})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(l,{size:`large`,sdsStyle:`outline`,sdsType:`primary`,onClick:g,children:`Secondary Action`}),(0,y.jsx)(l,{size:`large`,sdsStyle:`solid`,sdsType:`primary`,onClick:g,children:`Primary Action`})]})}function p(){d(!0)}function g(){d(!1)}}})),S,C=e((()=>{S=[`canClickOutsideClose`,`buttonPosition`,`longContent`,`titleOnClose`,`sdsSize`]}));function w(e){let t={...e,isOpen:!0,titleOnClose:!0};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(b,{sdsSize:`xs`,...t}),(0,T.jsx)(b,{sdsSize:`s`,...t}),(0,T.jsx)(b,{sdsSize:`m`,...t}),(0,T.jsx)(b,{sdsSize:`l`,...t})]})}var T,E=e((()=>{x(),T=n()}));function D(e){return(0,O.jsx)(b,{sdsSize:`xs`,...e,isOpen:!0})}var O,k=e((()=>{x(),O=n()}));function A(e){return(0,j.jsx)(b,{sdsSize:`xs`,...e,isOpen:!0,buttonPosition:`left`})}var j,M=e((()=>{x(),j=n()})),N,P,F,I,L,R,z;e((()=>{x(),C(),E(),k(),M(),o(),N=n(),P={argTypes:{buttonPosition:{control:{type:s},options:[`left`,`right`]},canClickOutsideClose:{control:{type:`boolean`}},longContent:{control:{type:`boolean`}},sdsSize:{control:{type:s},options:[`xs`,`s`,`m`,`l`]},titleOnClose:{control:{type:`boolean`}}},component:b,title:`Components/Dialog`},F={args:{buttonPosition:`right`,longContent:!0,sdsSize:`m`,titleOnClose:!1}},I={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(w,{...e})},L={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(D,{...e})},R={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(A,{...e})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    buttonPosition: "right",
    longContent: true,
    sdsSize: "m",
    titleOnClose: false
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestNoTitleOnCloseDemo {...args} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestButtonPositionLeftDemo {...args} />
}`,...R.parameters?.docs?.source}}},z=[`Default`,`Test`,`TestNoTitleOnClose`,`TestButtonPositionLeft`]}))();export{F as Default,I as Test,R as TestButtonPositionLeft,L as TestNoTitleOnClose,z as __namedExportsOrder,P as default};