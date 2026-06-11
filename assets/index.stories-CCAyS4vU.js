import{i as e}from"./preload-helper-DbRxMUml.js";import{cr as t}from"./iframe-DI6qETgL.js";import{a as n,n as r}from"./utils-B1uyFjm5.js";import{n as i,t as a}from"./customSdsIcon-CKlsVVVI.js";import{n as o,t as s}from"./customSvgIcon-BEFdzOrQ.js";import{n as c,t as l}from"./Banner-B-V-VnjJ.js";var u,d,f,p,m=e((()=>{i(),o(),u=t(),d=[`dismissed`,`dismissible`,`icon`,`intent`,`sdsIconProps`,`sdsType`,`textChild`],f=`Banner text lorem ipsum dolor mit`,p=[`CheckCircle`,`InfoCircle`,(0,u.jsx)(a,{sdsSize:`s`},`customSdsIcon`),(0,u.jsx)(s,{style:{height:16,width:16}},`customSvgIcon`)]})),h,g,_=e((()=>{c(),h=t(),g=e=>{let{sdsType:t,textChild:n}=e;return(0,h.jsx)(l,{sdsType:t,...e,children:n})}})),v,y,b,x,S;e((()=>{m(),_(),n(),v=t(),y={argTypes:{dismissed:{control:{type:`boolean`}},dismissible:{control:{type:`boolean`}},icon:{control:{labels:[`SDS Icon: Check Circle`,`SDS Icon: Info Circle`,`Custom SDS Icon`,`Custom SVG Icon`],type:`select`},mapping:p,options:Object.keys(p)},intent:{control:{type:r},options:[`accent`,`info`,`negative`,`positive`,`notice`]},sdsIconProps:{control:{type:`object`}},sdsType:{control:{type:r},options:[`primary`,`secondary`],required:!0},textChild:{control:{type:`text`},required:!0}},component:g,parameters:{layout:`fullscreen`,axe:{disabledRules:[`landmark-no-duplicate-banner`,`landmark-unique`]}},title:`Components/Banner`},b={args:{dismissed:!1,dismissible:!0,intent:`info`,sdsType:`primary`,textChild:f}},x={args:{dismissible:!0,intent:`info`,sdsType:`primary`,textChild:`test text`},parameters:{controls:{exclude:d},snapshot:{skip:!0}},render:e=>(0,v.jsx)(g,{...e,"data-testid":`banner`})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    dismissed: false,
    dismissible: true,
    intent: "info",
    sdsType: "primary",
    textChild: BANNER_TEXT
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    intent: "info",
    sdsType: "primary",
    textChild: "test text"
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
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Test`]}))();export{b as Default,x as Test,S as __namedExportsOrder,y as default};