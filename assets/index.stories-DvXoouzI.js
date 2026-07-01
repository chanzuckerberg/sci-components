import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r,Mi as i,Ni as a,Ut as o,ct as s,et as c,gr as l,tt as u}from"./iframe-Bjh1LYUt.js";import{n as d,t as f}from"./Icon-D5aq3JJF.js";import{o as p,t as m}from"./esm-_oLKvmP5.js";import{n as h,t as g}from"./ButtonLegacy-CLuQ8m7V.js";import{n as _,t as v}from"./Alert-Dj19RXlt.js";import{n as y,t as b}from"./Callout-CDE4bMFy.js";var x,S,C,w,T,E,D,O,k,A;t((()=>{a(),m(),s(),x=e(n()),h(),u(),_(),y(),d(),S=r(),C=i(l,{target:`eyuqdbh0`})(`margin-left:-`,c.spacing(3),`px;padding-bottom:0;font-size:12px;line-height:18px;letter-spacing:1px;font-weight:600;&:hover{background:none;}`),w=e=>{let{text:t}=e;return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(b,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,S.jsx)(f,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,S.jsxs)(S.Fragment,{children:[`The `,(0,S.jsx)(`strong`,{children:`Alert`}),` component is deprecated!`,(0,S.jsx)(`br`,{}),`Please use `,(0,S.jsx)(`strong`,{children:`Callout`}),` or `,(0,S.jsx)(`strong`,{children:`Notification`}),` `,`instead.`]})}),(0,S.jsx)(v,{icon:(0,S.jsx)(p,{}),onClose:()=>{},...e,children:t})]})},T={argTypes:{text:{control:{type:`text`},required:!0}},component:w,tags:[`deprecated`],title:`Deprecated/Alert`},E=[`text`],D={args:{text:`This is an alert!`},parameters:{snapshot:{skip:!0}}},O=()=>{let[e,t]=x.useState(!1);return(0,S.jsxs)(`div`,{children:[(0,S.jsx)(b,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,S.jsx)(f,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,S.jsxs)(S.Fragment,{children:[`The `,(0,S.jsx)(`strong`,{children:`Alert`}),` component is deprecated!`,(0,S.jsx)(`br`,{}),`Please use `,(0,S.jsx)(`strong`,{children:`Callout`}),` or `,(0,S.jsx)(`strong`,{children:`Notification`}),` `,`instead.`]})}),(0,S.jsx)(g,{sdsType:`primary`,sdsStyle:`square`,onClick:()=>t(!0),children:`Open alert`}),(0,S.jsx)(o,{anchorOrigin:{horizontal:`right`,vertical:`top`},open:e,autoHideDuration:6e3,children:(0,S.jsx)(`div`,{children:(0,S.jsxs)(v,{className:`elevated`,severity:`info`,children:[(0,S.jsx)(`div`,{children:`This is a snackbar alert!`}),(0,S.jsx)(C,{onClick:()=>t(!1),children:`DISMISS`})]})})})]})},k={args:{text:`Test Alert!`},parameters:{controls:{exclude:E}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    text: "This is an alert!"
  },
  parameters: {
    snapshot: {
      skip: true
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`() => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return <div>
      <Callout intent="negative" title="Deprecated!" sdsStyle="persistent" icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />} body={<>
            The <strong>Alert</strong> component is deprecated!
            <br />
            Please use <strong>Callout</strong> or <strong>Notification</strong>{" "}
            instead.
          </>} />
      <Button sdsType="primary" sdsStyle="square" onClick={handleOpen}>
        Open alert
      </Button>
      <Snackbar anchorOrigin={{
      horizontal: "right",
      vertical: "top"
    }} open={open} autoHideDuration={6000}>
        <div>
          <Alert className="elevated" severity="info">
            <div>This is a snackbar alert!</div>
            <DismissButton onClick={handleClose}>DISMISS</DismissButton>
          </Alert>
        </div>
      </Snackbar>
    </div>;
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Test Alert!"
  },
  parameters: {
    controls: {
      exclude: ExcludedControls
    }
  }
}`,...k.parameters?.docs?.source}}},A=[`Default`,`SnackbarAlert`,`Test`]}))();export{D as Default,O as SnackbarAlert,k as Test,A as __namedExportsOrder,T as default};