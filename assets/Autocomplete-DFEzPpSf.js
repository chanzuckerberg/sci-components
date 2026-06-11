import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Gn as n,K as r,Kr as i,Ln as a,S as o,V as s,W as c,Wn as l,X as u,Xn as d,Y as f,Z as p,Zn as m,_ as h,cr as g,gn as _,hn as v,nn as y,nt as b,st as x,t as S,tt as C,xn as w}from"./iframe-DI6qETgL.js";import{n as T,t as E}from"./Icon-BvRFwTEr.js";import{a as D,s as O,t as ee}from"./utils-B1uyFjm5.js";import{n as k,t as A}from"./Button-K7qsdWHe.js";import{i as j,n as M,r as N,t as P}from"./InputSearch-DbDcVnzt.js";import{n as F,t as te}from"./MenuItem-Bc4FptOd.js";import{n as ne,t as I}from"./userTabbing-BKV7DYw0.js";var L,R,re,ie,ae,oe,se,z=t((()=>{m(),x(),M(),S(),b(),L=[`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`PopperBaseProps`,`onClickAway`,`hasGroupBy`],R=d(v,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l5`})(`+.`,_.popper,`>.`,_.paper,` .`,_.groupLabel,`{`,o,`;}`,e=>{let{search:t,groupBy:n}=e,r=p(e),i=s(e),a=f(e);return`
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

      & + .${_.popper} > .${_.paper} {
        .${_.listbox} {
          max-height: 40vh;
          padding: 0 ${n?0:r?.xs}px;

          .${_.option} {
            min-height: unset;

            &.${_.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }

            &[aria-selected="true"] {
              background-color: ${a?.base?.surfacePrimary};
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${_.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }
          }

          & > li:last-child .${_.groupUl} {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }

        .${_.groupLabel} {
          top: 0;
          color: ${a?.base?.textSecondary};
          background-color: ${a?.base?.surfacePrimary};
          padding: 0 ${r?.m}px;
        }

        .${_.groupUl} {
          position: relative;
          margin: 0 0 ${r?.s}px;
          border-bottom: ${i?.base?.divider};
          padding: ${r?.xxs}px ${r?.xs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .${_.noOptions} {
          padding: ${r?.xxs}px ${r?.m}px ${r?.xs}px;
        }

        .${_.loading} {
          padding: 0 ${r?.xs}px;
        }
      }
    `},`;`),re=d(`div`,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l4`})(e=>{let{search:t}=e;if(!t)return`
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
        margin: 0;
        speak: none;
      `},`;`),ie=d(P,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l3`})(`margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`),ae=d(a,{target:`eelfr3l2`})(e=>{let t=c(e),n=u(e),r=s(e),i=p(e),a=f(e);return`
      background-image: none;
      padding: ${i?.xs}px 0;
      background-color: ${a?.base?.surfacePrimary};
      border: ${r?.none};
      outline: 1px solid ${C(a?.base?.borderSecondary||`#000`,15)};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      box-sizing: border-box;
    `},`;`),oe=d(`div`,{target:`eelfr3l1`})(h,` `,e=>{let{disabled:t}=e,n=f(e);return`
      color: ${t?n?.base?.textDisabled:n?.base?.textSecondary};
      white-space: pre-wrap;
    `},`;`),se=d(`div`,{target:`eelfr3l0`})({name:`1fttcpj`,styles:`display:flex;flex-direction:column`})})),B,V,ce,H,U=t((()=>{x(),B=e(i()),D(),k(),T(),j(),F(),z(),I(),V=g(),ce=e(i()),H=e=>{let{multiple:t,disableCloseOnSelect:r=t,getOptionLabel:i=U,InputBaseProps:a=ee,isOptionEqualToValue:o=W,keepSearchOnSelect:s=!1,label:c=`Label`,loading:l=!1,loadingText:u=``,noOptionsText:d=`No options`,onInputChange:f=O,renderOption:p=le,renderTags:m=G,search:h=!1,clearOnBlur:g=!1,blurOnSelect:_=!t,onClickAway:v,onClick:y,onOpen:b,onClose:x,disabled:S,intent:C=`default`}=e,T=n(),D=(0,B.useRef)(null),[k,j]=(0,B.useState)(``);return ne(D),(0,V.jsx)(R,{ref:D,clearOnBlur:g,disableCloseOnSelect:r,disablePortal:!0,renderTags:m,loading:l,loadingText:u,noOptionsText:d,PaperComponent:ae,PopperComponent:M(),renderOption:p,getOptionLabel:i,isOptionEqualToValue:o,inputValue:k,renderInput:P,multiple:t,onOpen:I,onClose:L,...e,blurOnSelect:t?!1:_,onBlur:F,onInputChange:z,disabled:S||!h});function M(){return(0,B.useCallback)(e=>(0,V.jsx)(w,{modifiers:[{enabled:!0,name:`offset`,options:{offset:[0,T.app?.spacing.s]}}],...e}),[])}function P(e){return(0,V.jsx)(re,{search:h,children:(0,V.jsx)(ie,{id:`location-search`,"aria-label":`Search Input`,tabIndex:h?0:-1,"aria-hidden":!h,label:c,placeholder:c,ref:e.InputProps.ref,search:h,onKeyDown:e=>{e.key===`Backspace`&&e.stopPropagation()},InputProps:{...e.InputProps.ref,"aria-hidden":!h,endAdornment:(0,V.jsx)(N,{position:`end`,children:k&&(0,V.jsx)(A,{tabIndex:h?0:-1,"aria-hidden":!h,disabled:!h,"aria-label":`Clear Button`,className:`input-search-clear-icon`,onClick:H,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,V.jsx)(E,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:h?`text`:`none`,inputProps:e.inputProps,startAdornment:(0,V.jsx)(N,{position:`start`,children:(0,V.jsx)(A,{"aria-label":`Search Button`,tabIndex:h?0:-1,"aria-hidden":!h,disabled:!h,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,V.jsx)(E,{sdsIcon:`Search`,sdsSize:`s`})})})},intent:C,...a})})}function F(t){g&&j(``),e.onBlur?.(t)}function I(e){b?.(e),y?.(e)}function L(e,t){x?.(e,t),v?.(e,t)}function z(e,n,r){t?r===`clear`?j(``):(r===`input`||r===`reset`&&!s)&&j(n):j(r===`input`?n:``),f&&f(e,n,r)}function H(){j(``),f&&f({target:{value:``}},``,`clear`)}function U(e){return typeof e==`object`&&`name`in e?e.name:e.toString()}function W(e,t){return e.name===t.name}function G(){return null}function le(e,n,{selected:r}){let a,{component:o,details:s,count:c,icon:l,sdsIconProps:u,disabled:d,...f}=n,p=i(n);return a=o||(0,V.jsxs)(se,{children:[p,s&&(0,V.jsx)(oe,{disabled:d,className:`menuItem-details`,children:s})]}),(0,ce.createElement)(te,{column:c,disabled:d||e[`aria-disabled`]===!0,icon:l,sdsIconProps:u,isMultiSelect:t,selected:r,...e,...f,key:n.name},a)}}})),W,G,le=t((()=>{m(),S(),W=d(`div`,{target:`e1teds5i1`})(e=>{let{width:t=280}=e;return`
      position: relative;
      width: ${t}px;
    `},`;`),G=d(`p`,{target:`e1teds5i0`})(o,` `,e=>{let t=p(e);return`
      color: ${f(e)?.base?.textSecondary};
      padding: 0 ${t?.xs}px ${t?.xxs}px;
      margin: 0;
    `},`;`)})),K,q,ue,de=t((()=>{K=e(i()),U(),le(),q=g(),ue=e=>{let{autocompleteProps:t,onValueChange:n,value:r,multiple:i,label:a,InputBaseProps:o,popperOpen:s,inputValue:c,PaperComponent:l,...u}=e,{name:d,width:f,props:p}=t,[m,h]=(0,K.useState)(y(i,r)),[g,_]=(0,K.useState)(y(i,r));(0,K.useEffect)(()=>{r!==void 0&&h(r)},[r]);let v=(0,K.useCallback)((e,t,r,a)=>{p?.onChange?.(e,t,r,a),n(d,e,t,r,a),i?_(t):t&&!Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,`name`)&&h(t)},[d,i,n,p]);return(0,q.jsxs)(W,{width:f,className:`SdsAutocompleteMultiColumn-column-root`,children:[(0,q.jsx)(G,{className:`SdsAutocompleteMultiColumn-column-title`,children:d}),(0,q.jsx)(H,{label:a,InputBaseProps:o,open:s,multiple:i,inputValue:c,options:t.options,onChange:v,value:i?g:m,search:!1,PaperComponent:l,...u,...t.props,groupBy:void 0})]});function y(e,t){return t===void 0?e?[]:null:t}}})),J,Y,fe,pe,me,he=t((()=>{m(),x(),M(),S(),J=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`],Y=d(w,{shouldForwardProp:e=>!J.includes(e)||e===`anchorEl`,target:`e48e76h3`})(e=>{let t=c(e),n=u(e),r=p(e),i=s(e);return`
      background-color: ${f(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${i?.none};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      padding: ${r?.s}px ${r?.xs}px ${r?.xs}px;
      box-sizing: border-box;
      z-index: 1400;

      .${_.popper}.${_.popperDisablePortal} {
        position: relative !important;
        transform: none !important;
      
        .MuiPaper-root .${_.listbox} {
          padding: 0;
        }
      }
    `},`;`),fe=d(a,{shouldForwardProp:e=>!J.includes(e),target:`e48e76h2`})(e=>{let t=u(e);return`
      background-color: ${f(e)?.base?.surfacePrimary};
      background-image: none;
      box-shadow: ${t?.none};
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
    `},`;`),pe=d(`div`,{target:`e48e76h1`})({name:`zjik7`,styles:`display:flex`}),me=d(P,{shouldForwardProp:e=>!J.includes(e),target:`e48e76h0`})(({search:e})=>!e&&`height: 0; display: none; margin: 0 !important;`,` margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`)})),ge,_e,ve=t((()=>{x(),S(),ge=l(`div`)`
  ${e=>{let t=p(e);return`
      position: relative;
      width: 1px;
      background-color: ${f(e)?.base?.divider};
      margin: 0 ${t?.xs}px;
    `}}
`,_e=l(`span`)`
  ${e=>{let t=p(e),n=r(e),i=f(e);return`
      background-color: ${i?.base?.surfacePrimary};
      position: absolute;
      right: -${t?.xs}px;
      top: -${t?.xxxs}px;

      svg {
        color: ${i?.base?.ornamentDisabled};
        width: ${n?.xs.width}px;
        height: ${n?.xs.height}px;
      }
    `}}
`})),X,ye,be=t((()=>{ve(),X=g(),ye=({icon:e})=>(0,X.jsx)(ge,{children:e&&(0,X.jsx)(_e,{children:e})})})),Z,Q,xe,Se=t((()=>{x(),Z=e(i()),k(),j(),de(),he(),I(),be(),T(),Q=g(),xe=e=>{let{InputBaseProps:t,open:r,PopperPlacement:i=`bottom-start`,PopperBaseProps:a,search:o=!1,label:s=`Search`,onClickAway:c,onClick:l,ClickAwayListenerProps:u,options:d,onInputChange:f,onBlur:p,multiple:m,value:h,onChange:g,PopperComponent:_=Y,...v}=e,b=n(),x=r!==void 0,[S,C]=(0,Z.useState)(``),[w,T]=(0,Z.useState)(x?r:!1);(0,Z.useEffect)(()=>{x&&T(r)},[x,r]);let D=(0,Z.useRef)(null),[O,ee]=Z.useState(null);ne(D),(0,Z.useEffect)(()=>{ee(D?.current)},[D]);let[k,j]=(0,Z.useState)({});(0,Z.useEffect)(()=>{h!==void 0&&j(h)},[d,h]);let M=(e,t,n,r,i)=>{j(t=>({...t,[e]:n})),g?.(t,{...k,[e]:n},r,i)};return(0,Q.jsx)(y,{onClickAway:L,...u,children:(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(me,{id:`location-search`,label:s,placeholder:s,value:S,onChange:te,onClick:F,onBlur:I,ref:D,search:o,onKeyDown:R,InputProps:{...t?.ref,endAdornment:(0,Q.jsx)(N,{position:`end`,children:S&&(0,Q.jsx)(A,{"aria-label":`clear-button`,className:`input-search-clear-icon`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,onClick:P,backgroundOnHover:!1,children:(0,Q.jsx)(E,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:`text`,startAdornment:(0,Q.jsx)(N,{position:`start`,children:(0,Q.jsx)(A,{"aria-label":`search-button`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,Q.jsx)(E,{sdsIcon:`Search`,sdsSize:`s`})})})},...t}),O&&(0,Q.jsx)(_,{modifiers:[{name:`offset`,options:{offset:[0,b.app?.spacing.s]}}],open:w,anchorEl:O,placement:i,disablePortal:!0,...a,children:(0,Q.jsx)(pe,{className:`SdsAutocompleteMultiColumn-wrapper`,children:d.map((e,n)=>(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsx)(ue,{autocompleteProps:e,onValueChange:M,value:k?k[e.name]:void 0,multiple:m,label:s,InputBaseProps:{...t,autoFocus:!1,tabIndex:-1},popperOpen:w,inputValue:S,PaperComponent:fe,...v},e.name),n<d.length-1&&(0,Q.jsx)(ye,{icon:e.icon})]},e.name+n))})})]})});function P(){C(``),f?.({target:{value:``}},``,`clear`)}function F(e){l?.(e),!x&&T(!w)}function te(e){C(e.target.value),f&&(e.target.value===``?f(e,``,`clear`):f(e,e.target.value,`input`))}function I(t){e.clearOnBlur&&C(``),p?.(t)}function L(e){if(w){if(c?.(e,`blur`),x)return;T(!1)}}function R(t){if(e?.onKeyDown)e?.onKeyDown?.(t);else if(t.key===`Backspace`&&t.stopPropagation(),t.key===`Escape`){if(x){l?.();return}T(!1)}else T(!0)}}})),$,Ce,we=t((()=>{i(),U(),z(),Se(),he(),$=g(),Ce=e=>{let{options:t,value:n,onChange:r,...i}=e;return t&&t[0]&&`options`in t[0]?t.length>1?(0,$.jsx)(xe,{options:t,value:n,onChange:r,...i,groupBy:void 0}):(0,$.jsx)(H,{options:t[0].options,value:n,onChange:r,...i}):(0,$.jsx)(H,{options:t,onChange:r,value:n,...i})}}));export{we as n,Ce as t};