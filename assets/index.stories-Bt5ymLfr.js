import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Ar as r,Br as i,Vr as a,Yn as o,t as s}from"./material-CSBxm0C2.js";import{t as c}from"./jsx-runtime-cM__dR4X.js";import{n as l,t as u}from"./Button-CYJU6j-k.js";import{a as d,s as ee}from"./utils-CbT4iKc5.js";import{n as f,t as p}from"./Dropdown-CXauKEA1.js";import{n as te,t as m}from"./Dialog-DqMvSbqT.js";import{n as h,t as g}from"./LoadingIndicator-BTYoJkUY.js";import{n as _,t as v}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-B0pKiL8W.js";import{a as y,i as b,n as x,o as S,r as C,s as ne,t as re}from"./constants-CRGydMpB.js";var w,T,E,D=t((()=>{w=e(n()),_(),f(),T=e(c()),E=e=>{let{multiple:t,options:n=v,DropdownMenuProps:r,...i}=e,[a,o]=(0,w.useState)(t?[]:null);return(0,w.useEffect)(()=>{o(t?[]:null)},[t,n]),(0,T.jsx)(p,{label:`Click Target`,onChange:s,value:a,options:n,search:!1,multiple:t,DropdownMenuProps:{groupBy:e=>e.section,width:300,...r},onOpen:c,onClose:l,getOptionDisabled:e=>!!e.disabled,...i});function s(e,t){o(t),console.log(`Dropdown Value:`,t)}function c(e){console.log(`Dropdown opened`)}function l(e,t){console.log(`Dropdown closed with reason:`,t)}}})),O,k,A,j=t((()=>{a(),O=e(c()),k=e(n()),_(),l(),f(),A=e=>{let[t,n]=(0,k.useState)([]);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(i(u,{target:`e1we062v0`})({name:`1mzlom2`,styles:`&:focus{outline:none;}margin:0 0 24px 0`}),{onClick:r,sdsStyle:`minimal`,sdsType:`secondary`,children:`Click here to select the first three options`}),(0,O.jsx)(`br`,{}),(0,O.jsx)(p,{label:`Click Target`,...e,options:v,value:t,onChange:a,"data-testid":`dropdown`,DropdownMenuProps:{groupBy:e=>e.section,title:`Github Labels`,width:300},multiple:!0})]});function r(){n([...v.slice(0,3)])}function a(e,t){n(t)}}})),M,N,P=t((()=>{_(),d(),f(),M=e(c()),N=e=>(0,M.jsx)(p,{"data-testid":`dropdown`,label:`Click Target`,onChange:ee,options:v,DropdownMenuProps:{width:300},...e})}));function F(e){return(0,I.jsx)(m,{open:!0,disableEnforceFocus:!0,PaperComponent:L,children:(0,I.jsx)(E,{label:`Dropdown`,options:v,multiple:!0,InputDropdownProps:{sdsStyle:`square`},...e})})}var I,L,R=t((()=>{_(),te(),D(),s(),I=e(c()),L=r(o)`
  width: 300px;
  max-width: unset !important;
  padding: 50px;
`})),z,B,V,ie=t((()=>{z=e(n()),f(),B=e(c()),V=()=>{let[e,t]=(0,z.useState)(null),n=(0,z.useMemo)(()=>[{count:2,name:`Item 1`},{count:0,name:`Item 2`},{count:12,name:`Item 3`}],[]);return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(`div`,{style:{gridArea:`3 / 2 / 4 / 4`},children:[(0,B.jsx)(`p`,{children:`To adjust the placement of the popper, use the DropdownMenuProps property and set PopperPlacement to your desired value:`}),(0,B.jsx)(`pre`,{style:{backgroundColor:`#c3c3c347`,borderRadius:4,padding:`0px 20px`},children:`
<Dropdown
  DropdownMenuProps={{
    PopperPlacement: "bottom-start",
  }}
/>
          `})]}),(0,B.jsxs)(`div`,{style:{display:`grid`,gridColumnGap:`0px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(5, 1fr)`,gridTemplateRows:`repeat(5, 1fr)`,height:`500px`,padding:`30px`},children:[(0,B.jsx)(`div`,{style:{gridArea:`1 / 2 / 2 / 3`},children:(0,B.jsx)(p,{label:`Bottom Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-start`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`1 / 3 / 2 / 4`},children:(0,B.jsx)(p,{label:`Bottom`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`1 / 4 / 2 / 5`},children:(0,B.jsx)(p,{label:`Bottom End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-end`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`2 / 1 / 3 / 2`},children:(0,B.jsx)(p,{label:`Right Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-start`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`3 / 1 / 4 / 2`},children:(0,B.jsx)(p,{label:`Right`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`4 / 1 / 5 / 2`},children:(0,B.jsx)(p,{label:`Right End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-end`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`5 / 2 / 6 / 3`},children:(0,B.jsx)(p,{label:`Top Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-start`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`5 / 3 / 6 / 4`},children:(0,B.jsx)(p,{label:`Top`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`5 / 4 / 6 / 5`},children:(0,B.jsx)(p,{label:`Top End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-end`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`2 / 5 / 3 / 6`},children:(0,B.jsx)(p,{label:`Left Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-start`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`3 / 5 / 4 / 6`},children:(0,B.jsx)(p,{label:`Left`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left`,groupBy:e=>e.section,width:150}})}),(0,B.jsx)(`div`,{style:{gridArea:`4 / 5 / 5 / 6`},children:(0,B.jsx)(p,{label:`Left End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-end`,groupBy:e=>e.section,width:150}})})]})]});function r(e,n){t(n)}}})),H,ae=t((()=>{H=[{name:`Copy`,onClick:()=>{console.log(`Copy Action Called!`)},sdsType:`action`,section:`Default`},{name:`Paste`,onClick:()=>{console.log(`Paste Action Called!`)},sdsType:`action`,section:`Default`},{icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{count:`⌘ ⌥ P`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ D`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ P`,icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`},{count:`⌘ ⌥ D`,icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`}]})),U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{h(),D(),ne(),j(),P(),R(),ie(),ae(),U=e(c()),W={argTypes:{DropdownMenuProps:{control:{type:`object`},description:`These props are directly passed to the underlying DropdownMenu component, customizing its behavior. It is also the way to reach the menu's PopperComponent, PaperComponent and placement.`},InputDropdownProps:{control:{type:`object`},description:`These props are directly passed to the underlying InputDropdown component, customizing its behavior.`},buttonPosition:{control:{type:`select`},description:`Specifies the position of the Apply/Cancel buttons at the Dropdown footer.`,options:re,table:{defaultValue:{summary:`right`}}},buttons:{control:{type:`boolean`},description:`When set to true, a set of Apply/Cancel buttons will be displayed at the Dropdown footer.`,table:{defaultValue:{summary:`false`}}},closeOnBlur:{control:{type:`boolean`},description:`When set to true, the Dropdown will automatically close when a click occurs outside of it. It defaults to false when buttons is true, because closing on blur discards the selections that have not been applied.`,table:{defaultValue:{summary:`true`}}},disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},isSearchAutoFocus:{control:{type:`boolean`},description:`Puts the cursor in the search input as the menu opens. It only applies alongside search.`,table:{defaultValue:{summary:`true`}}},isTriggerChangeOnOptionClick:{control:{type:`boolean`},description:`When set to true, changes in Dropdown selections are applied in real-time to the react state.`,table:{defaultValue:{summary:`false`}}},label:{control:{type:`text`},description:`The label of the Dropdown.`},multiple:{control:{type:`boolean`},description:"If `true`, `value` must be an array and the menu will support multiple selections.",table:{defaultValue:{summary:`false`}}},onChange:{control:{labels:{noop:`NOOP`,log:`Log value on change`},type:`select`},description:`Callback fired when the value changes.`,mapping:y,options:Object.keys(y)},onClose:{control:{labels:{noop:`NOOP`,log:`console.log('Closed!')`},type:`select`},description:`Callback fired when the popup requests to be closed.`,mapping:S,options:Object.keys(S)},options:{control:{labels:{oneColumn:`One Column`,twoColumns:`Two Columns`,threeColumns:`Three Columns`},type:`select`},description:`An array of options to be displayed as MenuItems within the Dropdown.`,mapping:x,options:Object.keys(x)},search:{control:{type:`boolean`},description:`When set to true, a search input is displayed at the top of the Dropdown for filtering options.`,table:{defaultValue:{summary:`false`}}},title:{control:{type:`text`},description:`A heading shown at the top of the menu.`}},component:E,title:`Components/Dropdowns/Dropdown`},G={args:{DropdownMenuProps:{PopperPlacement:`bottom-start`},buttonPosition:`left`,buttons:!1,closeOnBlur:!0,disabled:!1,isSearchAutoFocus:!0,isTriggerChangeOnOptionClick:!1,label:b,multiple:!0,options:x.oneColumn,search:!0,title:`Dropdown Title`}},K={args:{buttonPosition:`left`,buttons:!0,closeOnBlur:!0,disabled:!1,isTriggerChangeOnOptionClick:!1,label:b,multiple:!0,options:x.threeColumns,search:!0,title:`Multi-Column Dropdown Title`},parameters:{controls:{exclude:C}},render:e=>(0,U.jsx)(E,{...e})},q={args:{DropdownMenuProps:{loading:!0,loadingText:(0,U.jsx)(g,{sdsStyle:`minimal`})},label:b,options:[]},parameters:{controls:{exclude:C},snapshot:{skip:!0}}},J={args:{DropdownMenuProps:{width:200},InputDropdownProps:{width:200},options:H},parameters:{a11y:{config:{rules:[{enabled:!1,id:`aria-dialog-name`}]}},controls:{exclude:C},snapshot:{skip:!0}}},Y={parameters:{a11y:{config:{rules:[{enabled:!1,id:`aria-dialog-name`}]}},controls:{exclude:C},snapshot:{skip:!0}},render:e=>(0,U.jsx)(F,{...e})},X={args:{label:b},parameters:{controls:{exclude:C},snapshot:{skip:!0}},render:e=>(0,U.jsx)(A,{...e})},Z={args:{label:b},parameters:{controls:{exclude:C},snapshot:{skip:!0}},render:e=>(0,U.jsx)(V,{...e})},Q={args:{buttonPosition:`left`,label:b},parameters:{controls:{exclude:C},snapshot:{skip:!0}},render:e=>(0,U.jsx)(N,{...e})},$=[`Default`,`MultiColumnWithButtons`,`LoadingResultsIndicator`,`ActionTypeMenuItems`,`InsideModal`,`ControlledDropdown`,`PopperPlacement`,`Test`],G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
    options: DROPDOWN_DATA_OPTIONS.oneColumn,
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
    options: DROPDOWN_DATA_OPTIONS.threeColumns,
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
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "aria-dialog-name"
        }]
      }
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
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "aria-dialog-name"
        }]
      }
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
}`,...Q.parameters?.docs?.source}}}}))();export{J as ActionTypeMenuItems,X as ControlledDropdown,G as Default,Y as InsideModal,q as LoadingResultsIndicator,K as MultiColumnWithButtons,Z as PopperPlacement,Q as Test,$ as __namedExportsOrder,W as default};