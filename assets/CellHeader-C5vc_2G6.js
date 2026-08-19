import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,E as i,Eo as a,gn as o,ko as s,lt as c,mn as l}from"./iframe-CLRePdsX.js";import{n as u,t as d}from"./Icon-Dm0VxswF.js";import{n as f,t as p}from"./Tooltip-DVX65nUY.js";var m,h,g,_,v,y,b,x=e((()=>{r(),i(),u(),m={center:`center`,left:`flex-start`,right:`flex-end`},h=[`active`,`horizontalAlign`,`shouldShowTooltipOnHover`,`tooltipProps`,`tooltipText`,`hideSortIcon`,`hover`,`shouldTruncate`],g=s(d,{shouldForwardProp:e=>!h.includes(e),target:`eyijci13`})(e=>{let{active:t=!1,hideSortIcon:n}=e,r=o(e),i=l(e);return`
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
  `,v=s(`div`,{target:`eyijci12`})(c,` `,e=>{let{active:t=!1,horizontalAlign:n=`left`,hover:r=!0}=e,i=o(e),a=l(e),s=t?a?.accent?.foreground:a?.base?.textSecondary,c=t?a?.accent?.foregroundInteraction:a?.base?.textPrimary;return`
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
        color: ${r?c:s};

        & .MuiButtonBase-root {
          color: ${c};
          opacity: 1;
        }

        & svg {
          color: ${t?a?.accent?.foregroundInteraction:a?.base?.ornamentSecondaryInteraction};
        }
      }
    `},`;`),y=s(`div`,{shouldForwardProp:e=>!h.includes(e),target:`eyijci11`})(c,` `,e=>{let{shouldTruncate:t=!1}=e;return`
      ${t&&_()}
    `},`;`),b=s(`div`,{shouldForwardProp:e=>!h.includes(e),target:`eyijci10`})(e=>{let{horizontalAlign:t=`left`}=e;return`
      align-items: flex-end;
      width: 100%;
      display: flex;
      justify-content: ${t?m[t]:`flex-start`};
    `},`;`)})),S,C,w,T,E=e((()=>{S=t(n()),f(),x(),C=t(a()),w=e=>{let{active:t,children:n,direction:r=`desc`,hideSortIcon:i=!1,horizontalAlign:a,hover:o,shouldTruncate:s=!1}=e;return(0,C.jsxs)(b,{horizontalAlign:a,children:[typeof n==`string`||typeof n==`number`?(0,C.jsx)(y,{shouldTruncate:s,children:n}):n,(!i||t)&&o&&(0,C.jsx)(g,{"aria-label":r===`asc`?`Change sort direction from ascending to descending`:`Change sort direction from descending to ascending`,sdsIcon:r===`asc`?`ChevronUp`:`ChevronDown`,sdsSize:`xs`,active:t,hideSortIcon:i})]})},T=(0,S.forwardRef)((e,t)=>{let{as:n=`th`,children:r,shouldShowTooltipOnHover:i=!1,tooltipProps:a,tooltipText:o=``,tooltipSubtitle:s,hover:c=!1,...l}=e;return i&&c?(0,C.jsx)(p,{arrow:!0,placement:`top-start`,subtitle:s,title:o,...a,children:(0,C.jsx)(v,{as:n,ref:t,hover:c,...l,children:(0,C.jsx)(w,{...e,hover:c,children:r})})}):(0,C.jsx)(v,{as:n,ref:t,hover:c,...l,children:(0,C.jsx)(w,{hover:c,...e,children:r})})})}));export{E as n,T as t};