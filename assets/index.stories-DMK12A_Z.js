import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Kr as n,cr as r,mn as i,st as a}from"./iframe-DI6qETgL.js";import{n as o,t as s}from"./InputSlider-BIffuEKR.js";import{n as c,t as l}from"./NavigationJumpTo-CKErVI-Y.js";var u,d,f=t((()=>{c(),u=r(),d=e=>{let{items:t,...n}=e;return(0,u.jsx)(l,{items:t,...n})}})),p,m,h=t((()=>{p=[`items`,`offsetTop`],m=`aria-valid-attr-value`})),g,_,v,y,b=t((()=>{a(),g=e(n()),o(),c(),_=r(),v=(0,g.forwardRef)((e,t)=>{let{children:n,sdsDemoHeight:r,...a}=e;return(0,_.jsx)(`div`,{ref:t,role:`tabpanel`,style:{alignItems:`center`,backgroundColor:`#f4f4f4`,color:`black`,display:`flex`,fontFamily:`Inter, sans-serif`,fontSize:`36px`,fontWeight:100,justifyContent:`center`,margin:`0px 22px 22px 6px`,minHeight:`${r}vh`,textAlign:`center`},...a,children:(0,_.jsxs)(i,{sx:{p:3},children:[n,(0,_.jsxs)(`p`,{style:{fontSize:14,margin:`5px 0 0 0`},children:[`height: `,r,` vh`]})]})})}),y=e=>{let[t,n]=(0,g.useState)(100),r=(0,g.useRef)(null),a=(0,g.useRef)(null),o=(0,g.useRef)(null),c=(0,g.useRef)(null),u=(0,g.useRef)(null);return(0,_.jsxs)(i,{children:[(0,_.jsxs)(i,{sx:{fontFamily:`Inter, sans-serif`,margin:`0 0 30px 6px`,width:250},children:[(0,_.jsx)(`p`,{id:`nav-item-height-slider`,style:{marginBottom:`5px`},children:`Section panel height:`}),(0,_.jsx)(s,{"aria-labelledby":`nav-item-height-slider`,min:20,max:120,step:1,onChange:(e,t)=>{n(t)},defaultValue:100,marks:[{label:`20`,value:20},{label:`40`,value:40},{label:`60`,value:60},{label:`80`,value:80},{label:`100`,value:100},{label:`120`,value:120}]})]}),(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`row-reverse`,position:`relative`,width:`100%`},children:[(0,_.jsx)(i,{sx:{width:150},children:(0,_.jsx)(l,{...e,items:[{elementRef:r,title:`Section 1`},{elementRef:a,title:`Section 2`},{elementRef:o,title:`Section 3`},{elementRef:c,title:`Section 4`},{elementRef:u,title:`Section 5`}]})}),(0,_.jsxs)(i,{sx:{position:`relative`,width:`100%`},children:[(0,_.jsx)(v,{id:`navigation-panel-1`,ref:r,sdsDemoHeight:t,children:`Section #1`}),(0,_.jsx)(v,{id:`navigation-panel-2`,ref:a,sdsDemoHeight:t,children:`Section #2`}),(0,_.jsx)(v,{id:`navigation-panel-3`,ref:o,sdsDemoHeight:t,children:`Section #3`}),(0,_.jsx)(v,{id:`navigation-panel-4`,ref:c,sdsDemoHeight:t,children:`Section #4`}),(0,_.jsx)(v,{id:`navigation-panel-5`,ref:u,sdsDemoHeight:t,children:`Section #5`})]})]})]})}})),x,S,C=t((()=>{c(),x=r(),S=e=>{let{items:t,...n}=e;return(0,x.jsx)(l,{"data-testid":`navigation-jump-to`,items:t,...n})}})),w,T,E,D,O,k;t((()=>{f(),h(),b(),C(),w=r(),T={argTypes:{items:{control:{require:!0,type:`object`},defaultValue:{summary:`-`},description:`An array of object containing a title for the Navigation Tab and a ref to the section div.`},offsetTop:{control:{description:`wew`,type:`number`},defaultValue:{summary:`0`},description:`To apply the offsetTop to the component, please refresh the page.`},width:{control:{type:`text`},defaultValue:{summary:`100%`},description:`The width of the component.`}},component:d,title:`Components/NavigationJumpTo`},E={args:{items:[{elementRef:{current:null},subItems:[{elementRef:{current:null},title:`1.1. Subnav Item`},{elementRef:{current:null},title:`1.2. Subnav Item`}],title:`1. Nav Item`},{elementRef:{current:null},title:`2. Nav Item`},{elementRef:{current:null},subItems:[{elementRef:{current:null},title:`3.1. Subnav Item`}],title:`3. Nav Item`},{elementRef:{current:null},title:`4. Nav Item`},{elementRef:{current:null},title:`5. A long title for this item that will wrap to the next line if the component width is not enough.`}],offsetTop:0,width:`200px`},parameters:{axe:{disabledRules:[m]},controls:{expanded:!0}},render:e=>(0,w.jsx)(d,{...e})},D={args:{items:[],offsetTop:0},parameters:{axe:{disabledRules:[m]},controls:{exclude:[`items`],expanded:!0}},render:e=>(0,w.jsx)(y,{...e})},O={args:{items:[{elementRef:{current:null},subItems:[{elementRef:{current:null},title:`Sub Item 1.1`}],title:`Item 1`},{elementRef:{current:null},title:`Item 2`},{elementRef:{current:null},title:`Item 3`},{elementRef:{current:null},title:`Item 4`},{elementRef:{current:null},title:`Item 5`}]},parameters:{axe:{disabledRules:[m]},controls:{exclude:p},snapshot:{skip:!0}},render:e=>(0,w.jsx)(S,{...e})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      elementRef: {
        current: null
      },
      subItems: [{
        elementRef: {
          current: null
        },
        title: "1.1. Subnav Item"
      }, {
        elementRef: {
          current: null
        },
        title: "1.2. Subnav Item"
      }],
      title: "1. Nav Item"
    }, {
      elementRef: {
        current: null
      },
      title: "2. Nav Item"
    }, {
      elementRef: {
        current: null
      },
      subItems: [{
        elementRef: {
          current: null
        },
        title: "3.1. Subnav Item"
      }],
      title: "3. Nav Item"
    }, {
      elementRef: {
        current: null
      },
      title: "4. Nav Item"
    }, {
      elementRef: {
        current: null
      },
      title: "5. A long title for this item that will wrap to the next line if the component width is not enough."
    }],
    offsetTop: 0,
    width: "200px"
  },
  parameters: {
    axe: {
      disabledRules: [NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE]
    },
    controls: {
      expanded: true
    }
  },
  render: (args: Args) => <NavigationJumpTo {...args} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    offsetTop: 0
  },
  parameters: {
    axe: {
      disabledRules: [NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE]
    },
    controls: {
      exclude: ["items"],
      expanded: true
    }
  },
  render: (args: Args) => <NavigationJumpToDemo {...args} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      elementRef: {
        current: null
      },
      subItems: [{
        elementRef: {
          current: null
        },
        title: "Sub Item 1.1"
      }],
      title: "Item 1"
    }, {
      elementRef: {
        current: null
      },
      title: "Item 2"
    }, {
      elementRef: {
        current: null
      },
      title: "Item 3"
    }, {
      elementRef: {
        current: null
      },
      title: "Item 4"
    }, {
      elementRef: {
        current: null
      },
      title: "Item 5"
    }]
  },
  parameters: {
    axe: {
      disabledRules: [NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE]
    },
    controls: {
      exclude: NAVIGATION_JUMP_TO_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...O.parameters?.docs?.source}}},k=[`Default`,`JumpToNavDemo`,`Test`]}))();export{E as Default,D as JumpToNavDemo,O as Test,k as __namedExportsOrder,T as default};