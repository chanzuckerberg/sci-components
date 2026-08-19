import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,E as i,Eo as a,Hn as o,N as s,an as c,er as l,gn as u,gr as d,in as f,ko as p,ln as m,mn as h,rr as g}from"./iframe-s0DqqZ6S.js";import{a as _,c as v}from"./utils-BxIa431Z.js";var y,b,x,S=e((()=>{y=t(n()),b=(e,t=50)=>{let n=!1,r=null,i=()=>{r&&clearTimeout(r),r=setTimeout(e,t)};return document.addEventListener(`scroll`,i,!0),()=>{n||(n=!0,r&&clearTimeout(r),document.removeEventListener(`scroll`,i))}},x=(e,t=50)=>{let n=(0,y.useRef)();n.current=e,(0,y.useEffect)(()=>{let e=b(()=>{n.current&&n.current()},t);return()=>e()},[t])}})),C,w,T,E=e((()=>{r(),o(),i(),c(),C=[`items`,`sdsIndicatorColor`,`width`,`isSubItem`],w=p(l,{shouldForwardProp:e=>!C.includes(e),target:`e1svjln41`})(e=>{let{width:t=`100%`}=e,n=u(e),r=h(e);return`
      &:before {
        background-color: ${r?.base?.divider};
        border-radius: 0;
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 1px;
      }

      width: ${t};
      top: ${n?.xl}px;
      margin-bottom: ${n?.l}px;
      margin-right: ${n?.m}px;
      position: sticky;
      overflow: visible;

      .${g.indicator} {
        background-color: ${r?.accent?.foregroundActive} !important;
        border-radius: 0;
        left: 0;
        width: 2px;
      }

      .${g.scroller} {
        overflow: visible !important;
      }
    `},`;`),T=p(d,{shouldForwardProp:e=>!C.includes(e),target:`e1svjln40`})(s,` `,e=>{let t=u(e),n=h(e),r=m(e),{isSubItem:i=!1}=e,a=i?t?.xl:t?.m;return`
      ${f(e)}
      box-sizing: border-box;
      padding: ${t?.xs}px ${t?.m}px ${t?.xs}px ${a}px !important;
      align-items: start;
      min-height: unset;
      max-height: unset;
      text-transform: none;
      border-top-right-radius: ${r?.l}px;
      border-bottom-right-radius: ${r?.l}px;
      &:last-child {
        margin-bottom: 0;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: ${t?.xxxs}px;
        height: 100%;
        background-color: ${n?.base?.borderPrimaryInteraction};
        display: none;
        border-radius: ${t?.xxxs}px;
      }
      &:hover {
        color: ${n?.base?.textPrimary};
        background-color: ${n?.base?.fillPrimaryInteraction};
        &:before {
          display: block;
        }
      }
      &.Mui-selected {
        color: ${n?.base?.textPrimary};
        font-weight: 600;
      }
      &.MuiButtonBase-root {
        text-align: left;
        padding: 0;
        overflow: visible;
      }
    `},`;`)}));function D(e,t=0){let[n,r]=(0,O.useState)({});return(0,O.useEffect)(()=>{let n=new IntersectionObserver(e=>{e.forEach((e,t)=>{let n=e.target.getAttribute(`id`)||t;r(t=>({...t,[n]:{intersectionEntry:e,isInView:e.isIntersecting}}))})},{rootMargin:`-${t}px 0px 0px 0px`});return e.forEach(e=>{e.elementRef.current&&n.observe(e.elementRef.current)}),()=>{n.disconnect()}},[e,t]),typeof window>`u`||!window.IntersectionObserver?e.map(e=>({el:e.elementRef,isInView:!1})):n}var O,k=e((()=>{O=t(n())})),A,j,M,N,P=e((()=>{A=t(n()),S(),_(),E(),k(),j=t(a()),M=(e,t)=>{let n=document.getElementById(e);n&&window.scrollTo({behavior:`smooth`,top:n.getBoundingClientRect().top-document.body.getBoundingClientRect().top-t})},N=(0,A.forwardRef)((e,t)=>{let{items:n,offsetTop:r=0,onChange:i,width:a,...o}=e,[s,c]=(0,A.useState)(!1),[l,u]=(0,A.useState)(0),[d,f]=(0,A.useState)(-1),p=(0,A.useMemo)(()=>n.reduce((e,t)=>(e.push({elementRef:t.elementRef,title:t.title}),t.subItems&&e.push(...t.subItems),e),[]),[n]),m=D(p,r),h=A.useMemo(()=>{let e=[];return n.forEach(t=>{let n=p.findIndex(e=>e.title===t.title&&e.elementRef===t.elementRef);e.push(n),t.subItems&&t.subItems.forEach(t=>{let n=p.findIndex(e=>e.title===t.title&&e.elementRef===t.elementRef);e.push(n)})}),e},[n,p]),g=(0,A.useMemo)(()=>{let e=new Map;return p.map(({title:t})=>{let n=v(t),r=(e.get(n)??0)+1;return e.set(n,r),r===1?n:`${n}-${r}`})},[p]),_=(0,A.useMemo)(()=>{let e=0;return n.map(t=>{let n=e;return e+=1+(t.subItems?.length??0),n})},[n]),y=(e,t)=>({"aria-controls":t,id:`navigation-tab-${e}`}),b=(e,t,n)=>{let r=[(0,j.jsx)(T,{label:e.title,tabIndex:0,width:a,...y(g[n],e.elementRef.current?.getAttribute(`id`)||`navigation-panel-${t+1}`)},g[n])];return e.subItems&&e.subItems.forEach((e,i)=>{let o=g[n+i+1];r.push((0,j.jsx)(T,{label:e.title,tabIndex:0,width:a,isSubItem:!0,...y(o,e.elementRef.current?.getAttribute(`id`)||`navigation-panel-${t+1}-${i+1}`)},o))}),r},S=(0,A.useCallback)((e,t,n)=>{e!==d&&(i?.(e,t,n),f(e))},[d,i]);return(0,A.useEffect)(()=>{let e=Object.values(m).findIndex(e=>e.isInView),t=h.findIndex(t=>t===e);t>-1&&!s&&(u(t),S(t,{target:p[e],type:`scroll`},`scroll`))},[S,p,m,h]),x(()=>{c(!1)}),(0,j.jsx)(w,{ref:t,orientation:`vertical`,variant:`fullWidth`,value:l,onChange:(e,t)=>{c(!0);let n=p[h[t]];r?M(`${n?.elementRef?.current?.getAttribute(`id`)}`,r):n?.elementRef?.current?.scrollIntoView({behavior:`smooth`,block:`start`}),u(t),S(t,e,`click`)},"aria-label":`navigation-jump-to`,width:a,...o,children:n.map((e,t)=>b(e,t,_[t]))})})}));export{P as n,N as t};