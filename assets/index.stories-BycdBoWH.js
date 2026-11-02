import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./jsx-runtime-f3rHp9ZU.js";import{Ft as r,Gt as i,I as a,Ja as o,Lt as s,P as c,Rt as l,Ut as u,Vt as d,_n as f,b as p,io as m,ro as h,t as g,zt as _}from"./iframe-BPFLG940.js";import{i as v,n as y,r as b,t as x}from"./utils-CdbNl_sX.js";var S,C,w,T,E,D,O=e((()=>{m(),g(),S=h(`div`,{target:`e1khe9435`})(p,` `,e=>{let{backgroundColor:t,textColor:n}=e,a=i(e),o=l(e),s=r(e),c=_(e);return`
      background-color: ${t};
      color: ${n};
      padding: ${a?.xs}px ${a?.s}px;
      margin: ${a?.xxxs}px 0;
      border-radius: ${o?.m}px;
      border: solid 1px ${t};
      transition: transform 0.2s ease-in-out;

      & > div {
        display: flex;
        justify-content: space-between;
      }

      &:hover {
        border: ${s?.base?.hover};
        z-index: 10;

        .color-title {
          font-weight: ${c?.semibold};
        }
      }
    `},`;`),C=h(`h3`,{target:`e1khe9434`})(a,` `,e=>`
      margin-bottom: ${i(e)?.s}px;
    `,`;`),w=h(`span`,{target:`e1khe9433`})(c,` `,e=>`
      cursor: pointer;
      font-size: 12px;

      &:active {
        font-weight: ${_(e)?.semibold};
      }
    `,`;`),T=h(`span`,{target:`e1khe9432`})(p,`;`),E=h(`span`,{target:`e1khe9431`})(c,` `,e=>`
      cursor: pointer;
      font-size: 10px;

      &:active {
        font-weight: ${_(e)?.semibold};
      }
    `,`;`),D=h(`div`,{target:`e1khe9430`})({name:`a1b5rt`,styles:`display:grid;grid-template-columns:repeat(1, 1fr);row-gap:30px`})})),k,A,j=e((()=>{f(),O(),b(),g(),k=t(n()),A=e=>{let{group:t,value:n,shade:r,prefix:i=`$`,semanticName:a}=e,s=d({theme:o()}),c=r?`$${i}-${t}-${x(r)}${s===`dark`?`-dark`:``}`:`$${i}-${t}${s===`dark`?`-dark`:``}`,l=r?`--`+i+`-`+t+`-`+x(r):`--`+i+`-`+t,u=r||t;return(0,k.jsxs)(S,{backgroundColor:String(n),textColor:v(n),children:[(0,k.jsxs)(`div`,{children:[(0,k.jsx)(T,{className:`color-title`,children:u.charAt(0).toUpperCase()+u.slice(1)}),(0,k.jsx)(E,{onClick:()=>y(c),children:c})]}),(0,k.jsxs)(`div`,{children:[(0,k.jsx)(w,{onClick:()=>y(n),children:String(a)}),(0,k.jsx)(E,{onClick:()=>y(l),children:l})]})]},t+r)}}));function M(e,t=null,n={}){for(let r in e){let i=t?`${t}-${r}`:r;typeof e[r]==`object`?M(e[r],i,n):n[e[r]]=i}return n}var N=e((()=>{})),P,F,I=e((()=>{g(),j(),O(),f(),N(),P=t(n()),F=e=>{let{colors:t,type:n=`semantic`,prefix:r}=e,i=s({theme:o()}),a=i?M(i,null):{},c=e=>{if(e)return Object.entries(e).map(([e,t])=>(0,P.jsxs)(`div`,{children:[(0,P.jsx)(C,{children:e.charAt(0).toLocaleUpperCase()+e.slice(1)}),(0,P.jsx)(`div`,{children:l(t,e)})]},e))},l=(e,t)=>typeof e==`string`?(0,P.jsx)(A,{group:t,semanticName:n===`semantic`?a[e]:e,value:e,prefix:r}):Object.entries(e).map(([e,i])=>{if(i!==`transparent`){if(n===`semantic`&&i.length>7){let n=i.slice(-2),o=Math.round(parseInt(n,16)/255*100);return(0,P.jsx)(A,{group:t,value:i,semanticName:`${a[i.slice(0,-2)]} (${o}% opacity)`,shade:e,prefix:r},e)}return(0,P.jsx)(A,{group:t,value:i,semanticName:n===`semantic`?a[i]:i,shade:e,prefix:r},e)}});return(0,P.jsx)(D,{children:t&&c(t)})}})),L,R,z=e((()=>{f(),g(),I(),L=t(n()),R=()=>{let e=s({theme:o()});if(e){let{gray:t,...n}=e;return(0,L.jsx)(F,{colors:{gray:t,...n},type:`primitive`,prefix:`sds-color-primitive`})}}})),B,V,H=e((()=>{f(),g(),I(),B=t(n()),V=()=>{let e=u({theme:o()}),{base:t,...n}=e||{};return e&&(0,B.jsx)(F,{colors:{base:t,...n},prefix:`sds-color-semantic`})}})),U,W,G,K,q,J=e((()=>{z(),H(),U=t(n()),W={parameters:{a11y:{test:`off`}},title:`Bases/Colors`},G={tags:[`!dev`],render:()=>(0,U.jsx)(R,{})},K={tags:[`!dev`],render:()=>(0,U.jsx)(V,{})},q=[`PrimitiveColors`,`SemanticColors`],G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  // Kept out of the sidebar: the Documentation page renders these swatches in
  // place. They remain stories for Chromatic.
  tags: ["!dev"],
  render: () => <PrimitiveColorsTemplate />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  tags: ["!dev"],
  render: () => <SemanticColorsTemplate />
}`,...K.parameters?.docs?.source}}}}));J();export{G as PrimitiveColors,K as SemanticColors,q as __namedExportsOrder,W as default,J as t};