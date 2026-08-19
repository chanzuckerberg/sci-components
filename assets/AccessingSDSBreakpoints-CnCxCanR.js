import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r,Hn as i,vo as a}from"./iframe-CLRePdsX.js";function o(){let[e,t]=(0,s.useState)(0),n=()=>{t(window.innerWidth)};return(0,s.useLayoutEffect)(()=>(n(),window.addEventListener(`resize`,()=>n()),()=>{window.removeEventListener(`resize`,()=>n())}),[]),(0,c.jsxs)(l,{children:[`Current width is: `,e]})}var s,c,l;e((()=>{s=t(n()),i(),c=t(r()),l=a(`div`)`
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