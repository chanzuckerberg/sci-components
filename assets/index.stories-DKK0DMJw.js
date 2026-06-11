import{i as e}from"./preload-helper-DbRxMUml.js";import{cr as t}from"./iframe-DI6qETgL.js";import{n,t as r}from"./Icon-BvRFwTEr.js";import{n as i,t as a}from"./Button-K7qsdWHe.js";import{n as o,t as s}from"./TooltipTable-Bwr86nVx.js";import{n as c,t as l}from"./Link-C41alX3x.js";import{n as u,t as d}from"./default-BKWNmfbe.js";import{n as f,t as p}from"./TooltipCondensed-CFM5a3WD.js";var m,h,g,_=e((()=>{m=[`contentAlert`,`itemAlign`],h=[{label:`Label 1`,value:1},{label:`Label 2`,value:2},{label:`Label 3`,value:3},{label:`Label 4`,value:4},{label:`Label 5 `,value:5},{label:`Label 6`,value:6},{label:`Label 7`,value:7},{label:`Label 8`,value:8},{label:`Label 9`,value:9},{label:`Label 10`,value:10},{label:`Label 11`,value:11},{label:`Label 12`,value:12},{label:`Label 13`,value:13},{label:`Label 14`,value:14},{label:`Label 15`,value:15}],g=[{dataRows:h.slice(0,3),label:`Section 1`},{dataRows:h.slice(3,7),label:`Section 2`},{dataRows:h.slice(7,10),label:`Section 3`}]})),v,y,b=e((()=>{o(),_(),v=t(),y=e=>(0,v.jsx)(s,{...e,data:[g[0],g[1]],"data-testid":`tooltipTable`})})),x,S,C=e((()=>{i(),n(),c(),f(),o(),x=t(),S=e=>{let{contentAlert:t}=e,n=()=>{let e;switch(t){case`String`:e=`Some values do not pass the selected filter`;break;case`Element`:e=(0,x.jsx)(l,{href:`/`,children:`Click this link to see samples`});break;default:e=void 0}return e};return(0,x.jsxs)(`div`,{children:[`Hover over the info icon to view the tooltip.`,(0,x.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,marginTop:`50px`},children:(0,x.jsx)(p,{title:null,hasInvertedStyle:!1,componentSlot:(0,x.jsx)(s,{...e,contentAlert:n()}),children:(0,x.jsx)(a,{"aria-label":`tooltip test button`,size:`large`,sdsStyle:`minimal`,sdsType:`primary`,children:(0,x.jsx)(r,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`})})})})]})}})),w,T,E,D,O,k;e((()=>{_(),u(),b(),C(),w=t(),T={argTypes:{contentAlert:{control:{type:`select`},options:[`String`,`Element`,`None`]},itemAlign:{control:{type:`radio`},options:[`right`,`left`]},showSectionHeader:{control:{type:`boolean`}}},component:d,title:`Components/TooltipTable`},E={args:{contentAlert:`None`,data:g,itemAlign:`right`,showSectionHeader:!0}},D={args:{contentAlert:`None`,data:g,itemAlign:`right`,showSectionHeader:!0},render:e=>(0,w.jsx)(S,{...e})},O={parameters:{controls:{exclude:m},snapshot:{skip:!0}},render:e=>(0,w.jsx)(y,{...e})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    contentAlert: "None",
    data: TOOLTIP_TABLE_DATA,
    itemAlign: "right",
    showSectionHeader: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    contentAlert: "None",
    data: TOOLTIP_TABLE_DATA,
    itemAlign: "right",
    showSectionHeader: true
  },
  render: (args: Args) => <WithinTooltipDemo {...args} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: TOOLTIP_TABLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...O.parameters?.docs?.source}}},k=[`Default`,`WithinTooltip`,`Test`]}))();export{E as Default,O as Test,D as WithinTooltip,k as __namedExportsOrder,T as default};