import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Cr as n,Fi as r,Ii as i,Jn as a,Li as o,Qa as s,V as c,W as l,X as u,Y as d,Z as f,_ as p,c as m,ct as h,ei as g,ji as _,nt as v,rt as y,t as b,wi as x}from"./iframe-DocVhSSI.js";import{a as S,s as C,t as w}from"./utils-BxIa431Z.js";import{n as T,t as E}from"./Autocomplete-Eoybyrez.js";var D,O,k,A,j,M,N,P=e((()=>{o(),h(),b(),y(),D=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`,`forceOpen`,`isMultiColumn`,`titleValue`],O=i(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby5`})(m,` `,e=>{let t=f(e);return`
      color: ${d(e)?.base?.textPrimary};
      padding-right: ${t?.m}px;
    `},`;`),k=i(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby4`})(p,` `,e=>{let t=f(e);return`
      color: ${d(e)?.base?.textSecondary};
      padding-right: ${t?.m}px;
      padding-top: ${t?.xxxs}px;
    `},`;`),A=i(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby3`})(e=>{let{search:t,titleValue:n}=e,r=f(e);return`
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
    `},`;`),j=i(n,{shouldForwardProp:e=>!D.includes(e)||e===`anchorEl`,target:`e5apwby2`})(e=>{let t=c(e),n=l(e),r=u(e);return`
      background-color: ${d(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${t?.none};
      border-radius: ${n?.l}px;
      box-shadow: ${r?.m};
      box-sizing: border-box;
      z-index: 1400;
    `},`;`),M=i(g,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby1`})(e=>{let t=f(e),n=u(e),r=d(e),i=l(e);return`
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
    `},`;`),N=i(`div`,{target:`e5apwby0`})(e=>{let{search:t}=e,n=f(e),r=d(e);return`
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
    `},`;`)})),F,I,L,R,z=e((()=>{h(),F=t(s()),S(),T(),P(),I=r(),L={disablePortal:!0},R=e=>{let t=_(),{anchorEl:n,id:r,InputBaseProps:i,open:o=!1,PopperComponent:s=j,PaperComponent:c=M,PopperPlacement:l=`bottom-start`,PopperBaseProps:u={},isSearchAutoFocus:d=!0,search:f=!1,title:p,subTitle:m,headerComponentSlot:h,label:g=`Search`,children:v,options:y,onClickAway:b=C,ClickAwayListenerProps:x,width:S=160,onOpen:T,onClose:D,...P}=e,R=`options`in(y?.[0]||w),z=(0,F.useMemo)(()=>({minWidth:160,width:R?`auto`:S,...u?.sx}),[u?.sx,R,S]),B=(0,F.useMemo)(()=>({...i,autoFocus:d,onClick:C}),[i,d]);return(0,I.jsx)(s,{id:r,modifiers:[{name:`offset`,options:{offset:[0,t?.app?.spacing?.s]}}],open:o,anchorEl:n,placement:l,...u,sx:z,children:(0,I.jsx)(c,{children:(0,I.jsx)(a,{onClickAway:b,...x,children:(0,I.jsxs)(A,{search:f,titleValue:!!(p||h),children:[(p||h)&&(0,I.jsxs)(N,{search:f,children:[(0,I.jsxs)(`div`,{children:[p&&(0,I.jsx)(O,{children:p}),h&&(0,I.jsx)(I.Fragment,{children:h})]}),p&&m&&(0,I.jsx)(k,{children:m})]}),n&&(0,I.jsx)(E,{label:g,search:f,title:p,open:o,options:y,PopperBaseProps:L,disablePortal:!0,onClickAway:C,onClick:C,onOpen:T,onClose:D,...P,InputBaseProps:B}),v]})})})})}}));export{z as n,P as r,R as t};