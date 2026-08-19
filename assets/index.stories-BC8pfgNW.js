import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r,Hn as i,Xi as a,bo as o,ha as s}from"./iframe-CLRePdsX.js";import{n as c,t as l}from"./Icon-Dm0VxswF.js";import{n as u,t as d}from"./Callout-B8_fsr0X.js";import{n as f,t as p}from"./Button-DCR2_tBD.js";import{n as m,t as h}from"./ButtonToggle-C-cuiW_i.js";import{n as g,t as _}from"./Panel-B3a7UZlw.js";import{o as v,r as y}from"./loremIpsum-BqYjZDri.js";var b,x,S,C,w,T=e((()=>{i(),b=t(n()),v(),u(),g(),m(),c(),x=t(r()),S=(0,x.jsx)(d,{intent:`negative`,title:`Invalid Props!`,body:(0,x.jsxs)(x.Fragment,{children:[`The `,(0,x.jsx)(`strong`,{children:`Basic`}),` Panel only supports `,(0,x.jsx)(`strong`,{children:`left`}),` or`,` `,(0,x.jsx)(`strong`,{children:`right`}),` positions. Please update the`,` `,(0,x.jsx)(`strong`,{children:`position`}),` prop to one of these valid values.`]})}),C=e=>{let{open:t,sdsType:n,position:r=`left`,children:i,width:o}=e,s={bottom:`0`,left:`0 0 0 ${o}`,right:`0 ${o} 0 0`},c=n===`basic`?s[r]:`0`;return(0,x.jsx)(a,{sx:{margin:t?c:`0`},children:i})},w=e=>{let{sdsType:t=`basic`,position:n=`left`}=e,r=o(),[i,s]=(0,b.useState)(!1),c={alignItems:`center`,border:`dashed 1px ${r?.palette?.sds?.base?.divider}`,color:r?.palette?.sds?.base?.textSecondary,display:`flex`,height:`100%`,justifyContent:`center`,width:`100%`},u=(0,x.jsx)(a,{sx:c,role:`presentation`,children:`[Panel Content]`}),d=(0,x.jsx)(a,{sx:c,children:`[Panel Header]`});return t===`basic`&&n===`bottom`?S:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(_,{sdsType:t,open:i,closeButtonOnClick:()=>s(!1),onClose:()=>s(!1),HeaderComponent:d,...e,children:u}),(0,x.jsxs)(C,{sdsType:t,open:i,...e,children:[(0,x.jsx)(h,{"aria-label":`button-toggle`,startIcon:(0,x.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>s(e=>!e),sdsStage:i?`on`:`off`,backgroundOnHover:!0}),(0,x.jsx)(`p`,{children:y}),(0,x.jsx)(`p`,{children:y}),(0,x.jsx)(`p`,{children:y}),(0,x.jsx)(`p`,{children:y})]})]})}})),E,D=e((()=>{E=[`sdsType`,`position`,`width`,`disableScrollLock`,`HeaderComponent`,`CloseButtonComponent`,`closeButtonOnClick`,`isBackdropClickEnabled`]})),O,k,A=e((()=>{g(),O=t(r()),k=e=>(0,O.jsx)(_,{sdsType:`basic`,open:!0,"data-testid":`panel`,...e,children:`[Panel Content]`})})),j,M,N,P=e((()=>{j=t(n()),g(),f(),i(),v(),c(),m(),M=t(r()),N=e=>{let[t,n]=j.useState(!0);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(a,{sx:{padding:4},children:(0,M.jsx)(h,{"aria-label":`button-toggle`,startIcon:(0,M.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>n(e=>!e),sdsStage:t?`on`:`off`,backgroundOnHover:!0})}),(0,M.jsx)(_,{sdsType:`overlay`,open:t,closeButtonOnClick:()=>{n(!1)},onClose:()=>n(!1),HeaderComponent:(0,M.jsx)(s,{variant:`h3`,sx:{margin:`0 !important`,padding:`0 !important`},children:`Panel Header`}),CloseButtonComponent:(0,M.jsx)(p,{sdsStyle:`minimal`,size:`large`,sdsType:`secondary`,"data-testid":`panel-close-button`,"aria-label":`Panel Toggle`,backgroundOnHover:!1,children:(0,M.jsx)(l,{sdsIcon:`ChevronLeft`,sdsSize:`l`})}),"data-testid":`panel`,...e,children:y})]})}})),F,I,L,R=e((()=>{F=t(n()),g(),i(),v(),c(),m(),I=t(r()),L=e=>{let[t,n]=F.useState(!0);return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(a,{sx:{paddingBottom:4},children:(0,I.jsx)(h,{"aria-label":`button-toggle`,startIcon:(0,I.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>n(e=>!e),sdsStage:t?`on`:`off`,backgroundOnHover:!0})}),(0,I.jsx)(_,{sdsType:`overlay`,open:t,closeButtonOnClick:()=>{n(!1)},onClose:()=>n(!1),HeaderComponent:(0,I.jsx)(s,{variant:`h3`,sx:{margin:`0 !important`,padding:`0 !important`},children:`Scrollable Panel`}),position:`right`,...e,children:y}),(0,I.jsxs)(a,{children:[(0,I.jsx)(s,{variant:`h3`,children:`Scrollable Content`}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y})]})]})}})),z,B,V,H,U,W,G;e((()=>{T(),D(),A(),P(),R(),z=t(r()),B={argTypes:{isBackdropClickEnabled:{control:{type:`boolean`},description:`If true, clicking on the backdrop will close the panel. Only applies to overlay panels.`},position:{control:{type:`select`},options:[`left`,`right`,`bottom`]},sdsType:{control:{type:`select`},options:[`basic`,`overlay`]},transitionDuration:{control:{type:`number`},description:"How long the Panel takes to slide in and out, in milliseconds. Accepts a single number or `{ enter, exit }`. Defaults to 225ms in and 195ms out; `0` removes the animation."},width:{control:{type:`text`}}},component:w,title:`Components/Panel`},V={args:{position:`left`,sdsType:`basic`,width:`320px`}},H={parameters:{axe:{disabledRules:[`aria-hidden-focus`]},controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(L,{...e})},U={parameters:{axe:{disabledRules:[`aria-hidden-focus`]},controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(N,{...e})},W={parameters:{controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(k,{...e})},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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