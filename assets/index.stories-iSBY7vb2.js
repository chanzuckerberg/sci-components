import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./Icon-1J9Ma-VV.js";import{n as o,t as s}from"./Callout-C3Zmdf44.js";import{n as c,t as l}from"./Button-Du033jZN.js";import{n as u,t as d}from"./TagFilter-CaHlnPN8.js";var f,p,m,h=t((()=>{f=e(n()),u(),c(),o(),i(),p=e(r()),m=e=>{let{label:t}=e,[n,r]=(0,f.useState)(!0);return(0,p.jsxs)(`div`,{children:[(0,p.jsx)(s,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,p.jsx)(a,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,p.jsxs)(p.Fragment,{children:[`The `,(0,p.jsx)(`strong`,{children:`TagFilter`}),` component is deprecated!`,(0,p.jsx)(`br`,{}),`Please use `,(0,p.jsx)(`strong`,{children:`Chip`}),` component instead.`]})}),!n&&(0,p.jsx)(l,{onClick:()=>r(!0),sdsStyle:`minimal`,sdsType:`secondary`,children:`Click to reset`}),(0,p.jsx)(`div`,{children:n&&(0,p.jsx)(d,{label:t,onDelete:()=>r(!1),...e})})]})}})),g,_,v,y=t((()=>{g=[`label`,`onDelete`],_=[`default`,`hover`,`active`,`focus`],v={fontFamily:`sans-serif`,fontSize:`0.67em`,fontWeight:`normal`,margin:`20px 0 10px`}})),b,x,S,C=t((()=>{b=e(n()),u(),y(),x=e(r()),S=e=>{let{label:t}=e;return(0,x.jsx)(x.Fragment,{children:_.map(n=>(0,x.jsxs)(b.Fragment,{children:[(0,x.jsxs)(`p`,{style:v,children:[`State: `,(0,x.jsx)(`b`,{children:n})]}),(0,x.jsx)(d,{"data-testid":`button`,label:t,onDelete:()=>{},className:`pseudo-${n}`,...e},n)]},n))})}})),w,T,E=t((()=>{u(),w=e(r()),T=e=>{let{label:t}=e;return(0,w.jsx)(d,{"data-testid":`tag-filter`,label:t,onDelete:()=>{},...e})}})),D,O,k,A,j,M;t((()=>{h(),y(),C(),E(),D=e(r()),O={argTypes:{label:{control:{type:`text`},description:`The filter's text. Cut off with an ellipsis when there is not room for it.`,required:!0},onDelete:{control:!1,required:!0}},component:m,title:`Deprecated/TagFilter`},k={args:{label:`TagFilter`}},A={args:{label:`Label`},parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,D.jsx)(S,{...e})},j={args:{label:`Label`},parameters:{controls:{exclude:g},snapshot:{skip:!0}},render:e=>(0,D.jsx)(T,{...e,"data-testid":`tag-filter`})},M=[`Default`,`ScreenshotTest`,`Test`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: "TagFilter"
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}}}))();export{k as Default,A as ScreenshotTest,j as Test,M as __namedExportsOrder,O as default};