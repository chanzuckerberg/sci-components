import{i as e}from"./preload-helper-usAeo7Bx.js";import{G as t,Gi as n,Mi as r,Ni as i,Ti as a,W as o,Y as s,ct as c,t as l,w as u}from"./iframe-ZT52KRhI.js";import{n as d,t as f}from"./CellComponent-DnuSrISR.js";import{n as p,t as m}from"./CellHeader-9Ex7Dzeg.js";import{n as h,t as g}from"./Table-BK1wBrE2.js";import{n as _,t as v}from"./TableRow-CRjFNYrW.js";import{n as y,t as b}from"./TableHeader-Bf6FCkGa.js";import{n as x,t as S}from"./style-DSJiMoOV.js";import{n as C,r as w}from"./utils-Dy6BNMfW2.js";var T,E,D,O=e((()=>{i(),l(),T=r(`div`,{target:`e1v91l4l2`})({name:`qhxz92`,styles:`max-width:100%`}),E=r(`div`,{target:`e1v91l4l1`})(e=>{let{size:t}=e,n=s(e);return`
      position: relative;
      margin-left: 10px;
      width: 60px;
      height: 60px;
      background-color: transparent;
      border-radius: ${t+2}px;

      background-position:  0 0, 0 0, 100% 0, 0 100%;
      background-size: 10px 100%, 100% 10px, 10px 100% , 100% 10px;
      background-repeat: no-repeat;
      background-image:
        none, // left
        linear-gradient(90deg, transparent, transparent 50%, ${n?.accent?.foreground} 50%), // top
        linear-gradient(180deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 50%, transparent 50%), // right
        none // bottom
      ;

      &::after {
        content: "";
        position: absolute;
        background-color: ${n?.base?.backgroundTertiary};
        width: 56px;
        height: 56px;
        top: 2px;
        left: 2px;
        border-radius: ${t}px;
      }

      &:hover {
        animation: boxBorderAnimation 2s infinite linear;
      }

      @keyframes boxBorderAnimation {
        0% {
          background-image:
            none, // left
            linear-gradient(90deg, transparent, transparent 50%, ${n?.accent?.foreground} 50%), // top
            linear-gradient(180deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 50%, transparent 50%), // right
            none // bottom
          ;
        }
        12.5% {
          background-image:
            none, // left
            none, // top
            linear-gradient(180deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 100%, transparent 100%), // right
            none // bottom
          ;
        }
        25% {
          background-image:
            none, // left
            none, // top
            linear-gradient(180deg, transparent, transparent 50%, ${n?.accent?.foreground} 50%), // right
            linear-gradient(270deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 50%, transparent 50%) // bottom
          ;
        }
        37.5% {
          background-image:
            none, // left
            none, // top
            none, // right
            linear-gradient(270deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 100%, transparent 100%) // bottom
          ;
        }
        50% {
          background-image:
            linear-gradient(0deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 50%, transparent 50%), // left
            none, // top
            none, // right
            linear-gradient(270deg, transparent, transparent 50%, ${n?.accent?.foreground} 50%) // bottom
          ;
        }
        62.5% {
          background-image:
            linear-gradient(0deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 100%), // left
            none, // top
            none, // right
            none // bottom
          ;
        }
        75% {
          background-image:
            linear-gradient(0deg, transparent, transparent 50%, ${n?.accent?.foreground} 50%), // left
            linear-gradient(90deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 50%, transparent 50%), // top
            none, // right
            none // bottom
          ;
        }
        87.5% {
          background-image:
          none, // left
          linear-gradient(90deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 100%), // top
          none, // right
          none // bottom
        ;
        }
        100% {
          background-image:
            none, // left
            linear-gradient(90deg, transparent, transparent 50%, ${n?.accent?.foreground} 50%), // top
            linear-gradient(180deg, ${n?.accent?.foreground}, ${n?.accent?.foreground} 50%, transparent 50%), // right
            none // bottom
          ;
        }
      }
    `},`;`),D=r(`p`,{target:`e1v91l4l0`})(u,` `,e=>`
      margin: 0;
      cursor: pointer;

      &:active {
        font-weight: ${t(e)?.semibold};
      }
    `,`;`)})),k,A,j=e((()=>{h(),y(),p(),_(),d(),w(),x(),c(),l(),O(),k=n(),A=()=>{let e=o({theme:a()}),t=(e,t)=>{let n=`$sds-corner-`+t,r=`--sds-corner-`+t;return(0,k.jsxs)(v,{hover:!1,children:[(0,k.jsx)(f,{verticalAlign:`center`,horizontalAlign:`center`,children:(0,k.jsx)(E,{size:e})}),(0,k.jsxs)(f,{verticalAlign:`center`,children:[(0,k.jsx)(S,{onClick:()=>C(n),type:`sass`,children:n}),(0,k.jsx)(S,{onClick:()=>C(r),type:`css`,children:r})]}),(0,k.jsx)(f,{verticalAlign:`center`,children:(0,k.jsx)(D,{children:`${e}px`})})]},t)};if(e){let n=Object.entries(e).sort((e,t)=>t[1]-e[1]).map(([e,n])=>t(n,e));return(0,k.jsxs)(g,{children:[(0,k.jsxs)(b,{children:[(0,k.jsx)(m,{hideSortIcon:!0,children:`Example`}),(0,k.jsx)(m,{hideSortIcon:!0,children:`Variables`}),(0,k.jsx)(m,{hideSortIcon:!0,children:`Value`})]}),(0,k.jsx)(`tbody`,{children:n})]})}}})),M,N,P,F;e((()=>{O(),j(),M=n(),N={title:`Bases/Corners`},P={render:()=>(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(T,{children:(0,M.jsx)(A,{})})})},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <StyledCornersWrapper>
        <Template />
      </StyledCornersWrapper>
    </>
}`,...P.parameters?.docs?.source}}},F=[`Default`]}))();export{P as Default,F as __namedExportsOrder,N as default};