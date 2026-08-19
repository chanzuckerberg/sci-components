import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Eo as i,G as a,gn as o,ko as s,mn as c}from"./iframe-s0DqqZ6S.js";import{t as l}from"./Button-Knlg9A8k.js";import{t as u}from"./src-kj6aSrnX.js";import{r as d}from"./discreteColorGenerator-B3JoicpR.js";function f(){let[e,t]=(0,p.useState)([1]),n=e.length?e.map(e=>h[e].name).join(`, `):`Nothing selected: showing all modalities.`;return(0,m.jsx)(`div`,{className:`app`,children:(0,m.jsxs)(g,{children:[(0,m.jsx)(d,{items:h,onSelectionChange:t,selectedIndices:e,showValues:!0}),(0,m.jsxs)(_,{children:[(0,m.jsx)(l,{onClick:()=>t(h.map((e,t)=>t)),sdsStyle:`outline`,sdsType:`primary`,children:`Select all`}),(0,m.jsx)(l,{disabled:e.length===0,onClick:()=>t([]),sdsStyle:`minimal`,sdsType:`secondary`,children:`Clear`})]}),(0,m.jsx)(v,{children:n})]})})}var p,m,h,g,_,v;e((()=>{r(),p=t(n()),u(),m=t(i()),h=[{color:`#0B6CCC`,name:`Transcriptomic`,value:117},{color:`#3E8F3E`,name:`Prosthetics`,value:130},{color:`#9A54C1`,name:`Epigenomics`,value:100},{color:`#C9721A`,name:`Imaging`,value:61}],g=s(`div`,{target:`eapyc1s2`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${o(e)?.l}px;
      max-width: 420px;
    `,`;`),_=s(`div`,{target:`eapyc1s1`})(e=>`
      display: flex;
      gap: ${o(e)?.s}px;
    `,`;`),v=s(`p`,{target:`eapyc1s0`})(a,` `,e=>`
      color: ${c(e)?.base?.textSecondary};
      margin: 0;
    `,`;`)}))();export{f as default};