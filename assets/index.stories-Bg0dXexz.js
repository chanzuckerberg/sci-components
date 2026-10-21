import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./InputSlider-bZo604q0.js";var o,s,c,l,u=t((()=>{o=[`defaultValue`,`disabled`,`marks`,`max`,`min`,`step`,`valueLabelDisplay`],s=(e,t)=>[{label:e,value:e},{label:((t-e)/2+e).toFixed(0),value:(t-e)/2+e},{label:t,value:t}],c={height:180,marginLeft:20,marginTop:15,width:180},l={display:`grid`,gridColumnGap:40,gridTemplateColumns:`repeat(2, 180px)`,margin:`15px 0 0 20px`}})),d,f,p,m=t((()=>{d=e(n()),i(),u(),f=e(r()),p=e=>{let{marks:t,max:n,min:r,defaultValue:i,...o}=e,[l,u]=(0,d.useState)(i);(0,d.useEffect)(()=>{u(i)},[i]);let p=s(r,n),m=(e,t)=>{u(t)};return(0,f.jsx)(`div`,{style:c,children:(0,f.jsx)(a,{...o,max:n,min:r,value:l,onChange:m,marks:t?p:!1,"aria-label":`Input slider demo`})})}})),h,g,_,v=t((()=>{h=e(n()),i(),u(),g=e(r()),_=e=>{let{marks:t,max:n,min:r,defaultValue:i,...o}=e,[c,u]=(0,h.useState)(i);(0,h.useEffect)(()=>{u(i)},[i]);let d=s(r,n),f=(e,t)=>{u(t)};return(0,g.jsx)(`div`,{style:l,children:(0,g.jsx)(a,{...o,max:n,min:r,value:c,onChange:f,"data-testid":`test-input-slider`,marks:t?d:!1})})}})),y,b,x,S,C,w;t((()=>{m(),v(),u(),y=e(r()),b={argTypes:{defaultValue:{description:`The default value. Use when the component is not controlled. Pass a number for a single thumb, or two numbers for a range.`},disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},marks:{control:{type:`boolean`},description:"Marks indicate predetermined values to which the user can move the slider. If `true` the marks are spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys.",table:{defaultValue:{summary:`false`}}},max:{control:{type:`number`},description:`The maximum allowed value of the slider. Should not be equal to min.`,table:{defaultValue:{summary:`100`}}},min:{control:{type:`number`},description:`The minimum allowed value of the slider. Should not be equal to max.`,table:{defaultValue:{summary:`0`}}},step:{control:{type:`number`},description:"The granularity with which the slider can step through values. The `min` prop serves as the origin for the valid values, and (max - min) should be evenly divisible by the step. When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.",table:{defaultValue:{summary:`1`}}},valueLabelDisplay:{control:{type:`select`},description:"Controls when the value label is displayed: `auto` displays it when the thumb is hovered or focused, `on` displays it persistently, and `off` never displays it.",options:[`auto`,`off`,`on`],table:{defaultValue:{summary:`off`}}}},component:p,parameters:{a11y:{config:{rules:[{enabled:!1,id:`label`}]}}},title:`Components/Inputs/InputSlider`},x={args:{defaultValue:75,disabled:!1,marks:!0,max:100,min:0,step:5,valueLabelDisplay:`on`}},S={args:{defaultValue:[15,85],disabled:!1,marks:!0,max:100,min:0,step:5,valueLabelDisplay:`on`}},C={args:{defaultValue:15,max:100,min:0},parameters:{controls:{exclude:o},snapshot:{skip:!0}},render:e=>(0,y.jsx)(_,{...e,"data-testid":`input-slider`})},w=[`Default`,`RangeSlider`,`Test`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 75,
    disabled: false,
    marks: true,
    max: 100,
    min: 0,
    step: 5,
    valueLabelDisplay: "on"
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [15, 85],
    disabled: false,
    marks: true,
    max: 100,
    min: 0,
    step: 5,
    valueLabelDisplay: "on"
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 15,
    max: 100,
    min: 0
  },
  parameters: {
    controls: {
      exclude: INPUT_SLIDER_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} data-testid="input-slider" />
}`,...C.parameters?.docs?.source}}}}))();export{x as Default,S as RangeSlider,C as Test,w as __namedExportsOrder,b as default};