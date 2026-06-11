import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Gn as n,Kr as r,Ln as i,V as a,W as o,X as s,Xn as c,Y as l,Z as u,Zn as d,_ as f,c as p,cr as m,gn as h,nn as g,nt as _,st as v,t as y,tt as b,xn as x}from"./iframe-DI6qETgL.js";import{a as S,s as C,t as w}from"./utils-B1uyFjm5.js";import{n as T,t as E}from"./Autocomplete-DFEzPpSf.js";var D,O,k,A,j,M,N,P=t((()=>{d(),v(),y(),_(),D=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`,`forceOpen`,`isMultiColumn`,`titleValue`],O=c(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby5`})(p,` `,e=>{let t=u(e);return`
      color: ${l(e)?.base?.textPrimary};
      padding-right: ${t?.m}px;
    `},`;`),k=c(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby4`})(f,` `,e=>{let t=u(e);return`
      color: ${l(e)?.base?.textSecondary};
      padding-right: ${t?.m}px;
      padding-top: ${t?.xxxs}px;
    `},`;`),A=c(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby3`})(e=>{let{search:t,titleValue:n}=e,r=u(e);return`
      & .SdsAutocompleteMultiColumn-wrapper {
        padding: 0 ${r?.xs}px;
      }

      & .${h.popper}, & .MuiPopper-root,
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

        .${h.paper}, .MuiPaper-root {
          box-shadow: none !important;
          border: none !important;
          border-radius: 0;
          margin: 0;
          padding: 0;
          outline: none !important;
        }
      }
    `},`;`),j=c(x,{shouldForwardProp:e=>!D.includes(e)||e===`anchorEl`,target:`e5apwby2`})(e=>{let t=a(e),n=o(e),r=s(e);return`
      background-color: ${l(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${t?.none};
      border-radius: ${n?.l}px;
      box-shadow: ${r?.m};
      box-sizing: border-box;
      z-index: 1400;
    `},`;`),M=c(i,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby1`})(e=>{let t=u(e),n=s(e),r=l(e),i=o(e);return`
      box-shadow: ${n?.none} !important;
      border: none !important;
      outline: 1px solid ${b(r?.base?.borderSecondary||`#000000`,15)};
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
    `},`;`),N=c(`div`,{target:`e5apwby0`})(e=>{let{search:t}=e,n=u(e),r=l(e);return`
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
    `},`;`)})),F,I,L,R,z=t((()=>{v(),F=e(r()),S(),T(),P(),I=m(),L={disablePortal:!0},R=e=>{let t=n(),{anchorEl:r,id:i,InputBaseProps:a,open:o=!1,PopperComponent:s=j,PaperComponent:c=M,PopperPlacement:l=`bottom-start`,PopperBaseProps:u={},isSearchAutoFocus:d=!0,search:f=!1,title:p,subTitle:m,headerComponentSlot:h,label:_=`Search`,children:v,options:y,onClickAway:b=C,ClickAwayListenerProps:x,width:S=160,onOpen:T,onClose:D,...P}=e,R=`options`in(y?.[0]||w),z=(0,F.useMemo)(()=>({minWidth:160,width:R?`auto`:S,...u?.sx}),[u?.sx,R,S]),B=(0,F.useMemo)(()=>({...a,autoFocus:d,onClick:C}),[a,d]);return(0,I.jsx)(s,{id:i,modifiers:[{name:`offset`,options:{offset:[0,t?.app?.spacing?.s]}}],open:o,anchorEl:r,placement:l,...u,sx:z,children:(0,I.jsx)(c,{children:(0,I.jsx)(g,{onClickAway:b,...x,children:(0,I.jsxs)(A,{search:f,titleValue:!!(p||h),children:[(p||h)&&(0,I.jsxs)(N,{search:f,children:[(0,I.jsxs)(`div`,{children:[p&&(0,I.jsx)(O,{children:p}),h&&(0,I.jsx)(I.Fragment,{children:h})]}),p&&m&&(0,I.jsx)(k,{children:m})]}),r&&(0,I.jsx)(E,{label:_,search:f,title:p,open:o,options:y,PopperBaseProps:L,disablePortal:!0,onClickAway:C,onClick:C,onOpen:T,onClose:D,...P,InputBaseProps:B}),v]})})})})}}));export{z as n,P as r,R as t};