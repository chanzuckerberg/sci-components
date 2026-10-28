import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Ar as r,Hr as i,Ht as a,Mr as o,Sr as s,Vr as c,Yn as l,Zn as u,nt as d,pn as f,t as p,yn as m,yr as h}from"./material-DlyzFPof.js";import{t as g}from"./jsx-runtime-cM__dR4X.js";import{Bt as _,D as v,Ft as y,Gt as b,Rt as x,Ut as S,Wt as C,nn as w,rn as T,t as E,x as D}from"./iframe-TnbieWZB.js";import{n as O,t as k}from"./Icon-P6YZrEvk.js";import{n as A,t as j}from"./Button-2LRnNJDR.js";import{a as M,s as ee,t as te}from"./utils-CbT4iKc5.js";import{i as N,n as P,r as F,t as I}from"./InputSearch-BlsFTsZb.js";import{n as ne,t as re}from"./MenuItem-D-pIRuGY.js";import{n as ie,t as L}from"./userTabbing-C9xYrOXt.js";var R,ae,oe,se,z,ce,le,B=t((()=>{i(),p(),P(),E(),T(),R=[`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`PopperBaseProps`,`onClickAway`,`hasGroupBy`],ae=c(f,{shouldForwardProp:e=>!R.includes(e),target:`eelfr3l5`})(`+.`,s.popper,`>.`,s.paper,` .`,s.groupLabel,`{`,v,`;}`,e=>{let{search:t,groupBy:n}=e,r=b(e),i=y(e),a=S(e);return`
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

      & + .${s.popper} > .${s.paper} {
        .${s.listbox} {
          max-height: 40vh;
          /* (v9): the listbox now renders as a MenuList, which (unlike MUI's
             default AutocompleteListbox) has no overflow. Restore it so the
             listbox is the scrollable region instead of the Paper. */
          overflow: auto;
          padding: 0 ${n?0:r?.xs}px;

          .${s.option} {
            min-height: unset;

            &.${s.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }

            &[aria-selected="true"] {
              background-color: ${a?.base?.surfacePrimary};
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${s.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }
          }

          & > li:last-child .${s.groupUl} {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }

        .${s.groupLabel} {
          top: 0;
          color: ${a?.base?.textSecondary};
          background-color: ${a?.base?.surfacePrimary};
          padding: 0 ${r?.m}px;
        }

        .${s.groupUl} {
          position: relative;
          margin: 0 0 ${r?.s}px;
          border-bottom: ${i?.base?.divider};
          padding: ${r?.xxs}px ${r?.xs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .${s.noOptions} {
          padding: ${r?.xxs}px ${r?.m}px ${r?.xs}px;
        }

        .${s.loading} {
          padding: 0 ${r?.xs}px;
        }
      }
    `},`;`),oe=c(`div`,{shouldForwardProp:e=>!R.includes(e),target:`eelfr3l4`})(e=>{let{search:t}=e;if(!t)return`
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
        margin: 0;
        speak: none;
      `},`;`),se=c(I,{shouldForwardProp:e=>!R.includes(e),target:`eelfr3l3`})(`background-color:transparent!important;margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`),z=c(l,{target:`eelfr3l2`})(e=>{let t=x(e),n=C(e),r=y(e),i=b(e),a=S(e);return`
      background-image: none;
      padding: ${i?.xs}px 0;
      background-color: ${a?.base?.surfacePrimary};
      border: ${r?.none};
      outline: 1px solid ${w(a?.base?.borderSecondary||`#000`,15)};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      box-sizing: border-box;
    `},`;`),ce=c(`div`,{target:`eelfr3l1`})(D,` `,e=>{let{disabled:t}=e,n=S(e);return`
      color: ${t?n?.base?.textDisabled:n?.base?.textSecondary};
      white-space: pre-wrap;
    `},`;`),le=c(`div`,{target:`eelfr3l0`})({name:`1fttcpj`,styles:`display:flex;flex-direction:column`})})),V,H,ue,U,W=t((()=>{p(),V=e(n()),u(),M(),A(),O(),N(),ne(),B(),L(),H=e(g()),ue=e(n()),U=e=>{let{multiple:t,disableCloseOnSelect:n=t,getOptionLabel:r=q,InputBaseProps:i=te,isOptionEqualToValue:a=J,keepSearchOnSelect:s=!1,label:c=`Label`,loading:l=!1,loadingText:u=``,noOptionsText:f=`No options`,onInputChange:p=ee,renderOption:g=fe,renderValue:_=Y,search:v=!1,clearOnBlur:y=!1,blurOnSelect:b=!t,onClickAway:x,onClick:S,onOpen:C,onClose:w,disabled:T,intent:E=`default`}=e,D=o(),O=(0,V.useRef)(null),[A,M]=(0,V.useState)(``);ie(O);let N=ne(),P=(0,V.useRef)(null),I=L(P);return(0,H.jsx)(ae,{ref:O,clearOnBlur:y,disableCloseOnSelect:n,disablePortal:!0,renderValue:_,loading:l,loadingText:u,noOptionsText:f,renderOption:g,getOptionLabel:r,isOptionEqualToValue:a,inputValue:A,renderInput:B,multiple:t,onOpen:W,onClose:G,...e,blurOnSelect:!t&&b,onBlur:U,onInputChange:K,disabled:T||!v,onChange:R,slots:{paper:z,popper:N,listbox:I,...e.slots}});function ne(){return(0,V.useCallback)(e=>(0,H.jsx)(m,{modifiers:[{enabled:!0,name:`offset`,options:{offset:[0,D.app?.spacing.s]}}],...e}),[])}function L(e){return(0,V.useMemo)(()=>(0,V.forwardRef)(function(t,n){let r=h(n,e);return(0,H.jsx)(d,{...t,ref:r})}),[])}function R(t,n,r,i){if(P.current){let e=P.current.scrollTop;requestAnimationFrame(()=>{P.current&&(P.current.scrollTop=e)})}e.onChange?.(t,n,r,i)}function B(e){return(0,H.jsx)(oe,{search:v,children:(0,H.jsx)(se,{id:`location-search`,"aria-label":`Search Input`,tabIndex:v?0:-1,"aria-hidden":!v,label:c,placeholder:c,ref:e.slotProps.input.ref,search:v,onKeyDown:e=>{e.key===`Backspace`&&e.stopPropagation()},slotProps:{htmlInput:e.slotProps.htmlInput,input:{...e.slotProps.input.ref,"aria-hidden":!v,endAdornment:(0,H.jsx)(F,{position:`end`,children:A&&(0,H.jsx)(j,{tabIndex:v?0:-1,"aria-hidden":!v,disabled:!v,"aria-label":`Clear Button`,className:`input-search-clear-icon`,onClick:de,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,H.jsx)(k,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:v?`text`:`none`,startAdornment:(0,H.jsx)(F,{position:`start`,children:(0,H.jsx)(j,{"aria-label":`Search Button`,tabIndex:v?0:-1,"aria-hidden":!v,disabled:!v,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,H.jsx)(k,{sdsIcon:`Search`,sdsSize:`s`})})})}},intent:E,...i})})}function U(t){y&&M(``),e.onBlur?.(t)}function W(e){C?.(e),S?.(e)}function G(e,t){w?.(e,t),x?.(e,t)}function K(e,n,r){t?r===`clear`?M(``):(r===`input`||r===`reset`&&!s)&&M(n):M(r===`input`?n:``),p&&p(e,n,r)}function de(){M(``),p&&p({target:{value:``}},``,`clear`)}function q(e){return typeof e==`object`&&`name`in e?e.name:e.toString()}function J(e,t){return typeof t==`object`&&t&&`name`in t?e.name===t.name:e.name===t}function Y(){return null}function fe(e,n,{selected:i}){let a,{component:o,details:s,count:c,icon:l,sdsIconProps:u,disabled:d,...f}=n,p=r(n);return a=o||(0,H.jsxs)(le,{children:[p,s&&(0,H.jsx)(ce,{disabled:d,className:`menuItem-details`,children:s})]}),(0,ue.createElement)(re,{column:c,disabled:d||e[`aria-disabled`]===!0,icon:l,sdsIconProps:u,isMultiSelect:t,selected:i,...e,...f,key:n.name},a)}}})),G,K,de=t((()=>{i(),E(),G=c(`div`,{target:`e1teds5i1`})(e=>{let{width:t=280}=e;return`
      position: relative;
      width: ${t}px;
    `},`;`),K=c(`p`,{target:`e1teds5i0`})(v,` `,e=>{let t=b(e);return`
      color: ${S(e)?.base?.textSecondary};
      padding: 0 ${t?.xs}px ${t?.xxs}px;
      margin: 0;
    `},`;`)})),q,J,Y,fe=t((()=>{q=e(n()),W(),de(),J=e(g()),Y=e=>{let{autocompleteProps:t,onValueChange:n,value:r,multiple:i,label:a,InputBaseProps:o,popperOpen:s,inputValue:c,...l}=e,{name:u,width:d,props:f}=t,[p,m]=(0,q.useState)(v(i,r)),[h,g]=(0,q.useState)(v(i,r));(0,q.useEffect)(()=>{r!==void 0&&m(r)},[r]);let _=(0,q.useCallback)((e,t,r,a)=>{f?.onChange?.(e,t,r,a),n(u,e,t,r,a),i?g(t):t&&!Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,`name`)&&m(t)},[u,i,n,f]);return(0,J.jsxs)(G,{width:d,className:`SdsAutocompleteMultiColumn-column-root`,children:[(0,J.jsx)(K,{className:`SdsAutocompleteMultiColumn-column-title`,children:u}),(0,J.jsx)(U,{label:a,InputBaseProps:o,open:s,multiple:i,inputValue:c,options:t.options,onChange:_,value:i?h:p,search:!1,...l,...t.props,groupBy:void 0})]});function v(e,t){return t===void 0?e?[]:null:t}}})),X,pe,me,he,ge,_e=t((()=>{i(),p(),P(),E(),X=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`],pe=c(m,{shouldForwardProp:e=>!X.includes(e)||e===`anchorEl`,target:`e48e76h3`})(e=>{let t=x(e),n=C(e),r=b(e),i=y(e);return`
      background-color: ${S(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${i?.none};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      padding: ${r?.s}px ${r?.xs}px ${r?.xs}px;
      box-sizing: border-box;
      z-index: 1400;

      .${s.popper}.${s.popperDisablePortal} {
        position: relative !important;
        transform: none !important;
      
        .MuiPaper-root .${s.listbox} {
          padding: 0;
        }
      }
    `},`;`),me=c(l,{shouldForwardProp:e=>!X.includes(e),target:`e48e76h2`})(e=>{let t=C(e);return`
      background-color: ${S(e)?.base?.surfacePrimary};
      background-image: none;
      box-shadow: ${t?.none};
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
    `},`;`),he=c(`div`,{target:`e48e76h1`})({name:`zjik7`,styles:`display:flex`}),ge=c(I,{shouldForwardProp:e=>!X.includes(e),target:`e48e76h0`})(({search:e})=>!e&&`height: 0; display: none; margin: 0 !important;`,` margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`)})),ve,ye,be=t((()=>{p(),E(),ve=r(`div`)`
  ${e=>{let t=b(e);return`
      position: relative;
      width: 1px;
      background-color: ${S(e)?.base?.divider};
      margin: 0 ${t?.xs}px;
    `}}
`,ye=r(`span`)`
  ${e=>{let t=b(e),n=_(e),r=S(e);return`
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
`})),xe,Se,Ce=t((()=>{be(),xe=e(g()),Se=({icon:e})=>(0,xe.jsx)(ve,{children:e&&(0,xe.jsx)(ye,{children:e})})})),Z,Q,we,Te=t((()=>{p(),Z=e(n()),A(),N(),fe(),_e(),L(),Ce(),O(),Q=e(g()),we=e=>{let{InputBaseProps:t,open:n,PopperPlacement:r=`bottom-start`,PopperBaseProps:i,search:s=!1,label:c=`Search`,onClickAway:l,onClick:u,ClickAwayListenerProps:d,options:f,onInputChange:p,onBlur:m,multiple:h,value:g,onChange:_,PopperComponent:v=pe,...y}=e,b=o(),x=n!==void 0,[S,C]=(0,Z.useState)(``),[w,T]=(0,Z.useState)(x?n:!1);(0,Z.useEffect)(()=>{x&&T(n)},[x,n]);let E=(0,Z.useRef)(null),[D,O]=Z.useState(null);ie(E),(0,Z.useEffect)(()=>{O(E?.current)},[E]);let[A,M]=(0,Z.useState)({});(0,Z.useEffect)(()=>{g!==void 0&&M(g)},[f,g]);let ee=(e,t,n,r,i)=>{M(t=>({...t,[e]:n})),_?.(t,{...A,[e]:n},r,i)};return(0,Q.jsx)(a,{onClickAway:ne,...d,children:(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(ge,{id:`location-search`,label:c,placeholder:c,value:S,onChange:P,onClick:N,onBlur:I,ref:E,search:s,onKeyDown:re,slotProps:{input:{...t?.ref,endAdornment:(0,Q.jsx)(F,{position:`end`,children:S&&(0,Q.jsx)(j,{"aria-label":`clear-button`,className:`input-search-clear-icon`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,onClick:te,backgroundOnHover:!1,children:(0,Q.jsx)(k,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:`text`,startAdornment:(0,Q.jsx)(F,{position:`start`,children:(0,Q.jsx)(j,{"aria-label":`search-button`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,Q.jsx)(k,{sdsIcon:`Search`,sdsSize:`s`})})})}},...t}),D&&(0,Q.jsx)(v,{modifiers:[{name:`offset`,options:{offset:[0,b.app?.spacing.s]}}],open:w,anchorEl:D,placement:r,disablePortal:!0,...i,children:(0,Q.jsx)(he,{className:`SdsAutocompleteMultiColumn-wrapper`,children:f.map((e,n)=>(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsx)(Y,{autocompleteProps:e,onValueChange:ee,value:A?A[e.name]:void 0,multiple:h,label:c,InputBaseProps:{...t,autoFocus:!1,tabIndex:-1},popperOpen:w,inputValue:S,slots:{paper:me},...y},e.name),n<f.length-1&&(0,Q.jsx)(Se,{icon:e.icon})]},e.name+n))})})]})});function te(){C(``),p?.({target:{value:``}},``,`clear`)}function N(e){u?.(e),!x&&T(!w)}function P(e){C(e.target.value),p&&(e.target.value===``?p(e,``,`clear`):p(e,e.target.value,`input`))}function I(t){e.clearOnBlur&&C(``),m?.(t)}function ne(e){if(w){if(l?.(e,`blur`),x)return;T(!1)}}function re(t){if(e?.onKeyDown)e?.onKeyDown?.(t);else if(t.key===`Backspace`&&t.stopPropagation(),t.key===`Escape`){if(x){u?.();return}T(!1)}else T(!0)}}})),$,Ee,De=t((()=>{n(),W(),B(),Te(),_e(),$=e(g()),Ee=e=>{let{options:t,value:n,onChange:r,...i}=e;return t&&t[0]&&`options`in t[0]?t.length>1?(0,$.jsx)(we,{options:t,value:n,onChange:r,...i,groupBy:void 0}):(0,$.jsx)(U,{options:t[0].options,value:n,onChange:r,...i}):(0,$.jsx)(U,{options:t,onChange:r,value:n,...i})}}));export{z as a,_e as i,De as n,B as o,pe as r,Ee as t};