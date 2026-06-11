import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Kr as n,Ln as r,Wn as i,Xn as a,Zn as o,cr as s,st as c}from"./iframe-DI6qETgL.js";import{a as l,s as ee}from"./utils-B1uyFjm5.js";import{n as u,t as te}from"./Button-K7qsdWHe.js";import{n as d,t as f}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-DJ2R9ntu.js";import{n as p,t as m}from"./Dropdown-CIxkJ52E.js";import{a as h,i as g,n as _,o as v,r as y,s as ne,t as b}from"./constants-CFg-KII1.js";import{n as re,t as ie}from"./Dialog-CVEt8hUm.js";import{n as x,t as S}from"./LoadingIndicator-DPgRncob.js";var C,w,T,E=t((()=>{C=e(n()),d(),p(),w=s(),T=e=>{let{multiple:t,options:n=f,DropdownMenuProps:r,...i}=e,[a,o]=(0,C.useState)(t?[]:null);return(0,C.useEffect)(()=>{o(t?[]:null)},[t,n]),(0,w.jsx)(m,{label:`Click Target`,onChange:s,value:a,options:n,search:!1,multiple:t,DropdownMenuProps:{groupBy:e=>e.section,width:300,...r},onOpen:c,onClose:l,getOptionDisabled:e=>!!e.disabled,...i});function s(e,t){o(t),console.log(`Dropdown Value:`,t)}function c(e){console.log(`Dropdown opened`)}function l(e,t){console.log(`Dropdown closed with reason:`,t)}}})),D,O,k,A=t((()=>{o(),D=s(),O=e(n()),d(),u(),p(),k=e=>{let[t,n]=(0,O.useState)([]);return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(a(te,{target:`e1we062v0`})({name:`1mzlom2`,styles:`&:focus{outline:none;}margin:0 0 24px 0`}),{onClick:r,sdsStyle:`minimal`,sdsType:`secondary`,children:`Click here to select the first three options`}),(0,D.jsx)(`br`,{}),(0,D.jsx)(m,{label:`Click Target`,...e,options:f,value:t,onChange:i,"data-testid":`dropdown`,DropdownMenuProps:{groupBy:e=>e.section,title:`Github Labels`,width:300},multiple:!0})]});function r(){n([...f.slice(0,3)])}function i(e,t){n(t)}}})),j,M,N=t((()=>{d(),l(),p(),j=s(),M=e=>(0,j.jsx)(m,{"data-testid":`dropdown`,label:`Click Target`,onChange:ee,options:f,DropdownMenuProps:{width:300},...e})}));function P(e){return(0,F.jsx)(ie,{open:!0,disableEnforceFocus:!0,PaperComponent:I,children:(0,F.jsx)(T,{label:`Dropdown`,options:f,multiple:!0,InputDropdownProps:{sdsStyle:`square`},...e})})}var F,I,L=t((()=>{d(),re(),E(),c(),F=s(),I=i(r)`
  width: 300px;
  max-width: unset !important;
  padding: 50px;
`})),R,z,B,V=t((()=>{R=e(n()),p(),z=s(),B=()=>{let[e,t]=(0,R.useState)(null),n=(0,R.useMemo)(()=>[{count:2,name:`Item 1`},{count:0,name:`Item 2`},{count:12,name:`Item 3`}],[]);return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{style:{gridArea:`3 / 2 / 4 / 4`},children:[(0,z.jsx)(`p`,{children:`To adjust the placement of the popper, use the DropdownMenuProps property and set PopperPlacement to your desired value:`}),(0,z.jsx)(`pre`,{style:{backgroundColor:`#c3c3c347`,borderRadius:4,padding:`0px 20px`},children:`
<Dropdown
  DropdownMenuProps={{
    PopperPlacement: "bottom-start",
  }}
/>
          `})]}),(0,z.jsxs)(`div`,{style:{display:`grid`,gridColumnGap:`0px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(5, 1fr)`,gridTemplateRows:`repeat(5, 1fr)`,height:`500px`,padding:`30px`},children:[(0,z.jsx)(`div`,{style:{gridArea:`1 / 2 / 2 / 3`},children:(0,z.jsx)(m,{label:`Bottom Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`1 / 3 / 2 / 4`},children:(0,z.jsx)(m,{label:`Bottom`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`1 / 4 / 2 / 5`},children:(0,z.jsx)(m,{label:`Bottom End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-end`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`2 / 1 / 3 / 2`},children:(0,z.jsx)(m,{label:`Right Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`3 / 1 / 4 / 2`},children:(0,z.jsx)(m,{label:`Right`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`4 / 1 / 5 / 2`},children:(0,z.jsx)(m,{label:`Right End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-end`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`5 / 2 / 6 / 3`},children:(0,z.jsx)(m,{label:`Top Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`5 / 3 / 6 / 4`},children:(0,z.jsx)(m,{label:`Top`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`5 / 4 / 6 / 5`},children:(0,z.jsx)(m,{label:`Top End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-end`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`2 / 5 / 3 / 6`},children:(0,z.jsx)(m,{label:`Left Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-start`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`3 / 5 / 4 / 6`},children:(0,z.jsx)(m,{label:`Left`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left`,groupBy:e=>e.section,width:150}})}),(0,z.jsx)(`div`,{style:{gridArea:`4 / 5 / 5 / 6`},children:(0,z.jsx)(m,{label:`Left End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-end`,groupBy:e=>e.section,width:150}})})]})]});function r(e,n){t(n)}}})),H,ae=t((()=>{H=[{name:`Copy`,onClick:()=>{console.log(`Copy Action Called!`)},sdsType:`action`,section:`Default`},{name:`Paste`,onClick:()=>{console.log(`Paste Action Called!`)},sdsType:`action`,section:`Default`},{icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{count:`⌘ ⌥ P`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ D`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ P`,icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`},{count:`⌘ ⌥ D`,icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`}]})),U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{x(),E(),ne(),A(),N(),L(),V(),ae(),U=s(),W={argTypes:{DropdownMenuProps:{control:{type:`object`}},InputDropdownProps:{control:{type:`object`}},buttonPosition:{control:{labels:[`left`,`right`],type:`select`},mapping:b,options:Object.keys(b)},buttons:{control:{type:`boolean`}},closeOnBlur:{control:{type:`boolean`}},disabled:{control:{type:`boolean`}},isSearchAutoFocus:{control:{type:`boolean`},defaultValue:!0},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},onChange:{control:{labels:[`NOOP`,`Log value on change`],type:`select`},mapping:h,options:Object.keys(h)},onClose:{control:{labels:[`NOOP`,`console.log('Closed!')`],type:`select`},mapping:v,options:Object.keys(v)},options:{control:{labels:[`One Column`,`Two Columns`,`Three Columns`],type:`select`},mapping:_,options:Object.keys(_)},search:{control:{type:`boolean`},defaultValue:!0},title:{control:{type:`text`}}},component:T,title:`Components/Dropdowns/Dropdown`},G={args:{DropdownMenuProps:{PopperPlacement:`bottom-start`},buttonPosition:`left`,buttons:!1,closeOnBlur:!0,disabled:!1,isSearchAutoFocus:!0,isTriggerChangeOnOptionClick:!1,label:g,multiple:!0,options:_[0],search:!0,title:`Dropdown Title`}},K={args:{buttonPosition:`left`,buttons:!0,closeOnBlur:!0,disabled:!1,isTriggerChangeOnOptionClick:!1,label:g,multiple:!0,options:_[2],search:!0,title:`Multi-Column Dropdown Title`},parameters:{controls:{exclude:y}},render:e=>(0,U.jsx)(T,{...e})},q={args:{DropdownMenuProps:{loading:!0,loadingText:(0,U.jsx)(S,{sdsStyle:`minimal`})},label:g,options:[]},parameters:{controls:{exclude:y},snapshot:{skip:!0}}},J={args:{DropdownMenuProps:{width:200},InputDropdownProps:{width:200},options:H},parameters:{axe:{disabledRules:[`aria-dialog-name`]},controls:{exclude:y},snapshot:{skip:!0}}},Y={parameters:{axe:{disabledRules:[`aria-dialog-name`]},controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,U.jsx)(P,{...e})},X={args:{label:g},parameters:{controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,U.jsx)(k,{...e})},Z={args:{label:g},parameters:{controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,U.jsx)(B,{...e})},Q={args:{buttonPosition:`left`,label:g},parameters:{controls:{exclude:y},snapshot:{skip:!0}},render:e=>(0,U.jsx)(M,{...e})},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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