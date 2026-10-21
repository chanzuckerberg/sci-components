import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Ln as i,Qn as a,Vr as o,t as s,yn as c}from"./material-DlyzFPof.js";import{t as l}from"./jsx-runtime-cM__dR4X.js";import{Lt as u,Rt as d,Wt as f,t as p}from"./iframe-DhUGD016.js";import{n as m,t as h}from"./Icon-1J9Ma-VV.js";import{n as g,t as _}from"./Callout-C3Zmdf44.js";import{t as v}from"./createSvgIcon-BbVXs3PJ.js";import{n as y,t as b}from"./Chip-xlqHajjo.js";import{n as x,t as S}from"./MenuSelect-pBAFBbgN.js";import{n as C,t as w}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-DNgT6sxL.js";var T,E,D=t((()=>{v(),T=e(l(),1),E=a((0,T.jsx)(`path`,{d:`M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z`}),`ExpandMore`)}));function O({value:e,multiple:t,onDelete:n}){if(!e)return null;if(!t){let{name:t}=e;return(0,k.jsx)(b,{label:t,onDelete:n,style:{marginTop:4}})}return(0,k.jsx)(k.Fragment,{children:e.map(e=>{let{name:t}=e;return(0,k.jsx)(b,{label:t,onDelete:()=>n(e),style:{marginTop:4}},t)})})}var k,A,j,M,N,P,F,I,L,R,z;t((()=>{r(),k=e(l()),D(),s(),A=e(n()),x(),g(),m(),C(),p(),y(),j=o(c,{target:`e1i07nm11`})(e=>{let t=u(e),n=f(e),r=d(e);return`
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
    `},`;`),M=o(i,{target:`e1i07nm10`})({name:`1w0r4u6`,styles:`& span{width:100%;}& svg{height:16px;width:16px;}&:hover,&:focus{color:#0366d6;}color:#586069;font-size:13px;font-weight:600;padding-bottom:8px;text-align:left;width:100%`}),N=e=>{let{multiple:t,options:n=w,search:r}=e,[i,a]=(0,A.useState)(null),[o,s]=(0,A.useState)(t?[]:null),[c,l]=(0,A.useState)([]),u=!!i,d=u?`github-label`:void 0;return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(_,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,k.jsx)(h,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,k.jsxs)(k.Fragment,{children:[`The `,(0,k.jsx)(`strong`,{children:`MenuSelect`}),` component is deprecated!`,(0,k.jsx)(`br`,{}),`Please use `,(0,k.jsx)(`strong`,{children:`Dropdown`}),` or`,` `,(0,k.jsx)(`strong`,{children:`Autocomplete`}),` component instead.`]})}),(0,k.jsxs)(`div`,{style:{width:221},children:[(0,k.jsxs)(M,{disableRipple:!0,"aria-describedby":d,onClick:f,children:[(0,k.jsx)(`span`,{children:`Click Target`}),(0,k.jsx)(E,{})]}),(0,k.jsx)(j,{disablePortal:!0,id:d,open:u,anchorEl:i,placement:`bottom-start`,modifiers:[{name:`offset`,options:{offset:[0,8]}}],children:(0,k.jsx)(S,{open:!0,search:r,onClose:p,multiple:t,value:t?c:o,onChange:m,disableCloseOnSelect:t,options:n,onInputChange:(e,t,n)=>{t&&console.log(`input value: `,t)},...e})}),(0,k.jsx)(`div`,{style:{marginTop:4},children:(0,k.jsx)(O,{value:o,multiple:t,onDelete:g})})]})]});function f(e){t&&l(o),a(e.currentTarget)}function p(e,n){if(t){if(n===`toggleInput`)return;s(c)}i&&i.focus(),a(null)}function m(e,n){if(t)return l(n);s(n)}function g(e){if(!t)return s(null);let n=o.filter(t=>t!==e);s(n)}},P={argTypes:{keepSearchOnSelect:{control:{type:`boolean`}},multiple:{control:{type:`boolean`}},search:{control:{type:`boolean`}}},component:N,title:`Deprecated/MenuSelect`},F={args:{keepSearchOnSelect:!1,multiple:!1,search:!1}},I={args:{keepSearchOnSelect:!1,multiple:!1,search:!0}},L={args:{keepSearchOnSelect:!1,multiple:!0,search:!1}},R={args:{InputBaseProps:{placeholder:`Custom placeholder...`},keepSearchOnSelect:!0,multiple:!0,search:!0}},z=[`Default`,`SingleSelectWithSearch`,`MultiSelect`,`MultiSelectWithSearch`],F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: false
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: true
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: false
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    InputBaseProps: {
      placeholder: "Custom placeholder..."
    },
    keepSearchOnSelect: true,
    multiple: true,
    search: true
  }
}`,...R.parameters?.docs?.source}}}}))();export{F as Default,L as MultiSelect,R as MultiSelectWithSearch,I as SingleSelectWithSearch,z as __namedExportsOrder,P as default};