import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Dn as r,Mr as i,ln as a,t as o}from"./material-DlyzFPof.js";import{t as s}from"./jsx-runtime-cM__dR4X.js";import{n as c,t as l}from"./Icon-BDRrQ0Mb.js";import{n as u,t as d}from"./Callout-B6Q_89QW.js";import{n as f,t as p}from"./Button-DIf_3EkI.js";import{n as m,t as h}from"./ButtonToggle-BfP4msvL.js";import{n as g,t as _}from"./Panel-DmDkbOFa.js";import{o as v,r as y}from"./loremIpsum-_pZR57WL.js";var b,x,S,C,w,T=t((()=>{o(),b=e(n()),v(),u(),g(),m(),c(),x=e(s()),S=(0,x.jsx)(d,{intent:`negative`,title:`Invalid Props!`,body:(0,x.jsxs)(x.Fragment,{children:[`The `,(0,x.jsx)(`strong`,{children:`Basic`}),` Panel only supports `,(0,x.jsx)(`strong`,{children:`left`}),` or`,` `,(0,x.jsx)(`strong`,{children:`right`}),` positions. Please update the`,` `,(0,x.jsx)(`strong`,{children:`position`}),` prop to one of these valid values.`]})}),C=e=>{let{open:t,sdsType:n,position:r=`left`,children:i,width:o}=e,s={bottom:`0`,left:`0 0 0 ${o}`,right:`0 ${o} 0 0`},c=n===`basic`?s[r]:`0`;return(0,x.jsx)(a,{sx:{margin:t?c:`0`},children:i})},w=e=>{let{sdsType:t=`basic`,position:n=`left`}=e,r=i(),[o,s]=(0,b.useState)(!1),c={alignItems:`center`,border:`dashed 1px ${r?.palette?.sds?.base?.divider}`,color:r?.palette?.sds?.base?.textSecondary,display:`flex`,height:`100%`,justifyContent:`center`,width:`100%`},u=(0,x.jsx)(a,{sx:c,role:`presentation`,children:`[Panel Content]`}),d=(0,x.jsx)(a,{sx:c,children:`[Panel Header]`});return t===`basic`&&n===`bottom`?S:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(_,{sdsType:t,open:o,closeButtonOnClick:()=>s(!1),onClose:()=>s(!1),HeaderComponent:d,...e,children:u}),(0,x.jsxs)(C,{sdsType:t,open:o,...e,children:[(0,x.jsx)(h,{"aria-label":`button-toggle`,startIcon:(0,x.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>s(e=>!e),sdsStage:o?`on`:`off`,backgroundOnHover:!0}),(0,x.jsx)(`p`,{children:y}),(0,x.jsx)(`p`,{children:y}),(0,x.jsx)(`p`,{children:y}),(0,x.jsx)(`p`,{children:y})]})]})}})),E,D=t((()=>{E=[`sdsType`,`position`,`width`,`disableScrollLock`,`HeaderComponent`,`CloseButtonComponent`,`closeButtonOnClick`,`isBackdropClickEnabled`]})),O,k,A=t((()=>{g(),O=e(s()),k=e=>(0,O.jsx)(_,{sdsType:`basic`,open:!0,"data-testid":`panel`,...e,children:`[Panel Content]`})})),j,M,N,P=t((()=>{j=e(n()),g(),f(),o(),v(),c(),m(),M=e(s()),N=e=>{let[t,n]=j.useState(!0);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(a,{sx:{padding:4},children:(0,M.jsx)(h,{"aria-label":`button-toggle`,startIcon:(0,M.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>n(e=>!e),sdsStage:t?`on`:`off`,backgroundOnHover:!0})}),(0,M.jsx)(_,{sdsType:`overlay`,open:t,closeButtonOnClick:()=>{n(!1)},onClose:()=>n(!1),HeaderComponent:(0,M.jsx)(r,{variant:`h3`,sx:{margin:`0 !important`,padding:`0 !important`},children:`Panel Header`}),CloseButtonComponent:(0,M.jsx)(p,{sdsStyle:`minimal`,size:`large`,sdsType:`secondary`,"data-testid":`panel-close-button`,"aria-label":`Panel Toggle`,backgroundOnHover:!1,children:(0,M.jsx)(l,{sdsIcon:`ChevronLeft`,sdsSize:`l`})}),"data-testid":`panel`,...e,children:y})]})}})),F,I,L,R=t((()=>{F=e(n()),g(),o(),v(),c(),m(),I=e(s()),L=e=>{let[t,n]=F.useState(!0);return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(a,{sx:{paddingBottom:4},children:(0,I.jsx)(h,{"aria-label":`button-toggle`,startIcon:(0,I.jsx)(l,{sdsIcon:`InfoCircle`,sdsSize:`s`}),size:`large`,sdsType:`primary`,sdsStyle:`minimal`,onClick:()=>n(e=>!e),sdsStage:t?`on`:`off`,backgroundOnHover:!0})}),(0,I.jsx)(_,{sdsType:`overlay`,open:t,closeButtonOnClick:()=>{n(!1)},onClose:()=>n(!1),HeaderComponent:(0,I.jsx)(r,{variant:`h3`,sx:{margin:`0 !important`,padding:`0 !important`},children:`Scrollable Panel`}),position:`right`,...e,children:y}),(0,I.jsxs)(a,{children:[(0,I.jsx)(r,{variant:`h3`,children:`Scrollable Content`}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y}),(0,I.jsx)(`p`,{children:y})]})]})}})),z,B,V,H,U,W,G;t((()=>{T(),D(),A(),P(),R(),z=e(s()),B={argTypes:{isBackdropClickEnabled:{control:{type:`boolean`},description:`If true, clicking on the backdrop will close the panel. Only applies to overlay panels.`,table:{defaultValue:{summary:`false`}}},position:{control:{type:`select`},description:`Which edge the panel is attached to. A basic panel takes "left" or "right"; an overlay adds "bottom".`,options:[`left`,`right`,`bottom`],table:{defaultValue:{summary:`left`}}},sdsType:{control:{type:`select`},description:`"basic" sits in the page and stays until you close it; "overlay" floats over the page with a header and close button. It also decides which other props apply, so TypeScript needs it spelled out even though the component falls back to "basic".`,options:[`basic`,`overlay`],table:{defaultValue:{summary:`basic`}}},transitionDuration:{control:{type:`number`},description:"How long the Panel takes to slide in and out, in milliseconds. Accepts a single number or `{ enter, exit }`. Defaults to 225ms in and 195ms out; `0` removes the animation.",table:{defaultValue:{summary:`{ enter: 225, exit: 195 }`}}},width:{control:{type:`text`},description:`How wide the panel is, or how tall it is when positioned along the bottom. Numbers are read as pixels. Values below the default are ignored, since the panel keeps that as its minimum in both directions.`,table:{defaultValue:{summary:`240 (basic), 320 (overlay)`}}}},component:w,title:`Components/Panel`},V={args:{position:`left`,sdsType:`basic`,width:`320px`}},H={parameters:{a11y:{config:{rules:[{enabled:!1,id:`aria-hidden-focus`}]}},controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(L,{...e})},U={parameters:{a11y:{config:{rules:[{enabled:!1,id:`aria-hidden-focus`}]}},controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(N,{...e})},W={parameters:{controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,z.jsx)(k,{...e})},G=[`Default`,`ScrollBehavior`,`CustomHeaderAndCloseButton`,`Test`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    position: "left",
    sdsType: "basic",
    width: "320px"
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    // TODO: Fix accessibility (a11y) issues once the MUI team resolves the problem
    // with the 'disableEnforceFocus' prop in the Modal component.
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "aria-hidden-focus"
        }]
      }
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
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "aria-hidden-focus"
        }]
      }
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
}`,...W.parameters?.docs?.source}}}}))();export{U as CustomHeaderAndCloseButton,V as Default,H as ScrollBehavior,W as Test,G as __namedExportsOrder,B as default};