import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Ao as n,E as r,Eo as i,Hn as a,bo as o,fn as s,ko as c,ln as l,on as u}from"./iframe-s0DqqZ6S.js";import{n as d,t as f}from"./CellComponent-DwlvmMhi.js";import{n as p,t as m}from"./CellHeader-DFGb0npC.js";import{n as h,t as g}from"./Table-C4pTIrOj.js";import{n as _,t as v}from"./TableRow-CH869OBW.js";import{n as y,t as b}from"./TableHeader-Dwb46-15.js";import{n as x,t as S}from"./style-DmVrKlrj.js";import{n as C,r as w}from"./utils-CruXANC4.js";var T,E,D,O,k=e((()=>{n(),r(),T=1,E=60,D=c(`div`,{target:`ey56idy1`})({name:`qhxz92`,styles:`max-width:100%`}),O=c(`div`,{target:`ey56idy0`})(e=>{let{border:t}=e;return`
      position: relative;
      margin-left: 10px;
      width: ${E}px;
      height: ${E}px;
      background-color: transparent;
      border-radius: ${T}px;
      border: ${t};
      border-radius: ${l(e)?.rounded}px;

      &:hover {
        animation: pulse 3s infinite;
      }

      @keyframes pulse {
        50% {
          border-radius: 0;
        }
      }
    `},`;`)})),A,j,M=e((()=>{a(),d(),p(),h(),y(),_(),r(),k(),x(),w(),A=t(i()),j=()=>{let e=o(),t=u({theme:e}),n=s({theme:e}),r=(e,t,r)=>{let i=t?`$sds-border-${t}-${r}${n===`dark`?`-dark`:``}`:`$sds-border-${r}${n===`dark`?`-dark`:``}`,a=t?`--sds-border-`+t+`-`+r:`--sds-border-`+r;return(0,A.jsxs)(v,{hover:!1,children:[(0,A.jsx)(f,{verticalAlign:`center`,horizontalAlign:`center`,children:(0,A.jsx)(O,{border:e})}),(0,A.jsxs)(f,{verticalAlign:`center`,children:[(0,A.jsx)(S,{onClick:()=>C(i),type:`sass`,children:i}),(0,A.jsx)(S,{onClick:()=>C(a),type:`css`,children:a})]}),(0,A.jsx)(f,{verticalAlign:`center`,onClick:()=>C(`border: ${e};`),children:(0,A.jsxs)(S,{children:[`border: `,e,`;`]})})]},a)};if(t){let{none:e,link:n,base:i,...a}=t,o=(e,t=null)=>Object.entries(e).flatMap(([e,n])=>{let i=t?`${t}-${e}`:e;return typeof n==`object`?o(n,i):r(n,t,e)}),s=o({none:e,link:n,base:i,...a});return(0,A.jsxs)(g,{children:[(0,A.jsxs)(b,{children:[(0,A.jsx)(m,{hideSortIcon:!0,style:{width:120},children:`Example`}),(0,A.jsx)(m,{hideSortIcon:!0,children:`Variables`}),(0,A.jsx)(m,{hideSortIcon:!0,children:`Value`})]}),(0,A.jsx)(`tbody`,{children:s})]})}}})),N,P,F,I,L=e((()=>{k(),M(),N=t(i()),P={parameters:{a11y:{test:`off`},axe:{skip:!0}},title:`Bases/Borders`},F={tags:[`!dev`],render:()=>(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(D,{children:(0,N.jsx)(j,{})})})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic.
  tags: ["!dev"],
  render: () => <>
      <StyledBordersWrapper>
        <Template />
      </StyledBordersWrapper>
    </>
}`,...F.parameters?.docs?.source}}},I=[`Default`]}));L();export{F as Default,I as __namedExportsOrder,P as default,L as t};