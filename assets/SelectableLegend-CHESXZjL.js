import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{Gt as o,Ut as s,b as c}from"./iframe-FMtQz5A8.js";import{t as l}from"./Button-hr5Pmags.js";import{t as u}from"./src-DeWZsJ23.js";import{a as d}from"./discreteColorGenerator-CmnO6KWe.js";function f(){let[e,t]=(0,p.useState)([1]),n=e.length?e.map(e=>h[e].name).join(`, `):`Nothing selected: showing all modalities.`;return(0,m.jsx)(`div`,{className:`app`,children:(0,m.jsxs)(g,{children:[(0,m.jsx)(d,{items:h,onSelectionChange:t,selectedIndices:e,showValues:!0}),(0,m.jsxs)(_,{children:[(0,m.jsx)(l,{onClick:()=>t(h.map((e,t)=>t)),sdsStyle:`outline`,sdsType:`primary`,children:`Select all`}),(0,m.jsx)(l,{disabled:e.length===0,onClick:()=>t([]),sdsStyle:`minimal`,sdsType:`secondary`,children:`Clear`})]}),(0,m.jsx)(v,{children:n})]})})}var p,m,h,g,_,v;t((()=>{r(),p=e(n()),u(),m=e(a()),h=[{color:`#0B6CCC`,name:`Transcriptomic`,value:117},{color:`#3E8F3E`,name:`Prosthetics`,value:130},{color:`#9A54C1`,name:`Epigenomics`,value:100},{color:`#C9721A`,name:`Imaging`,value:61}],g=i(`div`,{target:`eapyc1s2`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${o(e)?.l}px;
      max-width: 420px;
    `,`;`),_=i(`div`,{target:`eapyc1s1`})(e=>`
      display: flex;
      gap: ${o(e)?.s}px;
    `,`;`),v=i(`p`,{target:`eapyc1s0`})(c,` `,e=>`
      color: ${s(e)?.base?.textSecondary};
      margin: 0;
    `,`;`)}))();export{f as default};