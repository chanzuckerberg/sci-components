import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r,K as i,Mi as a,Ni as o,R as s,W as c,Y as l,Z as u,ct as d,g as f,in as p,t as m,tn as h}from"./iframe-Bjh1LYUt.js";import{n as g,t as _}from"./Icon-D5aq3JJF.js";var v,y,b,x,S,C,w,T,E,D=t((()=>{o(),d(),s(),m(),g(),v=a(h,{target:`eanvvd48`})(e=>{let{selected:t}=e,n=u(e),r=c(e),i=l(e);return`
      padding: ${n?.xxs}px ${n?.xs}px !important;
      border-radius: ${r?.m}px;
      min-height: unset;
      opacity: 1;

      &.MuiAutocomplete-option {
        min-height: unset;
      }

      &.MuiButtonBase-root {
        background-color: transparent;
        opacity: 1;

        &:hover, &.${p.focusVisible} {
          background-color: ${i?.base?.fillPrimaryInteraction};

          &[aria-selected="true"] {
            background-color: ${i?.base?.fillPrimaryInteraction};
          }
        }
      }

      &.${p.root} .MuiSvgIcon-root {
        align-self: flex-start;
      }

      &.${p.root} .${p.disabled} {
        opacity: 1 !important;
      }

      &.MuiAutocomplete-option[aria-selected="true"] {
        background-color: unset !important;

        &:hover {
          background-color: ${i?.base?.fillPrimaryInteraction} !important;
        }

        ${T}, ${E} {
          color: ${t?i?.base?.ornamentPrimary:i?.base?.ornamentSecondary};
        }
      }

      &.MuiAutocomplete-option[aria-disabled="true"] {
        opacity: 1;
      }

      &:hover {
        background-color: ${i?.base?.fillPrimaryInteraction};
        ${T}, ${E} {
          color: ${t?i?.base?.ornamentPrimary:i?.base?.ornamentSecondary};
        }
      }

      &.Mui-selected.MuiListItem-root.MuiListItem-button {
        background-color: ${i?.base?.surfacePrimary};
        &:hover {
          background-color: ${i?.base?.fillPrimaryInteraction};
        }
      }

      &:active {
        ${T}, ${E} {
          color: ${i?.base?.ornamentPrimary};
        }

        &:active {
          ${T}, ${E} {
            color: ${i?.base?.ornamentPrimary};
          }
        }
      }
    `},`;`),y=a(`span`,{target:`eanvvd47`})({name:`18ov00z`,styles:`display:flex;justify-content:space-between;align-items:flex-start;width:100%`}),b=e=>{let{disabled:t}=e;return t?`
    color: ${l(e)?.base?.textDisabled};
    cursor: default;
  `:``},x=a(`span`,{target:`eanvvd46`})(f,` `,e=>`
      color: ${l(e)?.base?.textPrimary};
      display: flex;
      white-space: pre-wrap;
    `,` `,b,`;`),S=a(`span`,{target:`eanvvd45`})(e=>{let{disabled:t}=e,n=u(e),r=i(e),a=l(e);return`
      margin-right: ${n?.xs}px;
      margin-top: ${n?.xxxs}px;
      height: ${r?.s.height}px;

      .MuiSvgIcon-root {
        ${t?`color: ${a?.base?.ornamentDisabled};`:null};
      }
    `},`;`),C=a(`span`,{target:`eanvvd44`})(f,` `,e=>{let t=l(e),n=u(e);return`
      text-align: right;
      color: ${t?.base?.textPrimary};
      margin-left: ${n?.m}px;
    `},` `,b,`;`),w=a(`span`,{target:`eanvvd43`})(e=>{let t=u(e),n=i(e);return`
      display: flex;
      align-self: start;
      margin-right: ${t?.xs}px;
      margin-top: ${t?.xxs}px;
      height: ${n?.s.height}px;
    `},`;`),T=a(_,{target:`eanvvd42`})(e=>{let{selected:t,disabled:n}=e,r=l(e),i=n?r?.base?.ornamentDisabled:r?.base?.ornamentPrimary;return`
      color: ${t?i:`transparent`};
    `},`;`),E=a(`svg`,{target:`eanvvd41`})(e=>{let{selected:t,disabled:n}=e,r=l(e),i=n?r?.base?.ornamentDisabled:r?.base?.ornamentPrimary;return`
      color: ${t?i:`transparent`};
    `},`;`)})),O,k,A,j=t((()=>{O=e(n()),g(),D(),k=r(),A=(0,O.forwardRef)(function(e,t){let{children:n,column:r=null,disabled:i,isMultiSelect:a=!1,icon:o,sdsIcon:s,sdsIconProps:c,sdsStyle:l=`determinate`,sdsType:u=`default`,...d}=e,{selected:f=!1}=d,p=u===`action`,m=()=>a?l===`determinate`?(0,k.jsx)(w,{children:(0,k.jsx)(T,{sdsIcon:`Check`,sdsSize:`xs`,selected:f,disabled:i})}):(0,k.jsx)(w,{children:(0,k.jsx)(T,{sdsIcon:`Minus`,sdsSize:`xs`,selected:f,disabled:i})}):(0,k.jsx)(w,{children:(0,k.jsx)(E,{viewBox:`0 0 12 12`,xmlns:`http://www.w3.org/2000/svg`,width:`12`,height:`12`,fill:`currentColor`,selected:f,disabled:i,children:(0,k.jsx)(`circle`,{cx:`6`,cy:`6`,r:`2`})})}),h=o||s,g=()=>{if(h)return typeof h==`string`?(0,k.jsx)(S,{disabled:i,children:(0,k.jsx)(_,{color:`blue`,...c,sdsIcon:h,sdsSize:`s`})}):(0,k.jsx)(S,{disabled:i,children:h})};return(0,k.jsxs)(v,{...d,disabled:i,ref:t,children:[!p&&m(),(0,k.jsxs)(y,{children:[(0,k.jsxs)(x,{selected:f,className:`primary-text`,disabled:i,children:[g(),n]}),r&&(0,k.jsx)(C,{disabled:i,children:r})]})]})})}));export{j as n,A as t};