import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Kr as n,cr as r}from"./iframe-DI6qETgL.js";import{n as i,t as a}from"./InputToggle-OGwSMRuJ.js";var o,s,c=t((()=>{i(),o=r(),s=e=>(0,o.jsx)(a,{...e,inputProps:{"aria-label":`Input Toggle`}})})),l,u=t((()=>{l=[`disabled`]})),d,f,p,m=t((()=>{d=e(n()),i(),f=r(),p=e=>{let[t,n]=(0,d.useState)(!0);function r(){n(e=>!e)}return(0,f.jsx)(a,{...e,checked:t,onChange:r})}})),h,g,_,v,y,b;t((()=>{i(),c(),u(),m(),h=r(),g={argTypes:{disabled:{control:{type:`boolean`}},offLabel:{control:{type:`text`},defaultValue:`Off`},onLabel:{control:{type:`text`},defaultValue:`On`},width:{control:{type:`number`},defaultValue:62}},component:s,parameters:{axe:{disabledRules:[`label`]}},title:`Components/Inputs/InputToggle`},_={args:{disabled:!1,width:62}},v={parameters:{controls:{exclude:l},snapshot:{skip:!1}},render:e=>(0,h.jsx)(p,{...e})},y={args:{disabled:!1},parameters:{controls:{exclude:l},snapshot:{skip:!0}},render:e=>(0,h.jsx)(a,{...e,"data-testid":`test-toggle`})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b=[`Default`,`Controlled`,`Test`]}))();export{v as Controlled,_ as Default,y as Test,b as __namedExportsOrder,g as default};