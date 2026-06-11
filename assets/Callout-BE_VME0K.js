import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Cn as n,En as r,Ht as i,J as a,Kr as o,On as s,W as c,Xn as l,Y as u,Z as d,Zn as f,cr as p,g as m,m as h,st as g,t as _,wn as v}from"./iframe-DI6qETgL.js";import{n as y,t as b}from"./Icon-BvRFwTEr.js";import{n as x,t as S}from"./Button-K7qsdWHe.js";var C,w,T=t((()=>{f(),g(),_(),C=[`calloutTitle`,`collapsed`,`severity`,`sdsStyle`,`hideBody`],w=l(r,{shouldForwardProp:e=>!C.includes(e),target:`ez44obe0`})(m,` `,e=>{let{intent:t=`info`,sdsStyle:n,hideBody:r,collapsed:i}=e,o=d(e),l=c(e),f=a(e),p=u(e),m=p?.[t]?.ornament??`black`,h=p?.[t]?.surfaceSecondary??`white`;return`
      margin: ${o?.m}px 0;
      border-radius: ${l?.xl}px;
      color: ${f?.text?.primary};
      padding: ${o?.m}px;
      background-color: ${h};
      align-items: ${r&&n===`expandable`&&i||r&&n!==`expandable`?`center`:`flex-start`};

      .${s.icon} {
        margin-top: ${r&&n===`expandable`&&i||r&&n!==`expandable`?0:o?.xxxs}px;
        margin-right: ${o?.s}px;
        padding: 0;

        path {
          fill: ${m};
        }
      }

      .${s.message} {
        width: 100%;
        padding: 0;
        margin: 0;

        .${v.root} {
          margin: 0;
        }
      }

      .${s.action} {
        display: ${n===`persistent`?`none`:`block`};
        margin: 0 0 0 ${o?.s}px;
        padding: 0;
        align-items: flex-start;

        > button {
          padding: 0;
        }
      }
    `},`;`)})),E,D=t((()=>{E=`CalloutTitle`})),O,k=t((()=>{f(),g(),_(),O=l(n,{target:`e183mai80`})(h,` margin:0;`)})),A,j,M=t((()=>{D(),k(),A=p(),j=({children:e})=>(0,A.jsx)(O,{children:e}),j.displayName=E})),N,P=t((()=>{f(),_(),N=l(`div`,{target:`e1uu77bg0`})(m,` `,e=>{let{hideTitle:t=!1}=e,n=d(e);return`
      margin: ${t?0:n?.xs}px 0 0 0;
    `},`;`)})),F,I,L=t((()=>{P(),F=p(),I=({children:e,hideTitle:t})=>(0,F.jsx)(N,{hideTitle:t,children:e})})),R,z=t((()=>{f(),_(),R=l(`div`,{target:`ep2313k0`})(e=>{let{hideTitle:t=!1,hideBody:n=!1}=e,r=d(e);return`
      margin: ${t&&n?0:r?.m}px 0 0 0;
    `},`;`)})),B,V,H=t((()=>{z(),B=p(),V=({children:e,hideTitle:t,hideBody:n})=>(0,B.jsx)(R,{hideTitle:t,hideBody:n,children:e})})),U,W,G,K,q,J=t((()=>{g(),U=e(o()),y(),T(),M(),L(),H(),x(),W=p(),G=`open`,K=`closed`,q=e=>{let{autoDismiss:t,dismissed:n,icon:r,sdsIconProps:a,intent:o,sdsStage:s=G,title:c,body:l,hideTitle:u=!1,hideBody:d=!1,sdsStyle:f=`persistent`,children:p,...m}=e,[h,g]=(0,U.useState)(n),[_,v]=(0,U.useState)(s);(0,U.useEffect)(()=>{g(n),t&&setTimeout(()=>{g(!0)},typeof t==`boolean`?8e3:t)},[n,t]);let y=t=>{g(!0),e?.onClose&&e?.onClose(t)},x=()=>{if(r!==void 0)return typeof r==`string`?(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:r,...a}):r;switch(o){case`positive`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}},C=e=>f===`expandable`?(0,W.jsx)(S,{"aria-label":e?`open`:`close`,onClick:()=>{v(e?G:K)},size:`large`,sdsType:`secondary`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:e?`ChevronDown`:`ChevronUp`,sdsSize:`s`})}):f===`dismissible`?(0,W.jsx)(S,{"aria-label":`Dismiss`,onClick:y,sdsType:`secondary`,sdsStyle:`minimal`,size:`large`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:`XMark`,sdsSize:`s`})}):null,T=f===`expandable`&&_===K||!1;return(0,W.jsx)(i,{in:!h,children:(0,W.jsxs)(w,{onClose:y,action:C(T),icon:x(),intent:o,collapsed:T||!1,sdsStyle:f,hideBody:d,...m,children:[!u&&(0,W.jsx)(j,{children:c}),!d&&(0,W.jsx)(I,{hideTitle:u,children:l}),f===`expandable`&&!T&&(0,W.jsx)(V,{hideTitle:u,hideBody:d,children:p})]})})}}));export{J as n,M as r,q as t};