import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-CLRePdsX.js";import{n as r,t as i}from"./Icon-Dm0VxswF.js";import{n as a,t as o}from"./Button-DCR2_tBD.js";import{n as s,t as c}from"./Link-cqTg-3zf.js";import{n as l,t as u}from"./TooltipCondensed-Dpo6SPbF.js";import{n as d,t as f}from"./TooltipTable-Btew27_j.js";import{n as p,t as m}from"./default-Cjr8wo1E.js";var h,g,_,v=e((()=>{h=[`contentAlert`,`itemAlign`],g=[{label:`Label 1`,value:1},{label:`Label 2`,value:2},{label:`Label 3`,value:3},{label:`Label 4`,value:4},{label:`Label 5 `,value:5},{label:`Label 6`,value:6},{label:`Label 7`,value:7},{label:`Label 8`,value:8},{label:`Label 9`,value:9},{label:`Label 10`,value:10},{label:`Label 11`,value:11},{label:`Label 12`,value:12},{label:`Label 13`,value:13},{label:`Label 14`,value:14},{label:`Label 15`,value:15}],_=[{dataRows:g.slice(0,3),label:`Section 1`},{dataRows:g.slice(3,7),label:`Section 2`},{dataRows:g.slice(7,10),label:`Section 3`}]})),y,b,x=e((()=>{d(),v(),y=t(n()),b=e=>(0,y.jsx)(f,{...e,data:[_[0],_[1]],"data-testid":`tooltipTable`})})),S,C,w=e((()=>{a(),r(),s(),l(),d(),S=t(n()),C=e=>{let{contentAlert:t}=e,n=()=>{let e;switch(t){case`String`:e=`Some values do not pass the selected filter`;break;case`Element`:e=(0,S.jsx)(c,{href:`/`,children:`Click this link to see samples`});break;default:e=void 0}return e};return(0,S.jsxs)(`div`,{children:[`Hover over the info icon to view the tooltip.`,(0,S.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,marginTop:`50px`},children:(0,S.jsx)(u,{title:null,componentSlot:(0,S.jsx)(f,{...e,contentAlert:n()}),children:(0,S.jsx)(o,{"aria-label":`tooltip test button`,size:`large`,sdsStyle:`minimal`,sdsType:`primary`,children:(0,S.jsx)(i,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`})})})})]})}})),T,E,D,O,k,A;e((()=>{v(),p(),x(),w(),T=t(n()),E={argTypes:{contentAlert:{control:{type:`select`},options:[`String`,`Element`,`None`]},itemAlign:{control:{type:`radio`},options:[`right`,`left`]},showSectionHeader:{control:{type:`boolean`}}},component:m,title:`Components/TooltipTable`},D={args:{contentAlert:`None`,data:_,itemAlign:`right`,showSectionHeader:!0}},O={args:{contentAlert:`None`,data:_,itemAlign:`right`,showSectionHeader:!0},render:e=>(0,T.jsx)(C,{...e})},k={parameters:{controls:{exclude:h},snapshot:{skip:!0}},render:e=>(0,T.jsx)(b,{...e})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    contentAlert: "None",
    data: TOOLTIP_TABLE_DATA,
    itemAlign: "right",
    showSectionHeader: true
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    contentAlert: "None",
    data: TOOLTIP_TABLE_DATA,
    itemAlign: "right",
    showSectionHeader: true
  },
  render: (args: Args) => <WithinTooltipDemo {...args} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: TOOLTIP_TABLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...k.parameters?.docs?.source}}},A=[`Default`,`WithinTooltip`,`Test`]}))();export{D as Default,k as Test,O as WithinTooltip,A as __namedExportsOrder,E as default};