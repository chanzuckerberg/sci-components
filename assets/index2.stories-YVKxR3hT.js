import{i as e}from"./preload-helper-usAeo7Bx.js";import{E as t,G as n,Gi as r,Mi as i,Ni as a,Ti as o,U as s,V as c,W as l,Y as u,Z as d,ct as f,g as p,q as m,t as h,w as g}from"./iframe-Bjh1LYUt.js";import{i as _,n as v,r as y,t as b}from"./utils-Dy6BNMfW2.js";var x,S,C,w,T,E,D=e((()=>{a(),h(),x=i(`div`,{target:`e1khe9435`})(p,` `,e=>{let{backgroundColor:t,textColor:r}=e,i=d(e),a=l(e),o=c(e),s=n(e);return`
      background-color: ${t};
      color: ${r};
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
          font-weight: ${s?.semibold};
        }
      }
    `},`;`),S=i(`h3`,{target:`e1khe9434`})(t,` `,e=>`
      margin-bottom: ${d(e)?.s}px;
    `,`;`),C=i(`span`,{target:`e1khe9433`})(g,` `,e=>`
      cursor: pointer;
      font-size: 12px;

      &:active {
        font-weight: ${n(e)?.semibold};
      }
    `,`;`),w=i(`span`,{target:`e1khe9432`})(p,`;`),T=i(`span`,{target:`e1khe9431`})(g,` `,e=>`
      cursor: pointer;
      font-size: 10px;

      &:active {
        font-weight: ${n(e)?.semibold};
      }
    `,`;`),E=i(`div`,{target:`e1khe9430`})({name:`7e2q0q`,styles:`display:grid;grid-template-columns:repeat(1, 1fr);grid-row-gap:30px`})})),O,k,A=e((()=>{f(),D(),y(),h(),O=r(),k=e=>{let{group:t,value:n,shade:r,prefix:i=`$`,semanticName:a}=e,s=m({theme:o()}),c=r?`$${i}-${t}-${b(r)}${s===`dark`?`-dark`:``}`:`$${i}-${t}${s===`dark`?`-dark`:``}`,l=r?`--`+i+`-`+t+`-`+b(r):`--`+i+`-`+t,u=r||t;return(0,O.jsxs)(x,{backgroundColor:String(n),textColor:_(n),children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(w,{className:`color-title`,children:u.charAt(0).toUpperCase()+u.slice(1)}),(0,O.jsx)(T,{onClick:()=>v(c),children:c})]}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(C,{onClick:()=>v(n),children:String(a)}),(0,O.jsx)(T,{onClick:()=>v(l),children:l})]})]},t+r)}}));function j(e,t=null,n={}){for(let r in e){let i=t?`${t}-${r}`:r;typeof e[r]==`object`?j(e[r],i,n):n[e[r]]=i}return n}var M=e((()=>{})),N,P,F=e((()=>{h(),A(),D(),f(),M(),N=r(),P=e=>{let{colors:t,type:n=`semantic`,prefix:r}=e,i=s({theme:o()}),a=i?j(i,null):{},c=e=>{if(e)return Object.entries(e).map(([e,t])=>(0,N.jsxs)(`div`,{children:[(0,N.jsx)(S,{children:e.charAt(0).toLocaleUpperCase()+e.slice(1)}),(0,N.jsx)(`div`,{children:l(t,e)})]},e))},l=(e,t)=>typeof e==`string`?(0,N.jsx)(k,{group:t,semanticName:n===`semantic`?a[e]:e,value:e,prefix:r}):Object.entries(e).map(([e,i])=>{if(i!==`transparent`){if(n===`semantic`&&i.length>7){let n=i.slice(-2),o=Math.round(parseInt(n,16)/255*100);return(0,N.jsx)(k,{group:t,value:i,semanticName:`${a[i.slice(0,-2)]} (${o}% opacity)`,shade:e,prefix:r},e)}return(0,N.jsx)(k,{group:t,value:i,semanticName:n===`semantic`?a[i]:i,shade:e,prefix:r},e)}});return(0,N.jsx)(E,{children:t&&c(t)})}})),I,L,R=e((()=>{f(),h(),F(),I=r(),L=()=>{let e=s({theme:o()});if(e){let{gray:t,...n}=e;return(0,I.jsx)(P,{colors:{gray:t,...n},type:`primitive`,prefix:`sds-color-primitive`})}}})),z,B,V=e((()=>{f(),h(),F(),z=r(),B=()=>{let e=u({theme:o()}),{base:t,...n}=e||{};return e&&(0,z.jsx)(P,{colors:{base:t,...n},prefix:`sds-color-semantic`})}})),H,U,W,G,K;e((()=>{R(),V(),H=r(),U={parameters:{axe:{disabledRules:[`color-contrast`]}},title:`Bases/Colors`},W={render:()=>(0,H.jsx)(L,{})},G={render:()=>(0,H.jsx)(B,{})},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <PrimitiveColorsTemplate />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <SemanticColorsTemplate />
}`,...G.parameters?.docs?.source}}},K=[`PrimitiveColors`,`SemanticColors`]}))();export{W as PrimitiveColors,G as SemanticColors,K as __namedExportsOrder,U as default};