import{i as e}from"./preload-helper-DbRxMUml.js";import{G as t,Gn as n,U as r,X as i,Xn as a,Zn as o,cr as s,st as c,t as l,w as u}from"./iframe-DI6qETgL.js";import{n as d,t as f}from"./CellComponent-CGM4elXq.js";import{n as p,t as m}from"./CellHeader-zMIqjM1c.js";import{n as h,t as g}from"./Table-AXq3FbDM.js";import{n as _,t as v}from"./TableRow-B5d4ZcEA.js";import{n as y,t as b}from"./TableHeader-mTgSV5BT.js";import{n as x,t as S}from"./style-fdlHEZ6N.js";import{n as C,r as w}from"./utils-D71Cyw0Z2.js";import{n as T,t as E}from"./CellBasic-PXWl2h1h.js";var D,O,k,A,j=e((()=>{o(),l(),D=60,O=a(`div`,{target:`e38535k2`})({name:`qhxz92`,styles:`max-width:100%`}),k=a(`div`,{target:`e38535k1`})(e=>{let{shadow:t}=e;return`
      position: relative;
      margin-left: 10px;
      width: ${D}px;
      height: ${D}px;
      background-color: ${r(e)?.gray[100]};
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
    `},`;`),A=a(`p`,{target:`e38535k0`})(u,` `,e=>`
      margin: 0;
      cursor: pointer;
    
      &:active {
        font-weight: ${t(e)?.semibold};
      }
    `,`;`)})),M,N,P=e((()=>{M={l:`Containers that layer on top of all other page content (bottom panels, side panels, modals, etc.)`,m:`Containers that are part of a page's content, but appear on user input, layering over primary content (dropdown menus, tooltips, etc.)`,none:`No shadows.`,s:`Containers that layer closely over content, including images of documents/screens placed in content, and sign up forms.`},N={l:`Large Shadow`,m:`Medium Shadow`,none:`No Shadow`,s:`Small Shadow`}})),F,I,L=e((()=>{c(),l(),j(),h(),y(),p(),_(),d(),T(),w(),x(),P(),F=s(),I=()=>{let e=i({theme:n()}),t=(e,t)=>{let n=`$sds-drop-shadow-`+t,r=`--sds-drop-shadow-`+t;return(0,F.jsxs)(v,{hover:!1,children:[(0,F.jsx)(f,{verticalAlign:`center`,horizontalAlign:`center`,children:(0,F.jsx)(k,{shadow:e})}),(0,F.jsx)(E,{primaryText:N[t],verticalAlign:`center`,shouldShowTooltipOnHover:!1}),(0,F.jsxs)(f,{verticalAlign:`center`,children:[(0,F.jsx)(S,{onClick:()=>C(n),type:`sass`,children:n}),(0,F.jsx)(S,{onClick:()=>C(r),type:`css`,children:r})]}),(0,F.jsx)(f,{verticalAlign:`center`,onClick:()=>C(`box-shadow: ${e};`),children:(0,F.jsxs)(A,{children:[`box-shadow: `,e,`;`]})}),(0,F.jsx)(E,{verticalAlign:`center`,primaryText:M[t],shouldShowTooltipOnHover:!1,primaryTextWrapLineCount:5})]},t)};if(e){let{l:n,m:r,s:i,none:a}=e,o=Object.entries({l:n,m:r,s:i,none:a}).map(([e,n])=>t(n,e));return(0,F.jsxs)(g,{children:[(0,F.jsxs)(b,{children:[(0,F.jsx)(m,{hideSortIcon:!0,style:{width:120},children:`Example`}),(0,F.jsx)(m,{hideSortIcon:!0,children:`Shadow Type`}),(0,F.jsx)(m,{hideSortIcon:!0,children:`Variables`}),(0,F.jsx)(m,{hideSortIcon:!0,children:`Value`}),(0,F.jsx)(m,{hideSortIcon:!0,children:`Usage`})]}),(0,F.jsx)(`tbody`,{children:o})]})}}})),R,z,B,V;e((()=>{j(),L(),R=s(),z={title:`Bases/Drop Shadows`},B={render:()=>(0,R.jsx)(R.Fragment,{children:(0,R.jsx)(O,{children:(0,R.jsx)(I,{})})})},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <StyledShadowsWrapper>
        <Template />
      </StyledShadowsWrapper>
    </>
}`,...B.parameters?.docs?.source}}},V=[`Default`]}))();export{B as Default,V as __namedExportsOrder,z as default};