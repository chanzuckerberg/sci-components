import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Eo as i,Hn as a,Ki as o,Sn as s,Tr as c,ko as l,xn as u}from"./iframe-CLRePdsX.js";import{n as d,t as f}from"./Icon-Dm0VxswF.js";import{n as p,t as m}from"./Callout-B8_fsr0X.js";import{n as h,t as g}from"./Alert-HeoDWe6P.js";import{c as _,t as v}from"./icons-material-rXBp6STi.js";import{n as y,t as b}from"./ButtonLegacy-DwhdSrjC.js";var x,S,C,w,T,E,D,O,k,A;e((()=>{r(),v(),a(),x=t(n()),y(),s(),h(),p(),d(),S=t(i()),C=l(o,{target:`eyuqdbh0`})(`margin-left:-`,u.spacing(3),`px;padding-bottom:0;font-size:12px;line-height:18px;letter-spacing:1px;font-weight:600;&:hover{background:none;}`),w=e=>{let{text:t}=e;return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(m,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,S.jsx)(f,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,S.jsxs)(S.Fragment,{children:[`The `,(0,S.jsx)(`strong`,{children:`Alert`}),` component is deprecated!`,(0,S.jsx)(`br`,{}),`Please use `,(0,S.jsx)(`strong`,{children:`Callout`}),` or `,(0,S.jsx)(`strong`,{children:`Notification`}),` `,`instead.`]})}),(0,S.jsx)(g,{icon:(0,S.jsx)(_,{}),onClose:()=>{},...e,children:t})]})},T={argTypes:{text:{control:{type:`text`},required:!0}},component:w,title:`Deprecated/Alert`},E=[`text`],D={args:{text:`This is an alert!`},parameters:{snapshot:{skip:!0}}},O=()=>{let[e,t]=x.useState(!1);return(0,S.jsxs)(`div`,{children:[(0,S.jsx)(m,{intent:`negative`,title:`Deprecated!`,sdsStyle:`persistent`,icon:(0,S.jsx)(f,{sdsIcon:`ExclamationMarkCircle`,sdsSize:`s`}),body:(0,S.jsxs)(S.Fragment,{children:[`The `,(0,S.jsx)(`strong`,{children:`Alert`}),` component is deprecated!`,(0,S.jsx)(`br`,{}),`Please use `,(0,S.jsx)(`strong`,{children:`Callout`}),` or `,(0,S.jsx)(`strong`,{children:`Notification`}),` `,`instead.`]})}),(0,S.jsx)(b,{sdsType:`primary`,sdsStyle:`square`,onClick:()=>t(!0),children:`Open alert`}),(0,S.jsx)(c,{anchorOrigin:{horizontal:`right`,vertical:`top`},open:e,autoHideDuration:6e3,children:(0,S.jsx)(`div`,{children:(0,S.jsxs)(g,{className:`elevated`,severity:`info`,children:[(0,S.jsx)(`div`,{children:`This is a snackbar alert!`}),(0,S.jsx)(C,{onClick:()=>t(!1),children:`DISMISS`})]})})})]})},k={args:{text:`Test Alert!`},parameters:{controls:{exclude:E}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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