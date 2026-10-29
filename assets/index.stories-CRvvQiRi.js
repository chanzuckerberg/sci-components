import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{i,r as a,t as o}from"./GenomeTrack-4BlhGOfi.js";function s(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function c(e,t,n){let r=t-e+1,i=Math.max(Math.ceil(r/n),1);return{end:t,n_bins:Math.ceil(r/i),start:e,stride:i}}function l(e,t,n,r){let i=[],a=n-t+1,o=Math.max(Math.round(a/6),30),s=t,c=76;for(;s<=n;){let t=Math.max(Math.round(o*(.55+e()*.9)),20),a=Math.min(s+t-1,n),l=S[Math.floor(e()*S.length)],u=e()>.35;i.push({category:l,end:a,id:`${r}:seg_${String(c).padStart(5,`0`)}`,pct_of_segment:Number((.4+e()*.6).toFixed(3)),predicted_label:u?v[Math.floor(e()*v.length)]:null,predicted_support:Number((.35+e()*.6).toFixed(3)),predicted_top:u?_[Math.floor(e()*_.length)]:void 0,start:s,strand:`.`}),s=a+1,c+=1}return i}function u(e,t,n,r){let i=[],a=n-t+1,o=t+Math.round(a*.04),s=0;for(;o<n;){let t=Math.round(a*(.12+e()*.22)),c=Math.min(o+t-1,n);if(c-o<10)break;i.push({end:c,id:`ann_${s}`,kind:e()>.85?`tRNA`:`CDS`,locus_tag:`b${String(1e3+s*7).padStart(4,`0`)}`,name:s===0?r:_[s%_.length],product:v[s%v.length],strand:e()>.45?`+`:`-`,start:o}),o=e()>.66?c-Math.round(t*(.08+e()*.2)):c+Math.round(a*(.02+e()*.08)),s+=1}let c=i[0];if(c&&c.end-c.start>40){let e=c.end-c.start+1,t=c.start+Math.round(e*.45);i.push({end:t+Math.max(Math.round(e*.12),12),id:`ann_${s}`,kind:`tRNA`,locus_tag:`b${String(1e3+s*7).padStart(4,`0`)}`,name:`tRNA-Ala`,product:`Transfer RNA`,start:t,strand:c.strand===`+`?`-`:`+`})}return i.sort((e,t)=>e.start-t.start)}function d(e,t){let n=1e3;return{bins:{end:t,n_bins:n,start:1,stride:Math.ceil(t/n)},chrom:e,chrom_length:t}}function f(e,t=4641652){let n=1e3,r=Math.ceil(t/n),i=s(e),a=Array.from({length:2+Math.floor(i()*3)},()=>({center:i(),weight:.5+i()*.5})),o=Array.from({length:n},(e,t)=>{let r=t/n,o=a.reduce((e,t)=>{let n=Math.abs(r-t.center);return e+t.weight*Math.exp(-((n/.012)**2))},0);return Number(Math.min(o+i()*.04,1).toFixed(3))});return{bins:{end:t,n_bins:n,start:1,stride:r},feature_id:e,values:o}}function p(e,t,n,r){return Array.from({length:r},(r,i)=>{let a=Array.from({length:t.n_bins},()=>0),o=1+Math.floor(e()*2),s=Array.from({length:o},()=>n[Math.floor(e()*n.length)]);for(let n=0;n<t.n_bins;n+=1){let r=t.start+n*t.stride,i=s.some(e=>e&&r>=e.start&&r<=e.end),o=e()*.12,c=i?.45+e()*.55:0;a[n]=Number(Math.min(o+c,1).toFixed(3))}let c=Math.max(...a);return{feature_id:13492-i*1187+Math.floor(e()*40),pct_of_segment:Number((.55+e()*.45).toFixed(3)),peak:c,score:Number((c*(1+e())).toFixed(3)),score_kind:`zscore`,values:a}}).sort((e,t)=>t.score-e.score)}function m(e,t){let n={};return t.forEach((t,r)=>{if(!(r<2||e()<.05))return;let i=Math.floor(e()*b.length);n[String(t.feature_id)]={cluster:i,cluster_label:b[i],cluster_size:40+Math.floor(e()*400),confidence:Number((.6+e()*.4).toFixed(2)),description:y[r%y.length],feature_id:t.feature_id,label:y[r%y.length]}}),n}function h(e,t){let n=``;for(let r=0;r<t;r+=1)n+=`ACGT`[Math.floor(e()*4)];return n}function g(e={}){let{accession:t=`NC_000913.3`,chrom:n=`NC_000913.3`,end:r=45750,featureCount:i=8,gene:a=`fixX`,maxPoints:o=2e3,organism:f=`e_coli_k12`,organismLabel:g=`E. coli K-12`,seed:_=20260921,start:v=45462,withAnnotations:y=!0,withOverview:S=!0,withSequence:C=!0}=e,w=s(_),T=r-v+1,E=c(v,r,o),D=l(w,v,r,`mock-sae:${f}:${t}`),O=p(w,E,D,i),k=3e4,A=4641652,j=S?d(n,A):null;return{annotations:y?u(w,v,r,a):null,bins:E,caps:{available_features:i+14,described_features:1600,features_truncated:!0,labelled_clusters:b.length,max_points:o,max_sequence_window:k,overview_available:S,requested_top_n:i},clusters:[],feature_notes:m(w,O),features:O,locus:{accession:t,chrom:n,end:r,gene:a,genome_length:A,organism:f,organism_label:g,start:v},overview:j,pinned:[],sae:{base_model:`mock-base-model`,n_features:30720,sae:`mock-sae`,segmentation_threshold:.35},schema_version:1,segment_categories:x,segments:D,sequence:C&&T<=k?h(w,T):null}}var _,v,y,b,x,S,C=t((()=>{_=[`fixX`,`yhbW`,`mreB`,`narL`,`cydA`,`sdhC`,`tolC`,`lpxK`,`ftsZ`,`acpP`,`murE`,`glnA`,`rpoS`,`dnaK`,`ompF`],v=[`Putative ferredoxin`,`Hypothetical protein`,`ABC transporter permease`,`Two-component response regulator`,`Cytochrome d ubiquinol oxidase subunit`,`Succinate dehydrogenase membrane anchor`,`Outer membrane channel`,`Tetraacyldisaccharide kinase`],y=[`ATP-binding cassette (ABC) transporter`,`Metal-binding and coordination sites`,`AT-rich intergenic regulatory regions`,`Periplasmic binding protein-like fold domains`,`Helix-turn-helix DNA-binding domains`,`Alpha-helical catalytic domains`,`Beta-strand structural elements`],b=[`Transport and permeability`,`DNA binding`,`Core metabolism`,`Membrane architecture`],x=[`+CDS`,`-CDS`,`intergenic`,`+tRNA`,`-tRNA`,`+rRNA`,`-rRNA`,`+promoter`,`-promoter`,`+terminator`,`-terminator`,`+tfbs`,`-tfbs`,`mobile_element`,`unknown`],S=x.slice(0,6)})),w,T,E,D=t((()=>{C(),w=g(),T=g({end:85e3,featureCount:8,seed:4242,start:45e3}),E=g({seed:512,withOverview:!1})})),O,k,A,j=t((()=>{a(),O=e(n()),D(),C(),k=e(r()),A=e=>{let{data:t,...n}=e,[r,a]=(0,O.useState)(void 0),[s,c]=(0,O.useState)(null),[l,u]=(0,O.useState)(`zscore`);(0,O.useEffect)(()=>{a(t?{end:t.locus.end,start:t.locus.start}:void 0),c(null)},[t?.locus.start,t?.locus.end,t?.locus.accession]);let d=(0,O.useMemo)(()=>{if(!t)return t;let e=s?.kind===`series`?i(s.id):null;return{...t,feature_overview:e===null||!t.overview?null:f(e,t.overview.chrom_length)}},[t,s]);return(0,k.jsx)(`div`,{style:{maxWidth:`100%`,width:860},children:(0,k.jsx)(o,{data:d,onRankingChange:u,onSelectionChange:c,onViewportChange:a,ranking:l,selection:s,viewport:r,...n})})}})),M,N,P,F,I,L,R,z,B,V,H,U,W;t((()=>{D(),j(),M={argTypes:{blockRowHeight:{control:{max:64,min:12,step:2,type:`range`},description:`Height of a segment row, or of one annotation lane, in px`},data:{control:{type:`object`},description:`The window to draw. Null renders the empty state. Story fixtures are synthetic — see mockGenomeTrackData.ts`},density:{control:{type:`inline-radio`},description:`Compact tightens every row and drops the labels and captions, for the in-card variant`,options:[`comfortable`,`compact`]},disableNavigation:{control:{type:`boolean`},description:`Turn off wheel-zoom and drag-pan. Keyboard navigation and selection still work.`},featureRowHeight:{control:{max:64,min:8,step:2,type:`range`},description:`Height of one feature's bars, in px, excluding its name`},maxAnnotationLanes:{control:{max:8,min:1,step:1,type:`range`},description:`Ceiling on the lanes the annotations row packs overlapping genes into`},maxFeatureRows:{control:{max:16,min:1,step:1,type:`range`},description:`How many traces the features row draws, pinned first`},navigationMargin:{control:{max:6,min:0,step:.5,type:`range`},description:`How far pan and zoom may go outside the loaded window, as a multiple of its span. Zero pins the viewport to the payload.`},ranking:{control:{type:`inline-radio`},description:`How the features are ranked, shown in the features dropdown. A fetch parameter: a real shell re-fetches on change.`,options:[`zscore`,`peak`]},showRowLabels:{control:{type:`boolean`},description:`Draw each section's name on a line above its rows. Off for the compact variant.`},loading:{control:{type:`boolean`},description:`Render the skeleton instead of the data`},refreshing:{control:{type:`boolean`},description:`A re-fetch is in flight. Keeps the last good data drawn, unlike loading.`},tracks:{control:{type:`check`},description:`Rows to draw, in order`,options:[`minimap`,`sequence`,`annotations`,`segments`,`features`]}},component:A,title:`Data Viz/GenomeTrack`},N={data:w,density:`comfortable`,tracks:[`minimap`,`sequence`,`annotations`,`segments`,`features`]},P={args:N},F={args:{...N,navigationMargin:0}},I={args:{...N,data:E}},L={args:{...N,data:T,refreshing:!0}},R={args:{...N,data:T}},z={args:{...N,blockRowHeight:12,density:`compact`,disableNavigation:!0,showRowLabels:!1,tracks:[`annotations`,`segments`]}},B={args:{...N,loading:!0}},V={args:{...N,data:null,error:{code:`dependency_unavailable`,message:`Continuous activation cache is not loaded for e_coli_k12.`}}},H={args:{...N,data:null}},U={args:{...N,tracks:[`minimap`,`sequence`,`annotations`,`segments`,`features`]},parameters:{chromatic:{disableSnapshot:!0}}},W=[`Default`,`PinnedToThePayload`,`WithoutOverview`,`Refreshing`,`PooledWindow`,`Compact`,`Loading`,`ErrorState`,`Empty`,`Test`],P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: DEFAULT_ARGS
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    navigationMargin: 0
  }
}`,...F.parameters?.docs?.source},description:{story:`Navigation limited to the loaded window.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    data: NO_OVERVIEW_TRACK_DATA
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    data: POOLED_TRACK_DATA,
    refreshing: true
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    data: POOLED_TRACK_DATA
  }
}`,...R.parameters?.docs?.source},description:{story:`A 40 kb window with a pooled trace.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    blockRowHeight: 12,
    density: "compact",
    disableNavigation: true,
    showRowLabels: false,
    tracks: ["annotations", "segments"]
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    loading: true
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    data: null,
    error: {
      code: "dependency_unavailable",
      message: "Continuous activation cache is not loaded for e_coli_k12."
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    data: null
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    tracks: ["minimap", "sequence", "annotations", "segments", "features"]
  },
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...U.parameters?.docs?.source}}}}))();export{z as Compact,P as Default,H as Empty,V as ErrorState,B as Loading,F as PinnedToThePayload,R as PooledWindow,L as Refreshing,U as Test,I as WithoutOverview,W as __namedExportsOrder,M as default};