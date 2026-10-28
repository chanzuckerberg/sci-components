import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{Gt as o,R as s,Ut as c,t as l}from"./iframe-TnbieWZB.js";import{n as u,t as d}from"./Icon-P6YZrEvk.js";import{n as f,t as p}from"./Tooltip-CJgkS4OV.js";var m,h,g,_,v,y,b,x=t((()=>{r(),l(),u(),m={center:`center`,left:`flex-start`,right:`flex-end`},h=[`active`,`horizontalAlign`,`shouldShowTooltipOnHover`,`tooltipProps`,`tooltipText`,`hideSortIcon`,`hover`,`shouldTruncate`],g=i(d,{shouldForwardProp:e=>!h.includes(e),target:`eyijci13`})(e=>{let{active:t=!1,hideSortIcon:n}=e,r=o(e),i=c(e);return`
      margin-left: ${r?.s}px;
      margin-bottom: ${r?.xxs}px;
      color: ${t?i?.accent?.foreground:`transparent`};
      display: ${n?t?`block`:`none`:`block`};
      outline: none !important;
    `},`;`),_=()=>`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-break: break-all;
  `,v=i(`div`,{target:`eyijci12`})(s,` `,e=>{let{active:t=!1,horizontalAlign:n=`left`,hover:r=!0}=e,i=o(e),a=c(e),s=t?a?.accent?.foreground:a?.base?.textSecondary,l=t?a?.accent?.foregroundInteraction:a?.base?.textPrimary;return`
      outline: none;
      color: ${s};
      padding: ${i?.m}px !important;
      text-align: ${n};
      cursor: ${r?`pointer`:`default`};
      vertical-align: bottom;

      & .MuiButtonBase-root {
        outline: none;
      }

      &:hover {
        color: ${r?l:s};

        & .MuiButtonBase-root {
          color: ${l};
          opacity: 1;
        }

        & svg {
          color: ${t?a?.accent?.foregroundInteraction:a?.base?.ornamentSecondaryInteraction};
        }
      }
    `},`;`),y=i(`div`,{shouldForwardProp:e=>!h.includes(e),target:`eyijci11`})(s,` `,e=>{let{shouldTruncate:t=!1}=e;return`
      ${t&&_()}
    `},`;`),b=i(`div`,{shouldForwardProp:e=>!h.includes(e),target:`eyijci10`})(e=>{let{horizontalAlign:t=`left`}=e;return`
      align-items: flex-end;
      width: 100%;
      display: flex;
      justify-content: ${t?m[t]:`flex-start`};
    `},`;`)})),S,C,w,T,E=t((()=>{S=e(n()),f(),x(),C=e(a()),w=e=>{let{active:t,children:n,direction:r=`desc`,hideSortIcon:i=!1,horizontalAlign:a,hover:o,shouldTruncate:s=!1}=e;return(0,C.jsxs)(b,{horizontalAlign:a,children:[typeof n==`string`||typeof n==`number`?(0,C.jsx)(y,{shouldTruncate:s,children:n}):n,(!i||t)&&o&&(0,C.jsx)(g,{"aria-label":r===`asc`?`Change sort direction from ascending to descending`:`Change sort direction from descending to ascending`,sdsIcon:r===`asc`?`ChevronUp`:`ChevronDown`,sdsSize:`xs`,active:t,hideSortIcon:i})]})},T=(0,S.forwardRef)((e,t)=>{let{as:n=`th`,children:r,shouldShowTooltipOnHover:i=!1,tooltipProps:a,tooltipText:o=``,tooltipSubtitle:s,hover:c=!1,...l}=e;return i&&c?(0,C.jsx)(p,{arrow:!0,placement:`top-start`,subtitle:s,title:o,...a,children:(0,C.jsx)(v,{as:n,ref:t,hover:c,...l,children:(0,C.jsx)(w,{...e,hover:c,children:r})})}):(0,C.jsx)(v,{as:n,ref:t,hover:c,...l,children:(0,C.jsx)(w,{hover:c,...e,children:r})})})}));export{E as n,T as t};