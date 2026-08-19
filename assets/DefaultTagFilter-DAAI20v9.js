import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Eo as i,G as a,gn as o,ko as s,mn as c}from"./iframe-CLRePdsX.js";import{t as l}from"./src-LTclIrci.js";import{t as u}from"./TagFilter-D3ez-3j3.js";function d(){let[e,t]=(0,f.useState)(m);return(0,p.jsxs)(`div`,{className:`app`,children:[(0,p.jsx)(h,{"aria-label":`Applied filters`,role:`group`,children:e.map(e=>(0,p.jsx)(u,{label:e,onDelete:()=>t(t=>t.filter(t=>t!==e))},e))}),(0,p.jsx)(g,{children:e.length>0?`${e.length} of ${m.length} filters applied`:`No filters applied`})]})}var f,p,m,h,g;e((()=>{r(),l(),f=t(n()),p=t(i()),m=[`Homo sapiens`,`Lung`,`10x 3' v3`,`Healthy`],h=s(`div`,{target:`e1kp3p3e1`})(e=>{let t=o(e);return`
      display: flex;
      flex-wrap: wrap;
      gap: ${t?.s}px;
      margin-bottom: ${t?.m}px;
      min-height: 28px;
    `},`;`),g=s(`p`,{target:`e1kp3p3e0`})(a,` `,e=>`
      color: ${c(e)?.base?.textSecondary};
      margin: 0;
    `,`;`)}))();export{d as default};