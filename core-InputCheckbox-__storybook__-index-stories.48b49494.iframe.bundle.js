"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[7774],{"./packages/components/src/core/InputCheckbox/__storybook__/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Test:()=>Test,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),InputCheckbox=__webpack_require__("./packages/components/src/core/InputCheckbox/index.tsx");const default_InputCheckbox=props=>{const{disabled}=props,[checked,setChecked]=(0,react.useState)(!0);return(0,jsx_runtime.jsx)(InputCheckbox.A,{disabled,onChange:()=>setChecked((prevState=>!prevState)),stage:checked?"unchecked":"checked",...props})};default_InputCheckbox.__docgenInfo={description:"",methods:[],displayName:"InputCheckbox"};const INPUT_CHECKBOX_TEST_STYLES={display:"grid",gridColumnGap:"10px",gridRowGap:"0px",gridTemplateColumns:"repeat(2, 100px)",gridTemplateRows:"1fr"},CheckboxLabelDemo=props=>{const{caption,label,disabled}=props;return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(InputCheckbox.A,{caption,label,disabled,value:"Demo",...props})})},TestDemo=()=>(0,jsx_runtime.jsxs)("div",{style:INPUT_CHECKBOX_TEST_STYLES,children:[(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(CheckboxLabelDemo,{caption:"Caption",label:"Label A",disabled:!1,"data-testid":"labelCheckbox"})}),(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(default_InputCheckbox,{"data-testid":"checkbox",label:"Label"})})]});TestDemo.__docgenInfo={description:"",methods:[],displayName:"TestDemo"};var storybookBadges=__webpack_require__("./packages/components/src/common/storybook/storybookBadges.ts");const index_stories={argTypes:{caption:{control:{type:"text"}},disabled:{control:{type:"boolean"}},intent:{control:{type:"radio"},options:["default","negative","notice","positive"]},label:{control:{type:"text"}},stage:{control:{type:"radio"},options:["checked","unchecked","indeterminate"]}},component:default_InputCheckbox,parameters:{badges:[storybookBadges.y.STABLE]},title:"Components/Inputs/InputCheckbox"},Default={args:{caption:"Caption",intent:"default",label:"Label"}},Test={args:{id:"test-story"},parameters:{controls:{exclude:["caption","label","stage","disabled","intent","id"]},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(TestDemo,{...args,"data-testid":"input-checkbox"})},__namedExportsOrder=["Default","Test"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    caption: "Caption",\n    intent: "default",\n    label: "Label"\n  }\n}',...Default.parameters?.docs?.source}}},Test.parameters={...Test.parameters,docs:{...Test.parameters?.docs,source:{originalSource:'{\n  args: {\n    id: INPUT_CHECKBOX_TEST_ID\n  },\n  parameters: {\n    controls: {\n      exclude: INPUT_CHECKBOX_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <TestDemo {...args} data-testid="input-checkbox" />\n}',...Test.parameters?.docs?.source}}}},"./packages/components/src/core/InputCheckbox/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_InputCheckbox});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Checkbox=__webpack_require__("./node_modules/@mui/material/Checkbox/Checkbox.js"),checkboxClasses=__webpack_require__("./node_modules/@mui/material/Checkbox/checkboxClasses.js"),FormControlLabel=__webpack_require__("./node_modules/@mui/material/FormControlLabel/FormControlLabel.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),a11y=__webpack_require__("./packages/components/src/core/styles/common/mixins/a11y.ts"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts"),Icon=__webpack_require__("./packages/components/src/core/Icon/index.tsx");const intentToColor={default:"base",negative:"negative",notice:"notice",positive:"positive"},StyledIcon=(0,emotion_styled_browser_esm.A)(Icon.A,{target:"e1vbbmc90"})((props=>{const iconSizes=(0,styles.I7)(props);return`\n      height: ${iconSizes?.xs.height}px;\n      width: ${iconSizes?.xs.width}px;\n    `})),StyledCheckboxDefaultIcon=(0,emotion_styled_browser_esm.A)("span",{target:"e1vbbmc91"})((props=>{const{intent="default"}=props,iconSizes=(0,styles.I7)(props),borders=(0,styles.ow)(props),borderColor=intentToColor[intent];return`\n      height: ${iconSizes?.s.height}px;\n      width: ${iconSizes?.s.width}px;\n      border: ${borders?.[borderColor]?.default};\n      border-radius: 2px;\n    `})),StyledCheckboxCheckedIcon=(0,emotion_styled_browser_esm.A)("div",{target:"e1vbbmc92"})((props=>{const iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return`\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: ${iconSizes?.s.height}px;\n      width: ${iconSizes?.s.width}px;\n      border-radius: 2px;\n      background-color: ${semanticColors?.accent?.fillPrimary};\n\n      ${StyledIcon} {\n        fill: ${semanticColors?.base?.ornamentPrimaryInverse};\n      }\n\n      &:hover {\n        background-color: red;\n      }\n    `})),StyledCheckbox=(0,emotion_styled_browser_esm.A)(Checkbox.A,{target:"e1vbbmc93"})((props=>{const spaces=(0,styles.oZ)(props);return`\n      &.${checkboxClasses.A.root} {\n        ${(0,a11y.U)(props)}\n        \n        padding: 0;\n        margin-right: ${spaces?.s}px;\n        border-radius: 0;\n\n        &:hover {\n          background-color: transparent;\n        }\n      }\n    `})),StyledLabelContainer=(0,emotion_styled_browser_esm.A)("span",{target:"e1vbbmc94"})("display:flex;justify-content:start;flex-direction:column;"),StyledCheckboxLabel=(0,emotion_styled_browser_esm.A)("span",{target:"e1vbbmc95"})(styles.Zo," ",(props=>{const spaces=(0,styles.oZ)(props);return`\n      margin-top: -${spaces?.xxxs}px !important;\n    `})),StyledCheckboxCaption=(0,emotion_styled_browser_esm.A)("span",{target:"e1vbbmc96"})(styles.Pf," ",(props=>{const semanticColors=(0,styles.Bd)(props);return`\n      color: ${semanticColors?.base?.textSecondary};\n    `})),StyledFormControlLabel=(0,emotion_styled_browser_esm.A)(FormControlLabel.A,{target:"e1vbbmc97"})((props=>{const{disabled}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props),borders=(0,styles.ow)(props);return`\n      align-items: start;\n      margin-bottom: ${spaces?.l}px;\n      margin-left: 0;\n      margin-right: 0;\n      width: fit-content;\n\n      &:hover {\n        ${StyledCheckboxDefaultIcon} {\n          border: ${borders?.base?.hover};\n        }\n\n        ${StyledCheckboxCheckedIcon} {\n          background-color: ${semanticColors?.accent?.fillHover};\n        }\n      }\n\n      &:active {\n        ${StyledCheckboxDefaultIcon} {\n          border: ${borders?.base?.pressed};\n        }\n\n        ${StyledCheckboxCheckedIcon} {\n          background-color: ${semanticColors?.accent?.fillPressed};\n        }\n      }\n\n      ${disabled&&(props=>{const semanticColors=(0,styles.Bd)(props),borders=(0,styles.ow)(props);return`\n    user-select: none;\n\n    ${StyledCheckboxDefaultIcon} {\n      border: ${borders?.base?.disabled};\n    }\n\n    ${StyledCheckboxCheckedIcon} {\n      background-color: ${semanticColors?.base?.ornamentDisabled};\n    }\n\n    ${StyledCheckboxCaption} {\n      color: ${semanticColors?.base?.textDisabled};\n    }\n\n    &:hover, &:active {\n      ${StyledCheckboxDefaultIcon} {\n        border: ${borders?.base?.disabled};\n      }\n\n      ${StyledCheckboxCheckedIcon} {\n        background-color: ${semanticColors?.base?.ornamentDisabled};\n      }\n    }\n  `})(props)}\n    `})),InputCheckbox=props=>{const{caption,checkboxProps,disabled,intent="default",label,stage,value,...rest}=props;let newProps;switch(stage){case"checked":newProps={...rest,checked:!0,color:"primary"};break;case"unchecked":newProps={...rest,checked:!1,color:"default"};break;case"indeterminate":newProps={...rest,checked:!0,color:"primary",indeterminate:!0};break;default:newProps=rest}const finalLabel=caption?(0,jsx_runtime.jsxs)(StyledLabelContainer,{children:[(0,jsx_runtime.jsx)(StyledCheckboxLabel,{children:label}),(0,jsx_runtime.jsx)(StyledCheckboxCaption,{children:caption})]}):(0,jsx_runtime.jsx)(StyledLabelContainer,{children:(0,jsx_runtime.jsx)(StyledCheckboxLabel,{children:label})});return(0,jsx_runtime.jsx)(StyledFormControlLabel,{control:(0,jsx_runtime.jsx)(StyledCheckbox,{checkedIcon:(0,jsx_runtime.jsx)(StyledCheckboxCheckedIcon,{children:(0,jsx_runtime.jsx)(StyledIcon,{sdsIcon:"Check",sdsSize:"xs"})}),icon:(0,jsx_runtime.jsx)(StyledCheckboxDefaultIcon,{intent}),indeterminateIcon:(0,jsx_runtime.jsx)(StyledCheckboxCheckedIcon,{children:(0,jsx_runtime.jsx)(StyledIcon,{sdsIcon:"Minus",sdsSize:"xs"})}),intent,...checkboxProps,...newProps}),disabled,label:finalLabel,value})},core_InputCheckbox=InputCheckbox;InputCheckbox.__docgenInfo={description:"@see https://mui.com/material-ui/react-checkbox/",methods:[],displayName:"InputCheckbox",props:{caption:{required:!1,tsType:{name:"string"},description:""},checkboxProps:{required:!1,tsType:{name:"Partial",elements:[{name:"MUICheckboxProps"}],raw:"Partial<MUICheckboxProps>"},description:""},intent:{required:!1,tsType:{name:"union",raw:'"default" | "negative" | "notice" | "positive"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"negative"'},{name:"literal",value:'"notice"'},{name:"literal",value:'"positive"'}]},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},stage:{required:!1,tsType:{name:"union",raw:'"checked" | "unchecked" | "indeterminate"',elements:[{name:"literal",value:'"checked"'},{name:"literal",value:'"unchecked"'},{name:"literal",value:'"indeterminate"'}]},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}},composes:["Omit","CommonThemeProps"]}}}]);