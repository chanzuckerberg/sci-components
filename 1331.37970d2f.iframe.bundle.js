"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[1331],{"./packages/components/src/core/InputToggle/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_InputToggle});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),switchClasses=__webpack_require__("./node_modules/@mui/material/Switch/switchClasses.js"),Switch=__webpack_require__("./node_modules/@mui/material/Switch/Switch.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const Toggle=(0,emotion_styled_browser_esm.A)(Switch.A,{target:"e15n6ibd0"})(styles.Zo," ",(props=>{const{checked}=props;return`\n      ${(props=>{const{disabled,width=62}=props,corners=(0,styles.VP)(props),shadows=(0,styles.CG)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return`\n    cursor: ${disabled?"default":"pointer"};\n    border-radius: ${corners?.l}px;\n    height: 24px;\n    width: ${width}px;\n    line-height: 18px;\n    padding: 0;\n    overflow: visible;\n\n    .${switchClasses.A.switchBase} {\n      ${(0,styles.UT)(props)}\n      outline-offset: 2px !important;\n      width: 100%;\n      height: 100%;\n      border-radius: ${corners?.l}px;\n      font: inherit;\n      transform: unset;\n      justify-content: space-between;\n\n      .${switchClasses.A.input} {\n        width: 100%;\n        height: 100%;\n        left: 0;\n      }\n\n      &.${switchClasses.A.checked} {\n        transform: unset;\n      }\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    .${switchClasses.A.thumb} {\n      height: ${iconSizes?.s?.height}px;\n      width: ${iconSizes?.s?.width}px;\n      min-width: ${iconSizes?.s?.width}px;\n      box-shadow: ${shadows?.none};\n    }\n\n    .${switchClasses.A.track} {\n      background-color: ${semanticColors?.base?.surfacePrimary};\n      opacity: 1;\n      border-radius: ${corners?.l}px;\n    }\n  `})(props)}\n      ${checked?(props=>{const{disabled,value}=props,borders=(0,styles.ow)(props),spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n    & {\n      outline: ${disabled?borders?.base?.disabled:borders?.accent?.default};\n    }\n\n    .${switchClasses.A.thumb} {\n      color: ${disabled?semanticColors?.base?.iconDisabled:semanticColors?.accent?.icon};\n      margin-left: ${spaces?.m}px;\n    }\n\n    .${switchClasses.A.switchBase} {\n      left: unset;\n      right: 0;\n      transform: unset;\n      padding: 0 ${spaces?.xxs}px 0 ${spaces?.xs}px;\n\n      .MuiIconButton-label {\n        margin-left: ${spaces?.s}px;\n      }\n\n      &:before {\n        color: ${disabled?semanticColors?.base?.textDisabled:semanticColors?.base?.textPrimary};\n        content: "${value}";\n      }\n    }\n\n    .${switchClasses.A.track} {\n      background-color: ${semanticColors?.base?.fillPrimary} !important;\n      opacity: 1 !important;\n    }\n\n    ${!disabled&&`&:hover {\n        outline: ${borders?.accent?.hover};\n\n        .${switchClasses.A.thumb} {\n          color: ${semanticColors?.accent?.iconHover};\n        }\n      }`}\n  `})(props):(props=>{const{disabled,value}=props,borders=(0,styles.ow)(props),spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n    & {\n      outline: ${disabled?borders?.base?.disabled:borders?.base?.default};\n    }\n\n    .${switchClasses.A.thumb} {\n      color: ${disabled?semanticColors?.base?.iconDisabled:semanticColors?.base?.iconPrimary};\n      margin-right: ${spaces?.m}px;\n    }\n\n    .${switchClasses.A.switchBase} {\n      right: unset;\n      left: 0;\n      transform: unset;\n      padding: 0 ${spaces?.xs}px 0 ${spaces?.xxs}px;\n\n      .MuiIconButton-label {\n        margin-right: ${spaces?.s}px;\n      }\n\n      &:after {\n        color: ${disabled?semanticColors?.base?.textDisabled:semanticColors?.base?.textSecondary};\n        content: "${value}";\n      }\n    }\n\n    &:hover {\n      .${switchClasses.A.switchBase} {\n        &:after {\n          color: ${disabled?semanticColors?.base?.textDisabled:semanticColors?.base?.textPrimary};\n        }\n      }\n    }\n\n    .${switchClasses.A.track} {\n      background-color: ${semanticColors?.base?.fillPrimary} !important;\n      opacity: 1 !important;\n    }\n\n    ${!disabled&&`&:hover {\n        outline: ${borders?.base?.hover};\n\n        .${switchClasses.A.thumb} {\n          color: ${semanticColors?.base?.iconPrimaryHover};\n        }\n      }`}\n  `})(props)}\n    `})),InputToggle=props=>{const isControlled=void 0!==props.checked,[checked,setChecked]=(0,react.useState)(!1),finalChecked=isControlled?props.checked:checked,{offLabel="Off",onChange,onLabel="On",...rest}=props,labelValue=finalChecked?onLabel:offLabel;return(0,jsx_runtime.jsx)(Toggle,{checked:finalChecked,color:"primary",onChange:e=>{setChecked((currentChecked=>!currentChecked)),onChange?.(e)},value:labelValue,...rest})},core_InputToggle=InputToggle;InputToggle.__docgenInfo={description:"@see https://mui.com/material-ui/react-switch/",methods:[],displayName:"InputToggle",props:{offLabel:{required:!1,tsType:{name:"string"},description:""},onLabel:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"number"},description:""}},composes:["SwitchProps","CommonThemeProps"]}},"./packages/components/src/core/Link/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Link});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),Link=__webpack_require__("./node_modules/@mui/material/Link/Link.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const doNotForwardProps=["sdsStyle","sdsSize","fontWeight"],StyledLink=(0,emotion_styled_browser_esm.A)(Link.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop.toString()),target:"e308g570"})("all:unset;",styles.UT," ",(props=>{const{fontWeight="normal",sdsStyle,sdsSize="s"}=props;return(0,emotion_react_browser_esm.AH)("default"===sdsStyle&&(props=>{const{sdsSize="s"}=props,semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("color:",semanticColors?.accent?.textAction,';position:relative;&::after{content:"";display:block;position:absolute;height:1px;margin-top:',"s"===sdsSize?-4:-3,"px;width:100%;}&:hover{color:",semanticColors?.accent?.textActionHover,";&::after{background-color:",semanticColors?.accent?.borderHover,";}}&:focus{color:",semanticColors?.accent?.textActionHover,";&::after{background-color:",semanticColors?.accent?.borderHover,";}}&:active{color:",semanticColors?.accent?.textActionPressed,";&::after{background-color:",semanticColors?.accent?.borderPressed,";}}")})(props)," ","dashed"===sdsStyle&&(props=>{const{sdsSize="s"}=props,semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)('color:inherit;position:relative;&::after{content:"";display:block;position:absolute;height:1px;margin-top:',"s"===sdsSize?-4:-3,"px;margin-left:1px;width:100%;background-image:linear-gradient(\n        to right,",semanticColors?.base?.borderHover," 60%,transparent 60%\n      );background-size:5px 100%;}&:hover,&:focus{text-decoration:none;&::after{background-image:linear-gradient(\n          to right,",semanticColors?.base?.borderHover," 60%,",semanticColors?.base?.borderHover," 60%\n        );}}")})(props)," ","s"===sdsSize&&(props=>(0,styles.JU)(props))(props)," ","xs"===sdsSize&&(props=>(0,styles.Zo)(props))(props),"      font-weight:","normal"===fontWeight?"400":"600",";display:inline-block;cursor:pointer;")})),Link_Link=(0,react.forwardRef)(((props,ref)=>{const{sdsStyle}=props;let underline;return"default"===sdsStyle&&(underline="none"),(0,jsx_runtime.jsx)(StyledLink,{...props,underline,ref})})),core_Link=Link_Link;Link_Link.__docgenInfo={description:"@see https://mui.com/material-ui/react-link/",methods:[],displayName:"Link",props:{fontWeight:{required:!1,tsType:{name:"union",raw:'"normal" | "bold"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"bold"'}]},description:""},sdsStyle:{required:!1,tsType:{name:"union",raw:'"default" | "dashed"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"dashed"'}]},description:""},sdsSize:{required:!1,tsType:{name:"union",raw:'"xs" | "s"',elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"s"'}]},description:""}}}},"./packages/components/src/core/Notification/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Notification});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Slide=__webpack_require__("./node_modules/@mui/material/Slide/Slide.js"),Box=__webpack_require__("./node_modules/@mui/material/Box/Box.js"),react=__webpack_require__("./node_modules/react/index.js"),Button=__webpack_require__("./packages/components/src/core/Button/index.tsx"),Icon=__webpack_require__("./packages/components/src/core/Icon/index.tsx"),Alert=__webpack_require__("./node_modules/@mui/material/Alert/Alert.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const fontBodyXs=(0,styles.M9)("xs"),doNotForwardProps=["slideDirection"],StyledNotification=(0,emotion_styled_browser_esm.A)(Alert.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"eyhf6xj0"})(fontBodyXs," ",(props=>{const{intent="info"}=props,spaces=(0,styles.oZ)(props),shadows=(0,styles.CG)(props),corners=(0,styles.VP)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props),typography=(0,styles.Of)(props),borders=(0,styles.ow)(props),iconColor=semanticColors?.[intent]?.ornament??"black",backgroundColor=semanticColors?.[intent]?.surfacePrimary??"white",alertMessagePaddingTop=Math.abs(((iconSizes?.l.height??0)-parseInt(String(typography?.styles?.body?.regular?.xs?.lineHeight??"0")))/2);return`\n      background-color: ${backgroundColor};\n      max-width: 480px;\n      min-width: 280px;\n      box-sizing: border-box;\n      margin: ${spaces?.m}px 0;\n      border-radius: ${corners?.m}px;\n      color: ${semanticColors?.base?.textPrimary};\n      padding: ${spaces?.l}px;\n      align-items: flex-start;\n      border-left: ${borders?.[intent]?.extraThick};\n      box-shadow: ${shadows?.s};\n\n      .MuiAlert-icon {\n        height: ${iconSizes?.l.height}px;\n        width: ${iconSizes?.l.width}px;\n        margin-right: ${spaces?.m}px;\n        padding: 0;\n        path {\n          fill: ${iconColor};\n        }\n      }\n\n      .MuiAlert-message {\n        padding: ${alertMessagePaddingTop}px 0px 0px;\n        margin-right: ${spaces?.m}px;\n        width: 100%;\n\n        > * {\n          margin: ${spaces?.m}px 0px;\n\n          &:last-child {\n            margin-bottom: 0;\n          }\n        }\n\n        button {\n          display: block;\n        }\n      }\n\n      .MuiAlert-action {\n        margin-right: 0;\n        padding: 0;\n        align-items: flex-start;\n        margin-top: ${spaces?.xxs}px;\n\n        > button {\n            padding: 0;\n          }\n        }\n      }\n    `})),StyledButtonWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"eyhf6xj1"})((props=>{const{buttonPosition="right"}=props;return`\n      display: flex;\n      justify-content: ${"left"===buttonPosition?"flex-start":"flex-end"};\n    `})),Notification=({autoDismiss,children,dismissed,slideDirection="left",intent,onClose,buttonOnClick,buttonText,buttonPosition,icon,sdsIconProps,...rest})=>{const[hide,setHide]=(0,react.useState)(dismissed),passedProps={...rest};delete passedProps.extraContent,(0,react.useEffect)((()=>{if(setHide(dismissed),autoDismiss){setTimeout((()=>{setHide(!0)}),"boolean"==typeof autoDismiss?8e3:autoDismiss)}}),[dismissed,autoDismiss]);const handleClose=event=>{setHide(!0),onClose&&onClose(event)};return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(Slide.A,{in:!hide,direction:slideDirection,mountOnEnter:!0,unmountOnExit:!0,timeout:250,children:(0,jsx_runtime.jsx)(Box.A,{children:(0,jsx_runtime.jsxs)(StyledNotification,{onClose:onClose?handleClose:void 0,action:onClose?(0,jsx_runtime.jsx)(Button.A,{onClick:handleClose,sdsSize:"small",sdsType:"tertiary",sdsStyle:"icon","data-testid":"notificationCloseButton",icon:"XMark"}):null,icon:(()=>{if(void 0!==icon)return"string"!=typeof icon?icon:(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"l",sdsIcon:icon,sdsType:"static",...sdsIconProps});switch(intent){case"positive":return(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"l",sdsIcon:"CheckCircle",sdsType:"static"});case"info":return(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"l",sdsIcon:"InfoCircle",sdsType:"static"});default:return(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"l",sdsIcon:"ExclamationMarkCircle",sdsType:"static"})}})(),className:"elevated",intent,slideDirection,...passedProps,children:[children,void 0!==buttonOnClick&&(0,jsx_runtime.jsx)(StyledButtonWrapper,{buttonPosition,children:(0,jsx_runtime.jsx)(Button.A,{sdsStyle:"minimal",sdsType:"secondary",onClick:buttonOnClick,children:buttonText})})]})})})})},core_Notification=Notification;Notification.__docgenInfo={description:"@see https://mui.com/material-ui/react-alert/",methods:[],displayName:"Notification",props:{autoDismiss:{required:!1,tsType:{name:"union",raw:"boolean | number",elements:[{name:"boolean"},{name:"number"}]},description:""},buttonOnClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},buttonText:{required:!1,tsType:{name:"string"},description:""},buttonPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},dismissed:{required:!1,tsType:{name:"boolean"},description:""},slideDirection:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}},extraContent:{required:!1,tsType:{name:"boolean"},description:""},intent:{required:!0,tsType:{name:"union",raw:'| "info"\n| "negative"\n| "positive"\n| "notice"',elements:[{name:"literal",value:'"info"'},{name:"literal",value:'"negative"'},{name:"literal",value:'"positive"'},{name:"literal",value:'"notice"'}]},description:""},icon:{required:!1,tsType:{name:"union",raw:"keyof IconNameToSizes | React.ReactElement<CustomSVGProps>",elements:[{name:"IconNameToSizes"},{name:"ReactReactElement",raw:"React.ReactElement<CustomSVGProps>",elements:[{name:"CustomSVGProps"}]}]},description:""},sdsIconProps:{required:!1,tsType:{name:"Partial",elements:[{name:"IconProps",elements:[{name:"IconNameToSizes"}],raw:"IconProps<keyof IconNameToSizes>"}],raw:"Partial<IconProps<keyof IconNameToSizes>>"},description:""}}}},"./packages/components/src/core/TooltipTable/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>TooltipTable});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),TableContainer=__webpack_require__("./node_modules/@mui/material/TableContainer/TableContainer.js"),Table=__webpack_require__("./node_modules/@mui/material/Table/Table.js"),TableBody=__webpack_require__("./node_modules/@mui/material/TableBody/TableBody.js"),TableRow=__webpack_require__("./node_modules/@mui/material/TableRow/TableRow.js"),TableCell=__webpack_require__("./node_modules/@mui/material/TableCell/TableCell.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const sdsPropNames=["contentAlert","itemAlign"],disabledStyle=props=>{const{disabled}=props,semanticColors=(0,styles.Bd)(props);return disabled?`\n    color: ${semanticColors?.base?.textDisabled};\n  `:""},Section=(0,emotion_styled_browser_esm.A)("div",{target:"entuqa50"})(disabledStyle," ",(props=>{const spaces=(0,styles.oZ)(props),borders=(0,styles.ow)(props);return`\n      &:not(:last-child) {\n        padding-bottom: ${spaces?.m}px;\n        border-bottom: ${borders?.base?.divider};\n      }\n\n      &:not(:first-of-type) {\n        padding-top: ${spaces?.m}px;\n      }\n    `})),SectionLabel=(0,emotion_styled_browser_esm.A)("div",{target:"entuqa51"})(styles.Uw," ",disabledStyle," ",(props=>{const spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return props.label?`\n      margin-bottom: ${spaces?.s}px;      \n      color: ${semanticColors?.base?.textSecondary};\n    `:""})),RowLabel=(0,emotion_styled_browser_esm.A)(TableCell.A,{shouldForwardProp:prop=>!sdsPropNames.includes(prop.toString()),target:"entuqa52"})(styles.Zo," ",disabledStyle," ",(props=>{const spaces=(0,styles.oZ)(props);return`\n      padding: 0 0 ${spaces?.xxs}px 0;\n      width: 50%;\n      border-bottom: none;\n      font-weight: 600;\n    `})),RowValue=(0,emotion_styled_browser_esm.A)(TableCell.A,{shouldForwardProp:prop=>!sdsPropNames.includes(prop.toString()),target:"entuqa53"})(styles.aU," ",disabledStyle,"  padding-top:0;padding-bottom:0;padding-right:0 !important;border-bottom:none;"),Alert=(0,emotion_styled_browser_esm.A)("div",{target:"entuqa54"})(styles.Pf),TooltipTableContent=props=>{const{contentAlert,data,itemAlign="right",...rest}=props;return(0,jsx_runtime.jsxs)(TableContainer.A,{...rest,children:[contentAlert&&(0,jsx_runtime.jsx)(Alert,{children:contentAlert}),data?.map(((section,index)=>(0,jsx_runtime.jsxs)(Section,{disabled:section.disabled,children:[(0,jsx_runtime.jsx)(SectionLabel,{disabled:section.disabled,label:section.label,children:section.label}),(0,jsx_runtime.jsx)(Table.A,{size:"small",children:(0,jsx_runtime.jsx)(TableBody.A,{children:section.dataRows.map(((row,rowIndex)=>(0,jsx_runtime.jsxs)(TableRow.A,{children:[(0,jsx_runtime.jsx)(RowLabel,{disabled:section.disabled,align:"left",children:row.label}),(0,jsx_runtime.jsx)(RowValue,{disabled:section.disabled,align:itemAlign,children:row.value})]},row.label+String(rowIndex))))})})]},`${section.label+String(index)}`)))]})},TooltipTable=TooltipTableContent;TooltipTableContent.__docgenInfo={description:"@see https://mui.com/material-ui/react-table/",methods:[],displayName:"TooltipTableContent",props:{data:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n  label?: string;\n  dataRows: {\n    label: string;\n    value: string | number;\n  }[];\n  disabled?: boolean;\n}",signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"dataRows",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n  label: string;\n  value: string | number;\n}",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!0}}]}}],raw:"{\n  label: string;\n  value: string | number;\n}[]",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:"Array<{\n  label?: string;\n  dataRows: {\n    label: string;\n    value: string | number;\n  }[];\n  disabled?: boolean;\n}>"},description:""},contentAlert:{required:!1,tsType:{name:"union",raw:"string | JSX.Element",elements:[{name:"string"},{name:"JSX.Element"}]},description:""},itemAlign:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""}},composes:["CommonThemeProps"]}}}]);