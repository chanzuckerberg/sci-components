import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{An as n,Fi as r,Ii as i,K as a,Li as o,On as s,Qa as c,Ri as l,X as u,Y as d,Z as f,ct as p,t as m,zi as h}from"./iframe-DocVhSSI.js";import{n as g,t as _}from"./Icon-CQ-y6cAL.js";import{n as v,t as y}from"./Button-CfkvkcRt.js";var b=e((()=>{})),x,S,C,w,T,E=e((()=>{o(),p(),m(),h(),b(),x=[`sdsType`,`position`,`width`,`HeaderComponent`,`onClick`,`disableScrollLock`,`closeButtonOnClick`,`CloseButtonComponent`,`isBackdropClickEnabled`],S=e=>{let t=d(e),r=f(e);return l(`.`,n.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:`,r?.l,`px;min-width:`,240,`px;min-height:`,240,`px;}`,``)},C=e=>{let t=d(e),r=f(e),i=u(e);return l(`width:fit-content;height:fit-content;div[data-testid="sentinelStart"],div[data-testid="sentinelEnd"]{width:fit-content;}.`,n.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:0 `,r?.xl,`px `,r?.xl,`px;min-width:`,320,`px;min-height:`,320,`px;box-shadow:`,i?.l,`;background-image:none;}`,``)},w=i(s,{shouldForwardProp:e=>!x.includes(e),target:`ejokiai1`})(e=>{let{sdsType:t=`basic`,anchor:r=`left`,width:i}=e,a=typeof i==`number`?`${i}px`:i,o=r===`bottom`?`100%`:a,s=r===`bottom`?a:`100%`;return l(`.`,n.paper,`{height:`,s,`;width:`,o,`;}`,t===`basic`&&S(e),` `,t===`overlay`&&C(e),`;`,``)},`;`),T=i(`div`,{target:`ejokiai0`})(e=>{let t=f(e),n=d(e);return l(`position:sticky;top:0;z-index:1000;background-color:`,n?.base?.backgroundPrimary,`;padding-bottom:`,t?.m,`px;margin-bottom:`,t?.m,`px;padding-top:`,t?.xl,`px;display:flex;justify-content:space-between;align-items:center;&::after{content:"";position:absolute;bottom:0;left:0;right:0;height:`,t?.xl,`px;transform:translateY(100%);background:linear-gradient(
          to bottom,
          `,n?.base?.backgroundPrimary,`,
          transparent
        );pointer-events:none;}`,``)},`;`)})),D,O=e((()=>{o(),m(),D=i(`div`,{target:`e100cy8r0`})(e=>`
      width: 100%;
      height: 100%;
      margin-right: ${f(e)?.l}px;
    `,`;`)})),k,A,j=e((()=>{O(),k=r(),A=e=>{let{children:t}=e;return(0,k.jsx)(D,{children:t})}})),M,N=e((()=>{o(),m(),M=i(`div`,{target:`e1a4ppk10`})(e=>{let t=a(e);return`
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
  `},`;`)})),P,F,I=e((()=>{v(),N(),g(),P=r(),F=e=>{let{onClick:t,CloseButtonComponent:n}=e;return(0,P.jsx)(M,{onClick:t,children:n||(0,P.jsx)(y,{sdsStyle:`minimal`,sdsType:`secondary`,"aria-label":`Panel Toggle`,size:`large`,backgroundOnHover:!1,children:(0,P.jsx)(_,{sdsIcon:`XMark`,sdsSize:`l`})})})}}));function L(e){return e.sdsType===`overlay`}var R,z,B,V,H=e((()=>{R=t(c()),E(),j(),I(),b(),z=r(),B={backdrop:{invisible:!0},paper:{"aria-label":`Panel`}},V=R.forwardRef((e,t)=>{let{children:n,sdsType:r=`basic`,position:i=`left`,width:a,ModalProps:o,isBackdropClickEnabled:s=!1,slotProps:c,...l}=e,u={...B,...c,backdrop:{...B.backdrop,...typeof c?.backdrop==`object`?c.backdrop:{}},paper:{...B.paper,...typeof c?.paper==`object`?c.paper:{}}},d=a??(r===`basic`?240:320),f=r===`basic`?`persistent`:`temporary`,p=r===`overlay`?i:i===`bottom`?`left`:i;return(0,z.jsxs)(w,{...l,ref:t,sdsType:r,anchor:p,variant:f,width:d,ModalProps:{...o,disableEnforceFocus:!0,disableScrollLock:!0},slotProps:u,hideBackdrop:!s,children:[L(e)&&(0,z.jsxs)(T,{children:[e?.HeaderComponent&&(0,z.jsx)(A,{children:e?.HeaderComponent}),(0,z.jsx)(F,{onClick:e?.closeButtonOnClick,CloseButtonComponent:e?.CloseButtonComponent})]}),n]})})}));export{H as n,V as t};