import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./jsx-runtime-cM__dR4X.js";import{n as r,t as i}from"./Icon-DIKlPr7H.js";import{i as a,r as o}from"./Button-hr5Pmags.js";import{a as s,n as c}from"./utils-CbT4iKc5.js";import{n as l,t as u}from"./ButtonToggle-tVux7ZpA.js";import{a as d,i as f,r as p}from"./constants-D6VGLSE9.js";var m,h,g=t((()=>{a(),l(),m=e(n()),h=e=>{let{backgroundAppearance:t,startIcon:n}=e;return(0,m.jsx)(o,{backgroundAppearance:t,children:(0,m.jsx)(u,{"aria-label":`button-toggle`,startIcon:n,...e})})}})),_,v=t((()=>{_=[`size`,`startIcon`,`endIcon`,`sdsType`,`sdsStyle`,`sdsStage`,`backgroundOnHover`,`disabled`,`children`,`backgroundAppearance`]})),y,b,x=t((()=>{l(),r(),y=e(n()),b=e=>(0,y.jsx)(u,{...e,"data-testid":`button-toggle`,"aria-label":`button-toggle`,sdsStyle:`outline`,startIcon:(0,y.jsx)(i,{sdsIcon:`InfoCircle`,sdsSize:`s`})})})),S,C,w,T,E;t((()=>{g(),v(),x(),d(),s(),S=e(n()),C={argTypes:{backgroundAppearance:{control:{type:c},description:`Button's prop, telling the toggle which surface it sits on so it can pick colors with enough contrast.`,options:[`matchBackground`,`dark`],table:{defaultValue:{summary:`matchBackground`}}},children:{control:{type:`text`},description:`The content of the button, usually its label.`},disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},startIcon:{control:{labels:p,type:`select`},description:'Required. The icon displayed within the component. Pass the SDS Icon component, for example `<Icon sdsIcon="Search" sdsSize="s" />`.',mapping:f,options:Object.keys(f)},size:{control:{type:c},description:"The size of the component. `small` is equivalent to the dense button styling.",options:[`small`,`medium`,`large`],table:{defaultValue:{summary:`large`}}},sdsType:{control:{type:c},description:`Color scheme of the button. Primary uses the accent color in the on stage, secondary stays neutral. Set it explicitly: the on stage resolves its colors before Button applies this default, so an omitted value draws the neutral treatment over a button that is otherwise primary. Button's "destructive" is inherited by the type but has no on-stage treatment, so it should not be used here.`,options:[`primary`,`secondary`],table:{defaultValue:{summary:`primary`}}},sdsStyle:{control:{type:c},description:`Style of the button. ButtonToggle inherits Button's default of "solid", but toggles are designed around "outline" and "minimal", so set one of those explicitly.`,options:[`outline`,`minimal`],table:{defaultValue:{summary:`solid`}}},sdsStage:{control:{type:c},description:`Controls the toggle stage. The component is fully controlled, so keep this value in state and update it from onClick.`,options:[`on`,`off`],table:{defaultValue:{summary:`off`}}}},component:h,title:`Components/Buttons/ButtonToggle`},w={args:{children:`Label`,backgroundAppearance:`matchBackground`,disabled:!1,startIcon:f.download,size:`large`,sdsType:`primary`,sdsStyle:`outline`,sdsStage:`off`}},T={parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,S.jsx)(b,{startIcon:`InfoCircle`,...e})},E=[`Default`,`Test`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Label",
    backgroundAppearance: "matchBackground",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS.download,
    size: "large",
    sdsType: "primary",
    sdsStyle: "outline",
    sdsStage: "off"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: BUTTON_TOGGLE_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo startIcon="InfoCircle" {...args} />
}`,...T.parameters?.docs?.source}}}}))();export{w as Default,T as Test,E as __namedExportsOrder,C as default};