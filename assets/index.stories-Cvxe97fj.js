import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Ci as r,Gi as i,Mi as a,Ni as o,ct as s,fi as c}from"./iframe-Bjh1LYUt.js";import{a as l,s as u}from"./utils-CHt6irz9.js";import{n as d,t as f}from"./Button-BT0OC4_c.js";import{n as p,t as m}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-DHBfyA1p.js";import{n as h,t as g}from"./Dropdown-JVKDwffg.js";import{a as _,i as v,n as y,o as b,r as x,s as ee,t as S}from"./constants-DlnA4xT4.js";import{n as te,t as ne}from"./Dialog-BU6stTJO.js";import{n as re,t as ie}from"./LoadingIndicator-BIKGFqp-.js";var C,w,T,E=t((()=>{C=e(n()),p(),h(),w=i(),T=e=>{let{multiple:t,options:n=m,DropdownMenuProps:r,...i}=e,[a,o]=(0,C.useState)(t?[]:null);return(0,C.useEffect)(()=>{o(t?[]:null)},[t,n]),(0,w.jsx)(g,{label:`Click Target`,onChange:s,value:a,options:n,search:!1,multiple:t,DropdownMenuProps:{groupBy:e=>e.section,width:300,...r},onOpen:c,onClose:l,getOptionDisabled:e=>!!e.disabled,...i});function s(e,t){o(t),console.log(`Dropdown Value:`,t)}function c(e){console.log(`Dropdown opened`)}function l(e,t){console.log(`Dropdown closed with reason:`,t)}}})),D,O,k,A=t((()=>{o(),D=i(),O=e(n()),p(),d(),h(),k=e=>{let[t,n]=(0,O.useState)([]);return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(a(f,{target:`e1we062v0`})({name:`1mzlom2`,styles:`&:focus{outline:none;}margin:0 0 24px 0`}),{onClick:r,sdsStyle:`minimal`,sdsType:`secondary`,children:`Click here to select the first three options`}),(0,D.jsx)(`br`,{}),(0,D.jsx)(g,{label:`Click Target`,...e,options:m,value:t,onChange:i,"data-testid":`dropdown`,DropdownMenuProps:{groupBy:e=>e.section,title:`Github Labels`,width:300},multiple:!0})]});function r(){n([...m.slice(0,3)])}function i(e,t){n(t)}}})),j,M,N=t((()=>{p(),l(),h(),j=i(),M=e=>(0,j.jsx)(g,{"data-testid":`dropdown`,label:`Click Target`,onChange:u,options:m,DropdownMenuProps:{width:300},...e})}));function P(e){return(0,F.jsx)(ne,{open:!0,disableEnforceFocus:!0,PaperComponent:I,children:(0,F.jsx)(T,{label:`Dropdown`,options:m,multiple:!0,InputDropdownProps:{sdsStyle:`square`},...e})})}var F,I,L=t((()=>{p(),te(),E(),s(),F=i(),I=r(c)`
  width: 300px;
  max-width: unset !important;
  padding: 50px;
`})),R,z,B,V=t((()=>{R=e(n()),h(),z=i(),B=()=>{let[e,t]=(0,R.useState)(null),n=(0,R.useMemo)(()=>[{count:2,name:`Item 1`},{count:0,name:`Item 2`},{count:12,name:`Item 3`}],[]);return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{style:{gridArea:`3 / 2 / 4 / 4`},children:[(0,z.jsx)(`p`,{children:`To adjust the placement of the popper, use the DropdownMenuProps property and set PopperPlacement to your desired value:`}),(0,z.jsx)(`pre`,{style:{backgroundColor:`#c3c3c347`,borderRadius:4,padding:`0px 20px`},children:`
<Dropdown
  DropdownMenuProps={{
    PopperPlacement: "bottom-start",
  }}
/>
          `})]}),(0,z.jsxs)(`div`,{style:{display:`grid`,gridColumnGap:`0px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(5, 1fr)`,gridTemplateRows:`repeat(5, 1fr)`,height:`500px`,padding:`30px`},children:[(0,z.jsx)(`div`,{style:{gridArea:`1 / 2 / 2 / 3`},children:(0,z.jsx)(g,{label:`Bottom Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`1 / 3 / 2 / 4`},children:(0,z.jsx)(g,{label:`Bottom`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`1 / 4 / 2 / 5`},children:(0,z.jsx)(g,{label:`Bottom End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-end`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`2 / 1 / 3 / 2`},children:(0,z.jsx)(g,{label:`Right Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`3 / 1 / 4 / 2`},children:(0,z.jsx)(g,{label:`Right`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`4 / 1 / 5 / 2`},children:(0,z.jsx)(g,{label:`Right End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-end`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`5 / 2 / 6 / 3`},children:(0,z.jsx)(g,{label:`Top Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`5 / 3 / 6 / 4`},children:(0,z.jsx)(g,{label:`Top`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`5 / 4 / 6 / 5`},children:(0,z.jsx)(g,{label:`Top End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-end`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`2 / 5 / 3 / 6`},children:(0,z.jsx)(g,{label:`Left Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`3 / 5 / 4 / 6`},children:(0,z.jsx)(g,{label:`Left`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`4 / 5 / 5 / 6`},children:(0,z.jsx)(g,{label:`Left End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-end`,groupBy:e=>e.section,width:150}})})]})]});function r(e,n){t(n)}}})),H,ae=t((()=>{H=[{name:`Copy`,onClick:()=>{console.log(`Copy Action Called!`)},sdsType:`action`,section:`Default`},{name:`Paste`,onClick:()=>{console.log(`Paste Action Called!`)},sdsType:`action`,section:`Default`},{icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{count:`⌘ ⌥ P`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ D`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ P`,icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`},{count:`⌘ ⌥ D`,icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`}]})),U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{re(),E(),ee(),A(),N(),L(),V(),ae(),U=i(),W={argTypes:{DropdownMenuProps:{control:{type:`object`}},InputDropdownProps:{control:{type:`object`}},buttonPosition:{control:{labels:[`left`,`right`],type:`select`},mapping:S,options:Object.keys(S)},buttons:{control:{type:`boolean`}},closeOnBlur:{control:{type:`boolean`}},disabled:{control:{type:`boolean`}},isSearchAutoFocus:{control:{type:`boolean`},defaultValue:!0},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},onChange:{control:{labels:[`NOOP`,`Log value on change`],type:`select`},mapping:_,options:Object.keys(_)},onClose:{control:{labels:[`NOOP`,`console.log('Closed!')`],type:`select`},mapping:b,options:Object.keys(b)},options:{control:{labels:[`One Column`,`Two Columns`,`Three Columns`],type:`select`},mapping:y,options:Object.keys(y)},search:{control:{type:`boolean`},defaultValue:!0},title:{control:{type:`text`}}},component:T,title:`Components/Dropdowns/Dropdown`},G={args:{DropdownMenuProps:{PopperPlacement:`bottom-start`},buttonPosition:`left`,buttons:!1,closeOnBlur:!0,disabled:!1,isSearchAutoFocus:!0,isTriggerChangeOnOptionClick:!1,label:v,multiple:!0,options:y[0],search:!0,title:`Dropdown Title`}},K={args:{buttonPosition:`left`,buttons:!0,closeOnBlur:!0,disabled:!1,isTriggerChangeOnOptionClick:!1,label:v,multiple:!0,options:y[2],search:!0,title:`Multi-Column Dropdown Title`},parameters:{controls:{exclude:x}},render:e=>(0,U.jsx)(T,{...e})},q={args:{DropdownMenuProps:{loading:!0,loadingText:(0,U.jsx)(ie,{sdsStyle:`minimal`})},label:v,options:[]},parameters:{controls:{exclude:x},snapshot:{skip:!0}}},J={args:{DropdownMenuProps:{width:200},InputDropdownProps:{width:200},options:H},parameters:{axe:{disabledRules:[`aria-dialog-name`]},controls:{exclude:x},snapshot:{skip:!0}}},Y={parameters:{axe:{disabledRules:[`aria-dialog-name`]},controls:{exclude:x},snapshot:{skip:!0}},render:e=>(0,U.jsx)(P,{...e})},X={args:{label:v},parameters:{controls:{exclude:x},snapshot:{skip:!0}},render:e=>(0,U.jsx)(k,{...e})},Z={args:{label:v},parameters:{controls:{exclude:x},snapshot:{skip:!0}},render:e=>(0,U.jsx)(B,{...e})},Q={args:{buttonPosition:`left`,label:v},parameters:{controls:{exclude:x},snapshot:{skip:!0}},render:e=>(0,U.jsx)(M,{...e})},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    DropdownMenuProps: {
      PopperPlacement: "bottom-start"
    },
    buttonPosition: "left",
    buttons: false,
    closeOnBlur: true,
    disabled: false,
    isSearchAutoFocus: true,
    isTriggerChangeOnOptionClick: false,
    label: DROPDOWN_LABEL,
    multiple: true,
    options: DROPDOWN_DATA_OPTIONS[0],
    search: true,
    title: "Dropdown Title"
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    buttonPosition: "left",
    buttons: true,
    closeOnBlur: true,
    disabled: false,
    isTriggerChangeOnOptionClick: false,
    label: DROPDOWN_LABEL,
    multiple: true,
    options: DROPDOWN_DATA_OPTIONS[2],
    search: true,
    title: "Multi-Column Dropdown Title"
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS
    }
  },
  render: (args: Args) => <Dropdown {...args} />
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    DropdownMenuProps: {
      loading: true,
      loadingText: <LoadingIndicator sdsStyle="minimal" />
    },
    label: DROPDOWN_LABEL,
    options: []
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    DropdownMenuProps: {
      width: 200
    },
    InputDropdownProps: {
      width: 200
    },
    options: AUTOCOMPLETE_ACTION_TYPE_OPTIONS
  },
  parameters: {
    axe: {
      disabledRules: ["aria-dialog-name"]
    },
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: {
    axe: {
      disabledRules: ["aria-dialog-name"]
    },
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <InsideModalDemo {...args} />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    label: DROPDOWN_LABEL
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ControlledDropdownDemo {...args} />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    label: DROPDOWN_LABEL
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <PopperPlacementDemo {...args} />
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    buttonPosition: "left",
    label: DROPDOWN_LABEL
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`MultiColumnWithButtons`,`LoadingResultsIndicator`,`ActionTypeMenuItems`,`InsideModal`,`ControlledDropdown`,`PopperPlacement`,`Test`]}))();export{J as ActionTypeMenuItems,X as ControlledDropdown,G as Default,Y as InsideModal,q as LoadingResultsIndicator,K as MultiColumnWithButtons,Z as PopperPlacement,Q as Test,$ as __namedExportsOrder,W as default};