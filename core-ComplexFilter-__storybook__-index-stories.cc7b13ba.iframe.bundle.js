"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[6007],{"./node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>ClickAwayListener});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mui/utils/useForkRef/useForkRef.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mui/utils/useEventCallback/useEventCallback.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mui/utils/ownerDocument/ownerDocument.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");function mapEventPropToEvent(eventProp){return eventProp.substring(2).toLowerCase()}function ClickAwayListener(props){const{children,disableReactTree=!1,mouseEvent="onClick",onClickAway,touchEvent="onTouchEnd"}=props,movedRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),nodeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),activatedRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),syntheticEventRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1);react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>(setTimeout((()=>{activatedRef.current=!0}),0),()=>{activatedRef.current=!1})),[]);const handleRef=(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.A)(children.ref,nodeRef),handleClickAway=(0,_mui_utils__WEBPACK_IMPORTED_MODULE_3__.A)((event=>{const insideReactTree=syntheticEventRef.current;syntheticEventRef.current=!1;const doc=(0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__.A)(nodeRef.current);if(!activatedRef.current||!nodeRef.current||"clientX"in event&&function clickedRootScrollbar(event,doc){return doc.documentElement.clientWidth<event.clientX||doc.documentElement.clientHeight<event.clientY}(event,doc))return;if(movedRef.current)return void(movedRef.current=!1);let insideDOM;insideDOM=event.composedPath?event.composedPath().indexOf(nodeRef.current)>-1:!doc.documentElement.contains(event.target)||nodeRef.current.contains(event.target),insideDOM||!disableReactTree&&insideReactTree||onClickAway(event)})),createHandleSynthetic=handlerName=>event=>{syntheticEventRef.current=!0;const childrenPropsHandler=children.props[handlerName];childrenPropsHandler&&childrenPropsHandler(event)},childrenProps={ref:handleRef};return!1!==touchEvent&&(childrenProps[touchEvent]=createHandleSynthetic(touchEvent)),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{if(!1!==touchEvent){const mappedTouchEvent=mapEventPropToEvent(touchEvent),doc=(0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__.A)(nodeRef.current),handleTouchMove=()=>{movedRef.current=!0};return doc.addEventListener(mappedTouchEvent,handleClickAway),doc.addEventListener("touchmove",handleTouchMove),()=>{doc.removeEventListener(mappedTouchEvent,handleClickAway),doc.removeEventListener("touchmove",handleTouchMove)}}}),[handleClickAway,touchEvent]),!1!==mouseEvent&&(childrenProps[mouseEvent]=createHandleSynthetic(mouseEvent)),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{if(!1!==mouseEvent){const mappedMouseEvent=mapEventPropToEvent(mouseEvent),doc=(0,_mui_utils__WEBPACK_IMPORTED_MODULE_4__.A)(nodeRef.current);return doc.addEventListener(mappedMouseEvent,handleClickAway),()=>{doc.removeEventListener(mappedMouseEvent,handleClickAway)}}}),[handleClickAway,mouseEvent]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children,childrenProps)})}},"./node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),extendSxProp=__webpack_require__("./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("./node_modules/@mui/utils/composeClasses/composeClasses.js"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("./node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("./node_modules/@mui/material/utils/capitalize.js"),generateUtilityClasses=__webpack_require__("./node_modules/@mui/utils/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("./node_modules/@mui/utils/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Ay)("MuiTypography",slot)}(0,generateUtilityClasses.A)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.Ay)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.A)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.A)({margin:0},"inherit"===ownerState.variant&&{font:"inherit"},"inherit"!==ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.A)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.A)((0,esm_extends.A)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.A)(props,_excluded),ownerState=(0,esm_extends.A)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.A)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.A)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.A)({as:Component,ref,ownerState,className:(0,clsx.A)(classes.root,className)},other))}))},"./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mui/utils/deepmerge/deepmerge.js"),_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js");const _excluded=["sx"],splitProps=props=>{var _props$theme$unstable,_props$theme;const result={systemProps:{},otherProps:{}},config=null!=(_props$theme$unstable=null==props||null==(_props$theme=props.theme)?void 0:_props$theme.unstable_sxConfig)?_props$theme$unstable:_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__.A;return Object.keys(props).forEach((prop=>{config[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.A)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.Q)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.A)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.A)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.A)({},otherProps,{sx:finalSx})}},"./packages/components/src/core/ComplexFilter/__storybook__/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Test:()=>Test,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),dist=__webpack_require__("./node_modules/@geometricpanda/storybook-addon-badges/dist/index.mjs"),utils=__webpack_require__("./packages/components/src/common/utils.ts");const COMPLEX_FILTER_ON_CHANGE_OPTIONS=[utils.lQ,value=>{console.log(value)}];var AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS=__webpack_require__("./packages/components/src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.tsx"),ComplexFilter=__webpack_require__("./packages/components/src/core/ComplexFilter/index.tsx");const default_ComplexFilter=props=>(0,jsx_runtime.jsx)(ComplexFilter.Ay,{label:"Click Target",onChange:utils.lQ,options:AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G,DropdownMenuProps:{groupBy:option=>option.section,width:400},...props});default_ComplexFilter.__docgenInfo={description:"",methods:[],displayName:"ComplexFilter"};const TestDemo=props=>(0,jsx_runtime.jsx)(ComplexFilter.Ay,{label:"Click Target",onChange:utils.lQ,options:AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G,...props});TestDemo.__docgenInfo={description:"",methods:[],displayName:"TestDemo"};const index_stories={argTypes:{isTriggerChangeOnOptionClick:{control:{type:"boolean"}},label:{control:{type:"text"}},multiple:{control:{type:"boolean"}},onChange:{control:{labels:["Noop","console.log(value)"],type:"select"},mapping:COMPLEX_FILTER_ON_CHANGE_OPTIONS,options:Object.keys(COMPLEX_FILTER_ON_CHANGE_OPTIONS)},search:{control:{type:"boolean"}}},component:default_ComplexFilter,parameters:{badges:[dist.yq.STABLE]},title:"Components/Dropdowns/ComplexFilter"},Default={args:{isTriggerChangeOnOptionClick:!1,label:"Click Target",multiple:!0,onChange:COMPLEX_FILTER_ON_CHANGE_OPTIONS[1],search:!0}},Test={parameters:{controls:{exclude:["label","multiple","onChange","search","keepSearchOnSelect"]},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(TestDemo,{...args,"data-testid":"complex-filter"})},__namedExportsOrder=["Default","Test"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    isTriggerChangeOnOptionClick: false,\n    label: "Click Target",\n    multiple: true,\n    onChange: COMPLEX_FILTER_ON_CHANGE_OPTIONS[1],\n    search: true\n  }\n}',...Default.parameters?.docs?.source}}},Test.parameters={...Test.parameters,docs:{...Test.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    controls: {\n      exclude: COMPLEX_FILTER_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <TestDemo {...args} data-testid="complex-filter" />\n}',...Test.parameters?.docs?.source}}}},"./packages/components/src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_core_Tag__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/core/Tag/index.tsx"),_customSdsIcon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/common/storybook/customSdsIcon.tsx"),_customSvgIcon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/src/common/storybook/customSvgIcon.tsx");const AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS=[{name:"Status: can't reproduce",section:"name only"},{name:"Status: confirmed",section:"name only"},{count:3,name:"Status: duplicate",section:"name with count"},{count:5,name:"Status: needs information",section:"name with count"},{details:"This will not be worked on",name:"Status: wont do/fix",section:"name with details"},{details:"This is still in progress",name:"Status: work in progress",section:"name with details"},{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_customSdsIcon__WEBPACK_IMPORTED_MODULE_2__.A,{sdsSize:"s",color:"gray",shade:500}),name:"Custom SDS Icon",section:"With Icon"},{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_customSvgIcon__WEBPACK_IMPORTED_MODULE_3__.A,{sx:{color:"#969696",height:16,width:16}}),name:"Custom SVG Icon",section:"With Icon"},{icon:"PuzzlePiece",name:"Puzzle Piece",sdsIconProps:{color:"gray",shade:500},section:"With Icon"},{count:10,icon:"Copy",name:"Copy",sdsIconProps:{color:"gray",shade:500},section:"With Icon"},{icon:"LightBulb",name:"Light Bulb",sdsIconProps:{color:"gray",shade:500},section:"With Icon"},{count:6,icon:"List",name:"List",sdsIconProps:{color:"gray",shade:500},section:"With Icon"},{icon:"TreeVertical",name:"Vertical Tree",sdsIconProps:{color:"gray",shade:500},section:"With Icon"},{icon:"Link",name:"Link",sdsIconProps:{color:"gray",shade:500},section:"With Icon"},{component:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:["Available Labels:",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{marginTop:10},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_core_Tag__WEBPACK_IMPORTED_MODULE_1__.A,{label:"bug",sdsStyle:"rounded",sdsType:"secondary",color:"negative",hover:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_core_Tag__WEBPACK_IMPORTED_MODULE_1__.A,{label:"feature",sdsStyle:"rounded",sdsType:"secondary",color:"positive",hover:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_core_Tag__WEBPACK_IMPORTED_MODULE_1__.A,{label:"refactor",sdsStyle:"rounded",sdsType:"secondary",color:"neutral",hover:!1})]})]}),name:"Available labels",section:"custom component"}]},"./packages/components/src/common/storybook/customSdsIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_core_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/core/Icon/index.tsx");function CustomSdsIcon(props){const{sdsIcon="Bacteria",sdsSize="l",sdsType="static",color="blue",shade=400,...rest}=props;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_core_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{sdsIcon,sdsSize,sdsType,color,shade,...rest})}const __WEBPACK_DEFAULT_EXPORT__=CustomSdsIcon;CustomSdsIcon.__docgenInfo={description:"CustomSdsIcon is an Icon component built on top of the core SDS Icon.\nThis custom component is designed for use in Storybook demos,\nallowing easy customization.",methods:[],displayName:"CustomSdsIcon",props:{sdsIcon:{required:!1,tsType:{name:'intersection["sdsIcon"]',raw:'IconProps<"Bacteria">["sdsIcon"]'},description:""},sdsSize:{required:!1,tsType:{name:'intersection["sdsSize"]',raw:'IconProps<"Bacteria">["sdsSize"]'},description:""},sdsType:{required:!1,tsType:{name:'intersection["sdsType"]',raw:'IconProps<"Bacteria">["sdsType"]'},description:""},color:{required:!1,tsType:{name:'intersection["color"]',raw:'IconProps<"Bacteria">["color"]'},description:""},shade:{required:!1,tsType:{name:'intersection["shade"]',raw:'IconProps<"Bacteria">["shade"]'},description:""}}}},"./packages/components/src/common/storybook/customSvgIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_mui_material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@mui/material/SvgIcon/SvgIcon.js");function CustomSvgIcon(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.A,{color:"primary",viewBox:"2 2 20 20",...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path",{d:"M7 19c-1.1 0-2 .9-2 2h14c0-1.1-.9-2-2-2h-4v-2h3c1.1 0 2-.9 2-2h-8c-1.66 0-3-1.34-3-3 0-1.09.59-2.04 1.46-2.56C8.17 9.03 8 8.54 8 8c0-.21.04-.42.09-.62C6.28 8.13 5 9.92 5 12c0 2.76 2.24 5 5 5v2z"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path",{d:"M10.56 5.51C11.91 5.54 13 6.64 13 8c0 .75-.33 1.41-.85 1.87l.59 1.62.94-.34.34.94 1.88-.68-.34-.94.94-.34-2.74-7.53-.94.34-.34-.94-1.88.68.34.94-.94.35z"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle",{cx:"10.5",cy:"8",r:"1.5"})]})}const __WEBPACK_DEFAULT_EXPORT__=CustomSvgIcon;CustomSvgIcon.__docgenInfo={description:"CustomSvgIcon is a component that extends the SvgIcon component from the Material-UI library.\nIt allows easy usage of custom SVG icons with in the storybook demos.",methods:[],displayName:"CustomSvgIcon"}}}]);