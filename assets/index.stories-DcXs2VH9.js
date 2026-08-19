import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{E as n,Eo as r,Hn as i,bo as a,mn as o}from"./iframe-CLRePdsX.js";import{a as s,n as c}from"./utils-BxIa431Z.js";import{n as l,t as u}from"./NavigationFooter-Ce_Hv2YW.js";import{f as d,v as f}from"./constants-7KSp4Ca3.js";var p,m,h=e((()=>{l(),p=t(r()),m=e=>(0,p.jsx)(u,{...e,title:e.title})}));function g({children:e,height:t,width:n}){let r=o({theme:a()});return(0,_.jsx)(`div`,{style:{alignItems:`center`,border:`1px dashed ${r?.base.borderPrimary}`,color:r?.base.textSecondary,display:`flex`,fontSize:10,fontWeight:`normal`,height:t,justifyContent:`center`,whiteSpace:`nowrap`,width:n},children:e})}var _,v,y,b=e((()=>{i(),n(),_=t(r()),v=[(0,_.jsx)(g,{width:64,height:24,children:`Logo Slot`},`logo`),null],y=[`hasInvertedStyle`,`images`,`logo`,`logoUrl`,`navItems`,`navLinks`,`tag`,`tagColor`,`title`]})),x,S,C=e((()=>{l(),x=t(r()),S=e=>(0,x.jsx)(u,{"data-testid":`navigation-footer`,title:`Test Title`,...e})})),w,T,E,D,O;e((()=>{h(),b(),C(),f(),s(),w=t(r()),T={argTypes:{backgroundAppearance:{control:{type:c},description:`The background appearance of the navigation header.`,options:[`matchBackground`,`dark`],table:{defaultValue:{summary:`matchBackground`}}},images:{control:{type:`object`}},logo:{control:{labels:[`Logo Placeholder`,`None`],type:`select`},mapping:v,options:Object.keys(v)},logoUrl:{control:{type:`text`}},navItems:{control:{type:`object`}},navLinks:{control:{type:`object`}},tag:{control:{type:`text`}},tagColor:{control:{labels:[`info`,`positive`,`notice`,`negative`,`beta`,`Custom colors for Label, Background, Icon`],type:`select`},mapping:d,options:Object.keys(d)},title:{control:{type:`text`}}},component:m,title:`Components/NavigationFooter`},E={args:{backgroundAppearance:`matchBackground`,images:[{image:(0,w.jsx)(g,{width:64,height:24,children:`Image Slot`}),url:`https://example.com/1`},{image:(0,w.jsx)(g,{width:64,height:24,children:`Image Slot`}),url:`https://example.com/2`}],logo:v[0],logoUrl:`https://example.com`,navItems:Array.from([,,,,,]).map((e,t)=>({component:`a`,label:`Nav Item`,linkProps:{target:`_blank`},url:`https://example.com/nav/${t+1}`})),navLinks:Array.from([,,,,,]).map((e,t)=>({label:`Link Item`,url:`https://example.com/nav/${t+1}`})),tag:`Beta`,tagColor:`beta`,title:`Logo Name`},parameters:{layout:`fullscreen`}},D={parameters:{controls:{exclude:y},layout:`fullscreen`,snapshot:{skip:!0}},render:e=>(0,w.jsx)(S,{...e})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O=[`Default`,`Test`]}))();export{E as Default,D as Test,O as __namedExportsOrder,T as default};