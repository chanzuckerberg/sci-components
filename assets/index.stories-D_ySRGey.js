import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./Autocomplete-B1bwC__d.js";import{n as o,t as s}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-DNgT6sxL.js";import{n as c,t as l}from"./AUTOCOMPLETE_MULTI_COLUMN_OPTIONS-xUnI9PWC.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./constants-Dbfyx2FZ.js";var _,v,y=t((()=>{o(),i(),h(),_=e(r()),v=e=>{let{label:t,multiple:n,options:r=s,search:i,keepSearchOnSelect:o}=e;return(0,_.jsx)(`div`,{style:p,children:(0,_.jsx)(a,{id:`autocomplete-demo`,disableCloseOnSelect:n,label:t,multiple:n,keepSearchOnSelect:o,options:r,search:i,getOptionDisabled:e=>!!e.disabled,...e})})}})),b,x,S=t((()=>{o(),h(),i(),b=e(r()),x=e=>{let{multiple:t,options:n=s,search:r}=e;return(0,b.jsx)(`div`,{style:p,children:(0,b.jsx)(a,{open:!0,search:r,label:`Search`,multiple:t,disableCloseOnSelect:t,options:n,groupBy:e=>e.section,...e})})}})),C,w,T,E=t((()=>{o(),C=e(n()),i(),h(),w=e(r()),T=e=>{let{label:t,multiple:n,options:r=s}=e,[i,o]=(0,C.useState)(!0);return(0,w.jsx)(`div`,{style:p,children:(0,w.jsx)(a,{onClickAway:()=>{o(!1)},onClick:()=>{o(!i)},open:i,id:`autocomplete-demo`,disableCloseOnSelect:n,label:t,multiple:n,options:r,getOptionDisabled:e=>e.name===`Type: feature request`,...e})})}})),D,O,k,A,j,M,N,P;t((()=>{h(),y(),S(),E(),o(),c(),D=e(r()),O={argTypes:{groupBy:{control:{labels:{none:`No group by`,section:`Group by section names`},type:`select`},description:"If provided, the options will be grouped under the returned string. The groupBy value is also used as the text for group headings when `renderGroup` is not provided.",mapping:m,options:Object.keys(m)},intent:{control:{type:`radio`},description:`Validation styling on the search field. Single column only; the multi-column field does not take it.`,options:[`default`,`negative`,`notice`,`positive`],table:{defaultValue:{summary:`default`}}},keepSearchOnSelect:{control:{type:`boolean`},description:`For a multi-select, leaves the typed text in place after a selection instead of clearing it.`,table:{defaultValue:{summary:`false`}}},label:{control:{type:`text`},description:`The search field's label and placeholder. It defaults to "Search" when the options are laid out in columns.`,table:{defaultValue:{summary:`Label`}}},multiple:{control:{type:`boolean`},description:"If `true`, `value` must be an array and the menu will support multiple selections.",table:{defaultValue:{summary:`false`}}},onChange:{control:{labels:{noop:`Noop`,log:`console.log(value)`},type:`select`},description:"Fired on every selection change with the whole value. `details.option` is the one that just changed.",mapping:u,options:Object.keys(u)},options:{control:{labels:{oneColumn:`One Column`,twoColumns:`Two Columns`,threeColumns:`Three Columns`},type:`select`},description:`The options, or an array of named columns each with their own options.`,mapping:g,options:Object.keys(g)}},component:v,parameters:{a11y:{config:{rules:[{enabled:!1,id:`aria-input-field-name`},{enabled:!1,id:`aria-required-children`},{enabled:!1,id:`aria-required-parent`},{enabled:!1,id:`button-name`},{enabled:!1,id:`color-contrast`},{enabled:!1,id:`list`},{enabled:!1,id:`listitem`}]}}},title:`Components/Dropdowns/Autocomplete`},k={args:{groupBy:m.section,keepSearchOnSelect:!0,label:d,multiple:!0,onChange:u.log,search:!0},parameters:{controls:{exclude:[`search`]}}},A={args:{groupBy:m.section,keepSearchOnSelect:!1,label:d,multiple:!0,onChange:u.log,options:s,search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}}},j={args:{groupBy:m.section,keepSearchOnSelect:!1,label:d,multiple:!0,onChange:u.log,options:l,search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}}},M={args:{groupBy:m.section,keepSearchOnSelect:!0,label:d,multiple:!0,options:g.twoColumns,search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,D.jsx)(T,{...e})},N={args:{keepSearchOnSelect:!1,multiple:!0,search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,D.jsx)(x,{"data-testid":`autocomplete-base`,...e})},P=[`Default`,`SingleColumn`,`MultiColumn`,`ControlledOpen`,`Test`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS.log,
    search: true
  },
  parameters: {
    controls: {
      exclude: ["search"]
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS.log,
    options: AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search: true
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS.log,
    options: AUTOCOMPLETE_MULTI_COLUMN_OPTIONS,
    search: true
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    options: AUTOCOMPLETE_DATA_OPTIONS.twoColumns,
    search: true
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ControlledOpenDemo {...args} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: true
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo data-testid="autocomplete-base" {...args} />
}`,...N.parameters?.docs?.source}}}}))();export{M as ControlledOpen,k as Default,j as MultiColumn,A as SingleColumn,N as Test,P as __namedExportsOrder,O as default};