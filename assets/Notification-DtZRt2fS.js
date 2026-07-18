import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Ii as r,Li as i,Mn as a,Pr as o,Qa as s,W as c,X as l,Y as u,Z as d,ct as f,hr as p,n as m,t as h}from"./iframe-DocVhSSI.js";import{n as g,t as _}from"./Icon-CQ-y6cAL.js";import{n as v,t as y}from"./Button-CfkvkcRt.js";var b,x,S,C,w,T=e((()=>{i(),f(),h(),v(),b=m(`xs`),x=[`slideDirection`],S=r(o,{shouldForwardProp:e=>!x.includes(e),target:`e1ktql9t2`})(b,` `,e=>{let{intent:t=`info`}=e,n=d(e),r=l(e),i=c(e),a=u(e),o=a?.[t]?.ornament??`black`;return`
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
    `},`;`),C=r(`div`,{target:`e1ktql9t1`})(e=>{let{buttonPosition:t=`right`}=e;return`
      display: flex;
      justify-content: ${t===`left`?`flex-start`:`flex-end`};
    `},`;`),w=r(y,{target:`e1ktql9t0`})(e=>{let t=d(e);return`
      position: absolute;
      right: ${t?.m}px;
      top: ${t?.m}px;
    `},`;`)})),E,D,O,k=e((()=>{f(),E=t(s()),v(),g(),T(),D=n(),O=({autoDismiss:e,children:t,dismissed:n,slideDirection:r=`left`,intent:i,onClose:o,buttonOnClick:s,buttonText:c,buttonPosition:l,icon:u,sdsIconProps:d,...f})=>{let[m,h]=(0,E.useState)(n),g={...f};delete g.extraContent,(0,E.useEffect)(()=>{h(n),e&&setTimeout(()=>{h(!0)},typeof e==`boolean`?8e3:e)},[n,e]);let v=e=>{h(!0),o&&o(e)};return(0,D.jsx)(D.Fragment,{children:(0,D.jsx)(a,{in:!m,direction:r,mountOnEnter:!0,unmountOnExit:!0,timeout:250,children:(0,D.jsx)(p,{children:(0,D.jsxs)(S,{onClose:o?v:void 0,action:o?(0,D.jsx)(w,{onClick:v,sdsStyle:`minimal`,sdsType:`secondary`,"data-testid":`notificationCloseButton`,backgroundOnHover:!1,children:(0,D.jsx)(_,{sdsIcon:`XMark`,sdsSize:`s`})}):null,icon:(()=>{if(u!==void 0)return typeof u==`string`?(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:u,...d}):u;switch(i){case`positive`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}})(),className:`elevated`,intent:i,slideDirection:r,...g,children:[t,s!==void 0&&(0,D.jsx)(C,{buttonPosition:l,children:(0,D.jsx)(y,{sdsStyle:`minimal`,sdsType:`secondary`,size:`medium`,onClick:s,children:c})})]})})})})}}));export{k as n,O as t};