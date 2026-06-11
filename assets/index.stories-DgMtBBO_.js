import{i as e}from"./preload-helper-DbRxMUml.js";import{Kr as t,cr as n}from"./iframe-DI6qETgL.js";import{n as r,t as i}from"./customSvgIcon-BEFdzOrQ.js";import{n as a,t as o}from"./InputCheckbox-DtpRG-mF.js";import{n as s,t as c}from"./InputText-DUnYuGda.js";import{n as l,t as u}from"./IntentMessage-Qaw04uAR.js";var d,f,p=e((()=>{l(),s(),d=n(),f=e=>(0,d.jsx)(`div`,{style:{width:400},children:(0,d.jsx)(u,{...e,children:(0,d.jsx)(c,{label:`Input Label`,hideLabel:!0,id:`input-example`,placeholder:`Input placeholder`})})})})),m,h,g=e((()=>{l(),a(),m=n(),h=e=>{let{messages:t}=e;return(0,m.jsx)(`div`,{style:{width:400},children:(0,m.jsx)(u,{...e,children:(0,m.jsx)(o,{id:`checkbox-demo`,label:`Input Element Group Label`,caption:`Caption`,intent:t[0]?.intent})})})}})),_,v,y=e((()=>{l(),s(),_=n(),v=e=>(0,_.jsx)(`div`,{style:{width:400},children:(0,_.jsx)(u,{...e,children:(0,_.jsx)(c,{label:`Enter a Password`,id:`password-input`,placeholder:`Password`,type:`password`,intent:`negative`})})})})),b,x,S,C=e((()=>{t(),l(),s(),a(),b=n(),x=[{intent:`negative`,text:`Negative message`},{intent:`notice`,text:`Notice message`},{intent:`positive`,text:`Positive message`}],S=()=>(0,b.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, 1fr)`,gap:`20px`,fontFamily:`sans-serif`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h3`,{children:`No Border`}),(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,b.jsx)(u,{messages:[x[0]],children:(0,b.jsx)(c,{label:`Negative`,id:`input-negative`,placeholder:`Input placeholder`,intent:`negative`})}),(0,b.jsx)(u,{messages:[x[1]],children:(0,b.jsx)(c,{label:`Notice`,id:`input-notice`,placeholder:`Input placeholder`,intent:`notice`})}),(0,b.jsx)(u,{messages:[x[2]],children:(0,b.jsx)(c,{label:`Positive`,id:`input-positive`,placeholder:`Input placeholder`,intent:`positive`})}),(0,b.jsx)(u,{messages:x,children:(0,b.jsx)(c,{label:`Stacked`,id:`input-stacked`,placeholder:`Input placeholder`,intent:`negative`})}),(0,b.jsx)(u,{messages:[x[0]],children:(0,b.jsx)(o,{id:`checkbox-negative`,label:`Checkbox Label`,caption:`Caption`,intent:`negative`})}),(0,b.jsx)(u,{messages:[x[0]],children:(0,b.jsx)(c,{label:`Password`,id:`password-negative`,placeholder:`Password`,type:`password`,intent:`negative`})})]})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h3`,{children:`With Border`}),(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,b.jsx)(u,{messages:[x[0]],border:!0,children:(0,b.jsx)(c,{label:`Negative`,id:`input-negative-border`,placeholder:`Input placeholder`,intent:`negative`})}),(0,b.jsx)(u,{messages:[x[1]],border:!0,children:(0,b.jsx)(c,{label:`Notice`,id:`input-notice-border`,placeholder:`Input placeholder`,intent:`notice`})}),(0,b.jsx)(u,{messages:[x[2]],border:!0,children:(0,b.jsx)(c,{label:`Positive`,id:`input-positive-border`,placeholder:`Input placeholder`,intent:`positive`})}),(0,b.jsx)(u,{messages:x,border:!0,children:(0,b.jsx)(c,{label:`Stacked`,id:`input-stacked-border`,placeholder:`Input placeholder`,intent:`negative`})}),(0,b.jsx)(u,{messages:[x[0]],border:!0,children:(0,b.jsx)(o,{id:`checkbox-negative-border`,label:`Checkbox Label`,caption:`Caption`,intent:`negative`})}),(0,b.jsx)(u,{messages:[x[0]],border:!0,children:(0,b.jsx)(c,{label:`Password`,id:`password-negative-border`,placeholder:`Password`,type:`password`,intent:`negative`})})]})]})]})})),w,T,E,D,O,k,A,j,M;e((()=>{p(),g(),y(),C(),r(),w=n(),T=[{intent:`negative`,text:`This is a negative message`},{intent:`notice`,text:`This is a notice message`},{intent:`positive`,text:`This is a positive message`},{intent:`positive`,text:`This is a very long positive message supposed to be wrapped into multiple lines.`},{intent:`notice`,text:`With custom SDS icon`,icon:`Github`},{intent:`positive`,text:`With custom icon`,icon:(0,w.jsx)(i,{sx:{height:12,width:12}})}],E={argTypes:{autoOrder:{control:{type:`boolean`},defaultValue:{summary:`true`},description:`If true, displays messages in order of severity (negative, notice, positive).`},border:{control:{type:`boolean`},defaultValue:{summary:`false`},description:`If true, displays a colored border on the left.`},messages:{control:{type:`object`},defaultValue:T,description:`Array of messages to display.`},orderBy:{control:{type:`object`},defaultValue:{summary:`["negative", "notice", "positive"]`},description:`Array defining custom priority order for sorting messages. Only used if autoOrder is true.`}},component:f,title:`Components/IntentMessage`,parameters:{axe:{disabledRules:[`color-contrast`]}}},D={args:{autoOrder:!0,border:!0,messages:T,orderBy:[`negative`,`notice`,`positive`]}},O={args:{border:!0,messages:[T[0]]},render:e=>(0,w.jsx)(h,{...e})},k={args:{border:!0,messages:[T[0]]},render:e=>(0,w.jsx)(v,{...e})},A={parameters:{controls:{exclude:[`autoOrder`,`border`,`messages`,`orderBy`]},snapshot:{skip:!0}},render:()=>(0,w.jsx)(S,{})},j={args:{border:!0,messages:T},parameters:{controls:{exclude:[`autoOrder`,`border`,`messages`,`orderBy`]},snapshot:{skip:!0}},render:e=>(0,w.jsx)(f,{...e,"data-testid":`intent-message`})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    autoOrder: true,
    border: true,
    messages: defaultMessages,
    orderBy: ["negative", "notice", "positive"]
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    border: true,
    messages: [defaultMessages[0]]
  },
  render: (args: Args) => <CheckboxDemo {...args} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    border: true,
    messages: [defaultMessages[0]]
  },
  render: (args: Args) => <PasswordDemo {...args} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: ["autoOrder", "border", "messages", "orderBy"]
    },
    snapshot: {
      skip: true
    }
  },
  render: () => <ScreenshotTestDemo />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    border: true,
    messages: defaultMessages
  },
  parameters: {
    controls: {
      exclude: ["autoOrder", "border", "messages", "orderBy"]
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <IntentMessageDemo {...args} data-testid="intent-message" />
}`,...j.parameters?.docs?.source}}},M=[`Default`,`Checkbox`,`Password`,`ScreenshotTest`,`Test`]}))();export{O as Checkbox,D as Default,k as Password,A as ScreenshotTest,j as Test,M as __namedExportsOrder,E as default};