import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Fi as i,Ft as a,Gt as o,Ja as s,Ra as c,Rt as l,Ut as u,Wt as d,_n as f,c as p,da as m,ii as h,io as g,nn as _,rn as v,ro as y,t as b,x}from"./iframe-BPFLG940.js";import{a as S,s as C,t as w}from"./utils-DEYthYrx.js";import{n as T,t as E}from"./Autocomplete-B98jBCIo.js";var D,O,k,A,j,M,N,P=e((()=>{g(),f(),b(),v(),D=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`,`forceOpen`,`isMultiColumn`,`titleValue`],O=y(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby5`})(p,` `,e=>{let t=o(e);return`
      color: ${u(e)?.base?.textPrimary};
      padding-right: ${t?.m}px;
    `},`;`),k=y(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby4`})(x,` `,e=>{let t=o(e);return`
      color: ${u(e)?.base?.textSecondary};
      padding-right: ${t?.m}px;
      padding-top: ${t?.xxxs}px;
    `},`;`),A=y(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby3`})(e=>{let{search:t,titleValue:n}=e,r=o(e);return`
      & .SdsAutocompleteMultiColumn-wrapper {
        padding: 0 ${r?.xs}px;
      }

      & .${c.popper}, & .MuiPopper-root,
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

        .${c.paper}, .MuiPaper-root {
          box-shadow: none !important;
          border: none !important;
          border-radius: 0;
          margin: 0;
          padding: 0;
          outline: none !important;
        }
      }
    `},`;`),j=y(i,{shouldForwardProp:e=>!D.includes(e)||e===`anchorEl`,target:`e5apwby2`})(e=>{let t=a(e),n=l(e),r=d(e);return`
      background-color: ${u(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${t?.none};
      border-radius: ${n?.l}px;
      box-shadow: ${r?.m};
      box-sizing: border-box;
      z-index: 1400;
    `},`;`),M=y(m,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby1`})(e=>{let t=o(e),n=d(e),r=u(e),i=l(e);return`
      box-shadow: ${n?.none} !important;
      border: none !important;
      outline: 1px solid ${_(r?.base?.borderSecondary||`#000000`,15)};
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
    `},`;`),N=y(`div`,{target:`e5apwby0`})(e=>{let{search:t}=e,n=o(e),r=u(e);return`
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
    `},`;`)})),F,I,L,R,z=e((()=>{f(),F=t(n()),S(),T(),P(),I=t(r()),L={disablePortal:!0},R=e=>{let t=s(),{anchorEl:n,id:r,InputBaseProps:i,open:a=!1,PopperComponent:o=j,PaperComponent:c=M,PopperPlacement:l=`bottom-start`,PopperBaseProps:u={},isSearchAutoFocus:d=!0,search:f=!1,title:p,subTitle:m,headerComponentSlot:g,label:_=`Search`,children:v,options:y,onClickAway:b=C,ClickAwayListenerProps:x,width:S=160,onOpen:T,onClose:D,...P}=e,R=`options`in(y?.[0]||w),z=(0,F.useMemo)(()=>({minWidth:160,width:R?`auto`:S,...u?.sx}),[u?.sx,R,S]),B=(0,F.useMemo)(()=>({...i,autoFocus:d,onClick:C}),[i,d]);return(0,I.jsx)(o,{id:r,modifiers:[{name:`offset`,options:{offset:[0,t?.app?.spacing?.s]}}],open:a,anchorEl:n,placement:l,...u,sx:z,children:(0,I.jsx)(c,{children:(0,I.jsx)(h,{onClickAway:b,...x,children:(0,I.jsxs)(A,{search:f,titleValue:!!(p||g),children:[(p||g)&&(0,I.jsxs)(N,{search:f,children:[(0,I.jsxs)(`div`,{children:[p&&(0,I.jsx)(O,{children:p}),g&&(0,I.jsx)(I.Fragment,{children:g})]}),p&&m&&(0,I.jsx)(k,{children:m})]}),n&&(0,I.jsx)(E,{label:_,search:f,title:p,open:a,options:y,PopperBaseProps:L,disablePortal:!0,onClickAway:C,onClick:C,onOpen:T,onClose:D,...P,InputBaseProps:B}),v]})})})})}}));export{P as a,j as i,z as n,M as r,R as t};