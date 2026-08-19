import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Ci as i,Dn as a,E as o,Eo as s,G as c,Hn as l,K as u,L as d,La as f,On as p,Ti as m,_i as ee,dn as te,gn as h,ha as g,hn as ne,ko as _,ln as re,mn as v,st as ie,ut as ae,xi as oe}from"./iframe-s0DqqZ6S.js";import{n as se,t as ce}from"./Icon-BAm62WT8.js";import{n as le,t as ue}from"./Button-Knlg9A8k.js";import{a as y,r as b,t as x}from"./utils-BxIa431Z.js";function de(e){let{sdsSize:t=`m`}=e,{width:n,minHeight:r}={l:{minHeight:`600px`,width:`1200px`},m:{minHeight:`480px`,width:`900px`},s:{minHeight:`400px`,width:`600px`},xs:{minHeight:`160px`,width:`400px`}}[t];return`
    width: ${n};
    min-height: ${r};
    max-width: revert;
    box-sizing: border-box;
  `}var S,C,fe=e((()=>{r(),l(),o(),p(),S=[`sdsSize`],C=_(f,{shouldForwardProp:e=>!S.includes(e),target:`e3jjuqo0`})(`&{`,de,` `,e=>{let{sdsSize:t}=e,n=h(e),r=re(e),i=ne(e),o=v(e),s=t===`xs`||t===`s`;return`
        background-color: ${o?.base?.surfacePrimary};
        background-image: none;
        box-shadow: ${i?.l};
        max-height: calc(100vh - ${2*(n?.xxxl||40)}px);
        border-radius: ${r?.xl}px;
        padding: ${s?n?.xl:n?.xxxl}px;
        outline: 1px solid ${a(o?.base?.borderSecondary||`#000000`,15)};
      `},`;}`)})),w,T,E,D=e((()=>{w=t(n()),fe(),T=t(s()),E=(0,w.forwardRef)(function(e,t){let{sdsSize:n=`m`,...r}=e;return(0,T.jsx)(C,{sdsSize:n,ref:t,...r})})})),O,pe=e((()=>{r(),le(),o(),O=_(ue,{target:`e1fdmmfb0`})(`position:absolute;height:unset;`,e=>{let{size:t}=e,n=h(e),r=te(e),i=t===`small`||t===`medium`?n?.xl:n?.xxxl,a={small:r?.s?.width,medium:r?.l?.width,large:r?.xl?.width};return`
      right: ${i}px;

      svg {
        width: ${a[t]}px;
        height: ${a[t]}px;
      }
    `},`;`)})),k,A,j,M,N,me=e((()=>{k=t(n()),pe(),se(),A=t(s()),j={l:`large`,m:`large`,s:`medium`,xs:`small`},M={l:`xl`,m:`l`,s:`l`,xs:`s`},N=(0,k.forwardRef)(function(e,t){let{dialogSize:n=`m`,onClick:r,className:i,...a}=e,o=j[n]??`large`,s=M[n]??`l`;return(0,A.jsx)(O,{"aria-label":`Close`,ref:t,onClick:r,size:o,sdsStyle:`minimal`,sdsType:`secondary`,backgroundOnHover:!1,className:i,...a,children:(0,A.jsx)(ce,{sdsIcon:`XMark`,sdsSize:s})})})})),P,F,I,L,R,z=e((()=>{r(),l(),o(),P=[`sdsSize`],F=_(ee,{shouldForwardProp:e=>!P.includes(e),target:`e18l2rxq3`})(`padding:0;`,e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=h(e);return`
      margin-bottom: ${n?r?.l:r?.xl}px;
    `},`;`),I=_(g,{shouldForwardProp:e=>!P.includes(e),target:`e18l2rxq2`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=v(e);return[n?ie(e):ae(e),`color: ${r?.base?.textPrimary};`]},`;`),L=_(g,{shouldForwardProp:e=>!P.includes(e),target:`e18l2rxq1`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=v(e);return[n?u(e):c(e),`
        color: ${r?.base?.textSecondary};
        padding-top: 0px;
      `]},`;`),R=_(g,{shouldForwardProp:e=>!P.includes(e),target:`e18l2rxq0`})(e=>{let{sdsSize:t}=e,n=t===`xs`||t===`s`,r=v(e),i=h(e);return[n?c(e):d(e),`
        color: ${r?.base?.textSecondary};
        padding-bottom: ${i?.xxxs}px;
      `]},`;`)})),B,V,H,U=e((()=>{B=t(n()),me(),z(),y(),V=t(s()),H=(0,B.forwardRef)(function(e,t){let{children:n,title:r,subtitle:i,overline:a,onClose:o,sdsSize:s,classes:c=x,...l}=e,{root:u,title:d,subtitle:f,overline:p,closeButton:m}=c;return(0,V.jsx)(F,{ref:t,sdsSize:s,className:b(u),...l,children:n||(0,V.jsxs)(V.Fragment,{children:[o&&(0,V.jsx)(N,{onClick:o,dialogSize:s,className:b(m)}),(0,V.jsx)(R,{sdsSize:s,className:b(p),children:a}),(0,V.jsx)(I,{sdsSize:s,className:b(d),children:r}),(0,V.jsx)(L,{sdsSize:s,className:b(f),children:i})]})})})})),W,G,K=e((()=>{r(),l(),o(),W=[`buttonPosition`,`sdsSize`],G=_(oe,{shouldForwardProp:e=>!W.includes(e),target:`esa0jqu0`})(`padding:0;`,e=>{let t=h(e),{buttonPosition:n=`right`,sdsSize:r}=e;return`
      justify-content: ${n===`right`?`flex-end`:`flex-start`};;

      margin-top: ${r===`xs`||r===`s`?t?.xl:t?.xxxl}px;

      &.${i.spacing} > :not(:first-of-type) {
        margin-left: ${t?.m}px;
      }
  `},`;`)})),q,J,Y,X=e((()=>{q=t(n()),K(),y(),J=t(s()),Y=(0,q.forwardRef)(function(e,t){let{sdsSize:n=`m`,classes:r=x,...i}=e,{root:a}=r;return(0,J.jsx)(G,{ref:t,sdsSize:n,className:b(a),...i})})})),Z,Q,$,he=e((()=>{l(),Z=t(n()),D(),U(),X(),y(),Q=t(s()),$=(0,Z.forwardRef)(function(e,t){let{canClickOutsideClose:n=!0,onClose:r,sdsSize:i=`m`,PaperComponent:a=E,children:o,classes:s=x,...c}=e,{root:l,paper:u}=s,d=Z.useCallback(e=>(0,Q.jsx)(a,{...e,sdsSize:i,className:b(u,e.className)}),[a,u,i]);return(0,Q.jsx)(m,{ref:t,className:b(l),PaperComponent:d,onClose:(e,t)=>{!n&&t&&(t===`backdropClick`||t===`escapeKeyDown`)||r&&r(e,t)},...c,children:Z.Children.map(o,e=>Z.isValidElement(e)&&(e.type===H||e.type===Y)?Z.cloneElement(e,{sdsSize:i}):e)})})}));export{H as a,L as c,E as d,D as f,X as i,I as l,he as n,U as o,Y as r,R as s,$ as t,z as u};