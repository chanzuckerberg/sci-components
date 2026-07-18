import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r,Mi as i,Ni as a,Pr as o,Ti as s,V as c,W as l,X as u,Y as d,Z as f,Zn as p,_ as m,c as h,ct as g,fi as _,nt as v,rt as y,t as b,wr as x}from"./iframe-ZT52KRhI.js";import{a as S,s as C,t as w}from"./utils-CHt6irz9.js";import{n as T,t as E}from"./Autocomplete-BE7S9Ksz.js";var D,O,k,A,j,M,N,P=t((()=>{a(),g(),b(),y(),D=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`,`forceOpen`,`isMultiColumn`,`titleValue`],O=i(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby5`})(h,` `,e=>{let t=f(e);return`
      color: ${d(e)?.base?.textPrimary};
      padding-right: ${t?.m}px;
    `},`;`),k=i(`div`,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby4`})(m,` `,e=>{let t=f(e);return`
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
    `},`;`),j=i(o,{shouldForwardProp:e=>!D.includes(e)||e===`anchorEl`,target:`e5apwby2`})(e=>{let t=c(e),n=l(e),r=u(e);return`
      background-color: ${d(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${t?.none};
      border-radius: ${n?.l}px;
      box-shadow: ${r?.m};
      box-sizing: border-box;
      z-index: 1400;
    `},`;`),M=i(_,{shouldForwardProp:e=>!D.includes(e),target:`e5apwby1`})(e=>{let t=f(e),n=u(e),r=d(e),i=l(e);return`
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
    `},`;`)})),F,I,L,R,z=t((()=>{g(),F=e(n()),S(),T(),P(),I=r(),L={disablePortal:!0},R=e=>{let t=s(),{anchorEl:n,id:r,InputBaseProps:i,open:a=!1,PopperComponent:o=j,PaperComponent:c=M,PopperPlacement:l=`bottom-start`,PopperBaseProps:u={},isSearchAutoFocus:d=!0,search:f=!1,title:m,subTitle:h,headerComponentSlot:g,label:_=`Search`,children:v,options:y,onClickAway:b=C,ClickAwayListenerProps:x,width:S=160,onOpen:T,onClose:D,...P}=e,R=`options`in(y?.[0]||w),z=(0,F.useMemo)(()=>({minWidth:160,width:R?`auto`:S,...u?.sx}),[u?.sx,R,S]),B=(0,F.useMemo)(()=>({...i,autoFocus:d,onClick:C}),[i,d]);return(0,I.jsx)(o,{id:r,modifiers:[{name:`offset`,options:{offset:[0,t?.app?.spacing?.s]}}],open:a,anchorEl:n,placement:l,...u,sx:z,children:(0,I.jsx)(c,{children:(0,I.jsx)(p,{onClickAway:b,...x,children:(0,I.jsxs)(A,{search:f,titleValue:!!(m||g),children:[(m||g)&&(0,I.jsxs)(N,{search:f,children:[(0,I.jsxs)(`div`,{children:[m&&(0,I.jsx)(O,{children:m}),g&&(0,I.jsx)(I.Fragment,{children:g})]}),m&&h&&(0,I.jsx)(k,{children:h})]}),n&&(0,I.jsx)(E,{label:_,search:f,title:m,open:a,options:y,PopperBaseProps:L,disablePortal:!0,onClickAway:C,onClick:C,onOpen:T,onClose:D,...P,InputBaseProps:B}),v]})})})})}}));export{z as n,P as r,R as t};