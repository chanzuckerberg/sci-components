import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Kr as n,Xn as r,Y as i,Z as a,Zn as o,cr as s,t as c,u as l}from"./iframe-DI6qETgL.js";import{n as u,t as d}from"./Icon-BvRFwTEr.js";import{n as f,t as p}from"./Button-K7qsdWHe.js";var m,h,g,_,v,y,b,x,S,C=t((()=>{o(),f(),c(),m=r(`div`,{target:`e15g05664`})({name:`qke47e`,styles:`flex:1 1 auto;display:flex;justify-content:center;align-items:center`}),h=[`bannerType`,`intent`],g=r(`div`,{shouldForwardProp:e=>!h.includes(e),target:`e15g05663`})(e=>{let{bannerType:t,intent:n=`info`}=e,r=a(e),o=i(e),s=t===`primary`?o?.base?.ornamentOnFill:o?.[n]?.ornament;return`
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${r?.m}px;
      svg {
        fill: ${s};
      }
    `},`;`),_=[`bannerType`,`textChild`,`intent`],v=r(p,{shouldForwardProp:e=>!_.includes(e),target:`e15g05662`})(`flex:0 0 auto;`,e=>{let{bannerType:t}=e,n=i(e);return t===`primary`?`
        svg {
          fill: ${n?.base?.ornamentOnFill};
          opacity: .65;
        }

        svg:hover {
          opacity: 1;
        }
      `:`
      svg {
        fill: ${n?.base?.ornamentPrimary};
        opacity: .55;
      }

      svg:hover {
        opacity: 1;
      }
    `},`;`),y=e=>{let{intent:t=`info`}=e,n=i(e);return`
    background-color: ${n?.[t]?.surfacePrimary};
    color: ${n?.base?.textOnFill};
  `},b=e=>{let{intent:t=`info`}=e,n=i(e);return`
    background-color: ${n?.[t]?.surfaceSecondary};
    color: ${n?.base?.textPrimary};
  `},x=[`sdsType`,`textChild`,`intent`],S=r(`div`,{shouldForwardProp:e=>!x.includes(e),target:`e15g05660`})(l,` `,e=>{let{sdsType:t}=e,n=a(e);return`
      display: flex;
      align-items: center;
      padding: ${n?.xs}px ${n?.m}px;
  
      ${t===`primary`?y(e):``}
      ${t===`secondary`?b(e):``}
    `},`;`)})),w,T,E,D=t((()=>{w=e(n()),u(),C(),T=s(),E=(0,w.forwardRef)(function(e,t){let{children:n,dismissed:r,dismissible:i=!0,onClose:a,sdsType:o,icon:s,sdsIconProps:c,intent:l=`info`,...u}=e,[f,p]=(0,w.useState)(!1);if(r||f)return null;let h=e=>{r===void 0&&p(!0),a&&a(e)},_=()=>{if(s)return typeof s==`string`?(0,T.jsx)(d,{sdsIcon:s,sdsSize:`s`,...c}):s;switch(l){case`positive`:return(0,T.jsx)(d,{sdsIcon:`CheckCircle`,sdsSize:`s`,...c});case`negative`:case`notice`:return(0,T.jsx)(d,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`,...c});default:return(0,T.jsx)(d,{sdsIcon:`InfoCircle`,sdsSize:`s`,...c})}};return(0,T.jsxs)(S,{role:`banner`,sdsType:o,intent:l,ref:t,...u,children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(g,{bannerType:o,intent:l,children:_()}),n]}),i&&(0,T.jsx)(v,{"aria-label":`Close`,bannerType:o,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,onClick:h,children:(0,T.jsx)(d,{sdsIcon:`XMark`,sdsSize:`s`})})]})})}));export{D as n,E as t};