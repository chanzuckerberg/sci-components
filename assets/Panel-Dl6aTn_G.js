import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Br as i,Bt as a,Di as o,Gt as s,Rr as c,Ut as l,Wt as u,_n as d,co as f,io as p,oo as m,ro as h,t as g}from"./iframe-BPFLG940.js";import{n as _,t as v}from"./Icon-DpYImm5o.js";import{n as y,t as b}from"./Button-CvZmp_f8.js";var x,S=e((()=>{x={enter:225,exit:195}})),C,w,T,E,D,O=e((()=>{p(),d(),g(),f(),S(),C=[`sdsType`,`position`,`width`,`HeaderComponent`,`onClick`,`disableScrollLock`,`closeButtonOnClick`,`CloseButtonComponent`,`isBackdropClickEnabled`],w=e=>{let t=l(e),n=s(e);return m(`.`,i.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:`,n?.l,`px;min-width:`,240,`px;min-height:`,240,`px;}`,``)},T=e=>{let t=l(e),n=s(e),r=u(e);return m(`pointer-events:none;.`,i.paper,`,.`,o.root,`{pointer-events:auto;}.`,i.paper,`{background-color:`,t?.base?.backgroundPrimary,`;padding:0 `,n?.xl,`px `,n?.xl,`px;min-width:`,320,`px;min-height:`,320,`px;box-shadow:`,r?.l,`;background-image:none;}`,``)},E=h(c,{shouldForwardProp:e=>!C.includes(e),target:`ejokiai1`})(e=>{let{sdsType:t=`basic`,anchor:n=`left`,width:r}=e,a=typeof r==`number`?`${r}px`:r,o=n===`bottom`?`100%`:a,s=n===`bottom`?a:`100%`;return m(`.`,i.paper,`{height:`,s,`;width:`,o,`;}`,t===`basic`&&w(e),` `,t===`overlay`&&T(e),`;`,``)},`;`),D=h(`div`,{target:`ejokiai0`})(e=>{let t=s(e),n=l(e);return m(`position:sticky;top:0;z-index:1000;background-color:`,n?.base?.backgroundPrimary,`;padding-bottom:`,t?.m,`px;margin-bottom:`,t?.m,`px;padding-top:`,t?.xl,`px;display:flex;justify-content:space-between;align-items:center;&::after{content:"";position:absolute;bottom:0;left:0;right:0;height:`,t?.xl,`px;transform:translateY(100%);background:linear-gradient(
          to bottom,
          `,n?.base?.backgroundPrimary,`,
          transparent
        );pointer-events:none;}`,``)},`;`)})),k,A=e((()=>{p(),g(),k=h(`div`,{target:`e100cy8r0`})(e=>`
      width: 100%;
      height: 100%;
      margin-right: ${s(e)?.l}px;
    `,`;`)})),j,M,N=e((()=>{A(),j=t(r()),M=e=>{let{children:t}=e;return(0,j.jsx)(k,{children:t})}})),P,F=e((()=>{p(),g(),P=h(`div`,{target:`e1a4ppk10`})(e=>{let t=a(e);return`
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
  `},`;`)})),I,L,R=e((()=>{y(),F(),_(),I=t(r()),L=e=>{let{onClick:t,CloseButtonComponent:n}=e;return(0,I.jsx)(P,{onClick:t,children:n||(0,I.jsx)(b,{sdsStyle:`minimal`,sdsType:`secondary`,"aria-label":`Panel Toggle`,size:`large`,backgroundOnHover:!1,children:(0,I.jsx)(v,{sdsIcon:`XMark`,sdsSize:`l`})})})}}));function z(e){return e.sdsType===`overlay`}var B,V,H,U,W=e((()=>{B=t(n()),O(),N(),R(),S(),V=t(r()),H={backdrop:{invisible:!0},paper:{"aria-label":`Panel`}},U=B.forwardRef((e,t)=>{let{children:n,sdsType:r=`basic`,position:i=`left`,width:a,ModalProps:o,isBackdropClickEnabled:s=!1,slotProps:c,transitionDuration:l=x,...u}=e,d={...H,...c,backdrop:{...H.backdrop,...typeof c?.backdrop==`object`?c.backdrop:{}},paper:{...H.paper,...typeof c?.paper==`object`?c.paper:{}}},f=a??(r===`basic`?240:320),p=r===`basic`?`persistent`:`temporary`,m=r===`overlay`?i:i===`bottom`?`left`:i;return(0,V.jsxs)(E,{...u,ref:t,sdsType:r,anchor:m,variant:p,width:f,transitionDuration:l,ModalProps:{...o,disableEnforceFocus:!0,disableScrollLock:!0},slotProps:d,hideBackdrop:!s,children:[z(e)&&(0,V.jsxs)(D,{children:[e?.HeaderComponent&&(0,V.jsx)(M,{children:e?.HeaderComponent}),(0,V.jsx)(L,{onClick:e?.closeButtonOnClick,CloseButtonComponent:e?.CloseButtonComponent})]}),n]})})}));export{W as n,U as t};