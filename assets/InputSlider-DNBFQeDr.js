import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Dr as i,E as a,Eo as o,Hn as s,K as c,Za as l,hn as u,in as d,ko as f,ln as p,mn as m,q as h}from"./iframe-s0DqqZ6S.js";var g,_,v,y,b=e((()=>{r(),s(),a(),g=e=>{let t=p(e),n=u(e),r=m(e);return`
    position: relative;

    .${l.rail},
    .${l.track} {
      border-radius: 2px;
    }

    .${l.rail} {
      background-color: ${r?.base?.divider};
      opacity:1;
    }
    
    .${l.track} {
      background-color: ${r?.accent?.fillPrimary};
    }

    .${l.thumb} {
      ${d(e)}
      height: 14px;
      width: 14px;
      background-color: ${r?.accent?.fillPrimary};

      &.${l.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${n?.none};
      }
    }

    .${l.thumb}::before {
      display: none;
    }

    .${l.thumb}::after {
      background-color: ${r?.base?.backgroundPrimary} !important;
      height: 6px !important;
      width: 6px !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .${l.valueLabel} {
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

    .${l.mark} {
      /*
       * (masoudmanson): Although the mark is not an icon, but since we don't have
       * a specific color for the mark, we use the ornamentDisabled color for it.
       */
      background-color: ${r?.base?.ornamentDisabled};
      opacity: 1;
    }

    .${l.mark}.${l.markActive} {
      background-color: ${r?.base?.backgroundPrimary};
    }

    .${l.markLabel} {
      ${h(e)?.styles}
      color: ${r?.base?.textSecondary};
    }

    .${l.markLabelActive} {
      color: ${r?.base?.textPrimary};
    }
  `},_=e=>{let{marks:t}=e,n=Array.isArray(t)?t.length-1:null;return`
    .${l.rail},
    .${l.track} {
      border: none;
      height: 4px;
    }

    /* Adjust the position of the first mark by moving it 2px to the right to fit it inside the track */
    span[data-index="0"].${l.mark} {
      left: 2px !important;
    }

    /* Adjust the position of the last mark by moving it 2px to the left to fit it inside the track */
    span[data-index="${n}"].${l.mark} {
      left: calc(100% - 2px) !important;
    }
    
    .${l.markLabel} {
      top: 26px;
    }

    .${l.disabled} .${l.track} {
      border: none;
    }
  `},v=e=>{let t=m(e);return`
    .${l.track} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${l.thumb}.${l.disabled} {
      background-color: ${t?.base?.fillDisabled};
    }

    .${l.valueLabel} {
      color: ${t?.base?.textDisabled};
      background-color: ${t?.base?.backgroundSecondary};
      
      & * {
        color: ${t?.base?.textDisabled};
      }
    }

    .${l.markLabel} {
      color: ${t?.base?.textDisabled};
    }

    .${l.mark} {
      background-color: ${t?.base?.fillPrimary};
    }
  `},y=f(i,{target:`embkalj0`})(c,` `,e=>{let{disabled:t}=e;return`
      ${g(e)}
      ${_(e)}
      ${t?v(e):``}
    `},`;`)})),x,S,C,w=e((()=>{x=t(n()),b(),S=t(o()),C=(0,x.forwardRef)((e,t)=>{let{value:n,defaultValue:r,"aria-label":i,getAriaLabel:a,...o}=e,s=a?{getAriaLabel:a}:{getAriaLabel:Array.isArray(n)||Array.isArray(r)?e=>e===0?`Minimum value`:`Maximum value`:()=>i||`Slider value`};return(0,S.jsx)(y,{ref:t,value:n,defaultValue:r,...o,...s,orientation:`horizontal`})}),C.displayName=`InputSlider`}));export{w as n,C as t};