import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./Button-Du033jZN.js";import{n as o,t as s}from"./Chip-xlqHajjo.js";var c,l,u,d,f,p,m=t((()=>{c=[`label`,`sdsStyle`],l=`color-contrast`,u=[`solid`,`outline`],d={display:`inline-grid`,gridColumnGap:24,gridRowGap:24,gridTemplateColumns:`repeat(1, 1fr)`,gridTemplateRows:`repeat(1, 1fr)`},f=[`default`,`hover`,`active`,`focus-visible`],p={alignItems:`center`,columnGap:32,display:`grid`,fontFamily:`sans-serif`,gridTemplateColumns:`max-content repeat(${f.length}, max-content)`,rowGap:16}})),h,g,_,v=t((()=>{h=e(n()),m(),o(),i(),g=e(r()),_=e=>{let{label:t}=e,[n,r]=(0,h.useState)(!0);return(0,g.jsxs)(`div`,{style:d,children:[(0,g.jsx)(`div`,{children:(0,g.jsx)(a,{disabled:n,onClick:()=>r(!0),sdsStyle:`minimal`,sdsType:n?`secondary`:`primary`,children:n?`Remove the chip by clicking on it`:`Click to reset`})}),(0,g.jsx)(`div`,{children:n&&(0,g.jsx)(s,{label:t,onDelete:()=>r(!1),...e})})]})}})),y,b,x,S=t((()=>{y=e(n()),o(),m(),b=e(r()),x=e=>{let{label:t}=e;return(0,b.jsxs)(`div`,{style:p,children:[(0,b.jsx)(`span`,{}),f.map(e=>(0,b.jsx)(`b`,{children:e},e)),u.map(e=>(0,b.jsxs)(y.Fragment,{children:[(0,b.jsx)(`b`,{children:e}),f.map(n=>(0,b.jsx)(`div`,{children:(0,b.jsx)(s,{className:`pseudo-${n}`,"data-testid":`chip`,label:t,onDelete:()=>{},sdsStyle:e})},n))]},e))]})}})),C,w,T=t((()=>{o(),C=e(r()),w=e=>{let{label:t}=e;return(0,C.jsx)(s,{"data-testid":`chip`,label:t,onDelete:()=>{},...e})}})),E,D,O,k,A,j,M,N;t((()=>{v(),m(),S(),T(),E=e(r()),D={a11y:{config:{rules:[{enabled:!1,id:l}]}}},O={argTypes:{label:{control:{type:`text`},required:!0},sdsStyle:{control:{type:`radio`},options:u}},component:_,title:`Components/Chip`},k={args:{label:`Chip`,sdsStyle:`solid`}},A={args:{label:`Label`},parameters:{...D,controls:{exclude:c},snapshot:{skip:!0}},render:e=>(0,E.jsx)(x,{...e})},j={args:{label:`Label`},globals:{theme:`dark`},parameters:{...D,controls:{exclude:c},snapshot:{skip:!0}},render:e=>(0,E.jsx)(x,{...e})},M={args:{label:`Label`},parameters:{controls:{exclude:c},snapshot:{skip:!0}},render:e=>(0,E.jsx)(w,{...e,"data-testid":`chip`})},N=[`Default`,`ScreenshotTest`,`ScreenshotTestDark`,`Test`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Chip",
    sdsStyle: "solid"
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  parameters: {
    ...OUTLINE_CONTRAST_PARAMETERS,
    controls: {
      exclude: CHIP_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  globals: {
    theme: "dark"
  },
  parameters: {
    ...OUTLINE_CONTRAST_PARAMETERS,
    controls: {
      exclude: CHIP_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  parameters: {
    controls: {
      exclude: CHIP_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} data-testid="chip" />
}`,...M.parameters?.docs?.source}}}}))();export{k as Default,A as ScreenshotTest,j as ScreenshotTestDark,M as Test,N as __namedExportsOrder,O as default};