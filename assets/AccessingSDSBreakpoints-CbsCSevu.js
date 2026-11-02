import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Ka as i,_n as a}from"./iframe-BPFLG940.js";function o(){let[e,t]=(0,s.useState)(0),n=()=>{t(window.innerWidth)};return(0,s.useLayoutEffect)(()=>(n(),window.addEventListener(`resize`,()=>n()),()=>{window.removeEventListener(`resize`,()=>n())}),[]),(0,c.jsxs)(l,{children:[`Current width is: `,e]})}var s,c,l;e((()=>{s=t(n()),a(),c=t(r()),l=i(`div`)`
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