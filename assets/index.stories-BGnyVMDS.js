import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{t as r}from"./jsx-runtime-cM__dR4X.js";import{n as i,t as a}from"./InputCheckbox-G94hsdty.js";import{n as o,t as s}from"./InputText-Ci20GjpO.js";import{n as c,t as l}from"./IntentMessage-DbxlD6hx.js";import{n as u,t as d}from"./customSvgIcon-BPPsT9zB.js";var f,p,m=t((()=>{c(),o(),f=e(r()),p=e=>(0,f.jsx)(`div`,{style:{width:400},children:(0,f.jsx)(l,{...e,children:(0,f.jsx)(s,{label:`Input Label`,hideLabel:!0,id:`input-example`,placeholder:`Input placeholder`})})})})),h,g,_=t((()=>{c(),i(),h=e(r()),g=e=>{let{messages:t}=e;return(0,h.jsx)(`div`,{style:{width:400},children:(0,h.jsx)(l,{...e,children:(0,h.jsx)(a,{id:`checkbox-demo`,label:`Input Element Group Label`,caption:`Caption`,intent:t[0]?.intent})})})}})),v,y,b=t((()=>{c(),o(),v=e(r()),y=e=>(0,v.jsx)(`div`,{style:{width:400},children:(0,v.jsx)(l,{...e,children:(0,v.jsx)(s,{label:`Enter a Password`,id:`password-input`,placeholder:`Password`,type:`password`,intent:`negative`})})})})),x,S,C,w=t((()=>{n(),c(),o(),i(),x=e(r()),S=[{intent:`negative`,text:`Negative message`},{intent:`notice`,text:`Notice message`},{intent:`positive`,text:`Positive message`}],C=()=>(0,x.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, 1fr)`,gap:`20px`,fontFamily:`sans-serif`},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h3`,{children:`No Border`}),(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,x.jsx)(l,{messages:[S[0]],children:(0,x.jsx)(s,{label:`Negative`,id:`input-negative`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[1]],children:(0,x.jsx)(s,{label:`Notice`,id:`input-notice`,placeholder:`Input placeholder`,intent:`notice`})}),(0,x.jsx)(l,{messages:[S[2]],children:(0,x.jsx)(s,{label:`Positive`,id:`input-positive`,placeholder:`Input placeholder`,intent:`positive`})}),(0,x.jsx)(l,{messages:S,children:(0,x.jsx)(s,{label:`Stacked`,id:`input-stacked`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],children:(0,x.jsx)(a,{id:`checkbox-negative`,label:`Checkbox Label`,caption:`Caption`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],children:(0,x.jsx)(s,{label:`Password`,id:`password-negative`,placeholder:`Password`,type:`password`,intent:`negative`})})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h3`,{children:`With Border`}),(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,x.jsx)(l,{messages:[S[0]],border:!0,children:(0,x.jsx)(s,{label:`Negative`,id:`input-negative-border`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[1]],border:!0,children:(0,x.jsx)(s,{label:`Notice`,id:`input-notice-border`,placeholder:`Input placeholder`,intent:`notice`})}),(0,x.jsx)(l,{messages:[S[2]],border:!0,children:(0,x.jsx)(s,{label:`Positive`,id:`input-positive-border`,placeholder:`Input placeholder`,intent:`positive`})}),(0,x.jsx)(l,{messages:S,border:!0,children:(0,x.jsx)(s,{label:`Stacked`,id:`input-stacked-border`,placeholder:`Input placeholder`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],border:!0,children:(0,x.jsx)(a,{id:`checkbox-negative-border`,label:`Checkbox Label`,caption:`Caption`,intent:`negative`})}),(0,x.jsx)(l,{messages:[S[0]],border:!0,children:(0,x.jsx)(s,{label:`Password`,id:`password-negative-border`,placeholder:`Password`,type:`password`,intent:`negative`})})]})]})]})})),T,E,D,O,k,A,j,M,N;t((()=>{m(),_(),b(),w(),u(),T=e(r()),E=[{intent:`negative`,text:`This is a negative message`},{intent:`notice`,text:`This is a notice message`},{intent:`positive`,text:`This is a positive message`},{intent:`positive`,text:`This is a very long positive message supposed to be wrapped into multiple lines.`},{intent:`notice`,text:`With custom SDS icon`,icon:`Github`},{intent:`positive`,text:`With custom icon`,icon:(0,T.jsx)(d,{sx:{height:12,width:12}})}],D={argTypes:{autoOrder:{control:{type:`boolean`},description:`If true, displays messages in order of severity (negative, notice, positive).`,table:{defaultValue:{summary:`true`}}},border:{control:{type:`boolean`},description:`If true, displays a colored border on the left.`,table:{defaultValue:{summary:`false`}}},messages:{control:{type:`object`},description:`Array of messages to display.`,table:{defaultValue:{summary:`[]`}}},orderBy:{control:{type:`object`},description:`Array defining a custom severity order. It sets the sort order when autoOrder is true, and decides which intent colors the border either way.`,table:{defaultValue:{summary:`["negative", "notice", "positive"]`}}}},component:p,title:`Components/IntentMessage`,parameters:{a11y:{config:{rules:[{enabled:!1,id:`color-contrast`}]}}}},O={args:{autoOrder:!0,border:!0,messages:E,orderBy:[`negative`,`notice`,`positive`]}},k={args:{border:!0,messages:[E[0]]},render:e=>(0,T.jsx)(g,{...e})},A={args:{border:!0,messages:[E[0]]},render:e=>(0,T.jsx)(y,{...e})},j={parameters:{controls:{exclude:[`autoOrder`,`border`,`messages`,`orderBy`]},snapshot:{skip:!0}},render:()=>(0,T.jsx)(C,{})},M={args:{border:!0,messages:E},parameters:{controls:{exclude:[`autoOrder`,`border`,`messages`,`orderBy`]},snapshot:{skip:!0}},render:e=>(0,T.jsx)(p,{...e,"data-testid":`intent-message`})},N=[`Default`,`Checkbox`,`Password`,`ScreenshotTest`,`Test`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}}}))();export{k as Checkbox,O as Default,A as Password,j as ScreenshotTest,M as Test,N as __namedExportsOrder,D as default};