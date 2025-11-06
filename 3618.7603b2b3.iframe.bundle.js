"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[3618],{"./packages/components/src/core/Accordion/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Zi:()=>components_AccordionDetails,u:()=>components_AccordionHeader,Ay:()=>core_Accordion});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),AccordionDetails=__webpack_require__("./node_modules/@mui/material/AccordionDetails/AccordionDetails.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const StyledAccordionDetails=(0,emotion_styled_browser_esm.A)(AccordionDetails.A,{target:"e1gzlo0w0"})(styles.JU," ",(props=>{const spaces=(0,styles.oZ)(props);return(0,emotion_react_browser_esm.AH)("padding:",spaces?.xxs,"px ",spaces?.m,"px ",spaces?.m,"px;")})),components_AccordionDetails=props=>{const{children,id,...rest}=props;return(0,jsx_runtime.jsx)(StyledAccordionDetails,{id,...rest,children})};var AccordionSummary=__webpack_require__("./node_modules/@mui/material/AccordionSummary/AccordionSummary.js"),accordionSummaryClasses=__webpack_require__("./node_modules/@mui/material/AccordionSummary/accordionSummaryClasses.js");const doNotForwardProps=["chevronSize","hasInvertedStyle"],StyledAccordionHeader=(0,emotion_styled_browser_esm.A)(AccordionSummary.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"epo1s5k0"})(styles.j0," ",(props=>{const{chevronSize}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("padding:",spaces?.m,"px;align-items:flex-start;box-sizing:border-box;.",accordionSummaryClasses.A.content,"{margin:0;flex-direction:column;padding-right:",spaces?.s,"px;&.",accordionSummaryClasses.A.expanded,"{margin:0;}}& .",accordionSummaryClasses.A.expandIconWrapper,"{margin-top:","xs"===chevronSize?spaces?.xs:spaces?.xxs,"px !important;svg{color:",semanticColors?.base?.ornamentSecondary,";}}&:hover{& .",accordionSummaryClasses.A.expandIconWrapper,"{svg{color:",semanticColors?.base?.ornamentSecondaryHover,";}}}")})),StyledSubtitle=(0,emotion_styled_browser_esm.A)("p",{target:"epo1s5k1"})(styles.Pf," ",(props=>{const semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("color:",semanticColors?.base?.textSecondary,";margin:0;")}));var Icon=__webpack_require__("./packages/components/src/core/Icon/index.tsx");const components_AccordionHeader=props=>{const{children,subtitle,chevronSize="xs",...rest}=props;return(0,jsx_runtime.jsxs)(StyledAccordionHeader,{chevronSize,expandIcon:(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:"ChevronDown",sdsSize:chevronSize}),...rest,children:[children,subtitle&&(0,jsx_runtime.jsx)(StyledSubtitle,{children:subtitle})]})};var Accordion=__webpack_require__("./node_modules/@mui/material/Accordion/Accordion.js"),accordionClasses=__webpack_require__("./node_modules/@mui/material/Accordion/accordionClasses.js"),accordionDetailsClasses=__webpack_require__("./node_modules/@mui/material/AccordionDetails/accordionDetailsClasses.js"),a11y=__webpack_require__("./packages/components/src/core/styles/common/mixins/a11y.ts");const sdsPropNames=["useDivider","togglePosition","chevronSize"],StyledAccordion=(0,emotion_styled_browser_esm.A)(Accordion.A,{shouldForwardProp:prop=>!sdsPropNames.includes(prop.toString()),target:"escj8oa0"})((props=>{const{useDivider,togglePosition}=props,shadows=(0,styles.CG)(props),borders=(0,styles.ow)(props),spaces=(0,styles.oZ)(props);return(0,emotion_react_browser_esm.AH)("&.",accordionClasses.A.root,"{background-color:transparent;background-image:none;box-shadow:",shadows?.none,";border-bottom:",useDivider?borders?.base?.divider:"none",";height:fit-content;padding:",spaces?.s,"px;& .",accordionSummaryClasses.A.root,"{",(0,styles.M$)(props)," ",(0,a11y.U)(props),"          padding:0;min-height:unset;&.",accordionSummaryClasses.A.focusVisible,"{background-color:unset;}&.",accordionSummaryClasses.A.expanded,"{min-height:unset;}& .MuiAccordionSummary-expandIcon,& .",accordionSummaryClasses.A.expandIconWrapper,"{padding:0;align-self:flex-start;}}.",accordionDetailsClasses.A.root,"{",(0,styles.Zo)(props),"          padding:",spaces?.l,"px 0 0 0;}&:before{opacity:0;}&.",accordionClasses.A.expanded,"{margin:0;}","left"===togglePosition&&leftPosition(props),"}")})),leftPosition=props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props);return(0,emotion_react_browser_esm.AH)("&.",accordionClasses.A.root,"{& .",accordionSummaryClasses.A.root,"{flex-direction:row-reverse;padding:0;.",accordionSummaryClasses.A.content,"{padding-left:",spaces?.s,"px;}.",accordionSummaryClasses.A.expandIconWrapper,"{margin:0;transform:rotate(-90deg);align-self:flex-start;&.",accordionSummaryClasses.A.expanded,"{transform:rotate(0deg);}}}& .",accordionDetailsClasses.A.root,"{padding-left:",(spaces?.s??8)+(iconSizes?.xs.width??12),"px;}}")},core_Accordion=react.forwardRef(((props,ref)=>{const{id,children,useDivider,togglePosition="right",defaultExpanded=!1,...rest}=props,[expanded,setExpanded]=react.useState(!!defaultExpanded&&id),enhancedChildren=react.Children.map(children,(child=>{if(react.isValidElement(child)){if(child.type===components_AccordionHeader)return react.cloneElement(child,{...child.props,"aria-controls":`${id}-content`,id:`${id}-header`});if(child.type===components_AccordionDetails)return react.cloneElement(child,{...child.props,id:`${id}-content`})}return child}))||children;return(0,jsx_runtime.jsx)(StyledAccordion,{square:!0,useDivider,togglePosition,ref,expanded:expanded===id,onChange:(panel=id,(_event,isExpanded)=>{setExpanded(!!isExpanded&&panel)}),...rest,children:enhancedChildren});var panel}))},"./packages/components/src/core/Banner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Banner});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),Icon=__webpack_require__("./packages/components/src/core/Icon/index.tsx"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Button=__webpack_require__("./packages/components/src/core/Button/index.tsx"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const Centered=(0,emotion_styled_browser_esm.A)("div",{target:"es8mwmv0"})("flex:1 1 auto;display:flex;justify-content:center;align-items:center;"),doNotForwardPropsIconWrapper=["bannerType","intent"],IconWrapper=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardPropsIconWrapper.includes(prop),target:"es8mwmv1"})((props=>{const{bannerType,intent="info"}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props),iconColor="primary"===bannerType?semanticColors?.base?.ornamentOnFill:semanticColors?.[intent]?.ornament;return`\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-right: ${spaces?.m}px;\n      svg {\n        fill: ${iconColor};\n      }\n    `})),doNotForwardPropsButtonIcon=["bannerType","textChild","intent"],StyledButton=(0,emotion_styled_browser_esm.A)(Button.A,{shouldForwardProp:prop=>!doNotForwardPropsButtonIcon.includes(prop),target:"es8mwmv2"})("flex:0 0 auto;",(props=>{const{bannerType}=props,semanticColors=(0,styles.Bd)(props);return"primary"===bannerType?`\n        svg {\n          fill: ${semanticColors?.base?.ornamentOnFill};\n          opacity: .65;\n        }\n\n        svg:hover {\n          opacity: 1;\n        }\n      `:`\n      svg {\n        fill: ${semanticColors?.base?.ornamentPrimary};\n        opacity: .55;\n      }\n\n      svg:hover {\n        opacity: 1;\n      }\n    `})),doNotForwardProps=["sdsType","textChild","intent"],StyledBanner=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"es8mwmv4"})(styles.JU," ",(props=>{const{sdsType}=props,spaces=(0,styles.oZ)(props);return`\n      display: flex;\n      align-items: center;\n      padding: ${spaces?.xs}px ${spaces?.m}px;\n  \n      ${"primary"===sdsType?(props=>{const{intent="info"}=props,semanticColors=(0,styles.Bd)(props);return`\n    background-color: ${semanticColors?.[intent]?.surfacePrimary};\n    color: ${semanticColors?.base?.textOnFill};\n  `})(props):""}\n      ${"secondary"===sdsType?(props=>{const{intent="info"}=props,semanticColors=(0,styles.Bd)(props);return`\n    background-color: ${semanticColors?.[intent]?.surfaceSecondary};\n    color: ${semanticColors?.base?.textPrimary};\n  `})(props):""}\n    `})),core_Banner=(0,react.forwardRef)((function Banner(props,ref){const{children,dismissed,dismissible=!0,onClose,sdsType,icon,sdsIconProps,intent="info",...rest}=props,[wasDismissed,setWasDismissed]=(0,react.useState)(!1);if(dismissed||wasDismissed)return null;return(0,jsx_runtime.jsxs)(StyledBanner,{role:"banner",sdsType,intent,ref,...rest,children:[(0,jsx_runtime.jsxs)(Centered,{children:[(0,jsx_runtime.jsx)(IconWrapper,{bannerType:sdsType,intent,children:(()=>{if(icon)return"string"!=typeof icon?icon:(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:icon,sdsSize:"s",...sdsIconProps});switch(intent){case"positive":return(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:"CheckCircle",sdsSize:"s",...sdsIconProps});case"negative":case"notice":return(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:"ExclamationMarkCircle",sdsSize:"s",...sdsIconProps});default:return(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:"InfoCircle",sdsSize:"s",...sdsIconProps})}})()}),children]}),dismissible&&(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Close",bannerType:sdsType,sdsType:"tertiary",sdsSize:"small",sdsStyle:"icon",onClick:e=>{void 0===dismissed&&setWasDismissed(!0),onClose&&onClose(e)},icon:"XMark"})]})}))},"./packages/components/src/core/Link/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Link});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),Link=__webpack_require__("./node_modules/@mui/material/Link/Link.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const doNotForwardProps=["sdsStyle","sdsSize","fontWeight"],StyledLink=(0,emotion_styled_browser_esm.A)(Link.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop.toString()),target:"et9xikn0"})("all:unset;",styles.UT," ",(props=>{const{fontWeight="normal",sdsStyle="default",sdsSize="s"}=props;return(0,emotion_react_browser_esm.AH)("default"===sdsStyle&&(props=>{const semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("color:",semanticColors?.accent?.textAction,";position:relative;text-decoration:none;text-underline-offset:2.5px;&:hover{color:",semanticColors?.accent?.textActionHover,";text-decoration:underline;}&:focus{color:",semanticColors?.accent?.textActionHover,";text-decoration:underline;}&:active{color:",semanticColors?.accent?.textActionPressed,";text-decoration:underline;}")})(props)," ","dashed"===sdsStyle&&(0,emotion_react_browser_esm.AH)("color:inherit;position:relative;text-decoration:underline dashed;text-underline-offset:2.5px;&:hover,&:focus,&:active,&:focus-visible{text-decoration-style:solid;}")," ","s"===sdsSize&&(props=>(0,styles.JU)(props))(props)," ","xs"===sdsSize&&(props=>(0,styles.Zo)(props))(props),"      font-weight:","normal"===fontWeight?"400":"600",";display:inline-block;cursor:pointer;")})),core_Link=(0,react.forwardRef)(((props,ref)=>{const{sdsStyle="default",...rest}=props;return(0,jsx_runtime.jsx)(StyledLink,{...rest,sdsStyle,underline:"default"===sdsStyle?"hover":"always",ref})}))},"./packages/components/src/core/List/components/ListSubheader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>components_ListSubheader});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ListSubheader=__webpack_require__("./node_modules/@mui/material/ListSubheader/ListSubheader.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const fontHeaderM=(0,styles.LV)("m"),StyledListSubheader=(0,emotion_styled_browser_esm.A)(ListSubheader.A,{target:"e1fq0wuu0"})("&.MuiListSubheader-root{",fontHeaderM,"    line-height:unset;color:unset;",(props=>{const spaces=(0,styles.oZ)(props);return`\n        margin-bottom: ${spaces?.l}px;\n      `}),"}"),components_ListSubheader=props=>(0,jsx_runtime.jsx)(StyledListSubheader,{disableGutters:!0,...props})},"./packages/components/src/core/Menu/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Menu});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Menu=__webpack_require__("./node_modules/@mui/material/Menu/Menu.js"),menuClasses=__webpack_require__("./node_modules/@mui/material/Menu/menuClasses.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const StyledMenu=(0,emotion_styled_browser_esm.A)(Menu.A,{target:"e1887nu20"})("&{.",menuClasses.A.paper,"{",(props=>{const spaces=(0,styles.oZ)(props),corners=(0,styles.VP)(props),semanticColors=(0,styles.Bd)(props);return`\n          background-color: ${semanticColors?.base?.surface};\n          background-image: none;\n          padding: ${spaces?.xs}px;\n          border-radius: ${corners?.l}px;\n        `}),"}.MuiList-padding{padding:0;}}"),ANCHOR_ORIGIN={horizontal:"center",vertical:"bottom"},TRANSFORM_ORIGIN={horizontal:"center",vertical:"top"},core_Menu=props=>(0,jsx_runtime.jsx)(StyledMenu,{anchorOrigin:ANCHOR_ORIGIN,transformOrigin:TRANSFORM_ORIGIN,...props})},"./packages/components/src/core/NavigationHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_NavigationHeader});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),useMediaQuery=__webpack_require__("./node_modules/@mui/system/esm/useMediaQuery/useMediaQuery.js"),useTheme=__webpack_require__("./node_modules/@mui/material/styles/useTheme.js"),AppBar=__webpack_require__("./node_modules/@mui/material/AppBar/AppBar.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),Toolbar=__webpack_require__("./node_modules/@mui/material/Toolbar/Toolbar.js"),Drawer=__webpack_require__("./node_modules/@mui/material/Drawer/Drawer.js"),Divider=__webpack_require__("./node_modules/@mui/material/Divider/Divider.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts"),Tag=__webpack_require__("./packages/components/src/core/Tag/index.tsx"),InputSearch=__webpack_require__("./packages/components/src/core/InputSearch/index.tsx"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Link=__webpack_require__("./packages/components/src/core/Link/index.tsx"),core_Button=__webpack_require__("./packages/components/src/core/Button/index.tsx"),Accordion=__webpack_require__("./packages/components/src/core/Accordion/index.tsx");const doNotForwardProps=["hasInvertedStyle","isNarrow","primaryNavPosition","showSearch","logoLinkComponent","logoLinkProps","defaultUrl","hasDetails","hasIcon","sectionProps"],StyledTopComponentSlot=(0,emotion_styled_browser_esm.A)("div",{target:"esvu0070"})("position:sticky;top:0;z-index:1300;"),StyledAppBar=(0,emotion_styled_browser_esm.A)(AppBar.A,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu0071"})((props=>{const colors=(0,styles.Bd)(props);return`\n      background-color: ${props.hasInvertedStyle?colors?.base.backgroundPrimaryDark:colors?.base.backgroundPrimary};\n      background-image: none;\n      max-width: 100%;\n      overflow-x: auto;\n      z-index: ${props.theme?.zIndex?.drawer?props.theme.zIndex.drawer+10:1210};\n    `})),StyledToolbar=(0,emotion_styled_browser_esm.A)(Toolbar.A,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu0072"})((props=>{const{isNarrow}=props,spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      &.MuiToolbar-root {
        min-height: 48px;
        max-height: 48px;
        padding: ${spaces?.s}px ${spaces?.l}px;

        ${isNarrow&&(props=>{const semanticColors=(0,styles.Bd)(props);return emotion_react_browser_esm.AH`
    border-bottom: 1px solid
      ${props.hasInvertedStyle?semanticColors?.base.dividerOnDark:semanticColors?.base.divider};
    background-color: ${props.hasInvertedStyle?semanticColors?.base.backgroundPrimaryDark:semanticColors?.base.backgroundPrimary};
    background-image: none;
    box-shadow: none;
    position: sticky !important;
    top: 0;
    justify-content: space-between;
  `})(props)}
      }
    `})),StyledHeaderButton=(0,emotion_styled_browser_esm.A)(core_Button.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"esvu0075"})((props=>{const{sdsType,hasInvertedStyle,isNarrow}=props,mode=props?.theme?.palette?.mode||"light",semanticColors=(0,styles.Bd)(props),secondaryButtonStyles=`\n      box-shadow: inset 0 0 0 1px ${"light"===mode?"white":semanticColors?.accent?.fillPrimary};\n      color: ${"light"===mode?"white":semanticColors?.accent?.fillPrimary};\n      &:hover {\n        background-color: ${semanticColors?.accent?.fillHover};\n        box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.fillHover};\n        color: ${semanticColors?.base?.textPrimaryOnDark};\n      }\n    `;return emotion_react_browser_esm.AH`
      ${"secondary"===sdsType&&hasInvertedStyle?secondaryButtonStyles:""}
      ${isNarrow&&(0,styles.Aj)(props)}
    `})),StyledNarrowIconButton=(0,emotion_styled_browser_esm.A)(core_Button.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"esvu0076"})((props=>{const{hasInvertedStyle,isNarrow}=props;return emotion_react_browser_esm.AH`
      ${hasInvertedStyle&&(props=>{const semanticColors=(0,styles.Bd)(props);return emotion_react_browser_esm.AH`
    color: ${semanticColors?.base?.textPrimaryOnDark};
    svg {
      fill: ${semanticColors?.base?.ornamentPrimaryOnDark};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      color: ${semanticColors?.base?.textPrimaryOnDark};
      svg {
        fill: ${semanticColors?.base?.ornamentPrimaryOnDark};
      }
    }
  `})(props)}
      ${isNarrow&&(0,styles.Aj)(props)}
    `})),invertedWideButtonStyles=props=>{const semanticColors=(0,styles.Bd)(props);return emotion_react_browser_esm.AH`
    svg {
      fill: ${semanticColors?.base?.ornamentSecondaryOnDark};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      svg {
        fill: ${semanticColors?.base?.ornamentPrimaryOnDark};
      }
    }
  `},StyledWideIconButton=(0,emotion_styled_browser_esm.A)(core_Button.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"esvu0077"})((props=>{const{hasInvertedStyle}=props;return emotion_react_browser_esm.AH`
      ${hasInvertedStyle&&invertedWideButtonStyles(props)}
      margin: 0;
    `})),StyledLogoLinkWrapper=(0,emotion_styled_browser_esm.A)(Link.A,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu0078"})("align-items:center;display:flex;text-decoration:none !important;",(props=>{const{isNarrow}=props;return emotion_react_browser_esm.AH`
      width: ${isNarrow?"100%":"auto"};
    `})),StyledLogoWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"esvu0079"})("display:flex;align-items:center;"),StyledTitleContainer=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00710"})("display:flex;align-items:center;",(props=>{const{isNarrow}=props,colors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      gap: ${spaces?.l}px;
      color: ${props.hasInvertedStyle?colors?.base.textPrimaryOnDark:colors?.base.textPrimary};
      margin-right: ${spaces?.xxl}px;
      width: 100%;

      ${isNarrow&&emotion_react_browser_esm.AH`
    p {
      margin: 0px;
      margin-block: 0px;
    }
  `}
    `})),StyledTitleTagWrapper=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00711"})((props=>{const spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      display: flex;
      align-items: center;
      gap: ${spaces?.xs}px;

      p {
        ${(0,styles.To)(props)}
        margin: 0;
        white-space: nowrap;
      }
    `})),StyledTag=(0,emotion_styled_browser_esm.A)(Tag.A,{target:"esvu00712"})("margin:0;"),StyledPrimaryNavContainer=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00713"})("align-items:center;display:flex;flex-grow:1;",(props=>{const{showSearch,primaryNavPosition,isNarrow}=props,spaces=(0,styles.oZ)(props),primaryNavPositionWithSearch="left"===primaryNavPosition?"flex-start":"space-between",primaryNavPositionWithoutSearch="left"===primaryNavPosition?"flex-start":"flex-end";return emotion_react_browser_esm.AH`
      flex-direction: ${isNarrow?"column":"row"};
      gap: ${spaces?.xxl}px;
      margin-right: ${spaces?.xxl}px;
      flex: 1;
      justify-content: ${showSearch?primaryNavPositionWithSearch:primaryNavPositionWithoutSearch};
    `})),StyledSearch=(0,emotion_styled_browser_esm.A)(InputSearch.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"esvu00714"})("margin:0;width:100%;",(props=>{const{hasInvertedStyle,isNarrow}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return emotion_react_browser_esm.AH`
      max-width: ${isNarrow?"100%":"320px"};
      padding-top: ${isNarrow?`${spaces?.m}px`:0};
      .MuiInputBase-root {
        color: ${hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary};
        fieldset {
          border-color: ${hasInvertedStyle?semanticColors?.base?.borderPrimaryOnDark:""};
        }

        .MuiInputBase-input {
          &::placeholder {
            color: ${hasInvertedStyle?semanticColors?.base?.textTertiaryOnDark:semanticColors?.base?.textTertiary};
            opacity: 1;
          }
        }

        .MuiInputAdornment-root {
          .MuiButtonBase-root:last-of-type {
            svg {
              color: ${hasInvertedStyle?semanticColors?.base?.ornamentSecondaryOnDark:""};
            }
          }
        }

        &:hover {
          fieldset {
            border-color: ${hasInvertedStyle?semanticColors?.base?.borderPrimaryHoverOnDark:""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle?semanticColors?.base?.ornamentPrimaryOnDark:""};
              }
            }
          }
        }

        &.Mui-focused {
          fieldset {
            border-color: ${hasInvertedStyle?semanticColors?.base?.borderPrimaryPressedOnDark:""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle?semanticColors?.base?.ornamentPrimaryOnDark:""};
              }
            }
          }
        }

        &.Mui-disabled {
          fieldset {
            border-color: ${hasInvertedStyle?semanticColors?.base?.borderPrimaryDisabledOnDark:""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle?semanticColors?.base?.ornamentDisabledOnDark:""};
              }
            }
          }
        }
      }
    `})),StyledButtonSection=(0,emotion_styled_browser_esm.A)("section",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00715"})("display:flex;align-items:center;z-index:100;",(props=>{const{isNarrow}=props,spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      gap: ${spaces?.m}px;
      margin-left: ${spaces?.xxl}px;

      ${isNarrow&&(props=>{const spaces=(0,styles.oZ)(props),sizes=(0,styles.I7)(props),colors=(0,styles.Bd)(props),backgroundColor=props.hasInvertedStyle?colors?.base.backgroundPrimaryDark:colors?.base.backgroundPrimary;return emotion_react_browser_esm.AH`
    background: ${backgroundColor};
    gap: ${spaces?.l}px;
    flex-direction: column-reverse;
    margin-left: 0;
    margin-top: ${spaces?.xl}px;
    padding: ${spaces?.xl}px 0;
    position: sticky;
    bottom: 0;

    &::before {
      content: "";
      position: absolute;
      height: ${spaces?.xxl}px;
      width: 100%;
      background: linear-gradient(
        to top,
        ${backgroundColor} 0%,
        ${backgroundColor}00 100%
      );
      top: -${spaces?.xxl}px;
    }

    .MuiButton-icon .MuiSvgIcon-root {
      width: ${sizes?.l.width}px;
      height: ${sizes?.l.height}px;
    }
  `})(props)}
    `})),StyledDrawer=(0,emotion_styled_browser_esm.A)(Drawer.Ay,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle","topOffset"].includes(prop),target:"esvu00716"})((props=>{const colors=(0,styles.Bd)(props),{topOffset=0}=props;return`\n      .MuiDrawer-paper {\n        background: ${props.hasInvertedStyle?colors?.base.backgroundPrimaryDark:colors?.base.backgroundPrimary};\n        box-shadow: none;\n        background-image: none;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        top: ${topOffset}px;\n        height: calc(100% - ${topOffset}px);\n        justify-content: space-between;\n      }\n    `})),StyledDrawerContent=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00717"})((props=>{const spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      padding: 0 ${spaces?.l}px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `})),StyledNarrowButton=(0,emotion_styled_browser_esm.A)(core_Button.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"esvu00718"})((props=>{const{hasInvertedStyle}=props;return emotion_react_browser_esm.AH`
      ${hasInvertedStyle&&invertedWideButtonStyles(props)}
      margin: 0;
    `})),StyledAccordion=(0,emotion_styled_browser_esm.A)(Accordion.Ay,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00719"})("padding:0 !important;width:100%;min-width:unset;.MuiAccordionSummary-content{",styles.rr,"}.MuiAccordionDetails-root .MuiButtonBase-root .primary-text{",styles.JU,"}",(props=>{const{hasInvertedStyle,sdsStyle="dropdown"}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props),corners=(0,styles.VP)(props),textDefaultColor=hasInvertedStyle?semanticColors?.base.textSecondaryOnDark:semanticColors?.base.textSecondary,textOpenColor=hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary,ChevronDefaultColor=hasInvertedStyle?semanticColors?.base.ornamentSecondaryOnDark:semanticColors?.base.ornamentSecondary,ChevronOpenColor=hasInvertedStyle?semanticColors?.base?.ornamentSecondaryPressedOnDark:semanticColors?.base.ornamentSecondaryPressed;return emotion_react_browser_esm.AH`
      & > .MuiButtonBase-root {
        padding: ${spaces?.s}px ${spaces?.l}px !important;
        border-radius: ${corners?.l}px;
        color: ${textDefaultColor};

        svg {
          color: ${ChevronDefaultColor};
        }

        &[aria-expanded="true"] {
          position: sticky;
          border-radius: ${corners?.l}px;
          top: calc(48px + ${spaces?.s}px);
          z-index: 11;
          backdrop-filter: blur(8px);
          color: ${textOpenColor};
          background-color: ${hasInvertedStyle?semanticColors?.base?.fillPressedOnDark:semanticColors?.base?.fillPressed};

          &::before {
            content: "";
            position: absolute;
            top: -${spaces?.s}px;
            left: -${spaces?.l??0}px;
            right: -${spaces?.l??0}px;
            bottom: 0;
            background-color: ${hasInvertedStyle?semanticColors?.base?.backgroundPrimaryDark:semanticColors?.base?.backgroundPrimary};
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
              ${hasInvertedStyle?semanticColors?.base?.backgroundPrimaryDark:semanticColors?.base?.backgroundPrimary},
              transparent
            );
          }

          .MuiAccordionSummary-content {
            ${(0,styles.j0)(props)}
            position: relative;
            z-index: 12;
          }

          svg {
            color: ${ChevronOpenColor} !important;
          }
        }

        &:hover {
          width: 100%;
          box-shadow: none;
          background: ${hasInvertedStyle?semanticColors?.base.fillHoverOnDark:semanticColors?.base.fillHover};
          color: ${hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary};

          svg {
            color: ${hasInvertedStyle?semanticColors?.base?.ornamentSecondaryHoverOnDark:semanticColors?.base.ornamentSecondaryHover} !important;
          }
        }

        ${"drawer"===sdsStyle&&(props=>{const{hasInvertedStyle}=props,semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props),textOpenColor=hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary;return emotion_react_browser_esm.AH`
    border-radius: 0;

    &:hover {
      background-color: ${hasInvertedStyle?semanticColors?.base?.backgroundPrimaryDark:semanticColors?.base?.backgroundPrimary};
    }

    &[aria-expanded="true"] {
      position: sticky;
      border-radius: 0;
      top: calc(48px + ${spaces?.s}px);
      z-index: 11;
      backdrop-filter: blur(0px);
      color: ${textOpenColor};
      background-color: ${hasInvertedStyle?semanticColors?.base?.backgroundPrimaryDark:semanticColors?.base?.backgroundPrimary};
    }
  `})(props)}
      }

      .MuiCollapse-root .MuiAccordionDetails-root {
        padding: 0;
        margin-top: ${"drawer"===sdsStyle?spaces?.s:spaces?.xxs}px;

        .MuiButtonBase-root {
          ${"drawer"===sdsStyle?emotion_react_browser_esm.AH`
                padding: ${spaces?.s}px 0;
              `:emotion_react_browser_esm.AH`
                padding: ${spaces?.s}px ${spaces?.m}px ${spaces?.s}px
                  ${spaces?.xl}px !important;
              `}

          width: 100%;

          svg {
            color: ${semanticColors?.accent?.ornament};
          }

          .primary-text {
            color: ${hasInvertedStyle?semanticColors?.base.textSecondaryOnDark:semanticColors?.base.textSecondary} !important;
          }

          &:hover {
            .primary-text {
              color: ${hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary} !important;
            }
          }
        }
      }
    `})),StyledSectionDivider=(0,emotion_styled_browser_esm.A)(Divider.A,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00720"})((props=>{const semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props);return`\n      margin: ${spaces?.s}px 0;\n      border-color: ${props.hasInvertedStyle?semanticColors?.base.dividerOnDark:semanticColors?.base.divider};\n    `})),StyledMegaMenuDrawer=(0,emotion_styled_browser_esm.A)(Drawer.Ay,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle","topOffset"].includes(prop),target:"esvu00721"})((props=>{const{hasInvertedStyle,topOffset=0}=props,semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      pointer-events: none;
      top: ${topOffset}px;

      .MuiDrawer-paper {
        background-color: ${hasInvertedStyle?semanticColors?.base.backgroundPrimaryDark:semanticColors?.base.backgroundPrimary};
        height: auto;
        max-height: calc(100vh - ${topOffset}px);
        overflow: visible;
        pointer-events: auto;
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.1);
        background-image: none;
        padding: ${spaces?.xl?spaces?.xl+48:48}px ${spaces?.xl}px
          ${spaces?.xxl}px;
        transform: translateY(48px);
        top: ${topOffset}px;
      }

      .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(2px);
        top: ${topOffset}px;
      }
    `})),StyledMegaMenuContent=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00722"})((props=>{const{hasInvertedStyle}=props,semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      background-color: ${hasInvertedStyle?semanticColors?.base.backgroundPrimaryDark:semanticColors?.base.backgroundPrimary};
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxl}px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      justify-content: center;
      transition: opacity 150ms ease-in-out;
    `})),StyledHoverDrawerColumn=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle","totalColumns"].includes(prop),target:"esvu00723"})((props=>{const spaces=(0,styles.oZ)(props),{totalColumns=1}=props,columnsPerRow=totalColumns>4?4:totalColumns,columnWidth=`calc((100% - (${columnsPerRow-1} * ${spaces?.xxl}px)) / ${columnsPerRow})`;return emotion_react_browser_esm.AH`
      display: flex;
      flex-direction: column;
      flex: 0 0 ${columnWidth};
      min-width: 240px;
      max-width: 400px;
    `})),StyledContentWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"esvu00724"})((props=>{const{needsHeaderPadding}=props,spaces=(0,styles.oZ)(props),typography=(0,styles.Of)(props),headerHeight=parseInt(typography?.wideStyles?.header?.semibold?.m?.lineHeight||"22px"),headerMargin=spaces?.m||12;return emotion_react_browser_esm.AH`
      & > *:last-child {
        margin-bottom: 0;
      }

      padding-top: ${needsHeaderPadding?headerHeight+headerMargin:0}px;
    `})),StyledHoverDrawerColumnHeader=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00725"})((props=>{const{hasInvertedStyle}=props,semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      ${(0,styles.M7)(props)}
      font-weight: 600;
      color: ${hasInvertedStyle?semanticColors?.base.textSecondaryOnDark:semanticColors?.base.textSecondary};
      padding: 0 0 0 56px;
      margin-bottom: ${spaces?.m}px;
    `})),StyledHoverDrawerItem=(0,emotion_styled_browser_esm.A)(core_Button.A,{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00726"})((props=>{const{hasInvertedStyle,hasDetails}=props,semanticColors=(0,styles.Bd)(props),corners=(0,styles.VP)(props),spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      border: none;
      outline: none;
      background: transparent;
      box-shadow: none;
      justify-content: flex-start;
      text-align: left;
      padding: ${hasDetails?spaces?.l:spaces?.m}px ${spaces?.l}px;
      margin-bottom: ${hasDetails?spaces?.s:0}px;
      border-radius: ${corners?.xl}px;
      min-height: auto;
      width: 100%;
      white-space: wrap;

      &:hover {
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        background: ${hasInvertedStyle?semanticColors?.base.fillHoverOnDark:semanticColors?.base.fillHover};
        svg {
          color: ${semanticColors?.accent?.ornament};
        }
      }
    `})),StyledHoverDrawerItemContent=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00727"})((props=>{const spaces=(0,styles.oZ)(props);return emotion_react_browser_esm.AH`
      display: flex;
      align-items: center;
      gap: ${spaces?.l}px;
      width: 100%;
    `})),StyledHoverDrawerItemIcon=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00728"})((props=>{const semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props),{hasDetails}=props;return emotion_react_browser_esm.AH`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${hasDetails?0:spaces?.xxs}px;
      color: ${semanticColors?.accent?.ornament};

      svg {
        color: ${semanticColors?.accent?.ornament};
      }
    `})),StyledHoverDrawerItemText=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00729"})((()=>emotion_react_browser_esm.AH`
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    `)),EmptyIcon=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00730"})((props=>{const{hasDetails}=props,spaces=(0,styles.oZ)(props),iconSize=(0,styles.I7)(props);return emotion_react_browser_esm.AH`
      width: ${hasDetails?iconSize?.l?.width:iconSize?.s?.width}px;
      height: ${hasDetails?iconSize?.l?.height:iconSize?.s?.height}px;
      padding: 0 ${hasDetails?0:spaces?.xxs}px;
      box-sizing: content-box;
    `})),StyledHoverDrawerItemTitle=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00731"})((props=>{const{hasInvertedStyle,hasDetails}=props,semanticColors=(0,styles.Bd)(props);return emotion_react_browser_esm.AH`
      ${hasDetails?(0,styles.qz)(props):(0,styles.M$)(props)}
      color: ${hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary};

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

      ${StyledHoverDrawerItem}:hover & {
        color: ${hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary};
      }
    `})),StyledHoverDrawerItemDetails=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00732"})((props=>{const{hasInvertedStyle}=props,semanticColors=(0,styles.Bd)(props);return emotion_react_browser_esm.AH`
      ${(0,styles.Zo)(props)}
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      color: ${hasInvertedStyle?semanticColors?.base.textSecondaryOnDark:semanticColors?.base.textSecondary};
    `})),StyledHoverDrawerActions=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00733"})((props=>{const spaces=(0,styles.oZ)(props),{isNarrow}=props;return emotion_react_browser_esm.AH`
      display: flex;
      flex-direction: row;
      gap: ${spaces?.xs}px;
      margin-top: ${spaces?.l}px;
      padding-left: ${isNarrow?`calc(${spaces?.l}px + ${spaces?.m}px)`:`calc(${spaces?.xxl}px + ${spaces?.xs}px)`};
      flex-wrap: wrap;
    `})),StyledButton=(0,emotion_styled_browser_esm.A)(core_Button.A,{target:"esvu00734"})((props=>{const{hasInvertedStyle}=props,colors=(0,styles.jM)(props),semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props),mode=(0,styles.Wi)(props);return emotion_react_browser_esm.AH`
      background-color: ${hasInvertedStyle?colors?.gray[700]:"dark"===mode?colors?.gray[100]:colors?.gray[200]};
      width: fit-content !important;
      padding: ${spaces?.s}px ${spaces?.m}px !important;
      color: ${hasInvertedStyle?semanticColors?.base?.textPrimaryOnDark:semanticColors?.base?.textPrimary};
    `})),StyledHoverDrawerContainer=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>![...doNotForwardProps,"sdsStyle"].includes(prop),target:"esvu00735"})("position:relative;"),style_StyledTag=(0,emotion_styled_browser_esm.A)(Tag.A,{target:"eb8fkpt1"})("margin:0;"),UnifiedNavItem_doNotForwardProps=["active","hasInvertedStyle","isNarrow","hasSection","innerSdsStyle","defaultUrl","hasDetails","hasIcon","sectionProps","navVariant","itemType"],NarrowNavItemStyles=props=>{const{active,hasInvertedStyle,innerSdsStyle,navVariant}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props),corners=(0,styles.VP)(props),ChevronHoverColor=hasInvertedStyle?semanticColors?.base?.ornamentSecondaryHoverOnDark:semanticColors?.base.ornamentSecondaryHover;return(0,emotion_react_browser_esm.AH)(active?(0,styles.j0)(props):(0,styles.rr)(props),"    border-radius:",corners?.l,"px;padding:",spaces?.s,"px\n      ","primary"===navVariant?spaces?.l:spaces?.m,"px;","primary"===navVariant?"justify-content: start;":""," ","drawer"===innerSdsStyle?emotion_react_browser_esm.AH`
          background-color: transparent !important;
        `:emotion_react_browser_esm.AH`
          background-color: ${active?hasInvertedStyle?semanticColors?.base?.fillPressedOnDark:semanticColors?.base?.fillPressed:"transparent"};
        `,"    width:100%;&:hover{","drawer"===innerSdsStyle?emotion_react_browser_esm.AH`
            background: transparent !important;
          `:emotion_react_browser_esm.AH`
            background: ${hasInvertedStyle?semanticColors?.base.fillHoverOnDark:semanticColors?.base.fillHover};
          `,"      box-shadow:none;","primary"===navVariant&&UnifiedNavItem_StyledLabel,"{color:",hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary,";}svg{color:",ChevronHoverColor," !important;}}")},UnifiedNavItem=(0,emotion_styled_browser_esm.A)(core_Button.A,{shouldForwardProp:prop=>!UnifiedNavItem_doNotForwardProps.includes(prop),target:"ec7c9cl0"})("display:flex;align-items:center;min-width:fit-content;border:none;background:transparent;",(props=>{const{hasInvertedStyle,isNarrow,active,navVariant}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props),corners=(0,styles.VP)(props),textDefaultColor=hasInvertedStyle?semanticColors?.base.textSecondaryOnDark:semanticColors?.base.textSecondary,textActiveColor=hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary,ChevronDefaultColor=hasInvertedStyle?semanticColors?.base.ornamentSecondaryOnDark:semanticColors?.base.ornamentSecondary,ChevronHoverColor=hasInvertedStyle?semanticColors?.base?.ornamentSecondaryHoverOnDark:semanticColors?.base.ornamentSecondaryHover,ChevronOpenColor=hasInvertedStyle?semanticColors?.base.ornamentSecondaryPressedOnDark:semanticColors?.base.ornamentSecondaryPressed;return["secondary"===navVariant&&(active?(0,styles.qz)(props):(0,styles.M$)(props)),(0,emotion_react_browser_esm.AH)("padding:",spaces?.xxxs,"px ",spaces?.m,"px;border-radius:",corners?.l,"px;background-color:",active?hasInvertedStyle?semanticColors?.base?.fillPressedOnDark:semanticColors?.base?.fillPressed:"transparent",";","secondary"===navVariant?emotion_react_browser_esm.AH`
              gap: ${spaces?.xs}px;
              color: ${active?textActiveColor:textDefaultColor};
              justify-content: flex-start;
              width: fit-content;
            `:"","        svg{color:",active?ChevronOpenColor:ChevronDefaultColor,";}&:hover{background:",hasInvertedStyle?semanticColors?.base.fillHoverOnDark:semanticColors?.base.fillHover," !important;box-shadow:none;","primary"===navVariant&&UnifiedNavItem_StyledLabel,"{color:",hasInvertedStyle?semanticColors?.base.textPrimaryOnDark:semanticColors?.base.textPrimary,";}svg{color:",ChevronHoverColor," !important;}}",isNarrow&&NarrowNavItemStyles(props))]})),UnifiedNavItem_StyledLabel=(0,emotion_styled_browser_esm.A)("span",{shouldForwardProp:prop=>!UnifiedNavItem_doNotForwardProps.includes(prop),target:"ec7c9cl1"})((props=>{const{hasInvertedStyle,active,isNarrow}=props,spaces=(0,styles.oZ)(props),colors=(0,styles.Bd)(props),activeColor=hasInvertedStyle?colors?.base.textPrimaryOnDark:colors?.base.textPrimary,inactiveColor=hasInvertedStyle?colors?.base.textSecondaryOnDark:colors?.base.textSecondary;return[active?(0,styles.qz)(props):(0,styles.M$)(props),(0,emotion_react_browser_esm.AH)("position:relative;display:flex;align-items:center;gap:",spaces?.xs,"px;color:",active?activeColor:inactiveColor,";",isNarrow&&emotion_react_browser_esm.AH`
          ${active?(0,styles.j0)(props):(0,styles.rr)(props)}
        `)]}));var ListSubheader=__webpack_require__("./packages/components/src/core/List/components/ListSubheader/index.tsx");const components_style_doNotForwardProps=["isNarrow","hasSection","hasInvertedStyle","sectionProps","sdsStyle"],StyledSection=(0,emotion_styled_browser_esm.A)("section",{shouldForwardProp:prop=>!components_style_doNotForwardProps.includes(prop),target:"e1ivk6r0"})("display:flex;align-items:center;",(props=>{const{isNarrow}=props,spaces=(0,styles.oZ)(props);return(0,emotion_react_browser_esm.AH)("column-gap:",spaces?.m,"px;row-gap:",spaces?.s,"px;",isNarrow&&(props=>{const spaces=(0,styles.oZ)(props);return(0,emotion_react_browser_esm.AH)("align-items:start;flex-direction:column;margin-top:",spaces?.m,"px;")})(props))})),StyledSectionHeader=(0,emotion_styled_browser_esm.A)(ListSubheader.A,{shouldForwardProp:prop=>!components_style_doNotForwardProps.includes(prop),target:"e1ivk6r1"})((props=>{const{isNarrow,hasInvertedStyle,sdsStyle}=props,semanticColors=(0,styles.Bd)(props),spaces=(0,styles.oZ)(props);function getTextColor(){return isNarrow&&hasInvertedStyle?semanticColors?.base.textSecondaryOnDark:semanticColors?.base?.textSecondary}return"drawer"===sdsStyle?(0,emotion_react_browser_esm.AH)((0,styles.qC)(props),"        top:0;color:",getTextColor()," !important;background-color:transparent;padding:0;margin-bottom:",spaces?.xxs,"px !important;"):(0,emotion_react_browser_esm.AH)("&.MuiListSubheader-root{",(0,styles.Uw)(props),"        top:0;color:",getTextColor(),";background-color:",function getBackgroundColor(){return isNarrow?hasInvertedStyle?semanticColors?.base.backgroundPrimaryDark:semanticColors?.base.backgroundPrimary:semanticColors?.base?.surface}(),";padding:",spaces?.xxs,"px ",isNarrow?spaces?.xl:spaces?.xs,"px;margin-bottom:0;}")})),StyledAccordionDetails=(0,emotion_styled_browser_esm.A)(Accordion.Zi,{shouldForwardProp:prop=>!components_style_doNotForwardProps.includes(prop),target:"e1ivk6r2"})((props=>{const{sdsStyle}=props,spaces=(0,styles.oZ)(props);return(0,emotion_react_browser_esm.AH)("drawer"===sdsStyle&&emotion_react_browser_esm.AH`
        display: flex;
        flex-direction: column;
        gap: ${spaces?.m}px;
      `)})),StyledAccordionSection=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!components_style_doNotForwardProps.includes(prop),target:"e1ivk6r3"})((props=>{const{sdsStyle,hasInvertedStyle}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props),corners=(0,styles.VP)(props);return"drawer"===sdsStyle?(0,emotion_react_browser_esm.AH)("border-radius:",corners?.xl,"px;padding:",spaces?.l,"px;background-color:",hasInvertedStyle?semanticColors?.base?.backgroundSecondaryOnDark:semanticColors?.base?.backgroundSecondary,";"):(0,emotion_react_browser_esm.AH)("padding:0;")})),StyledDivider=(0,emotion_styled_browser_esm.A)(Divider.A,{shouldForwardProp:prop=>!components_style_doNotForwardProps.includes(prop),target:"e1ivk6r4"})((props=>{const{hasSection,isNarrow,hasInvertedStyle}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("&.MuiDivider-root{position:relative;margin:0 0 ",hasSection?spaces?.s:spaces?.xxs,"px;border-bottom:solid 1px ",isNarrow&&hasInvertedStyle?semanticColors?.base?.dividerOnDark:semanticColors?.base?.divider,";padding-bottom:",spaces?.xxs,"px;}")})),StyledLabelTextWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1ivk6r5"})((props=>{const{active,isNarrow}=props;return[isNarrow?active?(0,styles.j0)(props):(0,styles.rr)(props):active?(0,styles.qz)(props):(0,styles.M$)(props),(0,emotion_react_browser_esm.AH)("position:absolute;")]})),StyledLabelTextWrapperShadow=(0,emotion_styled_browser_esm.A)("div",{target:"e1ivk6r6"})((props=>{const{isNarrow}=props;return(0,emotion_react_browser_esm.AH)(isNarrow?(0,styles.j0)(props):(0,styles.qz)(props),"      visibility:hidden;opacity:0;")}));var Menu=__webpack_require__("./packages/components/src/core/Menu/index.tsx"),MenuItem=__webpack_require__("./packages/components/src/core/MenuItem/index.tsx"),Icon=__webpack_require__("./packages/components/src/core/Icon/index.tsx");function groupItemsBySection(items){return items.reduce(((groups,item)=>{const section=item.section||"";return{...groups,[section]:[...groups[section]||[],item]}}),{})}function DrawerContent({drawerItems,sectionProps,section,hasMultipleSections,hasInvertedStyle,onItemClick,showHeader=!0,isLastColumn=!0}){const actions=sectionProps?.actions,needsHeaderPadding=hasMultipleSections&&!showHeader&&""!==section;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[section&&hasMultipleSections&&showHeader&&(0,jsx_runtime.jsx)(StyledHoverDrawerColumnHeader,{hasInvertedStyle,children:section}),(0,jsx_runtime.jsx)(StyledContentWrapper,{needsHeaderPadding,children:drawerItems.map(((subItem,index)=>{const{label:subLabel,details,icon,onClick,...restSubItemProps}=subItem,hasDetails=!!details,hasIcon=!!icon,iconSize=hasDetails?"l":"s";return(0,jsx_runtime.jsx)(StyledHoverDrawerItem,{onClick:e=>{onClick?.(e),onItemClick()},hasInvertedStyle,hasIcon,hasDetails,...restSubItemProps,children:(0,jsx_runtime.jsxs)(StyledHoverDrawerItemContent,{hasDetails,children:[(()=>{if(!icon)return(0,jsx_runtime.jsx)(EmptyIcon,{hasDetails});const iconContent="string"!=typeof icon?icon:(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:icon,sdsSize:iconSize,color:"indigo"});return(0,jsx_runtime.jsx)(StyledHoverDrawerItemIcon,{hasDetails,hasInvertedStyle,children:iconContent})})(),(0,jsx_runtime.jsxs)(StyledHoverDrawerItemText,{children:[(0,jsx_runtime.jsx)(StyledHoverDrawerItemTitle,{hasDetails,hasInvertedStyle,children:subLabel}),details&&(0,jsx_runtime.jsx)(StyledHoverDrawerItemDetails,{hasInvertedStyle,children:details})]})]})},`drawer-item-${section||"default"}-${subLabel}-${index}`)}))}),actions&&actions.length>0&&isLastColumn&&(0,jsx_runtime.jsx)(StyledHoverDrawerActions,{children:actions.map(((action,index)=>{const{label,onClick,href,component,target,rel}=action,componentProp=href&&!component?"a":component;return(0,jsx_runtime.jsx)(StyledButton,{sdsStyle:"rounded",sdsType:"primary",onClick:e=>{onClick?.(e),href&&onItemClick()},hasInvertedStyle,component:componentProp,href,target,rel,children:label},`action-${section||"default"}-${index}`)}))})]})}const AccordionNavItemStyle_doNotForwardProps=["hasInvertedStyle","hasCaption","iconSize","hasDetails","hasIcon","sdsStyle"],StyledDrawerNavItem=(0,emotion_styled_browser_esm.A)(core_Button.A,{shouldForwardProp:prop=>!AccordionNavItemStyle_doNotForwardProps.includes(prop),target:"e11m7uqy0"})((props=>{const spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props),textColor=props.hasInvertedStyle?semanticColors?.base?.textPrimaryOnDark:semanticColors?.base?.textPrimary;return(0,emotion_react_browser_esm.AH)("display:flex;justify-content:start;background-color:transparent !important;background-image:none !important;border:none !important;outline:none !important;box-shadow:none !important;align-items:center;text-align:left;gap:",spaces?.l,"px;padding:",spaces?.s,"px 0 !important;cursor:pointer;border-radius:8px;transition:background-color 150ms;color:",textColor,";&:hover{background-color:transparent;background-image:none;border:none;outline:none;box-shadow:none;}")})),StyledDrawerNavItemContent=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!AccordionNavItemStyle_doNotForwardProps.includes(prop),target:"e11m7uqy1"})((props=>{const spaces=(0,styles.oZ)(props);return(0,emotion_react_browser_esm.AH)("display:flex;flex-direction:column;gap:0;flex:1;min-width:0;padding-top:",spaces?.xxs,"px;")})),StyledDrawerNavItemText=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!AccordionNavItemStyle_doNotForwardProps.includes(prop),target:"e11m7uqy2"})((props=>{const{hasDetails,hasInvertedStyle}=props,semanticColors=(0,styles.Bd)(props),textColor=hasInvertedStyle?semanticColors?.base?.textPrimaryOnDark:semanticColors?.base?.textPrimary;return(0,emotion_react_browser_esm.AH)(hasDetails?(0,styles.qz)(props):(0,styles.M$)(props),"      color:",textColor,";overflow:hidden;text-overflow:ellipsis;white-space:normal;line-height:24px;")})),StyledDrawerNavItemCaption=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!AccordionNavItemStyle_doNotForwardProps.includes(prop),target:"e11m7uqy3"})((props=>{const semanticColors=(0,styles.Bd)(props),captionColor=props.hasInvertedStyle?semanticColors?.base?.textSecondaryOnDark:semanticColors?.base?.textSecondary;return(0,emotion_react_browser_esm.AH)((0,styles.Zo)(props),"      color:",captionColor,";white-space:normal;line-height:20px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;")})),StyledIconWrapper=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!AccordionNavItemStyle_doNotForwardProps.includes(prop),target:"e11m7uqy4"})((props=>{const{iconSize}=props,size="l"===props.iconSize?"24px":"16px",spaces=(0,styles.oZ)(props);return(0,emotion_react_browser_esm.AH)("flex-shrink:0;width:",size,";height:",size,";display:flex;align-items:center;justify-content:center;padding:0 ","l"===iconSize?0:spaces?.xxs,"px;box-sizing:content-box;")}));function AccordionNavItem(props){const{accordionId,label,items,expandedAccordion,setExpandedAccordion,accordionRefs,scrollToAccordion,hasInvertedStyle,isNarrow,chevronSize="s",onClose,sdsStyle="dropdown",sectionProps}=props,isExpanded=expandedAccordion===accordionId,renderNavItem=subItem=>"drawer"===sdsStyle?function renderDrawerStyleItem(subItem,hasInvertedStyle,onClose){const{label:dropdownItemLabel,details,icon,onClick,...restProps}=subItem,hasCaption=!!details,iconSize=hasCaption?"l":"s";return(0,jsx_runtime.jsxs)(StyledDrawerNavItem,{hasInvertedStyle,hasCaption,onClick:e=>{onClick?.(e),onClose()},onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(onClick?.(e),onClose())},role:"button",tabIndex:0,sdsStyle:"minimal",...restProps,children:[!icon&&(0,jsx_runtime.jsx)(EmptyIcon,{hasDetails:hasCaption}),icon&&(0,jsx_runtime.jsx)(StyledIconWrapper,{iconSize,children:"string"==typeof icon?(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:icon,sdsSize:iconSize}):icon}),(0,jsx_runtime.jsxs)(StyledDrawerNavItemContent,{children:[(0,jsx_runtime.jsx)(StyledDrawerNavItemText,{hasDetails:hasCaption,hasInvertedStyle,children:dropdownItemLabel}),hasCaption&&(0,jsx_runtime.jsx)(StyledDrawerNavItemCaption,{hasInvertedStyle,children:details})]})]},`nav-item-${dropdownItemLabel}`)}(subItem,hasInvertedStyle,onClose):function renderDropdownStyleItem(subItem,onClose){const{label:dropdownItemLabel,onClick,...restProps}=subItem;return(0,jsx_runtime.jsx)(MenuItem.A,{onClick:e=>{onClick?.(e),onClose()},sdsType:"action",...restProps,icon:void 0,children:dropdownItemLabel},`nav-item-${dropdownItemLabel}`)}(subItem,onClose),groupedItems=groupItemsBySection(items),sections=Object.keys(groupedItems),hasMultipleSections=sections.length>1||sections.some((section=>""!==section));return(0,jsx_runtime.jsxs)(StyledAccordion,{id:accordionId,hasInvertedStyle,isNarrow,expanded:isExpanded,onChange:()=>{setExpandedAccordion(isExpanded?null:accordionId),!isExpanded&&scrollToAccordion&&scrollToAccordion(accordionId)},ref:el=>{el?accordionRefs.current.set(accordionId,el):accordionRefs.current.delete(accordionId)},sdsStyle,children:[(0,jsx_runtime.jsx)(Accordion.u,{chevronSize,children:label}),(0,jsx_runtime.jsx)(StyledAccordionDetails,{sdsStyle,children:sections.map(((section,sectionIndex)=>{const sectionItems=groupedItems[section],showDivider=hasMultipleSections&&sectionIndex>0&&"drawer"!==sdsStyle,actions=sectionProps?.[section]?.actions;return(0,jsx_runtime.jsxs)(StyledAccordionSection,{sdsStyle,hasInvertedStyle,children:[showDivider&&(0,jsx_runtime.jsx)(StyledDivider,{hasSection:!!section,isNarrow,hasInvertedStyle}),section&&hasMultipleSections&&(0,jsx_runtime.jsx)(StyledSectionHeader,{isNarrow,hasInvertedStyle,sdsStyle,children:section}),sectionItems.map((subItem=>renderNavItem(subItem))),actions&&actions.length>0&&"drawer"===sdsStyle&&(0,jsx_runtime.jsx)(StyledHoverDrawerActions,{isNarrow,children:actions.map(((action,index)=>{const{label:actionLabel,onClick,href,component,target,rel}=action,componentProp=href&&!component?"a":component;return(0,jsx_runtime.jsx)(StyledButton,{sdsStyle:"rounded",sdsType:"primary",onClick:e=>{onClick?.(e),href&&onClose()},component:componentProp,hasInvertedStyle,href,target,rel,children:actionLabel},`action-${section||"default"}-${index}`)}))})]},`section-${section||"default"}`)}))})]},accordionId)}function useNavigationState(){const[anchorEl,setAnchorEl]=(0,react.useState)(null),[activeDropdownKey,setActiveDropdownKey]=(0,react.useState)(null),[activeDrawerKey,setActiveDrawerKey]=(0,react.useState)(null),buttonRef=(0,react.useRef)(null),[menuWidth,setMenuWidth]=(0,react.useState)("100%"),hoverTimeoutRef=(0,react.useRef)(null),hoverEnterTimeoutRef=(0,react.useRef)(null),[contentKey,setContentKey]=(0,react.useState)(null),[isContentFading,setIsContentFading]=(0,react.useState)(!1),open=Boolean(anchorEl),drawerOpen=null!==activeDrawerKey;return(0,react.useEffect)((()=>()=>{hoverTimeoutRef.current&&clearTimeout(hoverTimeoutRef.current),hoverEnterTimeoutRef.current&&clearTimeout(hoverEnterTimeoutRef.current)}),[]),(0,react.useEffect)((()=>{const button=buttonRef.current;button&&setMenuWidth(button.offsetWidth)}),[]),{anchorEl,activeDropdownKey,activeDrawerKey,contentKey,isContentFading,open,drawerOpen,buttonRef,menuWidth,setAnchorEl,setActiveDropdownKey,setActiveDrawerKey,setContentKey,onClose:function onClose(){setAnchorEl(null),setActiveDropdownKey(null)},onDrawerClose:function onDrawerClose(){hoverEnterTimeoutRef.current&&clearTimeout(hoverEnterTimeoutRef.current),hoverTimeoutRef.current&&clearTimeout(hoverTimeoutRef.current),hoverTimeoutRef.current=setTimeout((()=>{setActiveDrawerKey(null),setContentKey(null)}),200)},onDrawerOpen:function onDrawerOpen(key){hoverTimeoutRef.current&&clearTimeout(hoverTimeoutRef.current),null!==activeDrawerKey&&activeDrawerKey!==key?(hoverEnterTimeoutRef.current&&clearTimeout(hoverEnterTimeoutRef.current),hoverEnterTimeoutRef.current=setTimeout((()=>{setIsContentFading(!0),setTimeout((()=>{setActiveDrawerKey(key),setContentKey(key),setIsContentFading(!1)}),100)}),100)):(setActiveDrawerKey(key),setContentKey(key),setIsContentFading(!1))},cancelDrawerClose:function cancelDrawerClose(){hoverTimeoutRef.current&&clearTimeout(hoverTimeoutRef.current)}}}function NavigationHeaderPrimaryNav({menuProps,hasInvertedStyle,isNarrow,items,onChange,value,sdsStyle="dropdown",expandedAccordion,setExpandedAccordion,accordionRefs,scrollToAccordion,onDrawerStateChange,topOffset=0,onClose:onCloseProp}){const theme=(0,useTheme.A)(),{anchorEl,activeDropdownKey,activeDrawerKey,contentKey,isContentFading,open,drawerOpen,buttonRef,menuWidth,setAnchorEl,setActiveDropdownKey,setActiveDrawerKey,setContentKey,onClose:handleClose,onDrawerClose,onDrawerOpen,cancelDrawerClose}=useNavigationState(),wrapDropdownItemsWithActiveKey=(dropdownItems,parentKey)=>dropdownItems.map((item=>{const originalOnClick=item.onClick;return{...item,onClick:e=>{originalOnClick?.(e),onChange(parentKey)}}}));function onClose(){handleClose(),isNarrow&&onCloseProp?.()}(0,react.useEffect)((()=>{"drawer"===sdsStyle&&onDrawerStateChange&&onDrawerStateChange(drawerOpen)}),[drawerOpen,sdsStyle,onDrawerStateChange]);const activeDrawerItem=items.find((item=>"dropdown"===item.itemType&&item.key===contentKey));return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(StyledSection,{isNarrow,children:items.map((item=>{const{key,label,tag,tagColor,onClick:parentOnClick,...rest}=item;return"dropdown"!==item.itemType||isNarrow||"drawer"!==sdsStyle?"dropdown"!==item.itemType||isNarrow||"dropdown"!==sdsStyle?"dropdown"===item.itemType&&isNarrow?((item,key)=>{const labelKebabCase=item.label?.toString().toLowerCase().replace(" ","-"),accordionId=`${labelKebabCase}-dropdown`,wrappedItems=wrapDropdownItemsWithActiveKey(item.items,key);return(0,jsx_runtime.jsx)(AccordionNavItem,{accordionId,label:item.label,items:wrappedItems,expandedAccordion,setExpandedAccordion,accordionRefs,scrollToAccordion,hasInvertedStyle,isNarrow,chevronSize:isNarrow?"s":"xs",onClose,sdsStyle,sectionProps:item.sectionProps},accordionId)})(item,key):((item,key,label,tag,tagColor,rest)=>{const isActive=key===value;return(0,jsx_runtime.jsx)(UnifiedNavItem,{...rest,active:isActive,sdsStyle:"minimal",onClick:e=>{onChange(key),item.onClick?.(e)},hasInvertedStyle,isNarrow,innerSdsStyle:sdsStyle,navVariant:"primary",children:(0,jsx_runtime.jsxs)(UnifiedNavItem_StyledLabel,{active:isActive,hasInvertedStyle,isNarrow,navVariant:"primary",children:[(0,jsx_runtime.jsx)(StyledLabelTextWrapper,{active:isActive,isNarrow,children:label}),(0,jsx_runtime.jsx)(StyledLabelTextWrapperShadow,{"aria-hidden":"true",isNarrow,children:label}),tag&&(0,jsx_runtime.jsx)(style_StyledTag,{label:tag,color:tagColor,hover:!1})]})},key)})(item,key,label,"tag"in item?tag:void 0,"tagColor"in item?tagColor:void 0,rest):((item,key,label,parentOnClick,rest)=>{const isDropdownOpen=open&&activeDropdownKey===key,isActive=key===value||isDropdownOpen;return(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)(UnifiedNavItem,{...rest,itemType:item.itemType,ref:buttonRef,active:isActive,onClick:e=>{setAnchorEl(e.currentTarget),setActiveDropdownKey(key),onChange(key),parentOnClick?.(e)},hasInvertedStyle,isNarrow,sdsStyle:"minimal",innerSdsStyle:sdsStyle,navVariant:"primary",children:(0,jsx_runtime.jsxs)(UnifiedNavItem_StyledLabel,{itemType:item.itemType,active:isActive,hasInvertedStyle,isNarrow,navVariant:"primary",children:[(0,jsx_runtime.jsx)(StyledLabelTextWrapper,{active:isActive,isNarrow,children:label}),(0,jsx_runtime.jsx)(StyledLabelTextWrapperShadow,{"aria-hidden":"true",isNarrow,children:label}),(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:isDropdownOpen?"ChevronUp":"ChevronDown",sdsSize:"xs"})]})}),(0,jsx_runtime.jsx)(Menu.A,{anchorEl,open:isDropdownOpen,onClose,slotProps:{paper:{style:{marginTop:theme?.app?.spacing?.s}}},anchorOrigin:{horizontal:"left",vertical:"bottom"},transformOrigin:{horizontal:"left",vertical:"top"},...menuProps,disablePortal:!0,children:(()=>{const groupedItems=groupItemsBySection(wrapDropdownItemsWithActiveKey(item.items,key)),sections=Object.keys(groupedItems),hasMultipleSections=sections.length>1||sections.some((section=>""!==section));return sections.map(((section,sectionIndex)=>{const sectionItems=groupedItems[section],showDivider=hasMultipleSections&&sectionIndex>0;return(0,jsx_runtime.jsxs)("div",{children:[showDivider&&(0,jsx_runtime.jsx)(StyledDivider,{hasSection:!!section,isNarrow,hasInvertedStyle}),section&&hasMultipleSections&&(0,jsx_runtime.jsx)(StyledSectionHeader,{isNarrow,hasInvertedStyle,children:section}),sectionItems.map((subItem=>{const{label:subLabel,onClick,...sectionSubItemRestProps}=subItem;return(0,jsx_runtime.jsx)(MenuItem.A,{onClick:e=>{onClick?.(e),onClose()},sdsType:"action",sx:{minWidth:menuWidth},...sectionSubItemRestProps,icon:void 0,children:subLabel},`menu-item-${subLabel}`)}))]},`section-${section||"default"}`)}))})()})]},key)})(item,key,label,parentOnClick,rest):((item,key,label,parentOnClick,rest)=>{const isDrawerOpen=drawerOpen&&activeDrawerKey===key,isActive=key===value||isDrawerOpen,{defaultUrl,component,target,rel}=item,componentProp=defaultUrl&&!component?"a":component;return(0,jsx_runtime.jsx)(StyledHoverDrawerContainer,{onMouseEnter:()=>onDrawerOpen(key),onMouseLeave:onDrawerClose,children:(0,jsx_runtime.jsx)(UnifiedNavItem,{...rest,itemType:item.itemType,active:isActive,hasInvertedStyle,isNarrow,sdsStyle:"minimal",onClick:e=>{onChange(key),parentOnClick?.(e)},innerSdsStyle:sdsStyle,navVariant:"primary",component:componentProp,href:defaultUrl,target,rel,children:(0,jsx_runtime.jsxs)(UnifiedNavItem_StyledLabel,{itemType:item.itemType,active:isActive,hasInvertedStyle,isNarrow,navVariant:"primary",children:[(0,jsx_runtime.jsx)(StyledLabelTextWrapper,{active:isActive,isNarrow,children:label}),(0,jsx_runtime.jsx)(StyledLabelTextWrapperShadow,{"aria-hidden":"true",isNarrow,children:label}),(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:isDrawerOpen?"ChevronUp":"ChevronDown",sdsSize:"xs"})]})})},key)})(item,key,label,parentOnClick,rest)}))}),"drawer"===sdsStyle&&!isNarrow&&(0,jsx_runtime.jsx)(StyledMegaMenuDrawer,{anchor:"top",open:drawerOpen,onClose:()=>{setActiveDrawerKey(null),setContentKey(null)},hasInvertedStyle,hideBackdrop:!1,disableScrollLock:!0,transitionDuration:100,topOffset,SlideProps:{onMouseEnter:cancelDrawerClose,onMouseLeave:onDrawerClose},children:(0,jsx_runtime.jsx)(StyledMegaMenuContent,{hasInvertedStyle,style:{opacity:isContentFading?0:1},children:activeDrawerItem&&(()=>{const groupedItems=groupItemsBySection(wrapDropdownItemsWithActiveKey(activeDrawerItem.items,activeDrawerItem.key)),sections=Object.keys(groupedItems),hasMultipleSections=sections.length>1||sections.some((section=>""!==section)),totalColumns=sections.reduce(((acc,section)=>acc+(activeDrawerItem.sectionProps?.[section]?.colSpan||1)),0),columns=[];return sections.forEach((section=>{const sectionProps=activeDrawerItem.sectionProps?.[section]||{},colSpan=sectionProps.colSpan||1,sectionItems=groupedItems[section];if(colSpan<=1)columns.push({section,items:sectionItems,sectionProps,showHeader:!0,isLastColumn:!0});else{const itemsPerColumn=Math.ceil(sectionItems.length/colSpan);for(let i=0;i<colSpan;i++){const start=i*itemsPerColumn,end=start+itemsPerColumn;columns.push({section,items:sectionItems.slice(start,end),sectionProps,showHeader:0===i,isLastColumn:i===colSpan-1})}}})),columns.map(((column,index)=>(0,jsx_runtime.jsx)(StyledHoverDrawerColumn,{hasInvertedStyle,totalColumns,children:(0,jsx_runtime.jsx)(DrawerContent,{drawerItems:column.items,sectionProps:column.sectionProps,section:column.section,hasMultipleSections,hasInvertedStyle,showHeader:column.showHeader,isLastColumn:column.isLastColumn,onItemClick:()=>{setActiveDrawerKey(null),setContentKey(null)}})},`drawer-column-${column.section}-${index}`)))})()})})]})}const NavigationHeaderSecondaryNav_style_StyledTag=(0,emotion_styled_browser_esm.A)(Tag.A,{target:"em7i8u01"})("margin:0;");function NavigationHeaderSecondaryNav({menuProps,items,hasInvertedStyle,isNarrow,sdsStyle="dropdown",expandedAccordion,setExpandedAccordion,accordionRefs,scrollToAccordion,onDrawerStateChange,topOffset=0,onClose:onCloseProp}){const theme=(0,useTheme.A)(),{anchorEl,activeDropdownKey,activeDrawerKey,contentKey,isContentFading,open,drawerOpen,buttonRef,menuWidth,setAnchorEl,setActiveDropdownKey,setActiveDrawerKey,setContentKey,onClose:handleClose,onDrawerClose,onDrawerOpen,cancelDrawerClose}=useNavigationState();function onClose(){handleClose(),isNarrow&&onCloseProp?.()}(0,react.useEffect)((()=>{"drawer"===sdsStyle&&onDrawerStateChange&&onDrawerStateChange(drawerOpen)}),[drawerOpen,sdsStyle,onDrawerStateChange]);const activeDrawerItem=items.find((item=>"dropdown"===item.itemType&&item.key===contentKey));return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(StyledSection,{isNarrow,children:items.map((item=>{const{key,label,tag,tagColor,onClick:parentOnClick,...rest}=item;return"dropdown"!==item.itemType||isNarrow||"drawer"!==sdsStyle?"dropdown"!==item.itemType||isNarrow||"dropdown"!==sdsStyle?"dropdown"===item.itemType&&isNarrow?(item=>{const labelKebabCase=item.label?.toString().toLowerCase().replace(" ","-"),accordionId=`${labelKebabCase}-dropdown`;return(0,jsx_runtime.jsx)(AccordionNavItem,{accordionId,label:item.label,items:item.items,expandedAccordion,setExpandedAccordion,accordionRefs,scrollToAccordion,hasInvertedStyle,isNarrow,chevronSize:isNarrow?"s":"xs",onClose,sdsStyle,sectionProps:item.sectionProps},accordionId)})(item):((item,key,label,tag,tagColor,rest)=>(0,jsx_runtime.jsxs)(UnifiedNavItem,{...rest,onClick:e=>{item.onClick?.(e)},hasInvertedStyle,active:!1,isNarrow,sdsStyle:"minimal",navVariant:"secondary",children:[label,tag&&(0,jsx_runtime.jsx)(NavigationHeaderSecondaryNav_style_StyledTag,{label:tag,color:tagColor,hover:!1})]},key))(item,key,label,"tag"in item?tag:void 0,"tagColor"in item?tagColor:void 0,rest):((item,key,label,parentOnClick,rest)=>{const isDropdownOpen=open&&activeDropdownKey===key;return(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsxs)(UnifiedNavItem,{...rest,ref:buttonRef,hasInvertedStyle,active:isDropdownOpen,isNarrow,sdsStyle:"minimal",innerSdsStyle:sdsStyle,navVariant:"secondary",onClick:e=>{setAnchorEl(e.currentTarget),setActiveDropdownKey(key),parentOnClick?.(e)},children:[(0,jsx_runtime.jsx)(StyledLabelTextWrapper,{active:isDropdownOpen,isNarrow,children:label}),(0,jsx_runtime.jsx)(StyledLabelTextWrapperShadow,{"aria-hidden":"true",isNarrow,children:label}),(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:isDropdownOpen?"ChevronUp":"ChevronDown",sdsSize:"xs"})]}),(0,jsx_runtime.jsx)(Menu.A,{anchorEl,open:isDropdownOpen,onClose,slotProps:{paper:{style:{marginTop:theme?.app?.spacing?.s}}},anchorOrigin:{horizontal:"left",vertical:"bottom"},transformOrigin:{horizontal:"left",vertical:"top"},...menuProps,disablePortal:!0,children:(()=>{const groupedItems=groupItemsBySection(item.items),sections=Object.keys(groupedItems),hasMultipleSections=sections.length>1||sections.some((section=>""!==section));return sections.map(((section,sectionIndex)=>{const sectionItems=groupedItems[section],showDivider=hasMultipleSections&&sectionIndex>0;return(0,jsx_runtime.jsxs)("div",{children:[showDivider&&(0,jsx_runtime.jsx)(StyledDivider,{hasSection:!!section,isNarrow,hasInvertedStyle}),section&&hasMultipleSections&&(0,jsx_runtime.jsx)(StyledSectionHeader,{isNarrow,hasInvertedStyle,children:section}),sectionItems.map((subItem=>{const{label:subLabel,onClick,...sectionSubItemRestProps}=subItem;return(0,jsx_runtime.jsx)(MenuItem.A,{onClick:e=>{onClick?.(e),onClose()},sdsType:"action",sx:{minWidth:menuWidth},...sectionSubItemRestProps,icon:void 0,children:subLabel},`menu-item-${subLabel}`)}))]},`section-${section||"default"}`)}))})()})]},key)})(item,key,label,parentOnClick,rest):((item,key,label,parentOnClick,rest)=>{const isDrawerOpen=drawerOpen&&activeDrawerKey===key,{defaultUrl,component,target,rel}=item,componentProp=defaultUrl&&!component?"a":component;return(0,jsx_runtime.jsx)(StyledHoverDrawerContainer,{onMouseEnter:()=>onDrawerOpen(key),onMouseLeave:onDrawerClose,children:(0,jsx_runtime.jsxs)(UnifiedNavItem,{...rest,hasInvertedStyle,active:isDrawerOpen,isNarrow,sdsStyle:"minimal",innerSdsStyle:sdsStyle,navVariant:"secondary",onClick:e=>{parentOnClick?.(e)},component:componentProp,href:defaultUrl,target,rel,children:[(0,jsx_runtime.jsx)(StyledLabelTextWrapper,{active:isDrawerOpen,isNarrow,children:label}),(0,jsx_runtime.jsx)(StyledLabelTextWrapperShadow,{"aria-hidden":"true",isNarrow,children:label}),(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:isDrawerOpen?"ChevronUp":"ChevronDown",sdsSize:"xs"})]})},key)})(item,key,label,parentOnClick,rest)}))}),"drawer"===sdsStyle&&!isNarrow&&(0,jsx_runtime.jsx)(StyledMegaMenuDrawer,{anchor:"top",open:drawerOpen,onClose:()=>{setActiveDrawerKey(null),setContentKey(null)},hasInvertedStyle,hideBackdrop:!1,disableScrollLock:!0,transitionDuration:100,topOffset,SlideProps:{onMouseEnter:cancelDrawerClose,onMouseLeave:onDrawerClose},children:(0,jsx_runtime.jsx)(StyledMegaMenuContent,{hasInvertedStyle,style:{opacity:isContentFading?0:1},children:activeDrawerItem&&(()=>{const groupedItems=groupItemsBySection(activeDrawerItem.items),sections=Object.keys(groupedItems),hasMultipleSections=sections.length>1||sections.some((section=>""!==section)),totalColumns=sections.reduce(((acc,section)=>acc+(activeDrawerItem.sectionProps?.[section]?.colSpan||1)),0),columns=[];return sections.forEach((section=>{const sectionProps=activeDrawerItem.sectionProps?.[section]||{},colSpan=sectionProps.colSpan||1,sectionItems=groupedItems[section];if(colSpan<=1)columns.push({section,items:sectionItems,sectionProps,showHeader:!0,isLastColumn:!0});else{const itemsPerColumn=Math.ceil(sectionItems.length/colSpan);for(let i=0;i<colSpan;i++){const start=i*itemsPerColumn,end=start+itemsPerColumn;columns.push({section,items:sectionItems.slice(start,end),sectionProps,showHeader:0===i,isLastColumn:i===colSpan-1})}}})),columns.map(((column,index)=>(0,jsx_runtime.jsx)(StyledHoverDrawerColumn,{hasInvertedStyle,totalColumns,children:(0,jsx_runtime.jsx)(DrawerContent,{drawerItems:column.items,sectionProps:column.sectionProps,section:column.section,hasMultipleSections,hasInvertedStyle,showHeader:column.showHeader,isLastColumn:column.isLastColumn,onItemClick:()=>{setActiveDrawerKey(null),setContentKey(null)}})},`drawer-column-${column.section}-${index}`)))})()})})]})}var utils=__webpack_require__("./packages/components/src/common/utils.ts"),useScrollTrigger=__webpack_require__("./node_modules/@mui/material/useScrollTrigger/useScrollTrigger.js");const components_ElevationScroll=function ElevationScroll(elevationProps){const{children,window,shouldElevate=!0}=elevationProps,theme=(0,useTheme.A)(),mode=theme.palette.mode,trigger=(0,useScrollTrigger.A)({disableHysteresis:!0,target:window?window():void 0,threshold:0}),darkModeStyles=emotion_react_browser_esm.AH`
    border-bottom: 1px solid ${theme.palette?.sds?.base?.borderSecondary};
  `;return children?react.cloneElement(children,{elevation:trigger&&shouldElevate?14:0,sx:trigger&&shouldElevate?{...elevationProps.sx||{},..."dark"===mode&&darkModeStyles}:void 0}):null},core_NavigationHeader=(0,react.forwardRef)(((props,ref)=>{const{activePrimaryNavKey:controlledActivePrimaryNavKey,buttons,sdsStyle="dropdown",menuProps={disableScrollLock:!0,disablePortal:!0},backgroundAppearance="matchBackground",logo,logoUrl,logoLinkComponent="a",logoLinkProps,scrollElevation=!0,primaryNavItems,primaryNavPosition="left",searchProps,secondaryNavItems,setActivePrimaryNavKey:onActivePrimaryNavKeyChange,showSearch=!0,tag,tagColor,title,drawerOpen:controlledDrawerOpen,setDrawerOpen:onDrawerOpenChange,isSticky=!0,topComponentSlot,...rest}=props,navRef=(0,react.useRef)(null),topSlotRef=(0,react.useRef)(null),[topOffset,setTopOffset]=(0,react.useState)(0),[internalActivePrimaryNavKey,setInternalActivePrimaryNavKey]=(0,react.useState)(""),activePrimaryNavKey=controlledActivePrimaryNavKey??internalActivePrimaryNavKey,setActivePrimaryNavKey=key=>{setInternalActivePrimaryNavKey(key),onActivePrimaryNavKeyChange&&onActivePrimaryNavKeyChange(key)},theme=(0,useTheme.A)(),mode=(0,styles.Wi)({theme}),isMdScreen=(0,useMediaQuery.A)(theme.breakpoints.down("md")),hasInvertedStyle=(0,react.useMemo)((()=>"light"===mode&&"dark"===backgroundAppearance),[backgroundAppearance,mode]),[internalDrawerOpen,setInternalDrawerOpen]=(0,react.useState)(!1),drawerOpen=controlledDrawerOpen??internalDrawerOpen,setDrawerOpen=open=>{const newOpen="function"==typeof open?open(drawerOpen):open;onDrawerOpenChange?onDrawerOpenChange(newOpen):setInternalDrawerOpen(newOpen)},[dimensions,setDimensions]=(0,react.useState)({breakpoint:0,isNarrow:isMdScreen}),[expandedAccordion,setExpandedAccordion]=(0,react.useState)(null),accordionRefs=(0,react.useRef)(new Map),[isPrimaryDrawerOpen,setIsPrimaryDrawerOpen]=(0,react.useState)(!1),[isSecondaryDrawerOpen,setIsSecondaryDrawerOpen]=(0,react.useState)(!1),isAnyDrawerOpen=isPrimaryDrawerOpen||isSecondaryDrawerOpen;(0,react.useEffect)((()=>{setDimensions((prev=>({...prev,isNarrow:isMdScreen})))}),[isMdScreen]),(0,react.useEffect)((()=>{if(!topComponentSlot||!topSlotRef.current)return void setTopOffset(0);const measureHeight=()=>{if(topSlotRef.current){const height=topSlotRef.current.getBoundingClientRect().height;setTopOffset(height)}};measureHeight();const resizeObserver=new ResizeObserver(measureHeight);return resizeObserver.observe(topSlotRef.current),()=>resizeObserver.disconnect()}),[topComponentSlot]);const scrollToAccordion=(0,react.useCallback)((accordionId=>{setTimeout((()=>{const accordionElement=accordionRefs.current.get(accordionId);if(accordionElement){const accordionHeader=accordionElement.querySelector(".MuiAccordionSummary-root");if(accordionHeader&&navRef.current){const drawerPaper=accordionElement.closest(".MuiDrawer-paper");if(drawerPaper){const accordionRect=accordionHeader.getBoundingClientRect(),drawerRect=drawerPaper.getBoundingClientRect(),navRect=navRef.current.getBoundingClientRect(),targetScroll=drawerPaper.scrollTop+(accordionRect.top-drawerRect.top)-navRect.height-("drawer"===sdsStyle?0:8);drawerPaper.scrollTo({top:Math.max(0,targetScroll),behavior:"smooth"})}}}}),500)}),[sdsStyle]),handlePrimaryDrawerStateChange=(0,react.useCallback)((isOpen=>{setIsPrimaryDrawerOpen(isOpen)}),[]),handleSecondaryDrawerStateChange=(0,react.useCallback)((isOpen=>{setIsSecondaryDrawerOpen(isOpen)}),[]),checkScrollable=(0,react.useCallback)((()=>{if(!navRef.current)return;const clientWidth=navRef.current.clientWidth,scrollWidth=navRef.current.scrollWidth,needsScroll=scrollWidth>clientWidth;setDimensions((prev=>{const newBreakpoint=needsScroll?prev.breakpoint>scrollWidth?prev.breakpoint:scrollWidth:prev.breakpoint;return{breakpoint:newBreakpoint,isNarrow:prev.isNarrow?clientWidth<newBreakpoint:needsScroll}}))}),[]);(0,react.useEffect)((()=>{checkScrollable();const resizeObserver=new ResizeObserver(checkScrollable);return navRef.current&&resizeObserver.observe(navRef.current),()=>resizeObserver.disconnect()}),[checkScrollable]);const renderSearch=()=>showSearch&&(0,jsx_runtime.jsx)(StyledSearch,{id:"nav-bar-search",label:"Search",placeholder:"Search",sdsStyle:"rounded",hasInvertedStyle,isNarrow:dimensions.isNarrow,...searchProps}),renderPrimaryNav=()=>primaryNavItems&&primaryNavItems.length>0&&(0,jsx_runtime.jsx)(NavigationHeaderPrimaryNav,{items:primaryNavItems,value:activePrimaryNavKey,onChange:setActivePrimaryNavKey,hasInvertedStyle,isNarrow:dimensions.isNarrow,menuProps,sdsStyle,expandedAccordion,setExpandedAccordion,accordionRefs,scrollToAccordion,onDrawerStateChange:handlePrimaryDrawerStateChange,topOffset,onClose:()=>setDrawerOpen(!1)}),renderSecondaryNav=()=>secondaryNavItems&&secondaryNavItems.length>0&&(0,jsx_runtime.jsx)(NavigationHeaderSecondaryNav,{items:secondaryNavItems,hasInvertedStyle,isNarrow:dimensions.isNarrow,menuProps,sdsStyle,expandedAccordion,setExpandedAccordion,accordionRefs,scrollToAccordion,onDrawerStateChange:handleSecondaryDrawerStateChange,topOffset,onClose:()=>setDrawerOpen(!1)}),renderButtonsNode=()=>buttons&&0!==buttons.length?(0,jsx_runtime.jsx)(StyledButtonSection,{hasInvertedStyle,isNarrow:dimensions.isNarrow,children:buttons.map(((buttonProps,idx)=>renderButton(buttonProps,idx)))}):null,renderButton=(buttonProps,idx)=>{const key=`button-${idx}`,fullWidth=dimensions.isNarrow?{width:"100%"}:void 0;if(react.isValidElement(buttonProps)){const originalOnClick=buttonProps.props?.onClick,enhancedOnClick=dimensions.isNarrow?e=>{originalOnClick?.(e),setDrawerOpen(!1)}:originalOnClick;return react.cloneElement(buttonProps,{hasInvertedStyle,key,onClick:enhancedOnClick,sx:{...buttonProps.props?.sx||{},...fullWidth}})}if("object"==typeof buttonProps&&null!==buttonProps){const buttonPropsObj=buttonProps,isIconButton="icon"in buttonPropsObj;return isIconButton&&dimensions.isNarrow&&buttonPropsObj.icon?renderNarrowIconButton(buttonPropsObj,key,fullWidth):isIconButton&&!dimensions.isNarrow?renderWideIconButton(buttonPropsObj,key):renderDefaultButton(buttonPropsObj,key,fullWidth)}return null},renderNarrowIconButton=(buttonProps,key,fullWidth)=>{const originalOnClick=buttonProps.onClick,enhancedOnClick=dimensions.isNarrow?e=>{originalOnClick?.(e),setDrawerOpen(!1)}:originalOnClick;return(0,jsx_runtime.jsx)(StyledNarrowIconButton,{sx:fullWidth,isAllCaps:!1,startIcon:(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"s",sdsIcon:"Person"}),hasInvertedStyle,...buttonProps,onClick:enhancedOnClick,sdsStyle:"minimal",sdsType:"secondary",isNarrow:dimensions.isNarrow,children:buttonProps.children},key)},renderWideIconButton=(buttonProps,key)=>(0,jsx_runtime.jsx)(StyledWideIconButton,{"aria-label":String(buttonProps.children),hasInvertedStyle,...buttonProps,sdsStyle:"icon",sdsType:"secondary",sdsSize:"small",icon:buttonProps.icon},key),renderDefaultButton=(buttonProps,key,fullWidth)=>{const originalOnClick=buttonProps.onClick,enhancedOnClick=dimensions.isNarrow?e=>{originalOnClick?.(e),setDrawerOpen(!1)}:originalOnClick;return(0,jsx_runtime.jsx)(StyledHeaderButton,{sx:fullWidth,...buttonProps,onClick:enhancedOnClick,sdsStyle:"rounded",hasInvertedStyle,isNarrow:dimensions.isNarrow},key)},headerContent=(()=>{const logoNode=(()=>{let logoNode=(0,jsx_runtime.jsxs)(StyledTitleContainer,{hasInvertedStyle,isNarrow:dimensions.isNarrow,children:[logo&&(0,jsx_runtime.jsx)(StyledLogoWrapper,{children:logo}),(title||tag)&&(0,jsx_runtime.jsxs)(StyledTitleTagWrapper,{children:[title&&(0,jsx_runtime.jsx)("p",{children:title}),tag&&(0,jsx_runtime.jsx)(StyledTag,{color:tagColor,label:tag,hover:!1})]})]});return(logoLinkComponent||logoUrl)&&(logoNode=(0,jsx_runtime.jsx)(StyledLogoLinkWrapper,{component:logoLinkComponent,href:logoUrl,...logoLinkProps,isNarrow:dimensions.isNarrow,children:logoNode})),logoNode})(),search=renderSearch(),primaryNav=renderPrimaryNav(),secondaryNav=renderSecondaryNav(),buttonsNode=renderButtonsNode();return(0,jsx_runtime.jsxs)(StyledToolbar,{hasInvertedStyle,isNarrow:dimensions.isNarrow,children:[logoNode,!dimensions.isNarrow&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(StyledPrimaryNavContainer,{primaryNavPosition,showSearch,isNarrow:dimensions.isNarrow,children:"left"===primaryNavPosition?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[primaryNav,search]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[search,primaryNav]})}),secondaryNav,buttonsNode]}),dimensions.isNarrow&&(0,jsx_runtime.jsx)(StyledNarrowButton,{sdsType:"tertiary",sdsStyle:"icon",icon:drawerOpen?"XMark":"LinesHorizontal3",onClick:()=>setDrawerOpen((prev=>!prev)),hasInvertedStyle})]})})(),search=renderSearch(),primaryNav=renderPrimaryNav(),secondaryNav=renderSecondaryNav(),buttonsNode=renderButtonsNode(),position="drawer"===sdsStyle||isSticky?"sticky":"relative",effectiveScrollElevation=scrollElevation&&!("drawer"===sdsStyle&&isAnyDrawerOpen);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[topComponentSlot&&(0,jsx_runtime.jsx)(StyledTopComponentSlot,{ref:topSlotRef,children:topComponentSlot}),(0,jsx_runtime.jsx)(components_ElevationScroll,{...props,shouldElevate:effectiveScrollElevation,children:(0,jsx_runtime.jsx)(StyledAppBar,{elevation:0,hasInvertedStyle,ref:(0,utils.Px)([ref,navRef]),"aria-label":"Main navigation",tabIndex:0,position,style:{top:topOffset},...rest,children:headerContent})}),dimensions.isNarrow&&drawerOpen&&(0,jsx_runtime.jsxs)(StyledDrawer,{anchor:"right",open:drawerOpen,onClose:()=>setDrawerOpen(!1),hasInvertedStyle,topOffset,role:"dialog","aria-label":"Navigation menu",children:[(0,jsx_runtime.jsx)(components_ElevationScroll,{...props,shouldElevate:effectiveScrollElevation,children:(0,jsx_runtime.jsx)(StyledAppBar,{elevation:10,hasInvertedStyle,ref:(0,utils.Px)([ref,navRef]),"aria-label":"Main navigation",tabIndex:0,position:"sticky",...rest,children:headerContent})}),(0,jsx_runtime.jsxs)(StyledDrawerContent,{children:[(0,jsx_runtime.jsxs)("div",{children:[search,primaryNav,primaryNav&&secondaryNav&&(0,jsx_runtime.jsx)(StyledSectionDivider,{hasInvertedStyle}),secondaryNav]}),buttonsNode]})]})]})}))},"./packages/components/src/core/Tag/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Tag});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),colorManipulator=__webpack_require__("./node_modules/@mui/system/esm/colorManipulator.js"),Chip=__webpack_require__("./node_modules/@mui/material/Chip/Chip.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");function generatePrimaryTagColors(intent,colors,semanticColors){return intent||colors.length?(intent=intent||"neutral",{background:colors.length>=2?colors[1]:semanticColors?.[intent].fillPrimary,backgroundClicked:colors.length>=2?(0,colorManipulator.e$)(colors[1],.3):semanticColors?.[intent].fillPressed,backgroundHover:colors.length>=2?(0,colorManipulator.e$)(colors[1],.15):semanticColors?.[intent].fillHover,iconColor:colors.length>2?colors[2]:semanticColors?.base?.ornamentOnFill,label:colors.length?colors[0]:semanticColors?.base?.textOnFill}):{background:semanticColors?.neutral.fillPrimary,backgroundClicked:semanticColors?.neutral.fillPressed,backgroundHover:semanticColors?.neutral.fillHover,iconColor:semanticColors?.base?.ornamentOnFill,label:semanticColors?.base?.textOnFill}}function generateSecondaryTagColors(intent,colors,semanticColors){return intent||colors.length?(intent=intent||"neutral",{background:colors.length>=2?colors[1]:semanticColors?.[intent].fillSecondary,backgroundClicked:colors.length>=2?(0,colorManipulator.e$)(colors[1],.3):semanticColors?.[intent].fillPressed,backgroundHover:colors.length>=2?(0,colorManipulator.e$)(colors[1],.15):semanticColors?.[intent].fillHover,iconColor:colors.length>2?colors[2]:semanticColors?.[intent].ornament,label:colors.length?colors[0]:semanticColors?.[intent].text}):{background:semanticColors?.neutral.fillSecondary,backgroundClicked:semanticColors?.neutral.fillPressed,backgroundHover:semanticColors?.neutral.fillHover,iconColor:semanticColors?.neutral.ornament,label:semanticColors?.neutral.fillPressed}}function createTypeCss(props,type){const semanticColors=(0,styles.Bd)(props),intent="string"==typeof props.tagColor?props.tagColor:null,colors=Array.isArray(props.tagColor)?[...props.tagColor]:[],typeColors={primary:generatePrimaryTagColors(intent,colors,semanticColors),secondary:generateSecondaryTagColors(intent,colors,semanticColors)}[type];return(0,emotion_react_browser_esm.AH)((0,styles.UT)(props),"    background-color:",typeColors.background,";position:relative;.MuiChip-label{color:",typeColors.label,";}svg{fill:",typeColors.iconColor,";}&:hover,&:active{.MuiChip-label{color:",semanticColors?.base?.textPrimaryInverse,";}svg{fill:",semanticColors?.base?.ornamentPrimaryInverse,";}}&:hover{background-color:",typeColors.backgroundHover,";}&:active{background-color:",typeColors.backgroundClicked,";}&.Mui-focusVisible{background-color:",typeColors.backgroundHover,";}x")}const typeToCss={primary:props=>createTypeCss(props,"primary"),secondary:props=>createTypeCss(props,"secondary")},doNotForwardProps=["sdsType","sdsStyle","sdsSize","tagColor","hover"],StyledTag=(0,emotion_styled_browser_esm.A)(Chip.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e5rwyx00"})("border:none;",(props=>{const{hover=!0,sdsType,sdsStyle,sdsSize="s"}=props,isRounded="rounded"===sdsStyle,type=sdsType||"primary";return(0,emotion_react_browser_esm.AH)("l"===sdsSize?(props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("height:unset;margin:0 ",spaces?.xxs,"px ",spaces?.xs,"px 0;.MuiChip-label{",(0,styles.Zo)(props),"      padding:0;}.MuiSvgIcon-root{height:",iconSizes?.l.height,"px;width:",iconSizes?.l.width,"px;margin:0 ",spaces?.xxs,"px 0 -",spaces?.xxxs,"px;}.MuiChip-deleteIcon{",(0,styles.Se)(props),"      color:",semanticColors?.base?.ornamentPrimaryInverse,";margin:0 0 0 ",spaces?.xxs,"px;height:",iconSizes?.s.height,"px;width:",iconSizes?.s.width,"px;}")})(props):(props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("height:unset;margin:0 ",spaces?.xxs,"px ",spaces?.xs,"px 0;.MuiChip-label{",(0,styles.jT)(props),"      padding:0;}.MuiSvgIcon-root{height:",iconSizes?.xs.height,"px;width:",iconSizes?.xs.width,"px;margin:0 ",spaces?.xxs,"px 0 -",spaces?.xxxs,"px;}.MuiChip-deleteIcon{",(0,styles.Se)(props),"      color:",semanticColors?.base?.ornamentPrimaryInverse,";margin:0 0 0 ",spaces?.xxs,"px;height:",iconSizes?.s.height,"px;width:",iconSizes?.s.width,"px;}")})(props)," ",typeToCss[type](props)," ",isRounded?(props=>{const corners=(0,styles.VP)(props),spaces=(0,styles.oZ)(props),{sdsSize="s",icon}=props,topBottomPadding="s"===sdsSize?spaces?.xxxs:icon?spaces?.xxs:spaces?.xs;return(0,emotion_react_browser_esm.AH)("border-radius:",corners?.rounded,"px;padding:",topBottomPadding,"px ",spaces?.s,"px;&:after{border-radius:",corners?.rounded,"px;}")})(props):(props=>{const corners=(0,styles.VP)(props),spaces=(0,styles.oZ)(props),{sdsSize="s",icon}=props,topBottomPadding="s"===sdsSize?spaces?.xxxs:icon?spaces?.xxs:spaces?.xs;return(0,emotion_react_browser_esm.AH)("border-radius:",corners?.m,"px;padding:",topBottomPadding,"px ",spaces?.s,"px;&:after{border-radius:",corners?.m,"px;}")})(props)," ",hover?(props=>{const semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("&:hover{cursor:pointer;}&:hover,&:focus-visible{color:",semanticColors?.base?.textPrimaryInverse,";}")})(props):"pointer-events: none;")})),core_Tag=props=>{const{color}=props;return(0,jsx_runtime.jsx)(StyledTag,{tagColor:color,...props,color:"primary"})}}}]);
//# sourceMappingURL=3618.7603b2b3.iframe.bundle.js.map