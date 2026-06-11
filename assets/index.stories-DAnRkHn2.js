import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Kr as n,Q as r,U as i,Xn as a,Y as o,Z as s,Zn as c,at as l,cr as u,ot as d,q as f,t as p}from"./iframe-DI6qETgL.js";import{i as m,n as h,r as g,t as _}from"./Icon-BvRFwTEr.js";import{n as v,t as y}from"./Callout-BE_VME0K.js";import{n as b,t as x}from"./InputSearch-DbDcVnzt.js";import{n as S,t as C}from"./Tooltip-C5txiU7R.js";var w,T,E=t((()=>{h(),w=u(),T=e=>{let{sdsIcon:t,sdsSize:n,...r}=e;return(0,w.jsx)(_,{sdsIcon:t,sdsSize:n,...r})}})),D,O,k,A,j,M,N=t((()=>{c(),D=e(n()),v(),h(),p(),m(),b(),S(),d(),O=u(),k=a(`div`,{target:`e7e25fx1`})(e=>{let t=r(e),n=s(e);return`
      font-family: ${t?.fontFamily};
      display: grid;
      grid-gap: ${n?.s}px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, 260px);
      margin-top: ${n?.m}px;
    `},`;`),A=a(`div`,{target:`e7e25fx0`})(e=>{let t=i(e),n=s(e),r=o(e),a=f(e),{color:c=`blue`,shade:l=a===`dark`?600:500}=e;return`
      align-items: center;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 16px 20px;
      position: relative;
      cursor: pointer;
      transition: all .2s;
      min-height: unset !important;
      line-height: unset !important;

      p {
        margin: ${n?.m}px 0 0 0;
        text-align: center;
        font-size: 13px;
        background-color: transparent;
      }

      span {
        color: ${r?.base?.textPrimary};
        font-size: 11px;
      }

      span.size-tag {
        background-color: ${a===`light`?`rgba(0, 0, 0, 0.1)`:`rgba(255, 255, 255, 0.1)`};
        font-size: 10px;
        padding: 0 4px 1px;
        margin: 0 2px;
        border-radius: 2px;
      }

      &:hover {
        border-radius: 8px;
        background-color: ${t?.[c]?.[l]};
        border-color: ${t?.[c]?.[l]};
        color: ${r?.base?.textPrimaryInverse};

        p {
          color: ${r?.base?.textPrimaryInverse};
        }

        span {
          color: ${r?.base?.textPrimaryInverse};
        }

        span.size-tag {
          background-color: ${a===`dark`?`rgba(0, 0, 0, 0.2)`:`rgba(255, 255, 255, 0.2)`};
        }

        svg {
          fill: ${r?.base?.ornamentPrimaryInverse};
        }

        div.notification {
          display: flex;
        }
      }

      div.icon {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      div.notification {
        flex-direction: column;
        border-radius: 2px;
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
        color: white;
        align-items: center;
        justify-content: center;
      }
    `},`;`),j=e=>{let{sdsIcon:t,innerIcon:n,color:r}=e,[i,a]=(0,D.useState)(!1),o=n.smallIcon?`s`:`l`,s=e=>{navigator.clipboard.writeText(e),a(!0),setTimeout(()=>{a(!1)},1500)};return(0,O.jsxs)(A,{color:r,onClick:()=>s(t),children:[(0,O.jsx)(`div`,{className:`icon`,children:[...n.smallIcon?[`xxs`,`xs`,`s`]:[],...n.largeIcon?[`l`,`xl`]:[]].map(e=>{let n=l[e];return(0,O.jsx)(C,{placement:`top`,title:`Size ${e.toUpperCase()} (${n.height}px \u00D7 ${n.width}px)`,children:(0,O.jsx)(`span`,{children:(0,O.jsx)(_,{color:r,sdsSize:e,sdsIcon:t})})},e+t)})}),(0,O.jsx)(`p`,{children:t}),(0,O.jsxs)(`span`,{children:[`Available sizes`,[...n.smallIcon?[`xxs`,`xs`,`s`]:[],...n.largeIcon?[`l`,`xl`]:[]].map(e=>(0,O.jsx)(`span`,{className:`size-tag`,children:e},t+e))]}),i&&(0,O.jsxs)(`div`,{className:`notification`,children:[(0,O.jsx)(_,{color:r,sdsSize:o,sdsIcon:t}),(0,O.jsx)(`p`,{children:`Copied!`}),(0,O.jsx)(`span`,{children:(0,O.jsx)(_,{color:r,sdsSize:`xs`,sdsIcon:`Check`})})]})]},t+`wrapper`)},M=e=>{let{color:t}=e,n=Object.entries(g),[r,i]=(0,D.useState)(n);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(x,{id:`squareSearchPreview`,label:`Search`,sdsStyle:`square`,placeholder:`Search icons`,name:`square-input-search`,onChange:e=>{let t=e.target.value,r=new RegExp(t,`gi`);i(n.filter(e=>e[0].match(r)))},sx:{width:`260px`}}),r.length?(0,O.jsx)(k,{children:r.map(([e,n])=>(0,O.jsx)(j,{color:t,innerIcon:n,sdsIcon:e},e))}):(0,O.jsx)(`div`,{style:{maxWidth:`400px`},children:(0,O.jsx)(y,{intent:`notice`,icon:(0,O.jsx)(_,{sdsSize:`s`,sdsIcon:`InfoCircle`}),title:`No matches`,body:`Sorry, there are no matches for your search!`})})]})}})),P,F,I,L,R,z;t((()=>{h(),E(),N(),P=u(),F={argTypes:{color:{control:{type:`select`},options:[`blue`,`gray`,`green`,`purple`,`red`,`yellow`,`indigo`]},sdsIcon:{control:{type:`select`},options:[`CheckCircle`,`Copy`,`Edit`,`LightBulb`,`LinesHorizontal`,`Loading`,`XMark`]},sdsSize:{control:{type:`select`},options:[`xxs`,`xs`,`s`,`l`,`xl`]},shade:{control:{type:`select`},options:[100,200,300,400,500,600,700,800]}},component:T,title:`Components/Icon`},I={args:{color:`indigo`,sdsIcon:`CheckCircle`,sdsSize:`xl`}},L={args:{color:`indigo`},parameters:{controls:{exclude:[`sdsIcon`,`sdsSize`,`shade`]}},render:e=>(0,P.jsx)(M,{...e})},R={parameters:{controls:{exclude:[`color`,`sdsIcon`,`sdsSize`,`shade`]},snapshot:{skip:!0}},render:e=>(0,P.jsx)(_,{sdsIcon:`CheckCircle`,sdsSize:`l`,color:`indigo`,"data-testid":`icon`,...e})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    color: "indigo",
    sdsIcon: "CheckCircle",
    sdsSize: "xl"
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    color: "indigo"
  },
  parameters: {
    controls: {
      exclude: ["sdsIcon", "sdsSize", "shade"]
    }
  },
  render: (args: Args) => <IconBankDemo {...args} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: ["color", "sdsIcon", "sdsSize", "shade"]
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <RawIcon sdsIcon="CheckCircle" sdsSize="l" color="indigo" data-testid="icon" {...args} />
}`,...R.parameters?.docs?.source}}},z=[`Default`,`IconBank`,`Test`]}))();export{I as Default,L as IconBank,R as Test,z as __namedExportsOrder,F as default};