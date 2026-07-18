import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Br as r,Cn as i,Gi as a,J as o,Jr as s,Mi as c,Ni as l,Rr as u,W as d,Wr as f,Y as p,Z as m,ct as h,g,m as _,t as v}from"./iframe-ZT52KRhI.js";import{n as y,t as b}from"./Icon-CXgj2pi8.js";import{n as x,t as S}from"./Button-DpLCbr9e.js";var C,w,T=t((()=>{l(),h(),v(),C=[`calloutTitle`,`collapsed`,`severity`,`sdsStyle`,`hideBody`],w=c(f,{shouldForwardProp:e=>!C.includes(e),target:`ez44obe0`})(g,` `,e=>{let{intent:t=`info`,sdsStyle:n,hideBody:i,collapsed:a}=e,c=m(e),l=d(e),u=o(e),f=p(e),h=f?.[t]?.ornament??`black`,g=f?.[t]?.surfaceSecondary??`white`;return`
      margin: ${c?.m}px 0;
      border-radius: ${l?.xl}px;
      color: ${u?.text?.primary};
      padding: ${c?.m}px;
      background-color: ${g};
      align-items: ${i&&n===`expandable`&&a||i&&n!==`expandable`?`center`:`flex-start`};

      .${s.icon} {
        margin-top: ${i&&n===`expandable`&&a||i&&n!==`expandable`?0:c?.xxxs}px;
        margin-right: ${c?.s}px;
        padding: 0;

        path {
          fill: ${h};
        }
      }

      .${s.message} {
        width: 100%;
        padding: 0;
        margin: 0;

        .${r.root} {
          margin: 0;
        }
      }

      .${s.action} {
        display: ${n===`persistent`?`none`:`block`};
        margin: 0 0 0 ${c?.s}px;
        padding: 0;
        align-items: flex-start;

        > button {
          padding: 0;
        }
      }
    `},`;`)})),E,D=t((()=>{E=`CalloutTitle`})),O,k=t((()=>{l(),h(),v(),O=c(u,{target:`e183mai80`})(_,` margin:0;`)})),A,j,M=t((()=>{D(),k(),A=a(),j=({children:e})=>(0,A.jsx)(O,{children:e}),j.displayName=E})),N,P=t((()=>{l(),v(),N=c(`div`,{target:`e1uu77bg0`})(g,` `,e=>{let{hideTitle:t=!1}=e,n=m(e);return`
      margin: ${t?0:n?.xs}px 0 0 0;
    `},`;`)})),F,I,L=t((()=>{P(),F=a(),I=({children:e,hideTitle:t})=>(0,F.jsx)(N,{hideTitle:t,children:e})})),R,z=t((()=>{l(),v(),R=c(`div`,{target:`ep2313k0`})(e=>{let{hideTitle:t=!1,hideBody:n=!1}=e,r=m(e);return`
      margin: ${t&&n?0:r?.m}px 0 0 0;
    `},`;`)})),B,V,H=t((()=>{z(),B=a(),V=({children:e,hideTitle:t,hideBody:n})=>(0,B.jsx)(R,{hideTitle:t,hideBody:n,children:e})})),U,W,G,K,q,J=t((()=>{h(),U=e(n()),y(),T(),M(),L(),H(),x(),W=a(),G=`open`,K=`closed`,q=e=>{let{autoDismiss:t,dismissed:n,icon:r,sdsIconProps:a,intent:o,sdsStage:s=G,title:c,body:l,hideTitle:u=!1,hideBody:d=!1,sdsStyle:f=`persistent`,children:p,...m}=e,[h,g]=(0,U.useState)(n),[_,v]=(0,U.useState)(s);(0,U.useEffect)(()=>{g(n),t&&setTimeout(()=>{g(!0)},typeof t==`boolean`?8e3:t)},[n,t]);let y=t=>{g(!0),e?.onClose&&e?.onClose(t)},x=()=>{if(r!==void 0)return typeof r==`string`?(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:r,...a}):r;switch(o){case`positive`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,W.jsx)(b,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}},C=e=>f===`expandable`?(0,W.jsx)(S,{"aria-label":e?`open`:`close`,onClick:()=>{v(e?G:K)},size:`large`,sdsType:`secondary`,sdsStyle:`minimal`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:e?`ChevronDown`:`ChevronUp`,sdsSize:`s`})}):f===`dismissible`?(0,W.jsx)(S,{"aria-label":`Dismiss`,onClick:y,sdsType:`secondary`,sdsStyle:`minimal`,size:`large`,backgroundOnHover:!1,children:(0,W.jsx)(b,{sdsIcon:`XMark`,sdsSize:`s`})}):null,T=f===`expandable`&&_===K||!1;return(0,W.jsx)(i,{in:!h,children:(0,W.jsxs)(w,{onClose:y,action:C(T),icon:x(),intent:o,collapsed:T||!1,sdsStyle:f,hideBody:d,...m,children:[!u&&(0,W.jsx)(j,{children:c}),!d&&(0,W.jsx)(I,{hideTitle:u,children:l}),f===`expandable`&&!T&&(0,W.jsx)(V,{hideTitle:u,hideBody:d,children:p})]})})}}));export{J as n,M as r,q as t};