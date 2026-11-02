import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Gt as i,Ut as a,io as o,ro as s,t as c,v as l}from"./iframe-BPFLG940.js";import{n as u,t as d}from"./Icon-DpYImm5o.js";var f,p,m=e((()=>{o(),c(),f=s(`div`,{target:`em85jr71`})(`display:flex;flex-direction:column;`,e=>{let t=i(e),n=a(e),r=e.borderIntent?n?.[e.borderIntent]?.border:`transparent`;return`
      gap: ${t?.s}px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: -${(t?.xs||0)+2}px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: ${r};
        display: ${e.hasBorder?`block`:`none`};
      }
    `},`;`),p=s(`div`,{target:`em85jr70`})(l,` display:flex;align-items:start;`,e=>{let t=i(e),n=a(e)?.[e.intent];return`
      gap: ${t?.xs}px;
      color: ${n?.foreground};

      svg {
        margin-top: ${t?.xxxs}px;
        fill: ${n?.foreground};
        path {
          fill: ${n?.foreground};
        }
      }
    `},`;`)})),h,g,_,v,y=e((()=>{h=t(n()),u(),m(),g=t(r()),_={negative:0,notice:1,positive:2},v=e=>{let{messages:t=[],children:n,border:r=!1,autoOrder:i=!0,orderBy:a,...o}=e,s=a?Object.fromEntries(a.map((e,t)=>[e,t])):_,c=h.useMemo(()=>{if(!(!t||t.length===0))return t.reduce((e,t)=>(s[e.intent]??999)<=(s[t.intent]??999)?e:t).intent},[t,s]),l=e=>{let{icon:t,intent:n}=e;if(t)return typeof t==`string`?(0,g.jsx)(d,{sdsIcon:t,sdsSize:`xs`}):t;switch(n){case`positive`:return(0,g.jsx)(d,{sdsIcon:`CheckCircle`,sdsSize:`xs`});default:return(0,g.jsx)(d,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`xs`})}},u=h.useMemo(()=>i?[...t].sort((e,t)=>(s[e.intent]??999)-(s[t.intent]??999)):t,[t,i,s]);return(0,g.jsxs)(f,{borderIntent:c,hasBorder:r,...o,children:[n,u.map((e,t)=>(0,g.jsxs)(p,{intent:e.intent,children:[l(e),(0,g.jsx)(`span`,{children:e.text})]},t))]})}}));export{y as n,v as t};