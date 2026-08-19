import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-s0DqqZ6S.js";import{i as r,n as i,r as a,t as o}from"./Hero-DjFGSw8d.js";var s,c,l=e((()=>{i(),s=t(n()),c=e=>(0,s.jsx)(o,{...e})})),u,d,f,p,m,h,g=e((()=>{u=t(n()),d=[`theme`,`headerText`,`captionText`,`children`],f=[`None`,`Image`,`Video`],p=[null,(0,u.jsx)(`img`,{src:`https://fastly.picsum.photos/id/13/1000/1000.jpg?hmac=X6sDrAsvlZCC8l4ULPHQrYuBhUV1uV_OAMLE3OB-txA`,alt:`Decorative overlay`},`image`),(0,u.jsx)(`video`,{src:`https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,"aria-label":`Decorative overlay video`},`video`)],m=[`None`,`#6ca6ff (Hex Color)`,`rgb(178, 150, 242) (RGB Color)`,`Image`,`Video`],h=[null,`#6ca6ff`,`rgb(178, 150, 242)`,(0,u.jsx)(`img`,{src:`https://fastly.picsum.photos/id/989/2000/2000.jpg?hmac=AnkuB5HtnIfgnbJhNbYNbOrBAlRSlniemkWIn6hEO_o`,alt:`Decorative background`},`image`),(0,u.jsx)(`video`,{src:`https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,"aria-label":`Decorative background video`},`video`)]})),_,v,y=e((()=>{i(),_=t(n()),v=e=>(0,_.jsx)(o,{headerText:`Test Hero Component`,captionText:`This is a test instance of the Hero component for snapshot testing and development.`,"data-testid":`hero`,...e})})),b,x,S=e((()=>{i(),r(),b=t(n()),x=e=>{let{headerText:t,captionText:n,...r}=e;return(0,b.jsx)(o,{headerText:t,captionText:n,...r,children:(0,b.jsx)(a,{children:`Content Slot (childNode)`})})}})),C,w,T,E,D,O;e((()=>{l(),g(),y(),S(),C=t(n()),w={argTypes:{backgroundFill:{control:{labels:m,type:`select`},mapping:h,options:Object.keys(h),table:{type:{summary:`ReactNode`}},description:`The background fill of the hero`},captionText:{control:{type:`text`},description:`Optional caption text that appears below the header`},darkeningMask:{control:{type:`boolean`},description:`Whether to display the darkening mask`},darkeningMaskColor:{control:{type:`color`,defaultValue:`#000`},description:`The color of the darkening mask`},darkeningMaskOpacity:{control:{type:`number`,defaultValue:0},description:`The opacity of the darkening mask`},darkeningVignette:{control:{type:`boolean`},description:`Whether to display the darkening vignette`},hasInvertTextColor:{control:{type:`boolean`},description:`Whether to set the text in the light color, for a dark backdrop`},headerFontSize:{control:{type:`select`},options:[`s`,`m`,`l`],description:`The font size of the header text`},headerText:{control:{type:`text`},description:`The main header text displayed prominently in the hero section`},heroHeight:{control:{type:`text`},description:`The height of the hero container`},overlayContainerMinMargin:{control:{type:`object`},description:`The margin of the hero container, supports an object with small, medium, and large values`},overlayContentWidth:{control:{type:`text`},description:`The width of the overlay content`},overlayContentPosition:{control:{type:`select`},options:[`top-left`,`top`,`top-right`,`left`,`center`,`right`,`bottom-left`,`bottom`,`bottom-right`],description:`The position of the overlay content`},overlayMedia:{control:{labels:f,type:`select`},description:`The Overlay Media`,mapping:p,options:Object.keys(p),table:{type:{summary:`ReactNode`}}},overlayMediaPosition:{control:{type:`select`},options:[`top-left`,`top`,`top-right`,`left`,`center`,`right`,`bottom-left`,`bottom`,`bottom-right`],description:`The position of the overlay media`},overlayMediaMaxHeight:{control:{type:`text`},description:`The maximum height of the overlay media`},overlayMediaMaxWidth:{control:{type:`text`},description:`The maximum width of the overlay media`},overlayMediaMargin:{control:{type:`object`},description:`The margin of the overlay media, supports a single string or an object with small, medium, and large values`},textAlignment:{control:{type:`select`},options:[`left`,`center`,`right`],description:`The text alignment of the header text`}},component:c,title:`Components/Hero`},T={args:{headerText:`Header Text`,captionText:`Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.`,darkeningMask:!0,darkeningMaskColor:`#000000`,darkeningMaskOpacity:0,darkeningVignette:!1,overlayMediaMargin:{small:`0px`,medium:`0px`,large:`0px`},overlayContainerMinMargin:{small:`24px`,medium:`40px`,large:`120px`}},parameters:{layout:`fullscreen`}},E={args:{backgroundFill:h[3],darkeningMask:!0,darkeningMaskColor:`#000000`,darkeningMaskOpacity:.5,darkeningVignette:!0,overlayMediaMargin:{small:`24px`,medium:`40px`,large:`120px`},hasInvertTextColor:!0,headerFontSize:`l`,headerText:`Header Text`,heroHeight:`400px`,overlayContainerMinMargin:{small:`24px`,medium:`40px`,large:`120px`},captionText:`Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.`,overlayContentWidth:`50%`,overlayContentPosition:`left`,textAlignment:`left`,overlayMedia:p[1],overlayMediaPosition:`right`,overlayMediaMaxHeight:`200px`,overlayMediaMaxWidth:`400px`},parameters:{layout:`fullscreen`,snapshot:{skip:!0}},render:e=>(0,C.jsx)(x,{...e})},D={parameters:{controls:{exclude:d},snapshot:{skip:!0},layout:`fullscreen`},render:e=>(0,C.jsx)(v,{...e})},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    headerText: "Header Text",
    captionText: "Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    darkeningMask: true,
    darkeningMaskColor: "#000000",
    darkeningMaskOpacity: 0,
    darkeningVignette: false,
    overlayMediaMargin: {
      small: "0px",
      medium: "0px",
      large: "0px"
    },
    overlayContainerMinMargin: {
      small: "24px",
      medium: "40px",
      large: "120px"
    }
  },
  parameters: {
    layout: "fullscreen"
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    backgroundFill: HERO_BACKGROUND_FILL_OPTIONS[3],
    darkeningMask: true,
    darkeningMaskColor: "#000000",
    darkeningMaskOpacity: 0.5,
    darkeningVignette: true,
    overlayMediaMargin: {
      small: "24px",
      medium: "40px",
      large: "120px"
    },
    hasInvertTextColor: true,
    headerFontSize: "l",
    headerText: "Header Text",
    heroHeight: "400px",
    overlayContainerMinMargin: {
      small: "24px",
      medium: "40px",
      large: "120px"
    },
    captionText: "Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    overlayContentWidth: "50%",
    overlayContentPosition: "left",
    textAlignment: "left",
    overlayMedia: HERO_OVERLAY_MEDIA_OPTIONS[1],
    overlayMediaPosition: "right",
    overlayMediaMaxHeight: "200px",
    overlayMediaMaxWidth: "400px"
  },
  parameters: {
    layout: "fullscreen",
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <FullFeaturedDemo {...args} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: HERO_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    },
    layout: "fullscreen"
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...D.parameters?.docs?.source}}},O=[`Default`,`FullFeatured`,`Test`]}))();export{T as Default,E as FullFeatured,D as Test,O as __namedExportsOrder,w as default};