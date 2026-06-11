import{i as e}from"./preload-helper-DbRxMUml.js";import{B as t,K as n,V as r,W as i,Wt as a,Xn as o,Y as s,Z as c,Zn as l,_ as u,cr as d,g as f,in as p,rn as m,st as h,t as g,z as _}from"./iframe-DI6qETgL.js";import{n as v,t as y}from"./Icon-BvRFwTEr.js";import{a as b,r as x,t as S}from"./utils-B1uyFjm5.js";var C,w,T,E,D,O,k,A,j,M,N=e((()=>{l(),h(),t(),g(),v(),C={default:`base`,negative:`negative`,notice:`notice`,positive:`positive`},w=o(y,{target:`e79l7n57`})(e=>{let t=n(e);return`
      height: ${t?.xs.height}px;
      width: ${t?.xs.width}px;
    `},`;`),T=o(`span`,{target:`e79l7n56`})(e=>{let{intent:t=`default`}=e,i=n(e),a=r(e),o=C[t];return`
      height: ${i?.s.height}px;
      width: ${i?.s.width}px;
      border: ${a?.[o]?.default};
      border-radius: 2px;
    `},`;`),E=o(`div`,{target:`e79l7n55`})(e=>{let t=n(e),r=s(e);return`
      display: flex;
      align-items: center;
      justify-content: center;
      height: ${t?.s.height}px;
      width: ${t?.s.width}px;
      border-radius: 2px;
      background-color: ${r?.accent?.foreground};

      ${w} {
        fill: ${r?.base?.ornamentPrimaryInverse};
      }
    `},`;`),D=o(m,{target:`e79l7n54`})(e=>{let{label:t}=e,n=c(e),r=i(e),a=s(e);return`
      &.${p.root} {
        ${_(e)}
        
        padding: 0;
        margin-right: ${t?n?.s:0}px;
        border-radius: ${r?.s}px;
        background-color: ${a?.base?.backgroundPrimary} !important;

        &:hover {
          background-color: transparent;
        }
      }
    `},`;`),O=o(`span`,{target:`e79l7n53`})({name:`7cafks`,styles:`display:flex;justify-content:start;flex-direction:column`}),k=o(`span`,{target:`e79l7n52`})(f,` `,e=>`
      margin-top: -${c(e)?.xxxs}px !important;
    `,`;`),A=o(`span`,{target:`e79l7n51`})(u,` `,e=>`
      color: ${s(e)?.base?.textSecondary};
    `,`;`),j=e=>{let t=s(e),n=r(e);return`
    user-select: none;

    ${T} {
      border: ${n?.base?.disabled};
    }

    ${E} {
      background-color: ${t?.base?.ornamentDisabled};
    }

    ${A} {
      color: ${t?.base?.textDisabled};
    }

    &:hover, &:active {
      ${T} {
        border: ${n?.base?.disabled};
      }

      ${E} {
        background-color: ${t?.base?.ornamentDisabled};
      }
    }
  `},M=o(a,{target:`e79l7n50`})(e=>{let{disabled:t}=e,n=s(e),i=r(e);return`
      align-items: start;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      width: fit-content;

      &:hover {
        ${T} {
          border: ${i?.base?.hover};
          background-color: ${t?`transparent`:n?.base?.fillPrimaryInteraction};
        }

        ${E} {
          background-color: ${n?.accent?.fillInteraction};
        }
      }

      &:active {
        ${T} {
          border: ${i?.base?.pressed};
        }

        ${E} {
          background-color: ${n?.accent?.fillPressed};
        }
      }

      ${t&&j(e)}
    `},`;`)})),P,F,I=e((()=>{N(),b(),P=d(),F=e=>{let{caption:t,checkboxProps:n,disabled:r,intent:i=`default`,label:a,stage:o,value:s,classes:c=S,className:l,...u}=e,{root:d,labelCaptionContainer:f,label:p,caption:m,checkbox:h,checkboxCheckedIcon:g,checkboxDefaultIcon:_,checkboxIndeterminateIcon:v}=c,y;switch(o){case`checked`:y={...u,checked:!0,color:`primary`};break;case`unchecked`:y={...u,checked:!1,color:`default`};break;case`indeterminate`:y={...u,checked:!0,color:`primary`,indeterminate:!0};break;default:y=u}let b=t?(0,P.jsxs)(O,{className:x(f),children:[(0,P.jsx)(k,{className:x(p),children:a}),(0,P.jsx)(A,{className:x(m),children:t})]}):(0,P.jsx)(O,{className:x(f),children:(0,P.jsx)(k,{className:x(p),children:a})});return(0,P.jsx)(M,{control:(0,P.jsx)(D,{className:x(h),checkedIcon:(0,P.jsx)(E,{className:x(g),children:(0,P.jsx)(w,{sdsIcon:`Check`,sdsSize:`xs`})}),icon:(0,P.jsx)(T,{intent:i,className:x(_)}),indeterminateIcon:(0,P.jsx)(E,{className:x(v),children:(0,P.jsx)(w,{sdsIcon:`Minus`,sdsSize:`xs`})}),intent:i,label:a,...n,...y}),disabled:r,label:a?b:null,value:s,className:x(d,l)})}}));export{I as n,F as t};