import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,R as i,Vr as a,an as o,t as s}from"./material-DlyzFPof.js";import{t as c}from"./jsx-runtime-cM__dR4X.js";import{Xt as l,Zt as u}from"./iframe-TnbieWZB.js";import{n as d,t as f}from"./Icon-P6YZrEvk.js";import{n as p,t as m}from"./Callout-Dxq8JPns.js";import{n as h,t as g}from"./Alert-Dhb1S20l.js";import{i as _,t as v}from"./icons-material-BEjqcECl.js";import{n as y,t as b}from"./ButtonLegacy-C_H1AJxX.js";var x,S,C,w,T,E,D,O,k,A;t((()=>{r(),v(),s(),x=e(n()),y(),u(),h(),p(),d(),S=e(c()),C=a(o,{target:`eyuqdbh0`})(`margin-left:-`,l.spacing(3),`px;padding-bottom:0;font-size:12px;line-height:18px;letter-spacing:1px;font-weight:600;&:hover{background:none;}`),w=e=>{let{text:t}=e;return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(m,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,S.jsx)(f,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,S.jsxs)(S.Fragment,{children:[`The `,(0,S.jsx)(`strong`,{children:`Alert`}),` component is deprecated!`,(0,S.jsx)(`br`,{}),`Please use `,(0,S.jsx)(`strong`,{children:`Callout`}),` or `,(0,S.jsx)(`strong`,{children:`Notification`}),` `,`instead.`]})}),(0,S.jsx)(g,{icon:(0,S.jsx)(_,{}),onClose:()=>{},...e,children:t})]})},T={argTypes:{text:{control:{type:`text`},required:!0}},component:w,title:`Deprecated/Alert`},E=[`text`],D={args:{text:`This is an alert!`},parameters:{snapshot:{skip:!0}}},O=()=>{let[e,t]=x.useState(!1);return(0,S.jsxs)(`div`,{children:[(0,S.jsx)(m,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,S.jsx)(f,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,S.jsxs)(S.Fragment,{children:[`The `,(0,S.jsx)(`strong`,{children:`Alert`}),` component is deprecated!`,(0,S.jsx)(`br`,{}),`Please use `,(0,S.jsx)(`strong`,{children:`Callout`}),` or `,(0,S.jsx)(`strong`,{children:`Notification`}),` `,`instead.`]})}),(0,S.jsx)(b,{sdsType:`primary`,sdsStyle:`square`,onClick:()=>t(!0),children:`Open alert`}),(0,S.jsx)(i,{anchorOrigin:{horizontal:`right`,vertical:`top`},open:e,autoHideDuration:6e3,children:(0,S.jsx)(`div`,{children:(0,S.jsxs)(g,{className:`elevated`,severity:`info`,children:[(0,S.jsx)(`div`,{children:`This is a snackbar alert!`}),(0,S.jsx)(C,{onClick:()=>t(!1),children:`DISMISS`})]})})})]})},k={args:{text:`Test Alert!`},parameters:{controls:{exclude:E}}},A=[`Default`,`SnackbarAlert`,`Test`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}}}))();export{D as Default,O as SnackbarAlert,k as Test,A as __namedExportsOrder,T as default};