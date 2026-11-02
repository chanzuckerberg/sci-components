import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Gt as i,Ut as a,b as o,io as s,ro as c}from"./iframe-BPFLG940.js";import{t as l}from"./Button-CvZmp_f8.js";import{t as u}from"./src-DGdb4UFx.js";import{t as d}from"./StackedBarChart-C7Aoc4an.js";import{t as f}from"./src-g2A-qfDy.js";function p(){let[e,t]=(0,m.useState)([1]);return(0,h.jsx)(`div`,{className:`app`,children:(0,h.jsxs)(_,{children:[(0,h.jsxs)(y,{children:[(0,h.jsx)(l,{onClick:()=>t(g.map((e,t)=>t)),sdsStyle:`outline`,sdsType:`primary`,children:`Select all`}),(0,h.jsx)(l,{disabled:e.length===0,onClick:()=>t([]),sdsStyle:`minimal`,sdsType:`secondary`,children:`Clear`})]}),(0,h.jsxs)(v,{children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`selectionBehavior="dim"`}),(0,h.jsx)(d,{data:g,onSelectionChange:t,selectedIndices:e,title:`Modality`,width:`300px`})]}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`selectionBehavior="hide"`}),(0,h.jsx)(d,{data:g,onSelectionChange:t,selectedIndices:e,selectionBehavior:`hide`,title:`Modality`,width:`300px`})]})]})]})})}var m,h,g,_,v,y,b;e((()=>{s(),m=t(n()),u(),f(),h=t(r()),g=[{name:`Transcriptomic`,value:117},{name:`Prosthetics`,value:130},{name:`Epigenomics`,value:100},{name:`Imaging`,value:61}],_=c(`div`,{target:`e17h1r3q3`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${i(e)?.xl}px;
    `,`;`),v=c(`div`,{target:`e17h1r3q2`})(e=>`
      display: flex;
      flex-wrap: wrap;
      gap: ${i(e)?.xxl}px;
    `,`;`),y=c(`div`,{target:`e17h1r3q1`})(e=>`
      display: flex;
      gap: ${i(e)?.s}px;
    `,`;`),b=c(`p`,{target:`e17h1r3q0`})(o,` `,e=>{let t=a(e),n=i(e);return`
      color: ${t?.base?.textSecondary};
      margin: 0 0 ${n?.s}px;
    `},`;`)}))();export{p as default};