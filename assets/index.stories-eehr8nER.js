import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,Fi as r,Ii as i,Li as a,O as o,Qa as s,W as c,Y as l,Z as u,ct as d,ji as f,q as ee}from"./iframe-DocVhSSI.js";import{t as p}from"./Button-CfkvkcRt.js";import{t as m}from"./Tooltip-DB8p7_xV.js";import{t as h}from"./TooltipTable-MmoSDtv9.js";import{t as g}from"./TagFilter-ByveBZ28.js";import{r as te,t as ne}from"./discreteColorGenerator-DaZJD6Rx.js";import{t as _}from"./src-BpIdf_q-.js";var re,ie,ae,oe,se,ce,le,v=e((()=>{a(),_(),re=i(`div`,{target:`eja2e936`})(`display:flex;flex-direction:column;width:`,e=>typeof e.width==`number`?`${e.width}px`:e.width,`;`),ie=i(`div`,{target:`eja2e935`})(`display:flex;align-items:center;`,e=>{let t=u(e);return`
      gap: ${t?.s}px;
      margin-bottom: ${t?.l}px;
    `},`;`),ae=i(`div`,{target:`eja2e934`})(o,` `,e=>`
      color: ${l(e)?.base?.textPrimary};
    `,`;`),oe=i(`div`,{target:`eja2e933`})(n,` `,e=>{let t=u(e),n=c(e),r=l(e);return`
      padding: ${t?.xxxs}px ${t?.xxs}px;
      border-radius: ${n?.m}px;
      background-color: ${r?.base?.backgroundTertiary};
      color: ${r?.base?.textSecondary};
    `},`;`),se=i(`div`,{target:`eja2e932`})(e=>{let{width:t,barHeight:n,isEmpty:r}=e,i=c(e),a=l(e),o=typeof t==`number`?`${t}px`:t;return`
      display: flex;
      border-radius: ${i?.s}px;
      width: ${o};
      height: ${n}px;
      background-color: ${r?a?.base?.backgroundTertiary:`transparent`};
      overflow: hidden;
    `},`;`),ce=i(`div`,{target:`eja2e931`})(e=>{let{color:t,height:n,percentage:r,opacity:i,disabled:a,isLast:o}=e,s=u(e)?.xxxs||0;return`
      background-color: ${t};
      height: ${n}px;
      flex-grow: ${r};
      flex-basis: 0;
      flex-shrink: 1;
      margin-right: ${r>0&&!o?`${s}px`:0};
      opacity: ${i};
      transition: opacity 0.2s ease-in-out, flex-grow 0.25s ease-in-out, margin-right 0.25s ease-out;
      cursor: ${a?`default`:`pointer`};
      pointer-events: ${a?`none`:`auto`};
    `},`;`),le=i(`div`,{target:`eja2e930`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${u(e)?.m}px;
    `,`;`)})),y,b,ue,x,S,C,w,de,fe,pe,T,E=e((()=>{y=t(s()),_(),v(),d(),b=r(),ue=(e,t)=>t===0||t===e?`${e}`:`${t} of ${e}`,x=(e,t,n,r)=>{if(!t)return;if(n===`percentage`)return`${Math.round(e.percentage)}%`;let i=e.unit||r;return i?`${e.value} ${i}`:`${e.value}`},S=(e,t,n,r)=>{let i=n.size>0;return r===`hide`?1:t===null?i?n.has(e)?1:.2:1:t===e||n.has(e)?1:.2},C=(e,t,n,r,i)=>{let a=r?i-n:0,o=r?a/i*100:0;return{styledItems:e.map(e=>{let n=t.has(e.originalIndex);return{...e,percentage:n?e.percentage:0}}),updatedRemainingPercentage:o,updatedRemainingValue:a}},w=(e,t,n)=>n===0?{styledItems:e.map(e=>({...e,percentage:0})),updatedRemainingPercentage:0,updatedRemainingValue:0}:{styledItems:e.map(e=>{let r=t.has(e.originalIndex)?e.value/n*100:0;return{...e,percentage:r}}),updatedRemainingPercentage:0,updatedRemainingValue:0},de=(e,t,n,r,i,a,o,s)=>{let c=t.size>0;if(n!==`hide`||!c)return{styledItems:e,updatedRemainingPercentage:o,updatedRemainingValue:s};let l=e.filter(e=>t.has(e.originalIndex)).reduce((e,t)=>e+t.value,0);return r===`cumulative`?C(e,t,l,i,a):w(e,t,l)},fe=(e,t)=>{let{showLegendValues:n,legendValueFormat:r,unit:i,hasRemaining:a,showLegend:o,remainingValue:s,remainingPercentage:c,remainingLabel:l,remainingUnit:u,theme:d}=t,f=e.map(e=>({name:e.name,value:x(e,n,r,i),color:e.color,disabled:e.disabled}));if(a&&o){let e;if(!n)e=void 0;else if(r===`percentage`)e=`${Math.round(c)}%`;else{let t=u||i||``;e=t?`${s} ${t}`:`${s}`}f.push({name:l,value:e,color:d?.palette?.sds?.base?.backgroundTertiary,disabled:!0})}return f},pe=(e,t)=>{let{barHeight:n,hoveredIndex:r,selectedIndicesSet:i,selectionBehavior:a,isLast:o,onMouseEnter:s,onMouseLeave:c,onClick:l}=t,u=a===`hide`&&e.percentage===0,d=(0,b.jsx)(ce,{color:e.color,percentage:e.isEntering||e.isExiting?0:e.percentage,height:n,opacity:S(e.originalIndex,r,i,a),isLast:o,"data-hide":u,onMouseEnter:s,onMouseLeave:c,onClick:l});return e.tooltip===void 0?(0,y.cloneElement)(d,{key:e.key}):(0,b.jsx)(m,{title:null,componentSlot:(0,b.jsx)(h,{...e.tooltip}),placement:`top`,hasInvertedStyle:!1,open:r===e.originalIndex&&!u,disableInteractive:!0,slotProps:{popper:{disablePortal:!1,modifiers:[{name:`offset`,options:{offset:[0,0]}}]}},children:d},e.key)},T=e=>{let{title:t,badge:n,hideBadge:r=!1,data:i,width:a=`100%`,barHeight:o=16,showLegend:s=!0,showLegendValues:c=!0,legendValueFormat:l=`percentage`,selectedIndices:u=[],onSelectionChange:d,onSegmentMouseEnter:p,onSegmentMouseLeave:m,onLegendItemMouseEnter:h,onLegendItemMouseLeave:g,onSegmentClick:_,onLegendItemClick:v,selectionBehavior:x=`dim`,mode:S=`proportional`,maxAmount:C,remainingLabel:w=`Remaining`,remainingUnit:T,unit:E,colorGeneratorOptions:D,...O}=e,k=Math.max(1,o),A=f(),[j,M]=(0,y.useState)(null),[N,P]=(0,y.useState)([]),[F,I]=(0,y.useState)(new Map),[L,me]=(0,y.useState)(0),R=(0,y.useRef)([]),z=(0,y.useRef)(new Set),B=(0,y.useRef)(null),V=(0,y.useMemo)(()=>ee({theme:A})===`dark`,[A]),H=(0,y.useCallback)(e=>{let t=ne(e.length,{...D||{},isDarkMode:V}),n=new Map;return e.forEach((e,r)=>{n.set(e.name,t[r]||A?.palette?.sds?.base?.ornamentSecondary)}),n},[D,V,A]);(0,y.useEffect)(()=>{let e=i.filter(e=>!e.color),t=new Set(i.map(e=>e.name)),n=z.current,r=B.current,a=!r||r.isDarkMode!==V||r.options!==D;if(z.current=t,B.current={options:D,isDarkMode:V},e.length===0){F.size>0&&I(new Map);return}let o=e.some(e=>!n.has(e.name));if(F.size===0||o||a)I(H(e));else{let t=new Set(e.map(e=>e.name)),n=new Map(F),r=!1;for(let e of Array.from(n.keys()))t.has(e)||(n.delete(e),r=!0);r&&I(n)}},[i,D,V,A,H]);let U=n??ue(i.length,u.length),{effectiveMaxAmount:W,hasRemaining:G,remainingValue:K,remainingPercentage:q}=(0,y.useMemo)(()=>{let e=i.reduce((e,t)=>e+t.value,0),t=S===`cumulative`&&C?C:e,n=S===`cumulative`&&e<t,r=n?t-e:0;return{effectiveMaxAmount:t,hasRemaining:n,remainingValue:r,remainingPercentage:n?r/t*100:0}},[i,S,C]),J=(0,y.useMemo)(()=>i.map((e,t)=>{let n=e.color||F.get(e.name)||A?.palette?.sds?.base?.ornamentSecondary;return{...e,color:n,percentage:W>0?e.value/W*100:0,key:e.name,originalIndex:t,isEntering:!1,isExiting:!1}}),[i,W,F,A]);(0,y.useEffect)(()=>{let e=R.current,t=J,n=new Map(t.map(e=>[e.key,e]));if(e.length===0){P(t),me(q),R.current=t;return}let r=[...e],i=0;for(let e of t){let t=r.findIndex(t=>t.key===e.key);t===-1?(r.splice(i,0,{...e,isEntering:!0}),i++):i=t+1}P(r);let a=[];return a.push(window.setTimeout(()=>{P(r.map(e=>n.get(e.key)??{...e,isExiting:!0})),me(q),a.push(window.setTimeout(()=>{P(t),R.current=t},350))},0)),()=>{a.forEach(e=>window.clearTimeout(e))}},[J,q]);let Y=(0,y.useMemo)(()=>new Set(u),[u]),{styledItems:X,updatedRemainingPercentage:Z,updatedRemainingValue:Q}=(0,y.useMemo)(()=>de(N,Y,x,S,G,W,L,K),[N,Y,x,S,G,W,L,K]),$=x===`hide`&&u.length>0,he=$?Z:L,ge=$?Q:K,_e=(0,y.useMemo)(()=>fe(J,{showLegendValues:c,legendValueFormat:l,unit:E,hasRemaining:G,showLegend:s,remainingValue:ge,remainingPercentage:he,remainingLabel:w,remainingUnit:T,theme:A}),[J,c,l,E,G,s,ge,he,w,T,A]),ve=(0,y.useCallback)((e,t)=>{M(t),h&&i[t]&&h(i[t],t)},[h,i]),ye=(0,y.useCallback)((e,t)=>{M(null),g&&i[t]&&g(i[t],t)},[g,i]),be=(0,y.useCallback)((e,t)=>{v&&i[t]&&v(i[t],t)},[v,i]),xe=(0,y.useCallback)(e=>{d&&d(e,i.filter((t,n)=>e.includes(n)))},[d,i]),Se=(0,y.useCallback)(e=>{_&&i[e]&&_(i[e],e),d&&xe(Y.has(e)?u.filter(t=>t!==e):[...u,e])},[d,_,i,u,Y,xe]),Ce=(0,y.useMemo)(()=>{for(let e=X.length-1;e>=0;e--)if(X[e].percentage>0)return e;return-1},[X]),we=(0,b.jsxs)(le,{children:[(0,b.jsxs)(se,{width:a,barHeight:k,isEmpty:X.length===0&&!G,children:[X.map((e,t)=>pe(e,{barHeight:k,hoveredIndex:j,selectedIndicesSet:Y,selectionBehavior:x,isLast:t===Ce&&!G,onMouseEnter:()=>{e.isExiting||(M(e.originalIndex),p&&i[e.originalIndex]&&p(i[e.originalIndex],e.originalIndex))},onMouseLeave:()=>{M(null),m&&i[e.originalIndex]&&m(i[e.originalIndex],e.originalIndex)},onClick:()=>!e.isExiting&&Se(e.originalIndex)})),R.current.length>0&&(0,b.jsx)(ce,{color:A?.palette?.sds?.base?.backgroundTertiary,percentage:he,height:k,isLast:!0,opacity:1,disabled:!0},`remaining`)]}),s&&(0,b.jsx)(te,{items:_e,showValues:c,onItemMouseEnter:ve,onItemMouseLeave:ye,onItemClick:v?be:void 0,selectedIndices:u,onSelectionChange:d?xe:void 0,hoveredIndex:j})]});return t?(0,b.jsxs)(re,{width:a,...O,children:[(0,b.jsxs)(ie,{children:[(0,b.jsx)(ae,{children:t}),!r&&U&&(0,b.jsx)(oe,{children:U})]}),we]}):(0,b.jsx)(re,{width:a,...O,children:we})}})),D,O,k,A,j=e((()=>{D=[{name:`Transcriptomic`,value:117,tooltip:{showSectionHeader:!0,data:[{label:`Transcriptomic`,dataRows:[{label:`Sub-modality`,value:14},{label:`Another sub-modality`,value:19},{label:`Modality sub-type here`,value:270},{label:`Sub-type of modality`,value:93}]}]}},{name:`Imaging`,value:61,tooltip:{data:[{label:`Imaging`,dataRows:[{label:`Fluorescence microscopy`,value:22},{label:`Confocal imaging`,value:15},{label:`Electron microscopy`,value:11},{label:`Light sheet imaging`,value:8},{label:`Two-photon microscopy`,value:5}]}]}},{name:`Sequencing`,value:34,tooltip:{data:[{label:`Sequencing`,dataRows:[{label:`RNA-seq`,value:15},{label:`DNA-seq`,value:10},{label:`ChIP-seq`,value:6},{label:`ATAC-seq`,value:3}]}]}},{name:`Proteomics`,value:15,tooltip:{data:[{label:`Proteomics`,dataRows:[{label:`Proteomics`,value:8},{label:`Metabolomics`,value:4},{label:`Flow cytometry`,value:3}]}]}},{name:`Spatial Transcriptomics`,value:78,tooltip:{data:[{label:`Spatial Transcriptomics`,dataRows:[{label:`Spatial transcriptomics`,value:60},{label:`Spatial proteomics`,value:10},{label:`Spatial metabolomics`,value:5},{label:`Spatial lipidomics`,value:3}]}]}},{name:`Prosthetics`,value:130},{name:`Epigenomics`,value:100,tooltip:{data:[{label:`Epigenomics`,dataRows:[{label:`DNA methylation`,value:30},{label:`Histone modification`,value:20},{label:`Chromatin accessibility`,value:10},{label:`Chromatin remodeling`,value:10},{label:`Chromatin transcription`,value:10},{label:`Chromatin replication`,value:30}]}]}}],O=D.map((e,t)=>({...e,value:[40,190,12,88,25,47,210][t]??e.value})),k=[...D.filter(e=>[`Transcriptomic`,`Imaging`,`Epigenomics`].includes(e.name)),{name:`Electrophysiology`,value:55}],A=[...D.filter(e=>![`Prosthetics`,`Sequencing`].includes(e.name)),{name:`Electrophysiology`,value:55},{name:`Behavioral`,value:28},{name:`Genomics`,value:145},{name:`Metabolomics`,value:42}]})),M,N,P=e((()=>{E(),j(),M=r(),N=e=>{let{data:t=D,width:n=360,barHeight:r=16,...i}=e;return(0,M.jsx)(`div`,{style:{margin:150},children:(0,M.jsx)(T,{width:n,data:t,barHeight:r,...i})})}}));function F(e){let{data:t,...n}=e,[r,i]=(0,I.useState)([]),a=(e,t)=>{i(e),console.log(`Selected indices:`,e),console.log(`Selected data:`,t)},o=()=>{a(t.map((e,t)=>t),t)},s=()=>{a([],[])},c=e=>{let n=r.filter(t=>t!==e);a(n,t.filter((e,t)=>n.includes(t)))};return(0,L.jsxs)(`div`,{style:{margin:150},children:[(0,L.jsx)(T,{...n,data:t,selectedIndices:r,onSelectionChange:a}),(0,L.jsxs)(`div`,{style:{marginTop:`40px`},children:[(0,L.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`12px`},children:[(0,L.jsx)(p,{onClick:o,sdsStyle:`outline`,sdsType:`primary`,children:`Select All`}),(0,L.jsx)(p,{onClick:s,sdsStyle:`minimal`,sdsType:`secondary`,disabled:r.length===0,children:`Clear Selection`})]}),(0,L.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px`},children:r.length>0&&r.map(e=>(0,L.jsx)(g,{label:t[e]?.name||``,onDelete:()=>c(e)},e))})]})]})}var I,L,me=e((()=>{I=t(s()),_(),E(),L=r()}));function R(e){let{data:t,...n}=e,[r,i]=(0,z.useState)(null),[a,o]=(0,z.useState)([]),s=f(),c=e=>{o(t=>[e,...t].slice(0,10))},l=(e,t)=>{i({item:e,index:t,source:`segment`}),c(`Segment Enter: ${e.name} (index ${t})`),console.log(`Segment Mouse Enter:`,{item:e,index:t})},u=(e,t)=>{i(null),c(`Segment Leave: ${e.name} (index ${t})`),console.log(`Segment Mouse Leave:`,{item:e,index:t})},d=(e,t)=>{i({item:e,index:t,source:`legend`}),c(`Legend Enter: ${e.name} (index ${t})`),console.log(`Legend Mouse Enter:`,{item:e,index:t})},ee=(e,t)=>{i(null),c(`Legend Leave: ${e.name} (index ${t})`),console.log(`Legend Mouse Leave:`,{item:e,index:t})},p=(e,t)=>{c(`Segment Click: ${e.name} (index ${t})`),console.log(`Segment Click:`,{item:e,index:t})},m=(e,t)=>{c(`Legend Click: ${e.name} (index ${t})`),console.log(`Legend Click:`,{item:e,index:t})};return(0,B.jsxs)(`div`,{style:{margin:150},children:[(0,B.jsx)(T,{...n,data:t,onSegmentMouseEnter:l,onSegmentMouseLeave:u,onLegendItemMouseEnter:d,onLegendItemMouseLeave:ee,onSegmentClick:p,onLegendItemClick:m}),(0,B.jsxs)(`div`,{style:{marginTop:`40px`,display:`flex`,gap:`16px`,flexGrow:1,alignItems:`flex-start`},children:[(0,B.jsxs)(`div`,{style:{padding:`16px`,backgroundColor:s?.palette?.sds?.base?.backgroundTertiary,borderRadius:`8px`,marginBottom:`16px`},children:[(0,B.jsx)(`h3`,{style:{margin:`0 0 12px 0`,fontSize:`14px`},children:`Current Hover State (Hover over a bar segment or legend item):`}),(0,B.jsxs)(`div`,{children:[(0,B.jsxs)(`div`,{children:[(0,B.jsx)(`strong`,{children:`Name:`}),` `,r?.item.name||`-`]}),(0,B.jsxs)(`div`,{children:[(0,B.jsx)(`strong`,{children:`Value:`}),` `,r?.item.value||`-`]}),(0,B.jsxs)(`div`,{children:[(0,B.jsx)(`strong`,{children:`Index:`}),` `,r?.index||`-`]}),(0,B.jsxs)(`div`,{children:[(0,B.jsx)(`strong`,{children:`Source:`}),` `,r?.source||`-`]}),(0,B.jsxs)(`div`,{children:[(0,B.jsx)(`strong`,{children:`Custom Color:`}),` `,r?.item.color?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(`span`,{style:{display:`inline-block`,width:`12px`,height:`12px`,backgroundColor:r.item.color,borderRadius:`2px`,margin:`0 4px 0 2px`,verticalAlign:`middle`}}),(0,B.jsx)(`span`,{children:r.item.color})]}):(0,B.jsx)(`span`,{children:`-`})]})]})]}),(0,B.jsxs)(`div`,{style:{padding:`16px`,backgroundColor:s?.palette?.sds?.base?.backgroundTertiary,borderRadius:`8px`,maxHeight:`400px`,overflow:`auto`},children:[(0,B.jsx)(`h3`,{style:{margin:`0 0 12px 0`,fontSize:`14px`},children:`Event Log (last 10 events):`}),a.length===0?(0,B.jsx)(`div`,{style:{fontSize:`12px`},children:`No events yet. Hover or click on segments or legend items to see events.`}):(0,B.jsx)(`ul`,{style:{margin:0,padding:`0 0 0 20px`,fontSize:`12px`,fontFamily:`monospace`},children:a.map((e,t)=>(0,B.jsx)(`li`,{style:{marginBottom:`4px`},children:e},t))})]})]})]})}var z,B,V=e((()=>{z=t(s()),E(),d(),B=r()})),H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{P(),me(),V(),j(),H=r(),U={default:D,default2:O,fewerCategories:k,moreCategories:A},W={argTypes:{badge:{control:{type:`text`},description:`Badge text to display next to the title. If not provided, shows dynamic count based on selection`},hideBadge:{control:{type:`boolean`},description:`Hide the badge when true`},barHeight:{control:{type:`number`},description:`Height of the bar in pixels`},data:{control:{type:`select`},description:`Array of data items with name, value, and color properties. Switch datasets to test the segment animations`,mapping:U,options:Object.keys(U)},maxAmount:{control:{type:`number`},description:`Maximum amount for the bar (used only in 'cumulative' mode). If not provided, defaults to sum of all values`},mode:{control:{type:`select`},description:`Chart mode: 'proportional' (segments fill entire bar) or 'cumulative' (segments sized based on maxAmount)`,options:[`proportional`,`cumulative`]},legendValueFormat:{control:{type:`select`},description:`Format for legend values: 'percentage' shows percentage of the item in the bar chart (e.g., '20%'), 'count' shows the count from the data object with the unit defined by the unit prop`,options:[`percentage`,`count`]},selectionBehavior:{control:{type:`select`},description:`Behavior to apply when items are selected: 'dim' makes non-selected segments semi-transparent (20% opacity), 'hide' removes non-selected segments from the bar chart`,options:[`dim`,`hide`]},remainingLabel:{control:{type:`text`},description:`Label for the remaining/unknown segment in cumulative mode`},remainingUnit:{control:{type:`text`},description:`Unit to display with the remaining segment value. If not provided, uses the unit from the first data item`},showLegend:{control:{type:`boolean`},description:`Show/hide the legend at the bottom`},showLegendValues:{control:{type:`boolean`},description:`Show percentage values in the custom legend`},title:{control:{type:`text`},description:`Title to display above the chart`},unit:{control:{type:`text`},description:`Global unit to display with values in cumulative mode. Individual data items can override this with their own unit property`},width:{control:{type:`text`},description:`Width of the chart - accepts any CSS width value (e.g., '100%', '20vw', '300px', or number for pixels)`},colorGeneratorOptions:{control:{type:`object`},description:`Options for the color generator`}},component:N,parameters:{controls:{expanded:!0}},title:`Data Viz/StackedBarChart`},G={start:240,lightness:[.4,.7],correctLightness:!0,rotations:.85,gamma:1},K={args:{data:D,title:`Domain`,width:`360px`,colorGeneratorOptions:{...G}}},q={render:F,args:{barHeight:16,data:D,mode:`proportional`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,colorGeneratorOptions:{...G}}},J={render:F,args:{barHeight:16,data:D,mode:`cumulative`,unit:`datasets`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,maxAmount:700,legendValueFormat:`count`,colorGeneratorOptions:{...G}}},Y={render:F,args:{barHeight:16,data:D,mode:`proportional`,showLegend:!0,showLegendValues:!0,selectionBehavior:`hide`,title:`Domain`,width:`360px`,colorGeneratorOptions:{...G}}},X={render:F,args:{barHeight:16,data:D,mode:`cumulative`,unit:`datasets`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,maxAmount:700,legendValueFormat:`count`,selectionBehavior:`hide`,colorGeneratorOptions:{...G}}},Z={render:R,args:{barHeight:16,data:D,showLegend:!0,showLegendValues:!0,title:`Mouse Events Demo`,width:`360px`,colorGeneratorOptions:{...G}}},Q={args:{data:D,title:`Domain`,width:360},parameters:{snapshot:{skip:!0}},render:e=>(0,H.jsx)(N,{...e,"data-testid":`stacked-bar-chart`})},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    data: STACKED_BAR_CHART_DATA,
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "proportional",
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "cumulative",
    unit: "datasets",
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: "360px",
    maxAmount: 700,
    legendValueFormat: "count",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "proportional",
    showLegend: true,
    showLegendValues: true,
    selectionBehavior: "hide",
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "cumulative",
    unit: "datasets",
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: "360px",
    maxAmount: 700,
    legendValueFormat: "count",
    selectionBehavior: "hide",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: WithMouseEventsStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    showLegend: true,
    showLegendValues: true,
    title: "Mouse Events Demo",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    data: STACKED_BAR_CHART_DATA,
    title: "Domain",
    width: 360
  },
  parameters: {
    snapshot: {
      skip: true
    }
  },
  render: (props: Parameters<typeof StackedBarChart>[0]) => <StackedBarChart {...props} data-testid="stacked-bar-chart" />
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`ProportionalWithSelectionDimBehavior`,`CumulativeWithSelectionDimBehavior`,`ProportionalWithSelectionHideBehavior`,`CumulativeWithSelectionHideBehavior`,`WithMouseEvents`,`Test`]}))();export{J as CumulativeWithSelectionDimBehavior,X as CumulativeWithSelectionHideBehavior,K as Default,q as ProportionalWithSelectionDimBehavior,Y as ProportionalWithSelectionHideBehavior,Q as Test,Z as WithMouseEvents,$ as __namedExportsOrder,W as default};