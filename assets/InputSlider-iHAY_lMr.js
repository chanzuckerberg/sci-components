import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Nt as i,Rt as a,S as o,Ta as s,Ut as c,Wt as l,_n as u,io as d,nr as f,ro as p,t as m,x as h}from"./iframe-BPFLG940.js";var g,_,v,y,b=e((()=>{d(),u(),m(),g=e=>{let t=a(e),n=l(e),r=c(e);return`
    position: relative;

    .${s.rail},
    .${s.track} {
      border-radius: 2px;
    }

    .${s.rail} {
      background-color: ${r?.base?.divider};
      opacity:1;
    }
    
    .${s.track} {
      background-color: ${r?.accent?.fillPrimary};
    }

    .${s.thumb} {
      ${i(e)}
      height: 14px;
      width: 14px;
      background-color: ${r?.accent?.fillPrimary};

      &.${s.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${n?.none};
      }
    }

    .${s.thumb}::before {
      display: none;
    }

    .${s.thumb}::after {
      background-color: ${r?.base?.backgroundPrimary} !important;
      height: 6px !important;
      width: 6px !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .${s.valueLabel} {
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

    .${s.mark} {
      /*
       * (masoudmanson): Although the mark is not an icon, but since we don't have
       * a specific color for the mark, we use the ornamentDisabled color for it.
       */
      background-color: ${r?.base?.ornamentDisabled};
      opacity: 1;
    }

    .${s.mark}.${s.markActive} {
      background-color: ${r?.base?.backgroundPrimary};
    }

    .${s.markLabel} {
      ${o(e)?.styles}
      color: ${r?.base?.textSecondary};
    }

    .${s.markLabelActive} {
      color: ${r?.base?.textPrimary};
    }
  `},_=e=>{let{marks:t}=e,n=Array.isArray(t)?t.length-1:null;return`
    .${s.rail},
    .${s.track} {
      border: none;
      height: 4px;
    }

    /* Adjust the position of the first mark by moving it 2px to the right to fit it inside the track */
    span[data-index="0"].${s.mark} {
      left: 2px !important;
    }

    /* Adjust the position of the last mark by moving it 2px to the left to fit it inside the track */
    span[data-index="${n}"].${s.mark} {
      left: calc(100% - 2px) !important;
    }
    
    .${s.markLabel} {
      top: 26px;
    }

    .${s.disabled} .${s.track} {
      border: none;
    }
  `},v=e=>{let t=c(e);return`
    .${s.track} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${s.thumb}.${s.disabled} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${s.valueLabel} {
      color: ${t?.base?.textDisabled};
      background-color: ${t?.base?.backgroundSecondary};
      
      & * {
        color: ${t?.base?.textDisabled};
      }
    }

    .${s.markLabel} {
      color: ${t?.base?.textDisabled};
    }

    .${s.mark} {
      background-color: ${t?.base?.fillPrimary};
    }
  `},y=p(f,{target:`embkalj0`})(h,` `,e=>{let{disabled:t}=e;return`
      ${g(e)}
      ${_(e)}
      ${t?v(e):``}
    `},`;`)})),x,S,C,w=e((()=>{x=t(n()),b(),S=t(r()),C=(0,x.forwardRef)((e,t)=>{let{value:n,defaultValue:r,"aria-label":i,getAriaLabel:a,...o}=e,s=a?{getAriaLabel:a}:{getAriaLabel:Array.isArray(n)||Array.isArray(r)?e=>e===0?`Minimum value`:`Maximum value`:()=>i||`Slider value`};return(0,S.jsx)(y,{ref:t,value:n,defaultValue:r,...o,...s,orientation:`horizontal`})}),C.displayName=`InputSlider`}));export{w as n,C as t};