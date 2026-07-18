import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Ii as r,Li as i,Qa as a,ct as o,ei as s,ki as c}from"./iframe-DocVhSSI.js";import{a as l,s as u}from"./utils-BxIa431Z.js";import{n as d,t as ee}from"./Button-CfkvkcRt.js";import{n as f,t as p}from"./AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS-CNDnjvia.js";import{n as m,t as h}from"./Dropdown-CFu_4q8r.js";import{a as g,i as _,n as v,o as y,r as b,s as te,t as x}from"./constants-u-l1ZB_g.js";import{n as ne,t as re}from"./Dialog-CucxiFH7.js";import{n as ie,t as ae}from"./LoadingIndicator-C__STOTQ.js";var S,C,w,T=e((()=>{S=t(a()),f(),m(),C=n(),w=e=>{let{multiple:t,options:n=p,DropdownMenuProps:r,...i}=e,[a,o]=(0,S.useState)(t?[]:null);return(0,S.useEffect)(()=>{o(t?[]:null)},[t,n]),(0,C.jsx)(h,{label:`Click Target`,onChange:s,value:a,options:n,search:!1,multiple:t,DropdownMenuProps:{groupBy:e=>e.section,width:300,...r},onOpen:c,onClose:l,getOptionDisabled:e=>!!e.disabled,...i});function s(e,t){o(t),console.log(`Dropdown Value:`,t)}function c(e){console.log(`Dropdown opened`)}function l(e,t){console.log(`Dropdown closed with reason:`,t)}}})),E,D,O,k=e((()=>{i(),E=n(),D=t(a()),f(),d(),m(),O=e=>{let[t,n]=(0,D.useState)([]);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(r(ee,{target:`e1we062v0`})({name:`1mzlom2`,styles:`&:focus{outline:none;}margin:0 0 24px 0`}),{onClick:i,sdsStyle:`minimal`,sdsType:`secondary`,children:`Click here to select the first three options`}),(0,E.jsx)(`br`,{}),(0,E.jsx)(h,{label:`Click Target`,...e,options:p,value:t,onChange:a,"data-testid":`dropdown`,DropdownMenuProps:{groupBy:e=>e.section,title:`Github Labels`,width:300},multiple:!0})]});function i(){n([...p.slice(0,3)])}function a(e,t){n(t)}}})),A,j,M=e((()=>{f(),l(),m(),A=n(),j=e=>(0,A.jsx)(h,{"data-testid":`dropdown`,label:`Click Target`,onChange:u,options:p,DropdownMenuProps:{width:300},...e})}));function N(e){return(0,P.jsx)(re,{open:!0,disableEnforceFocus:!0,PaperComponent:F,children:(0,P.jsx)(w,{label:`Dropdown`,options:p,multiple:!0,InputDropdownProps:{sdsStyle:`square`},...e})})}var P,F,I=e((()=>{f(),ne(),T(),o(),P=n(),F=c(s)`
  width: 300px;
  max-width: unset !important;
  padding: 50px;
`})),L,R,z,B=e((()=>{L=t(a()),m(),R=n(),z=()=>{let[e,t]=(0,L.useState)(null),n=(0,L.useMemo)(()=>[{count:2,name:`Item 1`},{count:0,name:`Item 2`},{count:12,name:`Item 3`}],[]);return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(`div`,{style:{gridArea:`3 / 2 / 4 / 4`},children:[(0,R.jsx)(`p`,{children:`To adjust the placement of the popper, use the DropdownMenuProps property and set PopperPlacement to your desired value:`}),(0,R.jsx)(`pre`,{style:{backgroundColor:`#c3c3c347`,borderRadius:4,padding:`0px 20px`},children:`
<Dropdown
  DropdownMenuProps={{
    PopperPlacement: "bottom-start",
  }}
/>
          `})]}),(0,R.jsxs)(`div`,{style:{display:`grid`,gridColumnGap:`0px`,gridRowGap:`0px`,gridTemplateColumns:`repeat(5, 1fr)`,gridTemplateRows:`repeat(5, 1fr)`,height:`500px`,padding:`30px`},children:[(0,R.jsx)(`div`,{style:{gridArea:`1 / 2 / 2 / 3`},children:(0,R.jsx)(h,{label:`Bottom Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-start`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`1 / 3 / 2 / 4`},children:(0,R.jsx)(h,{label:`Bottom`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`1 / 4 / 2 / 5`},children:(0,R.jsx)(h,{label:`Bottom End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`bottom-end`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`2 / 1 / 3 / 2`},children:(0,R.jsx)(h,{label:`Right Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-start`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`3 / 1 / 4 / 2`},children:(0,R.jsx)(h,{label:`Right`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`4 / 1 / 5 / 2`},children:(0,R.jsx)(h,{label:`Right End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`right-end`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`5 / 2 / 6 / 3`},children:(0,R.jsx)(h,{label:`Top Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-start`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`5 / 3 / 6 / 4`},children:(0,R.jsx)(h,{label:`Top`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`5 / 4 / 6 / 5`},children:(0,R.jsx)(h,{label:`Top End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`top-end`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`2 / 5 / 3 / 6`},children:(0,R.jsx)(h,{label:`Left Start`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-start`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`3 / 5 / 4 / 6`},children:(0,R.jsx)(h,{label:`Left`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left`,groupBy:e=>e.section,width:150}})}),(0,R.jsx)(`div`,{style:{gridArea:`4 / 5 / 5 / 6`},children:(0,R.jsx)(h,{label:`Left End`,onChange:r,value:e,options:n,search:!1,InputDropdownProps:{sdsStyle:`minimal`},DropdownMenuProps:{PopperPlacement:`left-end`,groupBy:e=>e.section,width:150}})})]})]});function r(e,n){t(n)}}})),V,H=e((()=>{V=[{name:`Copy`,onClick:()=>{console.log(`Copy Action Called!`)},sdsType:`action`,section:`Default`},{name:`Paste`,onClick:()=>{console.log(`Paste Action Called!`)},sdsType:`action`,section:`Default`},{icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon`},{count:`⌘ ⌥ P`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ D`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsType:`action`,section:`With Shortcut`},{count:`⌘ ⌥ P`,icon:`Pin`,name:`Pin`,onClick:()=>{console.log(`Pinned Successfully!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`},{count:`⌘ ⌥ D`,icon:`Download`,name:`Download`,onClick:()=>{console.log(`Download Started!`)},sdsIconProps:{color:`gray`,shade:500},sdsType:`action`,section:`With Icon and Shortcut`}]})),U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{ie(),T(),te(),k(),M(),I(),B(),H(),U=n(),W={argTypes:{DropdownMenuProps:{control:{type:`object`}},InputDropdownProps:{control:{type:`object`}},buttonPosition:{control:{labels:[`left`,`right`],type:`select`},mapping:x,options:Object.keys(x)},buttons:{control:{type:`boolean`}},closeOnBlur:{control:{type:`boolean`}},disabled:{control:{type:`boolean`}},isSearchAutoFocus:{control:{type:`boolean`},defaultValue:!0},label:{control:{type:`text`}},multiple:{control:{type:`boolean`}},onChange:{control:{labels:[`NOOP`,`Log value on change`],type:`select`},mapping:g,options:Object.keys(g)},onClose:{control:{labels:[`NOOP`,`console.log('Closed!')`],type:`select`},mapping:y,options:Object.keys(y)},options:{control:{labels:[`One Column`,`Two Columns`,`Three Columns`],type:`select`},mapping:v,options:Object.keys(v)},search:{control:{type:`boolean`},defaultValue:!0},title:{control:{type:`text`}}},component:w,title:`Components/Dropdowns/Dropdown`},G={args:{DropdownMenuProps:{PopperPlacement:`bottom-start`},buttonPosition:`left`,buttons:!1,closeOnBlur:!0,disabled:!1,isSearchAutoFocus:!0,isTriggerChangeOnOptionClick:!1,label:_,multiple:!0,options:v[0],search:!0,title:`Dropdown Title`}},K={args:{buttonPosition:`left`,buttons:!0,closeOnBlur:!0,disabled:!1,isTriggerChangeOnOptionClick:!1,label:_,multiple:!0,options:v[2],search:!0,title:`Multi-Column Dropdown Title`},parameters:{controls:{exclude:b}},render:e=>(0,U.jsx)(w,{...e})},q={args:{DropdownMenuProps:{loading:!0,loadingText:(0,U.jsx)(ae,{sdsStyle:`minimal`})},label:_,options:[]},parameters:{controls:{exclude:b},snapshot:{skip:!0}}},J={args:{DropdownMenuProps:{width:200},InputDropdownProps:{width:200},options:V},parameters:{axe:{disabledRules:[`aria-dialog-name`]},controls:{exclude:b},snapshot:{skip:!0}}},Y={parameters:{axe:{disabledRules:[`aria-dialog-name`]},controls:{exclude:b},snapshot:{skip:!0}},render:e=>(0,U.jsx)(N,{...e})},X={args:{label:_},parameters:{controls:{exclude:b},snapshot:{skip:!0}},render:e=>(0,U.jsx)(O,{...e})},Z={args:{label:_},parameters:{controls:{exclude:b},snapshot:{skip:!0}},render:e=>(0,U.jsx)(z,{...e})},Q={args:{buttonPosition:`left`,label:_},parameters:{controls:{exclude:b},snapshot:{skip:!0}},render:e=>(0,U.jsx)(j,{...e})},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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