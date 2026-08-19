import{i as e}from"./preload-helper-xPQekRTU.js";import{Ao as t,E as n,at as r,cn as i,ko as a,un as o}from"./iframe-CLRePdsX.js";var s,c=e((()=>{t(),n(),s=a(`p`,{target:`ephvqk70`})(r,` `,e=>{let{type:t=`none`,color:n}=e,r=i(e),a=o(e),s=t===`none`?`black`:t===`css`?r?.yellow?.[500]:r?.red?.[400];return`
      cursor: pointer;
      position: relative;
      padding-left: ${t===`none`?0:t===`css`?32:40}px;

      &:active {
        font-weight: ${a?.semibold};

        &::before {
          font-weight: normal;
          background-color: ${t===`none`?`transparent`:r?.gray?.[200]};
          color: black;
        }
      }

      &::before {
        content: ${JSON.stringify(t===`none`?``:t)};
        color: ${n||s};
        position: absolute;
        padding: 0 5px;
        border-radius: 4px;
        left: 0;
        top: 0;
        font-size: 10px;
      }
    `},`;`)}));export{c as n,s as t};