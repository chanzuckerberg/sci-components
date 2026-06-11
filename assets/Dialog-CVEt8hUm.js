import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{$t as n,E as r,K as i,Kr as a,Ln as o,Qt as s,Tn as c,W as l,X as u,Xn as d,Xt as f,Y as p,Z as m,Zn as h,_ as ee,cr as g,en as te,g as _,k as ne,nt as re,st as v,t as y,tt as ie,u as ae}from"./iframe-DI6qETgL.js";import{n as b,t as oe}from"./Icon-BvRFwTEr.js";import{a as x,r as S,t as C}from"./utils-B1uyFjm5.js";import{n as se,t as ce}from"./Button-K7qsdWHe.js";function le(e){let{sdsSize:t=`m`}=e,{width:n,minHeight:r}={l:{minHeight:`600px`,width:`1200px`},m:{minHeight:`480px`,width:`900px`},s:{minHeight:`400px`,width:`600px`},xs:{minHeight:`160px`,width:`400px`}}[t];return`
    width: ${n};
    min-height: ${r};
    max-width: revert;
    box-sizing: border-box;
  `}var w,T,ue=t((()=>{h(),v(),y(),re(),w=[`sdsSize`],T=d(o,{shouldForwardProp:e=>!w.includes(e),target:`e3jjuqo0`})(`&{`,le,` `,e=>{let{sdsSize:t}=e,n=m(e),r=l(e),i=u(e),a=p(e),o=t===`xs`||t===`s`;return`
        background-color: ${a?.base?.surfacePrimary};
        background-image: none;
        box-shadow: ${i?.l};
        max-height: calc(100vh - ${2*(n?.xxxl||40)}px);
        border-radius: ${r?.xl}px;
        padding: ${o?n?.xl:n?.xxxl}px;
        outline: 1px solid ${ie(a?.base?.borderSecondary||`#000000`,15)};
      `},`;}`)})),E,D,O,k=t((()=>{E=e(a()),ue(),D=g(),O=(0,E.forwardRef)(function(e,t){let{sdsSize:n=`m`,...r}=e;return(0,D.jsx)(T,{sdsSize:n,ref:t,...r})})})),A,de=t((()=>{h(),se(),y(),A=d(ce,{target:`e1fdmmfb0`})(`position:absolute;height:unset;`,e=>{let{size:t}=e,n=m(e),r=i(e),a=t===`small`||t===`medium`?n?.xl:n?.xxxl,o={small:r?.s?.width,medium:r?.l?.width,large:r?.xl?.width};return`
      right: ${a}px;

      svg {
        width: ${o[t]}px;
        height: ${o[t]}px;
      }
    `},`;`)})),j,M,N,P,F,fe=t((()=>{j=e(a()),de(),b(),M=g(),N={l:`large`,m:`large`,s:`medium`,xs:`small`},P={l:`xl`,m:`l`,s:`l`,xs:`s`},F=(0,j.forwardRef)(function(e,t){let{dialogSize:n=`m`,onClick:r,className:i,...a}=e,o=N[n]??`large`,s=P[n]??`l`;return(0,M.jsx)(A,{"aria-label":`Close`,ref:t,onClick:r,size:o,sdsStyle:`minimal`,sdsType:`secondary`,backgroundOnHover:!1,className:i,...a,children:(0,M.jsx)(oe,{sdsIcon:`XMark`,sdsSize:s})})})})),I,L,R,z,B,pe=t((()=>{h(),v(),y(),I=[`sdsSize`],L=d(f,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq3`})(`padding:0;`,e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=m(e);return`
      margin-bottom: ${n?r?.l:r?.xl}px;
    `},`;`),R=d(c,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq2`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,i=p(e);return[n?r(e):ne(e),`color: ${i?.base?.textPrimary};`]},`;`),z=d(c,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq1`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=p(e);return[n?ee(e):_(e),`
        color: ${r?.base?.textSecondary};
        padding-top: 0px;
      `]},`;`),B=d(c,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq0`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=p(e),i=m(e);return[n?_(e):ae(e),`
        color: ${r?.base?.textSecondary};
        padding-bottom: ${i?.xxxs}px;
      `]},`;`)})),V,H,U,W=t((()=>{V=e(a()),fe(),pe(),x(),H=g(),U=(0,V.forwardRef)(function(e,t){let{children:n,title:r,subtitle:i,overline:a,onClose:o,sdsSize:s,classes:c=C,...l}=e,{root:u,title:d,subtitle:f,overline:p,closeButton:m}=c;return(0,H.jsx)(L,{ref:t,sdsSize:s,className:S(u),...l,children:n||(0,H.jsxs)(H.Fragment,{children:[o&&(0,H.jsx)(F,{onClick:o,dialogSize:s,className:S(m)}),(0,H.jsx)(B,{sdsSize:s,className:S(p),children:a}),(0,H.jsx)(R,{sdsSize:s,className:S(d),children:r}),(0,H.jsx)(z,{sdsSize:s,className:S(f),children:i})]})})})})),G,K,me=t((()=>{h(),v(),y(),G=[`buttonPosition`,`sdsSize`],K=d(s,{shouldForwardProp:e=>!G.includes(e),target:`esa0jqu0`})(`padding:0;`,e=>{let t=m(e),{buttonPosition:r=`right`,sdsSize:i}=e;return`
      justify-content: ${r===`right`?`flex-end`:`flex-start`};;

      margin-top: ${i===`xs`||i===`s`?t?.xl:t?.xxxl}px;

      &.${n.spacing} > :not(:first-of-type) {
        margin-left: ${t?.m}px;
      }
  `},`;`)})),q,J,Y,X=t((()=>{q=e(a()),me(),x(),J=g(),Y=(0,q.forwardRef)(function(e,t){let{sdsSize:n=`m`,classes:r=C,...i}=e,{root:a}=r;return(0,J.jsx)(K,{ref:t,sdsSize:n,className:S(a),...i})})})),Z,Q,$,he=t((()=>{v(),Z=e(a()),k(),W(),X(),x(),Q=g(),$=(0,Z.forwardRef)(function(e,t){let{canClickOutsideClose:n=!0,onClose:r,sdsSize:i=`m`,PaperComponent:a=O,children:o,classes:s=C,...c}=e,{root:l,paper:u}=s,d=Z.useCallback(e=>(0,Q.jsx)(a,{...e,sdsSize:i,className:S(u,e.className)}),[a,u,i]);return(0,Q.jsx)(te,{ref:t,className:S(l),PaperComponent:d,onClose:(e,t)=>{!n&&t&&(t===`backdropClick`||t===`escapeKeyDown`)||r&&r(e,t)},...c,children:Z.Children.map(o,e=>Z.isValidElement(e)&&(e.type===U||e.type===Y)?Z.cloneElement(e,{sdsSize:i}):e)})})}));export{U as a,X as i,he as n,W as o,Y as r,k as s,$ as t};