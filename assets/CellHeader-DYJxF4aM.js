import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Ii as r,Li as i,O as a,Qa as o,Y as s,Z as c,t as l}from"./iframe-DocVhSSI.js";import{n as u,t as d}from"./Icon-CQ-y6cAL.js";import{n as f,t as p}from"./Tooltip-DB8p7_xV.js";var m,h,g,_,v,y,b,x=e((()=>{i(),l(),u(),m={center:`center`,left:`flex-start`,right:`flex-end`},h=[`active`,`horizontalAlign`,`shouldShowTooltipOnHover`,`tooltipProps`,`tooltipText`,`hideSortIcon`,`hover`,`shouldTruncate`],g=r(d,{shouldForwardProp:e=>!h.includes(e),target:`eyijci13`})(e=>{let{active:t=!1,hideSortIcon:n}=e,r=c(e),i=s(e);return`
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
  `,v=r(`div`,{target:`eyijci12`})(a,` `,e=>{let{active:t=!1,horizontalAlign:n=`left`,hover:r=!0}=e,i=c(e),a=s(e),o=t?a?.accent?.foreground:a?.base?.textSecondary,l=t?a?.accent?.foregroundInteraction:a?.base?.textPrimary;return`
      outline: none;
      color: ${o};
      padding: ${i?.m}px !important;
      text-align: ${n};
      cursor: ${r?`pointer`:`default`};
      vertical-align: bottom;

      & .MuiButtonBase-root {
        outline: none;
      }

      &:hover {
        color: ${r?l:o};

        & .MuiButtonBase-root {
          color: ${l};
          opacity: 1;
        }

        & svg {
          color: ${t?a?.accent?.foregroundInteraction:a?.base?.ornamentSecondaryInteraction};
        }
      }
    `},`;`),y=r(`div`,{shouldForwardProp:e=>!h.includes(e),target:`eyijci11`})(a,` `,e=>{let{shouldTruncate:t=!1}=e;return`
      ${t&&_()}
    `},`;`),b=r(`div`,{shouldForwardProp:e=>!h.includes(e),target:`eyijci10`})(e=>{let{horizontalAlign:t=`left`}=e;return`
      align-items: flex-end;
      width: 100%;
      display: flex;
      justify-content: ${t?m[t]:`flex-start`};
    `},`;`)})),S,C,w,T,E=e((()=>{S=t(o()),f(),x(),C=n(),w=e=>{let{active:t,children:n,direction:r=`desc`,hideSortIcon:i=!1,horizontalAlign:a,hover:o,shouldTruncate:s=!1}=e;return(0,C.jsxs)(b,{horizontalAlign:a,children:[typeof n==`string`||typeof n==`number`?(0,C.jsx)(y,{shouldTruncate:s,children:n}):n,(!i||t)&&o&&(0,C.jsx)(g,{"aria-label":r===`asc`?`Change sort direction from ascending to descending`:`Change sort direction from descending to ascending`,sdsIcon:r===`asc`?`ChevronUp`:`ChevronDown`,sdsSize:`xs`,active:t,hideSortIcon:i})]})},T=(0,S.forwardRef)((e,t)=>{let{as:n=`th`,children:r,shouldShowTooltipOnHover:i=!1,tooltipProps:a,tooltipText:o=``,tooltipSubtitle:s,hover:c=!1,...l}=e;return i&&c?(0,C.jsx)(p,{arrow:!0,placement:`top-start`,sdsStyle:`dark`,subtitle:s,title:o,...a,children:(0,C.jsx)(v,{as:n,ref:t,hover:c,...l,children:(0,C.jsx)(w,{...e,hover:c,children:r})})}):(0,C.jsx)(v,{as:n,ref:t,hover:c,...l,children:(0,C.jsx)(w,{hover:c,...e,children:r})})})}));export{E as n,T as t};