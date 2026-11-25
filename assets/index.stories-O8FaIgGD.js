import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Ja as i,Vt as a,_n as o,t as s}from"./iframe-yslvsfyO.js";import{n as c,t as l}from"./Button-CNQCHYnP.js";import{n as u,t as d}from"./Chip-CUBUlcad.js";import{a as f,n as p,o as m,t as h}from"./discreteColorGenerator-Yh1o0Sb0.js";function g(e){return(0,_.jsx)(f,{...e})}var _,v=e((()=>{m(),_=t(r())}));function y(e){let[t,n]=(0,b.useState)([]),r=e=>{n(t=>t.filter(t=>t!==e))};return(0,x.jsxs)(`div`,{style:{width:`400px`},children:[(0,x.jsx)(f,{...e,selectedIndices:t,onSelectionChange:n}),(0,x.jsxs)(`div`,{style:{marginTop:`40px`},children:[(0,x.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`12px`},children:[(0,x.jsx)(l,{onClick:()=>n(e.items?.map((e,t)=>t)||[]),sdsStyle:`outline`,sdsType:`primary`,size:`large`,children:`Select All`}),(0,x.jsx)(l,{onClick:()=>n([]),sdsStyle:`minimal`,sdsType:`secondary`,size:`large`,children:`Clear Selection`})]}),(0,x.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:4},children:t.length>0&&t.map(t=>(0,x.jsx)(d,{label:e.items?.[t]?.name||``,onDelete:()=>r(t)},t))})]})]})}var b,x,S=e((()=>{b=t(n()),m(),u(),c(),x=t(r())})),C,w,T,E,D,O,k,A,j,M,N,P,F;e((()=>{o(),v(),S(),p(),s(),C=t(r()),w={argTypes:{items:{control:{type:`object`},description:`Array of items to display in the legend`},selectedIndices:{control:{type:`object`},description:`Array of selected item indices (controlled)`},showValues:{control:{type:`boolean`},description:`Show values in the legend`,table:{defaultValue:{summary:`false`}}}},component:g,title:`Components/Legend`},T=[{name:`H. sapiens`,value:3212},{name:`M. musculus`,value:130},{name:`C. Jacques`,value:89},{name:`D. rerio`,value:65},{name:`M. mulatta`,value:45},{name:`P. mirabillis`,value:34},{name:`V. cholerae`,value:12},{name:`Other (17)`,value:40}],E=(e=!1)=>{let t=h(T.length,{isDarkMode:e});return T.map((e,n)=>({...e,color:t[n]}))},D=e=>{let t=a({theme:i()})===`dark`,n=E(t);return(0,C.jsx)(g,{...e,items:n})},O=e=>{let t=a({theme:i()})===`dark`,n=E(t);return(0,C.jsx)(y,{...e,items:n})},k={a11y:{config:{rules:[{enabled:!1,id:`color-contrast`}]}}},A={render:D,args:{showValues:!1,items:T}},j={render:D,args:{showValues:!0},parameters:k},M={render:O,args:{showValues:!0},parameters:k},N={render:O,args:{showValues:!0,lastItemMenuItems:[{name:`G. gallus`,color:`#975bd4`},{name:`X. laevis`,color:`#5b70d4`},{name:`C. elegans`,color:`#7ad1d9`},{name:`D. melanogaster`,color:`#7dd889`},{name:`S. cerevisiae`,color:`#a2d96a`}]},parameters:k},P={args:{items:T,showValues:!1},parameters:{snapshot:{skip:!0}},render:e=>(0,C.jsx)(g,{...e,"data-testid":`legend`})},F=[`Default`,`WithValues`,`WithSelection`,`WithLastItemMenu`,`Test`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: LegendWithThemeColors,
  args: {
    showValues: false,
    items: sampleItems
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: LegendWithThemeColors,
  args: {
    showValues: true
  },
  parameters: colorContrastDisabled
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: LegendSelectionWithTheme,
  args: {
    showValues: true
  },
  parameters: colorContrastDisabled
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: LegendSelectionWithTheme,
  args: {
    showValues: true,
    lastItemMenuItems: [{
      name: "G. gallus",
      color: "#975bd4"
    }, {
      name: "X. laevis",
      color: "#5b70d4"
    }, {
      name: "C. elegans",
      color: "#7ad1d9"
    }, {
      name: "D. melanogaster",
      color: "#7dd889"
    }, {
      name: "S. cerevisiae",
      color: "#a2d96a"
    }]
  },
  parameters: colorContrastDisabled
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}}}))();export{A as Default,P as Test,N as WithLastItemMenu,M as WithSelection,j as WithValues,F as __namedExportsOrder,w as default};