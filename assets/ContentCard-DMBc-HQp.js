import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{D as n,Fi as r,Ii as i,Li as a,Qa as o,Qn as s,Ri as c,W as l,X as u,Y as d,Z as f,_ as p,ct as m,dr as h,er as g,ir as _,k as v,ki as y,nr as ee,t as b,u as te,ur as ne,x,zi as S}from"./iframe-DocVhSSI.js";import{n as re,r as C,t as w}from"./warnings-Bvvuj_n2.js";import{a as T,o as ie,r as E,t as D}from"./utils-BxIa431Z.js";import{n as O,t as k}from"./Button-CfkvkcRt.js";var A,j,ae,oe,se,ce,le,ue,M,N=e((()=>{a(),m(),b(),S(),ne(),A=[`visualElement`,`sdsType`,`imagePosition`,`imagePadding`,`overlineText`,`titleText`,`subtitleText`,`metadataText`,`contentBlock`,`decorativeBorder`,`boundingBox`,`buttons`,`visualElementType`,`image`,`icon`,`buttonsPosition`,`clickableCard`,`imageSize`,`clickableCardProps`,`cardSdsType`,`classes`],j=(e,t,n)=>e===`wide`&&t===`image`?n===`left`?`row`:`row-reverse`:t===`icon`?`row`:`column`,ae=(e,t,n,r,i)=>e===`image`?t&&n&&(r&&i===`left`||i===`right`):t&&n,oe=i(_,{shouldForwardProp:e=>!A.includes(e),target:`e1dovfyq5`})(e=>{let{imagePosition:t=`left`,sdsType:n=`wide`,boundingBox:r=!0,decorativeBorder:i=!1,imagePadding:a=!1,visualElementType:o,clickableCard:s=!1}=e,p=d(e),m=l(e),h=u(e),g=f(e),_=j(n,o,t),v=ae(o,r,i,a,t);return c(`position:relative;display:flex;background-color:transparent;background-image:none;flex-direction:`,_,`;overflow:visible!important;box-shadow:none;border-radius:`,m?.xl,`px;.MuiCardActionArea-focusHighlight{background:transparent;}&:hover,&:active{box-shadow:`,s?h?.l:h?.none,`!important;}`,r&&c(`border:1px solid `,p?.base?.borderSecondary,`;background-color:`,p?.base?.backgroundPrimary,`;`,``),` `,v&&c(`&:before{content:"";position:absolute;background-color:`,p?.accent?.foreground,`;z-index:10;`,n===`wide`&&c(`top:-1px;bottom:-1px;left:-1px;width:`,g?.xs,`px;border-top-left-radius:`,m?.xl,`px;border-bottom-left-radius:`,m?.xl,`px;`,``),` `,n===`narrow`&&c(`height:`,g?.xs,`px;top:-1px;left:-1px;right:-1px;border-top-left-radius:`,m?.xl,`px;border-top-right-radius:`,m?.xl,`px;`,``),`;}`,``),` `,n===`wide`&&v&&c(`border-top-left-radius:`,m?.l,`px;border-bottom-left-radius:`,m?.l,`px;`,``),` `,n===`narrow`&&v&&c(`border-top-left-radius:`,m?.l,`px;border-top-right-radius:`,m?.l,`px;`,``),`;`,``)},`;`),se=i(h,{shouldForwardProp:e=>!A.includes(e),target:`e1dovfyq4`})(e=>{let{imagePosition:t=`left`,cardSdsType:n=`wide`,visualElementType:r}=e,i=d(e),a=l(e);return`
      display: flex;
      flex-direction: ${j(n,r,t)};
      align-items: unset;
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
      overflow: auto;
      text-align: unset;
      border-radius: ${a?.xl}px;

      background-color: ${i?.base?.backgroundPrimary};

      &:hover,
      &:active {
        background-color: ${i?.base?.surfacePrimary};
      }
    `},`;`),ce=i(`div`,{shouldForwardProp:e=>!A.includes(e),target:`e1dovfyq3`})(e=>{let{boundingBox:t=!0}=e,n=f(e);return c(t?c(`padding:`,n?.xl,`px 0 `,n?.xl,`px `,n?.xl,`px;`,``):c(`padding-right:`,n?.xl,`px;`,``),`;`,``)},`;`),le=i(`div`,{shouldForwardProp:e=>!A.includes(e),target:`e1dovfyq2`})(e=>{let{boundingBox:t=!0,sdsType:n=`wide`,visualElementType:r}=e,i=f(e),a=n===`narrow`?r===`image`?`${i?.xl}px 0 0 0`:0:`0 0 0 ${i?.xl}px`;return c(`display:flex;flex-direction:column;min-width:100px;width:100%;height:100%;`,t?c(`padding:`,i?.xl,`px;`,``):c(`padding:`,a,`;`,``),`;`,``)},`;`),ue=i(g,{shouldForwardProp:e=>!A.includes(e),target:`e1dovfyq1`})(te,` `,e=>{let t=d(e),n=f(e);return`
      color: ${t?.base?.textPrimary};
      margin: ${n?.l}px 0 0;
      padding: 0;
      white-space: pre-wrap;
    `},`;`),M=i(`div`,{target:`e1dovfyq0`})({name:`1x7nnnc`,styles:`display:flex;flex-direction:column;justify-content:space-between;height:100%`})})),P,F,I,L,R,z,B=e((()=>{m(),b(),P=[`visualElement`,`sdsType`,`imagePosition`,`imagePadding`,`overlineText`,`titleText`,`subtitleText`,`metadataText`,`contentBlock`],F=y(`div`,{shouldForwardProp:e=>!P.includes(e)})`
  ${e=>`
      display: flex;
      flex-direction: column;
      gap: ${f(e)?.xxs}px;
    `}
`,I=y(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${x}
  ${e=>`
      color: ${d(e)?.base?.textSecondary};
      margin: 0;
    `}
`,L=y(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${v}
  ${e=>`
      color: ${d(e)?.base?.textPrimary};
      margin: 0;
    `}
`,R=y(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${n}
  ${e=>`
      color: ${d(e)?.base?.textPrimary};
      margin: 0;
    `}
`,z=y(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${p}
  ${e=>{let t=d(e),n=f(e);return`
      color: ${t?.base?.textSecondary};
      margin: ${n?.s}px 0 0 0;
    `}}
`})),V,H,U,W,de,fe,pe,me,he=e((()=>{V=t(o()),B(),T(),H=r(),U=e=>({text:t,className:n})=>t?typeof t==`string`?(0,H.jsx)(e,{className:E(n),children:t}):t:null,W=U(I),de=U(L),fe=U(R),pe=U(z),me=(0,V.forwardRef)(function(e,t){let{overlineText:n,titleText:r,subtitleText:i,metadataText:a,classes:o=D}=e,{cardHeader:s,cardOverline:c,cardTitle:l,cardSubtitle:u,cardMetadata:d}=o;return(0,H.jsxs)(`div`,{ref:t,children:[(0,H.jsxs)(F,{className:E(s),children:[(0,H.jsx)(W,{text:n,className:c}),(0,H.jsx)(de,{text:r,className:l}),(0,H.jsx)(fe,{text:i,className:u})]}),(0,H.jsx)(pe,{text:a,className:d})]})})})),ge,G,_e=e((()=>{a(),m(),b(),ge=[`buttonsPosition`],G=i(ee,{shouldForwardProp:e=>!ge.includes(e),target:`ewfyato0`})(e=>{let{buttonsPosition:t=`left`}=e,n=f(e);return`
      margin: 0;
      padding: ${n?.xl}px 0 0;
      display: flex;
      gap: ${n?.m}px;
      justify-content: ${t===`right`?`flex-end`:`flex-start`};

      & > * {
        margin: 0 !important;
      }
    `},`;`)})),K,q,ve,J,ye=e((()=>{K=t(o()),_e(),O(),re(),T(),q=r(),ve=e=>K.isValidElement(e)&&e.type===k?!0:(C(w.ContentCardActionsOnlyButtons),!1),J=(0,K.forwardRef)(function(e,t){let{buttonsPosition:n,clickableCard:r,children:i,classes:a=D}=e,{cardActions:o}=a,s=K.Children.toArray(Array.isArray(i)?i:[i]).filter(ve);if(r){s.length>1&&C(w.ClickableContentCardNumberOfButtons);let e=s.shift();return e?(0,q.jsx)(G,{ref:t,buttonsPosition:n,className:E(o),children:[K.cloneElement(e,{component:`div`,...e?.props})]}):null}return(0,q.jsx)(G,{ref:t,buttonsPosition:n,className:E(o),children:s})})})),be,xe,Se=e((()=>{b(),m(),be=[`imagePadding`,`boundingBox`,`sdsType`,`imageSize`,`image`,`imagePosition`],xe=y(`div`,{shouldForwardProp:e=>!be.includes(e)})`
  ${e=>{let{imagePadding:t=!1,boundingBox:n=!0,sdsType:r=`wide`,imagePosition:i=`left`}=e,a=f(e),o=l(e),s=o?.xl?`calc(${o.xl}px - 1px)`:`0`;return c`
      display: flex;
      align-items: start;
      ${r===`narrow`&&`justify-content: center;`}

      img {
        border-radius: ${n&&t?0:r===`narrow`?`${s} ${s} 0 0`:i===`left`?`${s} 0 0 ${s}`:`0 ${s} ${s} 0`};
      }

      ${!n||!t?c`
          padding: 0;
        `:r===`narrow`?c`
          padding: ${a?.xl}px;
          padding-bottom: 0;
        `:c`
        padding: ${a?.xl}px;
        ${i===`left`?`padding-right: 0;`:`padding-left: 0;`}
      `}
    `}}
`})),Y,X,Z,Ce=e((()=>{Y=t(o()),Se(),m(),X=r(),Z=(0,Y.forwardRef)(function(e,t){let{image:n,imageSize:r,sdsType:i,className:a}=e,o={height:`100%`,maxHeight:i===`narrow`?r:`100%`,maxWidth:i===`narrow`?`100%`:r,minHeight:r,minWidth:i===`narrow`?`unset`:r,width:`100%`},c=typeof n==`string`?(0,X.jsx)(s,{component:`img`,src:n,alt:`Content Card Media`,sx:{...o}}):Y.isValidElement(n)&&n.type===s?Y.cloneElement(n,{component:`img`,sx:{...n.props.sx,...o}}):Y.isValidElement(n)?Y.cloneElement(n,{style:{...o,objectFit:`cover`,objectPosition:`center`}}):null;return(0,X.jsx)(xe,{ref:t,...e,className:a,children:c})})})),we=e((()=>{})),Q,$,Te,Ee,De,Oe=e((()=>{Q=t(o()),N(),he(),ye(),T(),Ce(),we(),B(),$=r(),Te=e=>{let[t,n]=(0,Q.useState)(!1);return{dynamicSdsType:t?`narrow`:e,handleResize:e=>{e<595&&!t?n(!0):e>605&&t&&n(!1)},isNarrow:t}},Ee=(e,t,n,r)=>Q.Children.map(e,e=>Q.isValidElement(e)&&e.type===J?Q.cloneElement(e,{...e.props,buttonsPosition:n,classes:r,clickableCard:t}):e),De=Q.forwardRef((e,t)=>{let{visualElementType:n=`none`,image:r,icon:i,imagePadding:a=!1,imageSize:o=300,overlineText:s,titleText:c,subtitleText:l,metadataText:u,boundingBox:d=!0,children:f,sdsType:p=`wide`,clickableCard:m=!1,imagePosition:h=`left`,buttonsPosition:g=`left`,clickableCardProps:_,classes:v=D}=e,{cardMedia:y,cardContent:ee,cardHeader:b,cardMetadata:te,cardOverline:ne,cardSubtitle:x,cardTitle:S,cardActions:re,cardPaper:C,clickableCardButton:w}=v,T=m?!0:d,O=(0,Q.useRef)(null),{handleResize:k,dynamicSdsType:A}=Te(p);(0,Q.useEffect)(()=>{let e=O.current;if(!e)return;let t=new ResizeObserver(e=>{for(let t of e)k(t.contentRect.width)});return t.observe(e),()=>{t.disconnect()}},[k]);let j=(0,$.jsxs)($.Fragment,{children:[n===`image`&&r?(0,$.jsx)(Z,{imagePadding:a,boundingBox:T,sdsType:A,imageSize:o,image:r,imagePosition:h,className:E(y)}):n===`icon`&&i?(0,$.jsx)(ce,{boundingBox:T,className:E(y),children:i}):null,(0,$.jsxs)(le,{boundingBox:T,clickableCard:m,className:E(ee),sdsType:A,visualElementType:n,children:[(0,$.jsx)(me,{overlineText:s,titleText:c,subtitleText:l,metadataText:u,classes:{cardHeader:b,cardMetadata:te,cardOverline:ne,cardSubtitle:x,cardTitle:S}}),(0,$.jsx)(M,{children:Ee(f,m,g,{cardActions:re})})]})]});return(0,$.jsx)(oe,{ref:ie([t,O]),...e,sdsType:A,boundingBox:T,className:E(C),children:m?(0,$.jsx)(se,{..._,cardSdsType:A,visualElementType:n,imagePosition:h,className:E(w),children:j}):j})})}));export{ue as a,ye as i,Oe as n,N as o,J as r,De as t};