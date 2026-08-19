import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,D as i,E as a,Eo as o,Hn as s,Xi as c,_a as l,gn as u,hn as d,ko as f,ln as p,mn as m,pi as h}from"./iframe-CLRePdsX.js";import{n as g,t as _}from"./Icon-Dm0VxswF.js";import{n as v,t as y}from"./Button-DCR2_tBD.js";var b,x,S,C,w,T=e((()=>{r(),s(),a(),v(),b=i(`xs`),x=[`slideDirection`],S=f(l,{shouldForwardProp:e=>!x.includes(e),target:`e1ktql9t2`})(b,` `,e=>{let{intent:t=`info`}=e,n=u(e),r=d(e),i=p(e),a=m(e),o=a?.[t]?.ornament??`black`;return`
      position: relative;
      overflow: hidden;
      background-color: ${a?.[t]?.surfaceSecondary??`white`};
      max-width: 480px;
      min-width: 280px;
      box-sizing: border-box;
      margin: ${n?.m}px 0;
      border-radius: ${i?.xl}px;
      color: ${a?.base?.textPrimary};
      padding: ${n?.m}px ${n?.m}px ${n?.m}px ${n?.l}px;
      align-items: flex-start;
      box-shadow: ${r?.s};

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: ${n?.xxs}px;
        height: 100%;
        background-color: ${a?.[t]?.ornament};
      }

      .MuiAlert-icon {
        margin-top: ${n?.xxxs}px;
        margin-right: ${n?.s}px;
        padding: 0;
        path {
          fill: ${o};
        }
      }

      .MuiAlert-message {
        padding: 0;
        margin-right: ${n?.m}px;
        width: 100%;

        > * {
          margin: ${n?.m}px 0px;

          &:last-child {
            margin-bottom: 0;
          }
        }

        button {
          display: block;
        }
      }

      .MuiAlert-action {
        margin-right: 0;
        padding: 0;
        align-items: flex-start;
        margin-top: ${n?.xxs}px;

        > button {
            padding: 0;
          }
        }
      }
    `},`;`),C=f(`div`,{target:`e1ktql9t1`})(e=>{let{buttonPosition:t=`right`}=e;return`
      display: flex;
      justify-content: ${t===`left`?`flex-start`:`flex-end`};
    `},`;`),w=f(y,{target:`e1ktql9t0`})(e=>{let t=u(e);return`
      position: absolute;
      right: ${t?.m}px;
      top: ${t?.m}px;
    `},`;`)})),E,D,O,k=e((()=>{s(),E=t(n()),v(),g(),T(),D=t(o()),O=({autoDismiss:e,children:t,dismissed:n,slideDirection:r=`left`,intent:i,onClose:a,buttonOnClick:o,buttonText:s,buttonPosition:l,icon:u,sdsIconProps:d,...f})=>{let[p,m]=(0,E.useState)(n),g={...f};delete g.extraContent,(0,E.useEffect)(()=>{m(n),e&&setTimeout(()=>{m(!0)},typeof e==`boolean`?8e3:e)},[n,e]);let v=e=>{m(!0),a&&a(e)};return(0,D.jsx)(D.Fragment,{children:(0,D.jsx)(h,{in:!p,direction:r,mountOnEnter:!0,unmountOnExit:!0,timeout:250,children:(0,D.jsx)(c,{children:(0,D.jsxs)(S,{onClose:a?v:void 0,action:a?(0,D.jsx)(w,{onClick:v,sdsStyle:`minimal`,sdsType:`secondary`,"data-testid":`notificationCloseButton`,backgroundOnHover:!1,children:(0,D.jsx)(_,{sdsIcon:`XMark`,sdsSize:`s`})}):null,icon:(()=>{if(u!==void 0)return typeof u==`string`?(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:u,...d}):u;switch(i){case`positive`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}})(),className:`elevated`,intent:i,slideDirection:r,...g,children:[t,o!==void 0&&(0,D.jsx)(C,{buttonPosition:l,children:(0,D.jsx)(y,{sdsStyle:`minimal`,sdsType:`secondary`,size:`medium`,onClick:o,children:s})})]})})})})}}));export{k as n,O as t};