import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Bt as i,D as a,Fa as o,Fi as s,Ft as c,Gt as l,Ja as u,Ka as d,Ra as f,Rt as p,Ut as m,Wt as h,_n as g,da as _,ii as v,io as y,ki as b,nn as x,pa as S,rn as C,ro as w,t as T,vr as E,x as D}from"./iframe-BPFLG940.js";import{n as O,t as k}from"./Icon-DpYImm5o.js";import{n as A,t as j}from"./Button-CvZmp_f8.js";import{a as M,s as ee,t as te}from"./utils-DEYthYrx.js";import{i as N,n as P,r as F,t as I}from"./InputSearch-DcUsgonP.js";import{n as ne,t as re}from"./MenuItem-83B7DwTY.js";import{n as ie,t as ae}from"./userTabbing-BNIxhW0A.js";var L,oe,se,ce,R,le,ue,z=e((()=>{y(),g(),P(),T(),C(),L=[`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`PopperBaseProps`,`onClickAway`,`hasGroupBy`],oe=w(b,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l5`})(`+.`,f.popper,`>.`,f.paper,` .`,f.groupLabel,`{`,a,`;}`,e=>{let{search:t,groupBy:n}=e,r=l(e),i=c(e),a=m(e);return`
      ${!t&&`height: 0; margin: 0 !important;`};
      
      // (masoudmanson): We need to apply the focus styles to the input element
      // when the user is tabbing through the options. To find out more, take a
      // look at the useDetectUserTabbing hook.
      &[data-user-is-tabbing="true"]:focus-within {
        border-radius: 4px;
        outline: 2px solid ${a?.base?.borderPrimaryInteraction};
        outline-offset: 1px;
      }

      .MuiFormControl-root {
        outline: none;
      }

      .MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-adornedEnd {
        padding: 0 ${r?.m}px;

        .MuiAutocomplete-input {
          padding: ${r?.xs}px ${r?.s}px;
        }
      }

      & + .${f.popper} > .${f.paper} {
        .${f.listbox} {
          max-height: 40vh;
          /* (v9): the listbox now renders as a MenuList, which (unlike MUI's
             default AutocompleteListbox) has no overflow. Restore it so the
             listbox is the scrollable region instead of the Paper. */
          overflow: auto;
          padding: 0 ${n?0:r?.xs}px;

          .${f.option} {
            min-height: unset;

            &.${f.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }

            &[aria-selected="true"] {
              background-color: ${a?.base?.surfacePrimary};
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${f.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }
          }

          & > li:last-child .${f.groupUl} {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }

        .${f.groupLabel} {
          top: 0;
          color: ${a?.base?.textSecondary};
          background-color: ${a?.base?.surfacePrimary};
          padding: 0 ${r?.m}px;
        }

        .${f.groupUl} {
          position: relative;
          margin: 0 0 ${r?.s}px;
          border-bottom: ${i?.base?.divider};
          padding: ${r?.xxs}px ${r?.xs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .${f.noOptions} {
          padding: ${r?.xxs}px ${r?.m}px ${r?.xs}px;
        }

        .${f.loading} {
          padding: 0 ${r?.xs}px;
        }
      }
    `},`;`),se=w(`div`,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l4`})(e=>{let{search:t}=e;if(!t)return`
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
        margin: 0;
        speak: none;
      `},`;`),ce=w(I,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l3`})(`background-color:transparent!important;margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`),R=w(_,{target:`eelfr3l2`})(e=>{let t=p(e),n=h(e),r=c(e),i=l(e),a=m(e);return`
      background-image: none;
      padding: ${i?.xs}px 0;
      background-color: ${a?.base?.surfacePrimary};
      border: ${r?.none};
      outline: 1px solid ${x(a?.base?.borderSecondary||`#000`,15)};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      box-sizing: border-box;
    `},`;`),le=w(`div`,{target:`eelfr3l1`})(D,` `,e=>{let{disabled:t}=e,n=m(e);return`
      color: ${t?n?.base?.textDisabled:n?.base?.textSecondary};
      white-space: pre-wrap;
    `},`;`),ue=w(`div`,{target:`eelfr3l0`})({name:`1fttcpj`,styles:`display:flex;flex-direction:column`})})),B,V,de,H,U=e((()=>{g(),B=t(n()),S(),M(),A(),O(),N(),ne(),z(),ae(),V=t(r()),de=t(n()),H=e=>{let{multiple:t,disableCloseOnSelect:n=t,getOptionLabel:r=K,InputBaseProps:i=te,isOptionEqualToValue:a=q,keepSearchOnSelect:c=!1,label:l=`Label`,loading:d=!1,loadingText:f=``,noOptionsText:p=`No options`,onInputChange:m=ee,renderOption:h=pe,renderValue:g=J,search:_=!1,clearOnBlur:v=!1,blurOnSelect:y=!t,onClickAway:b,onClick:x,onOpen:S,onClose:C,disabled:w,intent:T=`default`}=e,D=u(),O=(0,B.useRef)(null),[A,M]=(0,B.useState)(``);ie(O);let N=ne(),P=(0,B.useRef)(null),I=ae(P);return(0,V.jsx)(oe,{ref:O,clearOnBlur:v,disableCloseOnSelect:n,disablePortal:!0,renderValue:g,loading:d,loadingText:f,noOptionsText:p,renderOption:h,getOptionLabel:r,isOptionEqualToValue:a,inputValue:A,renderInput:z,multiple:t,onOpen:U,onClose:W,...e,blurOnSelect:!t&&y,onBlur:H,onInputChange:G,disabled:w||!_,onChange:L,slots:{paper:R,popper:N,listbox:I,...e.slots}});function ne(){return(0,B.useCallback)(e=>(0,V.jsx)(s,{modifiers:[{enabled:!0,name:`offset`,options:{offset:[0,D.app?.spacing.s]}}],...e}),[])}function ae(e){return(0,B.useMemo)(()=>(0,B.forwardRef)(function(t,n){let r=o(n,e);return(0,V.jsx)(E,{...t,ref:r})}),[])}function L(t,n,r,i){if(P.current){let e=P.current.scrollTop;requestAnimationFrame(()=>{P.current&&(P.current.scrollTop=e)})}e.onChange?.(t,n,r,i)}function z(e){return(0,V.jsx)(se,{search:_,children:(0,V.jsx)(ce,{id:`location-search`,"aria-label":`Search Input`,tabIndex:_?0:-1,"aria-hidden":!_,label:l,placeholder:l,ref:e.slotProps.input.ref,search:_,onKeyDown:e=>{e.key===`Backspace`&&e.stopPropagation()},slotProps:{htmlInput:e.slotProps.htmlInput,input:{...e.slotProps.input.ref,"aria-hidden":!_,endAdornment:(0,V.jsx)(F,{position:`end`,children:A&&(0,V.jsx)(j,{tabIndex:_?0:-1,"aria-hidden":!_,disabled:!_,"aria-label":`Clear Button`,className:`input-search-clear-icon`,onClick:fe,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,V.jsx)(k,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:_?`text`:`none`,startAdornment:(0,V.jsx)(F,{position:`start`,children:(0,V.jsx)(j,{"aria-label":`Search Button`,tabIndex:_?0:-1,"aria-hidden":!_,disabled:!_,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,V.jsx)(k,{sdsIcon:`Search`,sdsSize:`s`})})})}},intent:T,...i})})}function H(t){v&&M(``),e.onBlur?.(t)}function U(e){S?.(e),x?.(e)}function W(e,t){C?.(e,t),b?.(e,t)}function G(e,n,r){t?r===`clear`?M(``):(r===`input`||r===`reset`&&!c)&&M(n):M(r===`input`?n:``),m&&m(e,n,r)}function fe(){M(``),m&&m({target:{value:``}},``,`clear`)}function K(e){return typeof e==`object`&&`name`in e?e.name:e.toString()}function q(e,t){return typeof t==`object`&&t&&`name`in t?e.name===t.name:e.name===t}function J(){return null}function pe(e,n,{selected:i}){let a,{component:o,details:s,count:c,icon:l,sdsIconProps:u,disabled:d,...f}=n,p=r(n);return a=o||(0,V.jsxs)(ue,{children:[p,s&&(0,V.jsx)(le,{disabled:d,className:`menuItem-details`,children:s})]}),(0,de.createElement)(re,{column:c,disabled:d||e[`aria-disabled`]===!0,icon:l,sdsIconProps:u,isMultiSelect:t,selected:i,...e,...f,key:n.name},a)}}})),W,G,fe=e((()=>{y(),T(),W=w(`div`,{target:`e1teds5i1`})(e=>{let{width:t=280}=e;return`
      position: relative;
      width: ${t}px;
    `},`;`),G=w(`p`,{target:`e1teds5i0`})(a,` `,e=>{let t=l(e);return`
      color: ${m(e)?.base?.textSecondary};
      padding: 0 ${t?.xs}px ${t?.xxs}px;
      margin: 0;
    `},`;`)})),K,q,J,pe=e((()=>{K=t(n()),U(),fe(),q=t(r()),J=e=>{let{autocompleteProps:t,onValueChange:n,value:r,multiple:i,label:a,InputBaseProps:o,popperOpen:s,inputValue:c,...l}=e,{name:u,width:d,props:f}=t,[p,m]=(0,K.useState)(v(i,r)),[h,g]=(0,K.useState)(v(i,r));(0,K.useEffect)(()=>{r!==void 0&&m(r)},[r]);let _=(0,K.useCallback)((e,t,r,a)=>{f?.onChange?.(e,t,r,a),n(u,e,t,r,a),i?g(t):t&&!Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,`name`)&&m(t)},[u,i,n,f]);return(0,q.jsxs)(W,{width:d,className:`SdsAutocompleteMultiColumn-column-root`,children:[(0,q.jsx)(G,{className:`SdsAutocompleteMultiColumn-column-title`,children:u}),(0,q.jsx)(H,{label:a,InputBaseProps:o,open:s,multiple:i,inputValue:c,options:t.options,onChange:_,value:i?h:p,search:!1,...l,...t.props,groupBy:void 0})]});function v(e,t){return t===void 0?e?[]:null:t}}})),Y,X,me,he,ge,_e=e((()=>{y(),g(),P(),T(),Y=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`],X=w(s,{shouldForwardProp:e=>!Y.includes(e)||e===`anchorEl`,target:`e48e76h3`})(e=>{let t=p(e),n=h(e),r=l(e),i=c(e);return`
      background-color: ${m(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${i?.none};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      padding: ${r?.s}px ${r?.xs}px ${r?.xs}px;
      box-sizing: border-box;
      z-index: 1400;

      .${f.popper}.${f.popperDisablePortal} {
        position: relative !important;
        transform: none !important;
      
        .MuiPaper-root .${f.listbox} {
          padding: 0;
        }
      }
    `},`;`),me=w(_,{shouldForwardProp:e=>!Y.includes(e),target:`e48e76h2`})(e=>{let t=h(e);return`
      background-color: ${m(e)?.base?.surfacePrimary};
      background-image: none;
      box-shadow: ${t?.none};
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
    `},`;`),he=w(`div`,{target:`e48e76h1`})({name:`zjik7`,styles:`display:flex`}),ge=w(I,{shouldForwardProp:e=>!Y.includes(e),target:`e48e76h0`})(({search:e})=>!e&&`height: 0; display: none; margin: 0 !important;`,` margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`)})),ve,ye,be=e((()=>{g(),T(),ve=d(`div`)`
  ${e=>{let t=l(e);return`
      position: relative;
      width: 1px;
      background-color: ${m(e)?.base?.divider};
      margin: 0 ${t?.xs}px;
    `}}
`,ye=d(`span`)`
  ${e=>{let t=l(e),n=i(e),r=m(e);return`
      background-color: ${r?.base?.surfacePrimary};
      position: absolute;
      right: -${t?.xs}px;
      top: -${t?.xxxs}px;

      svg {
        color: ${r?.base?.ornamentDisabled};
        width: ${n?.xs.width}px;
        height: ${n?.xs.height}px;
      }
    `}}
`})),xe,Se,Ce=e((()=>{be(),xe=t(r()),Se=({icon:e})=>(0,xe.jsx)(ve,{children:e&&(0,xe.jsx)(ye,{children:e})})})),Z,Q,we,Te=e((()=>{g(),Z=t(n()),A(),N(),pe(),_e(),ae(),Ce(),O(),Q=t(r()),we=e=>{let{InputBaseProps:t,open:n,PopperPlacement:r=`bottom-start`,PopperBaseProps:i,search:a=!1,label:o=`Search`,onClickAway:s,onClick:c,ClickAwayListenerProps:l,options:d,onInputChange:f,onBlur:p,multiple:m,value:h,onChange:g,PopperComponent:_=X,...y}=e,b=u(),x=n!==void 0,[S,C]=(0,Z.useState)(``),[w,T]=(0,Z.useState)(x?n:!1);(0,Z.useEffect)(()=>{x&&T(n)},[x,n]);let E=(0,Z.useRef)(null),[D,O]=Z.useState(null);ie(E),(0,Z.useEffect)(()=>{O(E?.current)},[E]);let[A,M]=(0,Z.useState)({});(0,Z.useEffect)(()=>{h!==void 0&&M(h)},[d,h]);let ee=(e,t,n,r,i)=>{M(t=>({...t,[e]:n})),g?.(t,{...A,[e]:n},r,i)};return(0,Q.jsx)(v,{onClickAway:ne,...l,children:(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(ge,{id:`location-search`,label:o,placeholder:o,value:S,onChange:P,onClick:N,onBlur:I,ref:E,search:a,onKeyDown:re,slotProps:{input:{...t?.ref,endAdornment:(0,Q.jsx)(F,{position:`end`,children:S&&(0,Q.jsx)(j,{"aria-label":`clear-button`,className:`input-search-clear-icon`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,onClick:te,backgroundOnHover:!1,children:(0,Q.jsx)(k,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:`text`,startAdornment:(0,Q.jsx)(F,{position:`start`,children:(0,Q.jsx)(j,{"aria-label":`search-button`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,Q.jsx)(k,{sdsIcon:`Search`,sdsSize:`s`})})})}},...t}),D&&(0,Q.jsx)(_,{modifiers:[{name:`offset`,options:{offset:[0,b.app?.spacing.s]}}],open:w,anchorEl:D,placement:r,disablePortal:!0,...i,children:(0,Q.jsx)(he,{className:`SdsAutocompleteMultiColumn-wrapper`,children:d.map((e,n)=>(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsx)(J,{autocompleteProps:e,onValueChange:ee,value:A?A[e.name]:void 0,multiple:m,label:o,InputBaseProps:{...t,autoFocus:!1,tabIndex:-1},popperOpen:w,inputValue:S,slots:{paper:me},...y},e.name),n<d.length-1&&(0,Q.jsx)(Se,{icon:e.icon})]},e.name+n))})})]})});function te(){C(``),f?.({target:{value:``}},``,`clear`)}function N(e){c?.(e),!x&&T(!w)}function P(e){C(e.target.value),f&&(e.target.value===``?f(e,``,`clear`):f(e,e.target.value,`input`))}function I(t){e.clearOnBlur&&C(``),p?.(t)}function ne(e){if(w){if(s?.(e,`blur`),x)return;T(!1)}}function re(t){if(e?.onKeyDown)e?.onKeyDown?.(t);else if(t.key===`Backspace`&&t.stopPropagation(),t.key===`Escape`){if(x){c?.();return}T(!1)}else T(!0)}}})),$,Ee,De=e((()=>{n(),U(),z(),Te(),_e(),$=t(r()),Ee=e=>{let{options:t,value:n,onChange:r,...i}=e;return t&&t[0]&&`options`in t[0]?t.length>1?(0,$.jsx)(we,{options:t,value:n,onChange:r,...i,groupBy:void 0}):(0,$.jsx)(H,{options:t[0].options,value:n,onChange:r,...i}):(0,$.jsx)(H,{options:t,onChange:r,value:n,...i})}}));export{R as a,_e as i,De as n,z as o,X as r,Ee as t};