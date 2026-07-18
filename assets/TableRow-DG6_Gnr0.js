import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{Fi as n,Ii as r,Li as i,O as a,Qa as o,Y as s,t as c,z as l}from"./iframe-DocVhSSI.js";import{n as u,t as d}from"./Tooltip-DB8p7_xV.js";var f,p,m,h,g,_=e((()=>{i(),c(),f=[`rowHeight`,`useDivider`,`shouldShowTooltipOnHover`,`tooltipProps`,`tooltipSubtitle`,`tooltipText`,`hover`],p=e=>{let t=s(e);return`
    background-color: ${t?.base?.backgroundSecondary};
    color: ${t?.base?.textDisabled};
    user-select: none;

    &:hover {
      background-color: ${t?.base?.backgroundSecondary};
      color: ${t?.base?.textDisabled};
    }

    & span, & div {
      color: ${t?.base?.textDisabled};
      background-color: transparent !important;
    }

    .cell-component {
      color: ${t?.base?.textDisabled};
      pointer-events: none;
      user-select: none;
      & div {
        color: ${t?.base?.textDisabled};
        background-color: transparent;
      }

      & .MuiChip-root {
        background-color: ${t?.base?.fillDisabled};
        box-shadow: inset 0 0 0 1px ${t?.base?.borderPrimaryDisabled} !important;

        & span {
          color: ${t?.base?.textDisabled} !important;
        }
      }

      svg {
        fill: ${t?.base?.ornamentDisabled};
      }

      filter: grayscale(100%);
    }
  `},m=e=>{let{selected:t}=e,n=s(e);return`
    &:hover {
      td, th {
        position: relative;
        background-color: ${t?n?.accent?.surfaceSecondary:n?.base?.backgroundPrimary};

        &:before {
          background-color: ${n?.base?.fillPrimaryInteraction};
        }
      }
    }
  `},h=e=>{let t=s(e);return`
    td, th {
      &:before {
        background-color: ${t?.accent?.surfaceSecondary};
      }

      background-color: ${t?.base?.fillPrimaryInteraction};
    }
  `},g=r(`tr`,{shouldForwardProp:e=>!f.includes(e),target:`euwrjwp0`})(a,` `,l,` `,e=>{let{rowHeight:t,useDivider:n=!0,selected:r=!1,disabled:i=!1,hover:a=!0}=e,o=s(e);return`
      align-items: center;
      position: relative;
      margin: 0;
      padding: 0;
      display: table-row;

      ${n&&`
          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: ${o?.base?.borderSecondary};
            z-index: 1;
          }
        `}

      td, th {
        margin: 0;
        padding: 0;
        position: sticky !important;
        background-color: ${o?.base?.backgroundPrimary};

        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background-color: ${o?.base?.backgroundPrimary};
        }
      }

      ${t?`max-height: ${t}px;`:``}
      ${a&&m(e)};
      ${r&&h(e)};
      ${i&&p(e)}
    `},`;`)})),v,y,b,x=e((()=>{v=t(o()),u(),_(),y=n(),b=(0,v.forwardRef)((e,t)=>{let{children:n,shouldShowTooltipOnHover:r=!0,tooltipProps:i,tooltipText:a=!1,tooltipSubtitle:o,hover:s=!0}=e;return r&&s?(0,y.jsx)(d,{arrow:!0,sdsStyle:`dark`,subtitle:o,title:a,...i,children:(0,y.jsx)(g,{ref:t,...e,children:n})}):(0,y.jsx)(g,{ref:t,...e,children:n})})}));export{x as n,b as t};