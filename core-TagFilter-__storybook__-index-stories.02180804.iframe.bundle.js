"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[8467],{"./node_modules/@mui/system/esm/colorManipulator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X4:()=>alpha,e$:()=>darken});var _mui_utils_formatMuiErrorMessage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js"),_mui_utils_clamp__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@mui/utils/esm/clamp/clamp.js");function clampWrapper(value,min=0,max=1){return(0,_mui_utils_clamp__WEBPACK_IMPORTED_MODULE_0__.A)(value,min,max)}function decomposeColor(color){if(color.type)return color;if("#"===color.charAt(0))return decomposeColor(function hexToRgb(color){color=color.slice(1);const re=new RegExp(`.{1,${color.length>=6?2:1}}`,"g");let colors=color.match(re);return colors&&1===colors[0].length&&(colors=colors.map((n=>n+n))),colors?`rgb${4===colors.length?"a":""}(${colors.map(((n,index)=>index<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3)).join(", ")})`:""}(color));const marker=color.indexOf("("),type=color.substring(0,marker);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(type))throw new Error((0,_mui_utils_formatMuiErrorMessage__WEBPACK_IMPORTED_MODULE_1__.A)(9,color));let colorSpace,values=color.substring(marker+1,color.length-1);if("color"===type){if(values=values.split(" "),colorSpace=values.shift(),4===values.length&&"/"===values[3].charAt(0)&&(values[3]=values[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(colorSpace))throw new Error((0,_mui_utils_formatMuiErrorMessage__WEBPACK_IMPORTED_MODULE_1__.A)(10,colorSpace))}else values=values.split(",");return values=values.map((value=>parseFloat(value))),{type,values,colorSpace}}function recomposeColor(color){const{type,colorSpace}=color;let{values}=color;return-1!==type.indexOf("rgb")?values=values.map(((n,i)=>i<3?parseInt(n,10):n)):-1!==type.indexOf("hsl")&&(values[1]=`${values[1]}%`,values[2]=`${values[2]}%`),values=-1!==type.indexOf("color")?`${colorSpace} ${values.join(" ")}`:`${values.join(", ")}`,`${type}(${values})`}function alpha(color,value){return color=decomposeColor(color),value=clampWrapper(value),"rgb"!==color.type&&"hsl"!==color.type||(color.type+="a"),"color"===color.type?color.values[3]=`/${value}`:color.values[3]=value,recomposeColor(color)}function darken(color,coefficient){if(color=decomposeColor(color),coefficient=clampWrapper(coefficient),-1!==color.type.indexOf("hsl"))color.values[2]*=1-coefficient;else if(-1!==color.type.indexOf("rgb")||-1!==color.type.indexOf("color"))for(let i=0;i<3;i+=1)color.values[i]*=1-coefficient;return recomposeColor(color)}},"./packages/components/src/core/TagFilter/__storybook__/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,ScreenshotTest:()=>ScreenshotTest,Test:()=>Test,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),dist=__webpack_require__("./node_modules/@geometricpanda/storybook-addon-badges/dist/index.mjs"),react=__webpack_require__("./node_modules/react/index.js");const TAG_FILTER_EXCLUDED_CONTROLS=["label"],TAG_FILTER_DEFAULT_STYLES={display:"inline-grid",gridColumnGap:24,gridRowGap:24,gridTemplateColumns:"repeat(1, 1fr)",gridTemplateRows:"repeat(1, 1fr)"},TAG_FILTER_PSEUDO_STATES=["default","hover","active","focus"],TAG_FILTER_LABEL_STYLE={fontFamily:"sans-serif",fontSize:"0.67em",fontWeight:"normal",margin:"20px 0 10px"};var TagFilter=__webpack_require__("./packages/components/src/core/TagFilter/index.tsx"),Button=__webpack_require__("./packages/components/src/core/Button/index.tsx");const default_TagFilter=props=>{const{label}=props,[visible,setVisible]=(0,react.useState)(!0);return(0,jsx_runtime.jsxs)("div",{style:TAG_FILTER_DEFAULT_STYLES,children:[(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(Button.A,{disabled:visible,onClick:()=>setVisible(!0),sdsStyle:"minimal",sdsType:visible?"secondary":"primary",children:visible?"Delete the tag by clicking on its icon":"Click to reset"})}),(0,jsx_runtime.jsx)("div",{children:visible&&(0,jsx_runtime.jsx)(TagFilter.A,{label,onDelete:()=>setVisible(!1),...props})})]})};default_TagFilter.__docgenInfo={description:"",methods:[],displayName:"TagFilter"};const ScreenshotTestDemo=props=>{const{label}=props;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:TAG_FILTER_PSEUDO_STATES.map((state=>(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsxs)("p",{style:TAG_FILTER_LABEL_STYLE,children:["State: ",(0,jsx_runtime.jsx)("b",{children:state})]}),(0,jsx_runtime.jsx)(TagFilter.A,{"data-testid":"button",label,onDelete:()=>{},className:`pseudo-${state}`,...props},state)]},state)))})};ScreenshotTestDemo.__docgenInfo={description:"",methods:[],displayName:"ScreenshotTestDemo"};const TestDemo=props=>{const{label}=props;return(0,jsx_runtime.jsx)(TagFilter.A,{"data-testid":"tag-filter",label,onDelete:()=>{},...props})};TestDemo.__docgenInfo={description:"",methods:[],displayName:"TestDemo"};const index_stories={argTypes:{label:{control:{type:"text"},required:!0}},component:default_TagFilter,parameters:{badges:[dist.yq.STABLE]},title:"Components/TagFilter"},Default={args:{label:"TagFilter"}},ScreenshotTest={args:{label:"Label"},parameters:{controls:{exclude:TAG_FILTER_EXCLUDED_CONTROLS},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(ScreenshotTestDemo,{...args})},Test={args:{label:"Label"},parameters:{controls:{exclude:TAG_FILTER_EXCLUDED_CONTROLS},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(TestDemo,{...args,"data-testid":"tag-filter"})},__namedExportsOrder=["Default","ScreenshotTest","Test"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    label: "TagFilter"\n  }\n}',...Default.parameters?.docs?.source}}},ScreenshotTest.parameters={...ScreenshotTest.parameters,docs:{...ScreenshotTest.parameters?.docs,source:{originalSource:'{\n  args: {\n    label: "Label"\n  },\n  parameters: {\n    controls: {\n      exclude: TAG_FILTER_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <ScreenshotTestDemo {...args} />\n}',...ScreenshotTest.parameters?.docs?.source}}},Test.parameters={...Test.parameters,docs:{...Test.parameters?.docs,source:{originalSource:'{\n  args: {\n    label: "Label"\n  },\n  parameters: {\n    controls: {\n      exclude: TAG_FILTER_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <TestDemo {...args} data-testid="tag-filter" />\n}',...Test.parameters?.docs?.source}}}},"./packages/components/src/core/Tag/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Tag});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),colorManipulator=__webpack_require__("./node_modules/@mui/system/esm/colorManipulator.js"),Chip=__webpack_require__("./node_modules/@mui/material/Chip/Chip.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");function generatePrimaryTagColors(intent,colors,semanticColors){return intent||colors.length?(intent=intent||"neutral",{background:colors.length>=2?colors[1]:semanticColors?.[intent].fillPrimary,backgroundClicked:colors.length>=2?(0,colorManipulator.e$)(colors[1],.3):semanticColors?.[intent].fillPressed,backgroundHover:colors.length>=2?(0,colorManipulator.e$)(colors[1],.15):semanticColors?.[intent].fillHover,iconColor:colors.length>2?colors[2]:semanticColors?.base?.ornamentOnFill,label:colors.length?colors[0]:semanticColors?.base?.textOnFill}):{background:semanticColors?.neutral.fillPrimary,backgroundClicked:semanticColors?.neutral.fillPressed,backgroundHover:semanticColors?.neutral.fillHover,iconColor:semanticColors?.base?.ornamentOnFill,label:semanticColors?.base?.textOnFill}}function generateSecondaryTagColors(intent,colors,semanticColors){return intent||colors.length?(intent=intent||"neutral",{background:colors.length>=2?colors[1]:semanticColors?.[intent].fillSecondary,backgroundClicked:colors.length>=2?(0,colorManipulator.e$)(colors[1],.3):semanticColors?.[intent].fillPressed,backgroundHover:colors.length>=2?(0,colorManipulator.e$)(colors[1],.15):semanticColors?.[intent].fillHover,iconColor:colors.length>2?colors[2]:semanticColors?.[intent].ornament,label:colors.length?colors[0]:semanticColors?.[intent].text}):{background:semanticColors?.neutral.fillSecondary,backgroundClicked:semanticColors?.neutral.fillPressed,backgroundHover:semanticColors?.neutral.fillHover,iconColor:semanticColors?.neutral.ornament,label:semanticColors?.neutral.fillPressed}}function createTypeCss(props,type){const semanticColors=(0,styles.Bd)(props),intent="string"==typeof props.tagColor?props.tagColor:null,colors=Array.isArray(props.tagColor)?[...props.tagColor]:[],typeColors={primary:generatePrimaryTagColors(intent,colors,semanticColors),secondary:generateSecondaryTagColors(intent,colors,semanticColors)}[type];return(0,emotion_react_browser_esm.AH)((0,styles.UT)(props),"    background-color:",typeColors.background,";position:relative;.MuiChip-label{color:",typeColors.label,";}svg{fill:",typeColors.iconColor,";}&:hover,&:active{.MuiChip-label{color:",semanticColors?.base?.textPrimaryInverse,";}svg{fill:",semanticColors?.base?.ornamentPrimaryInverse,";}}&:hover{background-color:",typeColors.backgroundHover,";}&:active{background-color:",typeColors.backgroundClicked,";}&.Mui-focusVisible{background-color:",typeColors.backgroundHover,";}x")}const typeToCss={primary:props=>createTypeCss(props,"primary"),secondary:props=>createTypeCss(props,"secondary")},doNotForwardProps=["sdsType","sdsStyle","sdsSize","tagColor","hover"],StyledTag=(0,emotion_styled_browser_esm.A)(Chip.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rh5br0"})("border:none;",(props=>{const{hover=!0,sdsType,sdsStyle,sdsSize="s"}=props,isRounded="rounded"===sdsStyle,type=sdsType||"primary";return(0,emotion_react_browser_esm.AH)("l"===sdsSize?(props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("height:unset;margin:0 ",spaces?.xxs,"px ",spaces?.xs,"px 0;.MuiChip-label{",(0,styles.Zo)(props),"      padding:0;}.MuiSvgIcon-root{height:",iconSizes?.l.height,"px;width:",iconSizes?.l.width,"px;margin:0 ",spaces?.xxs,"px 0 -",spaces?.xxxs,"px;}.MuiChip-deleteIcon{",(0,styles.Se)(props),"      color:",semanticColors?.base?.ornamentPrimaryInverse,";margin:0 0 0 ",spaces?.xxs,"px;height:",iconSizes?.s.height,"px;width:",iconSizes?.s.width,"px;}")})(props):(props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("height:unset;margin:0 ",spaces?.xxs,"px ",spaces?.xs,"px 0;.MuiChip-label{",(0,styles.jT)(props),"      padding:0;}.MuiSvgIcon-root{height:",iconSizes?.xs.height,"px;width:",iconSizes?.xs.width,"px;margin:0 ",spaces?.xxs,"px 0 -",spaces?.xxxs,"px;}.MuiChip-deleteIcon{",(0,styles.Se)(props),"      color:",semanticColors?.base?.ornamentPrimaryInverse,";margin:0 0 0 ",spaces?.xxs,"px;height:",iconSizes?.s.height,"px;width:",iconSizes?.s.width,"px;}")})(props)," ",typeToCss[type](props)," ",isRounded?(props=>{const corners=(0,styles.VP)(props),spaces=(0,styles.oZ)(props),{sdsSize="s",icon}=props,topBottomPadding="s"===sdsSize?spaces?.xxxs:icon?spaces?.xxs:spaces?.xs;return(0,emotion_react_browser_esm.AH)("border-radius:",corners?.l,"px;padding:",topBottomPadding,"px ",spaces?.s,"px;&:after{border-radius:",corners?.l,"px;}")})(props):(props=>{const corners=(0,styles.VP)(props),spaces=(0,styles.oZ)(props),{sdsSize="s",icon}=props,topBottomPadding="s"===sdsSize?spaces?.xxxs:icon?spaces?.xxs:spaces?.xs;return(0,emotion_react_browser_esm.AH)("border-radius:",corners?.m,"px;padding:",topBottomPadding,"px ",spaces?.s,"px;&:after{border-radius:",corners?.m,"px;}")})(props)," ",hover?(props=>{const semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("&:hover{cursor:pointer;}&:hover,&:focus-visible{color:",semanticColors?.base?.textPrimaryInverse,";}")})(props):"pointer-events: none;")})),Tag=props=>{const{color}=props;return(0,jsx_runtime.jsx)(StyledTag,{tagColor:color,...props,color:"primary"})},core_Tag=Tag;Tag.__docgenInfo={description:"@see https://mui.com/material-ui/react-chip/\n\n@props color: {string}                   - applies color for tag based on default theme color values\n              [string, string]           - applies custom colors for [font, background]\n              [string, string, string]   - applies custom colors for [font, background, icon]",methods:[],displayName:"Tag",props:{label:{required:!0,tsType:{name:"string"},description:""},color:{required:!1,tsType:{name:"union",raw:'| "info"\n| "positive"\n| "notice"\n| "negative"\n| "neutral"\n| "beta"\n| [string, string]\n| [string, string, string]',elements:[{name:"literal",value:'"info"'},{name:"literal",value:'"positive"'},{name:"literal",value:'"notice"'},{name:"literal",value:'"negative"'},{name:"literal",value:'"neutral"'},{name:"literal",value:'"beta"'},{name:"tuple",raw:"[string, string]",elements:[{name:"string"},{name:"string"}]},{name:"tuple",raw:"[string, string, string]",elements:[{name:"string"},{name:"string"},{name:"string"}]}]},description:""}},composes:["Omit"]}},"./packages/components/src/core/TagFilter/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_TagFilter});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),emotion_react_browser_esm=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js")),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts"),Tag=__webpack_require__("./packages/components/src/core/Tag/index.tsx");const StyledTag=(0,emotion_styled_browser_esm.A)(Tag.A,{target:"ekzxqc30"})((props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("padding:",spaces?.xxs,"px ",spaces?.s,"px;background-color:",semanticColors?.accent?.fillPrimary,";.MuiChip-label{",(0,styles.Se)(props),"        z-index:auto;}.MuiChip-deleteIcon{margin:0 0 0 ",spaces?.s,"px;width:",iconSizes?.xs?.width,"px !important;height:",iconSizes?.xs?.height,"px !important;}.MuiSvgIcon-root{margin:0;width:",iconSizes?.xs?.width,"px !important;height:",iconSizes?.xs?.height,"px !important;}svg{z-index:auto;}&:hover,&:focus,&:focus-within{background-color:",semanticColors?.accent?.fillHover,";.MuiChip-label{color:",semanticColors?.base?.textPrimaryInverse," !important;}.MuiChip-deleteIcon svg{fill:",semanticColors?.base?.ornamentPrimaryInverse," !important;}}&:active{background-color:",semanticColors?.accent?.fillPressed,";}&:after{display:none;}")}));var Button=__webpack_require__("./packages/components/src/core/Button/index.tsx");const TagFilter=props=>(0,jsx_runtime.jsx)(StyledTag,{role:"none presentation",...props,deleteIcon:(0,jsx_runtime.jsx)(Button.A,{"aria-label":"Delete Tag",icon:"XMark",sdsSize:"small",sdsType:"tertiary",sdsStyle:"icon"}),color:"info"}),core_TagFilter=TagFilter;TagFilter.__docgenInfo={description:"@see https://mui.com/material-ui/react-chip/",methods:[],displayName:"TagFilter",props:{label:{required:!0,tsType:{name:"string"},description:""},onDelete:{required:!0,tsType:{name:"ReactEventHandler",raw:"React.EventHandler<any>",elements:[{name:"any"}]},description:""}},composes:["Omit"]}}}]);