import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Mr as r,t as i,vt as a}from"./material-DlyzFPof.js";import{t as o}from"./jsx-runtime-cM__dR4X.js";import{Gt as s,t as c}from"./iframe-DhUGD016.js";import{n as l,t as u}from"./InputToggle-B-sNzxf2.js";import{n as d,t as f}from"./LoadingIndicator-CC43O-Ft.js";var p,m,h=t((()=>{d(),p=e(o()),m=e=>{let{sdsStyle:t}=e;return(0,p.jsx)(f,{sdsStyle:t,...e})}})),g,_,v=t((()=>{g=[`sdsStyle`],_={display:`grid`,gridColumnGap:`24px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(2, 70px)`,gridTemplateRows:`1fr`}})),y,b,x=t((()=>{v(),d(),i(),c(),y=e(o()),b=e=>{let t=s({theme:r()});return(0,y.jsxs)(`div`,{style:_,children:[(0,y.jsx)(`div`,{style:{marginBottom:t?.l,marginRight:t?.l,marginTop:t?.l},children:(0,y.jsx)(f,{sdsStyle:`minimal`,...e})}),(0,y.jsx)(`div`,{style:{marginBottom:t?.l,marginRight:t?.l,marginTop:t?.l},children:(0,y.jsx)(f,{sdsStyle:`tag`,...e})})]})}})),S,C,w,T=t((()=>{i(),S=e(n()),l(),d(),C=e(o()),w=()=>{let[e,t]=(0,S.useState)(!0);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(a,{control:(0,C.jsx)(u,{checked:e,onChange:()=>{t(e=>!e)}}),label:`Toggle Loading`,sx:{"& .MuiSwitch-root":{mr:`12px`},margin:`0 0 16px 0`}}),(0,C.jsxs)(`fieldset`,{children:[(0,C.jsx)(`legend`,{children:`aria-live region`}),(0,C.jsx)(`div`,{role:`region`,id:`loading-indicator`,"aria-live":`polite`,children:e?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`p`,{children:`The content is being loaded!`}),(0,C.jsx)(f,{sdsStyle:`tag`})]}):(0,C.jsx)(C.Fragment,{children:(0,C.jsx)(`p`,{children:`Loading has finished!`})})})]})]})}})),E,D,O,k,A,j,M;t((()=>{h(),v(),x(),T(),E=e(o()),D={argTypes:{"aria-label":{control:{type:`text`},description:`Replaces what a screen reader announces for the status region, for example "Loading cell types". The visible text still reads "Loading". Without it, assistive technology announces the visible word.`},sdsStyle:{control:{type:`select`},description:`Chooses between the minimal and tag variants. It has no default: leaving it out is a type error, and an indicator built without it renders unstyled.`,options:[`minimal`,`tag`]}},component:m,title:`Components/LoadingIndicator`},O={args:{sdsStyle:`minimal`}},k={args:{"aria-label":`Loading cats list...`,sdsStyle:`minimal`},parameters:{a11y:{config:{rules:[{enabled:!1,id:`color-contrast`}]}},controls:{exclude:g}}},A={parameters:{a11y:{config:{rules:[{enabled:!1,id:`color-contrast`}]}},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,E.jsx)(w,{...e})},j={parameters:{a11y:{config:{rules:[{enabled:!1,id:`color-contrast`}]}},controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,E.jsx)(b,{...e})},M=[`Default`,`CustomAriaLabel`,`ScreenReaderTest`,`Test`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    sdsStyle: "minimal"
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Loading cats list...",
    sdsStyle: "minimal"
  },
  parameters: {
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "color-contrast"
        }]
      }
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "color-contrast"
        }]
      }
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
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "color-contrast"
        }]
      }
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <LivePreviewDemo {...args} />
}`,...j.parameters?.docs?.source}}}}))();export{k as CustomAriaLabel,O as Default,A as ScreenReaderTest,j as Test,M as __namedExportsOrder,D as default};