import{c as e,i as t,r as n,s as r}from"./preload-helper-DbRxMUml.js";import{Bn as i,Kn as a,Kr as o,U as s,W as c,X as l,Xn as u,Zn as d,cr as f,jn as p,st as m,t as h,xn as g,zn as _}from"./iframe-DI6qETgL.js";import{n as v,t as y}from"./Icon-BvRFwTEr.js";import{n as b,t as x}from"./Callout-BE_VME0K.js";import{n as S,t as C}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-DJ2R9ntu.js";import{n as w,t as T}from"./TagFilter-CRB6ZqZi.js";import{n as E,t as D}from"./MenuSelect-DgnzRn8E.js";var O=n((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),Object.defineProperty(e,`default`,{enumerable:!0,get:function(){return t.createSvgIcon}});var t=(_(),r(i))})),k=n((e=>{var t=a();Object.defineProperty(e,`__esModule`,{value:!0}),e.default=void 0;var n=t(O()),r=f();e.default=(0,n.default)((0,r.jsx)(`path`,{d:`M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z`}),`ExpandMore`)}));function A({value:e,multiple:t,onDelete:n}){if(!e)return null;if(!t){let{name:t}=e;return(0,j.jsx)(T,{label:t,onDelete:n,style:{marginTop:4}})}return(0,j.jsx)(j.Fragment,{children:e.map(e=>{let{name:t}=e;return(0,j.jsx)(T,{label:t,onDelete:()=>n(e),style:{marginTop:4}},t)})})}var j,M,N,P,F,I,L,R,z,B,V,H;t((()=>{d(),j=f(),M=e(k()),m(),N=e(o()),E(),b(),v(),S(),h(),w(),P=u(g,{target:`e1i07nm11`})(e=>{let t=s(e),n=l(e),r=c(e);return`
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
    `},`;`),F=u(p,{target:`e1i07nm10`})({name:`1w0r4u6`,styles:`& span{width:100%;}& svg{height:16px;width:16px;}&:hover,&:focus{color:#0366d6;}color:#586069;font-size:13px;font-weight:600;padding-bottom:8px;text-align:left;width:100%`}),I=e=>{let{multiple:t,options:n=C,search:r}=e,[i,a]=(0,N.useState)(null),[o,s]=(0,N.useState)(t?[]:null),[c,l]=(0,N.useState)([]),u=!!i,d=u?`github-label`:void 0;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(x,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,j.jsx)(y,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,j.jsxs)(j.Fragment,{children:[`The `,(0,j.jsx)(`strong`,{children:`MenuSelect`}),` component is deprecated!`,(0,j.jsx)(`br`,{}),`Please use `,(0,j.jsx)(`strong`,{children:`Dropdown`}),` or`,` `,(0,j.jsx)(`strong`,{children:`Autocomplete`}),` component instead.`]})}),(0,j.jsxs)(`div`,{style:{width:221},children:[(0,j.jsxs)(F,{disableRipple:!0,"aria-describedby":d,onClick:f,children:[(0,j.jsx)(`span`,{children:`Click Target`}),(0,j.jsx)(M.default,{})]}),(0,j.jsx)(P,{disablePortal:!0,id:d,open:u,anchorEl:i,placement:`bottom-start`,modifiers:[{name:`offset`,options:{offset:[0,8]}}],children:(0,j.jsx)(D,{open:!0,search:r,onClose:p,multiple:t,value:t?c:o,onChange:m,disableCloseOnSelect:t,options:n,onInputChange:(e,t,n)=>{t&&console.log(`input value: `,t)},...e})}),(0,j.jsx)(`div`,{style:{marginTop:4},children:(0,j.jsx)(A,{value:o,multiple:t,onDelete:h})})]})]});function f(e){t&&l(o),a(e.currentTarget)}function p(e,n){if(t){if(n===`toggleInput`)return;s(c)}i&&i.focus(),a(null)}function m(e,n){if(t)return l(n);s(n)}function h(e){if(!t)return s(null);s(o.filter(t=>t!==e))}},L={argTypes:{keepSearchOnSelect:{control:{type:`boolean`}},multiple:{control:{type:`boolean`}},search:{control:{type:`boolean`}}},component:I,tags:[`deprecated`],title:`Deprecated/MenuSelect`},R={args:{keepSearchOnSelect:!1,multiple:!1,search:!1}},z={args:{keepSearchOnSelect:!1,multiple:!1,search:!0}},B={args:{keepSearchOnSelect:!1,multiple:!0,search:!1}},V={args:{InputBaseProps:{placeholder:`Custom placeholder...`},keepSearchOnSelect:!0,multiple:!0,search:!0}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: false
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: true
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: false
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    InputBaseProps: {
      placeholder: "Custom placeholder..."
    },
    keepSearchOnSelect: true,
    multiple: true,
    search: true
  }
}`,...V.parameters?.docs?.source}}},H=[`Default`,`SingleSelectWithSearch`,`MultiSelect`,`MultiSelectWithSearch`]}))();export{R as Default,B as MultiSelect,V as MultiSelectWithSearch,z as SingleSelectWithSearch,H as __namedExportsOrder,L as default};