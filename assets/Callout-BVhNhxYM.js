import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Ar as i,Gi as a,Gt as o,Ht as s,Rt as c,Ut as l,Vi as u,Yi as d,_n as f,b as p,g as m,io as h,ro as g,t as _,zi as v}from"./iframe-BPFLG940.js";import{n as y,t as b}from"./Icon-DpYImm5o.js";import{n as x,t as S}from"./Button-CvZmp_f8.js";var C,w,T=e((()=>{h(),f(),_(),C=[`calloutTitle`,`collapsed`,`severity`,`sdsStyle`,`hideBody`],w=g(a,{shouldForwardProp:e=>!C.includes(e),target:`ez44obe0`})(p,` `,e=>{let{intent:t=`info`,sdsStyle:n,hideBody:r,collapsed:i}=e,a=o(e),f=c(e),p=s(e),m=l(e),h=m?.[t]?.ornament??`black`,g=m?.[t]?.surfaceSecondary??`white`;return`
      margin: ${a?.m}px 0;
      border-radius: ${f?.xl}px;
      color: ${p?.text?.primary};
      padding: ${a?.m}px;
      background-color: ${g};
      align-items: ${r&&n===`expandable`&&i||r&&n!==`expandable`?`center`:`flex-start`};

      .${d.icon} {
        margin-top: ${r&&n===`expandable`&&i||r&&n!==`expandable`?0:a?.xxxs}px;
        margin-right: ${a?.s}px;
        padding: 0;

        path {
          fill: ${h};
        }
      }

      .${d.message} {
        width: 100%;
        padding: 0;
        margin: 0;

        .${u.root} {
          margin: 0;
        }
      }

      .${d.action} {
        display: ${n===`persistent`?`none`:`block`};
        margin: 0 0 0 ${a?.s}px;
        padding: 0;
        align-items: flex-start;

        > button {
          padding: 0;
        }
      }
    `},`;`)})),E,D=e((()=>{E=`CalloutTitle`})),O,k=e((()=>{h(),f(),_(),O=g(v,{target:`e183mai80`})(m,` margin:0;`)})),A,j,M=e((()=>{D(),k(),A=t(r()),j=({children:e})=>(0,A.jsx)(O,{children:e}),j.displayName=E})),N,P=e((()=>{h(),_(),N=g(`div`,{target:`e1uu77bg0`})(p,` `,e=>{let{hideTitle:t=!1}=e,n=o(e);return`
      margin: ${t?0:n?.xs}px 0 0 0;
    `},`;`)})),F,I,L=e((()=>{P(),F=t(r()),I=({children:e,hideTitle:t})=>(0,F.jsx)(N,{hideTitle:t,children:e})})),R,z=e((()=>{h(),_(),R=g(`div`,{target:`ep2313k0`})(e=>{let{hideTitle:t=!1,hideBody:n=!1}=e,r=o(e);return`
      margin: ${t&&n?0:r?.m}px 0 0 0;
    `},`;`)})),B,V,H=e((()=>{z(),B=t(r()),V=({children:e,hideTitle:t,hideBody:n})=>(0,B.jsx)(R,{hideTitle:t,hideBody:n,children:e})})),U,W,G,K,q,J=e((()=>{f(),U=t(n()),y(),T(),M(),L(),H(),x(),W=t(r()),G=`open`,K=`closed`,q=e=>{let{autoDismiss:t,dismissed:n,icon:r,sdsIconProps:a,intent:o,sdsStage:s=G,title:c,body:l,hideTitle:u=!1,hideBody:d=!1,sdsStyle:f=`persistent`,children:p,extraContent:m,...h}=e,[g,_]=(0,U.useState)(n),[v,y]=(0,U.useState)(s);(0,U.useEffect)(()=>{_(n),t&&setTimeout(()=>{_(!0)},typeof t==`boolean`?8e3:t)},[n,t]);let x=t=>{_(!0),e?.onClose&&e?.onClose(t)},C=()=>{if(r!==void 0)return typeof r==`string`?(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:r,...a}):r;switch(o){case`positive`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}},T=e=>f===`expandable`?(0,W.jsx)(S,{"aria-label":e?`open`:`close`,onClick:()=>{y(e?G:K)},size:`large`,sdsType:`secondary`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:e?`ChevronDown`:`ChevronUp`,sdsSize:`s`})}):f===`dismissible`?(0,W.jsx)(S,{"aria-label":`Dismiss`,onClick:x,sdsType:`secondary`,sdsStyle:`minimal`,size:`large`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:`XMark`,sdsSize:`s`})}):null,E=f===`expandable`&&v===K||!1;return(0,W.jsx)(i,{in:!g,children:(0,W.jsxs)(w,{onClose:x,action:T(E),icon:C(),intent:o,collapsed:E||!1,sdsStyle:f,hideBody:d,...h,children:[!u&&(0,W.jsx)(j,{children:c}),!d&&(0,W.jsx)(I,{hideTitle:u,children:l}),f===`expandable`&&!E&&(0,W.jsxs)(V,{hideTitle:u,hideBody:d,children:[p,m]})]})})}}));export{M as i,J as n,j as r,q as t};