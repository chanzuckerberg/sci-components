import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Eo as i,G as a,L as o,ct as s,gn as c,ko as l,lt as u,mn as d}from"./iframe-CLRePdsX.js";import{t as f}from"./NavigationJumpTo-Bc1G5WzX.js";import{t as p}from"./src-LTclIrci.js";function m(){let{scrollX:e,scrollY:t}=window,n=performance.now()+500,r=()=>{window.scrollTo({behavior:`instant`,left:e,top:t}),performance.now()<n&&requestAnimationFrame(r)};requestAnimationFrame(r)}function h(){let[e,t]=(0,_.useState)(`none yet`),n=(0,_.useRef)(null),r=(0,_.useRef)(null),i=(0,_.useRef)(null),a=(0,_.useRef)(null),o=(0,_.useRef)(null);return(0,g.jsx)(`div`,{className:`app`,children:(0,g.jsxs)(v,{children:[(0,g.jsxs)(x,{children:[(0,g.jsx)(f,{items:[{elementRef:n,subItems:[{elementRef:r,title:`Sample prep`},{elementRef:i,title:`Sequencing`}],title:`Methods`},{elementRef:a,title:`Results`},{elementRef:o,title:`Discussion`}],onChange:(e,n,r)=>{t(`index ${e}, from ${r}`),r===`click`&&m()},width:`160px`}),(0,g.jsxs)(S,{children:[`Last change: `,(0,g.jsx)(`br`,{}),e]})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(b,{id:`methods`,ref:n,children:[(0,g.jsx)(`h3`,{children:`Methods`}),(0,g.jsx)(`p`,{children:`How the samples were collected and processed.`})]}),(0,g.jsxs)(b,{id:`sample-prep`,ref:r,children:[(0,g.jsx)(`h4`,{children:`Sample prep`}),(0,g.jsx)(`p`,{children:`Dissociation, staining, and quality gates.`})]}),(0,g.jsxs)(b,{id:`sequencing`,ref:i,children:[(0,g.jsx)(`h4`,{children:`Sequencing`}),(0,g.jsx)(`p`,{children:`Library construction and read depth per sample.`})]}),(0,g.jsxs)(b,{id:`results`,ref:a,children:[(0,g.jsx)(`h3`,{children:`Results`}),(0,g.jsx)(`p`,{children:`What came out of the analysis.`})]}),(0,g.jsxs)(b,{id:`discussion`,ref:o,children:[(0,g.jsx)(`h3`,{children:`Discussion`}),(0,g.jsx)(`p`,{children:`What the numbers do and do not support.`})]})]})]})})}var g,_,v,y,b,x,S;e((()=>{r(),g=t(i()),p(),_=t(n()),v=l(`div`,{target:`e1wxaxqc4`})({name:`1r9eqj5`,styles:`display:flex;gap:16px`}),y=l(`div`,{target:`e1wxaxqc3`})(e=>`
      border: 1px solid ${d(e)?.base?.divider};
      border-radius: 4px;
      flex: 1;
      height: 280px;
      overflow-y: auto;
      padding: 16px;
    `,`;`),b=l(`section`,{target:`e1wxaxqc2`})(o,` `,e=>`
      color: ${d(e)?.base?.textPrimary};
      min-height: 320px;

      h3 {
        ${s(e)}
        margin: 0 0 8px 0;
      }

      h4 {
        ${u(e)}
        margin: 0 0 8px 0;
      }
    `,`;`),x=l(`p`,{target:`e1wxaxqc1`})(e=>`
      display: flex;
      flex-direction: column;
      gap: ${c(e)?.xl}px;
    `,`;`),S=l(`p`,{target:`e1wxaxqc0`})(a,` `,e=>`
      color: ${d(e)?.base?.textSecondary};
    `,`;`)}))();export{h as default};