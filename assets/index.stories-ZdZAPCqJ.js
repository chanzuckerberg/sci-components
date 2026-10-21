import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i,nt as a,t as o}from"./material-DlyzFPof.js";import{t as s}from"./jsx-runtime-cM__dR4X.js";import{a as c,n as l}from"./utils-CbT4iKc5.js";import{n as u,t as d}from"./MenuItem-NUbWB3vu.js";import{n as f,t as p}from"./customSdsIcon-BgZodrv6.js";import{n as m,t as h}from"./customSvgIcon-BPPsT9zB.js";var g,_,v,y,b,x,S,C,w,T,E=t((()=>{f(),m(),g=e(s()),_=[`name`,`column`,`disabled`,`isMultiSelect`,`icon`,`sdsIconProps`,`sdsStyle`,`selected`],v={gear:`Gear`,customSdsIcon:(0,g.jsx)(p,{sdsSize:`s`},`customSdsIcon`),customSvgIcon:(0,g.jsx)(h,{sx:{height:14,width:14}},`customSvgIcon`)},y=[!1,!0],b=[`determinate`,`indeterminate`],x=[void 0,`123`],S=[void 0,`Gear`],C=[!1,!0],w=[!1,!0],T=[`default`,`hover`,`active`,`focus`]})),D,O=t((()=>{r(),D=i(`div`,{target:`e1d4dpqk0`})({name:`xu0q36`,styles:`width:250px`})})),k,A,j=t((()=>{o(),u(),O(),k=e(s()),A=e=>{let{name:t}=e;return(0,k.jsx)(D,{children:(0,k.jsx)(a,{disablePadding:!0,children:(0,k.jsx)(d,{"data-testid":`MenuItem`,...e,children:t})})})}})),M,N,P,F=t((()=>{o(),E(),u(),M=e(s()),N=e(n()),P=e=>{let t={display:`contents`},n={borderStyle:`solid none none none`,gridColumn:`1 / 6`,justifySelf:`stretch`,paddingTop:10};return(0,M.jsx)(M.Fragment,{children:y.map(e=>(0,M.jsx)(r,{isMultiSelect:e},String(e)))});function r({isMultiSelect:e}){return(0,M.jsxs)(`div`,{style:{columnGap:`20px`,display:`inline-grid`,fontFamily:`sans-serif`,marginRight:`50px`},children:[(0,M.jsxs)(`p`,{style:{fontSize:`2em`,gridColumn:`1 / 6`,marginBottom:10},children:[`Multi-select: `,(0,M.jsx)(`b`,{children:e?`yes`:`no`})]}),x.map(t=>(0,M.jsx)(i,{isMultiSelect:e,column:t},String(t)))]})}function i({isMultiSelect:e,column:r}){let i={...n,alignSelf:`end`,borderWidth:`3px`,fontSize:`1.17em`,margin:`0 0 15px 0`};return(0,M.jsxs)(`div`,{style:t,children:[(0,M.jsxs)(`p`,{style:i,children:[`Column: `,(0,M.jsx)(`b`,{children:r?`yes`:`no`})]}),S.map(t=>(0,M.jsx)(o,{isMultiSelect:e,column:r,sdsIcon:t},String(t)))]})}function o({isMultiSelect:e,column:r,sdsIcon:i}){let a={...n,alignSelf:`end`,borderWidth:`2px`,fontSize:`1em`,margin:`0 0 15px 0`};return(0,M.jsxs)(`div`,{style:t,children:[(0,M.jsxs)(`p`,{style:a,children:[`Icon: `,(0,M.jsx)(`b`,{children:i?`yes`:`no`})]}),C.map(t=>(0,M.jsx)(s,{isMultiSelect:e,column:r,sdsIcon:i,selected:t},String(t)))]})}function s({isMultiSelect:e,column:r,sdsIcon:i,selected:a}){let o={...n,alignSelf:`end`,borderWidth:`1px`,fontSize:`0.83em`,margin:`0 0 10px 0`};return(0,M.jsxs)(`div`,{style:t,children:[(0,M.jsxs)(`p`,{style:o,children:[`Selected: `,(0,M.jsx)(`b`,{children:a?`true`:`false`})]}),b.map(t=>(0,M.jsx)(c,{isMultiSelect:e,column:r,sdsIcon:i,selected:a,sdsStyle:t},String(t)))]})}function c({isMultiSelect:e,column:r,sdsIcon:i,selected:a,sdsStyle:o}){let s={...n,alignSelf:`end`,borderWidth:`1px`,fontSize:`0.83em`,margin:`0 0 10px 0`};return(0,M.jsxs)(`div`,{style:t,children:[(0,M.jsxs)(`p`,{style:s,children:[`SdsStyle: `,(0,M.jsx)(`b`,{children:o})]}),w.map(t=>(0,M.jsx)(l,{isMultiSelect:e,column:r,sdsIcon:i,selected:a,sdsStyle:o,disabled:t},String(t)))]})}function l({isMultiSelect:n,column:r,sdsIcon:i,selected:o,sdsStyle:s,disabled:c}){let l={marginBottom:20},u={fontSize:`0.67em`,margin:`10px 0 20px 0`};return(0,M.jsx)(`div`,{style:t,children:T.map(t=>(0,M.jsx)(a,{role:`menu`,component:`div`,disablePadding:!0,style:l,children:(c===!1||c===!0&&t==="default")&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(`p`,{style:u,children:[c?`Disabled: `:`State: `,(0,M.jsx)(`b`,{children:c?`true`:t})]}),(0,N.createElement)(d,{...e,"data-testid":`menu-item`,isMultiSelect:n,column:r,icon:i,selected:o,sdsStyle:s,disabled:c,className:`pseudo-${t}`,key:t},`Name`)]})},t))})}}})),I,L,R,z,B,V,H;t((()=>{E(),j(),F(),c(),I=e(s()),L={argTypes:{column:{control:{type:`text`},description:`The column prop determines the content displayed in the right column of the menu item. This content can be customized to provide additional information or context for the menu item.`},disabled:{control:{type:`boolean`},description:"If `true`, the component is disabled.",table:{defaultValue:{summary:`false`}}},icon:{control:{labels:{gear:`SDS Icon: Gear`,customSdsIcon:`Custom SDS Icon`,customSvgIcon:`Custom SVG Icon`},type:`select`},description:`The icon shown at the start of the item, either the name of an SDS icon or an element of your own. Only icons that come in a small size can be named here.`,mapping:v,options:Object.keys(v)},isMultiSelect:{control:{type:`boolean`},description:`When true, designates that the menu item supports multi-select functionality.`,table:{defaultValue:{summary:`false`}}},name:{control:{type:`text`},description:`Story-only: the item's text, which the story renders as the MenuItem's children.`},sdsIconProps:{control:{type:`object`},description:`Enables you to pass additional props to customize the SDS icon within the menu item.`},sdsStyle:{control:{type:l},description:`Determines the style of the menu item, whether it is determinate or indeterminate.`,options:[`determinate`,`indeterminate`],table:{defaultValue:{summary:`determinate`}}},sdsType:{control:{type:l},description:`An "action" item leaves out the selection mark at its start, for a menu whose items run a command rather than choose a value.`,options:[`default`,`action`],table:{defaultValue:{summary:`default`}}},selected:{control:{type:`boolean`},description:"If `true`, the component is selected.",table:{defaultValue:{summary:`false`}}}},component:A,parameters:{a11y:{config:{rules:[{enabled:!1,id:`aria-required-parent`}]}}},title:`Components/Dropdowns/MenuItem`},R={args:{column:`123,456`,disabled:!1,isMultiSelect:!1,name:`Text here`,sdsIconProps:{color:`blue`},sdsStyle:`determinate`,sdsType:`default`,selected:!1}},z={args:{column:`123,456`,disabled:!1,isMultiSelect:!1,name:`Text here`,sdsIconProps:{color:`blue`},sdsStyle:`determinate`,sdsType:`action`,selected:!1}},B={args:{name:`Text here`},parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,I.jsx)(P,{...e})},V={args:{column:`123`,name:`Test text`},parameters:{controls:{exclude:_},snapshot:{skip:!0}},render:e=>(0,I.jsx)(A,{...e})},H=[`Default`,`ActionType`,`ScreenshotTest`,`Test`],R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    column: "123,456",
    disabled: false,
    isMultiSelect: false,
    name: "Text here",
    sdsIconProps: {
      color: "blue"
    },
    sdsStyle: "determinate",
    sdsType: "default",
    selected: false
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    column: "123,456",
    disabled: false,
    isMultiSelect: false,
    name: "Text here",
    sdsIconProps: {
      color: "blue"
    },
    sdsStyle: "determinate",
    sdsType: "action",
    selected: false
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    name: "Text here"
  },
  parameters: {
    controls: {
      exclude: MENU_ITEM_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    column: "123",
    name: "Test text"
  },
  parameters: {
    controls: {
      exclude: MENU_ITEM_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <MenuItem {...args} />
}`,...V.parameters?.docs?.source}}}}))();export{z as ActionType,R as Default,B as ScreenshotTest,V as Test,H as __namedExportsOrder,L as default};