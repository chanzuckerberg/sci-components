import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Ao as n,E as r,Eo as i,G as a,Hn as o,K as s,ai as c,an as l,co as u,dn as d,gn as f,in as p,ji as m,ko as h,ln as g,mn as _,on as v}from"./iframe-CLRePdsX.js";import{n as y,t as b}from"./Icon-Dm0VxswF.js";import{a as x,r as S,t as C}from"./utils-BxIa431Z.js";var w,T,E,D,O,k,A,j,M,N,P=e((()=>{n(),o(),l(),r(),y(),w={default:`base`,negative:`negative`,notice:`notice`,positive:`positive`},T=h(b,{target:`e79l7n57`})(e=>{let t=d(e);return`
      height: ${t?.xs.height}px;
      width: ${t?.xs.width}px;
    `},`;`),E=h(`span`,{target:`e79l7n56`})(e=>{let{intent:t=`default`}=e,n=d(e),r=v(e),i=w[t];return`
      height: ${n?.s.height}px;
      width: ${n?.s.width}px;
      border: ${r?.[i]?.default};
      border-radius: 2px;
    `},`;`),D=h(`div`,{target:`e79l7n55`})(e=>{let t=d(e),n=_(e);return`
      display: flex;
      align-items: center;
      justify-content: center;
      height: ${t?.s.height}px;
      width: ${t?.s.width}px;
      border-radius: 2px;
      background-color: ${n?.accent?.foreground};

      ${T} {
        fill: ${n?.base?.ornamentPrimaryInverse};
      }
    `},`;`),O=h(m,{target:`e79l7n54`})(e=>{let{label:t}=e,n=f(e),r=g(e),i=_(e);return`
      &.${u.root} {
        ${p(e)}
        
        padding: 0;
        margin-right: ${t?n?.s:0}px;
        border-radius: ${r?.s}px;
        background-color: ${i?.base?.backgroundPrimary} !important;

        &:hover {
          background-color: transparent;
        }
      }
    `},`;`),k=h(`span`,{target:`e79l7n53`})({name:`7cafks`,styles:`display:flex;justify-content:start;flex-direction:column`}),A=h(`span`,{target:`e79l7n52`})(a,` `,e=>`
      margin-top: -${f(e)?.xxxs}px !important;
    `,`;`),j=h(`span`,{target:`e79l7n51`})(s,` `,e=>`
      color: ${_(e)?.base?.textSecondary};
    `,`;`),M=e=>{let t=_(e),n=v(e);return`
    user-select: none;

    ${E} {
      border: ${n?.base?.disabled};
    }

    ${D} {
      background-color: ${t?.base?.ornamentDisabled};
    }

    ${j} {
      color: ${t?.base?.textDisabled};
    }

    &:hover, &:active {
      ${E} {
        border: ${n?.base?.disabled};
      }

      ${D} {
        background-color: ${t?.base?.ornamentDisabled};
      }
    }
  `},N=h(c,{target:`e79l7n50`})(e=>{let{disabled:t}=e,n=_(e),r=v(e);return`
      align-items: start;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      width: fit-content;

      &:hover {
        ${E} {
          border: ${r?.base?.hover};
          background-color: ${t?`transparent`:n?.base?.fillPrimaryInteraction};
        }

        ${D} {
          background-color: ${n?.accent?.fillInteraction};
        }
      }

      &:active {
        ${E} {
          border: ${r?.base?.pressed};
        }

        ${D} {
          background-color: ${n?.accent?.fillPressed};
        }
      }

      ${t&&M(e)}
    `},`;`)})),F,I,L=e((()=>{P(),x(),F=t(i()),I=e=>{let{caption:t,checkboxProps:n,disabled:r,intent:i=`default`,label:a,stage:o,value:s,classes:c=C,className:l,...u}=e,{root:d,labelCaptionContainer:f,label:p,caption:m,checkbox:h,checkboxCheckedIcon:g,checkboxDefaultIcon:_,checkboxIndeterminateIcon:v}=c,y;switch(o){case`checked`:y={...u,checked:!0,color:`primary`};break;case`unchecked`:y={...u,checked:!1,color:`default`};break;case`indeterminate`:y={...u,checked:!0,color:`primary`,indeterminate:!0};break;default:y=u}let b=t?(0,F.jsxs)(k,{className:S(f),children:[(0,F.jsx)(A,{className:S(p),children:a}),(0,F.jsx)(j,{className:S(m),children:t})]}):(0,F.jsx)(k,{className:S(f),children:(0,F.jsx)(A,{className:S(p),children:a})});return(0,F.jsx)(N,{control:(0,F.jsx)(O,{className:S(h),checkedIcon:(0,F.jsx)(D,{className:S(g),children:(0,F.jsx)(T,{sdsIcon:`Check`,sdsSize:`xs`})}),icon:(0,F.jsx)(E,{intent:i,className:S(_)}),indeterminateIcon:(0,F.jsx)(D,{className:S(v),children:(0,F.jsx)(T,{sdsIcon:`Minus`,sdsSize:`xs`})}),intent:i,label:a,...n,...y}),disabled:r,label:a?b:null,value:s,className:S(d,l)})}}));export{L as n,I as t};