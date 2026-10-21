import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{Hr as n,Mr as r,Vr as i,t as a}from"./material-DlyzFPof.js";import{t as o}from"./jsx-runtime-cM__dR4X.js";import{Lt as s,P as c,Wt as l,t as u,zt as d}from"./iframe-DhUGD016.js";import{n as f,t as p}from"./CellBasic-DAUZxIF1.js";import{n as m,t as h}from"./CellComponent-DBP_JFBX.js";import{n as g,t as _}from"./CellHeader-FWKwEMya.js";import{n as v,t as y}from"./Table-BxYePaBQ.js";import{n as b,t as x}from"./TableRow-DbcuWuZo.js";import{n as S,t as C}from"./TableHeader-CZfI17hX.js";import{n as w,t as T}from"./style-DDGqSJAb.js";import{n as E,r as D}from"./utils-DsqxQLbQ.js";var O,k,A,j,M=t((()=>{n(),u(),O=60,k=i(`div`,{target:`e38535k2`})({name:`qhxz92`,styles:`max-width:100%`}),A=i(`div`,{target:`e38535k1`})(e=>{let{shadow:t}=e,n=s(e);return`
      position: relative;
      margin-left: 10px;
      width: ${O}px;
      height: ${O}px;
      background-color: ${n?.gray[100]};
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
    `},`;`),j=i(`p`,{target:`e38535k0`})(c,` `,e=>`
      margin: 0;
      cursor: pointer;
    
      &:active {
        font-weight: ${d(e)?.semibold};
      }
    `,`;`)})),N,P,F=t((()=>{N={l:`Containers that layer on top of all other page content (bottom panels, side panels, modals, etc.)`,m:`Containers that are part of a page's content, but appear on user input, layering over primary content (dropdown menus, tooltips, etc.)`,none:`No shadows.`,s:`Containers that layer closely over content, including images of documents/screens placed in content, and sign up forms.`},P={l:`Large Shadow`,m:`Medium Shadow`,none:`No Shadow`,s:`Small Shadow`}})),I,L,R=t((()=>{a(),u(),M(),v(),S(),g(),b(),m(),f(),D(),w(),F(),I=e(o()),L=()=>{let e=l({theme:r()}),t=(e,t)=>{let n=`$sds-drop-shadow-`+t,r=`--sds-drop-shadow-`+t;return(0,I.jsxs)(x,{hover:!1,children:[(0,I.jsx)(h,{verticalAlign:`center`,horizontalAlign:`center`,children:(0,I.jsx)(A,{shadow:e})}),(0,I.jsx)(p,{primaryText:P[t],verticalAlign:`center`,shouldShowTooltipOnHover:!1}),(0,I.jsxs)(h,{verticalAlign:`center`,children:[(0,I.jsx)(T,{onClick:()=>E(n),type:`sass`,children:n}),(0,I.jsx)(T,{onClick:()=>E(r),type:`css`,children:r})]}),(0,I.jsx)(h,{verticalAlign:`center`,onClick:()=>E(`box-shadow: ${e};`),children:(0,I.jsxs)(j,{children:[`box-shadow: `,e,`;`]})}),(0,I.jsx)(p,{verticalAlign:`center`,primaryText:N[t],shouldShowTooltipOnHover:!1,primaryTextWrapLineCount:5})]},t)};if(e){let{l:n,m:r,s:i,none:a}=e,o=Object.entries({l:n,m:r,s:i,none:a}).map(([e,n])=>t(n,e));return(0,I.jsxs)(y,{children:[(0,I.jsxs)(C,{children:[(0,I.jsx)(_,{hideSortIcon:!0,style:{width:120},children:`Example`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Shadow Type`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Variables`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Value`}),(0,I.jsx)(_,{hideSortIcon:!0,children:`Usage`})]}),(0,I.jsx)(`tbody`,{children:o})]})}}})),z,B,V,H,U=t((()=>{M(),R(),z=e(o()),B={parameters:{a11y:{test:`off`}},title:`Bases/Drop Shadows`},V={tags:[`!dev`],render:()=>(0,z.jsx)(z.Fragment,{children:(0,z.jsx)(k,{children:(0,z.jsx)(L,{})})})},H=[`Default`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic.
  tags: ["!dev"],
  render: () => <>
      <StyledShadowsWrapper>
        <Template />
      </StyledShadowsWrapper>
    </>
}`,...V.parameters?.docs?.source}}}}));U();export{V as Default,H as __namedExportsOrder,B as default,U as t};