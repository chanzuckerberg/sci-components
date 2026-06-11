import{i as e}from"./preload-helper-DbRxMUml.js";import{E as t,G as n,Gn as r,U as i,V as a,W as o,Xn as s,Y as c,Z as l,Zn as u,cr as d,g as f,q as p,st as m,t as h,w as g}from"./iframe-DI6qETgL.js";import{i as _,n as v,r as y,t as b}from"./utils-D71Cyw0Z2.js";var x,S,C,w,T,E,D=e((()=>{u(),h(),x=s(`div`,{target:`e1khe9435`})(f,` `,e=>{let{backgroundColor:t,textColor:r}=e,i=l(e),s=o(e),c=a(e),u=n(e);return`
      background-color: ${t};
      color: ${r};
      padding: ${i?.xs}px ${i?.s}px;
      margin: ${i?.xxxs}px 0;
      border-radius: ${s?.m}px;
      border: solid 1px ${t};
      transition: transform 0.2s ease-in-out;

      & > div {
        display: flex;
        justify-content: space-between;
      }

      &:hover {
        border: ${c?.base?.hover};
        z-index: 10;

        .color-title {
          font-weight: ${u?.semibold};
        }
      }
    `},`;`),S=s(`h3`,{target:`e1khe9434`})(t,` `,e=>`
      margin-bottom: ${l(e)?.s}px;
    `,`;`),C=s(`span`,{target:`e1khe9433`})(g,` `,e=>`
      cursor: pointer;
      font-size: 12px;

      &:active {
        font-weight: ${n(e)?.semibold};
      }
    `,`;`),w=s(`span`,{target:`e1khe9432`})(f,`;`),T=s(`span`,{target:`e1khe9431`})(g,` `,e=>`
      cursor: pointer;
      font-size: 10px;

      &:active {
        font-weight: ${n(e)?.semibold};
      }
    `,`;`),E=s(`div`,{target:`e1khe9430`})({name:`7e2q0q`,styles:`display:grid;grid-template-columns:repeat(1, 1fr);grid-row-gap:30px`})})),O,k,A=e((()=>{m(),D(),y(),h(),O=d(),k=e=>{let{group:t,value:n,shade:i,prefix:a=`$`,semanticName:o}=e,s=p({theme:r()}),c=i?`$${a}-${t}-${b(i)}${s===`dark`?`-dark`:``}`:`$${a}-${t}${s===`dark`?`-dark`:``}`,l=i?`--`+a+`-`+t+`-`+b(i):`--`+a+`-`+t,u=i||t;return(0,O.jsxs)(x,{backgroundColor:String(n),textColor:_(n),children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(w,{className:`color-title`,children:u.charAt(0).toUpperCase()+u.slice(1)}),(0,O.jsx)(T,{onClick:()=>v(c),children:c})]}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(C,{onClick:()=>v(n),children:String(o)}),(0,O.jsx)(T,{onClick:()=>v(l),children:l})]})]},t+i)}}));function j(e,t=null,n={}){for(let r in e){let i=t?`${t}-${r}`:r;typeof e[r]==`object`?j(e[r],i,n):n[e[r]]=i}return n}var M=e((()=>{})),N,P,F=e((()=>{h(),A(),D(),m(),M(),N=d(),P=e=>{let{colors:t,type:n=`semantic`,prefix:a}=e,o=i({theme:r()}),s=o?j(o,null):{},c=e=>{if(e)return Object.entries(e).map(([e,t])=>(0,N.jsxs)(`div`,{children:[(0,N.jsx)(S,{children:e.charAt(0).toLocaleUpperCase()+e.slice(1)}),(0,N.jsx)(`div`,{children:l(t,e)})]},e))},l=(e,t)=>typeof e==`string`?(0,N.jsx)(k,{group:t,semanticName:n===`semantic`?s[e]:e,value:e,prefix:a}):Object.entries(e).map(([e,r])=>{if(r!==`transparent`){if(n===`semantic`&&r.length>7){let n=r.slice(-2),i=Math.round(parseInt(n,16)/255*100);return(0,N.jsx)(k,{group:t,value:r,semanticName:`${s[r.slice(0,-2)]} (${i}% opacity)`,shade:e,prefix:a},e)}return(0,N.jsx)(k,{group:t,value:r,semanticName:n===`semantic`?s[r]:r,shade:e,prefix:a},e)}});return(0,N.jsx)(E,{children:t&&c(t)})}})),I,L,R=e((()=>{m(),h(),F(),I=d(),L=()=>{let e=i({theme:r()});if(e){let{gray:t,...n}=e;return(0,I.jsx)(P,{colors:{gray:t,...n},type:`primitive`,prefix:`sds-color-primitive`})}}})),z,B,V=e((()=>{m(),h(),F(),z=d(),B=()=>{let e=c({theme:r()}),{base:t,...n}=e||{};return e&&(0,z.jsx)(P,{colors:{base:t,...n},prefix:`sds-color-semantic`})}})),H,U,W,G,K;e((()=>{R(),V(),H=d(),U={parameters:{axe:{disabledRules:[`color-contrast`]}},title:`Bases/Colors`},W={render:()=>(0,H.jsx)(L,{})},G={render:()=>(0,H.jsx)(B,{})},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <PrimitiveColorsTemplate />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <SemanticColorsTemplate />
}`,...G.parameters?.docs?.source}}},K=[`PrimitiveColors`,`SemanticColors`]}))();export{W as PrimitiveColors,G as SemanticColors,K as __namedExportsOrder,U as default};