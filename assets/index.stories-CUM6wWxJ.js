import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,E as i,Eo as a,Hn as o,Ta as s,cn as c,hn as l,ko as u,ln as d,oa as f}from"./iframe-s0DqqZ6S.js";import{n as p,t as m}from"./Icon-BAm62WT8.js";import{n as h,t as g}from"./Callout-oiikP58h.js";import{a as _,i as v}from"./icons-material-CKvQxvvp.js";import{n as y,t as b}from"./TagFilter-BOhXbYKc.js";import{n as x,t as S}from"./MenuSelect-HVU5GzYl.js";import{n as C,t as w}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-BrQmHom8.js";function T({value:e,multiple:t,onDelete:n}){if(!e)return null;if(!t){let{name:t}=e;return(0,E.jsx)(b,{label:t,onDelete:n,style:{marginTop:4}})}return(0,E.jsx)(E.Fragment,{children:e.map(e=>{let{name:t}=e;return(0,E.jsx)(b,{label:t,onDelete:()=>n(e),style:{marginTop:4}},t)})})}var E,D,O,k,A,j,M,N,P,F,I;e((()=>{r(),E=t(a()),_(),o(),D=t(n()),x(),h(),p(),C(),i(),y(),O=u(f,{target:`e1i07nm11`})(e=>{let t=c(e),n=l(e),r=d(e);return`
      & .MuiInputBase-root {
        padding: 0 6px;
      }

      & .MuiAutocomplete-option[aria-selected='true'],
      & .MuiAutocomplete-option[data-focus='true'] {
        background-color: transparent,
      }

      & .MuiAutocomplete-popper.MuiAutocomplete-popperDisablePortal {
        position: relative !important;
        transform: none !important;
        width: 100% !important;
      }

      .MuiAutocomplete-paper {
        box-shadow: none;
        margin: 0;

        .MuiAutocomplete-listbox {
          padding: 8px;
        }
      }

      background-color: white;
      border: 1px solid ${t?.gray[100]};
      border-radius: ${r?.m}px;
      box-shadow: ${n?.m};
      color: #586069;
      font-size: 13px;
      width: 300px;
      z-index: 1;
    `},`;`),k=u(s,{target:`e1i07nm10`})({name:`1w0r4u6`,styles:`& span{width:100%;}& svg{height:16px;width:16px;}&:hover,&:focus{color:#0366d6;}color:#586069;font-size:13px;font-weight:600;padding-bottom:8px;text-align:left;width:100%`}),A=e=>{let{multiple:t,options:n=w,search:r}=e,[i,a]=(0,D.useState)(null),[o,s]=(0,D.useState)(t?[]:null),[c,l]=(0,D.useState)([]),u=!!i,d=u?`github-label`:void 0;return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(g,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,E.jsx)(m,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,E.jsxs)(E.Fragment,{children:[`The `,(0,E.jsx)(`strong`,{children:`MenuSelect`}),` component is deprecated!`,(0,E.jsx)(`br`,{}),`Please use `,(0,E.jsx)(`strong`,{children:`Dropdown`}),` or`,` `,(0,E.jsx)(`strong`,{children:`Autocomplete`}),` component instead.`]})}),(0,E.jsxs)(`div`,{style:{width:221},children:[(0,E.jsxs)(k,{disableRipple:!0,"aria-describedby":d,onClick:f,children:[(0,E.jsx)(`span`,{children:`Click Target`}),(0,E.jsx)(v,{})]}),(0,E.jsx)(O,{disablePortal:!0,id:d,open:u,anchorEl:i,placement:`bottom-start`,modifiers:[{name:`offset`,options:{offset:[0,8]}}],children:(0,E.jsx)(S,{open:!0,search:r,onClose:p,multiple:t,value:t?c:o,onChange:h,disableCloseOnSelect:t,options:n,onInputChange:(e,t,n)=>{t&&console.log(`input value: `,t)},...e})}),(0,E.jsx)(`div`,{style:{marginTop:4},children:(0,E.jsx)(T,{value:o,multiple:t,onDelete:_})})]})]});function f(e){t&&l(o),a(e.currentTarget)}function p(e,n){if(t){if(n===`toggleInput`)return;s(c)}i&&i.focus(),a(null)}function h(e,n){if(t)return l(n);s(n)}function _(e){if(!t)return s(null);s(o.filter(t=>t!==e))}},j={argTypes:{keepSearchOnSelect:{control:{type:`boolean`}},multiple:{control:{type:`boolean`}},search:{control:{type:`boolean`}}},component:A,title:`Deprecated/MenuSelect`},M={args:{keepSearchOnSelect:!1,multiple:!1,search:!1}},N={args:{keepSearchOnSelect:!1,multiple:!1,search:!0}},P={args:{keepSearchOnSelect:!1,multiple:!0,search:!1}},F={args:{InputBaseProps:{placeholder:`Custom placeholder...`},keepSearchOnSelect:!0,multiple:!0,search:!0}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: false
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: true
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: false
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    InputBaseProps: {
      placeholder: "Custom placeholder..."
    },
    keepSearchOnSelect: true,
    multiple: true,
    search: true
  }
}`,...F.parameters?.docs?.source}}},I=[`Default`,`SingleSelectWithSearch`,`MultiSelect`,`MultiSelectWithSearch`]}))();export{M as Default,P as MultiSelect,F as MultiSelectWithSearch,N as SingleSelectWithSearch,I as __namedExportsOrder,j as default};