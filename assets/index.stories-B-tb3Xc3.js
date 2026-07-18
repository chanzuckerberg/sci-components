import{i as e}from"./preload-helper-xPQekRTU.js";import{Fi as t,Y as n,ct as r,ji as i,t as a}from"./iframe-DocVhSSI.js";import{a as o,n as s}from"./utils-BxIa431Z.js";import{n as c,t as l}from"./NavigationFooter-MS4cVJ7E.js";import{f as u,v as d}from"./constants-Dah2B0TD.js";var f,p,m=e((()=>{c(),f=t(),p=e=>(0,f.jsx)(l,{...e,title:e.title})}));function h({children:e,height:t,width:r}){let a=n({theme:i()});return(0,g.jsx)(`div`,{style:{alignItems:`center`,border:`1px dashed ${a?.base.borderPrimary}`,color:a?.base.textSecondary,display:`flex`,fontSize:10,fontWeight:`normal`,height:t,justifyContent:`center`,whiteSpace:`nowrap`,width:r},children:e})}var g,_,v,y=e((()=>{r(),a(),g=t(),_=[(0,g.jsx)(h,{width:64,height:24,children:`Logo Slot`},`logo`),null],v=[`hasInvertedStyle`,`images`,`logo`,`logoUrl`,`navItems`,`navLinks`,`tag`,`tagColor`,`title`]})),b,x,S=e((()=>{c(),b=t(),x=e=>(0,b.jsx)(l,{"data-testid":`navigation-footer`,title:`Test Title`,...e})})),C,w,T,E,D;e((()=>{m(),y(),S(),d(),o(),C=t(),w={argTypes:{backgroundAppearance:{control:{type:s},description:`The background appearance of the navigation header.`,options:[`matchBackground`,`dark`],table:{defaultValue:{summary:`matchBackground`}}},images:{control:{type:`object`}},logo:{control:{labels:[`Logo Placeholder`,`None`],type:`select`},mapping:_,options:Object.keys(_)},logoUrl:{control:{type:`text`}},navItems:{control:{type:`object`}},navLinks:{control:{type:`object`}},tag:{control:{type:`text`}},tagColor:{control:{labels:[`info`,`positive`,`notice`,`negative`,`beta`,`Custom colors for Label, Background, Icon`],type:`select`},mapping:u,options:Object.keys(u)},title:{control:{type:`text`}}},component:p,title:`Components/NavigationFooter`},T={args:{backgroundAppearance:`matchBackground`,images:[{image:(0,C.jsx)(h,{width:64,height:24,children:`Image Slot`}),url:`https://example.com/1`},{image:(0,C.jsx)(h,{width:64,height:24,children:`Image Slot`}),url:`https://example.com/2`}],logo:_[0],logoUrl:`https://example.com`,navItems:Array.from([,,,,,]).map((e,t)=>({component:`a`,label:`Nav Item`,linkProps:{target:`_blank`},url:`https://example.com/nav/${t+1}`})),navLinks:Array.from([,,,,,]).map((e,t)=>({label:`Link Item`,url:`https://example.com/nav/${t+1}`})),tag:`Beta`,tagColor:`beta`,title:`Logo Name`},parameters:{layout:`fullscreen`}},E={parameters:{controls:{exclude:v},layout:`fullscreen`,snapshot:{skip:!0}},render:e=>(0,C.jsx)(x,{...e})},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    backgroundAppearance: "matchBackground",
    images: [{
      image: <ExampleLogo width={64} height={24}>
            Image Slot
          </ExampleLogo>,
      url: "https://example.com/1"
    }, {
      image: <ExampleLogo width={64} height={24}>
            Image Slot
          </ExampleLogo>,
      url: "https://example.com/2"
    }],
    logo: NAVIGATION_FOOTER_LOGO_OPTIONS[0],
    logoUrl: "https://example.com",
    navItems: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      component: "a",
      label: \`Nav Item\`,
      linkProps: {
        target: "_blank"
      },
      url: \`https://example.com/nav/\${idx + 1}\`
    })),
    navLinks: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      label: \`Link Item\`,
      url: \`https://example.com/nav/\${idx + 1}\`
    })),
    tag: "Beta",
    tagColor: "beta",
    title: "Logo Name"
  },
  parameters: {
    layout: "fullscreen"
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: NAVIGATION_FOOTER_EXCLUDED_CONTROLS
    },
    layout: "fullscreen",
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...E.parameters?.docs?.source}}},D=[`Default`,`Test`]}))();export{T as Default,E as Test,D as __namedExportsOrder,w as default};