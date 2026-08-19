import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,E as i,Eo as a,G as o,Hn as s,dn as c,gn as l,hn as u,in as d,ko as f,ln as p,mn as m,on as h,vr as g,xr as _}from"./iframe-CLRePdsX.js";var v,y,b,x,S=e((()=>{r(),s(),i(),v=e=>{let{disabled:t,width:n=62}=e,r=p(e),i=u(e),a=c(e),o=m(e);return`
    cursor: ${t?`default`:`pointer`};
    border-radius: ${r?.rounded}px;
    height: 24px;
    width: ${n}px;
    line-height: 18px;
    padding: 0;
    overflow: visible;
    background-color: ${o?.base?.backgroundPrimary} !important;

    .${_.switchBase} {
      ${d(e)}
      outline-offset: 2px !important;
      width: 100%;
      height: 100%;
      border-radius: ${r?.rounded}px;
      font: inherit;
      transform: unset;
      justify-content: space-between;

      .${_.input} {
        width: 100%;
        height: 100%;
        left: 0;
      }

      &.${_.checked} {
        transform: unset;
      }
    }

    .${_.thumb} {
      height: ${a?.s?.height}px;
      width: ${a?.s?.width}px;
      min-width: ${a?.s?.width}px;
      box-shadow: ${i?.none};
    }

    .${_.track} {
      opacity: 1;
      border-radius: ${r?.rounded}px;
    }
  `},y=e=>{let{disabled:t,value:n}=e,r=h(e),i=l(e),a=m(e);return`
    & {
      outline: ${t?r?.base?.disabled:r?.accent?.default};
    }

    .${_.thumb} {
      color: ${t?a?.base?.ornamentDisabled:a?.accent?.foreground};
      margin-left: ${i?.m}px;
    }

    .${_.switchBase} {
      left: unset;
      right: 0;
      transform: unset;
      padding: 0 ${i?.xxs}px 0 ${i?.xs}px;

      .MuiIconButton-label {
        margin-left: ${i?.s}px;
      }

      &:before {
        color: ${t?a?.base?.textDisabled:a?.base?.textPrimary};
        content: ${JSON.stringify(n)};
      }

      &:hover {
        background-color: ${a?.accent?.surfaceSecondary};
      }
    }

    .${_.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${r?.accent?.hover};

        .${_.thumb} {
          color: ${a?.accent?.foregroundInteraction};
        }
      }`}
  `},b=e=>{let{disabled:t,value:n}=e,r=h(e),i=l(e),a=m(e);return`
    & {
      outline: ${t?r?.base?.disabled:r?.base?.default};
    }

    .${_.thumb} {
      color: ${t?a?.base?.ornamentDisabled:a?.base?.ornamentSecondary};
      margin-right: ${i?.m}px;
    }

    .${_.switchBase} {
      right: unset;
      left: 0;
      transform: unset;
      padding: 0 ${i?.xs}px 0 ${i?.xxs}px;

      .MuiIconButton-label {
        margin-right: ${i?.s}px;
      }

      &:after {
        color: ${t?a?.base?.textDisabled:a?.base?.textSecondary};
        content: ${JSON.stringify(n)};
      }

      &:hover {
        background-color: ${a?.base?.fillPrimaryInteraction};
      }
    }

    &:hover {
      .${_.switchBase} {
        &:after {
          color: ${t?a?.base?.textDisabled:a?.base?.textPrimary};
        }
      }
    }

    .${_.track} {
      background-color: transparent !important;
      opacity: 1 !important;
    }

    ${!t&&`&:hover {
        outline: ${r?.base?.hover};

        .${_.thumb} {
          color: ${a?.base?.ornamentSecondaryInteraction};
        }
      }`}
  `},x=f(g,{target:`efvmhqy0`})(o,` `,e=>{let{checked:t}=e;return`
      ${v(e)}
      ${t?y(e):b(e)}
    `},`;`)})),C,w,T,E=e((()=>{C=t(n()),S(),w=t(a()),T=e=>{let t=e.checked!==void 0,[n,r]=(0,C.useState)(!1),i=t?e.checked:n,{offLabel:a=`Off`,onChange:o,onLabel:s=`On`,...c}=e,l=i?s:a;return(0,w.jsx)(x,{checked:i,color:`primary`,onChange:e=>{r(e=>!e),o?.(e)},value:l,...c})}}));export{E as n,T as t};