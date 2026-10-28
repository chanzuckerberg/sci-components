import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Kr as i,St as a,Vr as o,Wr as s,dn as c,t as l,wt as u}from"./material-DlyzFPof.js";import{t as d}from"./jsx-runtime-cM__dR4X.js";import{Bt as f,Gt as p,Ut as m,Wt as h,t as g}from"./iframe-TnbieWZB.js";import{n as _,t as v}from"./Icon-P6YZrEvk.js";import{n as y,t as b}from"./Button-2LRnNJDR.js";var x,S=t((()=>{x={enter:225,exit:195}})),C,w,T,E,D,O=t((()=>{r(),l(),g(),i(),S(),C=[`sdsType`,`position`,`width`,`HeaderComponent`,`onClick`,`disableScrollLock`,`closeButtonOnClick`,`CloseButtonComponent`,`isBackdropClickEnabled`],w=e=>{let t=m(e),n=p(e);return s(`.`,u.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:`,n?.l,`px;min-width:`,240,`px;min-height:`,240,`px;}`,``)},T=e=>{let t=m(e),n=p(e),r=h(e);return s(`pointer-events:none;.`,u.paper,`,.`,c.root,`{pointer-events:auto;}.`,u.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:0 `,n?.xl,`px `,n?.xl,`px;min-width:`,320,`px;min-height:`,320,`px;box-shadow:`,r?.l,`;background-image:none;}`,``)},E=o(a,{shouldForwardProp:e=>!C.includes(e),target:`ejokiai1`})(e=>{let{sdsType:t=`basic`,anchor:n=`left`,width:r}=e,i=typeof r==`number`?`${r}px`:r,a=n===`bottom`?`100%`:i,o=n===`bottom`?i:`100%`;return s(`.`,u.paper,`{height:`,o,`;width:`,a,`;}`,t===`basic`&&w(e),` `,t===`overlay`&&T(e),`;`,``)},`;`),D=o(`div`,{target:`ejokiai0`})(e=>{let t=p(e),n=m(e);return s(`position:sticky;top:0;z-index:1000;background-color:`,n?.base?.backgroundPrimary,`;padding-bottom:`,t?.m,`px;margin-bottom:`,t?.m,`px;padding-top:`,t?.xl,`px;display:flex;justify-content:space-between;align-items:center;&::after{content:"";position:absolute;bottom:0;left:0;right:0;height:`,t?.xl,`px;transform:translateY(100%);background:linear-gradient(
          to bottom,
          `,n?.base?.backgroundPrimary,`,
          transparent
        );pointer-events:none;}`,``)},`;`)})),k,A=t((()=>{r(),g(),k=o(`div`,{target:`e100cy8r0`})(e=>`
      width: 100%;
      height: 100%;
      margin-right: ${p(e)?.l}px;
    `,`;`)})),j,M,N=t((()=>{A(),j=e(d()),M=e=>{let{children:t}=e;return(0,j.jsx)(k,{children:t})}})),P,F=t((()=>{r(),g(),P=o(`div`,{target:`e1a4ppk10`})(e=>{let t=f(e);return`
    display: flex;
    justify-content: end;
    align-items: center;

    button {
      height: auto !important;
      
      svg {
        width: ${t?.l?.width}px;
        height: ${t?.l?.height}px;
      }
    }
  `},`;`)})),I,L,R=t((()=>{y(),F(),_(),I=e(d()),L=e=>{let{onClick:t,CloseButtonComponent:n}=e;return(0,I.jsx)(P,{onClick:t,children:n||(0,I.jsx)(b,{sdsStyle:`minimal`,sdsType:`secondary`,"aria-label":`Panel Toggle`,size:`large`,backgroundOnHover:!1,children:(0,I.jsx)(v,{sdsIcon:`XMark`,sdsSize:`l`})})})}}));function z(e){return e.sdsType===`overlay`}var B,V,H,U,W=t((()=>{B=e(n()),O(),N(),R(),S(),V=e(d()),H={backdrop:{invisible:!0},paper:{"aria-label":`Panel`}},U=B.forwardRef((e,t)=>{let{children:n,sdsType:r=`basic`,position:i=`left`,width:a,ModalProps:o,isBackdropClickEnabled:s=!1,slotProps:c,transitionDuration:l=x,...u}=e,d={...H,...c,backdrop:{...H.backdrop,...typeof c?.backdrop==`object`?c.backdrop:{}},paper:{...H.paper,...typeof c?.paper==`object`?c.paper:{}}},f=a??(r===`basic`?240:320),p=r===`basic`?`persistent`:`temporary`,m=r===`overlay`?i:i===`bottom`?`left`:i;return(0,V.jsxs)(E,{...u,ref:t,sdsType:r,anchor:m,variant:p,width:f,transitionDuration:l,ModalProps:{...o,disableEnforceFocus:!0,disableScrollLock:!0},slotProps:d,hideBackdrop:!s,children:[z(e)&&(0,V.jsxs)(D,{children:[e?.HeaderComponent&&(0,V.jsx)(M,{children:e?.HeaderComponent}),(0,V.jsx)(L,{onClick:e?.closeButtonOnClick,CloseButtonComponent:e?.CloseButtonComponent})]}),n]})})}));export{W as n,U as t};