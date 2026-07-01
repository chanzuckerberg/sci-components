import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Ci as r,Gi as i,K as a,Mi as o,Ni as s,Pr as c,S as l,Sr as u,Ti as d,V as f,W as p,X as m,Y as h,Z as g,Zn as _,_ as v,ct as y,fi as b,nt as x,rt as S,t as C,wr as w}from"./iframe-Bjh1LYUt.js";import{n as T,t as E}from"./Icon-D5aq3JJF.js";import{a as D,s as O,t as ee}from"./utils-CHt6irz9.js";import{n as k,t as A}from"./Button-BT0OC4_c.js";import{i as j,n as M,r as N,t as P}from"./InputSearch-DkiMu3fO.js";import{n as F,t as te}from"./MenuItem-CRtA7jtf.js";import{n as ne,t as I}from"./userTabbing-D3i8TXGz.js";var L,R,re,ie,ae,oe,se,z=t((()=>{s(),y(),M(),C(),S(),L=[`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`PopperBaseProps`,`onClickAway`,`hasGroupBy`],R=o(u,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l5`})(`+.`,w.popper,`>.`,w.paper,` .`,w.groupLabel,`{`,l,`;}`,e=>{let{search:t,groupBy:n}=e,r=g(e),i=f(e),a=h(e);return`
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

      & + .${w.popper} > .${w.paper} {
        .${w.listbox} {
          max-height: 40vh;
          padding: 0 ${n?0:r?.xs}px;

          .${w.option} {
            min-height: unset;

            &.${w.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }

            &[aria-selected="true"] {
              background-color: ${a?.base?.surfacePrimary};
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${w.focused} {
              background-color: ${a?.base?.fillPrimaryInteraction};
            }
          }

          & > li:last-child .${w.groupUl} {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }

        .${w.groupLabel} {
          top: 0;
          color: ${a?.base?.textSecondary};
          background-color: ${a?.base?.surfacePrimary};
          padding: 0 ${r?.m}px;
        }

        .${w.groupUl} {
          position: relative;
          margin: 0 0 ${r?.s}px;
          border-bottom: ${i?.base?.divider};
          padding: ${r?.xxs}px ${r?.xs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .${w.noOptions} {
          padding: ${r?.xxs}px ${r?.m}px ${r?.xs}px;
        }

        .${w.loading} {
          padding: 0 ${r?.xs}px;
        }
      }
    `},`;`),re=o(`div`,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l4`})(e=>{let{search:t}=e;if(!t)return`
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
        margin: 0;
        speak: none;
      `},`;`),ie=o(P,{shouldForwardProp:e=>!L.includes(e),target:`eelfr3l3`})(`margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`),ae=o(b,{target:`eelfr3l2`})(e=>{let t=p(e),n=m(e),r=f(e),i=g(e),a=h(e);return`
      background-image: none;
      padding: ${i?.xs}px 0;
      background-color: ${a?.base?.surfacePrimary};
      border: ${r?.none};
      outline: 1px solid ${x(a?.base?.borderSecondary||`#000`,15)};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      box-sizing: border-box;
    `},`;`),oe=o(`div`,{target:`eelfr3l1`})(v,` `,e=>{let{disabled:t}=e,n=h(e);return`
      color: ${t?n?.base?.textDisabled:n?.base?.textSecondary};
      white-space: pre-wrap;
    `},`;`),se=o(`div`,{target:`eelfr3l0`})({name:`1fttcpj`,styles:`display:flex;flex-direction:column`})})),B,V,ce,H,U=t((()=>{y(),B=e(n()),D(),k(),T(),j(),F(),z(),I(),V=i(),ce=e(n()),H=e=>{let{multiple:t,disableCloseOnSelect:n=t,getOptionLabel:r=U,InputBaseProps:i=ee,isOptionEqualToValue:a=W,keepSearchOnSelect:o=!1,label:s=`Label`,loading:l=!1,loadingText:u=``,noOptionsText:f=`No options`,onInputChange:p=O,renderOption:m=le,renderTags:h=G,search:g=!1,clearOnBlur:_=!1,blurOnSelect:v=!t,onClickAway:y,onClick:b,onOpen:x,onClose:S,disabled:C,intent:w=`default`}=e,T=d(),D=(0,B.useRef)(null),[k,j]=(0,B.useState)(``);return ne(D),(0,V.jsx)(R,{ref:D,clearOnBlur:_,disableCloseOnSelect:n,disablePortal:!0,renderTags:h,loading:l,loadingText:u,noOptionsText:f,PaperComponent:ae,PopperComponent:M(),renderOption:m,getOptionLabel:r,isOptionEqualToValue:a,inputValue:k,renderInput:P,multiple:t,onOpen:I,onClose:L,...e,blurOnSelect:t?!1:v,onBlur:F,onInputChange:z,disabled:C||!g});function M(){return(0,B.useCallback)(e=>(0,V.jsx)(c,{modifiers:[{enabled:!0,name:`offset`,options:{offset:[0,T.app?.spacing.s]}}],...e}),[])}function P(e){return(0,V.jsx)(re,{search:g,children:(0,V.jsx)(ie,{id:`location-search`,"aria-label":`Search Input`,tabIndex:g?0:-1,"aria-hidden":!g,label:s,placeholder:s,ref:e.InputProps.ref,search:g,onKeyDown:e=>{e.key===`Backspace`&&e.stopPropagation()},InputProps:{...e.InputProps.ref,"aria-hidden":!g,endAdornment:(0,V.jsx)(N,{position:`end`,children:k&&(0,V.jsx)(A,{tabIndex:g?0:-1,"aria-hidden":!g,disabled:!g,"aria-label":`Clear Button`,className:`input-search-clear-icon`,onClick:H,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,V.jsx)(E,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:g?`text`:`none`,inputProps:e.inputProps,startAdornment:(0,V.jsx)(N,{position:`start`,children:(0,V.jsx)(A,{"aria-label":`Search Button`,tabIndex:g?0:-1,"aria-hidden":!g,disabled:!g,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,V.jsx)(E,{sdsIcon:`Search`,sdsSize:`s`})})})},intent:w,...i})})}function F(t){_&&j(``),e.onBlur?.(t)}function I(e){x?.(e),b?.(e)}function L(e,t){S?.(e,t),y?.(e,t)}function z(e,n,r){t?r===`clear`?j(``):(r===`input`||r===`reset`&&!o)&&j(n):j(r===`input`?n:``),p&&p(e,n,r)}function H(){j(``),p&&p({target:{value:``}},``,`clear`)}function U(e){return typeof e==`object`&&`name`in e?e.name:e.toString()}function W(e,t){return e.name===t.name}function G(){return null}function le(e,n,{selected:i}){let a,{component:o,details:s,count:c,icon:l,sdsIconProps:u,disabled:d,...f}=n,p=r(n);return a=o||(0,V.jsxs)(se,{children:[p,s&&(0,V.jsx)(oe,{disabled:d,className:`menuItem-details`,children:s})]}),(0,ce.createElement)(te,{column:c,disabled:d||e[`aria-disabled`]===!0,icon:l,sdsIconProps:u,isMultiSelect:t,selected:i,...e,...f,key:n.name},a)}}})),W,G,le=t((()=>{s(),C(),W=o(`div`,{target:`e1teds5i1`})(e=>{let{width:t=280}=e;return`
      position: relative;
      width: ${t}px;
    `},`;`),G=o(`p`,{target:`e1teds5i0`})(l,` `,e=>{let t=g(e);return`
      color: ${h(e)?.base?.textSecondary};
      padding: 0 ${t?.xs}px ${t?.xxs}px;
      margin: 0;
    `},`;`)})),K,q,ue,de=t((()=>{K=e(n()),U(),le(),q=i(),ue=e=>{let{autocompleteProps:t,onValueChange:n,value:r,multiple:i,label:a,InputBaseProps:o,popperOpen:s,inputValue:c,PaperComponent:l,...u}=e,{name:d,width:f,props:p}=t,[m,h]=(0,K.useState)(y(i,r)),[g,_]=(0,K.useState)(y(i,r));(0,K.useEffect)(()=>{r!==void 0&&h(r)},[r]);let v=(0,K.useCallback)((e,t,r,a)=>{p?.onChange?.(e,t,r,a),n(d,e,t,r,a),i?_(t):t&&!Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,`name`)&&h(t)},[d,i,n,p]);return(0,q.jsxs)(W,{width:f,className:`SdsAutocompleteMultiColumn-column-root`,children:[(0,q.jsx)(G,{className:`SdsAutocompleteMultiColumn-column-title`,children:d}),(0,q.jsx)(H,{label:a,InputBaseProps:o,open:s,multiple:i,inputValue:c,options:t.options,onChange:v,value:i?g:m,search:!1,PaperComponent:l,...u,...t.props,groupBy:void 0})]});function y(e,t){return t===void 0?e?[]:null:t}}})),J,fe,Y,pe,me,he=t((()=>{s(),y(),M(),C(),J=[`anchorEl`,`count`,`keepSearchOnSelect`,`search`,`InputBaseProps`,`title`,`PopperBaseProps`,`onClickAway`,`ClickAwayListenerProps`],fe=o(c,{shouldForwardProp:e=>!J.includes(e)||e===`anchorEl`,target:`e48e76h3`})(e=>{let t=p(e),n=m(e),r=g(e),i=f(e);return`
      background-color: ${h(e)?.base?.surfacePrimary};
      background-image: none;
      border: ${i?.none};
      border-radius: ${t?.l}px;
      box-shadow: ${n?.m};
      padding: ${r?.s}px ${r?.xs}px ${r?.xs}px;
      box-sizing: border-box;
      z-index: 1400;

      .${w.popper}.${w.popperDisablePortal} {
        position: relative !important;
        transform: none !important;
      
        .MuiPaper-root .${w.listbox} {
          padding: 0;
        }
      }
    `},`;`),Y=o(b,{shouldForwardProp:e=>!J.includes(e),target:`e48e76h2`})(e=>{let t=m(e);return`
      background-color: ${h(e)?.base?.surfacePrimary};
      background-image: none;
      box-shadow: ${t?.none};
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
    `},`;`),pe=o(`div`,{target:`e48e76h1`})({name:`zjik7`,styles:`display:flex`}),me=o(P,{shouldForwardProp:e=>!J.includes(e),target:`e48e76h0`})(({search:e})=>!e&&`height: 0; display: none; margin: 0 !important;`,` margin:0;.MuiInputBase-root{width:100%;}caret-color:`,({search:e})=>e?`auto`:`transparent`,`;`)})),ge,_e,ve=t((()=>{y(),C(),ge=r(`div`)`
  ${e=>{let t=g(e);return`
      position: relative;
      width: 1px;
      background-color: ${h(e)?.base?.divider};
      margin: 0 ${t?.xs}px;
    `}}
`,_e=r(`span`)`
  ${e=>{let t=g(e),n=a(e),r=h(e);return`
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
`})),X,ye,be=t((()=>{ve(),X=i(),ye=({icon:e})=>(0,X.jsx)(ge,{children:e&&(0,X.jsx)(_e,{children:e})})})),Z,Q,xe,Se=t((()=>{y(),Z=e(n()),k(),j(),de(),he(),I(),be(),T(),Q=i(),xe=e=>{let{InputBaseProps:t,open:n,PopperPlacement:r=`bottom-start`,PopperBaseProps:i,search:a=!1,label:o=`Search`,onClickAway:s,onClick:c,ClickAwayListenerProps:l,options:u,onInputChange:f,onBlur:p,multiple:m,value:h,onChange:g,PopperComponent:v=fe,...y}=e,b=d(),x=n!==void 0,[S,C]=(0,Z.useState)(``),[w,T]=(0,Z.useState)(x?n:!1);(0,Z.useEffect)(()=>{x&&T(n)},[x,n]);let D=(0,Z.useRef)(null),[O,ee]=Z.useState(null);ne(D),(0,Z.useEffect)(()=>{ee(D?.current)},[D]);let[k,j]=(0,Z.useState)({});(0,Z.useEffect)(()=>{h!==void 0&&j(h)},[u,h]);let M=(e,t,n,r,i)=>{j(t=>({...t,[e]:n})),g?.(t,{...k,[e]:n},r,i)};return(0,Q.jsx)(_,{onClickAway:L,...l,children:(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(me,{id:`location-search`,label:o,placeholder:o,value:S,onChange:te,onClick:F,onBlur:I,ref:D,search:a,onKeyDown:R,InputProps:{...t?.ref,endAdornment:(0,Q.jsx)(N,{position:`end`,children:S&&(0,Q.jsx)(A,{"aria-label":`clear-button`,className:`input-search-clear-icon`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,onClick:P,backgroundOnHover:!1,children:(0,Q.jsx)(E,{sdsIcon:`XMarkCircle`,sdsSize:`s`})})}),inputMode:`text`,startAdornment:(0,Q.jsx)(N,{position:`start`,children:(0,Q.jsx)(A,{"aria-label":`search-button`,sdsType:`secondary`,size:`large`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,Q.jsx)(E,{sdsIcon:`Search`,sdsSize:`s`})})})},...t}),O&&(0,Q.jsx)(v,{modifiers:[{name:`offset`,options:{offset:[0,b.app?.spacing.s]}}],open:w,anchorEl:O,placement:r,disablePortal:!0,...i,children:(0,Q.jsx)(pe,{className:`SdsAutocompleteMultiColumn-wrapper`,children:u.map((e,n)=>(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsx)(ue,{autocompleteProps:e,onValueChange:M,value:k?k[e.name]:void 0,multiple:m,label:o,InputBaseProps:{...t,autoFocus:!1,tabIndex:-1},popperOpen:w,inputValue:S,PaperComponent:Y,...y},e.name),n<u.length-1&&(0,Q.jsx)(ye,{icon:e.icon})]},e.name+n))})})]})});function P(){C(``),f?.({target:{value:``}},``,`clear`)}function F(e){c?.(e),!x&&T(!w)}function te(e){C(e.target.value),f&&(e.target.value===``?f(e,``,`clear`):f(e,e.target.value,`input`))}function I(t){e.clearOnBlur&&C(``),p?.(t)}function L(e){if(w){if(s?.(e,`blur`),x)return;T(!1)}}function R(t){if(e?.onKeyDown)e?.onKeyDown?.(t);else if(t.key===`Backspace`&&t.stopPropagation(),t.key===`Escape`){if(x){c?.();return}T(!1)}else T(!0)}}})),$,Ce,we=t((()=>{n(),U(),z(),Se(),he(),$=i(),Ce=e=>{let{options:t,value:n,onChange:r,...i}=e;return t&&t[0]&&`options`in t[0]?t.length>1?(0,$.jsx)(xe,{options:t,value:n,onChange:r,...i,groupBy:void 0}):(0,$.jsx)(H,{options:t[0].options,value:n,onChange:r,...i}):(0,$.jsx)(H,{options:t,onChange:r,value:n,...i})}}));export{we as n,Ce as t};