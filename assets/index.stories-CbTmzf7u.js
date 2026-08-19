import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Ao as n,E as r,Eo as i,Hn as a,at as o,bo as s,cn as c,hn as l,ko as u,un as d}from"./iframe-CLRePdsX.js";import{n as f,t as p}from"./CellBasic-RL-JzjG1.js";import{n as m,t as h}from"./CellComponent-D_9M6nUN.js";import{n as g,t as _}from"./CellHeader-C5vc_2G6.js";import{n as v,t as y}from"./Table-BPm7QJ4h.js";import{n as b,t as x}from"./TableRow-1wiw8yrm.js";import{n as S,t as C}from"./TableHeader-PgmsYaib.js";import{n as w,t as T}from"./style-ChvrNoYn.js";import{n as E,r as D}from"./utils-CruXANC4.js";var O,k,A,j,M=e((()=>{n(),r(),O=60,k=u(`div`,{target:`e38535k2`})({name:`qhxz92`,styles:`max-width:100%`}),A=u(`div`,{target:`e38535k1`})(e=>{let{shadow:t}=e;return`
      position: relative;
      margin-left: 10px;
      width: ${O}px;
      height: ${O}px;
      background-color: ${c(e)?.gray[100]};
      border-radius: 6px;
      box-shadow: ${t};

      &:hover {
        animation: boxShadowAnimation 3s infinite;
      }

      @keyframes boxShadowAnimation {
        50% {
          box-shadow: ${t};
        }
      }
    `},`;`),j=u(`p`,{target:`e38535k0`})(o,` `,e=>`
      margin: 0;
      cursor: pointer;
    
      &:active {
        font-weight: ${d(e)?.semibold};
      }
    `,`;`)})),N,P,F=e((()=>{N={l:`Containers that layer on top of all other page content (bottom panels, side panels, modals, etc.)`,m:`Containers that are part of a page's content, but appear on user input, layering over primary content (dropdown menus, tooltips, etc.)`,none:`No shadows.`,s:`Containers that layer closely over content, including images of documents/screens placed in content, and sign up forms.`},P={l:`Large Shadow`,m:`Medium Shadow`,none:`No Shadow`,s:`Small Shadow`}})),I,L,R=e((()=>{a(),r(),M(),v(),S(),g(),b(),m(),f(),D(),w(),F(),I=t(i()),L=()=>{let e=l({theme:s()}),t=(e,t)=>{let n=`$sds-drop-shadow-`+t,r=`--sds-drop-shadow-`+t;return(0,I.jsxs)(x,{hover:!1,children:[(0,I.jsx)(h,{verticalAlign:`center`,horizontalAlign:`center`,children:(0,I.jsx)(A,{shadow:e})}),(0,I.jsx)(p,{primaryText:P[t],verticalAlign:`center`,shouldShowTooltipOnHover:!1}),(0,I.jsxs)(h,{verticalAlign:`center`,children:[(0,I.jsx)(T,{onClick:()=>E(n),type:`sass`,children:n}),(0,I.jsx)(T,{onClick:()=>E(r),type:`css`,children:r})]}),(0,I.jsx)(h,{verticalAlign:`center`,onClick:()=>E(`box-shadow: ${e};`),children:(0,I.jsxs)(j,{children:[`box-shadow: `,e,`;`]})}),(0,I.jsx)(p,{verticalAlign:`center`,primaryText:N[t],shouldShowTooltipOnHover:!1,primaryTextWrapLineCount:5})]},t)};if(e){let{l:n,m:r,s:i,none:a}=e,o=Object.entries({l:n,m:r,s:i,none:a}).map(([e,n])=>t(n,e));return(0,I.jsxs)(y,{children:[(0,I.jsxs)(C,{children:[(0,I.jsx)(_,{hideSortIcon:!0,style:{width:120},children:`Example`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Shadow Type`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Variables`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Value`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Usage`})]}),(0,I.jsx)(`tbody`,{children:o})]})}}})),z,B,V,H,U=e((()=>{M(),R(),z=t(i()),B={parameters:{a11y:{test:`off`},axe:{skip:!0}},title:`Bases/Drop Shadows`},V={tags:[`!dev`],render:()=>(0,z.jsx)(z.Fragment,{children:(0,z.jsx)(k,{children:(0,z.jsx)(L,{})})})},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic.
  tags: ["!dev"],
  render: () => <>
      <StyledShadowsWrapper>
        <Template />
      </StyledShadowsWrapper>
    </>
}`,...V.parameters?.docs?.source}}},H=[`Default`]}));U();export{V as Default,H as __namedExportsOrder,B as default,U as t};