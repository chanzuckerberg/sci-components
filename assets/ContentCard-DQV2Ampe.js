import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{$n as n,D as r,Kr as i,Qn as a,W as o,Wn as s,X as c,Xn as l,Y as u,Z as d,Zn as f,_ as p,an as m,cn as h,cr as g,dn as _,fn as v,k as y,on as b,sn as ee,st as x,t as S,u as te,x as C}from"./iframe-DI6qETgL.js";import{n as w,r as T,t as E}from"./warnings-DdHhhR49.js";import{a as D,o as ne,r as O,t as k}from"./utils-B1uyFjm5.js";import{n as A,t as j}from"./Button-K7qsdWHe.js";var M,N,re,ie,ae,oe,se,ce,le,ue=t((()=>{f(),x(),S(),n(),_(),M=[`visualElement`,`sdsType`,`imagePosition`,`imagePadding`,`overlineText`,`titleText`,`subtitleText`,`metadataText`,`contentBlock`,`decorativeBorder`,`boundingBox`,`buttons`,`visualElementType`,`image`,`icon`,`buttonsPosition`,`clickableCard`,`imageSize`,`clickableCardProps`,`cardSdsType`,`classes`],N=(e,t,n)=>e===`wide`&&t===`image`?n===`left`?`row`:`row-reverse`:t===`icon`?`row`:`column`,re=(e,t,n,r,i)=>e===`image`?t&&n&&(r&&i===`left`||i===`right`):t&&n,ie=l(h,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq5`})(e=>{let{imagePosition:t=`left`,sdsType:n=`wide`,boundingBox:r=!0,decorativeBorder:i=!1,imagePadding:s=!1,visualElementType:l,clickableCard:f=!1}=e,p=u(e),m=o(e),h=c(e),g=d(e),_=N(n,l,t),v=re(l,r,i,s,t);return a(`position:relative;display:flex;background-color:transparent;background-image:none;flex-direction:`,_,`;overflow:visible!important;box-shadow:none;border-radius:`,m?.xl,`px;.MuiCardActionArea-focusHighlight{background:transparent;}&:hover,&:active{box-shadow:`,f?h?.l:h?.none,`!important;}`,r&&a(`border:1px solid `,p?.base?.borderSecondary,`;background-color:`,p?.base?.backgroundPrimary,`;`,``),` `,v&&a(`&:before{content:"";position:absolute;background-color:`,p?.accent?.foreground,`;z-index:10;`,n===`wide`&&a(`top:-1px;bottom:-1px;left:-1px;width:`,g?.xs,`px;border-top-left-radius:`,m?.xl,`px;border-bottom-left-radius:`,m?.xl,`px;`,``),` `,n===`narrow`&&a(`height:`,g?.xs,`px;top:-1px;left:-1px;right:-1px;border-top-left-radius:`,m?.xl,`px;border-top-right-radius:`,m?.xl,`px;`,``),`;}`,``),` `,n===`wide`&&v&&a(`border-top-left-radius:`,m?.l,`px;border-bottom-left-radius:`,m?.l,`px;`,``),` `,n===`narrow`&&v&&a(`border-top-left-radius:`,m?.l,`px;border-top-right-radius:`,m?.l,`px;`,``),`;`,``)},`;`),ae=l(v,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq4`})(e=>{let{imagePosition:t=`left`,cardSdsType:n=`wide`,visualElementType:r}=e,i=u(e),a=o(e);return`
      display: flex;
      flex-direction: ${N(n,r,t)};
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
    `},`;`),oe=l(`div`,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq3`})(e=>{let{boundingBox:t=!0}=e,n=d(e);return a(t?a(`padding:`,n?.xl,`px 0 `,n?.xl,`px `,n?.xl,`px;`,``):a(`padding-right:`,n?.xl,`px;`,``),`;`,``)},`;`),se=l(`div`,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq2`})(e=>{let{boundingBox:t=!0,sdsType:n=`wide`,visualElementType:r}=e,i=d(e),o=n===`narrow`?r===`image`?`${i?.xl}px 0 0 0`:0:`0 0 0 ${i?.xl}px`;return a(`display:flex;flex-direction:column;min-width:100px;width:100%;height:100%;`,t?a(`padding:`,i?.xl,`px;`,``):a(`padding:`,o,`;`,``),`;`,``)},`;`),ce=l(b,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq1`})(te,` `,e=>{let t=u(e),n=d(e);return`
      color: ${t?.base?.textPrimary};
      margin: ${n?.l}px 0 0;
      padding: 0;
      white-space: pre-wrap;
    `},`;`),le=l(`div`,{target:`e1dovfyq0`})({name:`1x7nnnc`,styles:`display:flex;flex-direction:column;justify-content:space-between;height:100%`})})),P,F,I,L,R,z,B=t((()=>{x(),S(),P=[`visualElement`,`sdsType`,`imagePosition`,`imagePadding`,`overlineText`,`titleText`,`subtitleText`,`metadataText`,`contentBlock`],F=s(`div`,{shouldForwardProp:e=>!P.includes(e)})`
  ${e=>`
      display: flex;
      flex-direction: column;
      gap: ${d(e)?.xxs}px;
    `}
`,I=s(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${C}
  ${e=>`
      color: ${u(e)?.base?.textSecondary};
      margin: 0;
    `}
`,L=s(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${y}
  ${e=>`
      color: ${u(e)?.base?.textPrimary};
      margin: 0;
    `}
`,R=s(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${r}
  ${e=>`
      color: ${u(e)?.base?.textPrimary};
      margin: 0;
    `}
`,z=s(`p`,{shouldForwardProp:e=>!P.includes(e)})`
  ${p}
  ${e=>{let t=u(e),n=d(e);return`
      color: ${t?.base?.textSecondary};
      margin: ${n?.s}px 0 0 0;
    `}}
`})),V,H,U,de,fe,pe,me,he,ge=t((()=>{V=e(i()),B(),D(),H=g(),U=e=>({text:t,className:n})=>t?typeof t==`string`?(0,H.jsx)(e,{className:O(n),children:t}):t:null,de=U(I),fe=U(L),pe=U(R),me=U(z),he=(0,V.forwardRef)(function(e,t){let{overlineText:n,titleText:r,subtitleText:i,metadataText:a,classes:o=k}=e,{cardHeader:s,cardOverline:c,cardTitle:l,cardSubtitle:u,cardMetadata:d}=o;return(0,H.jsxs)(`div`,{ref:t,children:[(0,H.jsxs)(F,{className:O(s),children:[(0,H.jsx)(de,{text:n,className:c}),(0,H.jsx)(fe,{text:r,className:l}),(0,H.jsx)(pe,{text:i,className:u})]}),(0,H.jsx)(me,{text:a,className:d})]})})})),_e,W,ve=t((()=>{f(),x(),S(),_e=[`buttonsPosition`],W=l(ee,{shouldForwardProp:e=>!_e.includes(e),target:`ewfyato0`})(e=>{let{buttonsPosition:t=`left`}=e,n=d(e);return`
      margin: 0;
      padding: ${n?.xl}px 0 0;
      display: flex;
      gap: ${n?.m}px;
      justify-content: ${t===`right`?`flex-end`:`flex-start`};

      & > * {
        margin: 0 !important;
      }
    `},`;`)})),G,K,ye,q,be=t((()=>{G=e(i()),ve(),A(),w(),D(),K=g(),ye=e=>G.isValidElement(e)&&e.type===j?!0:(T(E.ContentCardActionsOnlyButtons),!1),q=(0,G.forwardRef)(function(e,t){let{buttonsPosition:n,clickableCard:r,children:i,classes:a=k}=e,{cardActions:o}=a,s=G.Children.toArray(Array.isArray(i)?i:[i]).filter(ye);if(r){s.length>1&&T(E.ClickableContentCardNumberOfButtons);let e=s.shift();return e?(0,K.jsx)(W,{ref:t,buttonsPosition:n,className:O(o),children:[G.cloneElement(e,{component:`div`,...e?.props})]}):null}return(0,K.jsx)(W,{ref:t,buttonsPosition:n,className:O(o),children:s})})})),xe,Se,Ce=t((()=>{S(),x(),xe=[`imagePadding`,`boundingBox`,`sdsType`,`imageSize`,`image`,`imagePosition`],Se=s(`div`,{shouldForwardProp:e=>!xe.includes(e)})`
  ${e=>{let{imagePadding:t=!1,boundingBox:n=!0,sdsType:r=`wide`,imagePosition:i=`left`}=e,s=d(e),c=o(e),l=c?.xl?`calc(${c.xl}px - 1px)`:`0`;return a`
      display: flex;
      align-items: start;
      ${r===`narrow`&&`justify-content: center;`}

      img {
        border-radius: ${n&&t?0:r===`narrow`?`${l} ${l} 0 0`:i===`left`?`${l} 0 0 ${l}`:`0 ${l} ${l} 0`};
      }

      ${!n||!t?a`
          padding: 0;
        `:r===`narrow`?a`
          padding: ${s?.xl}px;
          padding-bottom: 0;
        `:a`
        padding: ${s?.xl}px;
        ${i===`left`?`padding-right: 0;`:`padding-left: 0;`}
      `}
    `}}
`})),J,Y,X,we=t((()=>{J=e(i()),Ce(),x(),Y=g(),X=(0,J.forwardRef)(function(e,t){let{image:n,imageSize:r,sdsType:i,className:a}=e,o={height:`100%`,maxHeight:i===`narrow`?r:`100%`,maxWidth:i===`narrow`?`100%`:r,minHeight:r,minWidth:i===`narrow`?`unset`:r,width:`100%`},s=typeof n==`string`?(0,Y.jsx)(m,{component:`img`,src:n,alt:`Content Card Media`,sx:{...o}}):J.isValidElement(n)&&n.type===m?J.cloneElement(n,{component:`img`,sx:{...n.props.sx,...o}}):J.isValidElement(n)?J.cloneElement(n,{style:{...o,objectFit:`cover`,objectPosition:`center`}}):null;return(0,Y.jsx)(Se,{ref:t,...e,className:a,children:s})})})),Te=t((()=>{})),Z,Q,Ee,De,$,Oe=t((()=>{Z=e(i()),ue(),ge(),be(),D(),we(),Te(),B(),Q=g(),Ee=e=>{let[t,n]=(0,Z.useState)(!1);return{dynamicSdsType:t?`narrow`:e,handleResize:e=>{e<595&&!t?n(!0):e>605&&t&&n(!1)},isNarrow:t}},De=(e,t,n,r)=>Z.Children.map(e,e=>Z.isValidElement(e)&&e.type===q?Z.cloneElement(e,{...e.props,buttonsPosition:n,classes:r,clickableCard:t}):e),$=Z.forwardRef((e,t)=>{let{visualElementType:n=`none`,image:r,icon:i,imagePadding:a=!1,imageSize:o=300,overlineText:s,titleText:c,subtitleText:l,metadataText:u,boundingBox:d=!0,children:f,sdsType:p=`wide`,clickableCard:m=!1,imagePosition:h=`left`,buttonsPosition:g=`left`,clickableCardProps:_,classes:v=k}=e,{cardMedia:y,cardContent:b,cardHeader:ee,cardMetadata:x,cardOverline:S,cardSubtitle:te,cardTitle:C,cardActions:w,cardPaper:T,clickableCardButton:E}=v,D=m?!0:d,A=(0,Z.useRef)(null),{handleResize:j,dynamicSdsType:M}=Ee(p);(0,Z.useEffect)(()=>{let e=A.current;if(!e)return;let t=new ResizeObserver(e=>{for(let t of e)j(t.contentRect.width)});return t.observe(e),()=>{t.disconnect()}},[j]);let N=(0,Q.jsxs)(Q.Fragment,{children:[n===`image`&&r?(0,Q.jsx)(X,{imagePadding:a,boundingBox:D,sdsType:M,imageSize:o,image:r,imagePosition:h,className:O(y)}):n===`icon`&&i?(0,Q.jsx)(oe,{boundingBox:D,className:O(y),children:i}):null,(0,Q.jsxs)(se,{boundingBox:D,clickableCard:m,className:O(b),sdsType:M,visualElementType:n,children:[(0,Q.jsx)(he,{overlineText:s,titleText:c,subtitleText:l,metadataText:u,classes:{cardHeader:ee,cardMetadata:x,cardOverline:S,cardSubtitle:te,cardTitle:C}}),(0,Q.jsx)(le,{children:De(f,m,g,{cardActions:w})})]})]});return(0,Q.jsx)(ie,{ref:ne([t,A]),...e,sdsType:M,boundingBox:D,className:O(T),children:m?(0,Q.jsx)(ae,{..._,cardSdsType:M,visualElementType:n,imagePosition:h,className:O(E),children:N}):N})})}));export{ce as i,Oe as n,q as r,$ as t};