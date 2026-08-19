import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Dn as i,E as a,Eo as o,Hn as s,K as c,La as l,On as u,Q as d,Ur as f,bo as p,dn as m,ea as h,gn as g,hn as _,ki as v,ko as y,ln as b,mn as x,oa as S,on as C,so as w,uo as T,vo as E,za as D}from"./iframe-CLRePdsX.js";import{n as O,t as k}from"./Icon-Dm0VxswF.js";import{n as A,t as j}from"./Button-DCR2_tBD.js";import{a as M,s as ee,t as te}from"./utils-BxIa431Z.js";import{i as N,n as P,r as F,t as I}from"./InputSearch-O-zML8WP.js";import{n as ne,t as re}from"./MenuItem-BQQzcuBl.js";import{n as ie,t as L}from"./userTabbing-DMqq17KB.js";var R,ae,oe,se,z,ce,le,B=e((()=>{r(),s(),P(),a(),u(),R=[`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`PopperBaseProps`,`onClickAway`,`hasGroupBy`],ae=y(h,{shouldForwardProp:e=>!R.includes(e),target:`eelfr3l5`})(`+.`,T.popper,`>.`,T.paper,` .`,T.groupLabel,`{`,d,`;}`,e=>{let{search:t,groupBy:n}=e,r=g(e),i=C(e),a=x(e);return`
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

      & + .${T.popper} > .${T.paper} {
        .${T.listbox} {
          max-height: 40vh;
          /* (v9): the listbox now renders as a MenuList, which (unlike MUI's
             default AutocompleteListbox) has no overflow. Restore it so the
             listbox is the scrollable region instead of the Paper. */
          overflow: auto;
          padding: 0 ${n?0:r?.xs}px;

          .${T.option} {
            min-height: unset;

            &.${T.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }

            &[aria-selected="true"] {
              background-color: ${a?.base?.surfacePrimary};
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${T.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }
          }

          & > li:last-child .${T.groupUl} {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }

        .${T.groupLabel} {
          top: 0;
          color: ${a?.base?.textSecondary};
          background-color: ${a?.base?.surfacePrimary};
          padding: 0 ${r?.m}px;
        }

        .${T.groupUl} {
          position: relative;
          margin: 0 0 ${r?.s}px;
          border-bottom: ${i?.base?.divider};
          padding: ${r?.xxs}px ${r?.xs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .${T.noOptions} {
          padding: ${r?.xxs}px ${r?.m}px ${r?.xs}px;
        }

        .${T.loading} {
          padding: 0 ${r?.xs}px;
        }
      }
    `},`;`),oe=y(`div`,{shouldForwardProp:e=>!R.includes(e),target:`eelfr3l4`})(e=>{let{search:t}=e;if(!t)return`
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
        margin: 0;
        speak: none;
      `},`;`),se=y(I,{shouldForwardProp:e=>!R.includes(e),target:`eelfr3l3`})(`background-color:transparent!important;margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`),z=y(l,{target:`eelfr3l2`})(e=>{let t=b(e),n=_(e),r=C(e),a=g(e),o=x(e);return`
      background-image: none;
      padding: ${a?.xs}px 0;
      background-color: ${o?.base?.surfacePrimary};
      border: ${r?.none};
      outline: 1px solid ${i(o?.base?.borderSecondary||`#000`,15)};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      box-sizing: border-box;
    `},`;`),ce=y(`div`,{target:`eelfr3l1`})(c,` `,e=>{let{disabled:t}=e,n=x(e);return`
      color: ${t?n?.base?.textDisabled:n?.base?.textSecondary};
      white-space: pre-wrap;
    `},`;`),le=y(`div`,{target:`eelfr3l0`})({name:`1fttcpj`,styles:`display:flex;flex-direction:column`})})),V,H,ue,U,W=e((()=>{s(),V=t(n()),D(),M(),A(),O(),N(),ne(),B(),L(),H=t(o()),ue=t(n()),U=e=>{let{multiple:t,disableCloseOnSelect:n=t,getOptionLabel:r=q,InputBaseProps:i=te,isOptionEqualToValue:a=J,keepSearchOnSelect:o=!1,label:s=`Label`,loading:c=!1,loadingText:l=``,noOptionsText:u=`No options`,onInputChange:d=ee,renderOption:m=fe,renderValue:h=Y,search:g=!1,clearOnBlur:_=!1,blurOnSelect:v=!t,onClickAway:y,onClick:b,onOpen:x,onClose:C,disabled:T,intent:E=`default`}=e,D=p(),O=(0,V.useRef)(null),[A,M]=(0,V.useState)(``);ie(O);let N=ne(),P=(0,V.useRef)(null),I=L(P);return(0,H.jsx)(ae,{ref:O,clearOnBlur:_,disableCloseOnSelect:n,disablePortal:!0,renderValue:h,loading:c,loadingText:l,noOptionsText:u,renderOption:m,getOptionLabel:r,isOptionEqualToValue:a,inputValue:A,renderInput:B,multiple:t,onOpen:W,onClose:G,...e,blurOnSelect:t?!1:v,onBlur:U,onInputChange:K,disabled:T||!g,onChange:R,slots:{paper:z,popper:N,listbox:I,...e.slots}});function ne(){return(0,V.useCallback)(e=>(0,H.jsx)(S,{modifiers:[{enabled:!0,name:`offset`,options:{offset:[0,D.app?.spacing.s]}}],...e}),[])}function L(e){return(0,V.useMemo)(()=>(0,V.forwardRef)(function(t,n){let r=w(n,e);return(0,H.jsx)(f,{...t,ref:r})}),[])}function R(t,n,r,i){if(P.current){let e=P.current.scrollTop;requestAnimationFrame(()=>{P.current&&(P.current.scrollTop=e)})}e.onChange?.(t,n,r,i)}function B(e){return(0,H.jsx)(oe,{search:g,children:(0,H.jsx)(se,{id:`location-search`,"aria-label":`Search Input`,tabIndex:g?0:-1,"aria-hidden":!g,label:s,placeholder:s,ref:e.slotProps.input.ref,search:g,onKeyDown:e=>{e.key===`Backspace`&&e.stopPropagation()},slotProps:{htmlInput:e.slotProps.htmlInput,input:{...e.slotProps.input.ref,"aria-hidden":!g,endAdornment:(0,H.jsx)(F,{position:`end`,children:A&&(0,H.jsx)(j,{tabIndex:g?0:-1,"aria-hidden":!g,disabled:!g,"aria-label":`Clear Button`,className:`input-search-clear-icon`,onClick:de,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,H.jsx)(k,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:g?`text`:`none`,startAdornment:(0,H.jsx)(F,{position:`start`,children:(0,H.jsx)(j,{"aria-label":`Search Button`,tabIndex:g?0:-1,"aria-hidden":!g,disabled:!g,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,H.jsx)(k,{sdsIcon:`Search`,sdsSize:`s`})})})}},intent:E,...i})})}function U(t){_&&M(``),e.onBlur?.(t)}function W(e){x?.(e),b?.(e)}function G(e,t){C?.(e,t),y?.(e,t)}function K(e,n,r){t?r===`clear`?M(``):(r===`input`||r===`reset`&&!o)&&M(n):M(r===`input`?n:``),d&&d(e,n,r)}function de(){M(``),d&&d({target:{value:``}},``,`clear`)}function q(e){return typeof e==`object`&&`name`in e?e.name:e.toString()}function J(e,t){return typeof t==`object`&&t&&`name`in t?e.name===t.name:e.name===t}function Y(){return null}function fe(e,n,{selected:i}){let a,{component:o,details:s,count:c,icon:l,sdsIconProps:u,disabled:d,...f}=n,p=r(n);return a=o||(0,H.jsxs)(le,{children:[p,s&&(0,H.jsx)(ce,{disabled:d,className:`menuItem-details`,children:s})]}),(0,ue.createElement)(re,{column:c,disabled:d||e[`aria-disabled`]===!0,icon:l,sdsIconProps:u,isMultiSelect:t,selected:i,...e,...f,key:n.name},a)}}})),G,K,de=e((()=>{r(),a(),G=y(`div`,{target:`e1teds5i1`})(e=>{let{width:t=280}=e;return`
      position: relative;
      width: ${t}px;
    `},`;`),K=y(`p`,{target:`e1teds5i0`})(d,` `,e=>{let t=g(e);return`
      color: ${x(e)?.base?.textSecondary};
      padding: 0 ${t?.xs}px ${t?.xxs}px;
      margin: 0;
    `},`;`)})),q,J,Y,fe=e((()=>{q=t(n()),W(),de(),J=t(o()),Y=e=>{let{autocompleteProps:t,onValueChange:n,value:r,multiple:i,label:a,InputBaseProps:o,popperOpen:s,inputValue:c,...l}=e,{name:u,width:d,props:f}=t,[p,m]=(0,q.useState)(v(i,r)),[h,g]=(0,q.useState)(v(i,r));(0,q.useEffect)(()=>{r!==void 0&&m(r)},[r]);let _=(0,q.useCallback)((e,t,r,a)=>{f?.onChange?.(e,t,r,a),n(u,e,t,r,a),i?g(t):t&&!Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,`name`)&&m(t)},[u,i,n,f]);return(0,J.jsxs)(G,{width:d,className:`SdsAutocompleteMultiColumn-column-root`,children:[(0,J.jsx)(K,{className:`SdsAutocompleteMultiColumn-column-title`,children:u}),(0,J.jsx)(U,{label:a,InputBaseProps:o,open:s,multiple:i,inputValue:c,options:t.options,onChange:_,value:i?h:p,search:!1,...l,...t.props,groupBy:void 0})]});function v(e,t){return t===void 0?e?[]:null:t}}})),X,pe,me,he,ge,_e=e((()=>{r(),s(),P(),a(),X=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`],pe=y(S,{shouldForwardProp:e=>!X.includes(e)||e===`anchorEl`,target:`e48e76h3`})(e=>{let t=b(e),n=_(e),r=g(e),i=C(e);return`
      background-color: ${x(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${i?.none};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      padding: ${r?.s}px ${r?.xs}px ${r?.xs}px;
      box-sizing: border-box;
      z-index: 1400;

      .${T.popper}.${T.popperDisablePortal} {
        position: relative !important;
        transform: none !important;
      
        .MuiPaper-root .${T.listbox} {
          padding: 0;
        }
      }
    `},`;`),me=y(l,{shouldForwardProp:e=>!X.includes(e),target:`e48e76h2`})(e=>{let t=_(e);return`
      background-color: ${x(e)?.base?.surfacePrimary};
      background-image: none;
      box-shadow: ${t?.none};
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
    `},`;`),he=y(`div`,{target:`e48e76h1`})({name:`zjik7`,styles:`display:flex`}),ge=y(I,{shouldForwardProp:e=>!X.includes(e),target:`e48e76h0`})(({search:e})=>!e&&`height: 0; display: none; margin: 0 !important;`,` margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`)})),ve,ye,be=e((()=>{s(),a(),ve=E(`div`)`
  ${e=>{let t=g(e);return`
      position: relative;
      width: 1px;
      background-color: ${x(e)?.base?.divider};
      margin: 0 ${t?.xs}px;
    `}}
`,ye=E(`span`)`
  ${e=>{let t=g(e),n=m(e),r=x(e);return`
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
`})),xe,Se,Ce=e((()=>{be(),xe=t(o()),Se=({icon:e})=>(0,xe.jsx)(ve,{children:e&&(0,xe.jsx)(ye,{children:e})})})),Z,Q,we,Te=e((()=>{s(),Z=t(n()),A(),N(),fe(),_e(),L(),Ce(),O(),Q=t(o()),we=e=>{let{InputBaseProps:t,open:n,PopperPlacement:r=`bottom-start`,PopperBaseProps:i,search:a=!1,label:o=`Search`,onClickAway:s,onClick:c,ClickAwayListenerProps:l,options:u,onInputChange:d,onBlur:f,multiple:m,value:h,onChange:g,PopperComponent:_=pe,...y}=e,b=p(),x=n!==void 0,[S,C]=(0,Z.useState)(``),[w,T]=(0,Z.useState)(x?n:!1);(0,Z.useEffect)(()=>{x&&T(n)},[x,n]);let E=(0,Z.useRef)(null),[D,O]=Z.useState(null);ie(E),(0,Z.useEffect)(()=>{O(E?.current)},[E]);let[A,M]=(0,Z.useState)({});(0,Z.useEffect)(()=>{h!==void 0&&M(h)},[u,h]);let ee=(e,t,n,r,i)=>{M(t=>({...t,[e]:n})),g?.(t,{...A,[e]:n},r,i)};return(0,Q.jsx)(v,{onClickAway:ne,...l,children:(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(ge,{id:`location-search`,label:o,placeholder:o,value:S,onChange:P,onClick:N,onBlur:I,ref:E,search:a,onKeyDown:re,slotProps:{input:{...t?.ref,endAdornment:(0,Q.jsx)(F,{position:`end`,children:S&&(0,Q.jsx)(j,{"aria-label":`clear-button`,className:`input-search-clear-icon`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,onClick:te,backgroundOnHover:!1,children:(0,Q.jsx)(k,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:`text`,startAdornment:(0,Q.jsx)(F,{position:`start`,children:(0,Q.jsx)(j,{"aria-label":`search-button`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,Q.jsx)(k,{sdsIcon:`Search`,sdsSize:`s`})})})}},...t}),D&&(0,Q.jsx)(_,{modifiers:[{name:`offset`,options:{offset:[0,b.app?.spacing.s]}}],open:w,anchorEl:D,placement:r,disablePortal:!0,...i,children:(0,Q.jsx)(he,{className:`SdsAutocompleteMultiColumn-wrapper`,children:u.map((e,n)=>(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsx)(Y,{autocompleteProps:e,onValueChange:ee,value:A?A[e.name]:void 0,multiple:m,label:o,InputBaseProps:{...t,autoFocus:!1,tabIndex:-1},popperOpen:w,inputValue:S,slots:{paper:me},...y},e.name),n<u.length-1&&(0,Q.jsx)(Se,{icon:e.icon})]},e.name+n))})})]})});function te(){C(``),d?.({target:{value:``}},``,`clear`)}function N(e){c?.(e),!x&&T(!w)}function P(e){C(e.target.value),d&&(e.target.value===``?d(e,``,`clear`):d(e,e.target.value,`input`))}function I(t){e.clearOnBlur&&C(``),f?.(t)}function ne(e){if(w){if(s?.(e,`blur`),x)return;T(!1)}}function re(t){if(e?.onKeyDown)e?.onKeyDown?.(t);else if(t.key===`Backspace`&&t.stopPropagation(),t.key===`Escape`){if(x){c?.();return}T(!1)}else T(!0)}}})),$,Ee,De=e((()=>{n(),W(),B(),Te(),_e(),$=t(o()),Ee=e=>{let{options:t,value:n,onChange:r,...i}=e;return t&&t[0]&&`options`in t[0]?t.length>1?(0,$.jsx)(we,{options:t,value:n,onChange:r,...i,groupBy:void 0}):(0,$.jsx)(U,{options:t[0].options,value:n,onChange:r,...i}):(0,$.jsx)(U,{options:t,onChange:r,value:n,...i})}}));export{z as a,_e as i,De as n,B as o,pe as r,Ee as t};