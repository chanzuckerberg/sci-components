import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{Ar as r,t as i}from"./material-CSBxm0C2.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";function o(){let[e,t]=(0,s.useState)(0),n=()=>{t(window.innerWidth)};return(0,s.useLayoutEffect)(()=>(n(),window.addEventListener(`resize`,()=>n()),()=>{window.removeEventListener(`resize`,()=>n())}),[]),(0,c.jsxs)(l,{children:[`Current width is: `,e]})}var s,c,l;t((()=>{s=e(n()),i(),c=e(a()),l=r(`div`)`
  ${e=>`
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: yellow;
      
      ${e?.theme?.breakpoints.down(`lg`)} {
        background-color: skyblue;
      }
      
      ${e?.theme?.breakpoints.down(`md`)} {
        background-color: pink;
      }
      
      ${e?.theme?.breakpoints.down(`sm`)} {
        background-color: green;
      }
    `}
`}))();export{o as default};