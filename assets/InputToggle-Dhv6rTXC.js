import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Bt as i,Ft as a,Gt as o,Nt as s,Rt as c,Ut as l,Wt as u,Xn as d,_n as f,b as p,io as m,qn as h,ro as g,t as _}from"./iframe-BPFLG940.js";var v,y,b,x,S=e((()=>{m(),f(),_(),v=e=>{let{disabled:t,width:n=62}=e,r=c(e),a=u(e),o=i(e),f=l(e);return`
    cursor: ${t?`default`:`pointer`};
    border-radius: ${r?.rounded}px;
    height: 24px;
    width: ${n}px;
    line-height: 18px;
    padding: 0;
    overflow: visible;
    background-color: ${f?.base?.backgroundPrimary} !important;

    .${d.switchBase} {
      ${s(e)}
      outline-offset: 2px !important;
      width: 100%;
      height: 100%;
      border-radius: ${r?.rounded}px;
      font: inherit;
      transform: unset;
      justify-content: space-between;

      .${d.input} {
        width: 100%;
        height: 100%;
        left: 0;
      }

      &.${d.checked} {
        transform: unset;
      }
    }

    .${d.thumb} {
      height: ${o?.s?.height}px;
      width: ${o?.s?.width}px;
      min-width: ${o?.s?.width}px;
      box-shadow: ${a?.none};
    }

    .${d.track} {
      opacity: 1;
      border-radius: ${r?.rounded}px;
    }
  `},y=e=>{let{disabled:t,value:n}=e,r=a(e),i=o(e),s=l(e);return`
    & {
      outline: ${t?r?.base?.disabled:r?.accent?.default};
    }

    .${d.thumb} {
      color: ${t?s?.base?.ornamentDisabled:s?.accent?.foreground};
      margin-left: ${i?.m}px;
    }

    .${d.switchBase} {
      left: unset;
      right: 0;
      transform: unset;
      padding: 0 ${i?.xxs}px 0 ${i?.xs}px;

      .MuiIconButton-label {
        margin-left: ${i?.s}px;
      }

      &:before {
        color: ${t?s?.base?.textDisabled:s?.base?.textPrimary};
        content: ${JSON.stringify(n)};
      }

      &:hover {
        background-color: ${s?.accent?.surfaceSecondary};
      }
    }

    .${d.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${r?.accent?.hover};

        .${d.thumb} {
          color: ${s?.accent?.foregroundInteraction};
        }
      }`}
  `},b=e=>{let{disabled:t,value:n}=e,r=a(e),i=o(e),s=l(e);return`
    & {
      outline: ${t?r?.base?.disabled:r?.base?.default};
    }

    .${d.thumb} {
      color: ${t?s?.base?.ornamentDisabled:s?.base?.ornamentSecondary};
      margin-right: ${i?.m}px;
    }

    .${d.switchBase} {
      right: unset;
      left: 0;
      transform: unset;
      padding: 0 ${i?.xs}px 0 ${i?.xxs}px;

      .MuiIconButton-label {
        margin-right: ${i?.s}px;
      }

      &:after {
        color: ${t?s?.base?.textDisabled:s?.base?.textSecondary};
        content: ${JSON.stringify(n)};
      }

      &:hover {
        background-color: ${s?.base?.fillPrimaryInteraction};
      }
    }

    &:hover {
      .${d.switchBase} {
        &:after {
          color: ${t?s?.base?.textDisabled:s?.base?.textPrimary};
        }
      }
    }

    .${d.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${r?.base?.hover};

        .${d.thumb} {
          color: ${s?.base?.ornamentSecondaryInteraction};
        }
      }`}
  `},x=g(h,{target:`efvmhqy0`})(p,` `,e=>{let{checked:t}=e;return`
      ${v(e)}
      ${t?y(e):b(e)}
    `},`;`)})),C,w,T,E=e((()=>{C=t(n()),S(),w=t(r()),T=e=>{let t=e.checked!==void 0,[n,r]=(0,C.useState)(!1),i=t?e.checked:n,{offLabel:a=`Off`,onChange:o,onLabel:s=`On`,...c}=e,l=i?s:a;return(0,w.jsx)(x,{checked:i,color:`primary`,onChange:e=>{r(e=>!e),o?.(e)},value:l,...c})}}));export{E as n,T as t};