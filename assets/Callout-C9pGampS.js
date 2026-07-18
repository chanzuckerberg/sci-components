import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Ar as n,Fi as r,Ii as i,J as a,Li as o,Or as s,Pr as c,Qa as l,Rr as u,W as d,Y as f,Z as p,bn as m,ct as h,g,m as _,t as v}from"./iframe-DocVhSSI.js";import{n as y,t as b}from"./Icon-CQ-y6cAL.js";import{n as x,t as S}from"./Button-CfkvkcRt.js";var C,w,T=e((()=>{o(),h(),v(),C=[`calloutTitle`,`collapsed`,`severity`,`sdsStyle`,`hideBody`],w=i(c,{shouldForwardProp:e=>!C.includes(e),target:`ez44obe0`})(g,` `,e=>{let{intent:t=`info`,sdsStyle:r,hideBody:i,collapsed:o}=e,s=p(e),c=d(e),l=a(e),m=f(e),h=m?.[t]?.ornament??`black`,g=m?.[t]?.surfaceSecondary??`white`;return`
      margin: ${s?.m}px 0;
      border-radius: ${c?.xl}px;
      color: ${l?.text?.primary};
      padding: ${s?.m}px;
      background-color: ${g};
      align-items: ${i&&r===`expandable`&&o||i&&r!==`expandable`?`center`:`flex-start`};

      .${u.icon} {
        margin-top: ${i&&r===`expandable`&&o||i&&r!==`expandable`?0:s?.xxxs}px;
        margin-right: ${s?.s}px;
        padding: 0;

        path {
          fill: ${h};
        }
      }

      .${u.message} {
        width: 100%;
        padding: 0;
        margin: 0;

        .${n.root} {
          margin: 0;
        }
      }

      .${u.action} {
        display: ${r===`persistent`?`none`:`block`};
        margin: 0 0 0 ${s?.s}px;
        padding: 0;
        align-items: flex-start;

        > button {
          padding: 0;
        }
      }
    `},`;`)})),E,D=e((()=>{E=`CalloutTitle`})),O,k=e((()=>{o(),h(),v(),O=i(s,{target:`e183mai80`})(_,` margin:0;`)})),A,j,M=e((()=>{D(),k(),A=r(),j=({children:e})=>(0,A.jsx)(O,{children:e}),j.displayName=E})),N,P=e((()=>{o(),v(),N=i(`div`,{target:`e1uu77bg0`})(g,` `,e=>{let{hideTitle:t=!1}=e,n=p(e);return`
      margin: ${t?0:n?.xs}px 0 0 0;
    `},`;`)})),F,I,L=e((()=>{P(),F=r(),I=({children:e,hideTitle:t})=>(0,F.jsx)(N,{hideTitle:t,children:e})})),R,z=e((()=>{o(),v(),R=i(`div`,{target:`ep2313k0`})(e=>{let{hideTitle:t=!1,hideBody:n=!1}=e,r=p(e);return`
      margin: ${t&&n?0:r?.m}px 0 0 0;
    `},`;`)})),B,V,H=e((()=>{z(),B=r(),V=({children:e,hideTitle:t,hideBody:n})=>(0,B.jsx)(R,{hideTitle:t,hideBody:n,children:e})})),U,W,G,K,q,J=e((()=>{h(),U=t(l()),y(),T(),M(),L(),H(),x(),W=r(),G=`open`,K=`closed`,q=e=>{let{autoDismiss:t,dismissed:n,icon:r,sdsIconProps:i,intent:a,sdsStage:o=G,title:s,body:c,hideTitle:l=!1,hideBody:u=!1,sdsStyle:d=`persistent`,children:f,...p}=e,[h,g]=(0,U.useState)(n),[_,v]=(0,U.useState)(o);(0,U.useEffect)(()=>{g(n),t&&setTimeout(()=>{g(!0)},typeof t==`boolean`?8e3:t)},[n,t]);let y=t=>{g(!0),e?.onClose&&e?.onClose(t)},x=()=>{if(r!==void 0)return typeof r==`string`?(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:r,...i}):r;switch(a){case`positive`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}},C=e=>d===`expandable`?(0,W.jsx)(S,{"aria-label":e?`open`:`close`,onClick:()=>{v(e?G:K)},size:`large`,sdsType:`secondary`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:e?`ChevronDown`:`ChevronUp`,sdsSize:`s`})}):d===`dismissible`?(0,W.jsx)(S,{"aria-label":`Dismiss`,onClick:y,sdsType:`secondary`,sdsStyle:`minimal`,size:`large`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:`XMark`,sdsSize:`s`})}):null,T=d===`expandable`&&_===K||!1;return(0,W.jsx)(m,{in:!h,children:(0,W.jsxs)(w,{onClose:y,action:C(T),icon:x(),intent:a,collapsed:T||!1,sdsStyle:d,hideBody:u,...p,children:[!l&&(0,W.jsx)(j,{children:s}),!u&&(0,W.jsx)(I,{hideTitle:l,children:c}),d===`expandable`&&!T&&(0,W.jsx)(V,{hideTitle:l,hideBody:u,children:f})]})})}}));export{J as n,M as r,q as t};