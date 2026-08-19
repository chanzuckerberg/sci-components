import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r,Hn as i,ai as a}from"./iframe-CLRePdsX.js";import{a as o,n as s}from"./utils-BxIa431Z.js";import{n as c,t as l}from"./InputToggle-BpSFmYsW.js";import{n as u,t as d}from"./Notification-Drv10DF9.js";import{a as f,o as p}from"./loremIpsum-BqYjZDri.js";import{n as m,t as h}from"./customSdsIcon-DPhiKIIX.js";import{n as g,t as _}from"./customSvgIcon-L1t6H_T2.js";import{n as v,t as y}from"./default-Cjr8wo1E.js";var b,x,S,C=e((()=>{i(),b=t(n()),p(),c(),u(),v(),x=t(r()),S=e=>{let{intent:t,onClose:n,buttonOnClick:r,buttonText:i,slideDirection:o,extraContent:s,autoDismiss:c}=e,[u,p]=(0,b.useState)(!1);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{control:(0,x.jsx)(l,{checked:u,onChange:()=>{p(e=>!e)}}),label:`Hide Notification`,sx:{"& .MuiSwitch-root":{mr:`12px`},margin:`0 0 16px 0`}}),(0,x.jsxs)(d,{autoDismiss:c,dismissed:u,slideDirection:o,intent:t,onClose:n,buttonOnClick:r,buttonText:i,...e,children:[`This is a notification!`,s&&(0,x.jsxs)(`div`,{children:[f,(0,x.jsx)(`div`,{style:{marginTop:10},children:(0,x.jsx)(y,{data:[{dataRows:[{label:`Lorem ipsum`,value:14.03},{label:`Dollor`,value:432.53},{label:`Sit amet`,value:`7,776.05`}]}]})})]})]})]})}})),w,T,E,D,O,k,A,j,M,N=e((()=>{m(),g(),w=t(r()),{action:T}=__STORYBOOK_MODULE_ACTIONS__,E=[`autoDismiss`,`buttonOnClick`,`buttonPosition`,`extraContent`,`icon`,`intent`,`onClose`,`sdsIconProps`,`slideDirection`,`label`],D=[(0,w.jsx)(_,{},`customSdsIcon`),(0,w.jsx)(h,{},`customSvgIcon`),`Book`,`CheckCircle`],O=[T(`onClick`),void 0],k=[T(`onClick`),void 0],A=[`info`,`negative`,`positive`,`notice`],j=[!1,!0],M=[void 0,T(`onClick`)]})),P,F,I,L=e((()=>{P=t(n()),N(),p(),u(),F=t(r()),I=()=>{return(0,F.jsx)(F.Fragment,{children:A.map(t=>(0,F.jsx)(e,{intent:t},t))});function e({intent:e}){return(0,F.jsxs)(`div`,{style:{columnGap:`25px`,display:`inline-grid`,fontFamily:`sans-serif`,marginLeft:`50px`},children:[(0,F.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 3`,marginBottom:0},children:[`Intent: `,(0,F.jsx)(`b`,{children:e})]}),j.map(n=>(0,F.jsx)(t,{intent:e,extraContent:n},String(n)))]})}function t({intent:e,extraContent:t}){let n={borderStyle:`solid none none none`,fontSize:`1.17em`,gridColumn:`1 / 3`,justifySelf:`stretch`,marginBottom:10,paddingTop:10},r={fontSize:`0.67em`,margin:`10px 0`};return(0,F.jsxs)(`div`,{style:{display:`contents`},children:[(0,F.jsxs)(`p`,{style:n,children:[`Extra content: `,(0,F.jsx)(`b`,{children:t?`yes`:`no`})]}),M.map(n=>(0,F.jsxs)(P.Fragment,{children:[(0,F.jsxs)(`p`,{style:r,children:[`Button: `,(0,F.jsx)(`b`,{children:n?`yes`:`no`})]}),(0,F.jsxs)(d,{slideDirection:`left`,"data-testid":`notification`,intent:e,extraContent:t,buttonOnClick:n,buttonText:`Click here`,children:[`Notification test text`,t&&(0,F.jsx)(`div`,{children:f})]},String(n))]},`parent`+String(n)))]})}}})),R,z,B=e((()=>{u(),R=t(r()),z=e=>(0,R.jsx)(d,{slideDirection:`left`,intent:`info`,...e,"data-testid":`notification`,children:`this is a notification`})})),V,H,U,W,G,K;e((()=>{C(),N(),L(),B(),o(),V=t(r()),H={argTypes:{autoDismiss:{control:{type:`select`},options:[!0,!1,4e3,12e3,2e4]},buttonOnClick:{control:{labels:[`() => {}`,`undefined`],type:`select`},mapping:O,options:Object.keys(O)},buttonPosition:{control:{type:s},options:[`left`,`right`]},icon:{control:{labels:[`Custom SVG Icon`,`Custom SDS Icon`,`SDS Icon: Book`,`SDS Icon: Check Circle`],type:`select`},mapping:D,options:Object.keys(D)},intent:{control:{type:s},options:[`accent`,`info`,`negative`,`positive`,`notice`]},onClose:{control:{labels:[`() => {}`,`undefined`],type:`select`},mapping:k,options:Object.keys(k)},sdsIconProps:{control:{type:`object`}},slideDirection:{control:{type:s},options:[`left`,`right`]}},component:S,title:`Components/Notification`},U={args:{autoDismiss:!1,buttonPosition:`right`,buttonText:`Click me`,extraContent:!1,slideDirection:`left`}},W={args:{label:`Label`},parameters:{controls:{exclude:E},snapshot:{skip:!0},axe:{disabledRules:[`color-contrast`]}},render:e=>(0,V.jsx)(I,{...e})},G={parameters:{controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,V.jsx)(z,{...e})},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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