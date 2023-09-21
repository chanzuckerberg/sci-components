"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[9966],{"./node_modules/@mui/material/Switch/Switch.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Switch_Switch});var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("./node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),composeClasses=__webpack_require__("./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),colorManipulator=__webpack_require__("./node_modules/@mui/system/esm/colorManipulator.js"),capitalize=__webpack_require__("./node_modules/@mui/material/utils/capitalize.js"),SwitchBase=__webpack_require__("./node_modules/@mui/material/internal/SwitchBase.js"),useThemeProps=__webpack_require__("./node_modules/@mui/material/styles/useThemeProps.js"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),generateUtilityClasses=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getSwitchUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiSwitch",slot)}const Switch_switchClasses=(0,generateUtilityClasses.Z)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["className","color","edge","size","sx"],SwitchRoot=(0,styled.ZP)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.edge&&styles[`edge${(0,capitalize.Z)(ownerState.edge)}`],styles[`size${(0,capitalize.Z)(ownerState.size)}`]]}})((({ownerState})=>(0,esm_extends.Z)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===ownerState.edge&&{marginLeft:-8},"end"===ownerState.edge&&{marginRight:-8},"small"===ownerState.size&&{width:40,height:24,padding:7,[`& .${Switch_switchClasses.thumb}`]:{width:16,height:16},[`& .${Switch_switchClasses.switchBase}`]:{padding:4,[`&.${Switch_switchClasses.checked}`]:{transform:"translateX(16px)"}}}))),SwitchSwitchBase=(0,styled.ZP)(SwitchBase.Z,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.switchBase,{[`& .${Switch_switchClasses.input}`]:styles.input},"default"!==ownerState.color&&styles[`color${(0,capitalize.Z)(ownerState.color)}`]]}})((({theme})=>({position:"absolute",top:0,left:0,zIndex:1,color:theme.vars?theme.vars.palette.Switch.defaultColor:`${"light"===theme.palette.mode?theme.palette.common.white:theme.palette.grey[300]}`,transition:theme.transitions.create(["left","transform"],{duration:theme.transitions.duration.shortest}),[`&.${Switch_switchClasses.checked}`]:{transform:"translateX(20px)"},[`&.${Switch_switchClasses.disabled}`]:{color:theme.vars?theme.vars.palette.Switch.defaultDisabledColor:`${"light"===theme.palette.mode?theme.palette.grey[100]:theme.palette.grey[600]}`},[`&.${Switch_switchClasses.checked} + .${Switch_switchClasses.track}`]:{opacity:.5},[`&.${Switch_switchClasses.disabled} + .${Switch_switchClasses.track}`]:{opacity:theme.vars?theme.vars.opacity.switchTrackDisabled:""+("light"===theme.palette.mode?.12:.2)},[`& .${Switch_switchClasses.input}`]:{left:"-100%",width:"300%"}})),(({theme,ownerState})=>(0,esm_extends.Z)({"&:hover":{backgroundColor:theme.vars?`rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,colorManipulator.Fq)(theme.palette.action.active,theme.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==ownerState.color&&{[`&.${Switch_switchClasses.checked}`]:{color:(theme.vars||theme).palette[ownerState.color].main,"&:hover":{backgroundColor:theme.vars?`rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,colorManipulator.Fq)(theme.palette[ownerState.color].main,theme.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${Switch_switchClasses.disabled}`]:{color:theme.vars?theme.vars.palette.Switch[`${ownerState.color}DisabledColor`]:`${"light"===theme.palette.mode?(0,colorManipulator.$n)(theme.palette[ownerState.color].main,.62):(0,colorManipulator._j)(theme.palette[ownerState.color].main,.55)}`}},[`&.${Switch_switchClasses.checked} + .${Switch_switchClasses.track}`]:{backgroundColor:(theme.vars||theme).palette[ownerState.color].main}}))),SwitchTrack=(0,styled.ZP)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(props,styles)=>styles.track})((({theme})=>({height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:theme.transitions.create(["opacity","background-color"],{duration:theme.transitions.duration.shortest}),backgroundColor:theme.vars?theme.vars.palette.common.onBackground:`${"light"===theme.palette.mode?theme.palette.common.black:theme.palette.common.white}`,opacity:theme.vars?theme.vars.opacity.switchTrack:""+("light"===theme.palette.mode?.38:.3)}))),SwitchThumb=(0,styled.ZP)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(props,styles)=>styles.thumb})((({theme})=>({boxShadow:(theme.vars||theme).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),Switch_Switch=react.forwardRef((function Switch(inProps,ref){const props=(0,useThemeProps.Z)({props:inProps,name:"MuiSwitch"}),{className,color="primary",edge=!1,size="medium",sx}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{color,edge,size}),classes=(ownerState=>{const{classes,edge,size,color,checked,disabled}=ownerState,slots={root:["root",edge&&`edge${(0,capitalize.Z)(edge)}`,`size${(0,capitalize.Z)(size)}`],switchBase:["switchBase",`color${(0,capitalize.Z)(color)}`,checked&&"checked",disabled&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},composedClasses=(0,composeClasses.Z)(slots,getSwitchUtilityClass,classes);return(0,esm_extends.Z)({},classes,composedClasses)})(ownerState),icon=(0,jsx_runtime.jsx)(SwitchThumb,{className:classes.thumb,ownerState});return(0,jsx_runtime.jsxs)(SwitchRoot,{className:(0,clsx_m.Z)(classes.root,className),sx,ownerState,children:[(0,jsx_runtime.jsx)(SwitchSwitchBase,(0,esm_extends.Z)({type:"checkbox",icon,checkedIcon:icon,ref,ownerState},other,{classes:(0,esm_extends.Z)({},classes,{root:classes.switchBase})})),(0,jsx_runtime.jsx)(SwitchTrack,{className:classes.track,ownerState})]})}))},"./packages/components/src/core/InputToggle/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>core_InputToggle});var _templateObject,react=__webpack_require__("./node_modules/react/index.js"),Switch=__webpack_require__("./node_modules/@mui/material/Switch/Switch.js"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");var Toggle=(0,styled.ZP)(Switch.Z)(_templateObject||(_templateObject=function _taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n  ","\n  ","\n"])),styles.$g,(function(props){var checked=props.checked;return"\n      ".concat(function toggle(props){var disabled=props.disabled,corners=(0,styles.DV)(props),spaces=(0,styles.Gr)(props);return"\n    cursor: ".concat(disabled?"default":"pointer",";\n    border-radius: ").concat(null==corners?void 0:corners.l,"px;\n    height: 26px;\n    width: 62px;\n    line-height: 18px;\n    padding: ").concat(null==spaces?void 0:spaces.xxs,"px;\n\n    .MuiSwitch-switchBase {\n      font: inherit;\n      margin: ").concat(null==spaces?void 0:spaces.xxs,"px;\n      padding: 0;\n      transform: unset;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    .MuiSwitch-thumb {\n      height: ").concat(18,"px;\n      width: ").concat(18,"px;\n      box-shadow: none;\n    }\n\n    .MuiSwitch-track {\n      background-color: white;\n      width: unset;\n    }\n  ")}(props),"\n      ").concat(checked?function toggleOn(props){var disabled=props.disabled,value=props.value,borders=(0,styles.W0)(props),colors=(0,styles.EC)(props),spaces=(0,styles.Gr)(props);return"\n    outline: ".concat(disabled?null==borders?void 0:borders.primary[300]:null==borders?void 0:borders.primary[400],";\n\n    .MuiSwitch-thumb {\n      color: ").concat(disabled?null==colors?void 0:colors.primary[300]:null==colors?void 0:colors.primary[400],";\n      margin-left: ").concat(null==spaces?void 0:spaces.s,"px;\n    }\n\n    .MuiSwitch-switchBase {\n      left: unset;\n      right: 0;\n      transform: unset;\n\n      .MuiIconButton-label {\n        margin-left: ").concat(null==spaces?void 0:spaces.s,"px;\n      }\n\n      &:before {\n        color: ").concat(disabled?null==colors?void 0:colors.gray[300]:null==colors?void 0:colors.gray[600],';\n        content: "').concat(value,"\";\n        font: inherit;\n        font-family: 'Open sans';\n      }\n    }\n\n    ").concat(!disabled&&"&:hover {\n        outline: ".concat(null==borders?void 0:borders.primary[500],";\n\n        .MuiSwitch-thumb {\n          color: ").concat(null==colors?void 0:colors.primary[500],";\n        }\n      }"),"\n  ")}(props):function toggleOff(props){var disabled=props.disabled,value=props.value,borders=(0,styles.W0)(props),colors=(0,styles.EC)(props),spaces=(0,styles.Gr)(props);return"\n    & {\n      outline: ".concat(disabled?null==borders?void 0:borders.gray[300]:null==borders?void 0:borders.gray[400],";\n    }\n\n    .MuiSwitch-thumb {\n      color: ").concat(disabled?null==colors?void 0:colors.gray[300]:null==colors?void 0:colors.gray[400],";\n      margin-right: ").concat(null==spaces?void 0:spaces.s,"px;\n    }\n\n    .MuiSwitch-switchBase {\n      right: unset;\n      left: 0;\n      transform: unset;\n\n      .MuiIconButton-label {\n        margin-right: ").concat(null==spaces?void 0:spaces.s,"px;\n      }\n\n      &:after {\n        color: ").concat(disabled?null==colors?void 0:colors.gray[300]:null==colors?void 0:colors.gray[500],';\n        content: "').concat(value,"\";\n        font: inherit;\n        font-family: 'Open sans';\n      }\n    }\n\n    ").concat(!disabled&&"&:hover {\n        outline: ".concat(null==borders?void 0:borders.gray[500],";\n\n        .MuiSwitch-thumb {\n          color: ").concat(null==colors?void 0:colors.gray[500],";\n        }\n      }"),"\n  ")}(props),"\n    ")})),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}var _excluded=["offLabel","onChange","onLabel"];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var InputToggle=function InputToggle(props){var _useState2=_slicedToArray((0,react.useState)(!1),2),checked=_useState2[0],setChecked=_useState2[1],_props$offLabel=props.offLabel,offLabel=void 0===_props$offLabel?"Off":_props$offLabel,onChange=props.onChange,_props$onLabel=props.onLabel,onLabel=void 0===_props$onLabel?"On":_props$onLabel,rest=_objectWithoutProperties(props,_excluded),labelValue=checked?onLabel:offLabel;return(0,jsx_runtime.jsx)(Toggle,function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({checked,color:"primary",onChange:function handleChange(e){setChecked(!checked),onChange&&onChange(e)},value:labelValue},rest))};const core_InputToggle=InputToggle;try{InputToggle.displayName="InputToggle",InputToggle.__docgenInfo={description:"",displayName:"InputToggle",props:{offLabel:{defaultValue:null,description:"",name:"offLabel",required:!1,type:{name:"string"}},onChange:{defaultValue:null,description:"Callback fired when the state is changed.",name:"onChange",required:!1,type:{name:"((e: ChangeEvent<Element>) => void)"}},onLabel:{defaultValue:null,description:"",name:"onLabel",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},action:{defaultValue:null,description:"A ref for imperative actions.\nIt currently only supports `focusVisible()` action.",name:"action",required:!1,type:{name:"Ref<ButtonBaseActions>"}},centerRipple:{defaultValue:{value:"false"},description:"If `true`, the ripples are centered.\nThey won't start at the cursor interaction position.",name:"centerRipple",required:!1,type:{name:"boolean"}},disableTouchRipple:{defaultValue:{value:"false"},description:"If `true`, the touch ripple effect is disabled.",name:"disableTouchRipple",required:!1,type:{name:"boolean"}},focusRipple:{defaultValue:{value:"false"},description:"If `true`, the base button will have a keyboard focus ripple.",name:"focusRipple",required:!1,type:{name:"boolean"}},focusVisibleClassName:{defaultValue:null,description:"This prop can help identify which element has keyboard focus.\nThe class name will be applied when the element gains the focus through keyboard interaction.\nIt's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).\nThe rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).\nA [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components\nif needed.",name:"focusVisibleClassName",required:!1,type:{name:"string"}},LinkComponent:{defaultValue:{value:"'a'"},description:"The component used to render a link when the `href` prop is provided.",name:"LinkComponent",required:!1,type:{name:"ElementType<any>"}},onFocusVisible:{defaultValue:null,description:"Callback fired when the component is focused with a keyboard.\nWe trigger a `onFocus` callback too.",name:"onFocusVisible",required:!1,type:{name:"FocusEventHandler<any>"}},TouchRippleProps:{defaultValue:null,description:"Props applied to the `TouchRipple` element.",name:"TouchRippleProps",required:!1,type:{name:"Partial<TouchRippleProps>"}},touchRippleRef:{defaultValue:null,description:"A ref that points to the `TouchRipple` element.",name:"touchRippleRef",required:!1,type:{name:"Ref<TouchRippleActions>"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"SDSTheme"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/core/InputToggle/index.tsx#InputToggle"]={docgenInfo:InputToggle.__docgenInfo,name:"InputToggle",path:"packages/components/src/core/InputToggle/index.tsx#InputToggle"})}catch(__react_docgen_typescript_loader_error){}}}]);