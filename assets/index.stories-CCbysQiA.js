import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r,vt as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{a as o,n as s}from"./utils-CbT4iKc5.js";import{n as c,t as l}from"./InputToggle-B-sNzxf2.js";import{n as u,t as d}from"./Notification-DvEZ8kJS.js";import{a as f,o as p}from"./loremIpsum-_pZR57WL.js";import{n as m,t as h}from"./customSdsIcon-BYERCmh_.js";import{n as g,t as _}from"./customSvgIcon-BPPsT9zB.js";import{n as v,t as y}from"./default-DHXjhqTx.js";var b,x,S,C=t((()=>{r(),b=e(n()),p(),c(),u(),v(),x=e(a()),S=e=>{let{intent:t,onClose:n,buttonOnClick:r,buttonText:a,slideDirection:o,extraContent:s,autoDismiss:c}=e,[u,p]=(0,b.useState)(!1);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(i,{control:(0,x.jsx)(l,{checked:u,onChange:()=>{p(e=>!e)}}),label:`Hide Notification`,sx:{"& .MuiSwitch-root":{mr:`12px`},margin:`0 0 16px 0`}}),(0,x.jsxs)(d,{autoDismiss:c,dismissed:u,slideDirection:o,intent:t,onClose:n,buttonOnClick:r,buttonText:a,...e,children:[`This is a notification!`,s&&(0,x.jsxs)(`div`,{children:[f,(0,x.jsx)(`div`,{style:{marginTop:10},children:(0,x.jsx)(y,{data:[{dataRows:[{label:`Lorem ipsum`,value:14.03},{label:`Dollor`,value:432.53},{label:`Sit amet`,value:`7,776.05`}]}]})})]})]})]})}})),w,T,E,D,O,k,A,j,M,N=t((()=>{m(),g(),w=e(a()),{action:T}=__STORYBOOK_MODULE_ACTIONS__,E=[`autoDismiss`,`buttonOnClick`,`buttonPosition`,`extraContent`,`icon`,`intent`,`onClose`,`sdsIconProps`,`slideDirection`,`label`],D={customSvgIcon:(0,w.jsx)(_,{},`customSdsIcon`),customSdsIcon:(0,w.jsx)(h,{},`customSvgIcon`),book:`Book`,checkCircle:`CheckCircle`},O={action:T(`onClick`),none:void 0},k={action:T(`onClick`),none:void 0},A=[`info`,`negative`,`positive`,`notice`],j=[!1,!0],M=[void 0,T(`onClick`)]})),P,F,I,L=t((()=>{P=e(n()),N(),p(),u(),F=e(a()),I=()=>{return(0,F.jsx)(F.Fragment,{children:A.map(t=>(0,F.jsx)(e,{intent:t},t))});function e({intent:e}){return(0,F.jsxs)(`div`,{style:{columnGap:`25px`,display:`inline-grid`,fontFamily:`sans-serif`,marginLeft:`50px`},children:[(0,F.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 3`,marginBottom:0},children:[`Intent: `,(0,F.jsx)(`b`,{children:e})]}),j.map(n=>(0,F.jsx)(t,{intent:e,extraContent:n},String(n)))]})}function t({intent:e,extraContent:t}){let n={borderStyle:`solid none none none`,fontSize:`1.17em`,gridColumn:`1 / 3`,justifySelf:`stretch`,marginBottom:10,paddingTop:10},r={fontSize:`0.67em`,margin:`10px 0`};return(0,F.jsxs)(`div`,{style:{display:`contents`},children:[(0,F.jsxs)(`p`,{style:n,children:[`Extra content: `,(0,F.jsx)(`b`,{children:t?`yes`:`no`})]}),M.map(n=>(0,F.jsxs)(P.Fragment,{children:[(0,F.jsxs)(`p`,{style:r,children:[`Button: `,(0,F.jsx)(`b`,{children:n?`yes`:`no`})]}),(0,F.jsxs)(d,{slideDirection:`left`,"data-testid":`notification`,intent:e,extraContent:t,buttonOnClick:n,buttonText:`Click here`,children:[`Notification test text`,t&&(0,F.jsx)(`div`,{children:f})]},String(n))]},`parent`+String(n)))]})}}})),R,z,B=t((()=>{u(),R=e(a()),z=e=>(0,R.jsx)(d,{slideDirection:`left`,intent:`info`,...e,"data-testid":`notification`,children:`this is a notification`})})),V,H,U,W,G,K;t((()=>{C(),N(),L(),B(),o(),V=e(a()),H={argTypes:{autoDismiss:{control:{type:`select`},description:`Dismisses the Notification on a timer. A number sets the delay in milliseconds, and true uses 8000. Leave it unset to keep the Notification visible until it is dismissed another way.`,options:[!0,!1,4e3,12e3,2e4],table:{defaultValue:{summary:`false`}}},buttonOnClick:{control:{labels:{action:`() => {}`,none:`undefined`},type:`select`},description:`Callback fired when the action button is clicked. Passing it is what renders the button, and the Notification does nothing else in response, so dismissing it is up to this handler.`,mapping:O,options:Object.keys(O)},buttonPosition:{control:{type:s},description:`Which side of the Notification the action button sits on.`,options:[`left`,`right`],table:{defaultValue:{summary:`right`}}},buttonText:{control:{type:`text`},description:`The label of the action button shown beneath the content. It only renders alongside buttonOnClick.`},icon:{control:{labels:{customSvgIcon:`Custom SVG Icon`,customSdsIcon:`Custom SDS Icon`,book:`SDS Icon: Book`,checkCircle:`SDS Icon: Check Circle`},type:`select`},description:"Override the icon displayed before the children. Unless provided, the icon follows the intent. Set to `false` to remove the icon.",mapping:D,options:Object.keys(D)},intent:{control:{type:s},description:`Required. Sets both the color of the component and the icon it defaults to.`,options:[`accent`,`info`,`negative`,`positive`,`notice`],table:{defaultValue:{summary:`info`}}},onClose:{control:{labels:{action:`() => {}`,none:`undefined`},type:`select`},description:"Callback fired when the component requests to be closed. When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.",mapping:k,options:Object.keys(k)},sdsIconProps:{control:{type:`object`},description:`Props forwarded to the Icon component when icon is given as a name.`},slideDirection:{control:{type:s},description:`Required. The side the Notification slides in from and back out towards. The component falls back to "left", but the prop is not optional, so pass it explicitly.`,options:[`left`,`right`],table:{defaultValue:{summary:`left`}}}},component:S,title:`Components/Notification`},U={argTypes:{extraContent:{control:{type:`boolean`},description:`Story-only: adds a paragraph and a small table beneath the message, to show how the Notification grows with its content.`}},args:{autoDismiss:!1,buttonPosition:`right`,buttonText:`Click me`,extraContent:!1,slideDirection:`left`}},W={args:{label:`Label`},parameters:{controls:{exclude:E},snapshot:{skip:!0},a11y:{config:{rules:[{enabled:!1,id:`color-contrast`}]}}},render:e=>(0,V.jsx)(I,{...e})},G={parameters:{controls:{exclude:E},snapshot:{skip:!0}},render:e=>(0,V.jsx)(z,{...e})},K=[`Default`,`ScreenshotTest`,`Test`],U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  // Declared on this story rather than the meta: NotificationProps still
  // declares extraContent, so a control on the meta would be published as one
  // of the component's props in the MCP props data.
  argTypes: {
    extraContent: {
      control: {
        type: "boolean"
      },
      description: "Story-only: adds a paragraph and a small table beneath the message, to show how the Notification grows with its content."
    }
  },
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
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: "color-contrast"
        }]
      }
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
}`,...G.parameters?.docs?.source}}}}))();export{U as Default,W as ScreenshotTest,G as Test,K as __namedExportsOrder,H as default};