import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Eo as n}from"./iframe-8L1H2VAU.js";import{n as r,t as i}from"./Icon-CGj7VeJw.js";import{n as a,t as o}from"./Button-B4RvJGJF.js";import{n as s,t as c}from"./TooltipCondensed-CzV7WclN.js";var l,u,d=e((()=>{a(),r(),s(),l=t(n()),u=e=>{let{title:t,indicator:n}=e;return(0,l.jsx)(`div`,{children:(0,l.jsxs)(`div`,{style:{alignItems:`center`,display:`flex`,flexDirection:`column`,height:`100vh`,justifyContent:`center`},children:[(0,l.jsx)(c,{indicator:n,title:t,...e,children:(0,l.jsx)(o,{"aria-label":`tooltip condensed test button`,"data-testid":`tooltip-hover`,size:`large`,sdsStyle:`minimal`,sdsType:`primary`,children:(0,l.jsx)(i,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`})})}),(0,l.jsx)(`p`,{children:`Hover over the info icon to view the tooltip.`})]})})}})),f,p=e((()=>{f=[`indicator`,`indicatorColor`,`title`]})),m,h,g,_,v;e((()=>{d(),p(),m=t(n()),h={argTypes:{indicator:{control:{type:`boolean`},description:`Draws a 12px round dot before the text.`,table:{defaultValue:{summary:`false`}}},indicatorColor:{control:{type:`color`},description:`The dot's colour, as a CSS colour. Without it the dot occupies its space but cannot be seen.`},title:{control:{type:`text`},description:`The label to show. Pass null when the content is coming through componentSlot instead.`}},component:u,title:`Components/TooltipCondensed`},g={args:{title:`Label`}},_={args:{title:`Test`},parameters:{controls:{exclude:f},snapshot:{skip:!0}},render:e=>(0,m.jsx)(u,{...e,"data-testid":`tooltip-condensed`})},v=[`Default`,`Test`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Label"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Test"
  },
  parameters: {
    controls: {
      exclude: TOOLTIP_CONDENSED_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TooltipCondensed {...args} data-testid="tooltip-condensed" />
}`,..._.parameters?.docs?.source}}}}))();export{g as Default,_ as Test,v as __namedExportsOrder,h as default};