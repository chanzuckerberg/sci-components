import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{En as n,Jt as r,Kr as i,W as a,X as o,Xn as s,Y as c,Z as l,Zn as u,cr as d,mn as f,n as p,st as m,t as h}from"./iframe-DI6qETgL.js";import{n as g,t as _}from"./Icon-BvRFwTEr.js";import{n as v,t as y}from"./Button-K7qsdWHe.js";var b,x,S,C,w,T=t((()=>{u(),m(),h(),v(),b=p(`xs`),x=[`slideDirection`],S=s(n,{shouldForwardProp:e=>!x.includes(e),target:`e1ktql9t2`})(b,` `,e=>{let{intent:t=`info`}=e,n=l(e),r=o(e),i=a(e),s=c(e),u=s?.[t]?.ornament??`black`;return`
      position: relative;
      overflow: hidden;
      background-color: ${s?.[t]?.surfaceSecondary??`white`};
      max-width: 480px;
      min-width: 280px;
      box-sizing: border-box;
      margin: ${n?.m}px 0;
      border-radius: ${i?.xl}px;
      color: ${s?.base?.textPrimary};
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
        background-color: ${s?.[t]?.ornament};
      }

      .MuiAlert-icon {
        margin-top: ${n?.xxxs}px;
        margin-right: ${n?.s}px;
        padding: 0;
        path {
          fill: ${u};
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
    `},`;`),C=s(`div`,{target:`e1ktql9t1`})(e=>{let{buttonPosition:t=`right`}=e;return`
      display: flex;
      justify-content: ${t===`left`?`flex-start`:`flex-end`};
    `},`;`),w=s(y,{target:`e1ktql9t0`})(e=>{let t=l(e);return`
      position: absolute;
      right: ${t?.m}px;
      top: ${t?.m}px;
    `},`;`)})),E,D,O,k=t((()=>{m(),E=e(i()),v(),g(),T(),D=d(),O=({autoDismiss:e,children:t,dismissed:n,slideDirection:i=`left`,intent:a,onClose:o,buttonOnClick:s,buttonText:c,buttonPosition:l,icon:u,sdsIconProps:d,...p})=>{let[m,h]=(0,E.useState)(n),g={...p};delete g.extraContent,(0,E.useEffect)(()=>{h(n),e&&setTimeout(()=>{h(!0)},typeof e==`boolean`?8e3:e)},[n,e]);let v=e=>{h(!0),o&&o(e)};return(0,D.jsx)(D.Fragment,{children:(0,D.jsx)(r,{in:!m,direction:i,mountOnEnter:!0,unmountOnExit:!0,timeout:250,children:(0,D.jsx)(f,{children:(0,D.jsxs)(S,{onClose:o?v:void 0,action:o?(0,D.jsx)(w,{onClick:v,sdsStyle:`minimal`,sdsType:`secondary`,"data-testid":`notificationCloseButton`,backgroundOnHover:!1,children:(0,D.jsx)(_,{sdsIcon:`XMark`,sdsSize:`s`})}):null,icon:(()=>{if(u!==void 0)return typeof u==`string`?(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:u,...d}):u;switch(a){case`positive`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}})(),className:`elevated`,intent:a,slideDirection:i,...g,children:[t,s!==void 0&&(0,D.jsx)(C,{buttonPosition:l,children:(0,D.jsx)(y,{sdsStyle:`minimal`,sdsType:`secondary`,size:`medium`,onClick:s,children:c})})]})})})})}}));export{k as n,O as t};