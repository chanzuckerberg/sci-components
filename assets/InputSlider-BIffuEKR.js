import{c as e,i as t}from"./preload-helper-DbRxMUml.js";import{Dt as n,Et as r,Kr as i,W as a,X as o,Xn as s,Y as c,Zn as l,_ as u,cr as d,st as f,t as p,v as m,z as h}from"./iframe-DI6qETgL.js";var g,_,v,y,b=t((()=>{l(),f(),p(),g=e=>{let t=a(e),r=o(e),i=c(e);return`
    position: relative;

    .${n.rail},
    .${n.track} {
      border-radius: 2px;
    }

    .${n.rail} {
      background-color: ${i?.base?.divider};
      opacity:1;
    }
    
    .${n.track} {
      background-color: ${i?.accent?.fillPrimary};
    }

    .${n.thumb} {
      ${h(e)}
      height: 14px;
      width: 14px;
      background-color: ${i?.accent?.fillPrimary};

      &.${n.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${r?.none};
      }
    }

    .${n.thumb}::before {
      display: none;
    }

    .${n.thumb}::after {
      background-color: ${i?.base?.backgroundPrimary} !important;
      height: 6px !important;
      width: 6px !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .${n.valueLabel} {
      padding: 2px 4px;
      color: ${i?.base?.textPrimary};
      background-color: ${i?.accent?.surfaceSecondary};
      border-radius: ${t?.m}px;
      left: unset; 
      top: -3px;

      &::before {
        display: none;
      }

      & * {
        background: transparent;
        color: ${i?.base?.textPrimary};
        transform: none;
        width: unset;
        height: unset;
      }
    }

    .${n.mark} {
      /*
       * (masoudmanson): Although the mark is not an icon, but since we don't have
       * a specific color for the mark, we use the ornamentDisabled color for it.
       */
      background-color: ${i?.base?.ornamentDisabled};
      opacity: 1;
    }

    .${n.mark}.${n.markActive} {
      background-color: ${i?.base?.backgroundPrimary};
    }

    .${n.markLabel} {
      ${m(e)?.styles}
      color: ${i?.base?.textSecondary};
    }

    .${n.markLabelActive} {
      color: ${i?.base?.textPrimary};
    }
  `},_=e=>{let{marks:t}=e,r=Array.isArray(t)?t.length-1:null;return`
    .${n.rail},
    .${n.track} {
      border: none;
      height: 4px;
    }

    /* Adjust the position of the first mark by moving it 2px to the right to fit it inside the track */
    span[data-index="0"].${n.mark} {
      left: 2px !important;
    }

    /* Adjust the position of the last mark by moving it 2px to the left to fit it inside the track */
    span[data-index="${r}"].${n.mark} {
      left: calc(100% - 2px) !important;
    }
    
    .${n.markLabel} {
      top: 26px;
    }

    .${n.disabled} .${n.track} {
      border: none;
    }
  `},v=e=>{let t=c(e);return`
    .${n.track} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${n.thumb}.${n.disabled} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${n.valueLabel} {
      color: ${t?.base?.textDisabled};
      background-color: ${t?.base?.backgroundSecondary};
      
      & * {
        color: ${t?.base?.textDisabled};
      }
    }

    .${n.markLabel} {
      color: ${t?.base?.textDisabled};
    }

    .${n.mark} {
      background-color: ${t?.base?.fillPrimary};
    }
  `},y=s(r,{target:`embkalj0`})(u,` `,e=>{let{disabled:t}=e;return`
      ${g(e)}
      ${_(e)}
      ${t?v(e):``}
    `},`;`)})),x,S,C,w=t((()=>{x=e(i()),b(),S=d(),C=(0,x.forwardRef)((e,t)=>{let{value:n,defaultValue:r,"aria-label":i,getAriaLabel:a,...o}=e,s=a?{getAriaLabel:a}:{getAriaLabel:Array.isArray(n)||Array.isArray(r)?e=>e===0?`Minimum value`:`Maximum value`:()=>i||`Slider value`};return(0,S.jsx)(y,{ref:t,value:n,defaultValue:r,...o,...s,orientation:`horizontal`})}),C.displayName=`InputSlider`}));export{w as n,C as t};