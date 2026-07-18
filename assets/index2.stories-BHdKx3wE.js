import{i as e}from"./preload-helper-xPQekRTU.js";import{E as t,Fi as n,G as r,Ii as i,Li as a,U as o,V as s,W as c,Y as l,Z as u,ct as d,g as f,ji as p,q as m,t as h,w as g}from"./iframe-DocVhSSI.js";import{i as _,n as v,r as y,t as b}from"./utils-CruXANC42.js";var x,S,C,w,T,E,D=e((()=>{a(),h(),x=i(`div`,{target:`e1khe9435`})(f,` `,e=>{let{backgroundColor:t,textColor:n}=e,i=u(e),a=c(e),o=s(e),l=r(e);return`
      background-color: ${t};
      color: ${n};
      padding: ${i?.xs}px ${i?.s}px;
      margin: ${i?.xxxs}px 0;
      border-radius: ${a?.m}px;
      border: solid 1px ${t};
      transition: transform 0.2s ease-in-out;

      & > div {
        display: flex;
        justify-content: space-between;
      }

      &:hover {
        border: ${o?.base?.hover};
        z-index: 10;

        .color-title {
          font-weight: ${l?.semibold};
        }
      }
    `},`;`),S=i(`h3`,{target:`e1khe9434`})(t,` `,e=>`
      margin-bottom: ${u(e)?.s}px;
    `,`;`),C=i(`span`,{target:`e1khe9433`})(g,` `,e=>`
      cursor: pointer;
      font-size: 12px;

      &:active {
        font-weight: ${r(e)?.semibold};
      }
    `,`;`),w=i(`span`,{target:`e1khe9432`})(f,`;`),T=i(`span`,{target:`e1khe9431`})(g,` `,e=>`
      cursor: pointer;
      font-size: 10px;

      &:active {
        font-weight: ${r(e)?.semibold};
      }
    `,`;`),E=i(`div`,{target:`e1khe9430`})({name:`7e2q0q`,styles:`display:grid;grid-template-columns:repeat(1, 1fr);grid-row-gap:30px`})})),O,k,A=e((()=>{d(),D(),y(),h(),O=n(),k=e=>{let{group:t,value:n,shade:r,prefix:i=`$`,semanticName:a}=e,o=m({theme:p()}),s=r?`$${i}-${t}-${b(r)}${o===`dark`?`-dark`:``}`:`$${i}-${t}${o===`dark`?`-dark`:``}`,c=r?`--`+i+`-`+t+`-`+b(r):`--`+i+`-`+t,l=r||t;return(0,O.jsxs)(x,{backgroundColor:String(n),textColor:_(n),children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(w,{className:`color-title`,children:l.charAt(0).toUpperCase()+l.slice(1)}),(0,O.jsx)(T,{onClick:()=>v(s),children:s})]}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(C,{onClick:()=>v(n),children:String(a)}),(0,O.jsx)(T,{onClick:()=>v(c),children:c})]})]},t+r)}}));function j(e,t=null,n={}){for(let r in e){let i=t?`${t}-${r}`:r;typeof e[r]==`object`?j(e[r],i,n):n[e[r]]=i}return n}var M=e((()=>{})),N,P,F=e((()=>{h(),A(),D(),d(),M(),N=n(),P=e=>{let{colors:t,type:n=`semantic`,prefix:r}=e,i=o({theme:p()}),a=i?j(i,null):{},s=e=>{if(e)return Object.entries(e).map(([e,t])=>(0,N.jsxs)(`div`,{children:[(0,N.jsx)(S,{children:e.charAt(0).toLocaleUpperCase()+e.slice(1)}),(0,N.jsx)(`div`,{children:c(t,e)})]},e))},c=(e,t)=>typeof e==`string`?(0,N.jsx)(k,{group:t,semanticName:n===`semantic`?a[e]:e,value:e,prefix:r}):Object.entries(e).map(([e,i])=>{if(i!==`transparent`){if(n===`semantic`&&i.length>7){let n=i.slice(-2),o=Math.round(parseInt(n,16)/255*100);return(0,N.jsx)(k,{group:t,value:i,semanticName:`${a[i.slice(0,-2)]} (${o}% opacity)`,shade:e,prefix:r},e)}return(0,N.jsx)(k,{group:t,value:i,semanticName:n===`semantic`?a[i]:i,shade:e,prefix:r},e)}});return(0,N.jsx)(E,{children:t&&s(t)})}})),I,L,R=e((()=>{d(),h(),F(),I=n(),L=()=>{let e=o({theme:p()});if(e){let{gray:t,...n}=e;return(0,I.jsx)(P,{colors:{gray:t,...n},type:`primitive`,prefix:`sds-color-primitive`})}}})),z,B,V=e((()=>{d(),h(),F(),z=n(),B=()=>{let e=l({theme:p()}),{base:t,...n}=e||{};return e&&(0,z.jsx)(P,{colors:{base:t,...n},prefix:`sds-color-semantic`})}})),H,U,W,G,K;e((()=>{R(),V(),H=n(),U={parameters:{axe:{disabledRules:[`color-contrast`]}},title:`Bases/Colors`},W={render:()=>(0,H.jsx)(L,{})},G={render:()=>(0,H.jsx)(B,{})},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <PrimitiveColorsTemplate />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <SemanticColorsTemplate />
}`,...G.parameters?.docs?.source}}},K=[`PrimitiveColors`,`SemanticColors`]}))();export{W as PrimitiveColors,G as SemanticColors,K as __namedExportsOrder,U as default};