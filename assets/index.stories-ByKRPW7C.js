import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-s0DqqZ6S.js";import{n as i,t as a}from"./Button-Knlg9A8k.js";import{a as o,n as s}from"./utils-BxIa431Z.js";import{a as c,i as l,n as u,o as d,r as f,t as p}from"./Dialog-DAYk-H5b.js";import{n as m,t as h}from"./DialogContent-8C1Eiipk.js";import{o as g,t as _}from"./loremIpsum-BqYjZDri.js";var v,y,b,x=e((()=>{v=t(n()),i(),u(),d(),m(),l(),g(),y=t(r()),b=e=>{let{buttonPosition:t,longContent:n=!1,isOpen:r=!1,titleOnClose:i,sdsSize:o,...s}=e,[l,u]=(0,v.useState)(r);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(a,{size:`large`,sdsStyle:`minimal`,sdsType:`primary`,onClick:m,children:[`Open `,o.toUpperCase()]}),(0,y.jsxs)(p,{onClose:g,open:l,sdsSize:o,...s,children:[(0,y.jsx)(c,{title:`Title`,subtitle:`Optional Subtitle`,overline:`Optional Overline`,onClose:i?g:void 0,"data-testid":`dialog-title`}),(0,y.jsx)(h,{"data-testid":`dialog-content`,children:n?_:`Content Module`}),(0,y.jsx)(f,{"data-testid":`dialog-actions`,buttonPosition:t,children:(0,y.jsx)(d,{})})]})]});function d(){return t===`left`?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a,{size:`large`,sdsStyle:`solid`,sdsType:`primary`,onClick:g,children:`Primary Action`}),(0,y.jsx)(a,{size:`large`,sdsStyle:`outline`,sdsType:`primary`,onClick:g,children:`Secondary Action`})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a,{size:`large`,sdsStyle:`outline`,sdsType:`primary`,onClick:g,children:`Secondary Action`}),(0,y.jsx)(a,{size:`large`,sdsStyle:`solid`,sdsType:`primary`,onClick:g,children:`Primary Action`})]})}function m(){u(!0)}function g(){u(!1)}}})),S,C=e((()=>{S=[`canClickOutsideClose`,`buttonPosition`,`longContent`,`titleOnClose`,`sdsSize`]}));function w(e){let t={...e,isOpen:!0,titleOnClose:!0};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(b,{sdsSize:`xs`,...t}),(0,T.jsx)(b,{sdsSize:`s`,...t}),(0,T.jsx)(b,{sdsSize:`m`,...t}),(0,T.jsx)(b,{sdsSize:`l`,...t})]})}var T,E=e((()=>{x(),T=t(r())}));function D(e){return(0,O.jsx)(b,{sdsSize:`xs`,...e,isOpen:!0})}var O,k=e((()=>{x(),O=t(r())}));function A(e){return(0,j.jsx)(b,{sdsSize:`xs`,...e,isOpen:!0,buttonPosition:`left`})}var j,M=e((()=>{x(),j=t(r())})),N,P,F,I,L,R,z;e((()=>{x(),C(),E(),k(),M(),o(),N=t(r()),P={argTypes:{buttonPosition:{control:{type:s},options:[`left`,`right`]},canClickOutsideClose:{control:{type:`boolean`}},longContent:{control:{type:`boolean`}},sdsSize:{control:{type:s},options:[`xs`,`s`,`m`,`l`]},titleOnClose:{control:{type:`boolean`}}},component:b,title:`Components/Dialog`},F={args:{buttonPosition:`right`,longContent:!0,sdsSize:`m`,titleOnClose:!1}},I={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(w,{...e})},L={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(D,{...e})},R={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(A,{...e})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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