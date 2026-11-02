import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Gi as i,Gt as a,Hr as o,Rt as s,Ti as c,Ut as l,Wt as u,_n as d,io as f,n as p,ro as m,t as h}from"./iframe-BPFLG940.js";import{n as g,t as _}from"./Icon-DpYImm5o.js";import{n as v,t as y}from"./Button-CvZmp_f8.js";var b,x,S,C,w,T=e((()=>{f(),d(),h(),v(),b=p(`xs`),x=[`slideDirection`],S=m(i,{shouldForwardProp:e=>!x.includes(e),target:`e1ktql9t2`})(b,` `,e=>{let{intent:t=`info`}=e,n=a(e),r=u(e),i=s(e),o=l(e),c=o?.[t]?.ornament??`black`;return`
      position: relative;
      overflow: hidden;
      background-color: ${o?.[t]?.surfaceSecondary??`white`};
      max-width: 480px;
      min-width: 280px;
      box-sizing: border-box;
      margin: ${n?.m}px 0;
      border-radius: ${i?.xl}px;
      color: ${o?.base?.textPrimary};
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
        background-color: ${o?.[t]?.ornament};
      }

      .MuiAlert-icon {
        margin-top: ${n?.xxxs}px;
        margin-right: ${n?.s}px;
        padding: 0;
        path {
          fill: ${c};
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
    `},`;`),C=m(`div`,{target:`e1ktql9t1`})(e=>{let{buttonPosition:t=`right`}=e;return`
      display: flex;
      justify-content: ${t===`left`?`flex-start`:`flex-end`};
    `},`;`),w=m(y,{target:`e1ktql9t0`})(e=>{let t=a(e);return`
      position: absolute;
      right: ${t?.m}px;
      top: ${t?.m}px;
    `},`;`)})),E,D,O,k=e((()=>{d(),E=t(n()),v(),g(),T(),D=t(r()),O=({autoDismiss:e,children:t,dismissed:n,slideDirection:r=`left`,intent:i,onClose:a,buttonOnClick:s,buttonText:l,buttonPosition:u,icon:d,sdsIconProps:f,...p})=>{let[m,h]=(0,E.useState)(n),g={...p};delete g.extraContent,(0,E.useEffect)(()=>{h(n),e&&setTimeout(()=>{h(!0)},typeof e==`boolean`?8e3:e)},[n,e]);let v=e=>{h(!0),a&&a(e)};return(0,D.jsx)(D.Fragment,{children:(0,D.jsx)(o,{in:!m,direction:r,mountOnEnter:!0,unmountOnExit:!0,timeout:250,children:(0,D.jsx)(c,{children:(0,D.jsxs)(S,{onClose:a?v:void 0,action:a?(0,D.jsx)(w,{onClick:v,sdsStyle:`minimal`,sdsType:`secondary`,"data-testid":`notificationCloseButton`,backgroundOnHover:!1,children:(0,D.jsx)(_,{sdsIcon:`XMark`,sdsSize:`s`})}):null,icon:(()=>{if(d!==void 0)return typeof d==`string`?(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:d,...f}):d;switch(i){case`positive`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`CheckCircle`});case`info`:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`InfoCircle`});default:return(0,D.jsx)(_,{sdsSize:`s`,sdsIcon:`ExclamationMarkCircle`})}})(),className:`elevated`,intent:i,slideDirection:r,...g,children:[t,s!==void 0&&(0,D.jsx)(C,{buttonPosition:u,children:(0,D.jsx)(y,{sdsStyle:`minimal`,sdsType:`secondary`,size:`medium`,onClick:s,children:l})})]})})})})}}));export{k as n,O as t};