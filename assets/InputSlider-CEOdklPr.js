import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{t as n}from"./react-B-4JnjsC.js";import{B as r,Hr as i,Vr as a,lr as o,t as s}from"./material-DlyzFPof.js";import{t as c}from"./jsx-runtime-cM__dR4X.js";import{Nt as l,Rt as u,S as d,Ut as f,Wt as p,t as m,x as h}from"./iframe-FMtQz5A8.js";var g,_,v,y,b=t((()=>{i(),s(),m(),g=e=>{let t=u(e),n=p(e),r=f(e);return`
    position: relative;

    .${o.rail},
    .${o.track} {
      border-radius: 2px;
    }

    .${o.rail} {
      background-color: ${r?.base?.divider};
      opacity:1;
    }
    
    .${o.track} {
      background-color: ${r?.accent?.fillPrimary};
    }

    .${o.thumb} {
      ${l(e)}
      height: 14px;
      width: 14px;
      background-color: ${r?.accent?.fillPrimary};

      &.${o.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${n?.none};
      }
    }

    .${o.thumb}::before {
      display: none;
    }

    .${o.thumb}::after {
      background-color: ${r?.base?.backgroundPrimary} !important;
      height: 6px !important;
      width: 6px !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .${o.valueLabel} {
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

    .${o.mark} {
      /*
       * (masoudmanson): Although the mark is not an icon, but since we don't have
       * a specific color for the mark, we use the ornamentDisabled color for it.
       */
      background-color: ${r?.base?.ornamentDisabled};
      opacity: 1;
    }

    .${o.mark}.${o.markActive} {
      background-color: ${r?.base?.backgroundPrimary};
    }

    .${o.markLabel} {
      ${d(e)?.styles}
      color: ${r?.base?.textSecondary};
    }

    .${o.markLabelActive} {
      color: ${r?.base?.textPrimary};
    }
  `},_=e=>{let{marks:t}=e,n=Array.isArray(t)?t.length-1:null;return`
    .${o.rail},
    .${o.track} {
      border: none;
      height: 4px;
    }

    /* Adjust the position of the first mark by moving it 2px to the right to fit it inside the track */
    span[data-index="0"].${o.mark} {
      left: 2px !important;
    }

    /* Adjust the position of the last mark by moving it 2px to the left to fit it inside the track */
    span[data-index="${n}"].${o.mark} {
      left: calc(100% - 2px) !important;
    }
    
    .${o.markLabel} {
      top: 26px;
    }

    .${o.disabled} .${o.track} {
      border: none;
    }
  `},v=e=>{let t=f(e);return`
    .${o.track} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${o.thumb}.${o.disabled} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${o.valueLabel} {
      color: ${t?.base?.textDisabled};
      background-color: ${t?.base?.backgroundSecondary};
      
      & * {
        color: ${t?.base?.textDisabled};
      }
    }

    .${o.markLabel} {
      color: ${t?.base?.textDisabled};
    }

    .${o.mark} {
      background-color: ${t?.base?.fillPrimary};
    }
  `},y=a(r,{target:`embkalj0`})(h,` `,e=>{let{disabled:t}=e;return`
      ${g(e)}
      ${_(e)}
      ${t?v(e):``}
    `},`;`)})),x,S,C,w=t((()=>{x=e(n()),b(),S=e(c()),C=(0,x.forwardRef)((e,t)=>{let{value:n,defaultValue:r,"aria-label":i,getAriaLabel:a,...o}=e,s=a?{getAriaLabel:a}:{getAriaLabel:Array.isArray(n)||Array.isArray(r)?e=>e===0?`Minimum value`:`Maximum value`:()=>i||`Slider value`};return(0,S.jsx)(y,{ref:t,value:n,defaultValue:r,...o,...s,orientation:`horizontal`})}),C.displayName=`InputSlider`}));export{w as n,C as t};