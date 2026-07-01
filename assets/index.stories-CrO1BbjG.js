import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r}from"./iframe-Bjh1LYUt.js";import{n as i,t as a}from"./Button-BT0OC4_c.js";import{n as o,t as s}from"./TagFilter-CIbvk10N.js";var c,l,u,d,f=t((()=>{c=[`label`],l={display:`inline-grid`,gridColumnGap:24,gridRowGap:24,gridTemplateColumns:`repeat(1, 1fr)`,gridTemplateRows:`repeat(1, 1fr)`},u=[`default`,`hover`,`active`,`focus`],d={fontFamily:`sans-serif`,fontSize:`0.67em`,fontWeight:`normal`,margin:`20px 0 10px`}})),p,m,h,g=t((()=>{p=e(n()),f(),o(),i(),m=r(),h=e=>{let{label:t}=e,[n,r]=(0,p.useState)(!0);return(0,m.jsxs)(`div`,{style:l,children:[(0,m.jsx)(`div`,{children:(0,m.jsx)(a,{disabled:n,onClick:()=>r(!0),sdsStyle:`minimal`,sdsType:n?`secondary`:`primary`,children:n?`Delete the tag by clicking on its icon`:`Click to reset`})}),(0,m.jsx)(`div`,{children:n&&(0,m.jsx)(s,{label:t,onDelete:()=>r(!1),...e})})]})}})),_,v,y,b=t((()=>{_=e(n()),o(),f(),v=r(),y=e=>{let{label:t}=e;return(0,v.jsx)(v.Fragment,{children:u.map(n=>(0,v.jsxs)(_.Fragment,{children:[(0,v.jsxs)(`p`,{style:d,children:[`State: `,(0,v.jsx)(`b`,{children:n})]}),(0,v.jsx)(s,{"data-testid":`button`,label:t,onDelete:()=>{},className:`pseudo-${n}`,...e},n)]},n))})}})),x,S,C=t((()=>{o(),x=r(),S=e=>{let{label:t}=e;return(0,x.jsx)(s,{"data-testid":`tag-filter`,label:t,onDelete:()=>{},...e})}})),w,T,E,D,O,k;t((()=>{g(),f(),b(),C(),w=r(),T={argTypes:{label:{control:{type:`text`},required:!0}},component:h,title:`Components/TagFilter`},E={args:{label:`TagFilter`}},D={args:{label:`Label`},parameters:{controls:{exclude:c},snapshot:{skip:!0}},render:e=>(0,w.jsx)(y,{...e})},O={args:{label:`Label`},parameters:{controls:{exclude:c},snapshot:{skip:!0}},render:e=>(0,w.jsx)(S,{...e,"data-testid":`tag-filter`})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: "TagFilter"
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  parameters: {
    controls: {
      exclude: TAG_FILTER_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  parameters: {
    controls: {
      exclude: TAG_FILTER_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} data-testid="tag-filter" />
}`,...O.parameters?.docs?.source}}},k=[`Default`,`ScreenshotTest`,`Test`]}))();export{E as Default,D as ScreenshotTest,O as Test,k as __namedExportsOrder,T as default};