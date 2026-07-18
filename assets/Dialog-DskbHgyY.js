import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,E as r,Gi as i,Gn as a,Hr as o,K as s,Mi as c,Ni as l,Un as u,W as d,X as f,Y as p,Z as m,_ as ee,ct as h,fi as te,g,k as ne,nt as re,qn as ie,rt as ae,t as _,u as oe,zn as se}from"./iframe-ZT52KRhI.js";import{n as ce,t as le}from"./Icon-CXgj2pi8.js";import{a as v,r as y,t as b}from"./utils-CHt6irz9.js";import{n as ue,t as x}from"./Button-DpLCbr9e.js";function de(e){let{sdsSize:t=`m`}=e,{width:n,minHeight:r}={l:{minHeight:`600px`,width:`1200px`},m:{minHeight:`480px`,width:`900px`},s:{minHeight:`400px`,width:`600px`},xs:{minHeight:`160px`,width:`400px`}}[t];return`
    width: ${n};
    min-height: ${r};
    max-width: revert;
    box-sizing: border-box;
  `}var S,C,w=t((()=>{l(),h(),_(),ae(),S=[`sdsSize`],C=c(te,{shouldForwardProp:e=>!S.includes(e),target:`e3jjuqo0`})(`&{`,de,` `,e=>{let{sdsSize:t}=e,n=m(e),r=d(e),i=f(e),a=p(e),o=t===`xs`||t===`s`;return`
        background-color: ${a?.base?.surfacePrimary};
        background-image: none;
        box-shadow: ${i?.l};
        max-height: calc(100vh - ${2*(n?.xxxl||40)}px);
        border-radius: ${r?.xl}px;
        padding: ${o?n?.xl:n?.xxxl}px;
        outline: 1px solid ${re(a?.base?.borderSecondary||`#000000`,15)};
      `},`;}`)})),T,E,D,O=t((()=>{T=e(n()),w(),E=i(),D=(0,T.forwardRef)(function(e,t){let{sdsSize:n=`m`,...r}=e;return(0,E.jsx)(C,{sdsSize:n,ref:t,...r})})})),k,A=t((()=>{l(),ue(),_(),k=c(x,{target:`e1fdmmfb0`})(`position:absolute;height:unset;`,e=>{let{size:t}=e,n=m(e),r=s(e),i=t===`small`||t===`medium`?n?.xl:n?.xxxl,a={small:r?.s?.width,medium:r?.l?.width,large:r?.xl?.width};return`
      right: ${i}px;

      svg {
        width: ${a[t]}px;
        height: ${a[t]}px;
      }
    `},`;`)})),j,M,N,P,F,fe=t((()=>{j=e(n()),A(),ce(),M=i(),N={l:`large`,m:`large`,s:`medium`,xs:`small`},P={l:`xl`,m:`l`,s:`l`,xs:`s`},F=(0,j.forwardRef)(function(e,t){let{dialogSize:n=`m`,onClick:r,className:i,...a}=e,o=N[n]??`large`,s=P[n]??`l`;return(0,M.jsx)(k,{"aria-label":`Close`,ref:t,onClick:r,size:o,sdsStyle:`minimal`,sdsType:`secondary`,backgroundOnHover:!1,className:i,...a,children:(0,M.jsx)(le,{sdsIcon:`XMark`,sdsSize:s})})})})),I,L,R,z,B,pe=t((()=>{l(),h(),_(),I=[`sdsSize`],L=c(se,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq3`})(`padding:0;`,e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=m(e);return`
      margin-bottom: ${n?r?.l:r?.xl}px;
    `},`;`),R=c(o,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq2`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,i=p(e);return[n?r(e):ne(e),`color: ${i?.base?.textPrimary};`]},`;`),z=c(o,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq1`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=p(e);return[n?ee(e):g(e),`
        color: ${r?.base?.textSecondary};
        padding-top: 0px;
      `]},`;`),B=c(o,{shouldForwardProp:e=>!I.includes(e),target:`e18l2rxq0`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=p(e),i=m(e);return[n?g(e):oe(e),`
        color: ${r?.base?.textSecondary};
        padding-bottom: ${i?.xxxs}px;
      `]},`;`)})),V,H,U,W=t((()=>{V=e(n()),fe(),pe(),v(),H=i(),U=(0,V.forwardRef)(function(e,t){let{children:n,title:r,subtitle:i,overline:a,onClose:o,sdsSize:s,classes:c=b,...l}=e,{root:u,title:d,subtitle:f,overline:p,closeButton:m}=c;return(0,H.jsx)(L,{ref:t,sdsSize:s,className:y(u),...l,children:n||(0,H.jsxs)(H.Fragment,{children:[o&&(0,H.jsx)(F,{onClick:o,dialogSize:s,className:y(m)}),(0,H.jsx)(B,{sdsSize:s,className:y(p),children:a}),(0,H.jsx)(R,{sdsSize:s,className:y(d),children:r}),(0,H.jsx)(z,{sdsSize:s,className:y(f),children:i})]})})})})),G,K,me=t((()=>{l(),h(),_(),G=[`buttonPosition`,`sdsSize`],K=c(u,{shouldForwardProp:e=>!G.includes(e),target:`esa0jqu0`})(`padding:0;`,e=>{let t=m(e),{buttonPosition:n=`right`,sdsSize:r}=e;return`
      justify-content: ${n===`right`?`flex-end`:`flex-start`};;

      margin-top: ${r===`xs`||r===`s`?t?.xl:t?.xxxl}px;

      &.${a.spacing} > :not(:first-of-type) {
        margin-left: ${t?.m}px;
      }
  `},`;`)})),q,J,Y,X=t((()=>{q=e(n()),me(),v(),J=i(),Y=(0,q.forwardRef)(function(e,t){let{sdsSize:n=`m`,classes:r=b,...i}=e,{root:a}=r;return(0,J.jsx)(K,{ref:t,sdsSize:n,className:y(a),...i})})})),Z,Q,$,he=t((()=>{h(),Z=e(n()),O(),W(),X(),v(),Q=i(),$=(0,Z.forwardRef)(function(e,t){let{canClickOutsideClose:n=!0,onClose:r,sdsSize:i=`m`,PaperComponent:a=D,children:o,classes:s=b,...c}=e,{root:l,paper:u}=s,d=Z.useCallback(e=>(0,Q.jsx)(a,{...e,sdsSize:i,className:y(u,e.className)}),[a,u,i]);return(0,Q.jsx)(ie,{ref:t,className:y(l),PaperComponent:d,onClose:(e,t)=>{!n&&t&&(t===`backdropClick`||t===`escapeKeyDown`)||r&&r(e,t)},...c,children:Z.Children.map(o,e=>Z.isValidElement(e)&&(e.type===U||e.type===Y)?Z.cloneElement(e,{sdsSize:i}):e)})})}));export{U as a,X as i,he as n,W as o,Y as r,O as s,$ as t};