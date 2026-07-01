import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,F as r,Gi as i,Mi as a,Ni as o,O as s,Ti as c,W as l,Y as u,Z as d,ct as f,q as ee}from"./iframe-Bjh1LYUt.js";import{t as p}from"./Button-BT0OC4_c.js";import{t as m}from"./Tooltip-DnwfrD0l.js";import{t as h}from"./TooltipTable-DqJconYH.js";import{t as g}from"./TagFilter-CIbvk10N.js";import{r as te,t as ne}from"./discreteColorGenerator-CiGh37UH.js";import{t as _}from"./src-DhpUGJf5.js";var v,re,ie,ae,oe,se,ce,y=t((()=>{o(),_(),v=a(`div`,{target:`eja2e936`})(`display:flex;flex-direction:column;width:`,e=>typeof e.width==`number`?`${e.width}px`:e.width,`;`),re=a(`div`,{target:`eja2e935`})(`display:flex;align-items:center;`,e=>{let t=d(e);return`
      gap: ${t?.s}px;
      margin-bottom: ${t?.l}px;
    `},`;`),ie=a(`div`,{target:`eja2e934`})(s,` `,e=>`
      color: ${u(e)?.base?.textPrimary};
    `,`;`),ae=a(`div`,{target:`eja2e933`})(r,` `,e=>{let t=d(e),n=l(e),r=u(e);return`
      padding: ${t?.xxxs}px ${t?.xxs}px;
      border-radius: ${n?.m}px;
      background-color: ${r?.base?.backgroundTertiary};
      color: ${r?.base?.textSecondary};
    `},`;`),oe=a(`div`,{target:`eja2e932`})(e=>{let{width:t,barHeight:n,isEmpty:r}=e,i=l(e),a=u(e),o=typeof t==`number`?`${t}px`:t;return`
      display: flex;
      border-radius: ${i?.s}px;
      width: ${o};
      height: ${n}px;
      background-color: ${r?a?.base?.backgroundTertiary:`transparent`};
      overflow: hidden;
    `},`;`),se=a(`div`,{target:`eja2e931`})(e=>{let{color:t,height:n,percentage:r,opacity:i,disabled:a,isLast:o}=e,s=d(e)?.xxxs||0;return`
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
    `},`;`),ce=a(`div`,{target:`eja2e930`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${d(e)?.m}px;
    `,`;`)})),b,x,le,S,C,w,T,ue,de,fe,E,D=t((()=>{b=e(n()),_(),y(),f(),x=i(),le=(e,t)=>t===0||t===e?`${e}`:`${t} of ${e}`,S=(e,t,n,r)=>{if(!t)return;if(n===`percentage`)return`${Math.round(e.percentage)}%`;let i=e.unit||r;return i?`${e.value} ${i}`:`${e.value}`},C=(e,t,n,r)=>{let i=n.size>0;return r===`hide`?1:t===null?i?n.has(e)?1:.2:1:t===e||n.has(e)?1:.2},w=(e,t,n,r,i)=>{let a=r?i-n:0,o=r?a/i*100:0;return{styledItems:e.map(e=>{let n=t.has(e.originalIndex);return{...e,percentage:n?e.percentage:0}}),updatedRemainingPercentage:o,updatedRemainingValue:a}},T=(e,t,n)=>n===0?{styledItems:e.map(e=>({...e,percentage:0})),updatedRemainingPercentage:0,updatedRemainingValue:0}:{styledItems:e.map(e=>{let r=t.has(e.originalIndex)?e.value/n*100:0;return{...e,percentage:r}}),updatedRemainingPercentage:0,updatedRemainingValue:0},ue=(e,t,n,r,i,a,o,s)=>{let c=t.size>0;if(n!==`hide`||!c)return{styledItems:e,updatedRemainingPercentage:o,updatedRemainingValue:s};let l=e.filter(e=>t.has(e.originalIndex)).reduce((e,t)=>e+t.value,0);return r===`cumulative`?w(e,t,l,i,a):T(e,t,l)},de=(e,t)=>{let{showLegendValues:n,legendValueFormat:r,unit:i,hasRemaining:a,showLegend:o,remainingValue:s,remainingPercentage:c,remainingLabel:l,remainingUnit:u,theme:d}=t,f=e.map(e=>({name:e.name,value:S(e,n,r,i),color:e.color,disabled:e.disabled}));if(a&&o){let e;if(!n)e=void 0;else if(r===`percentage`)e=`${Math.round(c)}%`;else{let t=u||i||``;e=t?`${s} ${t}`:`${s}`}f.push({name:l,value:e,color:d?.palette?.sds?.base?.backgroundTertiary,disabled:!0})}return f},fe=(e,t,n)=>{let{barHeight:r,hoveredIndex:i,selectedIndicesSet:a,selectionBehavior:o,isLast:s,onMouseEnter:c,onMouseLeave:l,onClick:u}=n,d=o===`hide`&&e.percentage===0,f=(0,x.jsx)(se,{color:e.color,percentage:e.percentage,height:r,opacity:C(e.originalIndex,i,a,o),isLast:s,"data-hide":d,onMouseEnter:c,onMouseLeave:l,onClick:u});return e.tooltip===void 0?(0,b.cloneElement)(f,{key:e.key}):(0,x.jsx)(m,{title:null,componentSlot:(0,x.jsx)(h,{...e.tooltip}),placement:`top`,hasInvertedStyle:!1,open:i===e.originalIndex&&!d,disableInteractive:!0,PopperProps:{disablePortal:!1,modifiers:[{name:`offset`,options:{offset:[0,0]}}]},children:f},e.key)},E=e=>{let{title:t,badge:n,hideBadge:r=!1,data:i,width:a=`100%`,barHeight:o=16,showLegend:s=!0,showLegendValues:l=!0,legendValueFormat:u=`percentage`,selectedIndices:d=[],onSelectionChange:f,onSegmentMouseEnter:p,onSegmentMouseLeave:m,onLegendItemMouseEnter:h,onLegendItemMouseLeave:g,onSegmentClick:_,onLegendItemClick:y,selectionBehavior:S=`dim`,mode:C=`proportional`,maxAmount:w,remainingLabel:T=`Remaining`,remainingUnit:E,unit:D,colorGeneratorOptions:O,...k}=e,A=Math.max(1,o),j=c(),[pe,M]=(0,b.useState)(null),[N,P]=(0,b.useState)([]),[F,I]=(0,b.useState)(new Map),[L,R]=(0,b.useState)(0),z=(0,b.useRef)([]),B=(0,b.useRef)(new Set),V=(0,b.useRef)(null),H=(0,b.useRef)(0),U=(0,b.useCallback)((e,t,n,r)=>{if(typeof window>`u`){P(t),z.current=t,R(r),H.current=r;return}let i=new Map(t.map(e=>[e.key,e])),a=e.filter(e=>!i.has(e.key)).map(e=>e.key);if(a.length===0)return;let o=new Set(a),s=e.map(e=>o.has(e.key)?{...e,isExiting:!0}:{...e,isExiting:!1});P(s),z.current=s,R(n);let c=[],l=requestAnimationFrame(()=>{let e=requestAnimationFrame(()=>{P(e=>{let n=new Set(e.map(e=>e.key)),r=e.map(e=>o.has(e.key)?{...e,percentage:0}:{...e,isExiting:!1}),i=t.filter(e=>!n.has(e.key));return[...r,...i]}),R(r)});c.push(e)});c.push(l);let u=window.setTimeout(()=>{P(t),z.current=t,R(r),H.current=r},350);return()=>{c.forEach(e=>window.cancelAnimationFrame(e)),window.clearTimeout(u)}},[]),W=(0,b.useMemo)(()=>ee({theme:j})===`dark`,[j]),G=(0,b.useCallback)(e=>{let t=ne(e.length,{...O||{},isDarkMode:W}),n=new Map;return e.forEach((e,r)=>{n.set(e.name,t[r]||j?.palette?.sds?.base?.ornamentSecondary)}),n},[O,W,j]);(0,b.useEffect)(()=>{let e=i.filter(e=>!e.color),t=new Set(i.map(e=>e.name)),n=B.current,r=V.current,a=!r||r.isDarkMode!==W||r.options!==O;if(B.current=t,V.current={options:O,isDarkMode:W},e.length===0){F.size>0&&I(new Map);return}let o=e.some(e=>!n.has(e.name));if(F.size===0||o||a)I(G(e));else{let t=new Set(e.map(e=>e.name)),n=new Map(F),r=!1;for(let e of Array.from(n.keys()))t.has(e)||(n.delete(e),r=!0);r&&I(n)}},[i,O,W,j,G]);let K=n??le(i.length,d.length),{effectiveMaxAmount:q,hasRemaining:J,remainingValue:Y,remainingPercentage:X}=(0,b.useMemo)(()=>{let e=i.reduce((e,t)=>e+t.value,0),t=C===`cumulative`&&w?w:e,n=C===`cumulative`&&e<t,r=n?t-e:0;return{effectiveMaxAmount:t,hasRemaining:n,remainingValue:r,remainingPercentage:n?r/t*100:0}},[i,C,w]),Z=(0,b.useMemo)(()=>i.map((e,t)=>{let n=e.color||F.get(e.name)||j?.palette?.sds?.base?.ornamentSecondary;return{...e,color:n,percentage:q>0?e.value/q*100:0,key:e.name,originalIndex:t}}),[i,q,F,j]);(0,b.useEffect)(()=>{let e=z.current;if(e.length===0){P(Z),z.current=Z,R(X),H.current=X;return}let t=U(e,Z,H.current,X);if(t)return t;P(Z),z.current=Z,R(X),H.current=X},[Z,X,U]);let Q=(0,b.useMemo)(()=>new Set(d),[d]),{styledItems:$,updatedRemainingPercentage:me,updatedRemainingValue:he}=(0,b.useMemo)(()=>ue(N,Q,S,C,J,q,L,Y),[N,Q,S,C,J,q,L,Y]),ge=S===`hide`&&d.length>0,_e=ge?me:L,ve=ge?he:Y,ye=(0,b.useMemo)(()=>de(Z,{showLegendValues:l,legendValueFormat:u,unit:D,hasRemaining:J,showLegend:s,remainingValue:ve,remainingPercentage:_e,remainingLabel:T,remainingUnit:E,theme:j}),[Z,l,u,D,J,s,ve,_e,T,E,j]),be=(0,b.useCallback)((e,t)=>{M(t),h&&i[t]&&h(i[t],t)},[h,i]),xe=(0,b.useCallback)((e,t)=>{M(null),g&&i[t]&&g(i[t],t)},[g,i]),Se=(0,b.useCallback)((e,t)=>{y&&i[t]&&y(i[t],t)},[y,i]),Ce=(0,b.useCallback)(e=>{f&&f(e,i.filter((t,n)=>e.includes(n)))},[f,i]),we=(0,b.useCallback)(e=>{_&&i[e]&&_(i[e],e),f&&Ce(Q.has(e)?d.filter(t=>t!==e):[...d,e])},[f,_,i,d,Q,Ce]),Te=(0,b.useMemo)(()=>{for(let e=$.length-1;e>=0;e--)if($[e].percentage>0)return e;return-1},[$]),Ee=(0,x.jsxs)(ce,{children:[(0,x.jsxs)(oe,{width:a,barHeight:A,isEmpty:$.length===0&&!J,children:[$.map((e,t)=>fe(e,t,{barHeight:A,hoveredIndex:pe,selectedIndicesSet:Q,selectionBehavior:S,isLast:t===Te&&!J,onMouseEnter:()=>{e.isExiting||(M(e.originalIndex),p&&i[e.originalIndex]&&p(i[e.originalIndex],e.originalIndex))},onMouseLeave:()=>{M(null),m&&i[e.originalIndex]&&m(i[e.originalIndex],e.originalIndex)},onClick:()=>!e.isExiting&&we(e.originalIndex)})),J&&(0,x.jsx)(se,{color:j?.palette?.sds?.base?.backgroundTertiary,percentage:_e,height:A,isLast:!0,opacity:1,disabled:!0},`remaining`)]}),s&&(0,x.jsx)(te,{items:ye,showValues:l,onItemMouseEnter:be,onItemMouseLeave:xe,onItemClick:y?Se:void 0,selectedIndices:d,onSelectionChange:f?Ce:void 0,hoveredIndex:pe})]});return t?(0,x.jsxs)(v,{width:a,...k,children:[(0,x.jsxs)(re,{children:[(0,x.jsx)(ie,{children:t}),!r&&K&&(0,x.jsx)(ae,{children:K})]}),Ee]}):(0,x.jsx)(v,{width:a,...k,children:Ee})}})),O,k=t((()=>{O=[{name:`Transcriptomic`,value:117,tooltip:{showSectionHeader:!0,data:[{label:`Transcriptomic`,dataRows:[{label:`Sub-modality`,value:14},{label:`Another sub-modality`,value:19},{label:`Modality sub-type here`,value:270},{label:`Sub-type of modality`,value:93}]}]}},{name:`Imaging`,value:61,tooltip:{data:[{label:`Imaging`,dataRows:[{label:`Fluorescence microscopy`,value:22},{label:`Confocal imaging`,value:15},{label:`Electron microscopy`,value:11},{label:`Light sheet imaging`,value:8},{label:`Two-photon microscopy`,value:5}]}]}},{name:`Sequencing`,value:34,tooltip:{data:[{label:`Sequencing`,dataRows:[{label:`RNA-seq`,value:15},{label:`DNA-seq`,value:10},{label:`ChIP-seq`,value:6},{label:`ATAC-seq`,value:3}]}]}},{name:`Proteomics`,value:15,tooltip:{data:[{label:`Proteomics`,dataRows:[{label:`Proteomics`,value:8},{label:`Metabolomics`,value:4},{label:`Flow cytometry`,value:3}]}]}},{name:`Spatial Transcriptomics`,value:78,tooltip:{data:[{label:`Spatial Transcriptomics`,dataRows:[{label:`Spatial transcriptomics`,value:60},{label:`Spatial proteomics`,value:10},{label:`Spatial metabolomics`,value:5},{label:`Spatial lipidomics`,value:3}]}]}},{name:`Prosthetics`,value:130},{name:`Epigenomics`,value:100,tooltip:{data:[{label:`Epigenomics`,dataRows:[{label:`DNA methylation`,value:30},{label:`Histone modification`,value:20},{label:`Chromatin accessibility`,value:10},{label:`Chromatin remodeling`,value:10},{label:`Chromatin transcription`,value:10},{label:`Chromatin replication`,value:30}]}]}}]})),A,j,pe=t((()=>{D(),k(),A=i(),j=e=>{let{data:t=O,width:n=360,barHeight:r=16,...i}=e;return(0,A.jsx)(`div`,{style:{margin:150},children:(0,A.jsx)(E,{width:n,data:t,barHeight:r,...i})})}}));function M(e){let{data:t,...n}=e,[r,i]=(0,N.useState)([]),a=(e,t)=>{i(e),console.log(`Selected indices:`,e),console.log(`Selected data:`,t)},o=()=>{a(t.map((e,t)=>t),t)},s=()=>{a([],[])},c=e=>{let n=r.filter(t=>t!==e);a(n,t.filter((e,t)=>n.includes(t)))};return(0,P.jsxs)(`div`,{style:{margin:150},children:[(0,P.jsx)(E,{...n,data:t,selectedIndices:r,onSelectionChange:a}),(0,P.jsxs)(`div`,{style:{marginTop:`40px`},children:[(0,P.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`12px`},children:[(0,P.jsx)(p,{onClick:o,sdsStyle:`outline`,sdsType:`primary`,children:`Select All`}),(0,P.jsx)(p,{onClick:s,sdsStyle:`minimal`,sdsType:`secondary`,disabled:r.length===0,children:`Clear Selection`})]}),(0,P.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px`},children:r.length>0&&r.map(e=>(0,P.jsx)(g,{label:t[e]?.name||``,onDelete:()=>c(e)},e))})]})]})}var N,P,F=t((()=>{N=e(n()),_(),D(),P=i()}));function I(e){let{data:t,...n}=e,[r,i]=(0,L.useState)(null),[a,o]=(0,L.useState)([]),s=c(),l=e=>{o(t=>[e,...t].slice(0,10))},u=(e,t)=>{i({item:e,index:t,source:`segment`}),l(`Segment Enter: ${e.name} (index ${t})`),console.log(`Segment Mouse Enter:`,{item:e,index:t})},d=(e,t)=>{i(null),l(`Segment Leave: ${e.name} (index ${t})`),console.log(`Segment Mouse Leave:`,{item:e,index:t})},f=(e,t)=>{i({item:e,index:t,source:`legend`}),l(`Legend Enter: ${e.name} (index ${t})`),console.log(`Legend Mouse Enter:`,{item:e,index:t})},ee=(e,t)=>{i(null),l(`Legend Leave: ${e.name} (index ${t})`),console.log(`Legend Mouse Leave:`,{item:e,index:t})},p=(e,t)=>{l(`Segment Click: ${e.name} (index ${t})`),console.log(`Segment Click:`,{item:e,index:t})},m=(e,t)=>{l(`Legend Click: ${e.name} (index ${t})`),console.log(`Legend Click:`,{item:e,index:t})};return(0,R.jsxs)(`div`,{style:{margin:150},children:[(0,R.jsx)(E,{...n,data:t,onSegmentMouseEnter:u,onSegmentMouseLeave:d,onLegendItemMouseEnter:f,onLegendItemMouseLeave:ee,onSegmentClick:p,onLegendItemClick:m}),(0,R.jsxs)(`div`,{style:{marginTop:`40px`,display:`flex`,gap:`16px`,flexGrow:1,alignItems:`flex-start`},children:[(0,R.jsxs)(`div`,{style:{padding:`16px`,backgroundColor:s?.palette?.sds?.base?.backgroundTertiary,borderRadius:`8px`,marginBottom:`16px`},children:[(0,R.jsx)(`h3`,{style:{margin:`0 0 12px 0`,fontSize:`14px`},children:`Current Hover State (Hover over a bar segment or legend item):`}),(0,R.jsxs)(`div`,{children:[(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`strong`,{children:`Name:`}),` `,r?.item.name||`-`]}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`strong`,{children:`Value:`}),` `,r?.item.value||`-`]}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`strong`,{children:`Index:`}),` `,r?.index||`-`]}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`strong`,{children:`Source:`}),` `,r?.source||`-`]}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`strong`,{children:`Custom Color:`}),` `,r?.item.color?(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(`span`,{style:{display:`inline-block`,width:`12px`,height:`12px`,backgroundColor:r.item.color,borderRadius:`2px`,margin:`0 4px 0 2px`,verticalAlign:`middle`}}),(0,R.jsx)(`span`,{children:r.item.color})]}):(0,R.jsx)(`span`,{children:`-`})]})]})]}),(0,R.jsxs)(`div`,{style:{padding:`16px`,backgroundColor:s?.palette?.sds?.base?.backgroundTertiary,borderRadius:`8px`,maxHeight:`400px`,overflow:`auto`},children:[(0,R.jsx)(`h3`,{style:{margin:`0 0 12px 0`,fontSize:`14px`},children:`Event Log (last 10 events):`}),a.length===0?(0,R.jsx)(`div`,{style:{fontSize:`12px`},children:`No events yet. Hover or click on segments or legend items to see events.`}):(0,R.jsx)(`ul`,{style:{margin:0,padding:`0 0 0 20px`,fontSize:`12px`,fontFamily:`monospace`},children:a.map((e,t)=>(0,R.jsx)(`li`,{style:{marginBottom:`4px`},children:e},t))})]})]})]})}var L,R,z=t((()=>{L=e(n()),D(),f(),R=i()})),B,V,H,U,W,G,K,q,J,Y,X;t((()=>{pe(),F(),z(),k(),B=i(),V={argTypes:{badge:{control:{type:`text`},description:`Badge text to display next to the title. If not provided, shows dynamic count based on selection`},hideBadge:{control:{type:`boolean`},description:`Hide the badge when true`},barHeight:{control:{type:`number`},description:`Height of the bar in pixels`},data:{control:{type:`object`},description:`Array of data items with name, value, and color properties`},maxAmount:{control:{type:`number`},description:`Maximum amount for the bar (used only in 'cumulative' mode). If not provided, defaults to sum of all values`},mode:{control:{type:`select`},description:`Chart mode: 'proportional' (segments fill entire bar) or 'cumulative' (segments sized based on maxAmount)`,options:[`proportional`,`cumulative`]},legendValueFormat:{control:{type:`select`},description:`Format for legend values: 'percentage' shows percentage of the item in the bar chart (e.g., '20%'), 'count' shows the count from the data object with the unit defined by the unit prop`,options:[`percentage`,`count`]},selectionBehavior:{control:{type:`select`},description:`Behavior to apply when items are selected: 'dim' makes non-selected segments semi-transparent (20% opacity), 'hide' removes non-selected segments from the bar chart`,options:[`dim`,`hide`]},remainingLabel:{control:{type:`text`},description:`Label for the remaining/unknown segment in cumulative mode`},remainingUnit:{control:{type:`text`},description:`Unit to display with the remaining segment value. If not provided, uses the unit from the first data item`},showLegend:{control:{type:`boolean`},description:`Show/hide the legend at the bottom`},showLegendValues:{control:{type:`boolean`},description:`Show percentage values in the custom legend`},title:{control:{type:`text`},description:`Title to display above the chart`},unit:{control:{type:`text`},description:`Global unit to display with values in cumulative mode. Individual data items can override this with their own unit property`},width:{control:{type:`text`},description:`Width of the chart - accepts any CSS width value (e.g., '100%', '20vw', '300px', or number for pixels)`},colorGeneratorOptions:{control:{type:`object`},description:`Options for the color generator`}},component:j,tags:[`beta`],parameters:{controls:{expanded:!0}},title:`Data Viz/StackedBarChart`},H={start:240,lightness:[.4,.7],correctLightness:!0,rotations:.85,gamma:1},U={args:{data:O,title:`Domain`,width:`360px`,colorGeneratorOptions:{...H}}},W={render:M,args:{barHeight:16,data:O,mode:`proportional`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,colorGeneratorOptions:{...H}}},G={render:M,args:{barHeight:16,data:O,mode:`cumulative`,unit:`datasets`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,maxAmount:700,legendValueFormat:`count`,colorGeneratorOptions:{...H}}},K={render:M,args:{barHeight:16,data:O,mode:`proportional`,showLegend:!0,showLegendValues:!0,selectionBehavior:`hide`,title:`Domain`,width:`360px`,colorGeneratorOptions:{...H}}},q={render:M,args:{barHeight:16,data:O,mode:`cumulative`,unit:`datasets`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,maxAmount:700,legendValueFormat:`count`,selectionBehavior:`hide`,colorGeneratorOptions:{...H}}},J={render:I,args:{barHeight:16,data:O,showLegend:!0,showLegendValues:!0,title:`Mouse Events Demo`,width:`360px`,colorGeneratorOptions:{...H}}},Y={args:{data:O,title:`Domain`,width:360},parameters:{snapshot:{skip:!0}},render:e=>(0,B.jsx)(j,{...e,"data-testid":`stacked-bar-chart`})},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    data: STACKED_BAR_CHART_DATA,
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source}}},X=[`Default`,`ProportionalWithSelectionDimBehavior`,`CumulativeWithSelectionDimBehavior`,`ProportionalWithSelectionHideBehavior`,`CumulativeWithSelectionHideBehavior`,`WithMouseEvents`,`Test`]}))();export{G as CumulativeWithSelectionDimBehavior,q as CumulativeWithSelectionHideBehavior,U as Default,W as ProportionalWithSelectionDimBehavior,K as ProportionalWithSelectionHideBehavior,Y as Test,J as WithMouseEvents,X as __namedExportsOrder,V as default};