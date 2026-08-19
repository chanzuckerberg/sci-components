import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Ao as n,E as r,Eo as i,Hn as a,at as o,bo as s,ko as c,ln as l,mn as u,un as d}from"./iframe-CLRePdsX.js";import{n as f,t as p}from"./CellComponent-D_9M6nUN.js";import{n as m,t as h}from"./CellHeader-C5vc_2G6.js";import{n as g,t as _}from"./Table-BPm7QJ4h.js";import{n as v,t as y}from"./TableRow-1wiw8yrm.js";import{n as b,t as x}from"./TableHeader-PgmsYaib.js";import{n as S,t as C}from"./style-ChvrNoYn.js";import{n as w,r as T}from"./utils-CruXANC4.js";var E,D,O,k=e((()=>{n(),r(),E=c(`div`,{target:`e1v91l4l2`})({name:`qhxz92`,styles:`max-width:100%`}),D=c(`div`,{target:`e1v91l4l1`})(e=>{let{size:t}=e,n=u(e);return`
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
    `},`;`),O=c(`p`,{target:`e1v91l4l0`})(o,` `,e=>`
      margin: 0;
      cursor: pointer;

      &:active {
        font-weight: ${d(e)?.semibold};
      }
    `,`;`)})),A,j,M=e((()=>{g(),b(),m(),v(),f(),T(),S(),a(),r(),k(),A=t(i()),j=()=>{let e=l({theme:s()}),t=(e,t)=>{let n=`$sds-corner-`+t,r=`--sds-corner-`+t;return(0,A.jsxs)(y,{hover:!1,children:[(0,A.jsx)(p,{verticalAlign:`center`,horizontalAlign:`center`,children:(0,A.jsx)(D,{size:e})}),(0,A.jsxs)(p,{verticalAlign:`center`,children:[(0,A.jsx)(C,{onClick:()=>w(n),type:`sass`,children:n}),(0,A.jsx)(C,{onClick:()=>w(r),type:`css`,children:r})]}),(0,A.jsx)(p,{verticalAlign:`center`,children:(0,A.jsx)(O,{children:`${e}px`})})]},t)};if(e){let n=Object.entries(e).sort((e,t)=>t[1]-e[1]).map(([e,n])=>t(n,e));return(0,A.jsxs)(_,{children:[(0,A.jsxs)(x,{children:[(0,A.jsx)(h,{hideSortIcon:!0,children:`Example`}),(0,A.jsx)(h,{hideSortIcon:!0,children:`Variables`}),(0,A.jsx)(h,{hideSortIcon:!0,children:`Value`})]}),(0,A.jsx)(`tbody`,{children:n})]})}}})),N,P,F,I,L=e((()=>{k(),M(),N=t(i()),P={parameters:{a11y:{test:`off`},axe:{skip:!0}},title:`Bases/Corners`},F={tags:[`!dev`],render:()=>(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(E,{children:(0,N.jsx)(j,{})})})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic.
  tags: ["!dev"],
  render: () => <>
      <StyledCornersWrapper>
        <Template />
      </StyledCornersWrapper>
    </>
}`,...F.parameters?.docs?.source}}},I=[`Default`]}));L();export{F as Default,I as __namedExportsOrder,P as default,L as t};