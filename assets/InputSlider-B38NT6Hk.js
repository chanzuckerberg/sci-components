import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r,Gt as i,Jt as a,Mi as o,Ni as s,W as c,X as l,Y as u,_ as d,ct as f,t as p,v as m,z as h}from"./iframe-Bjh1LYUt.js";var g,_,v,y,b=t((()=>{s(),f(),p(),g=e=>{let t=c(e),n=l(e),r=u(e);return`
    position: relative;

    .${a.rail},
    .${a.track} {
      border-radius: 2px;
    }

    .${a.rail} {
      background-color: ${r?.base?.divider};
      opacity:1;
    }
    
    .${a.track} {
      background-color: ${r?.accent?.fillPrimary};
    }

    .${a.thumb} {
      ${h(e)}
      height: 14px;
      width: 14px;
      background-color: ${r?.accent?.fillPrimary};

      &.${a.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${n?.none};
      }
    }

    .${a.thumb}::before {
      display: none;
    }

    .${a.thumb}::after {
      background-color: ${r?.base?.backgroundPrimary} !important;
      height: 6px !important;
      width: 6px !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .${a.valueLabel} {
      padding: 2px 4px;
      color: ${r?.base?.textPrimary};
      background-color: ${r?.accent?.surfaceSecondary};
      border-radius: ${t?.m}px;
      left: unset; 
      top: -3px;

      &::before {
        display: none;
      }

      & * {
        background: transparent;
        color: ${r?.base?.textPrimary};
        transform: none;
        width: unset;
        height: unset;
      }
    }

    .${a.mark} {
      /*
       * (masoudmanson): Although the mark is not an icon, but since we don't have
       * a specific color for the mark, we use the ornamentDisabled color for it.
       */
      background-color: ${r?.base?.ornamentDisabled};
      opacity: 1;
    }

    .${a.mark}.${a.markActive} {
      background-color: ${r?.base?.backgroundPrimary};
    }

    .${a.markLabel} {
      ${m(e)?.styles}
      color: ${r?.base?.textSecondary};
    }

    .${a.markLabelActive} {
      color: ${r?.base?.textPrimary};
    }
  `},_=e=>{let{marks:t}=e,n=Array.isArray(t)?t.length-1:null;return`
    .${a.rail},
    .${a.track} {
      border: none;
      height: 4px;
    }

    /* Adjust the position of the first mark by moving it 2px to the right to fit it inside the track */
    span[data-index="0"].${a.mark} {
      left: 2px !important;
    }

    /* Adjust the position of the last mark by moving it 2px to the left to fit it inside the track */
    span[data-index="${n}"].${a.mark} {
      left: calc(100% - 2px) !important;
    }
    
    .${a.markLabel} {
      top: 26px;
    }

    .${a.disabled} .${a.track} {
      border: none;
    }
  `},v=e=>{let t=u(e);return`
    .${a.track} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${a.thumb}.${a.disabled} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${a.valueLabel} {
      color: ${t?.base?.textDisabled};
      background-color: ${t?.base?.backgroundSecondary};
      
      & * {
        color: ${t?.base?.textDisabled};
      }
    }

    .${a.markLabel} {
      color: ${t?.base?.textDisabled};
    }

    .${a.mark} {
      background-color: ${t?.base?.fillPrimary};
    }
  `},y=o(i,{target:`embkalj0`})(d,` `,e=>{let{disabled:t}=e;return`
      ${g(e)}
      ${_(e)}
      ${t?v(e):``}
    `},`;`)})),x,S,C,w=t((()=>{x=e(n()),b(),S=r(),C=(0,x.forwardRef)((e,t)=>{let{value:n,defaultValue:r,"aria-label":i,getAriaLabel:a,...o}=e,s=a?{getAriaLabel:a}:{getAriaLabel:Array.isArray(n)||Array.isArray(r)?e=>e===0?`Minimum value`:`Maximum value`:()=>i||`Slider value`};return(0,S.jsx)(y,{ref:t,value:n,defaultValue:r,...o,...s,orientation:`horizontal`})}),C.displayName=`InputSlider`}));export{w as n,C as t};