import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Ao as n,E as r,Eo as i,G as a,Hn as o,at as s,bo as c,cn as l,fn as u,gn as d,ko as f,ln as p,mn as m,on as h,st as g,un as _}from"./iframe-CLRePdsX.js";import{i as v,n as y,r as b,t as x}from"./utils-CruXANC4.js";var S,C,w,T,E,D,O=e((()=>{n(),r(),S=f(`div`,{target:`e1khe9435`})(a,` `,e=>{let{backgroundColor:t,textColor:n}=e,r=d(e),i=p(e),a=h(e),o=_(e);return`
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
    `},`;`),C=f(`h3`,{target:`e1khe9434`})(g,` `,e=>`
      margin-bottom: ${d(e)?.s}px;
    `,`;`),w=f(`span`,{target:`e1khe9433`})(s,` `,e=>`
      cursor: pointer;
      font-size: 12px;

      &:active {
        font-weight: ${_(e)?.semibold};
      }
    `,`;`),T=f(`span`,{target:`e1khe9432`})(a,`;`),E=f(`span`,{target:`e1khe9431`})(s,` `,e=>`
      cursor: pointer;
      font-size: 10px;

      &:active {
        font-weight: ${_(e)?.semibold};
      }
    `,`;`),D=f(`div`,{target:`e1khe9430`})({name:`a1b5rt`,styles:`display:grid;grid-template-columns:repeat(1, 1fr);row-gap:30px`})})),k,A,j=e((()=>{o(),O(),b(),r(),k=t(i()),A=e=>{let{group:t,value:n,shade:r,prefix:i=`$`,semanticName:a}=e,o=u({theme:c()}),s=r?`$${i}-${t}-${x(r)}${o===`dark`?`-dark`:``}`:`$${i}-${t}${o===`dark`?`-dark`:``}`,l=r?`--`+i+`-`+t+`-`+x(r):`--`+i+`-`+t,d=r||t;return(0,k.jsxs)(S,{backgroundColor:String(n),textColor:v(n),children:[(0,k.jsxs)(`div`,{children:[(0,k.jsx)(T,{className:`color-title`,children:d.charAt(0).toUpperCase()+d.slice(1)}),(0,k.jsx)(E,{onClick:()=>y(s),children:s})]}),(0,k.jsxs)(`div`,{children:[(0,k.jsx)(w,{onClick:()=>y(n),children:String(a)}),(0,k.jsx)(E,{onClick:()=>y(l),children:l})]})]},t+r)}}));function M(e,t=null,n={}){for(let r in e){let i=t?`${t}-${r}`:r;typeof e[r]==`object`?M(e[r],i,n):n[e[r]]=i}return n}var N=e((()=>{})),P,F,I=e((()=>{r(),j(),O(),o(),N(),P=t(i()),F=e=>{let{colors:t,type:n=`semantic`,prefix:r}=e,i=l({theme:c()}),a=i?M(i,null):{},o=e=>{if(e)return Object.entries(e).map(([e,t])=>(0,P.jsxs)(`div`,{children:[(0,P.jsx)(C,{children:e.charAt(0).toLocaleUpperCase()+e.slice(1)}),(0,P.jsx)(`div`,{children:s(t,e)})]},e))},s=(e,t)=>typeof e==`string`?(0,P.jsx)(A,{group:t,semanticName:n===`semantic`?a[e]:e,value:e,prefix:r}):Object.entries(e).map(([e,i])=>{if(i!==`transparent`){if(n===`semantic`&&i.length>7){let n=i.slice(-2),o=Math.round(parseInt(n,16)/255*100);return(0,P.jsx)(A,{group:t,value:i,semanticName:`${a[i.slice(0,-2)]} (${o}% opacity)`,shade:e,prefix:r},e)}return(0,P.jsx)(A,{group:t,value:i,semanticName:n===`semantic`?a[i]:i,shade:e,prefix:r},e)}});return(0,P.jsx)(D,{children:t&&o(t)})}})),L,R,z=e((()=>{o(),r(),I(),L=t(i()),R=()=>{let e=l({theme:c()});if(e){let{gray:t,...n}=e;return(0,L.jsx)(F,{colors:{gray:t,...n},type:`primitive`,prefix:`sds-color-primitive`})}}})),B,V,H=e((()=>{o(),r(),I(),B=t(i()),V=()=>{let e=m({theme:c()}),{base:t,...n}=e||{};return e&&(0,B.jsx)(F,{colors:{base:t,...n},prefix:`sds-color-semantic`})}})),U,W,G,K,q,J=e((()=>{z(),H(),U=t(i()),W={parameters:{a11y:{test:`off`},axe:{skip:!0}},title:`Bases/Colors`},G={tags:[`!dev`],render:()=>(0,U.jsx)(R,{})},K={tags:[`!dev`],render:()=>(0,U.jsx)(V,{})},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  // Kept out of the sidebar: the Documentation page renders these swatches in
  // place. They remain stories for Chromatic.
  tags: ["!dev"],
  render: () => <PrimitiveColorsTemplate />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  tags: ["!dev"],
  render: () => <SemanticColorsTemplate />
}`,...K.parameters?.docs?.source}}},q=[`PrimitiveColors`,`SemanticColors`]}));J();export{G as PrimitiveColors,K as SemanticColors,q as __namedExportsOrder,W as default,J as t};