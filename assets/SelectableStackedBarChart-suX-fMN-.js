import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Eo as i,G as a,gn as o,ko as s,mn as c}from"./iframe-CLRePdsX.js";import{t as l}from"./Button-DCR2_tBD.js";import{t as u}from"./src-LTclIrci.js";import{t as d}from"./StackedBarChart-DgsEYGUk.js";import{t as f}from"./src-CnV81XuZ.js";function p(){let[e,t]=(0,m.useState)([1]);return(0,h.jsx)(`div`,{className:`app`,children:(0,h.jsxs)(_,{children:[(0,h.jsxs)(y,{children:[(0,h.jsx)(l,{onClick:()=>t(g.map((e,t)=>t)),sdsStyle:`outline`,sdsType:`primary`,children:`Select all`}),(0,h.jsx)(l,{disabled:e.length===0,onClick:()=>t([]),sdsStyle:`minimal`,sdsType:`secondary`,children:`Clear`})]}),(0,h.jsxs)(v,{children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`selectionBehavior="dim"`}),(0,h.jsx)(d,{data:g,onSelectionChange:t,selectedIndices:e,title:`Modality`,width:`300px`})]}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`selectionBehavior="hide"`}),(0,h.jsx)(d,{data:g,onSelectionChange:t,selectedIndices:e,selectionBehavior:`hide`,title:`Modality`,width:`300px`})]})]})]})})}var m,h,g,_,v,y,b;e((()=>{r(),m=t(n()),u(),f(),h=t(i()),g=[{name:`Transcriptomic`,value:117},{name:`Prosthetics`,value:130},{name:`Epigenomics`,value:100},{name:`Imaging`,value:61}],_=s(`div`,{target:`e17h1r3q3`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${o(e)?.xl}px;
    `,`;`),v=s(`div`,{target:`e17h1r3q2`})(e=>`
      display: flex;
      flex-wrap: wrap;
      gap: ${o(e)?.xxl}px;
    `,`;`),y=s(`div`,{target:`e17h1r3q1`})(e=>`
      display: flex;
      gap: ${o(e)?.s}px;
    `,`;`),b=s(`p`,{target:`e17h1r3q0`})(a,` `,e=>{let t=c(e),n=o(e);return`
      color: ${t?.base?.textSecondary};
      margin: 0 0 ${n?.s}px;
    `},`;`)}))();export{p as default};