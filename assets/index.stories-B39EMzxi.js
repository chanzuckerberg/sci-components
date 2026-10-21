import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./InputToggle-B-sNzxf2.js";var o,s,c=t((()=>{i(),o=e(r()),s=e=>(0,o.jsx)(a,{...e,slotProps:{input:{"aria-label":`Input Toggle`}}})})),l,u=t((()=>{l=[`disabled`]})),d,f,p,m=t((()=>{d=e(n()),i(),f=e(r()),p=e=>{let[t,n]=(0,d.useState)(!0);function r(){n(e=>!e)}return(0,f.jsx)(a,{...e,checked:t,onChange:r})}})),h,g,_,v,y,b;t((()=>{i(),c(),u(),m(),h=e(r()),g={argTypes:{disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},offLabel:{control:{type:`text`},description:`The text displayed within the InputToggle when it's off.`,table:{defaultValue:{summary:`Off`}}},onLabel:{control:{type:`text`},description:`The text displayed within the InputToggle when it's on.`,table:{defaultValue:{summary:`On`}}},width:{control:{type:`number`},description:`Controls the width of the InputToggle element, in pixels. Increase it when custom labels do not fit.`,table:{defaultValue:{summary:`62`}}}},component:s,parameters:{a11y:{config:{rules:[{enabled:!1,id:`label`}]}}},title:`Components/Inputs/InputToggle`},_={args:{disabled:!1,width:62}},v={parameters:{controls:{exclude:l},snapshot:{skip:!1}},render:e=>(0,h.jsx)(p,{...e})},y={args:{disabled:!1},parameters:{controls:{exclude:l},snapshot:{skip:!0}},render:e=>(0,h.jsx)(a,{...e,"data-testid":`test-toggle`})},b=[`Default`,`Controlled`,`Test`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    width: 62
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: INPUT_TOGGLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      /**
       * (thuang): Take snapshot to ensure the controlled demo is working as expected.
       */
      skip: false
    }
  },
  render: (args: Args) => <ControlledDemo {...args} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false
  },
  parameters: {
    controls: {
      exclude: INPUT_TOGGLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <RawInputToggle {...args} data-testid="test-toggle" />
}`,...y.parameters?.docs?.source}}}}))();export{v as Controlled,_ as Default,y as Test,b as __namedExportsOrder,g as default};