import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Cn as r,Hr as i,Nn as a,Tn as o,Vr as s,kn as c,mt as l,t as u}from"./material-DlyzFPof.js";import{t as d}from"./jsx-runtime-cM__dR4X.js";import{Gt as f,Ht as p,Rt as m,Ut as h,b as g,g as _,t as v}from"./iframe-TnbieWZB.js";import{n as y,t as b}from"./Icon-P6YZrEvk.js";import{n as x,t as S}from"./Button-2LRnNJDR.js";var C,w,T=t((()=>{i(),u(),v(),C=[`calloutTitle`,`collapsed`,`severity`,`sdsStyle`,`hideBody`],w=s(c,{shouldForwardProp:e=>!C.includes(e),target:`ez44obe0`})(g,` `,e=>{let{intent:t=`info`,sdsStyle:n,hideBody:r,collapsed:i}=e,s=f(e),c=m(e),l=p(e),u=h(e),d=u?.[t]?.ornament??`black`,g=u?.[t]?.surfaceSecondary??`white`;return`
      margin: ${s?.m}px 0;
      border-radius: ${c?.xl}px;
      color: ${l?.text?.primary};
      padding: ${s?.m}px;
      background-color: ${g};
      align-items: ${r&&n===`expandable`&&i||r&&n!==`expandable`?`center`:`flex-start`};

      .${a.icon} {
        margin-top: ${r&&n===`expandable`&&i||r&&n!==`expandable`?0:s?.xxxs}px;
        margin-right: ${s?.s}px;
        padding: 0;

        path {
          fill: ${d};
        }
      }

      .${a.message} {
        width: 100%;
        padding: 0;
        margin: 0;

        .${o.root} {
          margin: 0;
        }
      }

      .${a.action} {
        display: ${n===`persistent`?`none`:`block`};
        margin: 0 0 0 ${s?.s}px;
        padding: 0;
        align-items: flex-start;

        > button {
          padding: 0;
        }
      }
    `},`;`)})),E,D=t((()=>{E=`CalloutTitle`})),O,k=t((()=>{i(),u(),v(),O=s(r,{target:`e183mai80`})(_,` margin:0;`)})),A,j,M=t((()=>{D(),k(),A=e(d()),j=({children:e})=>(0,A.jsx)(O,{children:e}),j.displayName=E})),N,P=t((()=>{i(),v(),N=s(`div`,{target:`e1uu77bg0`})(g,` `,e=>{let{hideTitle:t=!1}=e,n=f(e);return`
      margin: ${t?0:n?.xs}px 0 0 0;
    `},`;`)})),F,I,L=t((()=>{P(),F=e(d()),I=({children:e,hideTitle:t})=>(0,F.jsx)(N,{hideTitle:t,children:e})})),R,z=t((()=>{i(),v(),R=s(`div`,{target:`ep2313k0`})(e=>{let{hideTitle:t=!1,hideBody:n=!1}=e,r=f(e);return`
      margin: ${t&&n?0:r?.m}px 0 0 0;
    `},`;`)})),B,V,H=t((()=>{z(),B=e(d()),V=({children:e,hideTitle:t,hideBody:n})=>(0,B.jsx)(R,{hideTitle:t,hideBody:n,children:e})})),U,W,G,K,q,J=t((()=>{u(),U=e(n()),y(),T(),M(),L(),H(),x(),W=e(d()),G=`open`,K=`closed`,q=e=>{let{autoDismiss:t,dismissed:n,icon:r,sdsIconProps:i,intent:a,sdsStage:o=G,title:s,body:c,hideTitle:u=!1,hideBody:d=!1,sdsStyle:f=`persistent`,children:p,extraContent:m,...h}=e,[g,_]=(0,U.useState)(n),[v,y]=(0,U.useState)(o);(0,U.useEffect)(()=>{_(n),t&&setTimeout(()=>{_(!0)},typeof t==`boolean`?8e3:t)},[n,t]);let x=t=>{_(!0),e?.onClose&&e?.onClose(t)},C=()=>{if(r!==void 0)return typeof r==`string`?(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:r,...i}):r;switch(a){case`positive`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}},T=e=>f===`expandable`?(0,W.jsx)(S,{"aria-label":e?`open`:`close`,onClick:()=>{y(e?G:K)},size:`large`,sdsType:`secondary`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:e?`ChevronDown`:`ChevronUp`,sdsSize:`s`})}):f===`dismissible`?(0,W.jsx)(S,{"aria-label":`Dismiss`,onClick:x,sdsType:`secondary`,sdsStyle:`minimal`,size:`large`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:`XMark`,sdsSize:`s`})}):null,E=f===`expandable`&&v===K||!1;return(0,W.jsx)(l,{in:!g,children:(0,W.jsxs)(w,{onClose:x,action:T(E),icon:C(),intent:a,collapsed:E||!1,sdsStyle:f,hideBody:d,...h,children:[!u&&(0,W.jsx)(j,{children:s}),!d&&(0,W.jsx)(I,{hideTitle:u,children:c}),f===`expandable`&&!E&&(0,W.jsxs)(V,{hideTitle:u,hideBody:d,children:[p,m]})]})})}}));export{M as i,J as n,j as r,q as t};