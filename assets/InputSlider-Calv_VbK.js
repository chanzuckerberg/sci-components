import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Ii as r,Kt as i,Li as a,Qa as o,W as s,X as c,Y as l,_ as u,ct as d,di as f,t as p,v as m,z as h}from"./iframe-DocVhSSI.js";var g,_,v,y,b=e((()=>{a(),d(),p(),g=e=>{let t=s(e),n=c(e),r=l(e);return`
    position: relative;

    .${f.rail},
    .${f.track} {
      border-radius: 2px;
    }

    .${f.rail} {
      background-color: ${r?.base?.divider};
      opacity:1;
    }
    
    .${f.track} {
      background-color: ${r?.accent?.fillPrimary};
    }

    .${f.thumb} {
      ${h(e)}
      height: 14px;
      width: 14px;
      background-color: ${r?.accent?.fillPrimary};

      &.${f.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${n?.none};
      }
    }

    .${f.thumb}::before {
      display: none;
    }

    .${f.thumb}::after {
      background-color: ${r?.base?.backgroundPrimary} !important;
      height: 6px !important;
      width: 6px !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .${f.valueLabel} {
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

    .${f.mark} {
      /*
       * (masoudmanson): Although the mark is not an icon, but since we don't have
       * a specific color for the mark, we use the ornamentDisabled color for it.
       */
      background-color: ${r?.base?.ornamentDisabled};
      opacity: 1;
    }

    .${f.mark}.${f.markActive} {
      background-color: ${r?.base?.backgroundPrimary};
    }

    .${f.markLabel} {
      ${m(e)?.styles}
      color: ${r?.base?.textSecondary};
    }

    .${f.markLabelActive} {
      color: ${r?.base?.textPrimary};
    }
  `},_=e=>{let{marks:t}=e,n=Array.isArray(t)?t.length-1:null;return`
    .${f.rail},
    .${f.track} {
      border: none;
      height: 4px;
    }

    /* Adjust the position of the first mark by moving it 2px to the right to fit it inside the track */
    span[data-index="0"].${f.mark} {
      left: 2px !important;
    }

    /* Adjust the position of the last mark by moving it 2px to the left to fit it inside the track */
    span[data-index="${n}"].${f.mark} {
      left: calc(100% - 2px) !important;
    }
    
    .${f.markLabel} {
      top: 26px;
    }

    .${f.disabled} .${f.track} {
      border: none;
    }
  `},v=e=>{let t=l(e);return`
    .${f.track} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${f.thumb}.${f.disabled} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${f.valueLabel} {
      color: ${t?.base?.textDisabled};
      background-color: ${t?.base?.backgroundSecondary};
      
      & * {
        color: ${t?.base?.textDisabled};
      }
    }

    .${f.markLabel} {
      color: ${t?.base?.textDisabled};
    }

    .${f.mark} {
      background-color: ${t?.base?.fillPrimary};
    }
  `},y=r(i,{target:`embkalj0`})(u,` `,e=>{let{disabled:t}=e;return`
      ${g(e)}
      ${_(e)}
      ${t?v(e):``}
    `},`;`)})),x,S,C,w=e((()=>{x=t(o()),b(),S=n(),C=(0,x.forwardRef)((e,t)=>{let{value:n,defaultValue:r,"aria-label":i,getAriaLabel:a,...o}=e,s=a?{getAriaLabel:a}:{getAriaLabel:Array.isArray(n)||Array.isArray(r)?e=>e===0?`Minimum value`:`Maximum value`:()=>i||`Slider value`};return(0,S.jsx)(y,{ref:t,value:n,defaultValue:r,...o,...s,orientation:`horizontal`})}),C.displayName=`InputSlider`}));export{w as n,C as t};