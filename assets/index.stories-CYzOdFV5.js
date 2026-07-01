import{i as e}from"./preload-helper-usAeo7Bx.js";import{Gi as t}from"./iframe-Bjh1LYUt.js";import{i as n,n as r,r as i,t as a}from"./Hero-BSBcLPey.js";var o,s,c=e((()=>{r(),o=t(),s=e=>(0,o.jsx)(a,{...e})})),l,u,d,f,p,m,h=e((()=>{l=t(),u=[`theme`,`headerText`,`captionText`,`children`],d=[`None`,`Image`,`Video`],f=[null,(0,l.jsx)(`img`,{src:`https://fastly.picsum.photos/id/13/1000/1000.jpg?hmac=X6sDrAsvlZCC8l4ULPHQrYuBhUV1uV_OAMLE3OB-txA`,alt:`Decorative overlay`},`image`),(0,l.jsx)(`video`,{src:`https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,"aria-label":`Decorative overlay video`},`video`)],p=[`None`,`#6ca6ff (Hex Color)`,`rgb(178, 150, 242) (RGB Color)`,`Image`,`Video`],m=[null,`#6ca6ff`,`rgb(178, 150, 242)`,(0,l.jsx)(`img`,{src:`https://fastly.picsum.photos/id/989/2000/2000.jpg?hmac=AnkuB5HtnIfgnbJhNbYNbOrBAlRSlniemkWIn6hEO_o`,alt:`Decorative background`},`image`),(0,l.jsx)(`video`,{src:`https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,"aria-label":`Decorative background video`},`video`)]})),g,_,v=e((()=>{r(),g=t(),_=e=>(0,g.jsx)(a,{headerText:`Test Hero Component`,captionText:`This is a test instance of the Hero component for snapshot testing and development.`,"data-testid":`hero`,...e})})),y,b,x=e((()=>{r(),n(),y=t(),b=e=>{let{headerText:t,captionText:n,...r}=e;return(0,y.jsx)(a,{headerText:t,captionText:n,...r,children:(0,y.jsx)(i,{children:`Content Slot (childNode)`})})}})),S,C,w,T,E,D;e((()=>{c(),h(),v(),x(),S=t(),C={argTypes:{backgroundFill:{control:{labels:p,type:`select`},mapping:m,options:Object.keys(m),table:{type:{summary:`ReactNode`}},description:`The background fill of the hero`},captionText:{control:{type:`text`},description:`Optional caption text that appears below the header`},darkeningMask:{control:{type:`boolean`},description:`Whether to display the darkening mask`},darkeningMaskColor:{control:{type:`color`,defaultValue:`#000`},description:`The color of the darkening mask`},darkeningMaskOpacity:{control:{type:`number`,defaultValue:0},description:`The opacity of the darkening mask`},darkeningVignette:{control:{type:`boolean`},description:`Whether to display the darkening vignette`},hasInvertTextColor:{control:{type:`boolean`},description:`Whether to invert the text color`},headerFontSize:{control:{type:`select`},options:[`s`,`m`,`l`],description:`The font size of the header text`},headerText:{control:{type:`text`},description:`The main header text displayed prominently in the hero section`},heroHeight:{control:{type:`text`},description:`The height of the hero container`},overlayContainerMinMargin:{control:{type:`object`},description:`The margin of the hero container, supports an object with small, medium, and large values`},overlayContentWidth:{control:{type:`text`},description:`The width of the overlay content`},overlayContentPosition:{control:{type:`select`},options:[`top-left`,`top`,`top-right`,`left`,`center`,`right`,`bottom-left`,`bottom`,`bottom-right`],description:`The position of the overlay content`},overlayMedia:{control:{labels:d,type:`select`},description:`The Overlay Media`,mapping:f,options:Object.keys(f),table:{type:{summary:`ReactNode`}}},overlayMediaPosition:{control:{type:`select`},options:[`top-left`,`top`,`top-right`,`left`,`center`,`right`,`bottom-left`,`bottom`,`bottom-right`],description:`The position of the overlay media`},overlayMediaMaxHeight:{control:{type:`text`},description:`The maximum height of the overlay media`},overlayMediaMaxWidth:{control:{type:`text`},description:`The maximum width of the overlay media`},overlayMediaMargin:{control:{type:`object`},description:`The margin of the overlay media, supports a single string or an object with small, medium, and large values`},textAlignment:{control:{type:`select`},options:[`left`,`center`,`right`],description:`The text alignment of the header text`}},tags:[`beta`],component:s,title:`Components/Hero`},w={args:{headerText:`Header Text`,captionText:`Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.`,darkeningMask:!0,darkeningMaskColor:`#000000`,darkeningMaskOpacity:0,darkeningVignette:!1,overlayMediaMargin:{small:`0px`,medium:`0px`,large:`0px`},overlayContainerMinMargin:{small:`24px`,medium:`40px`,large:`120px`}},parameters:{layout:`fullscreen`}},T={args:{backgroundFill:m[3],darkeningMask:!0,darkeningMaskColor:`#000000`,darkeningMaskOpacity:.5,darkeningVignette:!0,overlayMediaMargin:{small:`24px`,medium:`40px`,large:`120px`},hasInvertTextColor:!0,headerFontSize:`l`,headerText:`Header Text`,heroHeight:`400px`,overlayContainerMinMargin:{small:`24px`,medium:`40px`,large:`120px`},captionText:`Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.`,overlayContentWidth:`50%`,overlayContentPosition:`left`,textAlignment:`left`,overlayMedia:f[1],overlayMediaPosition:`right`,overlayMediaMaxHeight:`200px`,overlayMediaMaxWidth:`400px`},parameters:{layout:`fullscreen`,snapshot:{skip:!0}},render:e=>(0,S.jsx)(b,{...e})},E={parameters:{controls:{exclude:u},snapshot:{skip:!0},layout:`fullscreen`},render:e=>(0,S.jsx)(_,{...e})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D=[`Default`,`FullFeatured`,`Test`]}))();export{w as Default,T as FullFeatured,E as Test,D as __namedExportsOrder,C as default};