import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-s0DqqZ6S.js";import{n as i,t as a}from"./InputCheckbox-BBB0-7Vz.js";import{n as o,t as s}from"./InputText-C0Q0gVbw.js";import{n as c,t as l}from"./IntentMessage-BATt4IXQ.js";import{n as u,t as d}from"./customSvgIcon-Dtg7hivA.js";var f,p,m=e((()=>{c(),o(),f=t(r()),p=e=>(0,f.jsx)(`div`,{style:{width:400},children:(0,f.jsx)(l,{...e,children:(0,f.jsx)(s,{label:`Input Label`,hideLabel:!0,id:`input-example`,placeholder:`Input placeholder`})})})})),h,g,_=e((()=>{c(),i(),h=t(r()),g=e=>{let{messages:t}=e;return(0,h.jsx)(`div`,{style:{width:400},children:(0,h.jsx)(l,{...e,children:(0,h.jsx)(a,{id:`checkbox-demo`,label:`Input Element Group Label`,caption:`Caption`,intent:t[0]?.intent})})})}})),v,y,b=e((()=>{c(),o(),v=t(r()),y=e=>(0,v.jsx)(`div`,{style:{width:400},children:(0,v.jsx)(l,{...e,children:(0,v.jsx)(s,{label:`Enter a Password`,id:`password-input`,placeholder:`Password`,type:`password`,intent:`negative`})})})})),x,S,C,w=e((()=>{n(),c(),o(),i(),x=t(r()),S=[{intent:`negative`,text:`Negative message`},{intent:`notice`,text:`Notice message`},{intent:`positive`,text:`Positive message`}],C=()=>(0,x.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, 1fr)`,gap:`20px`,fontFamily:`sans-serif`},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h3`,{children:`No Border`}),(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,x.jsx)(l,{messages:[S[0]],children:(0,x.jsx)(s,{label:`Negative`,id:`input-negative`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[1]],children:(0,x.jsx)(s,{label:`Notice`,id:`input-notice`,placeholder:`Input placeholder`,intent:`notice`})}),(0,x.jsx)(l,{messages:[S[2]],children:(0,x.jsx)(s,{label:`Positive`,id:`input-positive`,placeholder:`Input placeholder`,intent:`positive`})}),(0,x.jsx)(l,{messages:S,children:(0,x.jsx)(s,{label:`Stacked`,id:`input-stacked`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],children:(0,x.jsx)(a,{id:`checkbox-negative`,label:`Checkbox Label`,caption:`Caption`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],children:(0,x.jsx)(s,{label:`Password`,id:`password-negative`,placeholder:`Password`,type:`password`,intent:`negative`})})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h3`,{children:`With Border`}),(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,x.jsx)(l,{messages:[S[0]],border:!0,children:(0,x.jsx)(s,{label:`Negative`,id:`input-negative-border`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[1]],border:!0,children:(0,x.jsx)(s,{label:`Notice`,id:`input-notice-border`,placeholder:`Input placeholder`,intent:`notice`})}),(0,x.jsx)(l,{messages:[S[2]],border:!0,children:(0,x.jsx)(s,{label:`Positive`,id:`input-positive-border`,placeholder:`Input placeholder`,intent:`positive`})}),(0,x.jsx)(l,{messages:S,border:!0,children:(0,x.jsx)(s,{label:`Stacked`,id:`input-stacked-border`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],border:!0,children:(0,x.jsx)(a,{id:`checkbox-negative-border`,label:`Checkbox Label`,caption:`Caption`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],border:!0,children:(0,x.jsx)(s,{label:`Password`,id:`password-negative-border`,placeholder:`Password`,type:`password`,intent:`negative`})})]})]})]})})),T,E,D,O,k,A,j,M,N;e((()=>{m(),_(),b(),w(),u(),T=t(r()),E=[{intent:`negative`,text:`This is a negative message`},{intent:`notice`,text:`This is a notice message`},{intent:`positive`,text:`This is a positive message`},{intent:`positive`,text:`This is a very long positive message supposed to be wrapped into multiple lines.`},{intent:`notice`,text:`With custom SDS icon`,icon:`Github`},{intent:`positive`,text:`With custom icon`,icon:(0,T.jsx)(d,{sx:{height:12,width:12}})}],D={argTypes:{autoOrder:{control:{type:`boolean`},defaultValue:{summary:`true`},description:`If true, displays messages in order of severity (negative, notice, positive).`},border:{control:{type:`boolean`},defaultValue:{summary:`false`},description:`If true, displays a colored border on the left.`},messages:{control:{type:`object`},defaultValue:E,description:`Array of messages to display.`},orderBy:{control:{type:`object`},defaultValue:{summary:`["negative", "notice", "positive"]`},description:`Array defining custom priority order for sorting messages. Only used if autoOrder is true.`}},component:p,title:`Components/IntentMessage`,parameters:{axe:{disabledRules:[`color-contrast`]}}},O={args:{autoOrder:!0,border:!0,messages:E,orderBy:[`negative`,`notice`,`positive`]}},k={args:{border:!0,messages:[E[0]]},render:e=>(0,T.jsx)(g,{...e})},A={args:{border:!0,messages:[E[0]]},render:e=>(0,T.jsx)(y,{...e})},j={parameters:{controls:{exclude:[`autoOrder`,`border`,`messages`,`orderBy`]},snapshot:{skip:!0}},render:()=>(0,T.jsx)(C,{})},M={args:{border:!0,messages:E},parameters:{controls:{exclude:[`autoOrder`,`border`,`messages`,`orderBy`]},snapshot:{skip:!0}},render:e=>(0,T.jsx)(p,{...e,"data-testid":`intent-message`})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    autoOrder: true,
    border: true,
    messages: defaultMessages,
    orderBy: ["negative", "notice", "positive"]
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    border: true,
    messages: [defaultMessages[0]]
  },
  render: (args: Args) => <CheckboxDemo {...args} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    border: true,
    messages: [defaultMessages[0]]
  },
  render: (args: Args) => <PasswordDemo {...args} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: ["autoOrder", "border", "messages", "orderBy"]
    },
    snapshot: {
      skip: true
    }
  },
  render: () => <ScreenshotTestDemo />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N=[`Default`,`Checkbox`,`Password`,`ScreenshotTest`,`Test`]}))();export{k as Checkbox,O as Default,A as Password,j as ScreenshotTest,M as Test,N as __namedExportsOrder,D as default};