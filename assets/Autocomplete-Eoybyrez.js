import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Cr as n,Fi as r,Ii as i,Jn as a,K as o,Li as s,Qa as c,S as l,V as u,W as d,X as f,Y as p,Z as m,_ as h,_r as g,cn as _,ct as v,ei as y,ji as ee,ki as b,ni as x,nt as S,rt as C,t as w,wi as T,xi as E}from"./iframe-DocVhSSI.js";import{n as D,t as O}from"./Icon-CQ-y6cAL.js";import{a as k,s as A,t as te}from"./utils-BxIa431Z.js";import{n as j,t as M}from"./Button-CfkvkcRt.js";import{i as N,n as P,r as F,t as I}from"./InputSearch-C1NfFN_U.js";import{n as L,t as ne}from"./MenuItem-DZQJDrqI.js";import{n as re,t as R}from"./userTabbing-B37ztKoX.js";var z,ie,ae,oe,se,ce,le,B=e((()=>{s(),v(),P(),w(),C(),z=[`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`PopperBaseProps`,`onClickAway`,`hasGroupBy`],ie=i(g,{shouldForwardProp:e=>!z.includes(e),target:`eelfr3l5`})(`+.`,T.popper,`>.`,T.paper,` .`,T.groupLabel,`{`,l,`;}`,e=>{let{search:t,groupBy:n}=e,r=m(e),i=u(e),a=p(e);return`
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
    `},`;`),ae=i(`div`,{shouldForwardProp:e=>!z.includes(e),target:`eelfr3l4`})(e=>{let{search:t}=e;if(!t)return`
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
        margin: 0;
        speak: none;
      `},`;`),oe=i(I,{shouldForwardProp:e=>!z.includes(e),target:`eelfr3l3`})(`background-color:transparent!important;margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`),se=i(y,{target:`eelfr3l2`})(e=>{let t=d(e),n=f(e),r=u(e),i=m(e),a=p(e);return`
      background-image: none;
      padding: ${i?.xs}px 0;
      background-color: ${a?.base?.surfacePrimary};
      border: ${r?.none};
      outline: 1px solid ${S(a?.base?.borderSecondary||`#000`,15)};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      box-sizing: border-box;
    `},`;`),ce=i(`div`,{target:`eelfr3l1`})(h,` `,e=>{let{disabled:t}=e,n=p(e);return`
      color: ${t?n?.base?.textDisabled:n?.base?.textSecondary};
      white-space: pre-wrap;
    `},`;`),le=i(`div`,{target:`eelfr3l0`})({name:`1fttcpj`,styles:`display:flex;flex-direction:column`})})),V,H,ue,U,W=e((()=>{v(),V=t(c()),x(),k(),j(),D(),N(),L(),B(),R(),H=r(),ue=t(c()),U=e=>{let{multiple:t,disableCloseOnSelect:r=t,getOptionLabel:i=q,InputBaseProps:a=te,isOptionEqualToValue:o=J,keepSearchOnSelect:s=!1,label:c=`Label`,loading:l=!1,loadingText:u=``,noOptionsText:d=`No options`,onInputChange:f=A,renderOption:p=fe,renderValue:m=Y,search:h=!1,clearOnBlur:g=!1,blurOnSelect:v=!t,onClickAway:y,onClick:b,onOpen:x,onClose:S,disabled:C,intent:w=`default`}=e,T=ee(),D=(0,V.useRef)(null),[k,j]=(0,V.useState)(``);re(D);let N=L(),P=(0,V.useRef)(null),I=R(P);return(0,H.jsx)(ie,{ref:D,clearOnBlur:g,disableCloseOnSelect:r,disablePortal:!0,renderValue:m,loading:l,loadingText:u,noOptionsText:d,renderOption:p,getOptionLabel:i,isOptionEqualToValue:o,inputValue:k,renderInput:B,multiple:t,onOpen:W,onClose:G,...e,blurOnSelect:t?!1:v,onBlur:U,onInputChange:K,disabled:C||!h,onChange:z,slots:{paper:se,popper:N,listbox:I,...e.slots}});function L(){return(0,V.useCallback)(e=>(0,H.jsx)(n,{modifiers:[{enabled:!0,name:`offset`,options:{offset:[0,T.app?.spacing.s]}}],...e}),[])}function R(e){return(0,V.useMemo)(()=>(0,V.forwardRef)(function(t,n){let r=E(n,e);return(0,H.jsx)(_,{...t,ref:r})}),[])}function z(t,n,r,i){if(P.current){let e=P.current.scrollTop;requestAnimationFrame(()=>{P.current&&(P.current.scrollTop=e)})}e.onChange?.(t,n,r,i)}function B(e){return(0,H.jsx)(ae,{search:h,children:(0,H.jsx)(oe,{id:`location-search`,"aria-label":`Search Input`,tabIndex:h?0:-1,"aria-hidden":!h,label:c,placeholder:c,ref:e.slotProps.input.ref,search:h,onKeyDown:e=>{e.key===`Backspace`&&e.stopPropagation()},slotProps:{htmlInput:e.slotProps.htmlInput,input:{...e.slotProps.input.ref,"aria-hidden":!h,endAdornment:(0,H.jsx)(F,{position:`end`,children:k&&(0,H.jsx)(M,{tabIndex:h?0:-1,"aria-hidden":!h,disabled:!h,"aria-label":`Clear Button`,className:`input-search-clear-icon`,onClick:de,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,H.jsx)(O,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:h?`text`:`none`,startAdornment:(0,H.jsx)(F,{position:`start`,children:(0,H.jsx)(M,{"aria-label":`Search Button`,tabIndex:h?0:-1,"aria-hidden":!h,disabled:!h,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,H.jsx)(O,{sdsIcon:`Search`,sdsSize:`s`})})})}},intent:w,...a})})}function U(t){g&&j(``),e.onBlur?.(t)}function W(e){x?.(e),b?.(e)}function G(e,t){S?.(e,t),y?.(e,t)}function K(e,n,r){t?r===`clear`?j(``):(r===`input`||r===`reset`&&!s)&&j(n):j(r===`input`?n:``),f&&f(e,n,r)}function de(){j(``),f&&f({target:{value:``}},``,`clear`)}function q(e){return typeof e==`object`&&`name`in e?e.name:e.toString()}function J(e,t){return typeof t==`object`&&t&&`name`in t?e.name===t.name:e.name===t}function Y(){return null}function fe(e,n,{selected:r}){let a,{component:o,details:s,count:c,icon:l,sdsIconProps:u,disabled:d,...f}=n,p=i(n);return a=o||(0,H.jsxs)(le,{children:[p,s&&(0,H.jsx)(ce,{disabled:d,className:`menuItem-details`,children:s})]}),(0,ue.createElement)(ne,{column:c,disabled:d||e[`aria-disabled`]===!0,icon:l,sdsIconProps:u,isMultiSelect:t,selected:r,...e,...f,key:n.name},a)}}})),G,K,de=e((()=>{s(),w(),G=i(`div`,{target:`e1teds5i1`})(e=>{let{width:t=280}=e;return`
      position: relative;
      width: ${t}px;
    `},`;`),K=i(`p`,{target:`e1teds5i0`})(l,` `,e=>{let t=m(e);return`
      color: ${p(e)?.base?.textSecondary};
      padding: 0 ${t?.xs}px ${t?.xxs}px;
      margin: 0;
    `},`;`)})),q,J,Y,fe=e((()=>{q=t(c()),W(),de(),J=r(),Y=e=>{let{autocompleteProps:t,onValueChange:n,value:r,multiple:i,label:a,InputBaseProps:o,popperOpen:s,inputValue:c,...l}=e,{name:u,width:d,props:f}=t,[p,m]=(0,q.useState)(v(i,r)),[h,g]=(0,q.useState)(v(i,r));(0,q.useEffect)(()=>{r!==void 0&&m(r)},[r]);let _=(0,q.useCallback)((e,t,r,a)=>{f?.onChange?.(e,t,r,a),n(u,e,t,r,a),i?g(t):t&&!Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,`name`)&&m(t)},[u,i,n,f]);return(0,J.jsxs)(G,{width:d,className:`SdsAutocompleteMultiColumn-column-root`,children:[(0,J.jsx)(K,{className:`SdsAutocompleteMultiColumn-column-title`,children:u}),(0,J.jsx)(U,{label:a,InputBaseProps:o,open:s,multiple:i,inputValue:c,options:t.options,onChange:_,value:i?h:p,search:!1,...l,...t.props,groupBy:void 0})]});function v(e,t){return t===void 0?e?[]:null:t}}})),X,pe,me,he,ge,_e=e((()=>{s(),v(),P(),w(),X=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`],pe=i(n,{shouldForwardProp:e=>!X.includes(e)||e===`anchorEl`,target:`e48e76h3`})(e=>{let t=d(e),n=f(e),r=m(e),i=u(e);return`
      background-color: ${p(e)?.base?.surfacePrimary};
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
    `},`;`),me=i(y,{shouldForwardProp:e=>!X.includes(e),target:`e48e76h2`})(e=>{let t=f(e);return`
      background-color: ${p(e)?.base?.surfacePrimary};
      background-image: none;
      box-shadow: ${t?.none};
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
    `},`;`),he=i(`div`,{target:`e48e76h1`})({name:`zjik7`,styles:`display:flex`}),ge=i(I,{shouldForwardProp:e=>!X.includes(e),target:`e48e76h0`})(({search:e})=>!e&&`height: 0; display: none; margin: 0 !important;`,` margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`)})),ve,ye,be=e((()=>{v(),w(),ve=b(`div`)`
  ${e=>{let t=m(e);return`
      position: relative;
      width: 1px;
      background-color: ${p(e)?.base?.divider};
      margin: 0 ${t?.xs}px;
    `}}
`,ye=b(`span`)`
  ${e=>{let t=m(e),n=o(e),r=p(e);return`
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
`})),xe,Se,Ce=e((()=>{be(),xe=r(),Se=({icon:e})=>(0,xe.jsx)(ve,{children:e&&(0,xe.jsx)(ye,{children:e})})})),Z,Q,we,Te=e((()=>{v(),Z=t(c()),j(),N(),fe(),_e(),R(),Ce(),D(),Q=r(),we=e=>{let{InputBaseProps:t,open:n,PopperPlacement:r=`bottom-start`,PopperBaseProps:i,search:o=!1,label:s=`Search`,onClickAway:c,onClick:l,ClickAwayListenerProps:u,options:d,onInputChange:f,onBlur:p,multiple:m,value:h,onChange:g,PopperComponent:_=pe,...v}=e,y=ee(),b=n!==void 0,[x,S]=(0,Z.useState)(``),[C,w]=(0,Z.useState)(b?n:!1);(0,Z.useEffect)(()=>{b&&w(n)},[b,n]);let T=(0,Z.useRef)(null),[E,D]=Z.useState(null);re(T),(0,Z.useEffect)(()=>{D(T?.current)},[T]);let[k,A]=(0,Z.useState)({});(0,Z.useEffect)(()=>{h!==void 0&&A(h)},[d,h]);let te=(e,t,n,r,i)=>{A(t=>({...t,[e]:n})),g?.(t,{...k,[e]:n},r,i)};return(0,Q.jsx)(a,{onClickAway:L,...u,children:(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(ge,{id:`location-search`,label:s,placeholder:s,value:x,onChange:P,onClick:N,onBlur:I,ref:T,search:o,onKeyDown:ne,slotProps:{input:{...t?.ref,endAdornment:(0,Q.jsx)(F,{position:`end`,children:x&&(0,Q.jsx)(M,{"aria-label":`clear-button`,className:`input-search-clear-icon`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,onClick:j,backgroundOnHover:!1,children:(0,Q.jsx)(O,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:`text`,startAdornment:(0,Q.jsx)(F,{position:`start`,children:(0,Q.jsx)(M,{"aria-label":`search-button`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,Q.jsx)(O,{sdsIcon:`Search`,sdsSize:`s`})})})}},...t}),E&&(0,Q.jsx)(_,{modifiers:[{name:`offset`,options:{offset:[0,y.app?.spacing.s]}}],open:C,anchorEl:E,placement:r,disablePortal:!0,...i,children:(0,Q.jsx)(he,{className:`SdsAutocompleteMultiColumn-wrapper`,children:d.map((e,n)=>(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsx)(Y,{autocompleteProps:e,onValueChange:te,value:k?k[e.name]:void 0,multiple:m,label:s,InputBaseProps:{...t,autoFocus:!1,tabIndex:-1},popperOpen:C,inputValue:x,slots:{paper:me},...v},e.name),n<d.length-1&&(0,Q.jsx)(Se,{icon:e.icon})]},e.name+n))})})]})});function j(){S(``),f?.({target:{value:``}},``,`clear`)}function N(e){l?.(e),!b&&w(!C)}function P(e){S(e.target.value),f&&(e.target.value===``?f(e,``,`clear`):f(e,e.target.value,`input`))}function I(t){e.clearOnBlur&&S(``),p?.(t)}function L(e){if(C){if(c?.(e,`blur`),b)return;w(!1)}}function ne(t){if(e?.onKeyDown)e?.onKeyDown?.(t);else if(t.key===`Backspace`&&t.stopPropagation(),t.key===`Escape`){if(b){l?.();return}w(!1)}else w(!0)}}})),$,Ee,De=e((()=>{c(),W(),B(),Te(),_e(),$=r(),Ee=e=>{let{options:t,value:n,onChange:r,...i}=e;return t&&t[0]&&`options`in t[0]?t.length>1?(0,$.jsx)(we,{options:t,value:n,onChange:r,...i,groupBy:void 0}):(0,$.jsx)(U,{options:t[0].options,value:n,onChange:r,...i}):(0,$.jsx)(U,{options:t,onChange:r,value:n,...i})}}));export{De as n,Ee as t};