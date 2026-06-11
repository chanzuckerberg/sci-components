import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{$n as n,K as r,Kr as i,Kt as a,Qn as o,X as s,Xn as c,Y as l,Z as u,Zn as d,cr as f,qt as p,st as m,t as h}from"./iframe-DI6qETgL.js";import{n as g,t as _}from"./Icon-BvRFwTEr.js";import{n as v,t as y}from"./Button-K7qsdWHe.js";var b=t((()=>{})),x,S,C,w,T,E=t((()=>{d(),m(),h(),n(),b(),x=[`sdsType`,`position`,`width`,`HeaderComponent`,`onClick`,`disableScrollLock`,`closeButtonOnClick`,`CloseButtonComponent`,`isBackdropClickEnabled`,`slotProps`],S=e=>{let t=l(e),n=u(e);return o(`.`,p.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:`,n?.l,`px;min-width:`,240,`px;min-height:`,240,`px;}`,``)},C=e=>{let t=l(e),n=u(e),r=s(e);return o(`width:fit-content;height:fit-content;div[data-testid="sentinelStart"],div[data-testid="sentinelEnd"]{width:fit-content;}.`,p.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:0 `,n?.xl,`px `,n?.xl,`px;min-width:`,320,`px;min-height:`,320,`px;box-shadow:`,r?.l,`;background-image:none;}`,``)},w=c(a,{shouldForwardProp:e=>!x.includes(e),target:`ejokiai1`})(e=>{let{sdsType:t=`basic`,anchor:n=`left`,width:r}=e,i=typeof r==`number`?`${r}px`:r,a=n===`bottom`?`100%`:i,s=n===`bottom`?i:`100%`;return o(`.`,p.paper,`{height:`,s,`;width:`,a,`;}`,t===`basic`&&S(e),` `,t===`overlay`&&C(e),`;`,``)},`;`),T=c(`div`,{target:`ejokiai0`})(e=>{let t=u(e),n=l(e);return o(`position:sticky;top:0;z-index:1000;background-color:`,n?.base?.backgroundPrimary,`;padding-bottom:`,t?.m,`px;margin-bottom:`,t?.m,`px;padding-top:`,t?.xl,`px;display:flex;justify-content:space-between;align-items:center;&::after{content:"";position:absolute;bottom:0;left:0;right:0;height:`,t?.xl,`px;transform:translateY(100%);background:linear-gradient(
          to bottom,
          `,n?.base?.backgroundPrimary,`,
          transparent
        );pointer-events:none;}`,``)},`;`)})),D,O=t((()=>{d(),h(),D=c(`div`,{target:`e100cy8r0`})(e=>`
      width: 100%;
      height: 100%;
      margin-right: ${u(e)?.l}px;
    `,`;`)})),k,A,j=t((()=>{O(),k=f(),A=e=>{let{children:t}=e;return(0,k.jsx)(D,{children:t})}})),M,N=t((()=>{d(),h(),M=c(`div`,{target:`e1a4ppk10`})(e=>{let t=r(e);return`
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
  `},`;`)})),P,F,I=t((()=>{v(),N(),g(),P=f(),F=e=>{let{onClick:t,CloseButtonComponent:n}=e;return(0,P.jsx)(M,{onClick:t,children:n||(0,P.jsx)(y,{sdsStyle:`minimal`,sdsType:`secondary`,"aria-label":`Panel Toggle`,size:`large`,backgroundOnHover:!1,children:(0,P.jsx)(_,{sdsIcon:`XMark`,sdsSize:`l`})})})}}));function L(e){return e.sdsType===`overlay`}var R,z,B,V,H=t((()=>{R=e(i()),E(),j(),I(),b(),z=f(),B={backdrop:{invisible:!0}},V=R.forwardRef((e,t)=>{let{children:n,sdsType:r=`basic`,position:i=`left`,width:a,ModalProps:o,isBackdropClickEnabled:s=!1}=e,c=a??(r===`basic`?240:320),l=r===`basic`?`persistent`:`temporary`,u=r===`overlay`?i:i===`bottom`?`left`:i;return(0,z.jsxs)(w,{...e,ref:t,anchor:u,variant:l,width:c,ModalProps:{...o,disableEnforceFocus:!0,disableScrollLock:!0},slotProps:B,hideBackdrop:!s,children:[L(e)&&(0,z.jsxs)(T,{children:[e?.HeaderComponent&&(0,z.jsx)(A,{children:e?.HeaderComponent}),(0,z.jsx)(F,{onClick:e?.closeButtonOnClick,CloseButtonComponent:e?.CloseButtonComponent})]}),n]})})}));export{H as n,V as t};