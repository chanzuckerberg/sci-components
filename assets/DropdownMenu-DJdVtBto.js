import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Ht as i,Mr as a,Sr as o,Vr as s,Yn as c,t as l,yn as u}from"./material-DlyzFPof.js";import{t as d}from"./jsx-runtime-cM__dR4X.js";import{Ft as f,Gt as p,Rt as m,Ut as h,Wt as g,c as _,nn as v,rn as y,t as b,x}from"./iframe-DhUGD016.js";import{a as S,s as C,t as w}from"./utils-CbT4iKc5.js";import{n as T,t as E}from"./Autocomplete-B1bwC__d.js";var D,O,k,A,j,M,N,P=t((()=>{r(),l(),b(),y(),D=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`,`forceOpen`,`isMultiColumn`,`titleValue`],O=s(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby5`})(_,` `,e=>{let t=p(e);return`
      color: ${h(e)?.base?.textPrimary};
      padding-right: ${t?.m}px;
    `},`;`),k=s(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby4`})(x,` `,e=>{let t=p(e);return`
      color: ${h(e)?.base?.textSecondary};
      padding-right: ${t?.m}px;
      padding-top: ${t?.xxxs}px;
    `},`;`),A=s(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby3`})(e=>{let{search:t,titleValue:n}=e,r=p(e);return`
      & .SdsAutocompleteMultiColumn-wrapper {
        padding: 0 ${r?.xs}px;
      }

      & .${o.popper}, & .MuiPopper-root,
      .base-Popper-root {
        position: relative !important;
        transform: none !important;
        width: 100% !important;
        box-shadow: none;
        padding: ${!t&&!n?r?.xs:0}px 0 0;
        border: none;
        outline: none !important;

        .MuiAutocomplete-listbox {
          outline: none !important;
        }

        .${o.paper}, .MuiPaper-root {
          box-shadow: none !important;
          border: none !important;
          border-radius: 0;
          margin: 0;
          padding: 0;
          outline: none !important;
        }
      }
    `},`;`),j=s(u,{shouldForwardProp:e=>!D.includes(e)||e===`anchorEl`,target:`e5apwby2`})(e=>{let t=f(e),n=m(e),r=g(e);return`
      background-color: ${h(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${t?.none};
      border-radius: ${n?.l}px;
      box-shadow: ${r?.m};
      box-sizing: border-box;
      z-index: 1400;
    `},`;`),M=s(c,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby1`})(e=>{let t=p(e),n=g(e),r=h(e),i=m(e);return`
      box-shadow: ${n?.none} !important;
      border: none !important;
      outline: 1px solid ${v(r?.base?.borderSecondary||`#000000`,15)};
      border-radius: ${i?.l}px;
      background-color: ${r?.base?.surfacePrimary};
      background-image: none;
      margin: 0;
      padding: 0 0 ${t?.xs}px 0;
      overflow: hidden;

      .MuiAutocomplete-root,
      .MuiFormControl-root.MuiTextField-root {
        margin-bottom: ${t?.s}px;

        & .MuiInputBase-root.MuiOutlinedInput-root {
          border-radius: 0;
        }

        & fieldset {
          border-left: none !important;
          border-right: none !important;
          border-top: none !important;
          border-bottom: 1px solid ${r?.base?.divider};
          border-color: ${r?.base?.divider} !important;
          border-radius: 0;
        }
      }

      // (masoudmanson): Remove margin-right and margin-bottom for the single column autocomplete
      // as it has been added to the parent container
      .MuiAutocomplete-root .MuiFormControl-root.MuiTextField-root {
        margin-right: 0;
        margin-bottom: 0;
      }
    `},`;`),N=s(`div`,{target:`e5apwby0`})(e=>{let{search:t}=e,n=p(e),r=h(e);return`
      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      display: flex;
      flex-direction: column;
      padding: ${n?.xs}px ${n?.m}px ${t?n?.xs:n?.s}px;
      ${t&&`border-bottom: solid 1px ${r?.base?.divider};`}
    `},`;`)})),F,I,L,R,z=t((()=>{l(),F=e(n()),S(),T(),P(),I=e(d()),L={disablePortal:!0},R=e=>{let t=a(),{anchorEl:n,id:r,InputBaseProps:o,open:s=!1,PopperComponent:c=j,PaperComponent:l=M,PopperPlacement:u=`bottom-start`,PopperBaseProps:d={},isSearchAutoFocus:f=!0,search:p=!1,title:m,subTitle:h,headerComponentSlot:g,label:_=`Search`,children:v,options:y,onClickAway:b=C,ClickAwayListenerProps:x,width:S=160,onOpen:T,onClose:D,...P}=e,R=`options`in(y?.[0]||w),z=(0,F.useMemo)(()=>({minWidth:160,width:R?`auto`:S,...d?.sx}),[d?.sx,R,S]),B=(0,F.useMemo)(()=>({...o,autoFocus:f,onClick:C}),[o,f]);return(0,I.jsx)(c,{id:r,modifiers:[{name:`offset`,options:{offset:[0,t?.app?.spacing?.s]}}],open:s,anchorEl:n,placement:u,...d,sx:z,children:(0,I.jsx)(l,{children:(0,I.jsx)(i,{onClickAway:b,...x,children:(0,I.jsxs)(A,{search:p,titleValue:!!(m||g),children:[(m||g)&&(0,I.jsxs)(N,{search:p,children:[(0,I.jsxs)(`div`,{children:[m&&(0,I.jsx)(O,{children:m}),g&&(0,I.jsx)(I.Fragment,{children:g})]}),m&&h&&(0,I.jsx)(k,{children:h})]}),n&&(0,I.jsx)(E,{label:_,search:p,title:m,open:s,options:y,PopperBaseProps:L,disablePortal:!0,onClickAway:C,onClick:C,onOpen:T,onClose:D,...P,InputBaseProps:B}),v]})})})})}}));export{P as a,j as i,z as n,M as r,R as t};