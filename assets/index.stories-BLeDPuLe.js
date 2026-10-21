import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./Button-DIf_3EkI.js";import{a as o,n as s}from"./utils-CbT4iKc5.js";import{a as c,i as l,n as u,o as d,r as f,t as p}from"./Dialog-FlZMwT6o.js";import{n as m,t as h}from"./DialogContent-h3tz38wD.js";import{o as g,t as _}from"./loremIpsum-_pZR57WL.js";var v,y,b,x=t((()=>{v=e(n()),i(),u(),d(),m(),l(),g(),y=e(r()),b=e=>{let{buttonPosition:t,longContent:n=!1,isOpen:r=!1,titleOnClose:i,sdsSize:o,...s}=e,[l,u]=(0,v.useState)(r);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(a,{size:`large`,sdsStyle:`minimal`,sdsType:`primary`,onClick:m,children:[`Open `,o.toUpperCase()]}),(0,y.jsxs)(p,{onClose:g,open:l,sdsSize:o,...s,children:[(0,y.jsx)(c,{title:`Title`,subtitle:`Optional Subtitle`,overline:`Optional Overline`,onClose:i?g:void 0,"data-testid":`dialog-title`}),(0,y.jsx)(h,{"data-testid":`dialog-content`,children:n?_:`Content Module`}),(0,y.jsx)(f,{"data-testid":`dialog-actions`,buttonPosition:t,children:(0,y.jsx)(d,{})})]})]});function d(){return t===`left`?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a,{size:`large`,sdsStyle:`solid`,sdsType:`primary`,onClick:g,children:`Primary Action`}),(0,y.jsx)(a,{size:`large`,sdsStyle:`outline`,sdsType:`primary`,onClick:g,children:`Secondary Action`})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a,{size:`large`,sdsStyle:`outline`,sdsType:`primary`,onClick:g,children:`Secondary Action`}),(0,y.jsx)(a,{size:`large`,sdsStyle:`solid`,sdsType:`primary`,onClick:g,children:`Primary Action`})]})}function m(){u(!0)}function g(){u(!1)}}})),S,C=t((()=>{S=[`canClickOutsideClose`,`buttonPosition`,`longContent`,`titleOnClose`,`sdsSize`]}));function w(e){let t={...e,isOpen:!0,titleOnClose:!0};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(b,{sdsSize:`xs`,...t}),(0,T.jsx)(b,{sdsSize:`s`,...t}),(0,T.jsx)(b,{sdsSize:`m`,...t}),(0,T.jsx)(b,{sdsSize:`l`,...t})]})}var T,E=t((()=>{x(),T=e(r())}));function D(e){return(0,O.jsx)(b,{sdsSize:`xs`,...e,isOpen:!0})}var O,k=t((()=>{x(),O=e(r())}));function A(e){return(0,j.jsx)(b,{sdsSize:`xs`,...e,isOpen:!0,buttonPosition:`left`})}var j,M=t((()=>{x(),j=e(r())})),N,P,F,I,L,R,z;t((()=>{x(),C(),E(),k(),M(),o(),N=e(r()),P={argTypes:{buttonPosition:{control:{type:s},description:`Set on DialogActions. Aligns the action buttons in the footer. Order the buttons so the primary action sits on the outside: last for "right", first for "left".`,options:[`left`,`right`],table:{defaultValue:{summary:`right`}}},canClickOutsideClose:{control:{type:`boolean`},description:`When false, onClose is not called for a backdrop click or the Esc key, which makes the Dialog persistent. Give those Dialogs an action button that closes them.`,table:{defaultValue:{summary:`true`}}},longContent:{control:{type:`boolean`},description:`Story-only: fills the dialog body with a long passage of text, to show how the content scrolls.`},sdsSize:{control:{type:s},description:`The size of the dialog. It is also passed to DialogTitle and DialogActions, so their spacing matches the dialog.`,options:[`xs`,`s`,`m`,`l`],table:{defaultValue:{summary:`m`}}},titleOnClose:{control:{type:`boolean`},description:`Story-only: passes an onClose handler to DialogTitle, which is what makes it show a close button.`}},component:b,title:`Components/Dialog`},F={args:{buttonPosition:`right`,longContent:!0,sdsSize:`m`,titleOnClose:!1}},I={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(w,{...e})},L={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(D,{...e})},R={parameters:{controls:{exclude:S},snapshot:{skip:!0}},render:e=>(0,N.jsx)(A,{...e})},z=[`Default`,`Test`,`TestNoTitleOnClose`,`TestButtonPositionLeft`],F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}}}))();export{F as Default,I as Test,R as TestButtonPositionLeft,L as TestNoTitleOnClose,z as __namedExportsOrder,P as default};