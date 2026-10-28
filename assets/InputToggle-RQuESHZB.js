import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,P as i,Vr as a,j as o,t as s}from"./material-DlyzFPof.js";import{t as c}from"./jsx-runtime-cM__dR4X.js";import{Bt as l,Ft as u,Gt as d,Nt as f,Rt as p,Ut as m,Wt as h,b as g,t as _}from"./iframe-TnbieWZB.js";var v,y,b,x,S=t((()=>{r(),s(),_(),v=e=>{let{disabled:t,width:n=62}=e,r=p(e),a=h(e),o=l(e),s=m(e);return`
    cursor: ${t?`default`:`pointer`};
    border-radius: ${r?.rounded}px;
    height: 24px;
    width: ${n}px;
    line-height: 18px;
    padding: 0;
    overflow: visible;
    background-color: ${s?.base?.backgroundPrimary} !important;

    .${i.switchBase} {
      ${f(e)}
      outline-offset: 2px !important;
      width: 100%;
      height: 100%;
      border-radius: ${r?.rounded}px;
      font: inherit;
      transform: unset;
      justify-content: space-between;

      .${i.input} {
        width: 100%;
        height: 100%;
        left: 0;
      }

      &.${i.checked} {
        transform: unset;
      }
    }

    .${i.thumb} {
      height: ${o?.s?.height}px;
      width: ${o?.s?.width}px;
      min-width: ${o?.s?.width}px;
      box-shadow: ${a?.none};
    }

    .${i.track} {
      opacity: 1;
      border-radius: ${r?.rounded}px;
    }
  `},y=e=>{let{disabled:t,value:n}=e,r=u(e),a=d(e),o=m(e);return`
    & {
      outline: ${t?r?.base?.disabled:r?.accent?.default};
    }

    .${i.thumb} {
      color: ${t?o?.base?.ornamentDisabled:o?.accent?.foreground};
      margin-left: ${a?.m}px;
    }

    .${i.switchBase} {
      left: unset;
      right: 0;
      transform: unset;
      padding: 0 ${a?.xxs}px 0 ${a?.xs}px;

      .MuiIconButton-label {
        margin-left: ${a?.s}px;
      }

      &:before {
        color: ${t?o?.base?.textDisabled:o?.base?.textPrimary};
        content: ${JSON.stringify(n)};
      }

      &:hover {
        background-color: ${o?.accent?.surfaceSecondary};
      }
    }

    .${i.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${r?.accent?.hover};

        .${i.thumb} {
          color: ${o?.accent?.foregroundInteraction};
        }
      }`}
  `},b=e=>{let{disabled:t,value:n}=e,r=u(e),a=d(e),o=m(e);return`
    & {
      outline: ${t?r?.base?.disabled:r?.base?.default};
    }

    .${i.thumb} {
      color: ${t?o?.base?.ornamentDisabled:o?.base?.ornamentSecondary};
      margin-right: ${a?.m}px;
    }

    .${i.switchBase} {
      right: unset;
      left: 0;
      transform: unset;
      padding: 0 ${a?.xs}px 0 ${a?.xxs}px;

      .MuiIconButton-label {
        margin-right: ${a?.s}px;
      }

      &:after {
        color: ${t?o?.base?.textDisabled:o?.base?.textSecondary};
        content: ${JSON.stringify(n)};
      }

      &:hover {
        background-color: ${o?.base?.fillPrimaryInteraction};
      }
    }

    &:hover {
      .${i.switchBase} {
        &:after {
          color: ${t?o?.base?.textDisabled:o?.base?.textPrimary};
        }
      }
    }

    .${i.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${r?.base?.hover};

        .${i.thumb} {
          color: ${o?.base?.ornamentSecondaryInteraction};
        }
      }`}
  `},x=a(o,{target:`efvmhqy0`})(g,` `,e=>{let{checked:t}=e;return`
      ${v(e)}
      ${t?y(e):b(e)}
    `},`;`)})),C,w,T,E=t((()=>{C=e(n()),S(),w=e(c()),T=e=>{let t=e.checked!==void 0,[n,r]=(0,C.useState)(!1),i=t?e.checked:n,{offLabel:a=`Off`,onChange:o,onLabel:s=`On`,...c}=e,l=i?s:a;return(0,w.jsx)(x,{checked:i,color:`primary`,onChange:e=>{r(e=>!e),o?.(e)},value:l,...c})}}));export{E as n,T as t};