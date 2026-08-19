import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,E as i,Eo as a,Hn as o,K as s,L as c,Yr as l,gn as u,ko as d,mn as f}from"./iframe-s0DqqZ6S.js";import{n as p,t as m}from"./Tooltip-BWVo57wN.js";var h,g,_=e((()=>{h=t(n()),g=(0,h.createContext)({isRowHovered:!1})})),v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F=e((()=>{r(),i(),v=[`icon`,`iconVerticalAlign`,`horizontalAlign`,`verticalAlign`,`primaryText`,`secondaryText`,`tertiaryText`,`shouldTextWrap`,`shouldShowTooltipOnHover`,`shouldShowUnderlineOnHover`,`isRowHovered`,`tooltipProps`,`primaryTextWrapLineCount`,`secondaryTextWrapLineCount`,`tertiaryTextWrapLineCount`,`primaryTextComponentSlotBottom`,`primaryTextComponentSlotRight`,`tabularNums`],y=`tabular-nums`,b={bottom:`bottom`,center:`middle`,top:`top`},x={bottom:`flex-end`,center:`center`,top:`flex-start`},S=e=>`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${e};
    -webkit-box-orient: vertical; 
    word-break: break-all;
  `,C=()=>`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-break: break-all;
  `,w=d(`div`,{target:`ekxclbn10`})({name:`zjik7`,styles:`display:flex`}),T=d(`div`,{target:`ekxclbn9`})({name:`1d3w5wq`,styles:`width:100%`}),E=d(`div`,{shouldForwardProp:e=>!v.includes(e),target:`ekxclbn8`})(e=>{let{iconVerticalAlign:t=`top`}=e;return`
      padding-right: ${u(e)?.m}px;
      display: flex;
      flex-direction: column;
      justify-content: ${x[t]};
    `},`;`),D=d(`div`,{target:`ekxclbn7`})(e=>{let{horizontalAlign:t}=e;return`
      display: flex;
      justify-content: ${t===`left`?`flex-start`:`flex-end`};
    `},`;`),O=d(`div`,{shouldForwardProp:e=>!v.includes(e),target:`ekxclbn6`})(c,` `,e=>{let{primaryTextWrapLineCount:t=3,tabularNums:n=!1}=e;return`
      display: block;
      font-variant-numeric: ${n?y:`normal`};
      white-space: pre-wrap;
      
      ${e.shouldTextWrap?S(t):C()}
    `},`;`),k=d(`span`,{shouldForwardProp:e=>!v.includes(e),target:`ekxclbn5`})(s,` `,e=>{let{secondaryTextWrapLineCount:t=1,tabularNums:n=!1}=e;return`
      display: block;
      color: ${f(e)?.base?.textSecondary};
      padding-top: 0px;
      font-variant-numeric: ${n?y:`normal`};
      white-space: pre-wrap;

      ${e.shouldTextWrap?S(t):C()}
    `},`;`),A=d(`span`,{shouldForwardProp:e=>!v.includes(e),target:`ekxclbn4`})(s,` `,e=>{let{tertiaryTextWrapLineCount:t=1,tabularNums:n=!1}=e,r=u(e);return`
      display: block;
      color: ${f(e)?.base?.textSecondary};
      padding-top: ${r?.xxxs}px;
      font-variant-numeric: ${n?y:`normal`};
      white-space: pre-wrap;

      ${e.shouldTextWrap?S(t):C()}
    `},`;`),j=d(`div`,{target:`ekxclbn3`})(e=>`
      margin-top: ${u(e)?.xxs}px;
    `,`;`),M=d(`div`,{target:`ekxclbn2`})(e=>`
      margin-left: ${u(e)?.xs}px;
    `,`;`),N=d(`div`,{target:`ekxclbn1`})(c,` `,e=>{let{horizontalAlign:t=`left`,verticalAlign:n=`top`,shouldShowUnderlineOnHover:r=!1,isRowHovered:i=!1,extraRightPadding:a=0}=e,o=u(e),s=t===`right`?(o?.m??0)+a:o?.m;return`
        outline: none;
        padding: ${o?.m}px ${s}px ${o?.m}px ${o?.m}px !important;
        text-align: ${t};
        vertical-align: ${b[n]};
        overflow: hidden;

        &:hover {
          ${O} {
            ${r?`text-decoration: underline !important;`:``}
          }
        }

        ${O} {
          ${i&&r?`text-decoration: underline !important;`:``}
        }
    `},`;`),P=d(`a`,{target:`ekxclbn0`})(e=>`
      text-decoration: none;
      color: ${f(e)?.base?.textPrimary};
    `,`;`)})),I,L,R,z,B=e((()=>{I=t(n()),p(),_(),F(),o(),L=t(a()),R=e=>{let{primaryText:t,primaryTextWrapLineCount:n,secondaryText:r,secondaryTextWrapLineCount:i,tertiaryText:a,tertiaryTextWrapLineCount:o,shouldTextWrap:s=!0,icon:c,iconVerticalAlign:l,primaryTextComponentSlotRight:u,primaryTextComponentSlotBottom:d,horizontalAlign:f=`left`,tabularNums:p=!1}=e;return(0,L.jsxs)(w,{children:[c&&(0,L.jsx)(E,{iconVerticalAlign:l,children:c}),(0,L.jsxs)(T,{children:[(0,L.jsxs)(D,{horizontalAlign:f,children:[(0,L.jsx)(O,{shouldTextWrap:s,primaryTextWrapLineCount:n,tabularNums:p,children:t}),u&&(0,L.jsx)(M,{children:u})]}),!r&&!a&&d&&(0,L.jsx)(j,{children:d}),r&&(0,L.jsx)(k,{shouldTextWrap:s,secondaryTextWrapLineCount:i,tabularNums:p,children:r}),a&&(0,L.jsx)(A,{shouldTextWrap:s,tertiaryTextWrapLineCount:o,tabularNums:p,children:a})]})]})},z=(0,I.forwardRef)((e,t)=>{let{primaryText:n,secondaryText:r,shouldShowTooltipOnHover:i=!0,tooltipProps:a,as:o=`td`,link:s,linkProps:c,linkComponent:u}=e,{isRowHovered:d}=(0,I.useContext)(g)||{isRowHovered:!1},f={...e,isRowHovered:d};return i?(0,L.jsx)(m,{title:n,subtitle:r,arrow:!0,leaveDelay:0,leaveTouchDelay:0,...a,children:(0,L.jsx)(N,{ref:t,as:o,...f,children:s?(0,L.jsx)(P,{href:s,...c,component:u,children:(0,L.jsx)(R,{...e})}):(0,L.jsx)(R,{...e})})}):(0,L.jsx)(N,{ref:t,as:o,...f,children:s?(0,L.jsx)(l,{href:s,...c,underline:`none`,color:`inherit`,component:u,children:(0,L.jsx)(R,{...e})}):(0,L.jsx)(R,{...e})})}),z.displayName=`CellBasic`}));export{_ as i,B as n,g as r,z as t};