"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[2205],{"./node_modules/@mui/material/FormControl/FormControlContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("./node_modules/react/index.js").createContext(void 0)},"./node_modules/@mui/material/FormControl/useFormControl.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useFormControl});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_FormControlContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@mui/material/FormControl/FormControlContext.js");function useFormControl(){return react__WEBPACK_IMPORTED_MODULE_0__.useContext(_FormControlContext__WEBPACK_IMPORTED_MODULE_1__.A)}},"./node_modules/@mui/material/Switch/Switch.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),clsx__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),_mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@mui/system/colorManipulator.js"),_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mui/material/utils/capitalize.js"),_internal_SwitchBase__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@mui/material/internal/SwitchBase.js"),_zero_styled__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),_DefaultPropsProvider__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"),_switchClasses__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mui/material/Switch/switchClasses.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["className","color","edge","size","sx"],SwitchRoot=(0,_zero_styled__WEBPACK_IMPORTED_MODULE_6__.Ay)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.edge&&styles[`edge${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__.A)(ownerState.edge)}`],styles[`size${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__.A)(ownerState.size)}`]]}})({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.thumb}`]:{width:16,height:16},[`& .${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.switchBase}`]:{padding:4,[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.checked}`]:{transform:"translateX(16px)"}}}}]}),SwitchSwitchBase=(0,_zero_styled__WEBPACK_IMPORTED_MODULE_6__.Ay)(_internal_SwitchBase__WEBPACK_IMPORTED_MODULE_7__.A,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.switchBase,{[`& .${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.input}`]:styles.input},"default"!==ownerState.color&&styles[`color${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__.A)(ownerState.color)}`]]}})((({theme})=>({position:"absolute",top:0,left:0,zIndex:1,color:theme.vars?theme.vars.palette.Switch.defaultColor:`${"light"===theme.palette.mode?theme.palette.common.white:theme.palette.grey[300]}`,transition:theme.transitions.create(["left","transform"],{duration:theme.transitions.duration.shortest}),[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.checked}`]:{transform:"translateX(20px)"},[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.disabled}`]:{color:theme.vars?theme.vars.palette.Switch.defaultDisabledColor:`${"light"===theme.palette.mode?theme.palette.grey[100]:theme.palette.grey[600]}`},[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.checked} + .${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.track}`]:{opacity:.5},[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.disabled} + .${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.track}`]:{opacity:theme.vars?theme.vars.opacity.switchTrackDisabled:""+("light"===theme.palette.mode?.12:.2)},[`& .${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.input}`]:{left:"-100%",width:"300%"}})),(({theme})=>({"&:hover":{backgroundColor:theme.vars?`rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_8__.X4)(theme.palette.action.active,theme.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(theme.palette).filter((([,value])=>value.main&&value.light)).map((([color])=>({props:{color},style:{[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.checked}`]:{color:(theme.vars||theme).palette[color].main,"&:hover":{backgroundColor:theme.vars?`rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_8__.X4)(theme.palette[color].main,theme.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.disabled}`]:{color:theme.vars?theme.vars.palette.Switch[`${color}DisabledColor`]:`${"light"===theme.palette.mode?(0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_8__.a)(theme.palette[color].main,.62):(0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_8__.e$)(theme.palette[color].main,.55)}`}},[`&.${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.checked} + .${_switchClasses__WEBPACK_IMPORTED_MODULE_4__.A.track}`]:{backgroundColor:(theme.vars||theme).palette[color].main}}})))]}))),SwitchTrack=(0,_zero_styled__WEBPACK_IMPORTED_MODULE_6__.Ay)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(props,styles)=>styles.track})((({theme})=>({height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:theme.transitions.create(["opacity","background-color"],{duration:theme.transitions.duration.shortest}),backgroundColor:theme.vars?theme.vars.palette.common.onBackground:`${"light"===theme.palette.mode?theme.palette.common.black:theme.palette.common.white}`,opacity:theme.vars?theme.vars.opacity.switchTrack:""+("light"===theme.palette.mode?.38:.3)}))),SwitchThumb=(0,_zero_styled__WEBPACK_IMPORTED_MODULE_6__.Ay)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(props,styles)=>styles.thumb})((({theme})=>({boxShadow:(theme.vars||theme).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),__WEBPACK_DEFAULT_EXPORT__=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function Switch(inProps,ref){const props=(0,_DefaultPropsProvider__WEBPACK_IMPORTED_MODULE_9__.b)({props:inProps,name:"MuiSwitch"}),{className,color="primary",edge=!1,size="medium",sx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__.A)(props,_excluded),ownerState=(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__.A)({},props,{color,edge,size}),classes=(ownerState=>{const{classes,edge,size,color,checked,disabled}=ownerState,slots={root:["root",edge&&`edge${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__.A)(edge)}`,`size${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__.A)(size)}`],switchBase:["switchBase",`color${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_2__.A)(color)}`,checked&&"checked",disabled&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},composedClasses=(0,_mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_3__.A)(slots,_switchClasses__WEBPACK_IMPORTED_MODULE_4__.n,classes);return(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__.A)({},classes,composedClasses)})(ownerState),icon=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SwitchThumb,{className:classes.thumb,ownerState});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(SwitchRoot,{className:(0,clsx__WEBPACK_IMPORTED_MODULE_11__.A)(classes.root,className),sx,ownerState,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SwitchSwitchBase,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__.A)({type:"checkbox",icon,checkedIcon:icon,ref,ownerState},other,{classes:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__.A)({},classes,{root:classes.switchBase})})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SwitchTrack,{className:classes.track,ownerState})]})}))},"./node_modules/@mui/material/Switch/switchClasses.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,n:()=>getSwitchUtilityClass});var _mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),_mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getSwitchUtilityClass(slot){return(0,_mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__.Ay)("MuiSwitch",slot)}const __WEBPACK_DEFAULT_EXPORT__=(0,_mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__.A)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"])},"./node_modules/@mui/material/internal/SwitchBase.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>internal_SwitchBase});var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),composeClasses=__webpack_require__("./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),capitalize=__webpack_require__("./node_modules/@mui/material/utils/capitalize.js"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),rootShouldForwardProp=__webpack_require__("./node_modules/@mui/material/styles/rootShouldForwardProp.js"),useControlled=__webpack_require__("./node_modules/@mui/material/utils/useControlled.js"),useFormControl=__webpack_require__("./node_modules/@mui/material/FormControl/useFormControl.js"),ButtonBase=__webpack_require__("./node_modules/@mui/material/ButtonBase/ButtonBase.js"),generateUtilityClasses=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getSwitchBaseUtilityClass(slot){return(0,generateUtilityClass.Ay)("PrivateSwitchBase",slot)}(0,generateUtilityClasses.A)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],SwitchBaseRoot=(0,styled.Ay)(ButtonBase.A)((({ownerState})=>(0,esm_extends.A)({padding:9,borderRadius:"50%"},"start"===ownerState.edge&&{marginLeft:"small"===ownerState.size?-3:-12},"end"===ownerState.edge&&{marginRight:"small"===ownerState.size?-3:-12}))),SwitchBaseInput=(0,styled.Ay)("input",{shouldForwardProp:rootShouldForwardProp.A})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),internal_SwitchBase=react.forwardRef((function SwitchBase(props,ref){const{autoFocus,checked:checkedProp,checkedIcon,className,defaultChecked,disabled:disabledProp,disableFocusRipple=!1,edge=!1,icon,id,inputProps,inputRef,name,onBlur,onChange,onFocus,readOnly,required=!1,tabIndex,type,value}=props,other=(0,objectWithoutPropertiesLoose.A)(props,_excluded),[checked,setCheckedState]=(0,useControlled.A)({controlled:checkedProp,default:Boolean(defaultChecked),name:"SwitchBase",state:"checked"}),muiFormControl=(0,useFormControl.A)();let disabled=disabledProp;muiFormControl&&void 0===disabled&&(disabled=muiFormControl.disabled);const hasLabelFor="checkbox"===type||"radio"===type,ownerState=(0,esm_extends.A)({},props,{checked,disabled,disableFocusRipple,edge}),classes=(ownerState=>{const{classes,checked,disabled,edge}=ownerState,slots={root:["root",checked&&"checked",disabled&&"disabled",edge&&`edge${(0,capitalize.A)(edge)}`],input:["input"]};return(0,composeClasses.A)(slots,getSwitchBaseUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsxs)(SwitchBaseRoot,(0,esm_extends.A)({component:"span",className:(0,clsx.A)(classes.root,className),centerRipple:!0,focusRipple:!disableFocusRipple,disabled,tabIndex:null,role:void 0,onFocus:event=>{onFocus&&onFocus(event),muiFormControl&&muiFormControl.onFocus&&muiFormControl.onFocus(event)},onBlur:event=>{onBlur&&onBlur(event),muiFormControl&&muiFormControl.onBlur&&muiFormControl.onBlur(event)},ownerState,ref},other,{children:[(0,jsx_runtime.jsx)(SwitchBaseInput,(0,esm_extends.A)({autoFocus,checked:checkedProp,defaultChecked,className:classes.input,disabled,id:hasLabelFor?id:void 0,name,onChange:event=>{if(event.nativeEvent.defaultPrevented)return;const newChecked=event.target.checked;setCheckedState(newChecked),onChange&&onChange(event,newChecked)},readOnly,ref:inputRef,required,ownerState,tabIndex,type},"checkbox"===type&&void 0===value?{}:{value},inputProps)),checked?checkedIcon:icon]}))}))},"./node_modules/@mui/material/utils/useControlled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("./node_modules/@mui/utils/esm/useControlled/useControlled.js").A},"./node_modules/@mui/utils/esm/useControlled/useControlled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useControlled});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useControlled({controlled,default:defaultProp,name,state="value"}){const{current:isControlled}=react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0!==controlled),[valueState,setValue]=react__WEBPACK_IMPORTED_MODULE_0__.useState(defaultProp);return[isControlled?controlled:valueState,react__WEBPACK_IMPORTED_MODULE_0__.useCallback((newValue=>{isControlled||setValue(newValue)}),[])]}}}]);