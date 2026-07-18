import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Bt as r,Gi as i,K as a,Lt as o,Mi as s,Ni as c,V as l,W as u,X as d,Y as f,Z as p,ct as m,g as h,t as g,z as _}from"./iframe-ZT52KRhI.js";var v,y,b,x,S=t((()=>{c(),m(),g(),v=e=>{let{disabled:t,width:n=62}=e,i=u(e),o=d(e),s=a(e),c=f(e);return`
    cursor: ${t?`default`:`pointer`};
    border-radius: ${i?.rounded}px;
    height: 24px;
    width: ${n}px;
    line-height: 18px;
    padding: 0;
    overflow: visible;
    background-color: ${c?.base?.backgroundPrimary} !important;

    .${r.switchBase} {
      ${_(e)}
      outline-offset: 2px !important;
      width: 100%;
      height: 100%;
      border-radius: ${i?.rounded}px;
      font: inherit;
      transform: unset;
      justify-content: space-between;

      .${r.input} {
        width: 100%;
        height: 100%;
        left: 0;
      }

      &.${r.checked} {
        transform: unset;
      }
    }

    .${r.thumb} {
      height: ${s?.s?.height}px;
      width: ${s?.s?.width}px;
      min-width: ${s?.s?.width}px;
      box-shadow: ${o?.none};
    }

    .${r.track} {
      opacity: 1;
      border-radius: ${i?.rounded}px;
    }
  `},y=e=>{let{disabled:t,value:n}=e,i=l(e),a=p(e),o=f(e);return`
    & {
      outline: ${t?i?.base?.disabled:i?.accent?.default};
    }

    .${r.thumb} {
      color: ${t?o?.base?.ornamentDisabled:o?.accent?.foreground};
      margin-left: ${a?.m}px;
    }

    .${r.switchBase} {
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

    .${r.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${i?.accent?.hover};

        .${r.thumb} {
          color: ${o?.accent?.foregroundInteraction};
        }
      }`}
  `},b=e=>{let{disabled:t,value:n}=e,i=l(e),a=p(e),o=f(e);return`
    & {
      outline: ${t?i?.base?.disabled:i?.base?.default};
    }

    .${r.thumb} {
      color: ${t?o?.base?.ornamentDisabled:o?.base?.ornamentSecondary};
      margin-right: ${a?.m}px;
    }

    .${r.switchBase} {
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
      .${r.switchBase} {
        &:after {
          color: ${t?o?.base?.textDisabled:o?.base?.textPrimary};
        }
      }
    }

    .${r.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${i?.base?.hover};

        .${r.thumb} {
          color: ${o?.base?.ornamentSecondaryInteraction};
        }
      }`}
  `},x=s(o,{target:`efvmhqy0`})(h,` `,e=>{let{checked:t}=e;return`
      ${v(e)}
      ${t?y(e):b(e)}
    `},`;`)})),C,w,T,E=t((()=>{C=e(n()),S(),w=i(),T=e=>{let t=e.checked!==void 0,[n,r]=(0,C.useState)(!1),i=t?e.checked:n,{offLabel:a=`Off`,onChange:o,onLabel:s=`On`,...c}=e,l=i?s:a;return(0,w.jsx)(x,{checked:i,color:`primary`,onChange:e=>{r(e=>!e),o?.(e)},value:l,...c})}}));export{E as n,T as t};