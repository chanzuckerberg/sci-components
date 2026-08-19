import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-CLRePdsX.js";import{n as i,t as a}from"./Autocomplete-Dd-bGueK.js";import{n as o,t as s}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-LXEOAXt6.js";import{n as c,t as l}from"./AUTOCOMPLETE_MULTI_COLUMN_OPTIONS-DwTLLSXg.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./constants-CXXVOOEG.js";var _,v,y=e((()=>{o(),i(),h(),_=t(r()),v=e=>{let{label:t,multiple:n,options:r=s,search:i,keepSearchOnSelect:o}=e;return(0,_.jsx)(`div`,{style:p,children:(0,_.jsx)(a,{id:`autocomplete-demo`,disableCloseOnSelect:n,label:t,multiple:n,keepSearchOnSelect:o,options:r,search:i,getOptionDisabled:e=>!!e.disabled,...e})})}})),b,x,S=e((()=>{o(),h(),i(),b=t(r()),x=e=>{let{multiple:t,options:n=s,search:r}=e;return(0,b.jsx)(`div`,{style:p,children:(0,b.jsx)(a,{open:!0,search:r,label:`Search`,multiple:t,disableCloseOnSelect:t,options:n,groupBy:e=>e.section,...e})})}})),C,w,T,E=e((()=>{o(),C=t(n()),i(),h(),w=t(r()),T=e=>{let{label:t,multiple:n,options:r=s}=e,[i,o]=(0,C.useState)(!0);return(0,w.jsx)(`div`,{style:p,children:(0,w.jsx)(a,{onClickAway:()=>{o(!1)},onClick:()=>{o(!i)},open:i,id:`autocomplete-demo`,disableCloseOnSelect:n,label:t,multiple:n,options:r,getOptionDisabled:e=>e.name===`Type: feature request`,...e})})}})),D,O,k,A,j,M,N,P;e((()=>{h(),y(),S(),E(),o(),c(),D=t(r()),O={argTypes:{groupBy:{control:{labels:[`No group by`,`Group by section names`],type:`select`},mapping:m,options:Object.keys(m)},intent:{control:{type:`radio`},options:[`default`,`negative`,`notice`,`positive`]},keepSearchOnSelect:{control:{type:`boolean`}},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},onChange:{control:{labels:[`Noop`,`console.log(value)`],type:`select`},mapping:u,options:Object.keys(u)},options:{control:{labels:[`One Column`,`Two Columns`,`Three Columns`],type:`select`},mapping:g,options:Object.keys(g)}},component:v,parameters:{axe:{disabledRules:[`aria-input-field-name`,`aria-required-children`,`aria-required-parent`,`button-name`,`color-contrast`,`list`,`listitem`]}},title:`Components/Dropdowns/Autocomplete`},k={args:{groupBy:m[1],keepSearchOnSelect:!0,label:d,multiple:!0,onChange:u[1],search:!0},parameters:{controls:{exclude:[`search`]}}},A={args:{groupBy:m[1],keepSearchOnSelect:!1,label:d,multiple:!0,onChange:u[1],options:s,search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}}},j={args:{groupBy:m[1],keepSearchOnSelect:!1,label:d,multiple:!0,onChange:u[1],options:l,search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}}},M={args:{groupBy:m[1],keepSearchOnSelect:!0,label:d,multiple:!0,options:g[1],search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,D.jsx)(T,{...e})},N={args:{keepSearchOnSelect:!1,multiple:!0,search:!0},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,D.jsx)(x,{"data-testid":`autocomplete-base`,...e})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS[1],
    search: true
  },
  parameters: {
    controls: {
      exclude: ["search"]
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS[1],
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
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS[1],
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
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    options: AUTOCOMPLETE_DATA_OPTIONS[1],
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
}`,...N.parameters?.docs?.source}}},P=[`Default`,`SingleColumn`,`MultiColumn`,`ControlledOpen`,`Test`]}))();export{M as ControlledOpen,k as Default,j as MultiColumn,A as SingleColumn,N as Test,P as __namedExportsOrder,O as default};