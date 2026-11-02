import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Gt as i,Ut as a,b as o,io as s,ro as c}from"./iframe-BPFLG940.js";import{t as l}from"./Button-CvZmp_f8.js";import{t as u}from"./src-DGdb4UFx.js";import{a as d}from"./discreteColorGenerator-P2_J9T_-.js";function f(){let[e,t]=(0,p.useState)([1]),n=e.length?e.map(e=>h[e].name).join(`, `):`Nothing selected: showing all modalities.`;return(0,m.jsx)(`div`,{className:`app`,children:(0,m.jsxs)(g,{children:[(0,m.jsx)(d,{items:h,onSelectionChange:t,selectedIndices:e,showValues:!0}),(0,m.jsxs)(_,{children:[(0,m.jsx)(l,{onClick:()=>t(h.map((e,t)=>t)),sdsStyle:`outline`,sdsType:`primary`,children:`Select all`}),(0,m.jsx)(l,{disabled:e.length===0,onClick:()=>t([]),sdsStyle:`minimal`,sdsType:`secondary`,children:`Clear`})]}),(0,m.jsx)(v,{children:n})]})})}var p,m,h,g,_,v;e((()=>{s(),p=t(n()),u(),m=t(r()),h=[{color:`#0B6CCC`,name:`Transcriptomic`,value:117},{color:`#3E8F3E`,name:`Prosthetics`,value:130},{color:`#9A54C1`,name:`Epigenomics`,value:100},{color:`#C9721A`,name:`Imaging`,value:61}],g=c(`div`,{target:`eapyc1s2`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${i(e)?.l}px;
      max-width: 420px;
    `,`;`),_=c(`div`,{target:`eapyc1s1`})(e=>`
      display: flex;
      gap: ${i(e)?.s}px;
    `,`;`),v=c(`p`,{target:`eapyc1s0`})(o,` `,e=>`
      color: ${a(e)?.base?.textSecondary};
      margin: 0;
    `,`;`)}))();export{f as default};