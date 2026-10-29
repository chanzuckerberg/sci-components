import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{Hr as n,Mr as r,Vr as i,t as a}from"./material-DlyzFPof.js";import{t as o}from"./jsx-runtime-cM__dR4X.js";import{Ft as s,Gt as c,I as l,Lt as u,P as d,Rt as f,Ut as p,Vt as m,b as h,t as g,zt as _}from"./iframe-FMtQz5A8.js";import{i as v,n as y,r as b,t as x}from"./utils-DsqxQLbQ.js";var S,C,w,T,E,D,O=t((()=>{n(),g(),S=i(`div`,{target:`e1khe9435`})(h,` `,e=>{let{backgroundColor:t,textColor:n}=e,r=c(e),i=f(e),a=s(e),o=_(e);return`
      background-color: ${t};
      color: ${n};
      padding: ${r?.xs}px ${r?.s}px;
      margin: ${r?.xxxs}px 0;
      border-radius: ${i?.m}px;
      border: solid 1px ${t};
      transition: transform 0.2s ease-in-out;

      & > div {
        display: flex;
        justify-content: space-between;
      }

      &:hover {
        border: ${a?.base?.hover};
        z-index: 10;

        .color-title {
          font-weight: ${o?.semibold};
        }
      }
    `},`;`),C=i(`h3`,{target:`e1khe9434`})(l,` `,e=>`
      margin-bottom: ${c(e)?.s}px;
    `,`;`),w=i(`span`,{target:`e1khe9433`})(d,` `,e=>`
      cursor: pointer;
      font-size: 12px;

      &:active {
        font-weight: ${_(e)?.semibold};
      }
    `,`;`),T=i(`span`,{target:`e1khe9432`})(h,`;`),E=i(`span`,{target:`e1khe9431`})(d,` `,e=>`
      cursor: pointer;
      font-size: 10px;

      &:active {
        font-weight: ${_(e)?.semibold};
      }
    `,`;`),D=i(`div`,{target:`e1khe9430`})({name:`a1b5rt`,styles:`display:grid;grid-template-columns:repeat(1, 1fr);row-gap:30px`})})),k,A,j=t((()=>{a(),O(),b(),g(),k=e(o()),A=e=>{let{group:t,value:n,shade:i,prefix:a=`$`,semanticName:o}=e,s=m({theme:r()}),c=i?`$${a}-${t}-${x(i)}${s===`dark`?`-dark`:``}`:`$${a}-${t}${s===`dark`?`-dark`:``}`,l=i?`--`+a+`-`+t+`-`+x(i):`--`+a+`-`+t,u=i||t;return(0,k.jsxs)(S,{backgroundColor:String(n),textColor:v(n),children:[(0,k.jsxs)(`div`,{children:[(0,k.jsx)(T,{className:`color-title`,children:u.charAt(0).toUpperCase()+u.slice(1)}),(0,k.jsx)(E,{onClick:()=>y(c),children:c})]}),(0,k.jsxs)(`div`,{children:[(0,k.jsx)(w,{onClick:()=>y(n),children:String(o)}),(0,k.jsx)(E,{onClick:()=>y(l),children:l})]})]},t+i)}}));function M(e,t=null,n={}){for(let r in e){let i=t?`${t}-${r}`:r;typeof e[r]==`object`?M(e[r],i,n):n[e[r]]=i}return n}var N=t((()=>{})),P,F,I=t((()=>{g(),j(),O(),a(),N(),P=e(o()),F=e=>{let{colors:t,type:n=`semantic`,prefix:i}=e,a=u({theme:r()}),o=a?M(a,null):{},s=e=>{if(e)return Object.entries(e).map(([e,t])=>(0,P.jsxs)(`div`,{children:[(0,P.jsx)(C,{children:e.charAt(0).toLocaleUpperCase()+e.slice(1)}),(0,P.jsx)(`div`,{children:c(t,e)})]},e))},c=(e,t)=>typeof e==`string`?(0,P.jsx)(A,{group:t,semanticName:n===`semantic`?o[e]:e,value:e,prefix:i}):Object.entries(e).map(([e,r])=>{if(r!==`transparent`){if(n===`semantic`&&r.length>7){let n=r.slice(-2),a=Math.round(parseInt(n,16)/255*100);return(0,P.jsx)(A,{group:t,value:r,semanticName:`${o[r.slice(0,-2)]} (${a}% opacity)`,shade:e,prefix:i},e)}return(0,P.jsx)(A,{group:t,value:r,semanticName:n===`semantic`?o[r]:r,shade:e,prefix:i},e)}});return(0,P.jsx)(D,{children:t&&s(t)})}})),L,R,z=t((()=>{a(),g(),I(),L=e(o()),R=()=>{let e=u({theme:r()});if(e){let{gray:t,...n}=e;return(0,L.jsx)(F,{colors:{gray:t,...n},type:`primitive`,prefix:`sds-color-primitive`})}}})),B,V,H=t((()=>{a(),g(),I(),B=e(o()),V=()=>{let e=p({theme:r()}),{base:t,...n}=e||{};return e&&(0,B.jsx)(F,{colors:{base:t,...n},prefix:`sds-color-semantic`})}})),U,W,G,K,q,J=t((()=>{z(),H(),U=e(o()),W={parameters:{a11y:{test:`off`}},title:`Bases/Colors`},G={tags:[`!dev`],render:()=>(0,U.jsx)(R,{})},K={tags:[`!dev`],render:()=>(0,U.jsx)(V,{})},q=[`PrimitiveColors`,`SemanticColors`],G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  // Kept out of the sidebar: the Documentation page renders these swatches in
  // place. They remain stories for Chromatic.
  tags: ["!dev"],
  render: () => <PrimitiveColorsTemplate />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  tags: ["!dev"],
  render: () => <SemanticColorsTemplate />
}`,...K.parameters?.docs?.source}}}}));J();export{G as PrimitiveColors,K as SemanticColors,q as __namedExportsOrder,W as default,J as t};