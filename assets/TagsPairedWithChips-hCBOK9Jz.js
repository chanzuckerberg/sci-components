import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{Gt as o,Ut as s,b as c}from"./iframe-FMtQz5A8.js";import{t as l}from"./Button-hr5Pmags.js";import{t as u}from"./src-DeWZsJ23.js";import{t as d}from"./Tag-BSfB3BZM.js";import{t as f}from"./Chip-Cmz6_-wO.js";function p(){let[e,t]=(0,m.useState)(_),n=g.filter(t=>e.includes(t)),r=g.filter(t=>!e.includes(t));return(0,h.jsx)(`div`,{className:`app`,children:(0,h.jsxs)(v,{children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`Applied filters`}),(0,h.jsxs)(y,{"aria-label":`Applied filters`,role:`group`,children:[e.map(e=>(0,h.jsx)(f,{label:e,onDelete:()=>t(t=>t.filter(t=>t!==e))},e)),e.length===0&&(0,h.jsx)(l,{onClick:()=>t(_),sdsStyle:`minimal`,sdsType:`secondary`,children:`Reset filters`})]})]}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`Tissues in this dataset`}),(0,h.jsx)(y,{children:[...n,...r].map(e=>(0,h.jsx)(d,{label:e,sdsStyle:`outline`},e))})]})]})})}var m,h,g,_,v,y,b;t((()=>{r(),u(),m=e(n()),h=e(a()),g=[`Brain`,`Heart`,`Kidney`,`Liver`,`Lung`],_=[`Liver`,`Lung`],v=i(`div`,{target:`e15vkv4k2`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${o(e)?.l}px;
    `,`;`),y=i(`div`,{target:`e15vkv4k1`})(e=>`
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: ${o(e)?.s}px;
      min-height: 32px;
    `,`;`),b=i(`p`,{target:`e15vkv4k0`})(c,` `,e=>{let t=s(e),n=o(e);return`
      color: ${t?.base?.textSecondary};
      margin: 0 0 ${n?.xxs}px;
    `},`;`)}))();export{p as default};