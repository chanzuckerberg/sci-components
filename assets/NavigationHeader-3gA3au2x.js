import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,D as r,E as i,Fi as a,Gi as o,Ir as s,K as c,Ln as l,Mi as u,Ni as d,Pi as f,Q as p,S as m,Ti as h,Tt as g,U as _,W as v,Y as y,Z as b,a as x,ct as S,d as C,f as ee,g as w,ji as te,jn as T,p as E,q as D,r as O,s as k,t as A,u as ne,ut as re,xi as ie}from"./iframe-Bjh1LYUt.js";import{a as j,n as M,r as ae,t as oe}from"./Accordion-Dod-mJvf.js";import{n as N,t as P}from"./Icon-D5aq3JJF.js";import{a as F,o as se}from"./utils-CHt6irz9.js";import{a as ce,i as le,n as I,t as L}from"./Button-BT0OC4_c.js";import{n as R,t as z}from"./Tag-B6vZjc0G.js";import{n as ue,t as de}from"./InputSearch-DkiMu3fO.js";import{n as fe,t as B}from"./MenuItem-CRtA7jtf.js";import{n as pe,t as me}from"./Link-DWe--q-q.js";import{n as he,t as ge}from"./ListSubheader-01j2UZ1R.js";import{n as _e,t as ve}from"./Menu-evq66t0D.js";var V,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at=t((()=>{d(),S(),A(),R(),ue(),pe(),M(),I(),V=[`hasInvertedStyle`,`isNarrow`,`primaryNavPosition`,`showSearch`,`logoLinkComponent`,`logoLinkProps`,`defaultUrl`,`hasDetails`,`hasIcon`,`sectionProps`],ye=u(`div`,{target:`e1bn4x3g35`})({name:`odtqpl`,styles:`position:sticky;top:0;z-index:2100`}),be=u(s,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g34`})(e=>{let t=y(e);return`
      background-color: ${e.hasInvertedStyle?t?.base.backgroundPrimaryDark:t?.base.backgroundPrimary};
      background-image: none;
      max-width: 100%;
      overflow-x: auto;
      z-index: 2100;
    `},`;`),xe=e=>{let t=y(e);return f`
    border-bottom: 1px solid
      ${e.hasInvertedStyle?t?.base.dividerOnDark:t?.base.divider};
    background-color: ${e.hasInvertedStyle?t?.base.backgroundPrimaryDark:t?.base.backgroundPrimary};
    background-image: none;
    box-shadow: none;
    position: sticky !important;
    top: 0;
    justify-content: space-between;
  `},Se=u(g,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g33`})(e=>{let{isNarrow:t}=e,n=b(e);return f`
      &.MuiToolbar-root {
        min-height: ${48}px;
        max-height: ${48}px;
        padding: ${n?.s}px ${n?.l}px;

        ${t&&xe(e)}
      }
    `},`;`),Ce=u(L,{shouldForwardProp:e=>!V.includes(e),target:`e1bn4x3g30`})(e=>{let{sdsType:t,hasInvertedStyle:n}=e,r=e?.theme?.palette?.mode||`light`,i=y(e),a=`
      box-shadow: inset 0 0 0 1px ${r===`light`?`white`:i?.accent?.fillPrimary};
      color: ${r===`light`?`white`:i?.accent?.fillPrimary};
      &:hover {
        background-color: ${i?.accent?.fillInteraction};
        box-shadow: inset 0 0 0 1px ${i?.accent?.fillInteraction};
        color: ${i?.base?.textPrimaryOnDark};
      }
    `;return f`
      ${t===`secondary`&&n?a:``}
    `},`;`),we=e=>{let t=y(e);return f`
    color: ${t?.base?.textPrimaryOnDark};
    svg {
      fill: ${t?.base?.ornamentPrimaryOnDark};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      color: ${t?.base?.textPrimaryOnDark};
      svg {
        fill: ${t?.base?.ornamentPrimaryOnDark};
      }
    }
  `},Te=u(L,{shouldForwardProp:e=>!V.includes(e),target:`e1bn4x3g29`})(e=>{let{hasInvertedStyle:t,isNarrow:n}=e;return f`
      ${t&&we(e)}
      ${n&&O(e)}
    `},`;`),Ee=e=>{let t=y(e);return f`
    svg {
      fill: ${t?.base?.ornamentSecondaryOnDark};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      svg {
        fill: ${t?.base?.ornamentPrimaryOnDark};
      }
    }
  `},De=u(L,{shouldForwardProp:e=>!V.includes(e),target:`e1bn4x3g28`})(e=>{let{hasInvertedStyle:t}=e;return f`
      ${t&&Ee(e)}
      margin: 0;
    `},`;`),Oe=u(me,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g27`})(`align-items:center;display:flex;text-decoration:none!important;`,e=>{let{isNarrow:t}=e;return f`
      width: ${t?`100%`:`auto`};
    `},`;`),ke=u(`div`,{target:`e1bn4x3g26`})({name:`s5xdrg`,styles:`display:flex;align-items:center`}),Ae=()=>f`
    p {
      margin: 0px;
      margin-block: 0px;
    }
  `,je=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g25`})(`display:flex;align-items:center;`,e=>{let{isNarrow:t}=e,n=y(e),r=b(e);return f`
      gap: ${r?.l}px;
      color: ${e.hasInvertedStyle?n?.base.textPrimaryOnDark:n?.base.textPrimary};
      margin-right: ${r?.xxxl}px;
      width: 100%;

      ${t&&Ae()}
    `},`;`),Me=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g24`})(e=>f`
      display: flex;
      align-items: center;
      gap: ${b(e)?.xs}px;

      p {
        ${i(e)}
        margin: 0;
        white-space: nowrap;
      }
    `,`;`),Ne=u(z,{target:`e1bn4x3g23`})({name:`ti75j2`,styles:`margin:0`}),Pe=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g22`})(`align-items:center;display:flex;flex-grow:1;`,e=>{let{showSearch:t,primaryNavPosition:n,isNarrow:r}=e,i=b(e),a=n===`left`?`flex-start`:`space-between`,o=n===`left`?`flex-start`:`flex-end`;return f`
      flex-direction: ${r?`column`:`row`};
      gap: ${i?.xxxl}px;
      margin-right: ${i?.xxxl}px;
      flex: 1;
      justify-content: ${t?a:o};
    `},`;`),Fe=u(de,{shouldForwardProp:e=>!V.includes(e),target:`e1bn4x3g21`})(`margin:0;width:100%;`,e=>{let{hasInvertedStyle:t,isNarrow:n}=e,r=b(e),i=y(e);return f`
      max-width: ${n?`100%`:`320px`};
      padding-top: ${n?`${r?.m}px`:0};
      .MuiInputBase-root {
        color: ${t?i?.base.textPrimaryOnDark:i?.base.textPrimary};
        fieldset {
          border-color: ${t?i?.base?.borderPrimaryOnDark:``};
        }

        .MuiInputBase-input {
          &::placeholder {
            color: ${t?i?.base?.textTertiaryOnDark:i?.base?.textTertiary};
            opacity: 1;
          }
        }

        .MuiInputAdornment-root {
          .MuiButtonBase-root:last-of-type {
            svg {
              color: ${t?i?.base?.ornamentSecondaryOnDark:``};
            }
          }
        }

        &:hover {
          fieldset {
            border-color: ${t?i?.base?.borderPrimaryInteractionOnDark:``} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${t?i?.base?.ornamentPrimaryOnDark:``};
              }
            }
          }
        }

        &.Mui-focused {
          fieldset {
            border-color: ${t?i?.base?.borderPrimaryInteractionOnDark:``} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${t?i?.base?.ornamentPrimaryOnDark:``};
              }
            }
          }
        }

        &.Mui-disabled {
          fieldset {
            border-color: ${t?i?.base?.borderPrimaryDisabledOnDark:``} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${t?i?.base?.ornamentDisabledOnDark:``};
              }
            }
          }
        }
      }
    `},`;`),Ie=e=>{let t=b(e),n=c(e),r=y(e),i=e.hasInvertedStyle?r?.base.backgroundPrimaryDark:r?.base.backgroundPrimary;return f`
    background: ${i};
    gap: ${t?.l}px;
    flex-direction: column-reverse;
    margin-left: 0;
    margin-top: ${t?.xl}px;
    padding: ${t?.xl}px 0;
    position: sticky;
    bottom: 0;

    &::before {
      content: "";
      position: absolute;
      height: ${t?.xxxl}px;
      width: 100%;
      background: linear-gradient(
        to top,
        ${i} 0%,
        ${i}00 100%
      );
      top: -${t?.xxxl}px;
    }

    .MuiButton-icon .MuiSvgIcon-root {
      width: ${n?.l.width}px;
      height: ${n?.l.height}px;
    }
  `},Le=u(`section`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g20`})(`display:flex;align-items:center;z-index:100;`,e=>{let{isNarrow:t}=e,n=b(e);return f`
      gap: ${n?.m}px;
      margin-left: ${n?.xxxl}px;

      ${t&&Ie(e)}
    `},`;`),Re=u(T,{shouldForwardProp:e=>![...V,`sdsStyle`,`topOffset`].includes(e),target:`e1bn4x3g19`})(e=>{let t=y(e),{topOffset:n=0}=e;return`
      .MuiDrawer-paper {
        background: ${e.hasInvertedStyle?t?.base.backgroundPrimaryDark:t?.base.backgroundPrimary};
        box-shadow: none;
        background-image: none;
        width: 100%;
        display: flex;
        flex-direction: column;
        top: ${n+48}px;
        height: calc(100% - ${n+48}px);
        justify-content: space-between;
      }
    `},`;`),ze=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g18`})(e=>f`
      padding: 0 ${b(e)?.l}px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,`;`),Be=u(L,{shouldForwardProp:e=>!V.includes(e),target:`e1bn4x3g17`})(e=>{let{hasInvertedStyle:t}=e,n=c(e);return f`
      ${t&&Ee(e)}
      margin: 0;
      svg {
        width: ${n?.l?.width}px !important;
        height: ${n?.l?.height}px !important;
      }
    `},`;`),Ve=e=>{let{hasInvertedStyle:t}=e,n=y(e),r=b(e),i=t?n?.base.textPrimaryOnDark:n?.base.textPrimary;return f`
    border-radius: 0;

    &:hover {
      background-color: ${t?n?.base?.backgroundPrimaryDark:n?.base?.backgroundPrimary};
    }

    &[aria-expanded="true"] {
      position: sticky;
      border-radius: 0;
      top: ${r?.s}px;
      z-index: 11;
      backdrop-filter: blur(0px);
      color: ${i};
      background-color: ${t?n?.base?.backgroundPrimaryDark:n?.base?.backgroundPrimary};
    }
  `},He=u(oe,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g16`})(`padding:0!important;width:100%;min-width:unset;.MuiAccordionSummary-content{`,x,`;}.MuiAccordionDetails-root .MuiButtonBase-root .primary-text{`,ne,`;}`,e=>{let{hasInvertedStyle:t,sdsStyle:n=`dropdown`}=e,r=b(e),i=y(e),a=v(e),o=t?i?.base.textSecondaryOnDark:i?.base.textSecondary,s=t?i?.base.textPrimaryOnDark:i?.base.textPrimary,c=t?i?.base.ornamentSecondaryOnDark:i?.base.ornamentSecondary,l=t?i?.base?.ornamentSecondaryInteractionOnDark:i?.base.ornamentSecondaryInteraction;return f`
      & > .MuiButtonBase-root {
        padding: ${r?.s}px ${r?.l}px !important;
        border-radius: ${a?.l}px;
        color: ${o};

        svg {
          color: ${c};
        }

        &[aria-expanded="true"] {
          position: sticky;
          border-radius: ${a?.l}px;
          top: calc(48px + ${r?.s}px);
          z-index: 11;
          backdrop-filter: blur(8px);
          color: ${s};
          background-color: ${t?i?.base?.fillPrimaryPressedOnDark:i?.base?.fillPrimaryPressed};

          &::before {
            content: "";
            position: absolute;
            top: -${r?.s}px;
            left: -${r?.l??0}px;
            right: -${r?.l??0}px;
            bottom: 0;
            background-color: ${t?i?.base?.backgroundPrimaryDark:i?.base?.backgroundPrimary};
          }

          &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 10px;
            background-image: linear-gradient(
              to bottom,
              ${t?i?.base?.backgroundPrimaryDark:i?.base?.backgroundPrimary},
              transparent
            );
          }

          .MuiAccordionSummary-content {
            ${C(e)}
            position: relative;
            z-index: 12;
          }

          svg {
            color: ${l} !important;
          }
        }

        &:hover {
          width: 100%;
          box-shadow: none;
          background: ${t?i?.base?.fillPrimaryInteractionOnDark:i?.base?.fillPrimaryInteraction};
          color: ${t?i?.base.textPrimaryOnDark:i?.base.textPrimary};

          svg {
            color: ${t?i?.base?.ornamentSecondaryInteractionOnDark:i?.base.ornamentSecondaryInteraction} !important;
          }
        }

        ${n===`drawer`&&Ve(e)}
      }

      .MuiCollapse-root .MuiAccordionDetails-root {
        padding: 0;
        margin-top: ${n===`drawer`?r?.s:r?.xxs}px;

        .MuiButtonBase-root {
          ${n===`drawer`?f`
                padding: ${r?.s}px 0;
              `:f`
                padding: ${r?.s}px ${r?.m}px ${r?.s}px
                  ${r?.xl}px !important;
              `}

          width: 100%;

          svg {
            color: ${i?.accent?.foreground};
          }

          .primary-text {
            color: ${t?i?.base.textSecondaryOnDark:i?.base.textSecondary} !important;
          }

          &:hover {
            .primary-text {
              color: ${t?i?.base.textPrimaryOnDark:i?.base.textPrimary} !important;
            }
          }
        }
      }
    `},`;`),Ue=u(l,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g15`})(e=>{let t=y(e);return`
      margin: ${b(e)?.s}px 0;
      border-color: ${e.hasInvertedStyle?t?.base.dividerOnDark:t?.base.divider};
    `},`;`),We=u(T,{shouldForwardProp:e=>![...V,`sdsStyle`,`topOffset`].includes(e),target:`e1bn4x3g14`})(e=>{let{hasInvertedStyle:t,topOffset:n=0}=e,r=y(e),i=b(e);return f`
      pointer-events: none;
      top: ${n}px;
      z-index: 2000;

      .MuiDrawer-paper {
        background-color: ${t?r?.base.backgroundPrimaryDark:r?.base.backgroundPrimary};
        height: auto;
        max-height: calc(100vh - ${n}px);
        overflow: visible;
        pointer-events: auto;
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.1);
        background-image: none;
        padding: ${i?.xl?i?.xl+48:48}px ${i?.xl}px
          ${i?.xxxl}px;
        transform: translateY(48px);
        top: ${n}px;
      }

      .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(2px);
        top: ${n}px;
      }
    `},`;`),Ge=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g13`})(e=>{let{hasInvertedStyle:t}=e,n=y(e),r=b(e);return f`
      background-color: ${t?n?.base.backgroundPrimaryDark:n?.base.backgroundPrimary};
      display: flex;
      flex-wrap: wrap;
      gap: ${r?.xxxl}px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      justify-content: center;
      transition: opacity 150ms ease-in-out;
    `},`;`),Ke=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`,`totalColumns`].includes(e),target:`e1bn4x3g12`})(e=>{let t=b(e),{totalColumns:n=1}=e,r=n>4?4:n;return f`
      display: flex;
      flex-direction: column;
      flex: 0 0 ${`calc((100% - (${r-1} * ${t?.xxxl}px)) / ${r})`};
      min-width: 240px;
      max-width: 400px;
    `},`;`),qe=u(`div`,{target:`e1bn4x3g11`})(e=>{let{needsHeaderPadding:t}=e,n=b(e),r=p(e),i=parseInt(r?.wideStyles?.header?.semibold?.m?.lineHeight||`22px`),a=n?.m||12;return f`
      & > *:last-child {
        margin-bottom: 0;
      }

      padding-top: ${t?i+a:0}px;
    `},`;`),Je=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g10`})(e=>{let{hasInvertedStyle:t}=e,n=y(e),i=b(e);return f`
      ${r(e)}
      font-weight: 600;
      color: ${t?n?.base.textSecondaryOnDark:n?.base.textSecondary};
      padding: 0 0 0 56px;
      margin-bottom: ${i?.m}px;
    `},`;`),Ye=u(L,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g9`})(e=>{let{hasInvertedStyle:t,hasDetails:n}=e,r=y(e),i=v(e),a=b(e),o=c(e);return f`
      border: none;
      outline: none;
      background: transparent;
      box-shadow: none;
      justify-content: flex-start;
      text-align: left;
      padding: ${n?a?.l:a?.m}px ${a?.l}px;
      margin-bottom: ${n?a?.s:0}px;
      border-radius: ${i?.xl}px;
      min-height: auto;
      width: 100%;
      white-space: wrap;
      height: unset !important;

      svg {
        width: ${n?o?.l?.width:o?.s?.width}px;
        height: ${n?o?.l?.height:o?.s?.height}px;
      }

      &:hover {
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        background: ${t?r?.base?.fillPrimaryInteractionOnDark:r?.base?.fillPrimaryInteraction};
        svg {
          color: ${r?.accent?.foreground};
        }
      }
    `},`;`),Xe=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g8`})(e=>f`
      display: flex;
      align-items: center;
      gap: ${b(e)?.l}px;
      width: 100%;
    `,`;`),Ze=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g7`})(e=>{let t=y(e),n=b(e),{hasDetails:r}=e;return f`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${r?0:n?.xxs}px;
      color: ${t?.accent?.foreground};

      svg {
        color: ${t?.accent?.foreground};
      }
    `},`;`),Qe=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g6`})(()=>f`
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    `,`;`),$e=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g5`})(e=>{let{hasDetails:t}=e,n=b(e),r=c(e);return f`
      width: ${t?r?.l?.width:r?.s?.width}px;
      height: ${t?r?.l?.height:r?.s?.height}px;
      padding: 0 ${t?0:n?.xxs}px;
      box-sizing: content-box;
    `},`;`),et=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g4`})(e=>{let{hasInvertedStyle:t,hasDetails:n}=e,r=y(e);return f`
      ${n?E(e):k(e)}
      color: ${t?r?.base.textPrimaryOnDark:r?.base.textPrimary};

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

      ${Ye}:hover & {
        color: ${t?r?.base.textPrimaryOnDark:r?.base.textPrimary};
      }
    `},`;`),tt=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g3`})(e=>{let{hasInvertedStyle:t}=e,n=y(e);return f`
      ${w(e)}
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      color: ${t?n?.base.textSecondaryOnDark:n?.base.textSecondary};
    `},`;`),nt=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g2`})(e=>{let t=b(e),{isNarrow:n}=e;return f`
      display: flex;
      flex-direction: row;
      gap: ${t?.xs}px;
      margin-top: ${t?.l}px;
      padding-left: ${n?`calc(${t?.l}px + ${t?.m}px)`:`calc(${t?.xxxl}px + ${t?.xs}px)`};
      flex-wrap: wrap;
    `},`;`),rt=u(L,{target:`e1bn4x3g1`})(e=>{let{hasInvertedStyle:t}=e,n=_(e),r=y(e),i=b(e),a=D(e);return f`
      background-color: ${t?n?.gray[700]:a===`dark`?n?.gray[100]:n?.gray[200]};
      width: fit-content !important;
      padding: ${i?.s}px ${i?.m}px !important;
      color: ${t?r?.base?.textPrimaryOnDark:r?.base?.textPrimary};
    `},`;`),it=u(`div`,{shouldForwardProp:e=>![...V,`sdsStyle`].includes(e),target:`e1bn4x3g0`})({name:`bjn8wh`,styles:`position:relative`})})),ot,st=t((()=>{d(),A(),R(),I(),ot=u(z,{target:`etq4jsl1`})({name:`ti75j2`,styles:`margin:0`})})),ct,lt,ut,dt,H,U,ft=t((()=>{d(),a(),A(),I(),ct=[`active`,`hasInvertedStyle`,`isNarrow`,`hasSection`,`innerSdsStyle`,`defaultUrl`,`hasDetails`,`hasIcon`,`sectionProps`,`navVariant`,`itemType`],lt={name:`1gw69wa`,styles:`background:transparent!important`},ut={name:`1l02985`,styles:`background-color:transparent!important`},dt=e=>{let{active:t,hasInvertedStyle:n,innerSdsStyle:r,navVariant:i}=e,a=b(e),o=y(e),s=v(e),c=n?o?.base?.ornamentSecondaryInteractionOnDark:o?.base?.ornamentSecondaryInteraction;return f(t?C(e):x(e),` border-radius:`,s?.l,`px;padding:`,a?.s,`px `,i===`primary`?a?.l:a?.m,`px;`,i===`primary`?`justify-content: start;`:``,` `,r===`drawer`?ut:f(`background-color:`,t?n?o?.base?.fillPrimaryPressedOnDark:o?.base?.fillPrimaryPressed:`transparent`,`;`,``),` width:100%;height:unset!important;&:hover{`,r===`drawer`?lt:f(`background:`,n?o?.base?.fillPrimaryInteractionOnDark:o?.base?.fillPrimaryInteraction,`;`,``),` box-shadow:none;`,i===`primary`&&U,`{color:`,n?o?.base.textPrimaryOnDark:o?.base.textPrimary,`;}svg{color:`,c,`!important;}}`,``)},H=u(L,{shouldForwardProp:e=>!ct.includes(e),target:`e810m81`})(`display:flex;align-items:center;min-width:fit-content;border:none;background:transparent;height:unset!important;`,e=>{let{hasInvertedStyle:t,isNarrow:n,active:r,navVariant:i}=e,a=b(e),o=y(e),s=v(e),c=t?o?.base.textSecondaryOnDark:o?.base.textSecondary,l=t?o?.base.textPrimaryOnDark:o?.base.textPrimary,u=t?o?.base.ornamentSecondaryOnDark:o?.base.ornamentSecondary,d=t?o?.base?.ornamentSecondaryInteractionOnDark:o?.base.ornamentSecondaryInteraction,p=t?o?.base.ornamentSecondaryInteractionOnDark:o?.base.ornamentSecondaryInteraction;return[i===`secondary`&&(r?E(e):k(e)),f(`padding:`,a?.xxxs,`px `,a?.m,`px;border-radius:`,s?.l,`px;background-color:`,r?t?o?.base?.fillPrimaryPressedOnDark:o?.base?.fillPrimaryPressed:`transparent`,`;`,i===`secondary`?f(`gap:`,a?.xs,`px;color:`,r?l:c,`;justify-content:flex-start;width:fit-content;&>span{gap:`,a?.xs,`px!important;}`,``):``,` svg{color:`,r?p:u,`;}&:hover{background:`,t?o?.base?.fillPrimaryInteractionOnDark:o?.base?.fillPrimaryInteraction,`!important;box-shadow:none;`,i===`primary`&&U,`{color:`,t?o?.base.textPrimaryOnDark:o?.base.textPrimary,`;}svg{color:`,d,`!important;}}`,n&&dt(e),`;`,``)]},`;`),U=u(`span`,{shouldForwardProp:e=>!ct.includes(e),target:`e810m80`})(e=>{let{hasInvertedStyle:t,active:n,isNarrow:r}=e,i=b(e),a=y(e),o=t?a?.base.textPrimaryOnDark:a?.base.textPrimary,s=t?a?.base.textSecondaryOnDark:a?.base.textSecondary;return[n?E(e):k(e),f(`position:relative;display:flex;align-items:center;gap:`,i?.xs,`px;color:`,n?o:s,`;`,r&&f(n?C(e):x(e),`;`,``),`;`,``)]},`;`)})),W,pt,mt,ht,gt,_t,vt,yt,bt,G,K,xt=t((()=>{d(),A(),a(),he(),S(),M(),W=[`isNarrow`,`hasSection`,`hasInvertedStyle`,`sectionProps`,`sdsStyle`],pt=e=>f(`align-items:start;flex-direction:column;margin-top:`,b(e)?.m,`px;`,``),mt=u(`section`,{shouldForwardProp:e=>!W.includes(e),target:`e13tbovl6`})(`display:flex;align-items:center;`,e=>{let{isNarrow:t}=e,n=b(e);return f(`column-gap:`,n?.m,`px;row-gap:`,n?.s,`px;`,t&&pt(e),`;`,``)},`;`),ht=u(ge,{shouldForwardProp:e=>!W.includes(e),target:`e13tbovl5`})(e=>{let{isNarrow:t,hasInvertedStyle:n,sdsStyle:r}=e,i=y(e),a=b(e);function o(){return t?n?i?.base.backgroundPrimaryDark:i?.base.backgroundPrimary:i?.base?.surfacePrimary}function s(){return t?n?i?.base.textSecondaryOnDark:i?.base.textSecondary:i?.base?.textSecondary}return r===`drawer`?f(ee(e),` top:0;color:`,s(),`!important;background-color:transparent;padding:0;margin-bottom:`,a?.xxs,`px!important;`,``):f(`&.MuiListSubheader-root{`,m(e),` top:0;color:`,s(),`;background-color:`,o(),`;padding:`,a?.xxs,`px `,t?a?.xl:a?.xs,`px;margin-bottom:0;}`,``)},`;`),gt=u(j,{shouldForwardProp:e=>!W.includes(e),target:`e13tbovl4`})(e=>{let{sdsStyle:t}=e,n=b(e);return f(t===`drawer`&&f(`display:flex;flex-direction:column;gap:`,n?.m,`px;`,``),`;`,``)},`;`),_t={name:`1hcx8jb`,styles:`padding:0`},vt=u(`div`,{shouldForwardProp:e=>!W.includes(e),target:`e13tbovl3`})(e=>{let{sdsStyle:t,hasInvertedStyle:n}=e,r=b(e),i=y(e),a=v(e);return t===`drawer`?f(`border-radius:`,a?.xl,`px;padding:`,r?.l,`px;background-color:`,n?i?.base?.backgroundSecondaryDark:i?.base?.backgroundSecondary,`;`,``):_t},`;`),yt=u(l,{shouldForwardProp:e=>!W.includes(e),target:`e13tbovl2`})(e=>{let{hasSection:t,isNarrow:n,hasInvertedStyle:r}=e,i=b(e),a=y(e);return f(`&.MuiDivider-root{position:relative;margin:0 0 `,t?i?.s:i?.xxs,`px;border-bottom:solid 1px `,n&&r?a?.base?.dividerOnDark:a?.base?.divider,`;padding-bottom:`,i?.xxs,`px;}`,``)},`;`),bt={name:`a4hmbt`,styles:`position:absolute`},G=u(`div`,{target:`e13tbovl1`})(e=>{let{active:t,isNarrow:n}=e;return[n?t?C(e):x(e):t?E(e):k(e),bt]},`;`),K=u(`div`,{target:`e13tbovl0`})(e=>{let{isNarrow:t}=e;return f(t?C(e):E(e),` visibility:hidden;opacity:0;`,``)},`;`)}));function St(e){return e.reduce((e,t)=>{let n=t.section||``;return{...e,[n]:[...e[n]||[],t]}},{})}var Ct=t((()=>{}));function wt({drawerItems:e,sectionProps:t,section:n,hasMultipleSections:r,hasInvertedStyle:i,onItemClick:a,showHeader:o=!0,isLastColumn:s=!0}){let c=t?.actions;return(0,q.jsxs)(q.Fragment,{children:[n&&r&&o&&(0,q.jsx)(Je,{hasInvertedStyle:i,children:n}),(0,q.jsx)(qe,{needsHeaderPadding:r&&!o&&n!==``,children:e.map((e,t)=>{let{label:r,details:o,icon:s,onClick:c,...l}=e,u=!!o,d=!!s,f=u?`l`:`s`,p=()=>s?(0,q.jsx)(Ze,{hasDetails:u,hasInvertedStyle:i,children:typeof s==`string`?(0,q.jsx)(P,{sdsIcon:s,sdsSize:f,color:`indigo`}):s}):(0,q.jsx)($e,{hasDetails:u});return(0,q.jsx)(Ye,{onClick:e=>{c?.(e),a()},hasInvertedStyle:i,hasIcon:d,hasDetails:u,...l,children:(0,q.jsxs)(Xe,{hasDetails:u,children:[p(),(0,q.jsxs)(Qe,{children:[(0,q.jsx)(et,{hasDetails:u,hasInvertedStyle:i,children:r}),o&&(0,q.jsx)(tt,{hasInvertedStyle:i,children:o})]})]})},`drawer-item-${n||`default`}-${r}-${t}`)})}),c&&c.length>0&&s&&(0,q.jsx)(nt,{children:c.map((e,t)=>{let{label:r,onClick:o,href:s,component:c,target:l,rel:u}=e;return(0,q.jsx)(rt,{sdsStyle:`solid`,sdsType:`primary`,size:`large`,onClick:e=>{o?.(e),s&&a()},hasInvertedStyle:i,component:s&&!c?`a`:c,href:s,target:l,rel:u,children:r},`action-${n||`default`}-${t}`)})})]})}var q,Tt=t((()=>{N(),at(),q=o()})),Et,Dt,Ot,kt,At,jt,Mt=t((()=>{d(),a(),A(),I(),Et=[`hasInvertedStyle`,`hasCaption`,`iconSize`,`hasDetails`,`hasIcon`,`sdsStyle`],Dt=u(L,{shouldForwardProp:e=>!Et.includes(e),target:`e1s6tb7t4`})(e=>{let t=b(e),n=y(e),r=c(e),i=e.hasInvertedStyle?n?.base?.textPrimaryOnDark:n?.base?.textPrimary;return f(`display:flex;justify-content:start;background-color:transparent!important;background-image:none!important;border:none!important;outline:none!important;box-shadow:none!important;align-items:center;text-align:left;gap:`,t?.l,`px!important;padding:`,t?.s,`px 0!important;&>span{gap:`,t?.l,`px!important;}cursor:pointer;border-radius:8px;transition:background-color 150ms;color:`,i,`;height:unset!important;svg{width:`,e.hasCaption?r?.l?.width:r?.s?.width,`px!important;height:`,e.hasCaption?r?.l?.height:r?.s?.height,`px!important;}&:hover{background-color:transparent;background-image:none;border:none;outline:none;box-shadow:none;}`,``)},`;`),Ot=u(`div`,{shouldForwardProp:e=>!Et.includes(e),target:`e1s6tb7t3`})(e=>f(`display:flex;flex-direction:column;gap:0!important;flex:1;min-width:0;padding-top:`,b(e)?.xxs,`px;`,``),`;`),kt=u(`div`,{shouldForwardProp:e=>!Et.includes(e),target:`e1s6tb7t2`})(e=>{let{hasDetails:t,hasInvertedStyle:n}=e,r=y(e),i=n?r?.base?.textPrimaryOnDark:r?.base?.textPrimary;return f(t?E(e):k(e),` color:`,i,`;overflow:hidden;text-overflow:ellipsis;white-space:normal;line-height:24px;`,``)},`;`),At=u(`div`,{shouldForwardProp:e=>!Et.includes(e),target:`e1s6tb7t1`})(e=>{let t=y(e),n=e.hasInvertedStyle?t?.base?.textSecondaryOnDark:t?.base?.textSecondary;return f(w(e),` color:`,n,`;white-space:normal;line-height:20px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;`,``)},`;`),jt=u(`div`,{shouldForwardProp:e=>!Et.includes(e),target:`e1s6tb7t0`})(e=>{let{iconSize:t}=e,n=e.iconSize===`l`?`24px`:`16px`,r=b(e);return f(`flex-shrink:0;width:`,n,`!important;height:`,n,`!important;display:flex;align-items:center;justify-content:center;padding:0 `,t===`l`?0:r?.xxs,`px;box-sizing:content-box;`,``)},`;`)}));function Nt(e,t,n){let{label:r,details:i,icon:a,onClick:o,...s}=e,c=!!i,l=c?`l`:`s`;return(0,J.jsxs)(Dt,{hasInvertedStyle:t,hasCaption:c,onClick:e=>{o?.(e),n()},onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(o?.(e),n())},role:`button`,tabIndex:0,sdsStyle:`minimal`,...s,children:[!a&&(0,J.jsx)($e,{hasDetails:c}),a&&(0,J.jsx)(jt,{iconSize:l,children:typeof a==`string`?(0,J.jsx)(P,{sdsIcon:a,sdsSize:l}):a}),(0,J.jsxs)(Ot,{children:[(0,J.jsx)(kt,{hasDetails:c,hasInvertedStyle:t,children:r}),c&&(0,J.jsx)(At,{hasInvertedStyle:t,children:i})]})]},`nav-item-${r}`)}function Pt(e,t){let{label:n,onClick:r,...i}=e;return(0,J.jsx)(B,{onClick:e=>{r?.(e),t()},sdsType:`action`,...i,icon:void 0,children:n},`nav-item-${n}`)}function Ft(e){let{accordionId:t,label:n,items:r,expandedAccordion:i,setExpandedAccordion:a,accordionRefs:o,scrollToAccordion:s,hasInvertedStyle:c,isNarrow:l,chevronSize:u=`s`,onClose:d,sdsStyle:f=`dropdown`,sectionProps:p}=e,m=i===t,h=()=>{a(m?null:t),!m&&s&&s(t)},g=e=>f===`drawer`?Nt(e,c,d):Pt(e,d),_=St(r),v=Object.keys(_),y=v.length>1||v.some(e=>e!==``);return(0,J.jsxs)(He,{id:t,hasInvertedStyle:c,isNarrow:l,expanded:m,onChange:h,ref:e=>{e?o.current.set(t,e):o.current.delete(t)},sdsStyle:f,children:[(0,J.jsx)(ae,{chevronSize:u,children:n}),(0,J.jsx)(gt,{sdsStyle:f,children:v.map((e,t)=>{let n=_[e],r=y&&t>0&&f!==`drawer`,i=p?.[e]?.actions;return(0,J.jsxs)(vt,{sdsStyle:f,hasInvertedStyle:c,children:[r&&(0,J.jsx)(yt,{hasSection:!!e,isNarrow:l,hasInvertedStyle:c}),e&&y&&(0,J.jsx)(ht,{isNarrow:l,hasInvertedStyle:c,sdsStyle:f,children:e}),n.map(e=>g(e)),i&&i.length>0&&f===`drawer`&&(0,J.jsx)(nt,{isNarrow:l,children:i.map((t,n)=>{let{label:r,onClick:i,href:a,component:o,target:s,rel:l}=t;return(0,J.jsx)(rt,{sdsStyle:`solid`,sdsType:`primary`,onClick:e=>{i?.(e),a&&d()},component:a&&!o?`a`:o,hasInvertedStyle:c,href:a,target:s,rel:l,children:r},`action-${e||`default`}-${n}`)})})]},`section-${e||`default`}`)})})]},t)}var J,It=t((()=>{M(),fe(),N(),Ct(),xt(),at(),Mt(),J=o()}));function Lt(){let[e,t]=(0,Y.useState)(null),[n,r]=(0,Y.useState)(null),[i,a]=(0,Y.useState)(null),o=(0,Y.useRef)(null),[s,c]=(0,Y.useState)(`100%`),l=(0,Y.useRef)(null),u=(0,Y.useRef)(null),[d,f]=(0,Y.useState)(null),[p,m]=(0,Y.useState)(!1),h=!!e,g=i!==null;function _(){t(null),r(null)}function v(){u.current&&clearTimeout(u.current),l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{a(null),f(null)},200)}function y(e){l.current&&clearTimeout(l.current),i!==null&&i!==e?(u.current&&clearTimeout(u.current),u.current=setTimeout(()=>{m(!0),setTimeout(()=>{a(e),f(e),m(!1)},100)},100)):(a(e),f(e),m(!1))}function b(){l.current&&clearTimeout(l.current)}return(0,Y.useEffect)(()=>()=>{l.current&&clearTimeout(l.current),u.current&&clearTimeout(u.current)},[]),(0,Y.useEffect)(()=>{let e=o.current;e&&c(e.offsetWidth)},[]),{anchorEl:e,activeDropdownKey:n,activeDrawerKey:i,contentKey:d,isContentFading:p,open:h,drawerOpen:g,buttonRef:o,menuWidth:s,setAnchorEl:t,setActiveDropdownKey:r,setActiveDrawerKey:a,setContentKey:f,onClose:_,onDrawerClose:v,onDrawerOpen:y,cancelDrawerClose:b}}var Y,Rt=t((()=>{Y=e(n())}));function zt({menuProps:e,hasInvertedStyle:t,isNarrow:n,items:r,onChange:i,value:a,sdsStyle:o=`dropdown`,expandedAccordion:s,setExpandedAccordion:c,accordionRefs:l,scrollToAccordion:u,onDrawerStateChange:d,topOffset:f=0,onClose:p,onDrawerStyleNavItemHover:m}){let g=h(),{anchorEl:_,activeDropdownKey:v,activeDrawerKey:y,contentKey:b,isContentFading:x,open:S,drawerOpen:C,buttonRef:ee,menuWidth:w,setAnchorEl:te,setActiveDropdownKey:T,setActiveDrawerKey:E,setContentKey:D,onClose:O,onDrawerClose:k,onDrawerOpen:A,cancelDrawerClose:ne}=Lt(),[re,ie]=(0,Bt.useState)(null),j=(e,t)=>e.map(e=>{let n=e.onClick;return{...e,onClick:e=>{n?.(e),i(t)}}});function M(){O(),n&&p?.()}(0,Bt.useEffect)(()=>{o===`drawer`&&d&&d(C)},[C,o,d]);let ae=(e,r,s,c,l)=>{let u=C&&y===r,d=r===a||u,{defaultUrl:f,component:p,target:h,rel:g}=e,_=f&&!p?`a`:p,v=e=>{i(r),c?.(e),C&&(E(null),D(null),ie(r))};return(0,X.jsx)(it,{onMouseEnter:()=>{m?.(e),re!==r&&A(r)},onMouseLeave:()=>{re===r&&ie(null),k()},children:(0,X.jsx)(H,{...l,itemType:e.itemType,active:d,hasInvertedStyle:t,isNarrow:n,sdsStyle:`minimal`,onClick:v,innerSdsStyle:o,navVariant:`primary`,component:_,href:f,target:h,rel:g,size:`medium`,children:(0,X.jsxs)(U,{itemType:e.itemType,active:d,hasInvertedStyle:t,isNarrow:n,navVariant:`primary`,children:[(0,X.jsx)(G,{active:d,isNarrow:n,children:s}),(0,X.jsx)(K,{"aria-hidden":`true`,isNarrow:n,children:s}),(0,X.jsx)(P,{sdsIcon:u?`ChevronUp`:`ChevronDown`,sdsSize:`xs`})]})})},r)},oe=(r,s,c,l,u)=>{let d=S&&v===s,f=s===a||d;return(0,X.jsxs)(Bt.Fragment,{children:[(0,X.jsx)(H,{...u,itemType:r.itemType,ref:ee,active:f,onClick:e=>{te(e.currentTarget),T(s),i(s),l?.(e)},hasInvertedStyle:t,isNarrow:n,sdsStyle:`minimal`,innerSdsStyle:o,navVariant:`primary`,size:`medium`,children:(0,X.jsxs)(U,{itemType:r.itemType,active:f,hasInvertedStyle:t,isNarrow:n,navVariant:`primary`,children:[(0,X.jsx)(G,{active:f,isNarrow:n,children:c}),(0,X.jsx)(K,{"aria-hidden":`true`,isNarrow:n,children:c}),(0,X.jsx)(P,{sdsIcon:d?`ChevronUp`:`ChevronDown`,sdsSize:`xs`})]})}),(0,X.jsx)(ve,{anchorEl:_,open:d,onClose:M,slotProps:{paper:{style:{marginTop:g?.app?.spacing?.s}}},anchorOrigin:{horizontal:`left`,vertical:`bottom`},transformOrigin:{horizontal:`left`,vertical:`top`},...e,disablePortal:!0,children:(()=>{let e=St(j(r.items,s)),i=Object.keys(e),a=i.length>1||i.some(e=>e!==``);return i.map((r,i)=>{let o=e[r];return(0,X.jsxs)(`div`,{children:[a&&i>0&&(0,X.jsx)(yt,{hasSection:!!r,isNarrow:n,hasInvertedStyle:t}),r&&a&&(0,X.jsx)(ht,{isNarrow:n,hasInvertedStyle:t,children:r}),o.map(e=>{let{label:t,onClick:n,...r}=e;return(0,X.jsx)(B,{onClick:e=>{n?.(e),M()},sdsType:`action`,sx:{minWidth:w},...r,icon:void 0,children:t},`menu-item-${t}`)})]},`section-${r||`default`}`)})})()})]},s)},N=(e,r)=>{let i=`${e.label?.toString().toLowerCase().replace(` `,`-`)}-dropdown`,a=j(e.items,r);return(0,X.jsx)(Ft,{accordionId:i,label:e.label,items:a,expandedAccordion:s,setExpandedAccordion:c,accordionRefs:l,scrollToAccordion:u,hasInvertedStyle:t,isNarrow:n,chevronSize:n?`s`:`xs`,onClose:M,sdsStyle:o,sectionProps:e.sectionProps},i)},F=(e,r,s,c,l,u)=>{let d=r===a;return(0,X.jsx)(H,{...u,active:d,sdsStyle:`minimal`,onClick:t=>{i(r),e.onClick?.(t)},hasInvertedStyle:t,isNarrow:n,innerSdsStyle:o,navVariant:`primary`,size:`medium`,children:(0,X.jsxs)(U,{active:d,hasInvertedStyle:t,isNarrow:n,navVariant:`primary`,children:[(0,X.jsx)(G,{active:d,isNarrow:n,children:s}),(0,X.jsx)(K,{"aria-hidden":`true`,isNarrow:n,children:s}),c&&(0,X.jsx)(ot,{label:c,color:l,hover:!1})]})},r)},se=r.find(e=>e.itemType===`dropdown`&&e.key===b);return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(mt,{isNarrow:n,children:r.map(e=>{let{key:t,label:r,tag:i,tagColor:a,onClick:s,...c}=e;return e.itemType===`dropdown`&&!n&&o===`drawer`?ae(e,t,r,s,c):e.itemType===`dropdown`&&!n&&o===`dropdown`?oe(e,t,r,s,c):e.itemType===`dropdown`&&n?N(e,t):F(e,t,r,`tag`in e?i:void 0,`tagColor`in e?a:void 0,c)})}),o===`drawer`&&!n&&(0,X.jsx)(We,{anchor:`top`,open:C,onClose:()=>{E(null),D(null)},hasInvertedStyle:t,hideBackdrop:!1,disableScrollLock:!0,transitionDuration:100,topOffset:f,SlideProps:{onMouseEnter:ne,onMouseLeave:k},children:(0,X.jsx)(Ge,{hasInvertedStyle:t,style:{opacity:+!x},children:se&&(()=>{let e=St(j(se.items,se.key)),n=Object.keys(e),r=n.length>1||n.some(e=>e!==``),i=n.reduce((e,t)=>e+(se.sectionProps?.[t]?.colSpan||1),0),a=[];return n.forEach(t=>{let n=se.sectionProps?.[t]||{},r=n.colSpan||1,i=e[t];if(r<=1)a.push({section:t,items:i,sectionProps:n,showHeader:!0,isLastColumn:!0});else{let e=Math.ceil(i.length/r);for(let o=0;o<r;o++){let s=o*e,c=s+e;a.push({section:t,items:i.slice(s,c),sectionProps:n,showHeader:o===0,isLastColumn:o===r-1})}}}),a.map((e,n)=>(0,X.jsx)(Ke,{hasInvertedStyle:t,totalColumns:i,children:(0,X.jsx)(wt,{drawerItems:e.items,sectionProps:e.sectionProps,section:e.section,hasMultipleSections:r,hasInvertedStyle:t,showHeader:e.showHeader,isLastColumn:e.isLastColumn,onItemClick:()=>{E(null),D(null)}})},`drawer-column-${e.section}-${n}`))})()})})]})}var Bt,X,Vt=t((()=>{st(),ft(),Bt=e(n()),xt(),_e(),fe(),N(),S(),Ct(),at(),Tt(),It(),Rt(),X=o()})),Ht,Ut=t((()=>{d(),A(),R(),I(),Ht=u(z,{target:`es7myp0`})({name:`ti75j2`,styles:`margin:0`})}));function Wt({menuProps:e,items:t,hasInvertedStyle:n,isNarrow:r,sdsStyle:i=`dropdown`,expandedAccordion:a,setExpandedAccordion:o,accordionRefs:s,scrollToAccordion:c,onDrawerStateChange:l,topOffset:u=0,onClose:d,onDrawerStyleNavItemHover:f}){let p=h(),{anchorEl:m,activeDropdownKey:g,activeDrawerKey:_,contentKey:v,isContentFading:y,open:b,drawerOpen:x,buttonRef:S,menuWidth:C,setAnchorEl:ee,setActiveDropdownKey:w,setActiveDrawerKey:te,setContentKey:T,onClose:E,onDrawerClose:D,onDrawerOpen:O,cancelDrawerClose:k}=Lt();function A(){E(),r&&d?.()}(0,Gt.useEffect)(()=>{i===`drawer`&&l&&l(x)},[x,i,l]);let ne=(e,t,a,o,s)=>{let c=x&&_===t,{defaultUrl:l,component:u,target:d,rel:p}=e,m=l&&!u?`a`:u,h=e=>{o?.(e)};return(0,Z.jsx)(it,{onMouseEnter:()=>{f?.(e),O(t)},onMouseLeave:D,children:(0,Z.jsxs)(H,{...s,hasInvertedStyle:n,active:c,isNarrow:r,sdsStyle:`minimal`,innerSdsStyle:i,navVariant:`secondary`,onClick:h,component:m,href:l,target:d,rel:p,size:`medium`,children:[(0,Z.jsx)(G,{active:c,isNarrow:r,children:a}),(0,Z.jsx)(K,{"aria-hidden":`true`,isNarrow:r,children:a}),(0,Z.jsx)(P,{sdsIcon:c?`ChevronUp`:`ChevronDown`,sdsSize:`xs`})]})},t)},re=(t,a,o,s,c)=>{let l=b&&g===a;return(0,Z.jsxs)(Gt.Fragment,{children:[(0,Z.jsxs)(H,{...c,ref:S,hasInvertedStyle:n,active:l,isNarrow:r,sdsStyle:`minimal`,innerSdsStyle:i,navVariant:`secondary`,onClick:e=>{ee(e.currentTarget),w(a),s?.(e)},size:`medium`,children:[(0,Z.jsx)(G,{active:l,isNarrow:r,children:o}),(0,Z.jsx)(K,{"aria-hidden":`true`,isNarrow:r,children:o}),(0,Z.jsx)(P,{sdsIcon:l?`ChevronUp`:`ChevronDown`,sdsSize:`xs`})]}),(0,Z.jsx)(ve,{anchorEl:m,open:l,onClose:A,slotProps:{paper:{style:{marginTop:p?.app?.spacing?.s}}},anchorOrigin:{horizontal:`left`,vertical:`bottom`},transformOrigin:{horizontal:`left`,vertical:`top`},...e,disablePortal:!0,children:(()=>{let e=St(t.items),i=Object.keys(e),a=i.length>1||i.some(e=>e!==``);return i.map((t,i)=>{let o=e[t];return(0,Z.jsxs)(`div`,{children:[a&&i>0&&(0,Z.jsx)(yt,{hasSection:!!t,isNarrow:r,hasInvertedStyle:n}),t&&a&&(0,Z.jsx)(ht,{isNarrow:r,hasInvertedStyle:n,children:t}),o.map(e=>{let{label:t,onClick:n,...r}=e;return(0,Z.jsx)(B,{onClick:e=>{n?.(e),A()},sdsType:`action`,sx:{minWidth:C},...r,icon:void 0,children:t},`menu-item-${t}`)})]},`section-${t||`default`}`)})})()})]},a)},ie=(e,t)=>{let l=`${e.label?.toString().toLowerCase().replace(` `,`-`)}-dropdown`;return(0,Z.jsx)(Ft,{accordionId:l,label:e.label,items:e.items,expandedAccordion:a,setExpandedAccordion:o,accordionRefs:s,scrollToAccordion:c,hasInvertedStyle:n,isNarrow:r,chevronSize:r?`s`:`xs`,onClose:A,sdsStyle:i,sectionProps:e.sectionProps},l)},j=(e,t,i,a,o,s)=>(0,Z.jsxs)(H,{...s,onClick:t=>{e.onClick?.(t)},hasInvertedStyle:n,active:!1,isNarrow:r,sdsStyle:`minimal`,navVariant:`secondary`,size:`medium`,children:[i,a&&(0,Z.jsx)(Ht,{label:a,color:o,hover:!1})]},t),M=t.find(e=>e.itemType===`dropdown`&&e.key===v);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(mt,{isNarrow:r,children:t.map(e=>{let{key:t,label:n,tag:a,tagColor:o,onClick:s,...c}=e;return e.itemType===`dropdown`&&!r&&i===`drawer`?ne(e,t,n,s,c):e.itemType===`dropdown`&&!r&&i===`dropdown`?re(e,t,n,s,c):e.itemType===`dropdown`&&r?ie(e,t):j(e,t,n,`tag`in e?a:void 0,`tagColor`in e?o:void 0,c)})}),i===`drawer`&&!r&&(0,Z.jsx)(We,{anchor:`top`,open:x,onClose:()=>{te(null),T(null)},hasInvertedStyle:n,hideBackdrop:!1,disableScrollLock:!0,transitionDuration:100,topOffset:u,SlideProps:{onMouseEnter:k,onMouseLeave:D},children:(0,Z.jsx)(Ge,{hasInvertedStyle:n,style:{opacity:+!y},children:M&&(()=>{let e=St(M.items),t=Object.keys(e),r=t.length>1||t.some(e=>e!==``),i=t.reduce((e,t)=>e+(M.sectionProps?.[t]?.colSpan||1),0),a=[];return t.forEach(t=>{let n=M.sectionProps?.[t]||{},r=n.colSpan||1,i=e[t];if(r<=1)a.push({section:t,items:i,sectionProps:n,showHeader:!0,isLastColumn:!0});else{let e=Math.ceil(i.length/r);for(let o=0;o<r;o++){let s=o*e,c=s+e;a.push({section:t,items:i.slice(s,c),sectionProps:n,showHeader:o===0,isLastColumn:o===r-1})}}}),a.map((e,t)=>(0,Z.jsx)(Ke,{hasInvertedStyle:n,totalColumns:i,children:(0,Z.jsx)(wt,{drawerItems:e.items,sectionProps:e.sectionProps,section:e.section,hasMultipleSections:r,hasInvertedStyle:n,showHeader:e.showHeader,isLastColumn:e.isLastColumn,onItemClick:()=>{te(null),T(null)}})},`drawer-column-${e.section}-${t}`))})()})})]})}var Gt,Z,Kt=t((()=>{Gt=e(n()),xt(),Ut(),ft(),_e(),N(),fe(),S(),Ct(),at(),Tt(),It(),Rt(),Z=o()}));function qt(e){let{children:t,window:n,shouldElevate:r=!0}=e,i=h(),a=i.palette.mode,o=re({disableHysteresis:!0,target:n?n():void 0,threshold:0}),s=f`
    border-bottom: 1px solid ${i.palette?.sds?.base?.borderSecondary};
  `;return t?Jt.cloneElement(t,{elevation:o&&r?14:0,sx:o&&r?{...e.sx||{},...a===`dark`&&s}:void 0}):null}var Jt,Yt=t((()=>{S(),Jt=e(n())})),Q,$,Xt,Zt,Qt=t((()=>{Q=e(n()),S(),ie(),at(),Vt(),Kt(),N(),F(),Yt(),A(),le(),$=o(),Xt=500,Zt=(0,Q.forwardRef)((e,t)=>{let{activePrimaryNavKey:n,buttons:r,sdsStyle:i=`dropdown`,menuProps:a={disableScrollLock:!0,disablePortal:!0},backgroundAppearance:o=`matchBackground`,logo:s,logoUrl:c,logoLinkComponent:l=`a`,logoLinkProps:u,scrollElevation:d=!0,primaryNavItems:f,primaryNavPosition:p=`left`,searchProps:m,secondaryNavItems:g,setActivePrimaryNavKey:_,showSearch:v=!0,tag:y,tagColor:b,title:x,drawerOpen:S,setDrawerOpen:C,isSticky:ee=!0,topComponentSlot:w,onDrawerStyleNavItemHover:T,...E}=e,O=(0,Q.useRef)(null),k=(0,Q.useRef)(null),[A,ne]=(0,Q.useState)(0),[re,ie]=(0,Q.useState)(``),j=n??re,M=e=>{ie(e),_&&_(e)},ae=h(),oe=D({theme:ae}),N=te(ae.breakpoints.down(`md`)),F=(0,Q.useMemo)(()=>oe===`light`?o===`dark`:!1,[o,oe]),[le,I]=(0,Q.useState)(!1),L=S??le,R=e=>{let t=typeof e==`function`?e(L):e;C?C(t):I(t)},[z,ue]=(0,Q.useState)({breakpoint:0,isNarrow:N}),[de,fe]=(0,Q.useState)(null),B=(0,Q.useRef)(new Map),[pe,me]=(0,Q.useState)(!1),[he,ge]=(0,Q.useState)(!1),_e=pe||he;(0,Q.useEffect)(()=>{ue(e=>({...e,isNarrow:N}))},[N]),(0,Q.useEffect)(()=>{if(!w||!k.current){ne(0);return}let e=()=>{if(k.current){let e=k.current.getBoundingClientRect().height;ne(e)}};e();let t=new ResizeObserver(e);return t.observe(k.current),()=>t.disconnect()},[w]);let ve=(0,Q.useCallback)(e=>{setTimeout(()=>{let t=B.current.get(e);if(t){let e=t.querySelector(`.MuiAccordionSummary-root`);if(e&&O.current){let n=t.closest(`.MuiDrawer-paper`);if(n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect(),a=O.current.getBoundingClientRect(),o=n.scrollTop+(t.top-r.top)-a.height-(i===`drawer`?0:8);n.scrollTo({top:Math.max(0,o),behavior:`smooth`})}}}},Xt)},[i]),V=(0,Q.useCallback)(e=>{me(e)},[]),xe=(0,Q.useCallback)(e=>{ge(e)},[]),we=(0,Q.useCallback)(()=>{if(!O.current)return;let e=O.current.clientWidth,t=O.current.scrollWidth,n=t>e;ue(r=>{let i=n?r.breakpoint>t?r.breakpoint:t:r.breakpoint;return{breakpoint:i,isNarrow:r.isNarrow?e<i:n}})},[]);(0,Q.useEffect)(()=>{we();let e=new ResizeObserver(we);return O.current&&e.observe(O.current),()=>e.disconnect()},[we]);let Ee=()=>v&&(0,$.jsx)(Fe,{id:`nav-bar-search`,label:`Search`,placeholder:`Search`,sdsStyle:`rounded`,hasInvertedStyle:F,isNarrow:z.isNarrow,...m}),Ae=()=>{let e=(0,$.jsxs)(je,{hasInvertedStyle:F,isNarrow:z.isNarrow,children:[s&&(0,$.jsx)(ke,{children:s}),(x||y)&&(0,$.jsxs)(Me,{children:[x&&(0,$.jsx)(`p`,{children:x}),y&&(0,$.jsx)(Ne,{color:b,label:y,hover:!1})]})]});return(l||c)&&(e=(0,$.jsx)(Oe,{component:l,href:c,...u,isNarrow:z.isNarrow,children:e})),e},Ie=()=>f&&f.length>0&&(0,$.jsx)(zt,{items:f,value:j,onChange:M,hasInvertedStyle:F,isNarrow:z.isNarrow,menuProps:a,sdsStyle:i,expandedAccordion:de,setExpandedAccordion:fe,accordionRefs:B,scrollToAccordion:ve,onDrawerStateChange:V,topOffset:A,onClose:()=>R(!1),onDrawerStyleNavItemHover:T}),Ve=()=>g&&g.length>0&&(0,$.jsx)(Wt,{items:g,hasInvertedStyle:F,isNarrow:z.isNarrow,menuProps:a,sdsStyle:i,expandedAccordion:de,setExpandedAccordion:fe,accordionRefs:B,scrollToAccordion:ve,onDrawerStateChange:xe,topOffset:A,onClose:()=>R(!1),onDrawerStyleNavItemHover:T}),He=()=>!r||r.length===0?null:(0,$.jsx)(Le,{hasInvertedStyle:F,isNarrow:z.isNarrow,children:r.map((e,t)=>We(e,t))}),We=(e,t)=>{let n=`button-${t}`,r=z.isNarrow?{width:`100%`}:void 0;if(Q.isValidElement(e)){let t=e.props?.onClick,i=z.isNarrow?e=>{t?.(e),R(!1)}:t;return Q.cloneElement(e,{hasInvertedStyle:F,key:n,onClick:i,backgroundAppearance:o,sx:{...e.props?.sx||{},...r}})}if(typeof e==`object`&&e){let t={...e,backgroundAppearance:o},i=ce(t.children);return i&&z.isNarrow?Ge(t,n,r):i&&!z.isNarrow?Ke(t,n):qe(t,n,r)}return null},Ge=(e,t,n)=>{let r=e.onClick,i=z.isNarrow?e=>{r?.(e),R(!1)}:r;return(0,$.jsx)(Te,{sx:n,hasInvertedStyle:F,...e,onClick:i,sdsStyle:`minimal`,sdsType:`secondary`,size:`large`,isNarrow:z.isNarrow,children:e.children},t)},Ke=(e,t)=>(0,$.jsx)(De,{"aria-label":String(e.children),hasInvertedStyle:F,sdsStyle:`minimal`,sdsType:`primary`,size:`large`,...e},t),qe=(e,t,n)=>{let r=e.onClick,i=z.isNarrow?e=>{r?.(e),R(!1)}:r;return(0,$.jsx)(Ce,{size:`large`,sx:n,...e,onClick:i,hasInvertedStyle:F},t)},Je=(()=>{let e=Ae(),t=Ee(),n=Ie(),r=Ve(),i=He();return(0,$.jsxs)(Se,{hasInvertedStyle:F,isNarrow:z.isNarrow,children:[e,!z.isNarrow&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(Pe,{primaryNavPosition:p,showSearch:v,isNarrow:z.isNarrow,children:p===`left`?(0,$.jsxs)($.Fragment,{children:[n,t]}):(0,$.jsxs)($.Fragment,{children:[t,n]})}),r,i]}),z.isNarrow&&(0,$.jsx)(Be,{sdsType:`secondary`,sdsStyle:`minimal`,size:`large`,backgroundOnHover:!1,onClick:()=>R(e=>!e),hasInvertedStyle:F,children:(0,$.jsx)(P,{sdsSize:`l`,sdsIcon:L?`XMark`:`LinesHorizontal3`})})]})})(),Ye=Ee(),Xe=Ie(),Ze=Ve(),Qe=He(),$e=i===`drawer`||ee?`sticky`:`relative`,et=d&&!(i===`drawer`&&_e);return(0,$.jsxs)($.Fragment,{children:[w&&(0,$.jsx)(ye,{ref:k,children:w}),(0,$.jsx)(qt,{...e,shouldElevate:et,children:(0,$.jsx)(be,{elevation:0,hasInvertedStyle:F,ref:se([t,O]),"aria-label":`Main navigation`,tabIndex:0,position:$e,style:{top:A},...E,children:Je})}),z.isNarrow&&L&&(0,$.jsx)(Re,{anchor:`right`,open:L,onClose:()=>R(!1),hasInvertedStyle:F,topOffset:A,role:`dialog`,"aria-label":`Navigation menu`,disableScrollLock:!1,children:(0,$.jsxs)(ze,{children:[(0,$.jsxs)(`div`,{children:[Ye,Xe,Xe&&Ze&&(0,$.jsx)(Ue,{hasInvertedStyle:F}),Ze]}),Qe]})})]})})}));export{Qt as n,Zt as t};