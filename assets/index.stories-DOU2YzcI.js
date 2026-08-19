import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r,Hn as i,bo as a}from"./iframe-s0DqqZ6S.js";import{t as o}from"./Button-Knlg9A8k.js";import{t as s}from"./src-kj6aSrnX.js";import{t as c}from"./TagFilter-BOhXbYKc.js";import{n as l,t as u}from"./StackedBarChart-Cp-V2-gs.js";var d,f,p,m,h=e((()=>{d=[{name:`Transcriptomic`,value:117,tooltip:{showSectionHeader:!0,data:[{label:`Transcriptomic`,dataRows:[{label:`Sub-modality`,value:14},{label:`Another sub-modality`,value:19},{label:`Modality sub-type here`,value:270},{label:`Sub-type of modality`,value:93}]}]}},{name:`Imaging`,value:61,tooltip:{data:[{label:`Imaging`,dataRows:[{label:`Fluorescence microscopy`,value:22},{label:`Confocal imaging`,value:15},{label:`Electron microscopy`,value:11},{label:`Light sheet imaging`,value:8},{label:`Two-photon microscopy`,value:5}]}]}},{name:`Sequencing`,value:34,tooltip:{data:[{label:`Sequencing`,dataRows:[{label:`RNA-seq`,value:15},{label:`DNA-seq`,value:10},{label:`ChIP-seq`,value:6},{label:`ATAC-seq`,value:3}]}]}},{name:`Proteomics`,value:15,tooltip:{data:[{label:`Proteomics`,dataRows:[{label:`Proteomics`,value:8},{label:`Metabolomics`,value:4},{label:`Flow cytometry`,value:3}]}]}},{name:`Spatial Transcriptomics`,value:78,tooltip:{data:[{label:`Spatial Transcriptomics`,dataRows:[{label:`Spatial transcriptomics`,value:60},{label:`Spatial proteomics`,value:10},{label:`Spatial metabolomics`,value:5},{label:`Spatial lipidomics`,value:3}]}]}},{name:`Prosthetics`,value:130},{name:`Epigenomics`,value:100,tooltip:{data:[{label:`Epigenomics`,dataRows:[{label:`DNA methylation`,value:30},{label:`Histone modification`,value:20},{label:`Chromatin accessibility`,value:10},{label:`Chromatin remodeling`,value:10},{label:`Chromatin transcription`,value:10},{label:`Chromatin replication`,value:30}]}]}}],f=d.map((e,t)=>({...e,value:[40,190,12,88,25,47,210][t]??e.value})),p=[...d.filter(e=>[`Transcriptomic`,`Imaging`,`Epigenomics`].includes(e.name)),{name:`Electrophysiology`,value:55}],m=[...d.filter(e=>![`Prosthetics`,`Sequencing`].includes(e.name)),{name:`Electrophysiology`,value:55},{name:`Behavioral`,value:28},{name:`Genomics`,value:145},{name:`Metabolomics`,value:42}]})),g,_,v=e((()=>{l(),h(),g=t(r()),_=e=>{let{data:t=d,width:n=360,barHeight:r=16,...i}=e;return(0,g.jsx)(`div`,{style:{margin:150},children:(0,g.jsx)(u,{width:n,data:t,barHeight:r,...i})})}}));function y(e){let{data:t,...n}=e,[r,i]=(0,b.useState)([]),a=(e,t)=>{i(e),console.log(`Selected indices:`,e),console.log(`Selected data:`,t)},s=()=>{a(t.map((e,t)=>t),t)},l=()=>{a([],[])},d=e=>{let n=r.filter(t=>t!==e);a(n,t.filter((e,t)=>n.includes(t)))};return(0,x.jsxs)(`div`,{style:{margin:150},children:[(0,x.jsx)(u,{...n,data:t,selectedIndices:r,onSelectionChange:a}),(0,x.jsxs)(`div`,{style:{marginTop:`40px`},children:[(0,x.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`12px`},children:[(0,x.jsx)(o,{onClick:s,sdsStyle:`outline`,sdsType:`primary`,children:`Select All`}),(0,x.jsx)(o,{onClick:l,sdsStyle:`minimal`,sdsType:`secondary`,disabled:r.length===0,children:`Clear Selection`})]}),(0,x.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`4px`},children:r.length>0&&r.map(e=>(0,x.jsx)(c,{label:t[e]?.name||``,onDelete:()=>d(e)},e))})]})]})}var b,x,S=e((()=>{b=t(n()),s(),l(),x=t(r())}));function C(e){let{data:t,...n}=e,[r,i]=(0,w.useState)(null),[o,s]=(0,w.useState)([]),c=a(),l=e=>{s(t=>[e,...t].slice(0,10))},d=(e,t)=>{i({item:e,index:t,source:`segment`}),l(`Segment Enter: ${e.name} (index ${t})`),console.log(`Segment Mouse Enter:`,{item:e,index:t})},f=(e,t)=>{i(null),l(`Segment Leave: ${e.name} (index ${t})`),console.log(`Segment Mouse Leave:`,{item:e,index:t})},p=(e,t)=>{i({item:e,index:t,source:`legend`}),l(`Legend Enter: ${e.name} (index ${t})`),console.log(`Legend Mouse Enter:`,{item:e,index:t})},m=(e,t)=>{i(null),l(`Legend Leave: ${e.name} (index ${t})`),console.log(`Legend Mouse Leave:`,{item:e,index:t})},h=(e,t)=>{l(`Segment Click: ${e.name} (index ${t})`),console.log(`Segment Click:`,{item:e,index:t})},g=(e,t)=>{l(`Legend Click: ${e.name} (index ${t})`),console.log(`Legend Click:`,{item:e,index:t})};return(0,T.jsxs)(`div`,{style:{margin:150},children:[(0,T.jsx)(u,{...n,data:t,onSegmentMouseEnter:d,onSegmentMouseLeave:f,onLegendItemMouseEnter:p,onLegendItemMouseLeave:m,onSegmentClick:h,onLegendItemClick:g}),(0,T.jsxs)(`div`,{style:{marginTop:`40px`,display:`flex`,gap:`16px`,flexGrow:1,alignItems:`flex-start`},children:[(0,T.jsxs)(`div`,{style:{padding:`16px`,backgroundColor:c?.palette?.sds?.base?.backgroundTertiary,borderRadius:`8px`,marginBottom:`16px`},children:[(0,T.jsx)(`h3`,{style:{margin:`0 0 12px 0`,fontSize:`14px`},children:`Current Hover State (Hover over a bar segment or legend item):`}),(0,T.jsxs)(`div`,{children:[(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`strong`,{children:`Name:`}),` `,r?.item.name||`-`]}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`strong`,{children:`Value:`}),` `,r?.item.value||`-`]}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`strong`,{children:`Index:`}),` `,r?.index||`-`]}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`strong`,{children:`Source:`}),` `,r?.source||`-`]}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`strong`,{children:`Custom Color:`}),` `,r?.item.color?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`span`,{style:{display:`inline-block`,width:`12px`,height:`12px`,backgroundColor:r.item.color,borderRadius:`2px`,margin:`0 4px 0 2px`,verticalAlign:`middle`}}),(0,T.jsx)(`span`,{children:r.item.color})]}):(0,T.jsx)(`span`,{children:`-`})]})]})]}),(0,T.jsxs)(`div`,{style:{padding:`16px`,backgroundColor:c?.palette?.sds?.base?.backgroundTertiary,borderRadius:`8px`,maxHeight:`400px`,overflow:`auto`},children:[(0,T.jsx)(`h3`,{style:{margin:`0 0 12px 0`,fontSize:`14px`},children:`Event Log (last 10 events):`}),o.length===0?(0,T.jsx)(`div`,{style:{fontSize:`12px`},children:`No events yet. Hover or click on segments or legend items to see events.`}):(0,T.jsx)(`ul`,{style:{margin:0,padding:`0 0 0 20px`,fontSize:`12px`,fontFamily:`monospace`},children:o.map((e,t)=>(0,T.jsx)(`li`,{style:{marginBottom:`4px`},children:e},t))})]})]})]})}var w,T,E=e((()=>{w=t(n()),l(),i(),T=t(r())})),D,O,k,A,j,M,N,P,F,I,L,R;e((()=>{v(),S(),E(),h(),D=t(r()),O={default:d,default2:f,fewerCategories:p,moreCategories:m},k={argTypes:{badge:{control:{type:`text`},description:`Badge text to display next to the title. If not provided, shows dynamic count based on selection`},hideBadge:{control:{type:`boolean`},description:`Hide the badge when true`},barHeight:{control:{type:`number`},description:`Height of the bar in pixels`},data:{control:{type:`select`},description:`Array of data items with name, value, and color properties. Switch datasets to test the segment animations`,mapping:O,options:Object.keys(O)},maxAmount:{control:{type:`number`},description:`Maximum amount for the bar (used only in 'cumulative' mode). If not provided, defaults to sum of all values`},mode:{control:{type:`select`},description:`Chart mode: 'proportional' (segments fill entire bar) or 'cumulative' (segments sized based on maxAmount)`,options:[`proportional`,`cumulative`]},legendValueFormat:{control:{type:`select`},description:`Format for legend values: 'percentage' shows percentage of the item in the bar chart (e.g., '20%'), 'count' shows the count from the data object with the unit defined by the unit prop`,options:[`percentage`,`count`]},selectionBehavior:{control:{type:`select`},description:`Behavior to apply when items are selected: 'dim' makes non-selected segments semi-transparent (20% opacity), 'hide' removes non-selected segments from the bar chart`,options:[`dim`,`hide`]},remainingLabel:{control:{type:`text`},description:`Label for the remaining/unknown segment in cumulative mode`},remainingUnit:{control:{type:`text`},description:`Unit to display with the remaining segment value. If not provided, uses the unit from the first data item`},showLegend:{control:{type:`boolean`},description:`Show/hide the legend at the bottom`},showLegendValues:{control:{type:`boolean`},description:`Show percentage values in the custom legend`},title:{control:{type:`text`},description:`Title to display above the chart`},unit:{control:{type:`text`},description:`Global unit to display with values in cumulative mode. Individual data items can override this with their own unit property`},width:{control:{type:`text`},description:`Width of the chart - accepts any CSS width value (e.g., '100%', '20vw', '300px', or number for pixels)`},colorGeneratorOptions:{control:{type:`object`},description:`Options for the color generator`}},component:_,parameters:{controls:{expanded:!0}},title:`Data Viz/StackedBarChart`},A={start:240,lightness:[.4,.7],correctLightness:!0,rotations:.85,gamma:1},j={args:{data:d,title:`Domain`,width:`360px`,colorGeneratorOptions:{...A}}},M={render:y,args:{barHeight:16,data:d,mode:`proportional`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,colorGeneratorOptions:{...A}}},N={render:y,args:{barHeight:16,data:d,mode:`cumulative`,unit:`datasets`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,maxAmount:700,legendValueFormat:`count`,colorGeneratorOptions:{...A}}},P={render:y,args:{barHeight:16,data:d,mode:`proportional`,showLegend:!0,showLegendValues:!0,selectionBehavior:`hide`,title:`Domain`,width:`360px`,colorGeneratorOptions:{...A}}},F={render:y,args:{barHeight:16,data:d,mode:`cumulative`,unit:`datasets`,showLegend:!0,showLegendValues:!0,title:`Domain`,width:`360px`,maxAmount:700,legendValueFormat:`count`,selectionBehavior:`hide`,colorGeneratorOptions:{...A}}},I={render:C,args:{barHeight:16,data:d,showLegend:!0,showLegendValues:!0,title:`Mouse Events Demo`,width:`360px`,colorGeneratorOptions:{...A}}},L={args:{data:d,title:`Domain`,width:360},parameters:{snapshot:{skip:!0}},render:e=>(0,D.jsx)(_,{...e,"data-testid":`stacked-bar-chart`})},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    data: STACKED_BAR_CHART_DATA,
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R=[`Default`,`ProportionalWithSelectionDimBehavior`,`CumulativeWithSelectionDimBehavior`,`ProportionalWithSelectionHideBehavior`,`CumulativeWithSelectionHideBehavior`,`WithMouseEvents`,`Test`]}))();export{N as CumulativeWithSelectionDimBehavior,F as CumulativeWithSelectionHideBehavior,j as Default,M as ProportionalWithSelectionDimBehavior,P as ProportionalWithSelectionHideBehavior,L as Test,I as WithMouseEvents,R as __namedExportsOrder,k as default};