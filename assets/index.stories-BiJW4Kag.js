import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./CellHeader-FWKwEMya.js";var o,s=t((()=>{o=[`active`,`direction`,`hideSortIcon`,`horizontalAlign`,`shouldShowTooltipOnHover`,`tooltipProps`,`tooltipText`,`width`,`hover`]})),c,l,u=t((()=>{i(),c=e(r()),l=e=>(0,c.jsx)(`table`,{children:(0,c.jsx)(`tbody`,{children:(0,c.jsx)(`tr`,{children:(0,c.jsx)(a,{"data-testid":`CellHeader`,horizontalAlign:`right`,shouldShowTooltipOnHover:!0,active:!0,tooltipText:`testTooltipTitle`,hover:!0,...e,children:`Header`})})})})})),d,f,p,m=t((()=>{d=e(n()),i(),f=e(r()),p=e=>{let{direction:t,...n}=e,[r,i]=(0,d.useState)(t);return(0,d.useEffect)(()=>{i(t)},[t]),(0,f.jsx)(`table`,{children:(0,f.jsx)(`tbody`,{children:(0,f.jsx)(`tr`,{children:(0,f.jsx)(a,{onClick:()=>{i(e=>e===`asc`?`desc`:`asc`)},direction:r,...n,children:`Header`})})})})}})),h,g,_,v,y;t((()=>{s(),u(),m(),h=e(r()),g={argTypes:{active:{control:{type:`boolean`},description:`Marks this column as the one currently sorted: the label and chevron take the accent color. It does not sort anything on its own.`,table:{defaultValue:{summary:`false`}}},as:{control:{type:`text`},description:`The element the header cell renders as.`,table:{defaultValue:{summary:`th`}}},direction:{control:{type:`select`},description:`Which chevron to draw: up for "asc", down for "desc". It also sets the icon's aria-label.`,options:[`asc`,`desc`],table:{defaultValue:{summary:`desc`}}},hideSortIcon:{control:{type:`boolean`},description:`Leaves the chevron out for columns that cannot be sorted. An active header keeps its chevron even with this set.`,table:{defaultValue:{summary:`false`}}},horizontalAlign:{control:{type:`select`},description:`Horizontally aligns the label and its chevron.`,options:[`left`,`center`,`right`],table:{defaultValue:{summary:`left`}}},hover:{control:{type:`boolean`},description:`Makes the header interactive: it takes a pointer cursor, reacts to hover, renders the sort chevron and allows the tooltip. A header left at the default draws no chevron and shows no tooltip even if the other sorting props are set, so set this on every sortable column.`,table:{defaultValue:{summary:`false`}}},shouldShowTooltipOnHover:{control:{type:`boolean`},description:`Wraps the header in a Tooltip. It only takes effect while hover is also true.`,table:{defaultValue:{summary:`false`}}},shouldTruncate:{control:{type:`boolean`},description:`Keeps a long label on one line and truncates it with an ellipsis instead of wrapping.`,table:{defaultValue:{summary:`false`}}},tooltipProps:{control:{type:`object`},description:`Passed to the Tooltip, and overrides the defaults the header sets (arrow, top-start placement, dark style).`},tooltipSubtitle:{control:{type:`text`},description:`A second line below the tooltip's title.`},tooltipText:{control:{type:`text`},description:`The tooltip's title.`},width:{control:{type:`text`},description:`Lands on the rendered cell as the HTML width attribute, so a number is read as pixels. Browsers treat it as the width of the whole column, and take it as a minimum rather than a promise.`}},component:p,title:`Components/Table/CellHeader`},_={args:{active:!1,direction:`desc`,hideSortIcon:!1,hover:!0,shouldShowTooltipOnHover:!0,tooltipProps:{sdsStyle:`dark`},tooltipText:`This is a header cell`}},v={parameters:{controls:{exclude:o},snapshot:{skip:!0}},render:e=>(0,h.jsx)(l,{...e})},y=[`Default`,`Test`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}}}))();export{_ as Default,v as Test,y as __namedExportsOrder,g as default};