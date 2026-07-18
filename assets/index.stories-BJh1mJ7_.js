import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Qa as r,ct as i,wn as a}from"./iframe-DocVhSSI.js";import{a as o,o as s}from"./loremIpsum-BqYjZDri.js";import{a as c,n as l}from"./utils-BxIa431Z.js";import{n as u,t as d}from"./customSdsIcon-DJ7jYb_X.js";import{n as f,t as p}from"./customSvgIcon-D5sv3OTJ.js";import{n as m,t as h}from"./InputToggle-ChTq3F24.js";import{n as g,t as _}from"./Notification-DtZRt2fS.js";import{n as v,t as y}from"./default-BvY44abH.js";var b,x,S,C=e((()=>{i(),b=t(r()),s(),m(),g(),v(),x=n(),S=e=>{let{intent:t,onClose:n,buttonOnClick:r,buttonText:i,slideDirection:s,extraContent:c,autoDismiss:l}=e,[u,d]=(0,b.useState)(!1);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{control:(0,x.jsx)(h,{checked:u,onChange:()=>{d(e=>!e)}}),label:`Hide Notification`,sx:{"& .MuiSwitch-root":{mr:`12px`},margin:`0 0 16px 0`}}),(0,x.jsxs)(_,{autoDismiss:l,dismissed:u,slideDirection:s,intent:t,onClose:n,buttonOnClick:r,buttonText:i,...e,children:[`This is a notification!`,c&&(0,x.jsxs)(`div`,{children:[o,(0,x.jsx)(`div`,{style:{marginTop:10},children:(0,x.jsx)(y,{data:[{dataRows:[{label:`Lorem ipsum`,value:14.03},{label:`Dollor`,value:432.53},{label:`Sit amet`,value:`7,776.05`}]}]})})]})]})]})}})),w,T,E,D,O,k,A,j,M,N=e((()=>{u(),f(),w=n(),{action:T}=__STORYBOOK_MODULE_ACTIONS__,E=[`autoDismiss`,`buttonOnClick`,`buttonPosition`,`extraContent`,`icon`,`intent`,`onClose`,`sdsIconProps`,`slideDirection`,`label`],D=[(0,w.jsx)(p,{},`customSdsIcon`),(0,w.jsx)(d,{},`customSvgIcon`),`Book`,`CheckCircle`],O=[T(`onClick`),void 0],k=[T(`onClick`),void 0],A=[`info`,`negative`,`positive`,`notice`],j=[!1,!0],M=[void 0,T(`onClick`)]})),P,F,I,L=e((()=>{P=t(r()),N(),s(),g(),F=n(),I=()=>{return(0,F.jsx)(F.Fragment,{children:A.map(t=>(0,F.jsx)(e,{intent:t},t))});function e({intent:e}){return(0,F.jsxs)(`div`,{style:{columnGap:`25px`,display:`inline-grid`,fontFamily:`sans-serif`,marginLeft:`50px`},children:[(0,F.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 3`,marginBottom:0},children:[`Intent: `,(0,F.jsx)(`b`,{children:e})]}),j.map(n=>(0,F.jsx)(t,{intent:e,extraContent:n},String(n)))]})}function t({intent:e,extraContent:t}){let n={borderStyle:`solid none none none`,fontSize:`1.17em`,gridColumn:`1 / 3`,justifySelf:`stretch`,marginBottom:10,paddingTop:10},r={fontSize:`0.67em`,margin:`10px 0`};return(0,F.jsxs)(`div`,{style:{display:`contents`},children:[(0,F.jsxs)(`p`,{style:n,children:[`Extra content: `,(0,F.jsx)(`b`,{children:t?`yes`:`no`})]}),M.map(n=>(0,F.jsxs)(P.Fragment,{children:[(0,F.jsxs)(`p`,{style:r,children:[`Button: `,(0,F.jsx)(`b`,{children:n?`yes`:`no`})]}),(0,F.jsxs)(_,{slideDirection:`left`,"data-testid":`notification`,intent:e,extraContent:t,buttonOnClick:n,buttonText:`Click here`,children:[`Notification test text`,t&&(0,F.jsx)(`div`,{children:o})]},String(n))]},`parent`+String(n)))]})}}})),R,z,B=e((()=>{g(),R=n(),z=e=>(0,R.jsx)(_,{slideDirection:`left`,intent:`info`,...e,"data-testid":`notification`,children:`this is a notification`})})),V,H,U,W,G,K;e((()=>{C(),N(),L(),B(),c(),V=n(),H={argTypes:{autoDismiss:{control:{type:`select`},options:[!0,!1,4e3,12e3,2e4]},buttonOnClick:{control:{labels:[`() => {}`,`undefined`],type:`select`},mapping:O,options:Object.keys(O)},buttonPosition:{control:{type:l},options:[`left`,`right`]},extraContent:{control:{type:`boolean`}},icon:{control:{labels:[`Custom SVG Icon`,`Custom SDS Icon`,`SDS Icon: Book`,`SDS Icon: Check Circle`],type:`select`},mapping:D,options:Object.keys(D)},intent:{control:{type:l},options:[`accent`,`info`,`negative`,`positive`,`notice`]},onClose:{control:{labels:[`() => {}`,`undefined`],type:`select`},mapping:k,options:Object.keys(k)},sdsIconProps:{control:{type:`object`}},slideDirection:{control:{type:l},options:[`left`,`right`]}},component:S,title:`Components/Notification`},U={args:{autoDismiss:!1,buttonPosition:`right`,buttonText:`Click me`,extraContent:!1,slideDirection:`left`}},W={args:{label:`Label`},parameters:{controls:{exclude:E},snapshot:{skip:!0},axe:{disabledRules:[`color-contrast`]}},render:e=>(0,V.jsx)(I,{...e})},G={parameters:{controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,V.jsx)(z,{...e})},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    autoDismiss: false,
    buttonPosition: "right",
    buttonText: "Click me",
    extraContent: false,
    slideDirection: "left"
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  parameters: {
    controls: {
      exclude: NOTIFICATION_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    },
    axe: {
      disabledRules: ["color-contrast"]
    }
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: NOTIFICATION_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...G.parameters?.docs?.source}}},K=[`Default`,`ScreenshotTest`,`Test`]}))();export{U as Default,W as ScreenshotTest,G as Test,K as __namedExportsOrder,H as default};