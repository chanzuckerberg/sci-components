import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,B as r,Gi as i,Mi as a,Ni as o,W as s,Y as c,Z as l,ct as u,dt as d,gt as f,pt as p,s as m,t as h,z as g}from"./iframe-Bjh1LYUt.js";import{n as _,t as v}from"./Icon-D5aq3JJF.js";import{n as y,r as b,t as x}from"./warnings-C77gj_xO.js";import{n as S,t as C}from"./Tooltip-DnwfrD0l.js";var w,T,E,D,O,k=t((()=>{o(),u(),r(),h(),w=[`buttonDefinition`],T=a(d,{shouldForwardProp:e=>!w.includes(e),target:`enkxsnk3`})(e=>{let t=l(e),n=c(e),r=s(e);return`
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

      .${f.root}.${f.disabled} {
        border-color: transparent;
      }

      .${f.root}.${f.selected} {
        background-color: ${n?.base?.fillPrimaryInteraction};
        color: ${n?.accent?.foregroundActive};
        border-color: ${n?.base?.borderPrimary};

        &:hover {
          background-color: ${n?.base?.fillPrimaryInteraction};
          color: ${n?.base?.ornamentSecondaryInteraction};
        }
      }

      .${f.root} {
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
    `},`;`),E=a(p,{shouldForwardProp:e=>!w.includes(e),target:`enkxsnk2`})(e=>{let{disabled:t}=e,n=c(e);return`
      border: none !important;
      svg {
        color: ${t?n?.base?.ornamentDisabled:`currentColor`};
      }
    `},`;`),D=a(`div`,{target:`enkxsnk1`})({name:`fp9904`,styles:`line-height:0px`}),O=a(`div`,{target:`enkxsnk0`})(m,` white-space:nowrap;line-height:16px!important;`)})),A,j,M,N,P=t((()=>{A=e(n()),y(),_(),S(),k(),j=i(),M=e(n()),N=e=>{let{buttonDefinition:t,value:n,onChange:r,...i}=e,a=t.find(e=>!e.disabled)?.value||null,[o,s]=A.useState(a),c=n!==void 0,l=c?n:o;return(0,j.jsx)(T,{"aria-label":`Segmented Control`,size:`small`,value:l,exclusive:!0,onChange:(e,t)=>{c||s(t),r&&r(e,t)},...i,children:t.map(e=>{let{icon:t,label:n,shouldShowTooltip:r=!0,tooltipProps:i,tooltipText:a,value:o,disabled:s=!1}=e;a&&b(x.SegmentedControlTooltipTextDeprecated),!t&&!n&&b(x.SegmentedControlMissingIconOrLabel),t&&n&&b(x.SegmentedControlIconAndLabelConflict);let c=t?typeof t==`string`?(0,j.jsx)(v,{sdsIcon:t,sdsSize:`s`}):t:null,l=(0,j.jsx)(E,{"aria-label":a??n??o,value:o,disabled:s,children:(0,j.jsx)(`span`,{tabIndex:-1,children:n?(0,j.jsx)(O,{children:n}):c?(0,j.jsx)(D,{children:c}):(0,j.jsx)(O,{children:o})})},o),u=a??i?.title??n??o;return s||!r?l:(0,M.createElement)(C,{arrow:!0,...i,title:u,key:o},l)})})}}));export{P as n,N as t};