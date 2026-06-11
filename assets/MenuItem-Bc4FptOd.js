import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{K as n,Kr as r,Mt as i,R as a,W as o,Xn as s,Y as c,Z as l,Zn as u,cr as d,g as f,jt as p,st as m,t as h}from"./iframe-DI6qETgL.js";import{n as g,t as _}from"./Icon-BvRFwTEr.js";var v,y,b,x,S,C,w,T,E,D=t((()=>{u(),m(),a(),h(),g(),v=s(p,{target:`eanvvd48`})(e=>{let{selected:t}=e,n=l(e),r=o(e),a=c(e);return`
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

        &:hover, &.${i.focusVisible} {
          background-color: ${a?.base?.fillPrimaryInteraction};

          &[aria-selected="true"] {
            background-color: ${a?.base?.fillPrimaryInteraction};
          }
        }
      }

      &.${i.root} .MuiSvgIcon-root {
        align-self: flex-start;
      }

      &.${i.root} .${i.disabled} {
        opacity: 1 !important;
      }

      &.MuiAutocomplete-option[aria-selected="true"] {
        background-color: unset !important;

        &:hover {
          background-color: ${a?.base?.fillPrimaryInteraction} !important;
        }

        ${T}, ${E} {
          color: ${t?a?.base?.ornamentPrimary:a?.base?.ornamentSecondary};
        }
      }

      &.MuiAutocomplete-option[aria-disabled="true"] {
        opacity: 1;
      }

      &:hover {
        background-color: ${a?.base?.fillPrimaryInteraction};
        ${T}, ${E} {
          color: ${t?a?.base?.ornamentPrimary:a?.base?.ornamentSecondary};
        }
      }

      &.Mui-selected.MuiListItem-root.MuiListItem-button {
        background-color: ${a?.base?.surfacePrimary};
        &:hover {
          background-color: ${a?.base?.fillPrimaryInteraction};
        }
      }

      &:active {
        ${T}, ${E} {
          color: ${a?.base?.ornamentPrimary};
        }

        &:active {
          ${T}, ${E} {
            color: ${a?.base?.ornamentPrimary};
          }
        }
      }
    `},`;`),y=s(`span`,{target:`eanvvd47`})({name:`18ov00z`,styles:`display:flex;justify-content:space-between;align-items:flex-start;width:100%`}),b=e=>{let{disabled:t}=e;return t?`
    color: ${c(e)?.base?.textDisabled};
    cursor: default;
  `:``},x=s(`span`,{target:`eanvvd46`})(f,` `,e=>`
      color: ${c(e)?.base?.textPrimary};
      display: flex;
      white-space: pre-wrap;
    `,` `,b,`;`),S=s(`span`,{target:`eanvvd45`})(e=>{let{disabled:t}=e,r=l(e),i=n(e),a=c(e);return`
      margin-right: ${r?.xs}px;
      margin-top: ${r?.xxxs}px;
      height: ${i?.s.height}px;

      .MuiSvgIcon-root {
        ${t?`color: ${a?.base?.ornamentDisabled};`:null};
      }
    `},`;`),C=s(`span`,{target:`eanvvd44`})(f,` `,e=>{let t=c(e),n=l(e);return`
      text-align: right;
      color: ${t?.base?.textPrimary};
      margin-left: ${n?.m}px;
    `},` `,b,`;`),w=s(`span`,{target:`eanvvd43`})(e=>{let t=l(e),r=n(e);return`
      display: flex;
      align-self: start;
      margin-right: ${t?.xs}px;
      margin-top: ${t?.xxs}px;
      height: ${r?.s.height}px;
    `},`;`),T=s(_,{target:`eanvvd42`})(e=>{let{selected:t,disabled:n}=e,r=c(e),i=n?r?.base?.ornamentDisabled:r?.base?.ornamentPrimary;return`
      color: ${t?i:`transparent`};
    `},`;`),E=s(`svg`,{target:`eanvvd41`})(e=>{let{selected:t,disabled:n}=e,r=c(e),i=n?r?.base?.ornamentDisabled:r?.base?.ornamentPrimary;return`
      color: ${t?i:`transparent`};
    `},`;`)})),O,k,A,j=t((()=>{O=e(r()),g(),D(),k=d(),A=(0,O.forwardRef)(function(e,t){let{children:n,column:r=null,disabled:i,isMultiSelect:a=!1,icon:o,sdsIcon:s,sdsIconProps:c,sdsStyle:l=`determinate`,sdsType:u=`default`,...d}=e,{selected:f=!1}=d,p=u===`action`,m=()=>a?l===`determinate`?(0,k.jsx)(w,{children:(0,k.jsx)(T,{sdsIcon:`Check`,sdsSize:`xs`,selected:f,disabled:i})}):(0,k.jsx)(w,{children:(0,k.jsx)(T,{sdsIcon:`Minus`,sdsSize:`xs`,selected:f,disabled:i})}):(0,k.jsx)(w,{children:(0,k.jsx)(E,{viewBox:`0 0 12 12`,xmlns:`http://www.w3.org/2000/svg`,width:`12`,height:`12`,fill:`currentColor`,selected:f,disabled:i,children:(0,k.jsx)(`circle`,{cx:`6`,cy:`6`,r:`2`})})}),h=o||s,g=()=>{if(h)return typeof h==`string`?(0,k.jsx)(S,{disabled:i,children:(0,k.jsx)(_,{color:`blue`,...c,sdsIcon:h,sdsSize:`s`})}):(0,k.jsx)(S,{disabled:i,children:h})};return(0,k.jsxs)(v,{...d,disabled:i,ref:t,children:[!p&&m(),(0,k.jsxs)(y,{children:[(0,k.jsxs)(x,{selected:f,className:`primary-text`,disabled:i,children:[g(),n]}),r&&(0,k.jsx)(C,{disabled:i,children:r})]})]})})}));export{j as n,A as t};