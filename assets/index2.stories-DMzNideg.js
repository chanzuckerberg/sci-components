import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Gn as n,Kr as r,Wt as i,Z as a,cr as o,st as s,t as c}from"./iframe-DI6qETgL.js";import{n as l,t as u}from"./InputToggle-OGwSMRuJ.js";import{n as d,t as f}from"./LoadingIndicator-DPgRncob.js";var p,m,h=t((()=>{d(),p=o(),m=e=>{let{sdsStyle:t}=e;return(0,p.jsx)(f,{sdsStyle:t,...e})}})),g,_,v=t((()=>{g=[`sdsStyle`],_={display:`grid`,gridColumnGap:`24px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(2, 70px)`,gridTemplateRows:`1fr`}})),y,b,x=t((()=>{v(),d(),s(),c(),y=o(),b=e=>{let t=a({theme:n()});return(0,y.jsxs)(`div`,{style:_,children:[(0,y.jsx)(`div`,{style:{marginBottom:t?.l,marginRight:t?.l,marginTop:t?.l},children:(0,y.jsx)(f,{sdsStyle:`minimal`,...e})}),(0,y.jsx)(`div`,{style:{marginBottom:t?.l,marginRight:t?.l,marginTop:t?.l},children:(0,y.jsx)(f,{sdsStyle:`tag`,...e})})]})}})),S,C,w,T=t((()=>{s(),S=e(r()),l(),d(),C=o(),w=()=>{let[e,t]=(0,S.useState)(!0);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(i,{control:(0,C.jsx)(u,{checked:e,onChange:()=>{t(e=>!e)}}),label:`Toggle Loading`,sx:{"& .MuiSwitch-root":{mr:`12px`},margin:`0 0 16px 0`}}),(0,C.jsxs)(`fieldset`,{children:[(0,C.jsx)(`legend`,{children:`aria-live region`}),(0,C.jsx)(`div`,{role:`region`,id:`loading-indicator`,"aria-live":`polite`,children:e?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`p`,{children:`The content is being loaded!`}),(0,C.jsx)(f,{sdsStyle:`tag`})]}):(0,C.jsx)(C.Fragment,{children:(0,C.jsx)(`p`,{children:`Loading has finished!`})})})]})]})}})),E,D,O,k,A,j,M;t((()=>{h(),v(),x(),T(),E=o(),D={argTypes:{sdsStyle:{control:{type:`select`},options:[`minimal`,`tag`]}},component:m,title:`Components/LoadingIndicator`},O={args:{sdsStyle:`minimal`}},k={args:{"aria-label":`Loading cats list...`,sdsStyle:`minimal`},parameters:{axe:{disabledRules:[`color-contrast`]},controls:{exclude:g}}},A={parameters:{axe:{disabledRules:[`color-contrast`]},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,E.jsx)(w,{...e})},j={parameters:{axe:{disabledRules:[`color-contrast`]},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,E.jsx)(b,{...e})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    sdsStyle: "minimal"
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Loading cats list...",
    sdsStyle: "minimal"
  },
  parameters: {
    axe: {
      disabledRules: ["color-contrast"]
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    axe: {
      disabledRules: ["color-contrast"]
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScreenReaderDemo {...args} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    axe: {
      disabledRules: ["color-contrast"]
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <LivePreviewDemo {...args} />
}`,...j.parameters?.docs?.source}}},M=[`Default`,`CustomAriaLabel`,`ScreenReaderTest`,`Test`]}))();export{k as CustomAriaLabel,O as Default,A as ScreenReaderTest,j as Test,M as __namedExportsOrder,D as default};