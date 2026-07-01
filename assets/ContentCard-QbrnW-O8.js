import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Ci as r,D as i,Fi as a,Gi as o,Mi as s,Ni as c,Pi as l,W as u,X as d,Y as f,Z as p,_ as m,ar as h,ct as g,gr as _,hr as v,k as y,lr as ee,rr as b,sr as x,t as S,u as te,x as C}from"./iframe-Bjh1LYUt.js";import{n as w,r as T,t as E}from"./warnings-C77gj_xO.js";import{a as D,o as ne,r as O,t as k}from"./utils-CHt6irz9.js";import{n as A,t as j}from"./Button-BT0OC4_c.js";var M,N,re,ie,ae,oe,se,ce,le,P=t((()=>{c(),g(),S(),a(),v(),M=[`visualElement`,`sdsType`,`imagePosition`,`imagePadding`,`overlineText`,`titleText`,`subtitleText`,`metadataText`,`contentBlock`,`decorativeBorder`,`boundingBox`,`buttons`,`visualElementType`,`image`,`icon`,`buttonsPosition`,`clickableCard`,`imageSize`,`clickableCardProps`,`cardSdsType`,`classes`],N=(e,t,n)=>e===`wide`&&t===`image`?n===`left`?`row`:`row-reverse`:t===`icon`?`row`:`column`,re=(e,t,n,r,i)=>e===`image`?t&&n&&(r&&i===`left`||i===`right`):t&&n,ie=s(ee,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq5`})(e=>{let{imagePosition:t=`left`,sdsType:n=`wide`,boundingBox:r=!0,decorativeBorder:i=!1,imagePadding:a=!1,visualElementType:o,clickableCard:s=!1}=e,c=f(e),m=u(e),h=d(e),g=p(e),_=N(n,o,t),v=re(o,r,i,a,t);return l(`position:relative;display:flex;background-color:transparent;background-image:none;flex-direction:`,_,`;overflow:visible!important;box-shadow:none;border-radius:`,m?.xl,`px;.MuiCardActionArea-focusHighlight{background:transparent;}&:hover,&:active{box-shadow:`,s?h?.l:h?.none,`!important;}`,r&&l(`border:1px solid `,c?.base?.borderSecondary,`;background-color:`,c?.base?.backgroundPrimary,`;`,``),` `,v&&l(`&:before{content:"";position:absolute;background-color:`,c?.accent?.foreground,`;z-index:10;`,n===`wide`&&l(`top:-1px;bottom:-1px;left:-1px;width:`,g?.xs,`px;border-top-left-radius:`,m?.xl,`px;border-bottom-left-radius:`,m?.xl,`px;`,``),` `,n===`narrow`&&l(`height:`,g?.xs,`px;top:-1px;left:-1px;right:-1px;border-top-left-radius:`,m?.xl,`px;border-top-right-radius:`,m?.xl,`px;`,``),`;}`,``),` `,n===`wide`&&v&&l(`border-top-left-radius:`,m?.l,`px;border-bottom-left-radius:`,m?.l,`px;`,``),` `,n===`narrow`&&v&&l(`border-top-left-radius:`,m?.l,`px;border-top-right-radius:`,m?.l,`px;`,``),`;`,``)},`;`),ae=s(_,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq4`})(e=>{let{imagePosition:t=`left`,cardSdsType:n=`wide`,visualElementType:r}=e,i=f(e),a=u(e);return`
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
    `},`;`),oe=s(`div`,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq3`})(e=>{let{boundingBox:t=!0}=e,n=p(e);return l(t?l(`padding:`,n?.xl,`px 0 `,n?.xl,`px `,n?.xl,`px;`,``):l(`padding-right:`,n?.xl,`px;`,``),`;`,``)},`;`),se=s(`div`,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq2`})(e=>{let{boundingBox:t=!0,sdsType:n=`wide`,visualElementType:r}=e,i=p(e),a=n===`narrow`?r===`image`?`${i?.xl}px 0 0 0`:0:`0 0 0 ${i?.xl}px`;return l(`display:flex;flex-direction:column;min-width:100px;width:100%;height:100%;`,t?l(`padding:`,i?.xl,`px;`,``):l(`padding:`,a,`;`,``),`;`,``)},`;`),ce=s(h,{shouldForwardProp:e=>!M.includes(e),target:`e1dovfyq1`})(te,` `,e=>{let t=f(e),n=p(e);return`
      color: ${t?.base?.textPrimary};
      margin: ${n?.l}px 0 0;
      padding: 0;
      white-space: pre-wrap;
    `},`;`),le=s(`div`,{target:`e1dovfyq0`})({name:`1x7nnnc`,styles:`display:flex;flex-direction:column;justify-content:space-between;height:100%`})})),F,I,L,R,z,B,V=t((()=>{g(),S(),F=[`visualElement`,`sdsType`,`imagePosition`,`imagePadding`,`overlineText`,`titleText`,`subtitleText`,`metadataText`,`contentBlock`],I=r(`div`,{shouldForwardProp:e=>!F.includes(e)})`
  ${e=>`
      display: flex;
      flex-direction: column;
      gap: ${p(e)?.xxs}px;
    `}
`,L=r(`p`,{shouldForwardProp:e=>!F.includes(e)})`
  ${C}
  ${e=>`
      color: ${f(e)?.base?.textSecondary};
      margin: 0;
    `}
`,R=r(`p`,{shouldForwardProp:e=>!F.includes(e)})`
  ${y}
  ${e=>`
      color: ${f(e)?.base?.textPrimary};
      margin: 0;
    `}
`,z=r(`p`,{shouldForwardProp:e=>!F.includes(e)})`
  ${i}
  ${e=>`
      color: ${f(e)?.base?.textPrimary};
      margin: 0;
    `}
`,B=r(`p`,{shouldForwardProp:e=>!F.includes(e)})`
  ${m}
  ${e=>{let t=f(e),n=p(e);return`
      color: ${t?.base?.textSecondary};
      margin: ${n?.s}px 0 0 0;
    `}}
`})),H,U,W,ue,de,fe,pe,me,he=t((()=>{H=e(n()),V(),D(),U=o(),W=e=>({text:t,className:n})=>t?typeof t==`string`?(0,U.jsx)(e,{className:O(n),children:t}):t:null,ue=W(L),de=W(R),fe=W(z),pe=W(B),me=(0,H.forwardRef)(function(e,t){let{overlineText:n,titleText:r,subtitleText:i,metadataText:a,classes:o=k}=e,{cardHeader:s,cardOverline:c,cardTitle:l,cardSubtitle:u,cardMetadata:d}=o;return(0,U.jsxs)(`div`,{ref:t,children:[(0,U.jsxs)(I,{className:O(s),children:[(0,U.jsx)(ue,{text:n,className:c}),(0,U.jsx)(de,{text:r,className:l}),(0,U.jsx)(fe,{text:i,className:u})]}),(0,U.jsx)(pe,{text:a,className:d})]})})})),ge,G,_e=t((()=>{c(),g(),S(),ge=[`buttonsPosition`],G=s(x,{shouldForwardProp:e=>!ge.includes(e),target:`ewfyato0`})(e=>{let{buttonsPosition:t=`left`}=e,n=p(e);return`
      margin: 0;
      padding: ${n?.xl}px 0 0;
      display: flex;
      gap: ${n?.m}px;
      justify-content: ${t===`right`?`flex-end`:`flex-start`};

      & > * {
        margin: 0 !important;
      }
    `},`;`)})),K,q,ve,J,ye=t((()=>{K=e(n()),_e(),A(),w(),D(),q=o(),ve=e=>K.isValidElement(e)&&e.type===j?!0:(T(E.ContentCardActionsOnlyButtons),!1),J=(0,K.forwardRef)(function(e,t){let{buttonsPosition:n,clickableCard:r,children:i,classes:a=k}=e,{cardActions:o}=a,s=K.Children.toArray(Array.isArray(i)?i:[i]).filter(ve);if(r){s.length>1&&T(E.ClickableContentCardNumberOfButtons);let e=s.shift();return e?(0,q.jsx)(G,{ref:t,buttonsPosition:n,className:O(o),children:[K.cloneElement(e,{component:`div`,...e?.props})]}):null}return(0,q.jsx)(G,{ref:t,buttonsPosition:n,className:O(o),children:s})})})),be,xe,Se=t((()=>{S(),g(),be=[`imagePadding`,`boundingBox`,`sdsType`,`imageSize`,`image`,`imagePosition`],xe=r(`div`,{shouldForwardProp:e=>!be.includes(e)})`
  ${e=>{let{imagePadding:t=!1,boundingBox:n=!0,sdsType:r=`wide`,imagePosition:i=`left`}=e,a=p(e),o=u(e),s=o?.xl?`calc(${o.xl}px - 1px)`:`0`;return l`
      display: flex;
      align-items: start;
      ${r===`narrow`&&`justify-content: center;`}

      img {
        border-radius: ${n&&t?0:r===`narrow`?`${s} ${s} 0 0`:i===`left`?`${s} 0 0 ${s}`:`0 ${s} ${s} 0`};
      }

      ${!n||!t?l`
          padding: 0;
        `:r===`narrow`?l`
          padding: ${a?.xl}px;
          padding-bottom: 0;
        `:l`
        padding: ${a?.xl}px;
        ${i===`left`?`padding-right: 0;`:`padding-left: 0;`}
      `}
    `}}
`})),Y,X,Z,Ce=t((()=>{Y=e(n()),Se(),g(),X=o(),Z=(0,Y.forwardRef)(function(e,t){let{image:n,imageSize:r,sdsType:i,className:a}=e,o={height:`100%`,maxHeight:i===`narrow`?r:`100%`,maxWidth:i===`narrow`?`100%`:r,minHeight:r,minWidth:i===`narrow`?`unset`:r,width:`100%`},s=typeof n==`string`?(0,X.jsx)(b,{component:`img`,src:n,alt:`Content Card Media`,sx:{...o}}):Y.isValidElement(n)&&n.type===b?Y.cloneElement(n,{component:`img`,sx:{...n.props.sx,...o}}):Y.isValidElement(n)?Y.cloneElement(n,{style:{...o,objectFit:`cover`,objectPosition:`center`}}):null;return(0,X.jsx)(xe,{ref:t,...e,className:a,children:s})})})),we=t((()=>{})),Q,$,Te,Ee,De,Oe=t((()=>{Q=e(n()),P(),he(),ye(),D(),Ce(),we(),V(),$=o(),Te=e=>{let[t,n]=(0,Q.useState)(!1);return{dynamicSdsType:t?`narrow`:e,handleResize:e=>{e<595&&!t?n(!0):e>605&&t&&n(!1)},isNarrow:t}},Ee=(e,t,n,r)=>Q.Children.map(e,e=>Q.isValidElement(e)&&e.type===J?Q.cloneElement(e,{...e.props,buttonsPosition:n,classes:r,clickableCard:t}):e),De=Q.forwardRef((e,t)=>{let{visualElementType:n=`none`,image:r,icon:i,imagePadding:a=!1,imageSize:o=300,overlineText:s,titleText:c,subtitleText:l,metadataText:u,boundingBox:d=!0,children:f,sdsType:p=`wide`,clickableCard:m=!1,imagePosition:h=`left`,buttonsPosition:g=`left`,clickableCardProps:_,classes:v=k}=e,{cardMedia:y,cardContent:ee,cardHeader:b,cardMetadata:x,cardOverline:S,cardSubtitle:te,cardTitle:C,cardActions:w,cardPaper:T,clickableCardButton:E}=v,D=m?!0:d,A=(0,Q.useRef)(null),{handleResize:j,dynamicSdsType:M}=Te(p);(0,Q.useEffect)(()=>{let e=A.current;if(!e)return;let t=new ResizeObserver(e=>{for(let t of e)j(t.contentRect.width)});return t.observe(e),()=>{t.disconnect()}},[j]);let N=(0,$.jsxs)($.Fragment,{children:[n===`image`&&r?(0,$.jsx)(Z,{imagePadding:a,boundingBox:D,sdsType:M,imageSize:o,image:r,imagePosition:h,className:O(y)}):n===`icon`&&i?(0,$.jsx)(oe,{boundingBox:D,className:O(y),children:i}):null,(0,$.jsxs)(se,{boundingBox:D,clickableCard:m,className:O(ee),sdsType:M,visualElementType:n,children:[(0,$.jsx)(me,{overlineText:s,titleText:c,subtitleText:l,metadataText:u,classes:{cardHeader:b,cardMetadata:x,cardOverline:S,cardSubtitle:te,cardTitle:C}}),(0,$.jsx)(le,{children:Ee(f,m,g,{cardActions:w})})]})]});return(0,$.jsx)(ie,{ref:ne([t,A]),...e,sdsType:M,boundingBox:D,className:O(T),children:m?(0,$.jsx)(ae,{..._,cardSdsType:M,visualElementType:n,imagePosition:h,className:O(E),children:N}):N})})}));export{ce as a,ye as i,Oe as n,P as o,J as r,De as t};