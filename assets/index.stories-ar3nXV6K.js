import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Mr as r,Qa as i,ct as a,hr as o,ji as s}from"./iframe-DocVhSSI.js";import{n as c,t as l}from"./Icon-CQ-y6cAL.js";import{o as u,r as d}from"./loremIpsum-BqYjZDri.js";import{n as f,t as p}from"./Callout-C9pGampS.js";import{n as m,t as h}from"./Button-CfkvkcRt.js";import{n as g,t as _}from"./ButtonToggle-DjueEiSu.js";import{n as v,t as y}from"./Panel-DH6YBPIf.js";var b,x,S,C,w,T=e((()=>{a(),b=t(i()),u(),f(),v(),g(),c(),x=n(),S=(0,x.jsx)(p,{intent:`negative`,title:`Invalid Props!`,body:(0,x.jsxs)(x.Fragment,{children:[`The `,(0,x.jsx)(`strong`,{children:`Basic`}),` Panel only supports `,(0,x.jsx)(`strong`,{children:`left`}),` or`,` `,(0,x.jsx)(`strong`,{children:`right`}),` positions. Please update the`,` `,(0,x.jsx)(`strong`,{children:`position`}),` prop to one of these valid values.`]})}),C=e=>{let{open:t,sdsType:n,position:r=`left`,children:i,width:a}=e,s={bottom:`0`,left:`0 0 0 ${a}`,right:`0 ${a} 0 0`},c=n===`basic`?s[r]:`0`;return(0,x.jsx)(o,{sx:{margin:t?c:`0`},children:i})},w=e=>{let{sdsType:t=`basic`,position:n=`left`}=e,r=s(),[i,a]=(0,b.useState)(!1),c={alignItems:`center`,border:`dashed 1px ${r?.palette?.sds?.base?.divider}`,color:r?.palette?.sds?.base?.textSecondary,display:`flex`,height:`100%`,justifyContent:`center`,width:`100%`},u=(0,x.jsx)(o,{sx:c,role:`presentation`,children:`[Panel Content]`}),f=(0,x.jsx)(o,{sx:c,children:`[Panel Header]`});return t===`basic`&&n===`bottom`?S:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(y,{sdsType:t,open:i,closeButtonOnClick:()=>a(!1),onClose:()=>a(!1),HeaderComponent:f,...e,children:u}),(0,x.jsxs)(C,{sdsType:t,open:i,...e,children:[(0,x.jsx)(_,{"aria-label":`button-toggle`,startIcon:(0,x.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>a(e=>!e),sdsStage:i?`on`:`off`,backgroundOnHover:!0}),(0,x.jsx)(`p`,{children:d}),(0,x.jsx)(`p`,{children:d}),(0,x.jsx)(`p`,{children:d}),(0,x.jsx)(`p`,{children:d})]})]})}})),E,D=e((()=>{E=[`sdsType`,`position`,`width`,`disableScrollLock`,`HeaderComponent`,`CloseButtonComponent`,`closeButtonOnClick`,`isBackdropClickEnabled`]})),O,k,A=e((()=>{v(),O=n(),k=e=>(0,O.jsx)(y,{sdsType:`basic`,open:!0,"data-testid":`panel`,...e,children:`[Panel Content]`})})),j,M,N,P=e((()=>{j=t(i()),v(),m(),a(),u(),c(),g(),M=n(),N=e=>{let[t,n]=j.useState(!0);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{sx:{padding:4},children:(0,M.jsx)(_,{"aria-label":`button-toggle`,startIcon:(0,M.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>n(e=>!e),sdsStage:t?`on`:`off`,backgroundOnHover:!0})}),(0,M.jsx)(y,{sdsType:`overlay`,open:t,closeButtonOnClick:()=>{n(!1)},onClose:()=>n(!1),HeaderComponent:(0,M.jsx)(r,{variant:`h3`,sx:{margin:`0 !important`,padding:`0 !important`},children:`Panel Header`}),CloseButtonComponent:(0,M.jsx)(h,{sdsStyle:`minimal`,size:`large`,sdsType:`secondary`,"data-testid":`panel-close-button`,"aria-label":`Panel Toggle`,backgroundOnHover:!1,children:(0,M.jsx)(l,{sdsIcon:`ChevronLeft`,sdsSize:`l`})}),"data-testid":`panel`,...e,children:d})]})}})),F,I,L,R=e((()=>{F=t(i()),v(),a(),u(),c(),g(),I=n(),L=e=>{let[t,n]=F.useState(!0);return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(o,{sx:{paddingBottom:4},children:(0,I.jsx)(_,{"aria-label":`button-toggle`,startIcon:(0,I.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>n(e=>!e),sdsStage:t?`on`:`off`,backgroundOnHover:!0})}),(0,I.jsx)(y,{sdsType:`overlay`,open:t,closeButtonOnClick:()=>{n(!1)},onClose:()=>n(!1),HeaderComponent:(0,I.jsx)(r,{variant:`h3`,sx:{margin:`0 !important`,padding:`0 !important`},children:`Scrollable Panel`}),position:`right`,...e,children:d}),(0,I.jsxs)(o,{children:[(0,I.jsx)(r,{variant:`h3`,children:`Scrollable Content`}),(0,I.jsx)(`p`,{children:d}),(0,I.jsx)(`p`,{children:d}),(0,I.jsx)(`p`,{children:d}),(0,I.jsx)(`p`,{children:d}),(0,I.jsx)(`p`,{children:d})]})]})}})),z,B,V,H,U,W,G;e((()=>{T(),D(),A(),P(),R(),z=n(),B={argTypes:{isBackdropClickEnabled:{control:{type:`boolean`},description:`If true, clicking on the backdrop will close the panel. Only applies to overlay panels.`},position:{control:{type:`select`},options:[`left`,`right`,`bottom`]},sdsType:{control:{type:`select`},options:[`basic`,`overlay`]},width:{control:{type:`text`}}},component:w,title:`Components/Panel`},V={args:{position:`left`,sdsType:`basic`,width:`320px`}},H={parameters:{axe:{disabledRules:[`aria-hidden-focus`]},controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(L,{...e})},U={parameters:{axe:{disabledRules:[`aria-hidden-focus`]},controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(N,{...e})},W={parameters:{controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(k,{...e})},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    position: "left",
    sdsType: "basic",
    width: "320px"
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    // TODO: Fix accessibility (a11y) issues once the MUI team resolves the problem
    // with the 'disableEnforceFocus' prop in the Modal component.
    axe: {
      disabledRules: ["aria-hidden-focus"]
    },
    controls: {
      exclude: PANEL_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScrollBehaviorDemo {...args} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    // TODO: Fix accessibility (a11y) issues once the MUI team resolves the problem
    // with the 'disableEnforceFocus' prop in the Modal component.
    axe: {
      disabledRules: ["aria-hidden-focus"]
    },
    controls: {
      exclude: PANEL_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <CustomHeaderAndCloseButtonDemo {...args} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: PANEL_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...W.parameters?.docs?.source}}},G=[`Default`,`ScrollBehavior`,`CustomHeaderAndCloseButton`,`Test`]}))();export{U as CustomHeaderAndCloseButton,V as Default,H as ScrollBehavior,W as Test,G as __namedExportsOrder,B as default};