"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[3976],{"./packages/components/src/core/Dropdown/__storybook__/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ControlledDropdown:()=>ControlledDropdown,Default:()=>Default,InsideModal:()=>InsideModal,LoadingResultsIndicator:()=>LoadingResultsIndicator,MultiColumnWithButtons:()=>MultiColumnWithButtons,PopperPlacement:()=>PopperPlacement,Test:()=>Test,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),LoadingIndicator=__webpack_require__("./packages/components/src/core/LoadingIndicator/index.tsx"),dist=__webpack_require__("./node_modules/@geometricpanda/storybook-addon-badges/dist/index.mjs"),react=__webpack_require__("./node_modules/react/index.js"),AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS=__webpack_require__("./packages/components/src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.tsx"),Dropdown=__webpack_require__("./packages/components/src/core/Dropdown/index.tsx");const default_Dropdown=props=>{const{multiple,options=AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G}=props,[value,setValue]=(0,react.useState)(multiple?[]:null);return(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Click Target",onChange:function handleChange(_event,newValue){setValue(newValue)},value,options,search:!1,multiple,DropdownMenuProps:{groupBy:option=>option.section,width:300},...props})};default_Dropdown.__docgenInfo={description:"",methods:[],displayName:"Dropdown"};var AUTOCOMPLETE_MULTI_COLUMN_OPTIONS=__webpack_require__("./packages/components/src/common/storybook/AUTOCOMPLETE_MULTI_COLUMN_OPTIONS.tsx"),utils=__webpack_require__("./packages/components/src/common/utils.ts");const DROPDOWN_EXCLUDED_CONTROLS=["buttonPosition","label","onChange","DropdownMenuProps","buttons","closeOnBlur","disabled","multiple","onClose","options","search","isTriggerChangeOnOptionClick"],DROPDOWN_ON_CHANGE_OPTIONS=[utils.lQ,value=>{console.log(value)}],DROPDOWN_ON_CLOSE_OPTIONS=[utils.lQ,()=>{console.log("Closed!")}],DROPDOWN_BUTTON_POSITION_OPTIONS=["left","right"],DROPDOWN_DATA_OPTIONS=[AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G,[AUTOCOMPLETE_MULTI_COLUMN_OPTIONS.J[0],AUTOCOMPLETE_MULTI_COLUMN_OPTIONS.J[1]],[AUTOCOMPLETE_MULTI_COLUMN_OPTIONS.J[0],AUTOCOMPLETE_MULTI_COLUMN_OPTIONS.J[1],AUTOCOMPLETE_MULTI_COLUMN_OPTIONS.J[2]]];var emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Button=__webpack_require__("./packages/components/src/core/Button/index.tsx");const ControlledDropdownDemo=props=>{const[value,setValue]=(0,react.useState)([]),StyledButton=(0,emotion_styled_browser_esm.A)(Button.A,{target:"e1ncfenm0"})("&:focus{outline:none;}margin:0 0 24px 8px;");return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(StyledButton,{onClick:function handleClick(){setValue([...AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G.slice(0,3)])},sdsStyle:"minimal",sdsType:"primary",children:"Click here to select the first three options"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Click Target",...props,options:AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G,value,onChange:function handleChange(event,newValue){setValue(newValue)},"data-testid":"dropdown",DropdownMenuProps:{groupBy:option=>option.section,title:"Github Labels",width:300},multiple:!0})]})};ControlledDropdownDemo.__docgenInfo={description:"",methods:[],displayName:"ControlledDropdownDemo"};const TestDemo=props=>(0,jsx_runtime.jsx)(Dropdown.Ay,{"data-testid":"dropdown",label:"Click Target",onChange:utils.lQ,options:AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G,DropdownMenuProps:{width:300},...props});TestDemo.__docgenInfo={description:"",methods:[],displayName:"TestDemo"};var Dialog=__webpack_require__("./packages/components/src/core/Dialog/index.tsx"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),Paper=__webpack_require__("./node_modules/@mui/material/Paper/Paper.js");const StyledPaper=(0,styled.Ay)(Paper.A)`
  width: 200px;
  padding: 50px;
`;function InsideModalDemo(props){return(0,jsx_runtime.jsx)(Dialog.A,{open:!0,disableEnforceFocus:!0,PaperComponent:StyledPaper,children:(0,jsx_runtime.jsx)(default_Dropdown,{label:"Dropdown",options:AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.G,multiple:!0,InputDropdownProps:{sdsStyle:"square"},...props})})}InsideModalDemo.__docgenInfo={description:"",methods:[],displayName:"InsideModalDemo"};const PopperPlacementDemo=()=>{const[value,setValue]=(0,react.useState)(null),options=(0,react.useMemo)((()=>[{count:2,name:"Item 1"},{count:0,name:"Item 2"},{count:12,name:"Item 3"}]),[]);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("div",{style:{gridArea:"3 / 2 / 4 / 4"},children:[(0,jsx_runtime.jsx)("p",{children:"To adjust the placement of the popper, use the DropdownMenuProps property and set PopperPlacement to your desired value:"}),(0,jsx_runtime.jsx)("pre",{style:{backgroundColor:"#c3c3c347",borderRadius:4,padding:"0px 20px"},children:'\n<Dropdown\n  DropdownMenuProps={{\n    PopperPlacement: "bottom-start",\n  }}\n/>\n          '})]}),(0,jsx_runtime.jsxs)("div",{style:{display:"grid",gridColumnGap:"0px",gridRowGap:"0px",gridTemplateColumns:"repeat(5, 1fr)",gridTemplateRows:"repeat(5, 1fr)",height:"500px",padding:"30px"},children:[(0,jsx_runtime.jsx)("div",{style:{gridArea:"1 / 2 / 2 / 3"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Bottom Start",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"bottom-start",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"1 / 3 / 2 / 4"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Bottom",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"bottom",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"1 / 4 / 2 / 5"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Bottom End",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"bottom-end",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"2 / 1 / 3 / 2"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Right Start",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"right-start",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"3 / 1 / 4 / 2"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Right",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"right",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"4 / 1 / 5 / 2"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Right End",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"right-end",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"5 / 2 / 6 / 3"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Top Start",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"top-start",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"5 / 3 / 6 / 4"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Top",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"top",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"5 / 4 / 6 / 5"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Top End",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"top-end",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"2 / 5 / 3 / 6"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Left Start",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"left-start",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"3 / 5 / 4 / 6"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Left",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"left",groupBy:option=>option.section,width:150}})}),(0,jsx_runtime.jsx)("div",{style:{gridArea:"4 / 5 / 5 / 6"},children:(0,jsx_runtime.jsx)(Dropdown.Ay,{label:"Left End",onChange:handleChange,value,options,search:!1,DropdownMenuProps:{PopperPlacement:"left-end",groupBy:option=>option.section,width:150}})})]})]});function handleChange(_event,newValue){setValue(newValue)}};PopperPlacementDemo.__docgenInfo={description:"",methods:[],displayName:"PopperPlacementDemo"};const index_stories={argTypes:{DropdownMenuProps:{control:{type:"object"}},buttonPosition:{control:{labels:["left","right"],type:"select"},mapping:DROPDOWN_BUTTON_POSITION_OPTIONS,options:Object.keys(DROPDOWN_BUTTON_POSITION_OPTIONS)},buttons:{control:{type:"boolean"}},closeOnBlur:{control:{type:"boolean"}},disabled:{control:{type:"boolean"}},label:{control:{type:"text"}},multiple:{control:{type:"boolean"}},onChange:{control:{labels:["NOOP","Log value on change"],type:"select"},mapping:DROPDOWN_ON_CHANGE_OPTIONS,options:Object.keys(DROPDOWN_ON_CHANGE_OPTIONS)},onClose:{control:{labels:["NOOP","console.log('Closed!')"],type:"select"},mapping:DROPDOWN_ON_CLOSE_OPTIONS,options:Object.keys(DROPDOWN_ON_CLOSE_OPTIONS)},options:{control:{labels:["One Column","Two Columns","Three Columns"],type:"select"},mapping:DROPDOWN_DATA_OPTIONS,options:Object.keys(DROPDOWN_DATA_OPTIONS)},search:{control:{type:"boolean"},defaultValue:!0}},component:default_Dropdown,parameters:{badges:[dist.yq.STABLE]},title:"Components/Dropdowns/Dropdown"},Default={args:{DropdownMenuProps:{PopperPlacement:"bottom-start"},buttonPosition:"left",buttons:!1,closeOnBlur:!0,disabled:!1,isTriggerChangeOnOptionClick:!1,label:"Click Target",multiple:!0,options:DROPDOWN_DATA_OPTIONS[0],search:!0}},MultiColumnWithButtons={args:{buttonPosition:"left",buttons:!0,closeOnBlur:!0,disabled:!1,isTriggerChangeOnOptionClick:!1,label:"Click Target",multiple:!0,options:DROPDOWN_DATA_OPTIONS[2],search:!0},parameters:{controls:{exclude:DROPDOWN_EXCLUDED_CONTROLS}},render:args=>(0,jsx_runtime.jsx)(default_Dropdown,{...args})},LoadingResultsIndicator={args:{DropdownMenuProps:{loading:!0,loadingText:(0,jsx_runtime.jsx)(LoadingIndicator.A,{sdsStyle:"minimal"})},label:"Click Target",options:[]},parameters:{controls:{exclude:DROPDOWN_EXCLUDED_CONTROLS},snapshot:{skip:!0}}},InsideModal={parameters:{axe:{disabledRules:["aria-dialog-name"]},controls:{exclude:DROPDOWN_EXCLUDED_CONTROLS},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(InsideModalDemo,{...args})},ControlledDropdown={args:{label:"Click Target"},parameters:{controls:{exclude:DROPDOWN_EXCLUDED_CONTROLS},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(ControlledDropdownDemo,{...args})},PopperPlacement={args:{label:"Click Target"},parameters:{controls:{exclude:DROPDOWN_EXCLUDED_CONTROLS},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(PopperPlacementDemo,{...args})},Test={args:{buttonPosition:"left",label:"Click Target"},parameters:{controls:{exclude:DROPDOWN_EXCLUDED_CONTROLS},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(TestDemo,{...args})},__namedExportsOrder=["Default","MultiColumnWithButtons","LoadingResultsIndicator","InsideModal","ControlledDropdown","PopperPlacement","Test"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    DropdownMenuProps: {\n      PopperPlacement: "bottom-start"\n    },\n    buttonPosition: "left",\n    buttons: false,\n    closeOnBlur: true,\n    disabled: false,\n    isTriggerChangeOnOptionClick: false,\n    label: DROPDOWN_LABEL,\n    multiple: true,\n    options: DROPDOWN_DATA_OPTIONS[0],\n    search: true\n  }\n}',...Default.parameters?.docs?.source}}},MultiColumnWithButtons.parameters={...MultiColumnWithButtons.parameters,docs:{...MultiColumnWithButtons.parameters?.docs,source:{originalSource:'{\n  args: {\n    buttonPosition: "left",\n    buttons: true,\n    closeOnBlur: true,\n    disabled: false,\n    isTriggerChangeOnOptionClick: false,\n    label: DROPDOWN_LABEL,\n    multiple: true,\n    options: DROPDOWN_DATA_OPTIONS[2],\n    search: true\n  },\n  parameters: {\n    controls: {\n      exclude: DROPDOWN_EXCLUDED_CONTROLS\n    }\n  },\n  render: (args: Args) => <Dropdown {...args} />\n}',...MultiColumnWithButtons.parameters?.docs?.source}}},LoadingResultsIndicator.parameters={...LoadingResultsIndicator.parameters,docs:{...LoadingResultsIndicator.parameters?.docs,source:{originalSource:'{\n  args: {\n    DropdownMenuProps: {\n      loading: true,\n      loadingText: <LoadingIndicator sdsStyle="minimal" />\n    },\n    label: DROPDOWN_LABEL,\n    options: []\n  },\n  parameters: {\n    controls: {\n      exclude: DROPDOWN_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  }\n}',...LoadingResultsIndicator.parameters?.docs?.source}}},InsideModal.parameters={...InsideModal.parameters,docs:{...InsideModal.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    axe: {\n      disabledRules: ["aria-dialog-name"]\n    },\n    controls: {\n      exclude: DROPDOWN_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <InsideModalDemo {...args} />\n}',...InsideModal.parameters?.docs?.source}}},ControlledDropdown.parameters={...ControlledDropdown.parameters,docs:{...ControlledDropdown.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: DROPDOWN_LABEL\n  },\n  parameters: {\n    controls: {\n      exclude: DROPDOWN_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <ControlledDropdownDemo {...args} />\n}",...ControlledDropdown.parameters?.docs?.source}}},PopperPlacement.parameters={...PopperPlacement.parameters,docs:{...PopperPlacement.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: DROPDOWN_LABEL\n  },\n  parameters: {\n    controls: {\n      exclude: DROPDOWN_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <PopperPlacementDemo {...args} />\n}",...PopperPlacement.parameters?.docs?.source}}},Test.parameters={...Test.parameters,docs:{...Test.parameters?.docs,source:{originalSource:'{\n  args: {\n    buttonPosition: "left",\n    label: DROPDOWN_LABEL\n  },\n  parameters: {\n    controls: {\n      exclude: DROPDOWN_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <TestDemo {...args} />\n}',...Test.parameters?.docs?.source}}}},"./packages/components/src/core/Dialog/components/DialogPaper/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>components_DialogPaper});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),common=__webpack_require__("./packages/components/src/core/Dialog/components/common.ts"),Paper=__webpack_require__("./node_modules/@mui/material/Paper/Paper.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const doNotForwardProps=["sdsSize"],StyledPaper=(0,emotion_styled_browser_esm.A)(Paper.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rkxeus0"})("&{",paperDimensions," ",(props=>{const spaces=(0,styles.oZ)(props),corners=(0,styles.VP)(props),shadows=(0,styles.CG)(props),semanticColors=(0,styles.Bd)(props);return`\n        background-color: ${semanticColors?.base?.surfacePrimary};\n        background-image: none;\n        box-shadow: ${shadows?.l};\n        max-height: calc(100vh - ${2*(spaces?.xxl||0)}px);\n        border-radius: ${corners?.m||0}px;\n        padding: ${spaces?.xxl||0}px;\n      `}),"}");function paperDimensions(props){const{sdsSize}=props,{width,minHeight}={l:{minHeight:"600px",width:"1200px"},m:{minHeight:"480px",width:"900px"},s:{minHeight:"400px",width:"600px"},xs:{minHeight:"160px",width:"400px"}}[sdsSize];return`\n    width: ${width};\n    min-height: ${minHeight};\n    max-width: revert;\n    box-sizing: border-box;\n  `}const DialogPaper=(0,react.forwardRef)((function DialogPaper(props,ref){return(0,jsx_runtime.jsx)(common.M.Consumer,{children:({sdsSize})=>(0,jsx_runtime.jsx)(StyledPaper,{sdsSize,ref,...props})})})),components_DialogPaper=DialogPaper;DialogPaper.__docgenInfo={description:"@see https://mui.com/material-ui/react-paper/",methods:[],displayName:"DialogPaper"}},"./packages/components/src/core/Dialog/components/common.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>DialogContext});const DialogContext=(0,__webpack_require__("./node_modules/react/index.js").createContext)({sdsSize:"m"})},"./packages/components/src/core/Dialog/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_mui_material__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mui/material/Dialog/Dialog.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_components_DialogPaper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/core/Dialog/components/DialogPaper/index.tsx"),_components_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/src/core/Dialog/components/common.ts");const Dialog=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((function Dialog(props,ref){const{canClickOutsideClose=!0,onClose,sdsSize="m",PaperComponent=_components_DialogPaper__WEBPACK_IMPORTED_MODULE_2__.A,...rest}=props,contextValue=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)((()=>({sdsSize})),[sdsSize]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common__WEBPACK_IMPORTED_MODULE_3__.M.Provider,{value:contextValue,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.A,{ref,PaperComponent,...rest,onClose:(event,reason)=>{(canClickOutsideClose||!reason||"backdropClick"!==reason&&"escapeKeyDown"!==reason)&&onClose&&onClose(event,reason)}})})})),__WEBPACK_DEFAULT_EXPORT__=Dialog;Dialog.__docgenInfo={description:"@see https://mui.com/material-ui/react-dialog/",methods:[],displayName:"Dialog"}},"./packages/components/src/core/Dropdown/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>core_Dropdown});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./packages/components/src/common/utils.ts"),DropdownMenu=__webpack_require__("./packages/components/src/core/DropdownMenu/index.tsx"),InputDropdown=(__webpack_require__("./packages/components/src/core/DropdownMenu/style.ts"),__webpack_require__("./packages/components/src/core/InputDropdown/index.tsx")),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Button=__webpack_require__("./packages/components/src/core/Button/index.tsx"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const doNotForwardProps=["buttonPosition"],StyledButtonsWrapper=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e125bwfx0"})((props=>{const{buttonPosition}=props;return`\n      display: flex;\n      justify-content: ${"left"===buttonPosition?"start":"end"};\n    `})),StyledButton=(0,emotion_styled_browser_esm.A)(Button.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e125bwfx1"})((props=>{const spaces=(0,styles.oZ)(props);return`\n      margin-top: ${spaces?.l}px;\n      margin-right: ${spaces?.m}px;\n    `})),Dropdown=props=>{const{options,label="",multiple=!1,search=!1,buttonPosition="right",buttons=!1,closeOnBlur=!buttons,onClose,onChange,DropdownMenuProps={},InputDropdownProps={sdsStyle:"minimal"},InputDropdownComponent=InputDropdown.A,isTriggerChangeOnOptionClick=!1,disabled=!1,value:propValue,onClick,...rest}=props;buttons&&!multiple&&console.warn("Warning: buttons are only supported for multiple select dropdowns.");const isMultiColumn="options"in(options?.[0]||utils.Ml),isControlled=void 0!==propValue,[anchorEl,setAnchorEl]=(0,react.useState)(null),[open,setOpen]=(0,react.useState)(!1),[value,setValue]=(0,react.useState)(getInitialValue()),[pendingValue,setPendingValue]=(0,react.useState)(getInitialValue()),shouldShowButtons=buttons&&!isTriggerChangeOnOptionClick&&multiple;return(0,react.useEffect)((()=>{isControlled&&setValue(propValue)}),[isControlled,propValue]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(InputDropdownComponent,{disabled,label,onClick:function handleClick(event){onClick?.(event),open?shouldShowButtons||(multiple&&setValue(pendingValue),setOpen(!1),anchorEl&&anchorEl.focus()):(multiple&&setPendingValue(value),setAnchorEl(event.currentTarget),setOpen(!0))},...InputDropdownProps,...rest}),(0,jsx_runtime.jsx)(DropdownMenu.A,{anchorEl,open,search,onClose:handleClose,multiple,disableCloseOnSelect:multiple,options,onClickAway:function handleClickAway(){open&&(closeOnBlur&&!shouldShowButtons&&setOpen(!1),multiple&&setValue(pendingValue))},width:250,onChange:function handleChange(event,newValue,reason,details){if(multiple)return isTriggerChangeOnOptionClick?(setPendingValue(newValue),setValueAndCallOnChange(event,newValue,reason,details)):setPendingValue(newValue);setValueAndCallOnChange(event,newValue,reason,details),isMultiColumn||setOpen(!1)},value:isMultiColumn?value:multiple?pendingValue:value,...DropdownMenuProps,...rest,children:shouldShowButtons?(0,jsx_runtime.jsx)(StyledButtonsWrapper,{buttonPosition,children:"left"===buttonPosition?(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(StyledButton,{onClick:handleButtonClose,sdsStyle:"square",sdsType:"primary",children:"Apply"}),(0,jsx_runtime.jsx)(StyledButton,{onClick:handleCancel,sdsStyle:"square",sdsType:"secondary",children:"Cancel"})]}):(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(StyledButton,{onClick:handleCancel,sdsStyle:"square",sdsType:"secondary",children:"Cancel"}),(0,jsx_runtime.jsx)(StyledButton,{onClick:handleButtonClose,sdsStyle:"square",sdsType:"primary",children:"Apply"})]})}):null})]});function getInitialValue(){return multiple?[]:null}function handleClose(event,reason){"toggleInput"!==reason&&(shouldShowButtons&&"blur"===reason||(multiple&&setValue(pendingValue),anchorEl&&anchorEl.focus(),closeOnBlur&&onClose?.(event,reason),shouldShowButtons&&(onClose?.(event,reason),setOpen(!1))))}function handleButtonClose(event){handleClose(event,"selectOption")}function handleCancel(){multiple&&setPendingValue(value),anchorEl&&anchorEl.focus(),setOpen(!1)}function setValueAndCallOnChange(event,newValue,reason,details){setValue(newValue),onChange?.(event,newValue,reason,details)}},core_Dropdown=Dropdown;Dropdown.__docgenInfo={description:"",methods:[],displayName:"Dropdown",props:{buttonPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},buttons:{required:!1,tsType:{name:"boolean"},description:""},closeOnBlur:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},label:{required:!0,tsType:{name:"ReactNode"},description:""},options:{required:!0,tsType:{name:"union",raw:"| AutocompleteSingleColumnOption<T>[]\n| AutocompleteMultiColumnOption<T, Multiple, DisableClearable, FreeSolo>[]",elements:[{name:"Array",elements:[{name:"AutocompleteSingleColumnOption",elements:[{name:"T"}],raw:"AutocompleteSingleColumnOption<T>"}],raw:"AutocompleteSingleColumnOption<T>[]"},{name:"Array",elements:[{name:"AutocompleteMultiColumnOption",elements:[{name:"T"},{name:"Multiple"},{name:"DisableClearable"},{name:"FreeSolo"}],raw:"AutocompleteMultiColumnOption<T, Multiple, DisableClearable, FreeSolo>"}],raw:"AutocompleteMultiColumnOption<T, Multiple, DisableClearable, FreeSolo>[]"}]},description:""},search:{required:!1,tsType:{name:"boolean"},description:""},DropdownMenuProps:{required:!1,tsType:{name:"Partial",elements:[{name:"SdsDropdownMenuProps",elements:[{name:"T"},{name:"Multiple"},{name:"DisableClearable"},{name:"FreeSolo"}],raw:"SdsDropdownMenuProps<T, Multiple, DisableClearable, FreeSolo>"}],raw:"Partial<\n  SdsDropdownMenuProps<T, Multiple, DisableClearable, FreeSolo>\n>"},description:""},InputDropdownProps:{required:!1,tsType:{name:"Partial",elements:[{name:"InputDropdownPropsType"}],raw:"Partial<InputDropdownPropsType>"},description:""},value:{required:!1,tsType:{name:"AutocompleteValue",elements:[{name:"T"},{name:"Multiple"},{name:"DisableClearable"},{name:"FreeSolo"}],raw:"AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""},InputDropdownComponent:{required:!1,tsType:{name:"InputDropdown"},description:""},isTriggerChangeOnOptionClick:{required:!1,tsType:{name:"boolean"},description:""}}}},"./packages/components/src/core/LoadingIndicator/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_LoadingIndicator});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Icon=__webpack_require__("./packages/components/src/core/Icon/index.tsx"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const StyledText=(0,emotion_styled_browser_esm.A)("span",{target:"e73vzaj0"})((props=>{const spaces=(0,styles.oZ)(props);return`\n      margin: 0 ${spaces?.xs}px;\n    `})),doNotForwardProps=["sdsStyle"],StyledLoadingIndicator=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e73vzaj1"})((props=>{const{sdsStyle}=props,spaces=(0,styles.oZ)(props),style=(0,emotion_react_browser_esm.AH)("display:inline-flex;align-items:center;padding:",spaces?.xxs,"px;");return(0,emotion_react_browser_esm.AH)(style," ","minimal"===sdsStyle&&(props=>{const iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)((0,styles.JU)(props),"    color:",semanticColors?.base?.textSecondary,";svg{height:",iconSizes?.s.height,"px;width:",iconSizes?.s.width,"px;path{fill:",semanticColors?.base?.iconPrimary,";}}")})(props)," ","tag"===sdsStyle&&(props=>{const corners=(0,styles.VP)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)((0,styles.Uw)(props),"    background-color:",semanticColors?.info?.surfacePrimary,";border-radius:",corners?.l,"px;color:",semanticColors?.info?.text,";svg{path{fill:",semanticColors?.info?.ornament,";}}")})(props))})),LoadingIndicator=({"aria-label":ariaLabel,sdsStyle})=>(0,jsx_runtime.jsxs)(StyledLoadingIndicator,{sdsStyle,"aria-label":"Loading",children:[(0,jsx_runtime.jsx)(Icon.A,{sdsIcon:"Loading",sdsSize:"l",sdsType:"static"}),(0,jsx_runtime.jsx)(StyledText,{"aria-label":ariaLabel,"aria-live":"polite",role:"status",children:"Loading"})]}),core_LoadingIndicator=LoadingIndicator;LoadingIndicator.__docgenInfo={description:"",methods:[],displayName:"LoadingIndicator",props:{sdsStyle:{required:!0,tsType:{name:"union",raw:'"minimal" | "tag"',elements:[{name:"literal",value:'"minimal"'},{name:"literal",value:'"tag"'}]},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""}},composes:["CommonThemeProps"]}}}]);
//# sourceMappingURL=core-Dropdown-__storybook__-index-stories.bad10623.iframe.bundle.js.map