import{i as e}from"./preload-helper-usAeo7Bx.js";import{$n as t,B as n,Dn as r,Gi as i,K as a,Mi as o,Ni as s,V as c,W as l,Y as u,Z as d,_ as f,ct as p,g as m,t as h,tr as g,z as _}from"./iframe-ZT52KRhI.js";import{n as v,t as y}from"./Icon-CXgj2pi8.js";import{a as b,r as x,t as S}from"./utils-CHt6irz9.js";var C,w,T,E,D,O,k,A,j,M,N=e((()=>{s(),p(),n(),h(),v(),C={default:`base`,negative:`negative`,notice:`notice`,positive:`positive`},w=o(y,{target:`e79l7n57`})(e=>{let t=a(e);return`
      height: ${t?.xs.height}px;
      width: ${t?.xs.width}px;
    `},`;`),T=o(`span`,{target:`e79l7n56`})(e=>{let{intent:t=`default`}=e,n=a(e),r=c(e),i=C[t];return`
      height: ${n?.s.height}px;
      width: ${n?.s.width}px;
      border: ${r?.[i]?.default};
      border-radius: 2px;
    `},`;`),E=o(`div`,{target:`e79l7n55`})(e=>{let t=a(e),n=u(e);return`
      display: flex;
      align-items: center;
      justify-content: center;
      height: ${t?.s.height}px;
      width: ${t?.s.width}px;
      border-radius: 2px;
      background-color: ${n?.accent?.foreground};

      ${w} {
        fill: ${n?.base?.ornamentPrimaryInverse};
      }
    `},`;`),D=o(t,{target:`e79l7n54`})(e=>{let{label:t}=e,n=d(e),r=l(e),i=u(e);return`
      &.${g.root} {
        ${_(e)}
        
        padding: 0;
        margin-right: ${t?n?.s:0}px;
        border-radius: ${r?.s}px;
        background-color: ${i?.base?.backgroundPrimary} !important;

        &:hover {
          background-color: transparent;
        }
      }
    `},`;`),O=o(`span`,{target:`e79l7n53`})({name:`7cafks`,styles:`display:flex;justify-content:start;flex-direction:column`}),k=o(`span`,{target:`e79l7n52`})(m,` `,e=>`
      margin-top: -${d(e)?.xxxs}px !important;
    `,`;`),A=o(`span`,{target:`e79l7n51`})(f,` `,e=>`
      color: ${u(e)?.base?.textSecondary};
    `,`;`),j=e=>{let t=u(e),n=c(e);return`
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
  `},M=o(r,{target:`e79l7n50`})(e=>{let{disabled:t}=e,n=u(e),r=c(e);return`
      align-items: start;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      width: fit-content;

      &:hover {
        ${T} {
          border: ${r?.base?.hover};
          background-color: ${t?`transparent`:n?.base?.fillPrimaryInteraction};
        }

        ${E} {
          background-color: ${n?.accent?.fillInteraction};
        }
      }

      &:active {
        ${T} {
          border: ${r?.base?.pressed};
        }

        ${E} {
          background-color: ${n?.accent?.fillPressed};
        }
      }

      ${t&&j(e)}
    `},`;`)})),P,F,I=e((()=>{N(),b(),P=i(),F=e=>{let{caption:t,checkboxProps:n,disabled:r,intent:i=`default`,label:a,stage:o,value:s,classes:c=S,className:l,...u}=e,{root:d,labelCaptionContainer:f,label:p,caption:m,checkbox:h,checkboxCheckedIcon:g,checkboxDefaultIcon:_,checkboxIndeterminateIcon:v}=c,y;switch(o){case`checked`:y={...u,checked:!0,color:`primary`};break;case`unchecked`:y={...u,checked:!1,color:`default`};break;case`indeterminate`:y={...u,checked:!0,color:`primary`,indeterminate:!0};break;default:y=u}let b=t?(0,P.jsxs)(O,{className:x(f),children:[(0,P.jsx)(k,{className:x(p),children:a}),(0,P.jsx)(A,{className:x(m),children:t})]}):(0,P.jsx)(O,{className:x(f),children:(0,P.jsx)(k,{className:x(p),children:a})});return(0,P.jsx)(M,{control:(0,P.jsx)(D,{className:x(h),checkedIcon:(0,P.jsx)(E,{className:x(g),children:(0,P.jsx)(w,{sdsIcon:`Check`,sdsSize:`xs`})}),icon:(0,P.jsx)(T,{intent:i,className:x(_)}),indeterminateIcon:(0,P.jsx)(E,{className:x(v),children:(0,P.jsx)(w,{sdsIcon:`Minus`,sdsSize:`xs`})}),intent:i,label:a,...n,...y}),disabled:r,label:a?b:null,value:s,className:x(d,l)})}}));export{I as n,F as t};