import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{At as r,Dn as i,Hr as a,It as o,Pt as s,Rt as c,Vr as l,Yn as u,t as d}from"./material-DlyzFPof.js";import{t as f}from"./jsx-runtime-cM__dR4X.js";import{Bt as p,Gt as m,I as ee,Rt as te,Ut as h,Wt as ne,b as g,f as re,nn as ie,rn as ae,t as _,x as oe,z as v}from"./iframe-DhUGD016.js";import{n as y,t as se}from"./Icon-1J9Ma-VV.js";import{n as ce,t as le}from"./Button-Du033jZN.js";import{a as b,r as x,t as S}from"./utils-CbT4iKc5.js";function ue(e){let{sdsSize:t=`m`}=e,{width:n,minHeight:r}={l:{minHeight:`600px`,width:`1200px`},m:{minHeight:`480px`,width:`900px`},s:{minHeight:`400px`,width:`600px`},xs:{minHeight:`160px`,width:`400px`}}[t];return`
    width: ${n};
    min-height: ${r};
    max-width: revert;
    box-sizing: border-box;
  `}var C,w,de=t((()=>{a(),d(),_(),ae(),C=[`sdsSize`],w=l(u,{shouldForwardProp:e=>!C.includes(e),target:`e3jjuqo0`})(`&{`,ue,` `,e=>{let{sdsSize:t}=e,n=m(e),r=te(e),i=ne(e),a=h(e),o=t===`xs`||t===`s`;return`
        background-color: ${a?.base?.surfacePrimary};
        background-image: none;
        box-shadow: ${i?.l};
        max-height: calc(100vh - ${2*(n?.xxxl||40)}px);
        border-radius: ${r?.xl}px;
        padding: ${o?n?.xl:n?.xxxl}px;
        outline: 1px solid ${ie(a?.base?.borderSecondary||`#000000`,15)};
      `},`;}`)})),T,E,D,O=t((()=>{T=e(n()),de(),E=e(f()),D=(0,T.forwardRef)(function(e,t){let{sdsSize:n=`m`,...r}=e;return(0,E.jsx)(w,{sdsSize:n,ref:t,...r})})})),k,fe=t((()=>{a(),ce(),_(),k=l(le,{target:`e1fdmmfb0`})(`position:absolute;height:unset;`,e=>{let{size:t}=e,n=m(e),r=p(e),i=t===`small`||t===`medium`?n?.xl:n?.xxxl,a={small:r?.s?.width,medium:r?.l?.width,large:r?.xl?.width};return`
      right: ${i}px;

      svg {
        width: ${a[t]}px;
        height: ${a[t]}px;
      }
    `},`;`)})),A,j,M,N,P,pe=t((()=>{A=e(n()),fe(),y(),j=e(f()),M={l:`large`,m:`large`,s:`medium`,xs:`small`},N={l:`xl`,m:`l`,s:`l`,xs:`s`},P=(0,A.forwardRef)(function(e,t){let{dialogSize:n=`m`,onClick:r,className:i,...a}=e,o=M[n]??`large`,s=N[n]??`l`;return(0,j.jsx)(k,{"aria-label":`Close`,ref:t,onClick:r,size:o,sdsStyle:`minimal`,sdsType:`secondary`,backgroundOnHover:!1,className:i,...a,children:(0,j.jsx)(se,{sdsIcon:`XMark`,sdsSize:s})})})})),F,I,L,R,z,B=t((()=>{a(),d(),_(),F=[`sdsSize`],I=l(r,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq3`})(`padding:0;`,e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=m(e);return`
      margin-bottom: ${n?r?.l:r?.xl}px;
    `},`;`),L=l(i,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq2`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=h(e);return[n?ee(e):v(e),`color: ${r?.base?.textPrimary};`]},`;`),R=l(i,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq1`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=h(e);return[n?oe(e):g(e),`
        color: ${r?.base?.textSecondary};
        padding-top: 0px;
      `]},`;`),z=l(i,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq0`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=h(e),i=m(e);return[n?g(e):re(e),`
        color: ${r?.base?.textSecondary};
        padding-bottom: ${i?.xxxs}px;
      `]},`;`)})),V,H,U,W=t((()=>{V=e(n()),pe(),B(),b(),H=e(f()),U=(0,V.forwardRef)(function(e,t){let{children:n,title:r,subtitle:i,overline:a,onClose:o,sdsSize:s,classes:c=S,...l}=e,{root:u,title:d,subtitle:f,overline:p,closeButton:m}=c;return(0,H.jsx)(I,{ref:t,sdsSize:s,className:x(u),...l,children:n||(0,H.jsxs)(H.Fragment,{children:[o&&(0,H.jsx)(P,{onClick:o,dialogSize:s,className:x(m)}),(0,H.jsx)(z,{sdsSize:s,className:x(p),children:a}),(0,H.jsx)(L,{sdsSize:s,className:x(d),children:r}),(0,H.jsx)(R,{sdsSize:s,className:x(f),children:i})]})})})})),G,K,me=t((()=>{a(),d(),_(),G=[`buttonPosition`,`sdsSize`],K=l(s,{shouldForwardProp:e=>!G.includes(e),target:`esa0jqu0`})(`padding:0;`,e=>{let t=m(e),{buttonPosition:n=`right`,sdsSize:r}=e;return`
      justify-content: ${n===`right`?`flex-end`:`flex-start`};;

      margin-top: ${r===`xs`||r===`s`?t?.xl:t?.xxxl}px;

      &.${o.spacing} > :not(:first-of-type) {
        margin-left: ${t?.m}px;
      }
  `},`;`)})),q,J,Y,X=t((()=>{q=e(n()),me(),b(),J=e(f()),Y=(0,q.forwardRef)(function(e,t){let{sdsSize:n=`m`,classes:r=S,...i}=e,{root:a}=r;return(0,J.jsx)(K,{ref:t,sdsSize:n,className:x(a),...i})})})),Z,Q,$,he=t((()=>{d(),Z=e(n()),O(),W(),X(),b(),Q=e(f()),$=(0,Z.forwardRef)(function(e,t){let{canClickOutsideClose:n=!0,onClose:r,sdsSize:i=`m`,PaperComponent:a=D,children:o,classes:s=S,...l}=e,{root:u,paper:d}=s,f=Z.useCallback(e=>(0,Q.jsx)(a,{...e,sdsSize:i,className:x(d,e.className)}),[a,d,i]);return(0,Q.jsx)(c,{ref:t,className:x(u),PaperComponent:f,onClose:(e,t)=>{!n&&t&&(t===`backdropClick`||t===`escapeKeyDown`)||r&&r(e,t)},...l,children:Z.Children.map(o,e=>Z.isValidElement(e)&&(e.type===U||e.type===Y)?Z.cloneElement(e,{sdsSize:i}):e)})})}));export{U as a,R as c,D as d,O as f,X as i,L as l,he as n,W as o,Y as r,z as s,$ as t,B as u};