import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i,l as a,s as o,sr as s,t as c}from"./material-DlyzFPof.js";import{t as l}from"./jsx-runtime-cM__dR4X.js";import{Gt as u,Nt as d,Pt as f,Rt as p,Ut as m,s as h,t as g}from"./iframe-BwNEaAUe.js";import{n as _,t as v}from"./Icon-BDRrQ0Mb.js";import{n as y,r as b,t as x}from"./warnings-Ba5098xL.js";import{n as S,t as C}from"./Tooltip-BDHWjiao.js";var w,T,E,D,O,k=t((()=>{r(),c(),f(),g(),w=[`buttonDefinition`],T=i(o,{shouldForwardProp:e=>!w.includes(e),target:`enkxsnk3`})(e=>{let t=u(e),n=m(e),r=p(e);return`
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

      .${s.root}.${s.disabled} {
        border-color: transparent;
      }

      .${s.root}.${s.selected} {
        background-color: ${n?.base?.fillPrimaryInteraction};
        color: ${n?.accent?.foregroundActive};
        border-color: ${n?.base?.borderPrimary};

        &:hover {
          background-color: ${n?.base?.fillPrimaryInteraction};
          color: ${n?.base?.ornamentSecondaryInteraction};
        }
      }

      .${s.root} {
        ${d(e)}
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
    `},`;`),E=i(a,{shouldForwardProp:e=>!w.includes(e),target:`enkxsnk2`})(e=>{let{disabled:t}=e,n=m(e);return`
      border: none !important;
      svg {
        color: ${t?n?.base?.ornamentDisabled:`currentColor`};
      }
    `},`;`),D=i(`div`,{target:`enkxsnk1`})({name:`fp9904`,styles:`line-height:0px`}),O=i(`div`,{target:`enkxsnk0`})(h,` white-space:nowrap;line-height:16px!important;`)})),A,j,M,N,P=t((()=>{A=e(n()),y(),_(),S(),k(),j=e(l()),M=e(n()),N=e=>{let{buttonDefinition:t,value:n,onChange:r,...i}=e,a=t.find(e=>!e.disabled)?.value||null,[o,s]=A.useState(a),c=n!==void 0,l=c?n:o;return(0,j.jsx)(T,{"aria-label":`Segmented Control`,size:`small`,value:l,exclusive:!0,onChange:(e,t)=>{c||s(t),r&&r(e,t)},...i,children:t.map(e=>{let{icon:t,label:n,shouldShowTooltip:r=!0,tooltipProps:i,tooltipText:a,value:o,disabled:s=!1}=e;a&&b(x.SegmentedControlTooltipTextDeprecated),!t&&!n&&b(x.SegmentedControlMissingIconOrLabel),t&&n&&b(x.SegmentedControlIconAndLabelConflict);let c=t?typeof t==`string`?(0,j.jsx)(v,{sdsIcon:t,sdsSize:`s`}):t:null,l=(0,j.jsx)(E,{"aria-label":a??n??o,value:o,disabled:s,children:(0,j.jsx)(`span`,{tabIndex:-1,children:n?(0,j.jsx)(O,{children:n}):c?(0,j.jsx)(D,{children:c}):(0,j.jsx)(O,{children:o})})},o),u=a??i?.title??n??o;return s||!r?l:(0,M.createElement)(C,{arrow:!0,...i,title:u,key:o},l)})})}}));export{P as n,N as t};