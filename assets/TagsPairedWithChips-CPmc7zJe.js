import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Gt as i,Ut as a,b as o,io as s,ro as c}from"./iframe-BPFLG940.js";import{t as l}from"./Button-CvZmp_f8.js";import{t as u}from"./src-DGdb4UFx.js";import{t as d}from"./Tag-D5JaNLkP.js";import{t as f}from"./Chip-D-jE9Njk.js";function p(){let[e,t]=(0,m.useState)(_),n=g.filter(t=>e.includes(t)),r=g.filter(t=>!e.includes(t));return(0,h.jsx)(`div`,{className:`app`,children:(0,h.jsxs)(v,{children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`Applied filters`}),(0,h.jsxs)(y,{"aria-label":`Applied filters`,role:`group`,children:[e.map(e=>(0,h.jsx)(f,{label:e,onDelete:()=>t(t=>t.filter(t=>t!==e))},e)),e.length===0&&(0,h.jsx)(l,{onClick:()=>t(_),sdsStyle:`minimal`,sdsType:`secondary`,children:`Reset filters`})]})]}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(b,{children:`Tissues in this dataset`}),(0,h.jsx)(y,{children:[...n,...r].map(e=>(0,h.jsx)(d,{label:e,sdsStyle:`outline`},e))})]})]})})}var m,h,g,_,v,y,b;e((()=>{s(),u(),m=t(n()),h=t(r()),g=[`Brain`,`Heart`,`Kidney`,`Liver`,`Lung`],_=[`Liver`,`Lung`],v=c(`div`,{target:`e15vkv4k2`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${i(e)?.l}px;
    `,`;`),y=c(`div`,{target:`e15vkv4k1`})(e=>`
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: ${i(e)?.s}px;
      min-height: 32px;
    `,`;`),b=c(`p`,{target:`e15vkv4k0`})(o,` `,e=>{let t=a(e),n=i(e);return`
      color: ${t?.base?.textSecondary};
      margin: 0 0 ${n?.xxs}px;
    `},`;`)}))();export{p as default};