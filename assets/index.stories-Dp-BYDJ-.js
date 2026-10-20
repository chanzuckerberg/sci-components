import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-8L1H2VAU.js";import{a as r,n as i}from"./utils-BxIa431Z.js";import{n as a,t as o}from"./Banner-jdz9zHSY.js";import{n as s,t as c}from"./customSdsIcon-KZ55RhX8.js";import{n as l,t as u}from"./customSvgIcon-FL7KVyDY.js";var d,f,p,m,h,g,_=e((()=>{s(),l(),d=t(n()),{action:f}=__STORYBOOK_MODULE_ACTIONS__,p={onClose:f(`onClose`)},m=[`children`,`dismissed`,`dismissible`,`icon`,`intent`,`sdsIconProps`,`sdsType`],h=`Banner text lorem ipsum dolor mit`,g={checkCircle:`CheckCircle`,infoCircle:`InfoCircle`,customSdsIcon:(0,d.jsx)(c,{sdsSize:`s`},`customSdsIcon`),customSvgIcon:(0,d.jsx)(u,{style:{height:16,width:16}},`customSvgIcon`)}})),v,y,b=e((()=>{a(),v=t(n()),y=e=>(0,v.jsx)(o,{...e})})),x,S,C,w,T;e((()=>{_(),b(),r(),x=t(n()),S={argTypes:{children:{control:{type:`text`},description:`Required. The content of the Banner, laid out beside the icon and centered in the space left by the close button.`,required:!0},dismissed:{control:{type:`boolean`},description:`If true, the banner has been dismissed and renders nothing. Leave this unset to let the Banner keep track of its own dismissed state. Passing any value, false included, takes that over: the close button then only fires onClose, and the Banner closes when you set dismissed to true.`},dismissible:{control:{type:`boolean`},description:`If true, the banner can be dismissed by the user. This is what controls whether the close button is rendered.`,table:{defaultValue:{summary:`true`}}},icon:{control:{labels:{checkCircle:`SDS Icon: Check Circle`,infoCircle:`SDS Icon: Info Circle`,customSdsIcon:`Custom SDS Icon`,customSvgIcon:`Custom SVG Icon`},type:`select`},description:`The name of an SDS icon, or a custom SVG element, shown in place of the icon the intent would pick. Without it, "positive" shows "CheckCircle", "negative" and "notice" show "ExclamationMarkCircle", and every other intent shows "InfoCircle".`,mapping:g,options:Object.keys(g)},intent:{control:{type:i},description:`The intent color of the Banner component, which also selects the default icon.`,options:[`accent`,`info`,`negative`,`positive`,`notice`],table:{defaultValue:{summary:`info`}}},onClose:{action:p.onClose},sdsIconProps:{control:{type:`object`},description:`Additional props to be passed to the icon component.`},sdsType:{control:{type:i},description:`Required. The primary variant fills the Banner with the intent's primary surface color and uses the on-fill text color. The secondary variant uses the intent's secondary surface color with the standard primary text color.`,options:[`primary`,`secondary`],required:!0}},component:y,parameters:{layout:`fullscreen`,a11y:{config:{rules:[{enabled:!1,id:`landmark-no-duplicate-banner`},{enabled:!1,id:`landmark-unique`}]}}},title:`Components/Banner`},C={args:{children:h,dismissed:!1,dismissible:!0,intent:`info`,sdsType:`primary`}},w={args:{children:`test text`,dismissible:!0,intent:`info`,sdsType:`primary`},parameters:{controls:{exclude:m},snapshot:{skip:!0}},render:e=>(0,x.jsx)(y,{...e,"data-testid":`banner`})},T=[`Default`,`Test`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    children: BANNER_TEXT,
    dismissed: false,
    dismissible: true,
    intent: "info",
    sdsType: "primary"
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: "test text",
    dismissible: true,
    intent: "info",
    sdsType: "primary"
  },
  parameters: {
    controls: {
      exclude: BANNER_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (props: Args): JSX.Element => <Banner {...props} data-testid="banner" />
}`,...w.parameters?.docs?.source}}}}))();export{C as Default,w as Test,T as __namedExportsOrder,S as default};