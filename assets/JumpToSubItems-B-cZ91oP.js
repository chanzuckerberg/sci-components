import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Hr as r,Vr as i}from"./material-DlyzFPof.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";import{Gt as o,L as s,R as c,Ut as l,b as u,f as d}from"./iframe-DhUGD016.js";import{t as f}from"./NavigationJumpTo-BJgRxoUf.js";import{t as p}from"./src-Dl7X9U7d.js";function m(){let{scrollX:e,scrollY:t}=window,n=performance.now()+500,r=()=>{window.scrollTo({behavior:`instant`,left:e,top:t}),performance.now()<n&&requestAnimationFrame(r)};requestAnimationFrame(r)}function h(){let[e,t]=(0,_.useState)(`none yet`),n=(0,_.useRef)(null),r=(0,_.useRef)(null),i=(0,_.useRef)(null),a=(0,_.useRef)(null),o=(0,_.useRef)(null);return(0,g.jsx)(`div`,{className:`app`,children:(0,g.jsxs)(v,{children:[(0,g.jsxs)(x,{children:[(0,g.jsx)(f,{items:[{elementRef:n,subItems:[{elementRef:r,title:`Sample prep`},{elementRef:i,title:`Sequencing`}],title:`Methods`},{elementRef:a,title:`Results`},{elementRef:o,title:`Discussion`}],onChange:(e,n,r)=>{t(`index ${e}, from ${r}`),r===`click`&&m()},width:`160px`}),(0,g.jsxs)(S,{children:[`Last change: `,(0,g.jsx)(`br`,{}),e]})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(b,{id:`methods`,ref:n,children:[(0,g.jsx)(`h3`,{children:`Methods`}),(0,g.jsx)(`p`,{children:`How the samples were collected and processed.`})]}),(0,g.jsxs)(b,{id:`sample-prep`,ref:r,children:[(0,g.jsx)(`h4`,{children:`Sample prep`}),(0,g.jsx)(`p`,{children:`Dissociation, staining, and quality gates.`})]}),(0,g.jsxs)(b,{id:`sequencing`,ref:i,children:[(0,g.jsx)(`h4`,{children:`Sequencing`}),(0,g.jsx)(`p`,{children:`Library construction and read depth per sample.`})]}),(0,g.jsxs)(b,{id:`results`,ref:a,children:[(0,g.jsx)(`h3`,{children:`Results`}),(0,g.jsx)(`p`,{children:`What came out of the analysis.`})]}),(0,g.jsxs)(b,{id:`discussion`,ref:o,children:[(0,g.jsx)(`h3`,{children:`Discussion`}),(0,g.jsx)(`p`,{children:`What the numbers do and do not support.`})]})]})]})})}var g,_,v,y,b,x,S;t((()=>{r(),g=e(a()),p(),_=e(n()),v=i(`div`,{target:`e1wxaxqc4`})({name:`1r9eqj5`,styles:`display:flex;gap:16px`}),y=i(`div`,{target:`e1wxaxqc3`})(e=>`
      border: 1px solid ${l(e)?.base?.divider};
      border-radius: 4px;
      flex: 1;
      height: 280px;
      overflow-y: auto;
      padding: 16px;
    `,`;`),b=i(`section`,{target:`e1wxaxqc2`})(d,` `,e=>`
      color: ${l(e)?.base?.textPrimary};
      min-height: 320px;

      h3 {
        ${s(e)}
        margin: 0 0 8px 0;
      }

      h4 {
        ${c(e)}
        margin: 0 0 8px 0;
      }
    `,`;`),x=i(`p`,{target:`e1wxaxqc1`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${o(e)?.xl}px;
    `,`;`),S=i(`p`,{target:`e1wxaxqc0`})(u,` `,e=>`
      color: ${l(e)?.base?.textSecondary};
    `,`;`)}))();export{h as default};