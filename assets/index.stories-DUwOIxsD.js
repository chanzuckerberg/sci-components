import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{Mr as n,t as r}from"./material-DlyzFPof.js";import{t as i}from"./jsx-runtime-cM__dR4X.js";import{Ut as a,t as o}from"./iframe-BwNEaAUe.js";import{a as s,n as c}from"./utils-CbT4iKc5.js";import{n as l,t as u}from"./NavigationFooter-BYBwqbka.js";import{_ as d,d as f,f as p}from"./constants-D0X75oCZ.js";var m,h,g=t((()=>{l(),m=e(i()),h=e=>(0,m.jsx)(u,{...e,title:e.title})}));function _({children:e,height:t,width:r}){let i=a({theme:n()});return(0,v.jsx)(`div`,{style:{alignItems:`center`,border:`1px dashed ${i?.base.borderPrimary}`,color:i?.base.textSecondary,display:`flex`,fontSize:10,fontWeight:`normal`,height:t,justifyContent:`center`,whiteSpace:`nowrap`,width:r},children:e})}var v,y,b,x=t((()=>{r(),o(),v=e(i()),y={placeholder:(0,v.jsx)(_,{width:64,height:24,children:`Logo Slot`},`logo`),none:null},b=[`hasInvertedStyle`,`images`,`logo`,`logoUrl`,`navItems`,`navLinks`,`tag`,`tagColor`,`title`]})),S,C,w=t((()=>{l(),S=e(i()),C=e=>(0,S.jsx)(u,{"data-testid":`navigation-footer`,title:`Test Title`,...e})})),T,E,D,O,k;t((()=>{g(),x(),w(),d(),s(),T=e(i()),E={argTypes:{backgroundAppearance:{control:{type:c},description:`The background appearance of the navigation header.`,options:[`matchBackground`,`dark`],table:{defaultValue:{summary:`matchBackground`}}},images:{control:{type:`object`},description:`An array of images displayed in the footer. Each item includes an image, optional link URL, and component.`},logo:{control:{labels:{placeholder:`Logo Placeholder`,none:`None`},type:`select`},description:`The logo displayed in the footer. Can be any valid React node such as an image, icon, or SVG.`,mapping:y,options:Object.keys(y)},logoUrl:{control:{type:`text`},description:`If provided, clicking the logo will navigate to this URL.`},navItems:{control:{type:`object`},description:`The prominent links on the top row, next to the logo. They are headings, not body text, and get no dividers.`},navLinks:{control:{type:`object`},description:`The smaller links on the bottom row, drawn in one line with dividers between them.`},tag:{control:{type:`text`},description:`A small label displayed next to the title.`},tagColor:{control:{labels:p,type:`select`},description:`The Tag's color. A tuple sets the label, background, and icon colors by hand.`,mapping:f,options:Object.keys(f)},title:{control:{type:`text`},description:`The main title displayed in the footer.`}},component:h,title:`Components/NavigationFooter`},D={args:{backgroundAppearance:`matchBackground`,images:[{image:(0,T.jsx)(_,{width:64,height:24,children:`Image Slot`}),url:`https://example.com/1`},{image:(0,T.jsx)(_,{width:64,height:24,children:`Image Slot`}),url:`https://example.com/2`}],logo:y.placeholder,logoUrl:`https://example.com`,navItems:Array.from([,,,,,]).map((e,t)=>({component:`a`,label:`Nav Item`,linkProps:{target:`_blank`},url:`https://example.com/nav/${t+1}`})),navLinks:Array.from([,,,,,]).map((e,t)=>({label:`Link Item`,url:`https://example.com/nav/${t+1}`})),tag:`Beta`,tagColor:`beta`,title:`Logo Name`},parameters:{layout:`fullscreen`}},O={parameters:{controls:{exclude:b},layout:`fullscreen`,snapshot:{skip:!0}},render:e=>(0,T.jsx)(C,{...e})},k=[`Default`,`Test`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
    logo: NAVIGATION_FOOTER_LOGO_OPTIONS.placeholder,
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}}}))();export{D as Default,O as Test,k as __namedExportsOrder,E as default};