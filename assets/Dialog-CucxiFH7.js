import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Bn as n,E as r,Fi as i,Hn as a,Ii as o,In as s,K as c,Li as l,Mr as u,Qa as d,W as f,Wn as p,X as m,Y as h,Z as g,_ as ee,ct as _,ei as v,g as y,k as te,nt as ne,rt as re,t as b,u as ie}from"./iframe-DocVhSSI.js";import{n as ae,t as oe}from"./Icon-CQ-y6cAL.js";import{a as x,r as S,t as C}from"./utils-BxIa431Z.js";import{n as se,t as ce}from"./Button-CfkvkcRt.js";function le(e){let{sdsSize:t=`m`}=e,{width:n,minHeight:r}={l:{minHeight:`600px`,width:`1200px`},m:{minHeight:`480px`,width:`900px`},s:{minHeight:`400px`,width:`600px`},xs:{minHeight:`160px`,width:`400px`}}[t];return`
    width: ${n};
    min-height: ${r};
    max-width: revert;
    box-sizing: border-box;
  `}var w,T,ue=e((()=>{l(),_(),b(),re(),w=[`sdsSize`],T=o(v,{shouldForwardProp:e=>!w.includes(e),target:`e3jjuqo0`})(`&{`,le,` `,e=>{let{sdsSize:t}=e,n=g(e),r=f(e),i=m(e),a=h(e),o=t===`xs`||t===`s`;return`
        background-color: ${a?.base?.surfacePrimary};
        background-image: none;
        box-shadow: ${i?.l};
        max-height: calc(100vh - ${2*(n?.xxxl||40)}px);
        border-radius: ${r?.xl}px;
        padding: ${o?n?.xl:n?.xxxl}px;
        outline: 1px solid ${ne(a?.base?.borderSecondary||`#000000`,15)};
      `},`;}`)})),E,D,O,k=e((()=>{E=t(d()),ue(),D=i(),O=(0,E.forwardRef)(function(e,t){let{sdsSize:n=`m`,...r}=e;return(0,D.jsx)(T,{sdsSize:n,ref:t,...r})})})),A,de=e((()=>{l(),se(),b(),A=o(ce,{target:`e1fdmmfb0`})(`position:absolute;height:unset;`,e=>{let{size:t}=e,n=g(e),r=c(e),i=t===`small`||t===`medium`?n?.xl:n?.xxxl,a={small:r?.s?.width,medium:r?.l?.width,large:r?.xl?.width};return`
      right: ${i}px;

      svg {
        width: ${a[t]}px;
        height: ${a[t]}px;
      }
    `},`;`)})),j,M,N,P,F,fe=e((()=>{j=t(d()),de(),ae(),M=i(),N={l:`large`,m:`large`,s:`medium`,xs:`small`},P={l:`xl`,m:`l`,s:`l`,xs:`s`},F=(0,j.forwardRef)(function(e,t){let{dialogSize:n=`m`,onClick:r,className:i,...a}=e,o=N[n]??`large`,s=P[n]??`l`;return(0,M.jsx)(A,{"aria-label":`Close`,ref:t,onClick:r,size:o,sdsStyle:`minimal`,sdsType:`secondary`,backgroundOnHover:!1,className:i,...a,children:(0,M.jsx)(oe,{sdsIcon:`XMark`,sdsSize:s})})})})),I,L,R,z,B,pe=e((()=>{l(),_(),b(),I=[`sdsSize`],L=o(s,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq3`})(`padding:0;`,e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=g(e);return`
      margin-bottom: ${n?r?.l:r?.xl}px;
    `},`;`),R=o(u,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq2`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,i=h(e);return[n?r(e):te(e),`color: ${i?.base?.textPrimary};`]},`;`),z=o(u,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq1`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=h(e);return[n?ee(e):y(e),`
        color: ${r?.base?.textSecondary};
        padding-top: 0px;
      `]},`;`),B=o(u,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq0`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=h(e),i=g(e);return[n?y(e):ie(e),`
        color: ${r?.base?.textSecondary};
        padding-bottom: ${i?.xxxs}px;
      `]},`;`)})),V,H,U,W=e((()=>{V=t(d()),fe(),pe(),x(),H=i(),U=(0,V.forwardRef)(function(e,t){let{children:n,title:r,subtitle:i,overline:a,onClose:o,sdsSize:s,classes:c=C,...l}=e,{root:u,title:d,subtitle:f,overline:p,closeButton:m}=c;return(0,H.jsx)(L,{ref:t,sdsSize:s,className:S(u),...l,children:n||(0,H.jsxs)(H.Fragment,{children:[o&&(0,H.jsx)(F,{onClick:o,dialogSize:s,className:S(m)}),(0,H.jsx)(B,{sdsSize:s,className:S(p),children:a}),(0,H.jsx)(R,{sdsSize:s,className:S(d),children:r}),(0,H.jsx)(z,{sdsSize:s,className:S(f),children:i})]})})})})),G,K,me=e((()=>{l(),_(),b(),G=[`buttonPosition`,`sdsSize`],K=o(n,{shouldForwardProp:e=>!G.includes(e),target:`esa0jqu0`})(`padding:0;`,e=>{let t=g(e),{buttonPosition:n=`right`,sdsSize:r}=e;return`
      justify-content: ${n===`right`?`flex-end`:`flex-start`};;

      margin-top: ${r===`xs`||r===`s`?t?.xl:t?.xxxl}px;

      &.${a.spacing} > :not(:first-of-type) {
        margin-left: ${t?.m}px;
      }
  `},`;`)})),q,J,Y,X=e((()=>{q=t(d()),me(),x(),J=i(),Y=(0,q.forwardRef)(function(e,t){let{sdsSize:n=`m`,classes:r=C,...i}=e,{root:a}=r;return(0,J.jsx)(K,{ref:t,sdsSize:n,className:S(a),...i})})})),Z,Q,$,he=e((()=>{_(),Z=t(d()),k(),W(),X(),x(),Q=i(),$=(0,Z.forwardRef)(function(e,t){let{canClickOutsideClose:n=!0,onClose:r,sdsSize:i=`m`,PaperComponent:a=O,children:o,classes:s=C,...c}=e,{root:l,paper:u}=s,d=Z.useCallback(e=>(0,Q.jsx)(a,{...e,sdsSize:i,className:S(u,e.className)}),[a,u,i]);return(0,Q.jsx)(p,{ref:t,className:S(l),PaperComponent:d,onClose:(e,t)=>{!n&&t&&(t===`backdropClick`||t===`escapeKeyDown`)||r&&r(e,t)},...c,children:Z.Children.map(o,e=>Z.isValidElement(e)&&(e.type===U||e.type===Y)?Z.cloneElement(e,{sdsSize:i}):e)})})}));export{U as a,X as i,he as n,W as o,Y as r,k as s,$ as t};