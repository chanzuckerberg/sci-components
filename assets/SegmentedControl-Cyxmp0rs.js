import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{B as n,Kr as r,W as i,Xn as a,Y as o,Z as s,Zn as c,cr as l,dt as u,lt as d,s as f,st as p,t as m,ut as h,z as g}from"./iframe-DI6qETgL.js";import{n as _,t as v}from"./Icon-BvRFwTEr.js";import{n as y,r as b,t as x}from"./warnings-DdHhhR49.js";import{n as S,t as C}from"./Tooltip-C5txiU7R.js";var w,T,E,D,O,k=t((()=>{c(),p(),n(),m(),w=[`buttonDefinition`],T=a(d,{shouldForwardProp:e=>!w.includes(e),target:`enkxsnk3`})(e=>{let t=s(e),n=o(e),r=i(e);return`
      box-shadow: inset 0 0 0 1px ${n?.base?.borderPrimary};
      border-radius: ${r?.l}px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 1px;
      width: fit-content;
      padding: ${t?.xxxs}px;

      &:hover {
        box-shadow: inset 0 0 0 1px ${n?.base?.borderPrimaryInteraction};
      }

      .${u.root}.${u.disabled} {
        border-color: transparent;
      }

      .${u.root}.${u.selected} {
        background-color: ${n?.base?.fillPrimaryInteraction};
        color: ${n?.accent?.foregroundActive};
        border-color: ${n?.base?.borderPrimary};

        &:hover {
          background-color: ${n?.base?.fillPrimaryInteraction};
          color: ${n?.base?.ornamentSecondaryInteraction};
        }
      }

      .${u.root} {
        ${g(e)}
        background-color: transparent;
        border: none;
        color: ${n?.base?.ornamentSecondary};
        padding: ${t?.xxs}px ${t?.m}px;
        border-radius: ${r?.m}px;
        margin: 0;

        &:hover {
          border-color: ${n?.base?.borderPrimary};
          background-color: ${n?.base?.fillPrimaryInteraction};
          color: ${n?.base?.ornamentSecondaryInteraction};
        }
      }
    `},`;`),E=a(h,{shouldForwardProp:e=>!w.includes(e),target:`enkxsnk2`})(e=>{let{disabled:t}=e,n=o(e);return`
      border: none !important;
      svg {
        color: ${t?n?.base?.ornamentDisabled:`currentColor`};
      }
    `},`;`),D=a(`div`,{target:`enkxsnk1`})({name:`fp9904`,styles:`line-height:0px`}),O=a(`div`,{target:`enkxsnk0`})(f,` white-space:nowrap;line-height:16px!important;`)})),A,j,M,N,P=t((()=>{A=e(r()),y(),_(),S(),k(),j=l(),M=e(r()),N=e=>{let{buttonDefinition:t,value:n,onChange:r,...i}=e,a=t.find(e=>!e.disabled)?.value||null,[o,s]=A.useState(a),c=n!==void 0,l=c?n:o;return(0,j.jsx)(T,{"aria-label":`Segmented Control`,size:`small`,value:l,exclusive:!0,onChange:(e,t)=>{c||s(t),r&&r(e,t)},...i,children:t.map(e=>{let{icon:t,label:n,shouldShowTooltip:r=!0,tooltipProps:i,tooltipText:a,value:o,disabled:s=!1}=e;a&&b(x.SegmentedControlTooltipTextDeprecated),!t&&!n&&b(x.SegmentedControlMissingIconOrLabel),t&&n&&b(x.SegmentedControlIconAndLabelConflict);let c=t?typeof t==`string`?(0,j.jsx)(v,{sdsIcon:t,sdsSize:`s`}):t:null,l=(0,j.jsx)(E,{"aria-label":a??n??o,value:o,disabled:s,children:(0,j.jsx)(`span`,{tabIndex:-1,children:n?(0,j.jsx)(O,{children:n}):c?(0,j.jsx)(D,{children:c}):(0,j.jsx)(O,{children:o})})},o),u=a??i?.title??n??o;return s||!r?l:(0,M.createElement)(C,{arrow:!0,...i,title:u,key:o},l)})})}}));export{P as n,N as t};