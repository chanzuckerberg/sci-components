import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Dn as i,E as a,Eo as o,Hn as s,K as c,La as l,N as u,On as d,bo as f,gn as p,hn as m,ki as h,ko as g,ln as _,mn as v,oa as y,on as b,uo as x}from"./iframe-s0DqqZ6S.js";import{a as S,s as C,t as w}from"./utils-BxIa431Z.js";import{n as T,t as E}from"./Autocomplete--BtzVaHy.js";var D,O,k,A,j,M,N,P=e((()=>{r(),s(),a(),d(),D=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`,`forceOpen`,`isMultiColumn`,`titleValue`],O=g(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby5`})(u,` `,e=>{let t=p(e);return`
      color: ${v(e)?.base?.textPrimary};
      padding-right: ${t?.m}px;
    `},`;`),k=g(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby4`})(c,` `,e=>{let t=p(e);return`
      color: ${v(e)?.base?.textSecondary};
      padding-right: ${t?.m}px;
      padding-top: ${t?.xxxs}px;
    `},`;`),A=g(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby3`})(e=>{let{search:t,titleValue:n}=e,r=p(e);return`
      & .SdsAutocompleteMultiColumn-wrapper {
        padding: 0 ${r?.xs}px;
      }

      & .${x.popper}, & .MuiPopper-root,
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

        .${x.paper}, .MuiPaper-root {
          box-shadow: none !important;
          border: none !important;
          border-radius: 0;
          margin: 0;
          padding: 0;
          outline: none !important;
        }
      }
    `},`;`),j=g(y,{shouldForwardProp:e=>!D.includes(e)||e===`anchorEl`,target:`e5apwby2`})(e=>{let t=b(e),n=_(e),r=m(e);return`
      background-color: ${v(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${t?.none};
      border-radius: ${n?.l}px;
      box-shadow: ${r?.m};
      box-sizing: border-box;
      z-index: 1400;
    `},`;`),M=g(l,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby1`})(e=>{let t=p(e),n=m(e),r=v(e),a=_(e);return`
      box-shadow: ${n?.none} !important;
      border: none !important;
      outline: 1px solid ${i(r?.base?.borderSecondary||`#000000`,15)};
      border-radius: ${a?.l}px;
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
    `},`;`),N=g(`div`,{target:`e5apwby0`})(e=>{let{search:t}=e,n=p(e),r=v(e);return`
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
    `},`;`)})),F,I,L,R,z=e((()=>{s(),F=t(n()),S(),T(),P(),I=t(o()),L={disablePortal:!0},R=e=>{let t=f(),{anchorEl:n,id:r,InputBaseProps:i,open:a=!1,PopperComponent:o=j,PaperComponent:s=M,PopperPlacement:c=`bottom-start`,PopperBaseProps:l={},isSearchAutoFocus:u=!0,search:d=!1,title:p,subTitle:m,headerComponentSlot:g,label:_=`Search`,children:v,options:y,onClickAway:b=C,ClickAwayListenerProps:x,width:S=160,onOpen:T,onClose:D,...P}=e,R=`options`in(y?.[0]||w),z=(0,F.useMemo)(()=>({minWidth:160,width:R?`auto`:S,...l?.sx}),[l?.sx,R,S]),B=(0,F.useMemo)(()=>({...i,autoFocus:u,onClick:C}),[i,u]);return(0,I.jsx)(o,{id:r,modifiers:[{name:`offset`,options:{offset:[0,t?.app?.spacing?.s]}}],open:a,anchorEl:n,placement:c,...l,sx:z,children:(0,I.jsx)(s,{children:(0,I.jsx)(h,{onClickAway:b,...x,children:(0,I.jsxs)(A,{search:d,titleValue:!!(p||g),children:[(p||g)&&(0,I.jsxs)(N,{search:d,children:[(0,I.jsxs)(`div`,{children:[p&&(0,I.jsx)(O,{children:p}),g&&(0,I.jsx)(I.Fragment,{children:g})]}),p&&m&&(0,I.jsx)(k,{children:m})]}),n&&(0,I.jsx)(E,{label:_,search:d,title:p,open:a,options:y,PopperBaseProps:L,disablePortal:!0,onClickAway:C,onClick:C,onOpen:T,onClose:D,...P,InputBaseProps:B}),v]})})})})}}));export{P as a,j as i,z as n,M as r,R as t};