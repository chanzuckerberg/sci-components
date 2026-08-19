import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-s0DqqZ6S.js";import{a as r,n as i}from"./utils-BxIa431Z.js";import{n as a,t as o}from"./Banner-B_dlQSnY.js";import{n as s,t as c}from"./customSdsIcon-Db4ceVER.js";import{n as l,t as u}from"./customSvgIcon-Dtg7hivA.js";var d,f,p,m,h,g,_=e((()=>{s(),l(),d=t(n()),{action:f}=__STORYBOOK_MODULE_ACTIONS__,p={onClose:f(`onClose`)},m=[`children`,`dismissed`,`dismissible`,`icon`,`intent`,`sdsIconProps`,`sdsType`],h=`Banner text lorem ipsum dolor mit`,g=[`CheckCircle`,`InfoCircle`,(0,d.jsx)(c,{sdsSize:`s`},`customSdsIcon`),(0,d.jsx)(u,{style:{height:16,width:16}},`customSvgIcon`)]})),v,y,b=e((()=>{a(),v=t(n()),y=e=>(0,v.jsx)(o,{...e})})),x,S,C,w,T;e((()=>{_(),b(),r(),x=t(n()),S={argTypes:{children:{control:{type:`text`},required:!0},dismissed:{control:{type:`boolean`}},dismissible:{control:{type:`boolean`}},icon:{control:{labels:[`SDS Icon: Check Circle`,`SDS Icon: Info Circle`,`Custom SDS Icon`,`Custom SVG Icon`],type:`select`},mapping:g,options:Object.keys(g)},intent:{control:{type:i},options:[`accent`,`info`,`negative`,`positive`,`notice`]},onClose:{action:p.onClose},sdsIconProps:{control:{type:`object`}},sdsType:{control:{type:i},options:[`primary`,`secondary`],required:!0}},component:y,parameters:{layout:`fullscreen`,axe:{disabledRules:[`landmark-no-duplicate-banner`,`landmark-unique`]}},title:`Components/Banner`},C={args:{children:h,dismissed:!1,dismissible:!0,intent:`info`,sdsType:`primary`}},w={args:{children:`test text`,dismissible:!0,intent:`info`,sdsType:`primary`},parameters:{controls:{exclude:m},snapshot:{skip:!0}},render:e=>(0,x.jsx)(y,{...e,"data-testid":`banner`})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Test`]}))();export{C as Default,w as Test,T as __namedExportsOrder,S as default};