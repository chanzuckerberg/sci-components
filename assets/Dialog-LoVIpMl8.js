import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Bt as i,Gt as a,I as o,Kr as s,Qr as c,Rt as l,Ui as u,Ut as d,Wt as f,Xr as p,_n as m,b as h,da as ee,ei as te,f as ne,io as g,nn as re,rn as ie,ro as _,t as v,x as ae,z as oe}from"./iframe-BPFLG940.js";import{n as se,t as ce}from"./Icon-DpYImm5o.js";import{n as y,t as le}from"./Button-CvZmp_f8.js";import{a as b,r as x,t as S}from"./utils-DEYthYrx.js";function ue(e){let{sdsSize:t=`m`}=e,{width:n,minHeight:r}={l:{minHeight:`600px`,width:`1200px`},m:{minHeight:`480px`,width:`900px`},s:{minHeight:`400px`,width:`600px`},xs:{minHeight:`160px`,width:`400px`}}[t];return`
    width: ${n};
    min-height: ${r};
    max-width: revert;
    box-sizing: border-box;
  `}var C,w,de=e((()=>{g(),m(),v(),ie(),C=[`sdsSize`],w=_(ee,{shouldForwardProp:e=>!C.includes(e),target:`e3jjuqo0`})(`&{`,ue,` `,e=>{let{sdsSize:t}=e,n=a(e),r=l(e),i=f(e),o=d(e),s=t===`xs`||t===`s`;return`
        background-color: ${o?.base?.surfacePrimary};
        background-image: none;
        box-shadow: ${i?.l};
        max-height: calc(100vh - ${2*(n?.xxxl||40)}px);
        border-radius: ${r?.xl}px;
        padding: ${s?n?.xl:n?.xxxl}px;
        outline: 1px solid ${re(o?.base?.borderSecondary||`#000000`,15)};
      `},`;}`)})),T,E,D,O=e((()=>{T=t(n()),de(),E=t(r()),D=(0,T.forwardRef)(function(e,t){let{sdsSize:n=`m`,...r}=e;return(0,E.jsx)(w,{sdsSize:n,ref:t,...r})})})),k,fe=e((()=>{g(),y(),v(),k=_(le,{target:`e1fdmmfb0`})(`position:absolute;height:unset;`,e=>{let{size:t}=e,n=a(e),r=i(e),o=t===`small`||t===`medium`?n?.xl:n?.xxxl,s={small:r?.s?.width,medium:r?.l?.width,large:r?.xl?.width};return`
      right: ${o}px;

      svg {
        width: ${s[t]}px;
        height: ${s[t]}px;
      }
    `},`;`)})),A,j,M,N,P,pe=e((()=>{A=t(n()),fe(),se(),j=t(r()),M={l:`large`,m:`large`,s:`medium`,xs:`small`},N={l:`xl`,m:`l`,s:`l`,xs:`s`},P=(0,A.forwardRef)(function(e,t){let{dialogSize:n=`m`,onClick:r,className:i,...a}=e,o=M[n]??`large`,s=N[n]??`l`;return(0,j.jsx)(k,{"aria-label":`Close`,ref:t,onClick:r,size:o,sdsStyle:`minimal`,sdsType:`secondary`,backgroundOnHover:!1,className:i,...a,children:(0,j.jsx)(ce,{sdsIcon:`XMark`,sdsSize:s})})})})),F,I,L,R,z,B=e((()=>{g(),m(),v(),F=[`sdsSize`],I=_(s,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq3`})(`padding:0;`,e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=a(e);return`
      margin-bottom: ${n?r?.l:r?.xl}px;
    `},`;`),L=_(u,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq2`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=d(e);return[n?o(e):oe(e),`color: ${r?.base?.textPrimary};`]},`;`),R=_(u,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq1`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=d(e);return[n?ae(e):h(e),`
        color: ${r?.base?.textSecondary};
        padding-top: 0px;
      `]},`;`),z=_(u,{shouldForwardProp:e=>!F.includes(e),target:`e18l2rxq0`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=d(e),i=a(e);return[n?h(e):ne(e),`
        color: ${r?.base?.textSecondary};
        padding-bottom: ${i?.xxxs}px;
      `]},`;`)})),V,H,U,W=e((()=>{V=t(n()),pe(),B(),b(),H=t(r()),U=(0,V.forwardRef)(function(e,t){let{children:n,title:r,subtitle:i,overline:a,onClose:o,sdsSize:s,classes:c=S,...l}=e,{root:u,title:d,subtitle:f,overline:p,closeButton:m}=c;return(0,H.jsx)(I,{ref:t,sdsSize:s,className:x(u),...l,children:n||(0,H.jsxs)(H.Fragment,{children:[o&&(0,H.jsx)(P,{onClick:o,dialogSize:s,className:x(m)}),(0,H.jsx)(z,{sdsSize:s,className:x(p),children:a}),(0,H.jsx)(L,{sdsSize:s,className:x(d),children:r}),(0,H.jsx)(R,{sdsSize:s,className:x(f),children:i})]})})})})),G,K,me=e((()=>{g(),m(),v(),G=[`buttonPosition`,`sdsSize`],K=_(p,{shouldForwardProp:e=>!G.includes(e),target:`esa0jqu0`})(`padding:0;`,e=>{let t=a(e),{buttonPosition:n=`right`,sdsSize:r}=e;return`
      justify-content: ${n===`right`?`flex-end`:`flex-start`};;

      margin-top: ${r===`xs`||r===`s`?t?.xl:t?.xxxl}px;

      &.${c.spacing} > :not(:first-of-type) {
        margin-left: ${t?.m}px;
      }
  `},`;`)})),q,J,Y,X=e((()=>{q=t(n()),me(),b(),J=t(r()),Y=(0,q.forwardRef)(function(e,t){let{sdsSize:n=`m`,classes:r=S,...i}=e,{root:a}=r;return(0,J.jsx)(K,{ref:t,sdsSize:n,className:x(a),...i})})})),Z,Q,$,he=e((()=>{m(),Z=t(n()),O(),W(),X(),b(),Q=t(r()),$=(0,Z.forwardRef)(function(e,t){let{canClickOutsideClose:n=!0,onClose:r,sdsSize:i=`m`,PaperComponent:a=D,children:o,classes:s=S,...c}=e,{root:l,paper:u}=s,d=Z.useCallback(e=>(0,Q.jsx)(a,{...e,sdsSize:i,className:x(u,e.className)}),[a,u,i]);return(0,Q.jsx)(te,{ref:t,className:x(l),PaperComponent:d,onClose:(e,t)=>{!n&&t&&(t===`backdropClick`||t===`escapeKeyDown`)||r&&r(e,t)},...c,children:Z.Children.map(o,e=>Z.isValidElement(e)&&(e.type===U||e.type===Y)?Z.cloneElement(e,{sdsSize:i}):e)})})}));export{U as a,R as c,D as d,O as f,X as i,L as l,he as n,W as o,Y as r,z as s,$ as t,B as u};