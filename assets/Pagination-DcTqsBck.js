import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{$n as n,Kr as r,N as i,P as a,Qn as o,W as s,Xn as c,Y as l,Z as u,Zn as d,cr as f,t as p,u as m,z as h}from"./iframe-DI6qETgL.js";import{n as g,t as _}from"./Icon-BvRFwTEr.js";import{n as v,t as y}from"./Button-K7qsdWHe.js";import{n as b,t as x}from"./MenuItem-Bc4FptOd.js";import{n as S,t as C}from"./Menu---zeulGi.js";var w,T,E,D,O,k,A,j=t((()=>{d(),n(),v(),p(),w=[`sdsStyle`,`selected`,`onPageChange`,`onNextPage`,`onPreviousPage`,`goToPage`,`totalCount`,`siblingCount`,`currentPage`,`pageSize`,`truncateDropdown`],T=c(y,{target:`e61vbx4`})(e=>{let t=l(e);return`
      width: 28px;
      height: 28px;
      cursor: "pointer";

      & .MuiSvgIcon-root {
        width: 12px;
        color: ${t?.base?.ornamentSecondary};
      }

      &:hover {
        & .MuiSvgIcon-root {
          color: ${t?.base?.ornamentSecondaryInteraction}
        }
      }
    `},`;`),E=c(`li`,{shouldForwardProp:e=>!w.includes(e),target:`e61vbx3`})(e=>{let{disabled:t,sdsStyle:n}=e,r=u(e),i=l(e),a=s(e);return`
      width: 28px;
      height: 28px;
      cursor: ${t?`auto`:`pointer`};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${n===`round`?a?.rounded:a?.m}px;

      &[data-order="first"] {
        margin-right: ${r?.m}px;
      }

      &[data-order="last"] {
        margin-left: ${r?.m}px;
      }

      & .MuiSvgIcon-root {
        color: ${t?i?.base?.ornamentDisabled:i?.base?.ornamentSecondary};
      }

      &:hover {
        background-color: ${t?`transparent`:i?.base?.fillPrimaryInteraction};

        & .MuiSvgIcon-root {
          color: ${t?i?.base?.ornamentDisabled:i?.base?.ornamentSecondaryInteraction}
        }
      }

      ${h(e)}
    `},`;`),D=c(`ul`,{shouldForwardProp:e=>!w.includes(e),target:`e61vbx2`})(m,` display:flex;flex-wrap:wrap;padding:0;margin:0;& li{list-style:none;}`),O=e=>{let t=l(e);return o(`background-color:`,t?.base?.fillPrimaryInteraction,`;color:`,t?.base?.textPrimary,`;box-shadow:inset 0 0 0 1px `,t?.base?.borderSecondary,`;&:hover{box-shadow:inset 0 0 0 1px `,t?.base?.borderSecondary,`;}`,a(e),`;`,``)},k=c(`li`,{shouldForwardProp:e=>!w.includes(e),target:`e61vbx1`})(i,` `,e=>{let{selected:t,sdsStyle:n}=e,r=u(e),i=s(e),a=l(e);return o(`color:`,a?.base?.textSecondary,`;cursor:pointer;list-style:none;padding:0 `,r?.s,`px;min-width:28px;height:28px;margin-right:`,r?.s,`px;display:flex;justify-content:center;align-items:center;border-radius:`,n===`round`?i?.rounded:i?.l,`px;user-select:none;&:hover{background-color:`,a?.base?.fillPrimaryInteraction,`;color:`,a?.base?.textPrimary,`;}&:nth-last-of-type(-n + 2){margin-right:0;}`,t&&O(e),` `,h(e),`;`,``)},`;`),A=c(k,{target:`e61vbx0`})({name:`16nfuj0`,styles:`width:28px;max-width:28px`})})),M,N=t((()=>{d(),S(),M=c(C,{target:`e1v4jq3t0`})({name:`u0tllw`,styles:`& .MuiPaper-root{max-height:120px;}`})})),P,F,I,L=t((()=>{P=e(r()),b(),j(),N(),g(),F=f(),I=e=>{let{pageList:t,onPageChange:n,sdsStyle:r}=e,[i,a]=(0,P.useState)(null),o=e=>{a(e.currentTarget)},s=()=>{a(null)};return(0,F.jsxs)(A,{sdsStyle:r,children:[(0,F.jsx)(T,{"aria-label":`Go to a page`,onClick:o,size:`small`,sdsStyle:`minimal`,sdsType:`secondary`,backgroundOnHover:!1,children:(0,F.jsx)(_,{sdsIcon:`DotsHorizontal`,sdsSize:`s`})}),(0,F.jsx)(M,{anchorEl:i,keepMounted:!0,open:!!i,onClose:s,children:t.map(e=>(0,F.jsx)(x,{onClick:()=>{n(e),s()},sdsType:`action`,children:e},e))})]})}})),R,z,B,V=t((()=>{R=e(r()),z=(e,t)=>{let n=t-e+1;return Array.from({length:n},(t,n)=>n+e)},B=({totalCount:e,pageSize:t,siblingCount:n=1,currentPage:r})=>(0,R.useMemo)(()=>{let i=Math.ceil(e/t);if(n+5>=i)return z(1,i);let a=Math.max(r-n,1),o=Math.min(r+n,i),s=a>2,c=o<i-2,l=i;if(!s&&c){let e=3+2*n,t=z(1,e),r=z(e+1,i-1);return[...t,r,i]}if(s&&!c){let e=3+2*n,t=z(i-e+1,i);return[1,z(2,i-e),...t]}if(s&&c){let e=z(a,o),t=z(2,a-1),n=z(o+1,i-1);return[1,t,...e,n,l]}},[e,t,n,r])})),H,U,W,G,K=t((()=>{H=e(r()),L(),j(),V(),g(),U=f(),W=(e,t,n,r,i)=>{function a(e,t){(e.key===`Enter`||e.code===`Space`)&&r(t)}return e.map(e=>Array.isArray(e)?t?(0,U.jsx)(I,{pageList:e,onPageChange:r,sdsStyle:n},e.join(`-`)):(0,U.jsx)(k,{sdsStyle:n,children:(0,U.jsx)(T,{"aria-label":`Go to a page`,disabled:!0,size:`small`,sdsStyle:`minimal`,sdsType:`primary`,children:(0,U.jsx)(_,{sdsIcon:`DotsHorizontal`,sdsSize:`s`})})},e.join(`-`)):(0,U.jsx)(k,{onClick:()=>r(e),onKeyDown:t=>a(t,e),selected:e===i,sdsStyle:n,tabIndex:0,children:e},e))},G=(0,H.forwardRef)((e,t)=>{let{sdsStyle:n=`round`,onPageChange:r,onNextPage:i,onPreviousPage:a,totalCount:o,siblingCount:s=1,currentPage:c,pageSize:l,truncateDropdown:u=!0}=e;if(l<1)throw Error(`PageSize can not be smaller than 1!`);let d=B({currentPage:c,pageSize:l,siblingCount:s,totalCount:o})||[];if(c===0||d.length<2)return null;let f=d[d.length-1];return(0,U.jsxs)(D,{ref:t,...e,children:[(0,U.jsx)(E,{"data-order":`first`,disabled:c===1,onClick:()=>c>1&&a(),onKeyDown:p,tabIndex:0,sdsStyle:n,children:(0,U.jsx)(_,{"aria-label":`Previous page`,sdsIcon:`ChevronLeft`,sdsSize:`xs`})},`prevPage`),W(d,u,n,r,c),(0,U.jsx)(E,{"data-order":`last`,disabled:c===f,onClick:()=>c!==f&&i(),onKeyDown:m,tabIndex:0,sdsStyle:n,children:(0,U.jsx)(_,{"aria-label":`Next page`,sdsIcon:`ChevronRight`,sdsSize:`xs`})},`onNextPage`)]});function p(e){(e.key===`Enter`||e.code===`Space`)&&c>1&&a()}function m(e){(e.key===`Enter`||e.code===`Space`)&&c!==f&&i()}})}));export{K as n,G as t};