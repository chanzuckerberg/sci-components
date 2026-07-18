import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Qa as r}from"./iframe-DocVhSSI.js";import{n as i,t as a}from"./CellHeader-DYJxF4aM.js";var o,s=e((()=>{o=[`active`,`direction`,`hideSortIcon`,`horizontalAlign`,`shouldShowTooltipOnHover`,`tooltipProps`,`tooltipText`,`width`,`hover`]})),c,l,u=e((()=>{i(),c=n(),l=e=>(0,c.jsx)(`table`,{children:(0,c.jsx)(`tbody`,{children:(0,c.jsx)(`tr`,{children:(0,c.jsx)(a,{"data-testid":`CellHeader`,horizontalAlign:`right`,shouldShowTooltipOnHover:!0,active:!0,tooltipText:`testTooltipTitle`,hover:!0,...e,children:`Header`})})})})})),d,f,p,m=e((()=>{d=t(r()),i(),f=n(),p=e=>{let{direction:t,...n}=e,[r,i]=(0,d.useState)(t);return(0,d.useEffect)(()=>{i(t)},[t]),(0,f.jsx)(`table`,{children:(0,f.jsx)(`tbody`,{children:(0,f.jsx)(`tr`,{children:(0,f.jsx)(a,{onClick:()=>{i(e=>e===`asc`?`desc`:`asc`)},direction:r,...n,children:`Header`})})})})}})),h,g,_,v,y;e((()=>{s(),u(),m(),h=n(),g={argTypes:{active:{control:{type:`boolean`}},direction:{control:{type:`select`},options:[`asc`,`desc`]},hideSortIcon:{control:{type:`boolean`}},horizontalAlign:{control:{type:`select`},options:[`left`,`center`,`right`]},hover:{control:{type:`boolean`}},shouldShowTooltipOnHover:{control:{type:`boolean`}},tooltipProps:{control:{type:`object`}},tooltipText:{control:{type:`text`}},width:{control:{type:`text`}}},component:p,title:`Components/Table/CellHeader`},_={args:{active:!1,direction:`desc`,hideSortIcon:!1,hover:!0,shouldShowTooltipOnHover:!0,tooltipProps:{sdsStyle:`dark`},tooltipText:`This is a header cell`}},v={parameters:{controls:{exclude:o},snapshot:{skip:!0}},render:e=>(0,h.jsx)(l,{...e})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    active: false,
    direction: "desc",
    hideSortIcon: false,
    hover: true,
    shouldShowTooltipOnHover: true,
    tooltipProps: {
      sdsStyle: "dark"
    },
    tooltipText: "This is a header cell"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: CELL_HEADER_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...v.parameters?.docs?.source}}},y=[`Default`,`Test`]}))();export{_ as Default,v as Test,y as __namedExportsOrder,g as default};