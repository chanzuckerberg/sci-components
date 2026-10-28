import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{L as o,Ut as s,f as c}from"./iframe-TnbieWZB.js";import{t as l}from"./NavigationJumpTo-CioYzFCu.js";import{t as u}from"./src-DFn0vHw8.js";function d(){let{scrollX:e,scrollY:t}=window,n=performance.now()+500,r=()=>{window.scrollTo({behavior:`instant`,left:e,top:t}),performance.now()<n&&requestAnimationFrame(r)};requestAnimationFrame(r)}function f(){let e=(0,m.useRef)(null),t=(0,m.useRef)(null),n=(0,m.useRef)(null);return(0,p.jsx)(`div`,{className:`app`,children:(0,p.jsxs)(h,{children:[(0,p.jsx)(l,{items:[{elementRef:e,title:`Overview`},{elementRef:t,title:`Methods`},{elementRef:n,title:`Results`}],onChange:(e,t,n)=>{n===`click`&&d()},width:`160px`}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(_,{id:`overview`,ref:e,children:[(0,p.jsx)(`h3`,{children:`Overview`}),(0,p.jsx)(`p`,{children:`What the study set out to measure and why.`})]}),(0,p.jsxs)(_,{id:`methods`,ref:t,children:[(0,p.jsx)(`h3`,{children:`Methods`}),(0,p.jsx)(`p`,{children:`How the samples were collected and processed.`})]}),(0,p.jsxs)(_,{id:`results`,ref:n,children:[(0,p.jsx)(`h3`,{children:`Results`}),(0,p.jsx)(`p`,{children:`What came out of the analysis.`})]})]})]})})}var p,m,h,g,_;t((()=>{r(),p=e(a()),u(),m=e(n()),h=i(`div`,{target:`e16jg7u12`})({name:`1r9eqj5`,styles:`display:flex;gap:16px`}),g=i(`div`,{target:`e16jg7u11`})(e=>`
      border: 1px solid ${s(e)?.base?.divider};
      border-radius: 4px;
      flex: 1;
      height: 280px;
      overflow-y: auto;
      padding: 16px;
    `,`;`),_=i(`section`,{target:`e16jg7u10`})(c,` `,e=>`
      color: ${s(e)?.base?.textPrimary};
      min-height: 320px;

      h3 {
        ${o(e)}
        margin: 0 0 8px 0;
      }
    `,`;`)}))();export{f as default};