"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[3394],{"./packages/components/src/core/Bases/Corners/__storybook__/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),storybookBadges=__webpack_require__("./packages/components/src/common/storybook/storybookBadges.ts"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const StyledCornersWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e177frg00"})("max-width:100%;"),StyledCornerBox=(0,emotion_styled_browser_esm.A)("div",{target:"e177frg01"})((props=>{const{size}=props,semanticColors=(0,styles.Bd)(props);return`\n      position: relative;\n      margin-left: 10px;\n      width: 60px;\n      height: 60px;\n      background-color: transparent;\n      border-radius: ${size+2}px;\n\n      background-position:  0 0, 0 0, 100% 0, 0 100%;\n      background-size: 10px 100%, 100% 10px, 10px 100% , 100% 10px;\n      background-repeat: no-repeat;\n      background-image:\n        none, // left\n        linear-gradient(90deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // top\n        linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // right\n        none // bottom\n      ;\n\n      &::after {\n        content: "";\n        position: absolute;\n        background-color: ${semanticColors?.base?.backgroundSecondary};\n        width: 56px;\n        height: 56px;\n        top: 2px;\n        left: 2px;\n        border-radius: ${size}px;\n      }\n\n      &:hover {\n        animation: boxBorderAnimation 2s infinite linear;\n      }\n\n      @keyframes boxBorderAnimation {\n        0% {\n          background-image:\n            none, // left\n            linear-gradient(90deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // top\n            linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // right\n            none // bottom\n          ;\n        }\n        12.5% {\n          background-image:\n            none, // left\n            none, // top\n            linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%, transparent 100%), // right\n            none // bottom\n          ;\n        }\n        25% {\n          background-image:\n            none, // left\n            none, // top\n            linear-gradient(180deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // right\n            linear-gradient(270deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%) // bottom\n          ;\n        }\n        37.5% {\n          background-image:\n            none, // left\n            none, // top\n            none, // right\n            linear-gradient(270deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%, transparent 100%) // bottom\n          ;\n        }\n        50% {\n          background-image:\n            linear-gradient(0deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // left\n            none, // top\n            none, // right\n            linear-gradient(270deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%) // bottom\n          ;\n        }\n        62.5% {\n          background-image:\n            linear-gradient(0deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%), // left\n            none, // top\n            none, // right\n            none // bottom\n          ;\n        }\n        75% {\n          background-image:\n            linear-gradient(0deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // left\n            linear-gradient(90deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // top\n            none, // right\n            none // bottom\n          ;\n        }\n        87.5% {\n          background-image:\n          none, // left\n          linear-gradient(90deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%), // top\n          none, // right\n          none // bottom\n        ;\n        }\n        100% {\n          background-image:\n            none, // left\n            linear-gradient(90deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // top\n            linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // right\n            none // bottom\n          ;\n        }\n      }\n    `})),StyledCornerVariable=(0,emotion_styled_browser_esm.A)("p",{target:"e177frg02"})(styles.K," ",(props=>{const fontWeights=(0,styles.bI)(props);return`\n      margin: 0;\n      cursor: pointer;\n\n      &:active {\n        font-weight: ${fontWeights?.semibold};\n      }\n    `}));var Table=__webpack_require__("./packages/components/src/core/Table/index.tsx"),TableHeader=__webpack_require__("./packages/components/src/core/TableHeader/index.tsx"),CellHeader=__webpack_require__("./packages/components/src/core/CellHeader/index.tsx"),TableRow=__webpack_require__("./packages/components/src/core/TableRow/index.tsx"),CellComponent=__webpack_require__("./packages/components/src/core/CellComponent/index.tsx"),CellBasic=__webpack_require__("./packages/components/src/core/CellBasic/index.tsx"),utils=__webpack_require__("./packages/components/src/core/Bases/utils.ts"),style=__webpack_require__("./packages/components/src/core/Bases/style.ts");const CORNERS_USAGE={l:"Rounded elements (buttons and inputs)",m:"Standard, default radius for corners in UI elements (square buttons, form inputs, modals, tooltips, tags, etc.)",none:"Corners on backgrounds for hovered dropdown menus and tables.",s:"Corners on elements that are smaller than 20px × 20px."},CORNERS_TITLE={l:"Large Corner",m:"Medium Corner",none:"No Corner",s:"Small Corner"};var useTheme=__webpack_require__("./node_modules/@mui/material/styles/useTheme.js");const Template=()=>{const theme=(0,useTheme.A)(),corners=(0,styles.VP)({theme});if(corners){const TableBodyContent=Object.entries(corners).sort(((a,b)=>b[1]-a[1])).map((([key,value])=>((size,name)=>{const sassVariable="$sds-corner-"+name,cssVariable="--sds-corner-"+name;return(0,jsx_runtime.jsxs)(TableRow.A,{hover:!1,children:[(0,jsx_runtime.jsx)(CellComponent.A,{verticalAlign:"center",horizontalAlign:"center",children:(0,jsx_runtime.jsx)(StyledCornerBox,{size})}),(0,jsx_runtime.jsx)(CellBasic.A,{primaryText:CORNERS_TITLE[name],verticalAlign:"center",shouldShowTooltipOnHover:!1}),(0,jsx_runtime.jsxs)(CellComponent.A,{verticalAlign:"center",children:[(0,jsx_runtime.jsx)(style.k,{onClick:()=>(0,utils.lW)(sassVariable),type:"sass",children:sassVariable}),(0,jsx_runtime.jsx)(style.k,{onClick:()=>(0,utils.lW)(cssVariable),type:"css",children:cssVariable})]}),(0,jsx_runtime.jsx)(CellComponent.A,{verticalAlign:"center",children:(0,jsx_runtime.jsx)(StyledCornerVariable,{children:`${size}px`})}),(0,jsx_runtime.jsx)(CellBasic.A,{verticalAlign:"center",primaryText:CORNERS_USAGE[name],shouldShowTooltipOnHover:!1})]},name)})(value,key)));return(0,jsx_runtime.jsxs)(Table.A,{children:[(0,jsx_runtime.jsxs)(TableHeader.A,{children:[(0,jsx_runtime.jsx)(CellHeader.A,{hideSortIcon:!0,style:{width:120},children:"Example"}),(0,jsx_runtime.jsx)(CellHeader.A,{hideSortIcon:!0,children:"Corner Type"}),(0,jsx_runtime.jsx)(CellHeader.A,{hideSortIcon:!0,children:"Variables"}),(0,jsx_runtime.jsx)(CellHeader.A,{hideSortIcon:!0,children:"Value"}),(0,jsx_runtime.jsx)(CellHeader.A,{hideSortIcon:!0,children:"Usage"})]}),(0,jsx_runtime.jsx)("tbody",{children:TableBodyContent})]})}};Template.__docgenInfo={description:"",methods:[],displayName:"Template"};const index_stories={parameters:{badges:[storybookBadges.y.STABLE]},title:"Bases/Corners"},Default={render:()=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(StyledCornersWrapper,{children:(0,jsx_runtime.jsx)(Template,{})})})},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <>\n      <StyledCornersWrapper>\n        <Template />\n      </StyledCornersWrapper>\n    </>\n}",...Default.parameters?.docs?.source}}}},"./packages/components/src/core/CellBasic/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_CellBasic});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),Tooltip=__webpack_require__("./packages/components/src/core/Tooltip/index.tsx"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const doNotForwardProps=["icon","iconVerticalAlign","horizontalAlign","verticalAlign","primaryText","secondaryText","tertiaryText","shouldTextWrap","shouldShowTooltipOnHover","tooltipProps","primaryTextWrapLineCount","secondaryTextWrapLineCount","tertiaryTextWrapLineCount","primaryTextComponentSlotBottom","primaryTextComponentSlotRight"],verticalAlignCSSMap={bottom:"bottom",center:"middle",top:"top"},verticalAlignToFlexMap={bottom:"flex-end",center:"center",top:"flex-start"},StyledTableData=(0,emotion_styled_browser_esm.A)("td",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl60"})(styles.JU," ",styles.UT," ",(props=>{const{horizontalAlign="left",verticalAlign="top"}=props,spaces=(0,styles.oZ)(props);return`\n        padding: ${spaces?.l}px ${spaces?.m}px;\n        text-align: ${horizontalAlign};\n        vertical-align: ${verticalAlignCSSMap[verticalAlign]};\n        overflow: hidden;\n    `})),ShouldWrap=lineCount=>`\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-line-clamp: ${lineCount};\n    -webkit-box-orient: vertical; \n  `,StyledCellContent=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl61"})("display:flex;"),StyledCellContentWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl62"})("width:100%;"),StyledCellIconWrapper=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl63"})((props=>{const{iconVerticalAlign="top"}=props,spaces=(0,styles.oZ)(props);return`\n      padding-right: ${spaces?.l}px;\n      display: flex;\n      flex-direction: column;\n      justify-content: ${verticalAlignToFlexMap[iconVerticalAlign]};\n    `})),PrimaryTextWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl64"})((props=>{const{horizontalAlign}=props;return`\n      display: flex;\n      justify-content: ${"left"===horizontalAlign?"flex-start":"flex-end"};\n    `})),PrimaryText=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl65"})(styles.JU," ",(props=>{const{primaryTextWrapLineCount=3}=props;return`\n      display: block;\n      ${props.shouldTextWrap?ShouldWrap(primaryTextWrapLineCount):"\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n  "}\n    `})),SecondaryText=(0,emotion_styled_browser_esm.A)("span",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl66"})(styles.Pf," ",(props=>{const{secondaryTextWrapLineCount=1}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n      display: block;\n      color: ${semanticColors?.base?.textSecondary};\n      padding-top: ${spaces?.xxxs}px;\n\n      ${props.shouldTextWrap?ShouldWrap(secondaryTextWrapLineCount):"\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n  "}\n    `})),TertiaryText=(0,emotion_styled_browser_esm.A)("span",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl67"})(styles.Pf," ",(props=>{const{tertiaryTextWrapLineCount=1}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n      display: block;\n      color: ${semanticColors?.base?.textSecondary};\n      padding-top: ${spaces?.s}px;\n\n      ${props.shouldTextWrap?ShouldWrap(tertiaryTextWrapLineCount):"\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n  "}\n    `})),PrimaryTextComponentSlotBottomWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl68"})((props=>{const spaces=(0,styles.oZ)(props);return`\n      margin-top: ${spaces?.xxs}px;\n    `})),PrimaryTextComponentSlotRightWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl69"})((props=>{const spaces=(0,styles.oZ)(props);return`\n      margin-left: ${spaces?.xs}px;\n    `})),CellBasicContent=props=>{const{primaryText,primaryTextWrapLineCount,secondaryText,secondaryTextWrapLineCount,tertiaryText,tertiaryTextWrapLineCount,shouldTextWrap=!0,icon,iconVerticalAlign,primaryTextComponentSlotRight,primaryTextComponentSlotBottom,horizontalAlign="left"}=props;return(0,jsx_runtime.jsxs)(StyledCellContent,{children:[icon&&(0,jsx_runtime.jsx)(StyledCellIconWrapper,{iconVerticalAlign,children:icon}),(0,jsx_runtime.jsxs)(StyledCellContentWrapper,{children:[(0,jsx_runtime.jsxs)(PrimaryTextWrapper,{horizontalAlign,children:[(0,jsx_runtime.jsx)(PrimaryText,{shouldTextWrap,primaryTextWrapLineCount,children:primaryText}),primaryTextComponentSlotRight&&(0,jsx_runtime.jsx)(PrimaryTextComponentSlotRightWrapper,{children:primaryTextComponentSlotRight})]}),!secondaryText&&!tertiaryText&&primaryTextComponentSlotBottom&&(0,jsx_runtime.jsx)(PrimaryTextComponentSlotBottomWrapper,{children:primaryTextComponentSlotBottom}),secondaryText&&(0,jsx_runtime.jsx)(SecondaryText,{shouldTextWrap,secondaryTextWrapLineCount,children:secondaryText}),tertiaryText&&(0,jsx_runtime.jsx)(TertiaryText,{shouldTextWrap,tertiaryTextWrapLineCount,children:tertiaryText})]})]})},CellBasic=(0,react.forwardRef)(((props,ref)=>{const{primaryText,secondaryText,shouldShowTooltipOnHover=!0,tooltipProps}=props;return shouldShowTooltipOnHover?(0,jsx_runtime.jsx)(Tooltip.A,{title:primaryText,subtitle:secondaryText,arrow:!0,leaveDelay:0,leaveTouchDelay:0,sdsStyle:"dark",...tooltipProps,children:(0,jsx_runtime.jsx)(StyledTableData,{ref,...props,children:(0,jsx_runtime.jsx)(CellBasicContent,{...props})})}):(0,jsx_runtime.jsx)(StyledTableData,{ref,...props,children:(0,jsx_runtime.jsx)(CellBasicContent,{...props})})})),core_CellBasic=CellBasic;CellBasic.__docgenInfo={description:"",methods:[],displayName:"CellBasic",props:{shouldShowTooltipOnHover:{required:!1,tsType:{name:"boolean"},description:""},tooltipProps:{required:!1,tsType:{name:"Partial",elements:[{name:"TooltipProps"}],raw:"Partial<TooltipProps>"},description:""},horizontalAlign:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},verticalAlign:{required:!1,tsType:{name:"union",raw:'"top" | "center" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"center"'},{name:"literal",value:'"bottom"'}]},description:""},iconVerticalAlign:{required:!1,tsType:{name:"union",raw:'"top" | "center" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"center"'},{name:"literal",value:'"bottom"'}]},description:""},shouldTextWrap:{required:!1,tsType:{name:"boolean"},description:""},primaryTextWrapLineCount:{required:!1,tsType:{name:"number"},description:""},secondaryTextWrapLineCount:{required:!1,tsType:{name:"number"},description:""},tertiaryTextWrapLineCount:{required:!1,tsType:{name:"number"},description:""},primaryText:{required:!0,tsType:{name:"string"},description:""},secondaryText:{required:!1,tsType:{name:"string"},description:""},tertiaryText:{required:!1,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactReactElement",raw:"React.ReactElement<CustomSVGProps>",elements:[{name:"CustomSVGProps"}]},description:""},primaryTextComponentSlotRight:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},primaryTextComponentSlotBottom:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["CommonThemeProps","Omit"]}}}]);