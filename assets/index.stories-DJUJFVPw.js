import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{ln as r,t as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{n as o,t as s}from"./NavigationJumpTo-CioYzFCu.js";import{n as c,t as l}from"./InputSlider-Dv5F4xwD.js";var u,d,f=t((()=>{o(),u=e(a()),d=e=>{let{items:t,...n}=e;return(0,u.jsx)(s,{items:t,...n})}})),p,m,h=t((()=>{p=[`items`,`offsetTop`],m=`aria-valid-attr-value`})),g,_,v,y,b=t((()=>{i(),g=e(n()),c(),o(),_=e(a()),v=(0,g.forwardRef)((e,t)=>{let{children:n,sdsDemoHeight:i,...a}=e;return(0,_.jsx)(`div`,{ref:t,role:`tabpanel`,style:{alignItems:`center`,backgroundColor:`#f4f4f4`,color:`black`,display:`flex`,fontFamily:`Inter, sans-serif`,fontSize:`36px`,fontWeight:100,justifyContent:`center`,margin:`0px 22px 22px 6px`,minHeight:`${i}vh`,textAlign:`center`},...a,children:(0,_.jsxs)(r,{sx:{p:3},children:[n,(0,_.jsxs)(`p`,{style:{fontSize:14,margin:`5px 0 0 0`},children:[`height: `,i,` vh`]})]})})}),y=e=>{let[t,n]=(0,g.useState)(100),i=(0,g.useRef)(null),a=(0,g.useRef)(null),o=(0,g.useRef)(null),c=(0,g.useRef)(null),u=(0,g.useRef)(null);return(0,_.jsxs)(r,{children:[(0,_.jsxs)(r,{sx:{fontFamily:`Inter, sans-serif`,margin:`0 0 30px 6px`,width:250},children:[(0,_.jsx)(`p`,{id:`nav-item-height-slider`,style:{marginBottom:`5px`},children:`Section panel height:`}),(0,_.jsx)(l,{"aria-labelledby":`nav-item-height-slider`,min:20,max:120,step:1,onChange:(e,t)=>{n(t)},defaultValue:100,marks:[{label:`20`,value:20},{label:`40`,value:40},{label:`60`,value:60},{label:`80`,value:80},{label:`100`,value:100},{label:`120`,value:120}]})]}),(0,_.jsxs)(r,{sx:{display:`flex`,flexDirection:`row-reverse`,position:`relative`,width:`100%`},children:[(0,_.jsx)(r,{sx:{width:150},children:(0,_.jsx)(s,{...e,items:[{elementRef:i,title:`Section 1`},{elementRef:a,title:`Section 2`},{elementRef:o,title:`Section 3`},{elementRef:c,title:`Section 4`},{elementRef:u,title:`Section 5`}]})}),(0,_.jsxs)(r,{sx:{position:`relative`,width:`100%`},children:[(0,_.jsx)(v,{id:`navigation-panel-1`,ref:i,sdsDemoHeight:t,children:`Section #1`}),(0,_.jsx)(v,{id:`navigation-panel-2`,ref:a,sdsDemoHeight:t,children:`Section #2`}),(0,_.jsx)(v,{id:`navigation-panel-3`,ref:o,sdsDemoHeight:t,children:`Section #3`}),(0,_.jsx)(v,{id:`navigation-panel-4`,ref:c,sdsDemoHeight:t,children:`Section #4`}),(0,_.jsx)(v,{id:`navigation-panel-5`,ref:u,sdsDemoHeight:t,children:`Section #5`})]})]})]})}})),x,S,C=t((()=>{o(),x=e(a()),S=e=>{let{items:t,...n}=e;return(0,x.jsx)(s,{"data-testid":`navigation-jump-to`,items:t,...n})}})),w,T,E,D,O,k;t((()=>{f(),h(),b(),C(),w=e(a()),T={argTypes:{items:{control:{require:!0,type:`object`},description:`An array of object containing a title for the Navigation Tab and a ref to the section div.`},offsetTop:{control:{type:`number`},description:`To apply the offsetTop to the component, please refresh the page.`,table:{defaultValue:{summary:`0`}}},width:{control:{type:`text`},description:`The width of the component.`,table:{defaultValue:{summary:`100%`}}}},component:d,title:`Components/NavigationJumpTo`},E={args:{items:[{elementRef:{current:null},subItems:[{elementRef:{current:null},title:`1.1. Subnav Item`},{elementRef:{current:null},title:`1.2. Subnav Item`}],title:`1. Nav Item`},{elementRef:{current:null},title:`2. Nav Item`},{elementRef:{current:null},subItems:[{elementRef:{current:null},title:`3.1. Subnav Item`}],title:`3. Nav Item`},{elementRef:{current:null},title:`4. Nav Item`},{elementRef:{current:null},title:`5. A long title for this item that will wrap to the next line if the component width is not enough.`}],offsetTop:0,width:`200px`},parameters:{a11y:{config:{rules:[{enabled:!1,id:m}]}}},render:e=>(0,w.jsx)(d,{...e})},D={args:{items:[],offsetTop:0},parameters:{a11y:{config:{rules:[{enabled:!1,id:m}]}},controls:{exclude:[`items`]}},render:e=>(0,w.jsx)(y,{...e})},O={args:{items:[{elementRef:{current:null},subItems:[{elementRef:{current:null},title:`Sub Item 1.1`}],title:`Item 1`},{elementRef:{current:null},title:`Item 2`},{elementRef:{current:null},title:`Item 3`},{elementRef:{current:null},title:`Item 4`},{elementRef:{current:null},title:`Item 5`}]},parameters:{a11y:{config:{rules:[{enabled:!1,id:m}]}},controls:{exclude:p},snapshot:{skip:!0}},render:e=>(0,w.jsx)(S,{...e})},k=[`Default`,`JumpToNavDemo`,`Test`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE
        }]
      }
    }
  },
  render: (args: Args) => <NavigationJumpTo {...args} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    offsetTop: 0
  },
  parameters: {
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE
        }]
      }
    },
    controls: {
      exclude: ["items"]
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
    a11y: {
      config: {
        rules: [{
          enabled: false,
          id: NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE
        }]
      }
    },
    controls: {
      exclude: NAVIGATION_JUMP_TO_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...O.parameters?.docs?.source}}}}))();export{E as Default,D as JumpToNavDemo,O as Test,k as __namedExportsOrder,T as default};