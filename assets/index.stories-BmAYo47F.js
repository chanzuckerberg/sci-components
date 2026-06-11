import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Gn as n,Kr as r,cr as i,st as a}from"./iframe-DI6qETgL.js";import{n as o,t as s}from"./Button-K7qsdWHe.js";import{n as c,t as l}from"./Popover-BEK0iPxM.js";var u,d,f,p=t((()=>{a(),u=e(r()),o(),c(),d=i(),f=e=>{let t=n(),[r,i]=u.useState(null),a=e=>{i(e.currentTarget)},o=()=>{i(null)},c=!!r,f=c?`sds-popover`:void 0;return(0,d.jsxs)(`div`,{children:[(0,d.jsx)(s,{"aria-describedby":f,sdsStyle:`outline`,sdsType:`primary`,size:`large`,onClick:a,children:`Open Popover`}),(0,d.jsx)(l,{id:f,open:c,anchorEl:r,onClose:o,...e,children:(0,d.jsxs)(`div`,{style:{padding:t?.app?.spacing?.xl,border:`dashed 1px ${t?.palette?.sds?.base?.divider}`},children:[`The content of the Popover`,(0,d.jsx)(`br`,{}),` passed to the Popover component as children.`]})})]})}})),m,h,g,_=t((()=>{m=e(r()),o(),c(),h=i(),g=e=>{let[t,n]=m.useState(null);return(0,h.jsxs)(`div`,{children:[(0,h.jsx)(s,{sdsStyle:`minimal`,sdsType:`primary`,size:`large`,onClick:e=>{n(e.currentTarget)},"data-testid":`popover-trigger`,children:`Open Popover`}),(0,h.jsx)(l,{open:!!t,anchorEl:t,onClose:()=>{n(null)},anchorOrigin:{horizontal:`left`,vertical:`bottom`},"data-testid":`popover`,...e,children:(0,h.jsx)(`div`,{"data-testid":`popover-content`,children:`Popover content`})})]})}})),v,y,b,x,S;t((()=>{p(),_(),v=i(),y={argTypes:{anchorOrigin:{control:{type:`object`},description:`This is the point on the anchor where the popover's anchorEl will attach to. Options: vertical: [top, center, bottom]; horizontal: [left, center, right].`,table:{defaultValue:{summary:`{ vertical: 'bottom', horizontal: 'left' }`},type:{summary:`{ horizontal: 'center' | 'left' | 'right' | number, vertical: 'bottom' | 'center' | 'top' | number }`}}},transformOrigin:{control:{type:`object`},description:`This is the point on the popover which will attach to the anchor's origin. The SDS default adds a vertical offset using the theme spacing.`,table:{defaultValue:{summary:`{ vertical: -(spaces.s || 8), horizontal: 0 }`},type:{summary:`{ horizontal: 'center' | 'left' | 'right' | number, vertical: 'bottom' | 'center' | 'top' | number }`}}}},component:f,parameters:{badges:[`stable`],docs:{description:{component:[`This is an SDS wrapper around the MUI Popover component that applies`,`custom SDS box-shadows, borders, and background colors.`,`It accepts the same props as the MUI Popover component.`,``,`For a full list of available props, see the`,`[MUI Popover API documentation](https://mui.com/material-ui/api/popover/).`].join(`
`)}}},title:`Components/Popover`},b={args:{anchorOrigin:{vertical:`bottom`,horizontal:`left`},transformOrigin:{vertical:-8,horizontal:0}}},x={parameters:{snapshot:{skip:!0}},render:e=>(0,v.jsx)(g,{...e})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: -8,
      horizontal: 0
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Test`]}))();export{b as Default,x as Test,S as __namedExportsOrder,y as default};