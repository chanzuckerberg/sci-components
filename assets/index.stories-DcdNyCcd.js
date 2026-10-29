import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{a as o,s}from"./utils-CbT4iKc5.js";import{n as c,t as l}from"./Tag-BSfB3BZM.js";import{n as u,r as d,t as f}from"./Tabs-B68N7_OX.js";var p,m,h,g=t((()=>{p=e(n()),d(),m=e(a()),h=e=>{let{items:t,...n}=e,[r,i]=(0,p.useState)(0),a=(e,t)=>{i(t)};return(0,m.jsx)(u,{...n,value:r,onChange:a,children:t.map(({count:e,label:t})=>(0,m.jsx)(f,{label:t,count:e},t))})}})),_,v,y=t((()=>{_=[`sdsSize`,`items`,`underlined`],v={alignItems:`center`,display:`flex`,gap:`40px`,width:`100%`}})),b,x=t((()=>{r(),b=i(`span`,{target:`eshgy800`})({name:`1693thf`,styles:`margin-right:5px`})}));function S(e){let t={...e,"data-testid":`tabs`,style:{width:`400px`}};return(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`div`,{style:v,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h4`,{children:`Default`}),(0,w.jsx)(h,{items:[{count:123,label:`Tab One`},{label:`Tab Two`}],onChange:s,...t})]}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h4`,{children:`Small`}),(0,w.jsx)(h,{items:[{count:123,label:`Tab One`},{label:`Tab Two`}],onChange:s,sdsSize:`small`,...t})]}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h4`,{children:`Underlined`}),(0,w.jsx)(h,{onChange:s,items:[{count:123,label:`Tab One`},{label:`Tab Two`}],underlined:!0,...t})]})]}),(0,w.jsx)(`div`,{style:v,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h4`,{children:`Label with count`}),(0,w.jsx)(`div`,{children:(0,w.jsx)(h,{onChange:s,sdsSize:`large`,items:[{count:(0,w.jsx)(C,{}),label:`One`},{label:`Two`}],underlined:!0,...t,style:{width:`200px`}})})]})})]})}function C(){return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(b,{children:`123`}),(0,w.jsx)(l,{label:`BETA`,color:`beta`,size:`small`,style:{margin:`0 0 2px 0`}})]})}var w,T=t((()=>{y(),g(),o(),c(),x(),w=e(a())})),E,D,O,k,A;t((()=>{g(),y(),T(),E=e(a()),D={argTypes:{items:{control:{required:!0,type:`object`},description:`Here is an array of objects, each comprising a label and count for the tabs. Please note that this is specific to Storybook. In an actual implementation, it is recommended to pass the tabs as children of the Tabs component.`},sdsSize:{control:{type:`select`},description:`The size of the label text on every tab in the group`,options:[`large`,`small`],table:{defaultValue:{summary:`large`}}},underlined:{control:{type:`boolean`},description:`Whether a divider runs under the full width of the tab group`,table:{defaultValue:{summary:`false`}}}},component:h,parameters:{chromatic:{delay:1e4}},title:`Components/Tabs`},O={args:{items:[{label:`Upload from Your Computer`},{count:0,label:`Upload from Base Space`}],sdsSize:`large`,underlined:!0},parameters:{chromatic:{delay:5e3}}},k={parameters:{chromatic:{delay:5e3},controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,E.jsx)(S,{...e})},A=[`Default`,`Test`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: "Upload from Your Computer"
    }, {
      count: 0,
      label: "Upload from Base Space"
    }],
    sdsSize: "large",
    underlined: true
  },
  parameters: {
    // tab indicator bug known by MUI where width for indicator updates once font is loaded in.
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    // https://github.cwom/mui/material-ui/blob/v4.x/packages/material-ui/src/Tabs/Tabs.js#L194
    chromatic: {
      delay: 5000
    }
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    chromatic: {
      delay: 5000
    },
    controls: {
      exclude: TABS_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...k.parameters?.docs?.source}}}}))();export{O as Default,k as Test,A as __namedExportsOrder,D as default};