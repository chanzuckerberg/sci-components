import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Qa as r}from"./iframe-DocVhSSI.js";import{n as i,t as a}from"./InputSlider-Calv_VbK.js";var o,s,c,l,u=e((()=>{o=[`defaultValue`,`disabled`,`marks`,`max`,`min`,`step`,`valueLabelDisplay`],s=(e,t)=>[{label:e,value:e},{label:((t-e)/2+e).toFixed(0),value:(t-e)/2+e},{label:t,value:t}],c={height:180,marginLeft:20,marginTop:15,width:180},l={display:`grid`,gridColumnGap:40,gridTemplateColumns:`repeat(2, 180px)`,margin:`15px 0 0 20px`}})),d,f,p,m=e((()=>{d=t(r()),i(),u(),f=n(),p=e=>{let{marks:t,max:n,min:r,defaultValue:i,...o}=e,[l,u]=(0,d.useState)(i);(0,d.useEffect)(()=>{u(i)},[i]);let p=s(r,n),m=(e,t)=>{u(t)};return(0,f.jsx)(`div`,{style:c,children:(0,f.jsx)(a,{...o,max:n,min:r,value:l,onChange:m,marks:t?p:!1,"aria-label":`Input slider demo`})})}})),h,g,_,v=e((()=>{h=t(r()),i(),u(),g=n(),_=e=>{let{marks:t,max:n,min:r,defaultValue:i,...o}=e,[c,u]=(0,h.useState)(i);(0,h.useEffect)(()=>{u(i)},[i]);let d=s(r,n),f=(e,t)=>{u(t)};return(0,g.jsx)(`div`,{style:l,children:(0,g.jsx)(a,{...o,max:n,min:r,value:c,onChange:f,"data-testid":`test-input-slider`,marks:t?d:!1})})}})),y,b,x,S,C,w;e((()=>{m(),v(),u(),y=n(),b={argTypes:{disabled:{control:{type:`boolean`}},marks:{control:{type:`boolean`}},max:{control:{type:`number`}},min:{control:{type:`number`}},step:{control:{type:`number`}},valueLabelDisplay:{control:{labels:[`auto`,`off`,`on`],type:`select`},options:[`auto`,`off`,`on`]}},component:p,parameters:{axe:{disabledRules:[`label`]}},title:`Components/Inputs/InputSlider`},x={args:{defaultValue:75,disabled:!1,marks:!0,max:100,min:0,step:5,valueLabelDisplay:`on`}},S={args:{defaultValue:[15,85],disabled:!1,marks:!0,max:100,min:0,step:5,valueLabelDisplay:`on`}},C={args:{defaultValue:15,max:100,min:0},parameters:{controls:{exclude:o},snapshot:{skip:!0}},render:e=>(0,y.jsx)(_,{...e,"data-testid":`input-slider`})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w=[`Default`,`RangeSlider`,`Test`]}))();export{x as Default,S as RangeSlider,C as Test,w as __namedExportsOrder,b as default};