import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Qa as r,ct as i,ji as a,q as o,t as s}from"./iframe-DocVhSSI.js";import{n as c,t as l}from"./Button-CfkvkcRt.js";import{n as u,t as d}from"./TagFilter-ByveBZ28.js";import{i as f,n as p,r as m,t as h}from"./discreteColorGenerator-DaZJD6Rx.js";function g(e){return(0,_.jsx)(m,{...e})}var _,v=e((()=>{f(),_=n()}));function y(e){let[t,n]=(0,b.useState)([]),r=e=>{n(t=>t.filter(t=>t!==e))};return(0,x.jsxs)(`div`,{style:{width:`400px`},children:[(0,x.jsx)(m,{...e,selectedIndices:t,onSelectionChange:n}),(0,x.jsxs)(`div`,{style:{marginTop:`40px`},children:[(0,x.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`12px`},children:[(0,x.jsx)(l,{onClick:()=>n(e.items?.map((e,t)=>t)||[]),sdsStyle:`outline`,sdsType:`primary`,size:`large`,children:`Select All`}),(0,x.jsx)(l,{onClick:()=>n([]),sdsStyle:`minimal`,sdsType:`secondary`,size:`large`,children:`Clear Selection`})]}),(0,x.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:4},children:t.length>0&&t.map(t=>(0,x.jsx)(d,{label:e.items?.[t]?.name||``,onDelete:()=>r(t)},t))})]})]})}var b,x,S=e((()=>{b=t(r()),f(),u(),c(),x=n()})),C,w,T,E,D,O,k,A,j,M,N;e((()=>{i(),v(),S(),p(),s(),C=n(),w={argTypes:{items:{control:{type:`object`},description:`Array of items to display in the legend`},selectedIndices:{control:{type:`object`},description:`Array of selected item indices (controlled)`},showValues:{control:{type:`boolean`},description:`Show values in the legend`}},component:g,title:`Components/Legend`,parameters:{controls:{expanded:!0}}},T=[{name:`H. sapiens`,value:3212},{name:`M. musculus`,value:130},{name:`C. Jacques`,value:89},{name:`D. rerio`,value:65},{name:`M. mulatta`,value:45},{name:`P. mirabillis`,value:34},{name:`V. cholerae`,value:12},{name:`Other (17)`,value:40}],E=(e=!1)=>{let t=h(T.length,{isDarkMode:e});return T.map((e,n)=>({...e,color:t[n]}))},D=e=>{let t=E(o({theme:a()})===`dark`);return(0,C.jsx)(g,{...e,items:t})},O=e=>{let t=E(o({theme:a()})===`dark`);return(0,C.jsx)(y,{...e,items:t})},k={render:D,args:{showValues:!1,items:T}},A={render:D,args:{showValues:!0}},j={render:O,args:{showValues:!0}},M={args:{items:T,showValues:!1},parameters:{snapshot:{skip:!0}},render:e=>(0,C.jsx)(g,{...e,"data-testid":`legend`})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: LegendWithThemeColors,
  args: {
    showValues: false,
    items: sampleItems
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: LegendWithThemeColors,
  args: {
    showValues: true
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: LegendSelectionWithTheme,
  args: {
    showValues: true
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    showValues: false
  },
  parameters: {
    snapshot: {
      skip: true
    }
  },
  render: (props: Parameters<typeof Legend>[0]) => <DefaultStory {...props} data-testid="legend" />
}`,...M.parameters?.docs?.source}}},N=[`Default`,`WithValues`,`WithSelection`,`Test`]}))();export{k as Default,M as Test,j as WithSelection,A as WithValues,N as __namedExportsOrder,w as default};