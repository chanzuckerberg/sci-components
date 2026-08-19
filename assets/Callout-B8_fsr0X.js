import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,E as i,Eo as a,G as o,Hn as s,V as c,_a as l,da as u,gn as d,ko as f,ln as p,mn as m,pa as h,pn as g,ti as _,xa as v}from"./iframe-CLRePdsX.js";import{n as y,t as b}from"./Icon-Dm0VxswF.js";import{n as x,t as S}from"./Button-DCR2_tBD.js";var C,w,T=e((()=>{r(),s(),i(),C=[`calloutTitle`,`collapsed`,`severity`,`sdsStyle`,`hideBody`],w=f(l,{shouldForwardProp:e=>!C.includes(e),target:`ez44obe0`})(o,` `,e=>{let{intent:t=`info`,sdsStyle:n,hideBody:r,collapsed:i}=e,a=d(e),o=p(e),s=g(e),c=m(e),l=c?.[t]?.ornament??`black`,u=c?.[t]?.surfaceSecondary??`white`;return`
      margin: ${a?.m}px 0;
      border-radius: ${o?.xl}px;
      color: ${s?.text?.primary};
      padding: ${a?.m}px;
      background-color: ${u};
      align-items: ${r&&n===`expandable`&&i||r&&n!==`expandable`?`center`:`flex-start`};

      .${v.icon} {
        margin-top: ${r&&n===`expandable`&&i||r&&n!==`expandable`?0:a?.xxxs}px;
        margin-right: ${a?.s}px;
        padding: 0;

        path {
          fill: ${l};
        }
      }

      .${v.message} {
        width: 100%;
        padding: 0;
        margin: 0;

        .${h.root} {
          margin: 0;
        }
      }

      .${v.action} {
        display: ${n===`persistent`?`none`:`block`};
        margin: 0 0 0 ${a?.s}px;
        padding: 0;
        align-items: flex-start;

        > button {
          padding: 0;
        }
      }
    `},`;`)})),E,D=e((()=>{E=`CalloutTitle`})),O,k=e((()=>{r(),s(),i(),O=f(u,{target:`e183mai80`})(c,` margin:0;`)})),A,j,M=e((()=>{D(),k(),A=t(a()),j=({children:e})=>(0,A.jsx)(O,{children:e}),j.displayName=E})),N,P=e((()=>{r(),i(),N=f(`div`,{target:`e1uu77bg0`})(o,` `,e=>{let{hideTitle:t=!1}=e,n=d(e);return`
      margin: ${t?0:n?.xs}px 0 0 0;
    `},`;`)})),F,I,L=e((()=>{P(),F=t(a()),I=({children:e,hideTitle:t})=>(0,F.jsx)(N,{hideTitle:t,children:e})})),R,z=e((()=>{r(),i(),R=f(`div`,{target:`ep2313k0`})(e=>{let{hideTitle:t=!1,hideBody:n=!1}=e,r=d(e);return`
      margin: ${t&&n?0:r?.m}px 0 0 0;
    `},`;`)})),B,V,H=e((()=>{z(),B=t(a()),V=({children:e,hideTitle:t,hideBody:n})=>(0,B.jsx)(R,{hideTitle:t,hideBody:n,children:e})})),U,W,G,K,q,J=e((()=>{s(),U=t(n()),y(),T(),M(),L(),H(),x(),W=t(a()),G=`open`,K=`closed`,q=e=>{let{autoDismiss:t,dismissed:n,icon:r,sdsIconProps:i,intent:a,sdsStage:o=G,title:s,body:c,hideTitle:l=!1,hideBody:u=!1,sdsStyle:d=`persistent`,children:f,extraContent:p,...m}=e,[h,g]=(0,U.useState)(n),[v,y]=(0,U.useState)(o);(0,U.useEffect)(()=>{g(n),t&&setTimeout(()=>{g(!0)},typeof t==`boolean`?8e3:t)},[n,t]);let x=t=>{g(!0),e?.onClose&&e?.onClose(t)},C=()=>{if(r!==void 0)return typeof r==`string`?(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:r,...i}):r;switch(a){case`positive`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}},T=e=>d===`expandable`?(0,W.jsx)(S,{"aria-label":e?`open`:`close`,onClick:()=>{y(e?G:K)},size:`large`,sdsType:`secondary`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:e?`ChevronDown`:`ChevronUp`,sdsSize:`s`})}):d===`dismissible`?(0,W.jsx)(S,{"aria-label":`Dismiss`,onClick:x,sdsType:`secondary`,sdsStyle:`minimal`,size:`large`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:`XMark`,sdsSize:`s`})}):null,E=d===`expandable`&&v===K||!1;return(0,W.jsx)(_,{in:!h,children:(0,W.jsxs)(w,{onClose:x,action:T(E),icon:C(),intent:a,collapsed:E||!1,sdsStyle:d,hideBody:u,...m,children:[!l&&(0,W.jsx)(j,{children:s}),!u&&(0,W.jsx)(I,{hideTitle:l,children:c}),d===`expandable`&&!E&&(0,W.jsxs)(V,{hideTitle:l,hideBody:u,children:[f,p]})]})})}}));export{M as i,J as n,j as r,q as t};