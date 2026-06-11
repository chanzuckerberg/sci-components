import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Ct as n,K as r,Kr as i,St as a,V as o,W as s,X as c,Xn as l,Y as u,Z as d,Zn as f,cr as p,g as m,st as h,t as g,z as _}from"./iframe-DI6qETgL.js";var v,y,b,x,S=t((()=>{f(),h(),g(),v=e=>{let{disabled:t,width:i=62}=e,a=s(e),o=c(e),l=r(e),d=u(e);return`
    cursor: ${t?`default`:`pointer`};
    border-radius: ${a?.rounded}px;
    height: 24px;
    width: ${i}px;
    line-height: 18px;
    padding: 0;
    overflow: visible;
    background-color: ${d?.base?.backgroundPrimary} !important;

    .${n.switchBase} {
      ${_(e)}
      outline-offset: 2px !important;
      width: 100%;
      height: 100%;
      border-radius: ${a?.rounded}px;
      font: inherit;
      transform: unset;
      justify-content: space-between;

      .${n.input} {
        width: 100%;
        height: 100%;
        left: 0;
      }

      &.${n.checked} {
        transform: unset;
      }
    }

    .${n.thumb} {
      height: ${l?.s?.height}px;
      width: ${l?.s?.width}px;
      min-width: ${l?.s?.width}px;
      box-shadow: ${o?.none};
    }

    .${n.track} {
      opacity: 1;
      border-radius: ${a?.rounded}px;
    }
  `},y=e=>{let{disabled:t,value:r}=e,i=o(e),a=d(e),s=u(e);return`
    & {
      outline: ${t?i?.base?.disabled:i?.accent?.default};
    }

    .${n.thumb} {
      color: ${t?s?.base?.ornamentDisabled:s?.accent?.foreground};
      margin-left: ${a?.m}px;
    }

    .${n.switchBase} {
      left: unset;
      right: 0;
      transform: unset;
      padding: 0 ${a?.xxs}px 0 ${a?.xs}px;

      .MuiIconButton-label {
        margin-left: ${a?.s}px;
      }

      &:before {
        color: ${t?s?.base?.textDisabled:s?.base?.textPrimary};
        content: ${JSON.stringify(r)};
      }

      &:hover {
        background-color: ${s?.accent?.surfaceSecondary};
      }
    }

    .${n.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${i?.accent?.hover};

        .${n.thumb} {
          color: ${s?.accent?.foregroundInteraction};
        }
      }`}
  `},b=e=>{let{disabled:t,value:r}=e,i=o(e),a=d(e),s=u(e);return`
    & {
      outline: ${t?i?.base?.disabled:i?.base?.default};
    }

    .${n.thumb} {
      color: ${t?s?.base?.ornamentDisabled:s?.base?.ornamentSecondary};
      margin-right: ${a?.m}px;
    }

    .${n.switchBase} {
      right: unset;
      left: 0;
      transform: unset;
      padding: 0 ${a?.xs}px 0 ${a?.xxs}px;

      .MuiIconButton-label {
        margin-right: ${a?.s}px;
      }

      &:after {
        color: ${t?s?.base?.textDisabled:s?.base?.textSecondary};
        content: ${JSON.stringify(r)};
      }

      &:hover {
        background-color: ${s?.base?.fillPrimaryInteraction};
      }
    }

    &:hover {
      .${n.switchBase} {
        &:after {
          color: ${t?s?.base?.textDisabled:s?.base?.textPrimary};
        }
      }
    }

    .${n.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${i?.base?.hover};

        .${n.thumb} {
          color: ${s?.base?.ornamentSecondaryInteraction};
        }
      }`}
  `},x=l(a,{target:`efvmhqy0`})(m,` `,e=>{let{checked:t}=e;return`
      ${v(e)}
      ${t?y(e):b(e)}
    `},`;`)})),C,w,T,E=t((()=>{C=e(i()),S(),w=p(),T=e=>{let t=e.checked!==void 0,[n,r]=(0,C.useState)(!1),i=t?e.checked:n,{offLabel:a=`Off`,onChange:o,onLabel:s=`On`,...c}=e,l=i?s:a;return(0,w.jsx)(x,{checked:i,color:`primary`,onChange:e=>{r(e=>!e),o?.(e)},value:l,...c})}}));export{E as n,T as t};