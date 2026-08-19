import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r,Hn as i,oa as a,vo as o}from"./iframe-s0DqqZ6S.js";import{t as s}from"./src-kj6aSrnX.js";import{t as c}from"./DropdownMenu-Bv7IHSmA.js";function l(){let e=(0,u.useRef)(null),[t,n]=(0,u.useState)(!1);return(0,u.useEffect)(()=>{e.current&&n(!0)},[e.current]),(0,d.jsxs)(`div`,{className:`app`,children:[(0,d.jsx)(y,{ref:e}),t&&(0,d.jsx)(c,{PopperBaseProps:v,anchorEl:e.current,onClickAway:function(){},open:!0,options:f,PopperComponent:_})]})}var u,d,f,p,m,h,g,_,v,y;e((()=>{u=t(n()),i(),s(),d=t(r()),f=[{name:`Menu item 1`},{name:`Menu item 2`},{name:`Menu item 3`},{name:`Longer menu item than the others`}],p=({theme:e})=>e?.app?.borders||null,m=({theme:e})=>e?.app?.corners||null,h=({theme:e})=>e?.app?.shadows||null,g=({theme:e})=>e?.app?.spacing||null,_=o(a)`
  .MuiAutocomplete-popperDisablePortal {
    position: relative;
    width: 100% !important;
    box-shadow: none;
    padding: 0;
    border: none;
  }

  ${e=>{let t=p(e),n=m(e),r=h(e),i=g(e);return`
      background-color: white;
      border: ${t?.base?.divider};
      border-radius: ${n?.m}px;
      box-shadow: ${r?.m};
      padding: ${i?.xs}px;
      box-sizing: border-box;
      z-index: 1400;
    `}}

  border-color: purple;
  border-style: dotted;
  border-width: 15px !important;
`,v={popperOptions:{strategy:`absolute`}},y=o(`div`)`
  position: absolute;
  top: 12px;
  left: 20px;
`}))();export{l as default};