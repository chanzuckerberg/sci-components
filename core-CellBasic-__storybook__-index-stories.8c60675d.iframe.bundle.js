"use strict";(self.webpackChunk_czi_sds_monorepo=self.webpackChunk_czi_sds_monorepo||[]).push([[6763],{"./node_modules/@mui/system/esm/colorManipulator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X4:()=>alpha,e$:()=>darken});var _mui_utils_formatMuiErrorMessage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js"),_mui_utils_clamp__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@mui/utils/esm/clamp/clamp.js");function clampWrapper(value,min=0,max=1){return(0,_mui_utils_clamp__WEBPACK_IMPORTED_MODULE_0__.A)(value,min,max)}function decomposeColor(color){if(color.type)return color;if("#"===color.charAt(0))return decomposeColor(function hexToRgb(color){color=color.slice(1);const re=new RegExp(`.{1,${color.length>=6?2:1}}`,"g");let colors=color.match(re);return colors&&1===colors[0].length&&(colors=colors.map((n=>n+n))),colors?`rgb${4===colors.length?"a":""}(${colors.map(((n,index)=>index<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3)).join(", ")})`:""}(color));const marker=color.indexOf("("),type=color.substring(0,marker);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(type))throw new Error((0,_mui_utils_formatMuiErrorMessage__WEBPACK_IMPORTED_MODULE_1__.A)(9,color));let colorSpace,values=color.substring(marker+1,color.length-1);if("color"===type){if(values=values.split(" "),colorSpace=values.shift(),4===values.length&&"/"===values[3].charAt(0)&&(values[3]=values[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(colorSpace))throw new Error((0,_mui_utils_formatMuiErrorMessage__WEBPACK_IMPORTED_MODULE_1__.A)(10,colorSpace))}else values=values.split(",");return values=values.map((value=>parseFloat(value))),{type,values,colorSpace}}function recomposeColor(color){const{type,colorSpace}=color;let{values}=color;return-1!==type.indexOf("rgb")?values=values.map(((n,i)=>i<3?parseInt(n,10):n)):-1!==type.indexOf("hsl")&&(values[1]=`${values[1]}%`,values[2]=`${values[2]}%`),values=-1!==type.indexOf("color")?`${colorSpace} ${values.join(" ")}`:`${values.join(", ")}`,`${type}(${values})`}function alpha(color,value){return color=decomposeColor(color),value=clampWrapper(value),"rgb"!==color.type&&"hsl"!==color.type||(color.type+="a"),"color"===color.type?color.values[3]=`/${value}`:color.values[3]=value,recomposeColor(color)}function darken(color,coefficient){if(color=decomposeColor(color),coefficient=clampWrapper(coefficient),-1!==color.type.indexOf("hsl"))color.values[2]*=1-coefficient;else if(-1!==color.type.indexOf("rgb")||-1!==color.type.indexOf("color"))for(let i=0;i<3;i+=1)color.values[i]*=1-coefficient;return recomposeColor(color)}},"./packages/components/src/core/CellBasic/__storybook__/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Test:()=>Test,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),CellBasic=__webpack_require__("./packages/components/src/core/CellBasic/index.tsx");const default_CellBasic=props=>(0,jsx_runtime.jsx)("table",{children:(0,jsx_runtime.jsx)("tbody",{children:(0,jsx_runtime.jsx)("tr",{style:{display:"block",maxWidth:"400px"},children:(0,jsx_runtime.jsx)(CellBasic.A,{"data-testid":"CellBasic",primaryText:"Primary Text",tooltipProps:{sdsStyle:"light"},...props})})})});default_CellBasic.__docgenInfo={description:"",methods:[],displayName:"CellBasic"};var Icon=__webpack_require__("./packages/components/src/core/Icon/index.tsx"),Tag=__webpack_require__("./packages/components/src/core/Tag/index.tsx"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Button=__webpack_require__("./packages/components/src/core/Button/index.tsx"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const ButtonIconsGroupRight=(0,emotion_styled_browser_esm.A)("div",{target:"e1umm6e00"})((props=>{const spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n      align-items: center;\n      display: inline-flex;\n      height: 100%;\n      border-left: solid 1px ${semanticColors?.base?.divider};\n      padding-left: ${spaces?.xs}px;\n    `})),ButtonIconsGroupBottom=(0,emotion_styled_browser_esm.A)("div",{target:"e1umm6e01"})("display:inline-flex;"),StyledButton=(0,emotion_styled_browser_esm.A)(Button.A,{target:"e1umm6e02"})("svg{width:12px;height:12px;}"),EmptySlotRight=(0,emotion_styled_browser_esm.A)("div",{target:"e1umm6e03"})(styles.jT," ",(props=>{const spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n      height: 100%;\n      min-width: 100px;\n      box-shadow: inset 0 0 0 1px ${semanticColors?.base?.divider};\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 0 ${spaces?.l}px;\n      box-sizing: border-box;\n      border-radius: 4px;\n      color: ${semanticColors?.base?.textDisabled};\n      user-select: none;\n    `})),EmptySlotBottom=(0,emotion_styled_browser_esm.A)("div",{target:"e1umm6e04"})(styles.jT," ",(props=>{const spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n      min-height: 20px;\n      width: 100%;\n      box-shadow: inset 0 0 0 1px ${semanticColors?.base?.divider};\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 0 ${spaces?.l}px;\n      box-sizing: border-box;\n      border-radius: 4px;\n      color: ${semanticColors?.base?.textDisabled};\n      user-select: none;\n    `})),StyledCellBasic=(0,emotion_styled_browser_esm.A)(CellBasic.A,{target:"e1umm6e05"})((props=>{const semanticColors=(0,styles.Bd)(props);return`\n      border: dashed 1px ${semanticColors?.base?.divider};\n      height: 70px;\n      max-width: 300px;\n      width: 300px;\n    `})),CELL_BASIC_ICON_OPTIONS=[void 0,(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"xs",sdsIcon:"Download"},"download"),(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"s",sdsIcon:"LightBulb"},"lightBulb"),(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"l",sdsIcon:"Bacteria"},"bacteria"),(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"xl",sdsIcon:"Flask"},"flask")],CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS=[void 0,(0,jsx_runtime.jsx)(EmptySlotRight,{children:"Empty Slot"},"componentSlotRight-0"),(0,jsx_runtime.jsx)(Tag.A,{label:"lorem ipsum",hover:!1,sdsStyle:"rounded",sdsType:"secondary",style:{margin:0}},"componentSlotRight-1"),(0,jsx_runtime.jsxs)(ButtonIconsGroupRight,{children:[(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Bar Chart Vertical 4",icon:"BarChartVertical4",sdsSize:"small",sdsType:"primary",sdsStyle:"icon"}),(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Copy",icon:"Copy",sdsSize:"small",sdsType:"primary",sdsStyle:"icon"}),(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Search Lines Horizontal 3",icon:"SearchLinesHorizontal3",sdsSize:"small",sdsType:"primary",sdsStyle:"icon"}),(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Download",icon:"Download",sdsSize:"small",sdsType:"primary",sdsStyle:"icon"})]},"componentSlotRight-2")],CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS=[void 0,(0,jsx_runtime.jsx)(EmptySlotBottom,{children:"Empty Slot"},"componentSlotBottom-0"),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Tag.A,{label:"lorem ipsum",hover:!1,sdsStyle:"rounded",sdsType:"secondary"}),(0,jsx_runtime.jsx)(Tag.A,{label:"dollor",hover:!1,sdsStyle:"rounded",sdsType:"secondary"}),(0,jsx_runtime.jsx)(Tag.A,{label:"sit amet",hover:!1,sdsStyle:"rounded",sdsType:"secondary"})]},"componentSlotBottom-1"),(0,jsx_runtime.jsxs)(ButtonIconsGroupBottom,{children:[(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Bar Chart Vertical 4",icon:"BarChartVertical4",sdsSize:"small",sdsType:"tertiary",sdsStyle:"icon"}),(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Copy",icon:"Copy",sdsSize:"small",sdsType:"tertiary",sdsStyle:"icon"}),(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Search Lines Horizontal 3",icon:"SearchLinesHorizontal3",sdsSize:"small",sdsType:"tertiary",sdsStyle:"icon"}),(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Tree Horizontal",icon:"TreeHorizontal",sdsSize:"small",sdsType:"tertiary",sdsStyle:"icon"}),(0,jsx_runtime.jsx)(StyledButton,{"aria-label":"Download",icon:"Download",sdsSize:"small",sdsType:"tertiary",sdsStyle:"icon"})]},"componentSlotBottom-2")];var loremIpsum=__webpack_require__("./packages/components/src/common/storybook/loremIpsum.ts");const TestDemo=()=>(0,jsx_runtime.jsx)("table",{children:(0,jsx_runtime.jsxs)("tbody",{children:[(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)(StyledCellBasic,{"data-testid":"CellBasicVerticalAlignTest",primaryText:"Primary Text",secondaryText:loremIpsum.G9,secondaryTextWrapLineCount:2,verticalAlign:"bottom",shouldTextWrap:!0,shouldShowTooltipOnHover:!1}),(0,jsx_runtime.jsx)(StyledCellBasic,{primaryText:"Primary Text",secondaryText:"Secondary Text",horizontalAlign:"left",shouldShowTooltipOnHover:!1}),(0,jsx_runtime.jsx)(StyledCellBasic,{"data-testid":"CellBasic",primaryText:"Primary Text",secondaryText:"Secondary Text",tertiaryText:"Tertiary Text",horizontalAlign:"right",tooltipProps:{sdsStyle:"dark",title:"testTooltipTitle"}})]}),(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)(StyledCellBasic,{"data-testid":"CellBasicWithIcon",primaryText:"Primary Text",secondaryText:"Secondary Text",tertiaryText:"Tertiary Text",shouldShowTooltipOnHover:!1,icon:(0,jsx_runtime.jsx)(Icon.A,{sdsSize:"l",sdsIcon:"Bacteria"})}),(0,jsx_runtime.jsx)(StyledCellBasic,{primaryText:"Primary Text",primaryTextComponentSlotRight:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[2],secondaryText:"Secondary Text",tertiaryText:"Tertiary Text",shouldShowTooltipOnHover:!1}),(0,jsx_runtime.jsx)(StyledCellBasic,{primaryText:"Primary Text",primaryTextComponentSlotRight:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[3],shouldShowTooltipOnHover:!1,secondaryText:"Secondary Text",tertiaryText:"Tertiary Text"})]}),(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)(StyledCellBasic,{primaryText:"Primary Text",primaryTextComponentSlotBottom:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[2],shouldShowTooltipOnHover:!1}),(0,jsx_runtime.jsx)(StyledCellBasic,{primaryText:"Primary Text",primaryTextComponentSlotBottom:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[3],shouldShowTooltipOnHover:!1}),(0,jsx_runtime.jsx)(StyledCellBasic,{primaryText:"Primary Text",primaryTextComponentSlotBottom:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[2],primaryTextComponentSlotRight:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[3],shouldShowTooltipOnHover:!1})]})]})});TestDemo.__docgenInfo={description:"",methods:[],displayName:"TestDemo"};var storybookBadges=__webpack_require__("./packages/components/src/common/storybook/storybookBadges.ts");const index_stories={argTypes:{horizontalAlign:{control:{type:"select"},defaultValue:{summary:"left"},description:"Horizontal alignment of the cell",options:["left","right"]},icon:{control:{labels:["No Icon","XS Download","S Light bulb","L Bacteria","XL Flask"],type:"select"},defaultValue:{summary:"null"},description:"Icon to be displayed",mapping:CELL_BASIC_ICON_OPTIONS,options:Object.keys(CELL_BASIC_ICON_OPTIONS)},iconVerticalAlign:{control:{type:"select"},defaultValue:{summary:"top"},description:"Vertical alignment of the icon",options:["top","center","bottom"]},primaryText:{control:{type:"text"},description:"Primary text to be displayed"},primaryTextComponentSlotBottom:{control:{labels:["No Component","Empty Slot","Tag Group","Icon Group"],type:"select"},defaultValue:{summary:"null"},description:"Component slot below primary text. This will only show if \n        there is no secondary or tertiary text. Remove the default values of \n        secondary and tertiary text to see this in action.",mapping:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS,options:Object.keys(CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS)},primaryTextComponentSlotRight:{control:{labels:["No Component","Empty Slot","Tag","Icon Group"],type:"select"},defaultValue:{summary:"null"},description:"Component slot to the right of primary text",mapping:CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS,options:Object.keys(CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS)},primaryTextWrapLineCount:{control:{type:"number"},defaultValue:{summary:"3"},description:"Number of lines to wrap the primary text"},secondaryText:{control:{type:"text"},description:"Secondary text to be displayed"},secondaryTextWrapLineCount:{control:{type:"number"},defaultValue:{summary:"1"},description:"Number of lines to wrap the secondary text"},shouldShowTooltipOnHover:{control:{type:"boolean"},defaultValue:{summary:"true"},description:"Show tooltip on hover"},shouldTextWrap:{control:{type:"boolean"},defaultValue:{summary:"true"},description:"Wrap text"},tertiaryText:{control:{type:"text"},defaultValue:{summary:"null"},description:"Tertiary text to be displayed"},tertiaryTextWrapLineCount:{control:{type:"number"},defaultValue:{summary:"1"},description:"Number of lines to wrap the tertiary text"},tooltipProps:{control:{type:"object"},defaultValue:{summary:"null"},description:"Props for the tooltip"},verticalAlign:{control:{type:"select"},defaultValue:{summary:"top"},description:"Vertical alignment of the cell",options:["top","center","bottom"]}},component:default_CellBasic,parameters:{badges:[storybookBadges.y.STABLE],controls:{expanded:!0}},title:"Components/Table/CellBasic"},Default={args:{primaryText:"Primary Text",primaryTextWrapLineCount:3,secondaryText:"Secondary Text",secondaryTextWrapLineCount:1,shouldShowTooltipOnHover:!0,shouldTextWrap:!0,tertiaryText:"Tertiary Text",tertiaryTextWrapLineCount:1,tooltipProps:{sdsStyle:"dark"}}},Test={args:{primaryText:"Primary text",secondaryText:"Secondary Text"},parameters:{controls:{exclude:["icon","iconVerticalAlign","primaryText","primaryTextWrapLineCount","secondaryText","secondaryTextWrapLineCount","tertiaryText","tertiaryTextWrapLineCount","shouldShowTooltipOnHover","shouldTextWrap","tooltipProps","horizontalAlign","verticalAlign","primaryTextComponentSlotBottom","primaryTextComponentSlotRight"]},snapshot:{skip:!0}},render:args=>(0,jsx_runtime.jsx)(TestDemo,{...args})},__namedExportsOrder=["Default","Test"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    primaryText: "Primary Text",\n    primaryTextWrapLineCount: 3,\n    secondaryText: "Secondary Text",\n    secondaryTextWrapLineCount: 1,\n    shouldShowTooltipOnHover: true,\n    shouldTextWrap: true,\n    tertiaryText: "Tertiary Text",\n    tertiaryTextWrapLineCount: 1,\n    tooltipProps: {\n      sdsStyle: "dark"\n    }\n  }\n}',...Default.parameters?.docs?.source}}},Test.parameters={...Test.parameters,docs:{...Test.parameters?.docs,source:{originalSource:'{\n  args: {\n    primaryText: "Primary text",\n    secondaryText: "Secondary Text"\n  },\n  parameters: {\n    controls: {\n      exclude: CELL_BASIC_EXCLUDED_CONTROLS\n    },\n    snapshot: {\n      skip: true\n    }\n  },\n  render: (args: Args) => <TestDemo {...args} />\n}',...Test.parameters?.docs?.source}}}},"./packages/components/src/common/storybook/loremIpsum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G9:()=>SHORT_LOREM_IPSUM,PW:()=>EXTRA_SHORT_LOREM_IPSUM,gr:()=>LONG_LOREM_IPSUM,zu:()=>EXTRA_LONG_LOREM_IPSUM});const EXTRA_SHORT_LOREM_IPSUM="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",SHORT_LOREM_IPSUM=`${EXTRA_SHORT_LOREM_IPSUM} Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper.`,LONG_LOREM_IPSUM=`${`${SHORT_LOREM_IPSUM} Urna duis convallis convallis tellus id interdum velit laoreet id. Donec ultrices tincidunt arcu non sodales. Aliquam eleifend mi in nulla posuere.`} Quisque id diam vel quam elementum pulvinar. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Id consectetur purus ut faucibus. Molestie at elementum eu facilisis sed odio morbi quis commodo. Et leo duis ut diam. Nulla facilisi cras fermentum odio. Magnis dis parturient montes nascetur ridiculus mus mauris. Maecenas volutpat blandit aliquam etiam erat. Arcu dui vivamus arcu felis bibendum ut tristique. Id porta nibh venenatis cras sed felis eget. Mi ipsum faucibus vitae aliquet nec ullamcorper.`,EXTRA_LONG_LOREM_IPSUM=`${LONG_LOREM_IPSUM} ${LONG_LOREM_IPSUM}`},"./packages/components/src/core/CellBasic/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_CellBasic});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),Tooltip=__webpack_require__("./packages/components/src/core/Tooltip/index.tsx"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const doNotForwardProps=["icon","iconVerticalAlign","horizontalAlign","verticalAlign","primaryText","secondaryText","tertiaryText","shouldTextWrap","shouldShowTooltipOnHover","tooltipProps","primaryTextWrapLineCount","secondaryTextWrapLineCount","tertiaryTextWrapLineCount","primaryTextComponentSlotBottom","primaryTextComponentSlotRight"],verticalAlignCSSMap={bottom:"bottom",center:"middle",top:"top"},verticalAlignToFlexMap={bottom:"flex-end",center:"center",top:"flex-start"},StyledTableData=(0,emotion_styled_browser_esm.A)("td",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl60"})(styles.JU," ",styles.UT," ",(props=>{const{horizontalAlign="left",verticalAlign="top"}=props,spaces=(0,styles.oZ)(props);return`\n        padding: ${spaces?.l}px ${spaces?.m}px;\n        text-align: ${horizontalAlign};\n        vertical-align: ${verticalAlignCSSMap[verticalAlign]};\n        overflow: hidden;\n    `})),ShouldWrap=lineCount=>`\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-line-clamp: ${lineCount};\n    -webkit-box-orient: vertical; \n  `,StyledCellContent=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl61"})("display:flex;"),StyledCellContentWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl62"})("width:100%;"),StyledCellIconWrapper=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl63"})((props=>{const{iconVerticalAlign="top"}=props,spaces=(0,styles.oZ)(props);return`\n      padding-right: ${spaces?.l}px;\n      display: flex;\n      flex-direction: column;\n      justify-content: ${verticalAlignToFlexMap[iconVerticalAlign]};\n    `})),PrimaryTextWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl64"})((props=>{const{horizontalAlign}=props;return`\n      display: flex;\n      justify-content: ${"left"===horizontalAlign?"flex-start":"flex-end"};\n    `})),PrimaryText=(0,emotion_styled_browser_esm.A)("div",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl65"})(styles.JU," ",(props=>{const{primaryTextWrapLineCount=3}=props;return`\n      display: block;\n      ${props.shouldTextWrap?ShouldWrap(primaryTextWrapLineCount):"\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n  "}\n    `})),SecondaryText=(0,emotion_styled_browser_esm.A)("span",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl66"})(styles.Pf," ",(props=>{const{secondaryTextWrapLineCount=1}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n      display: block;\n      color: ${semanticColors?.base?.textSecondary};\n      padding-top: ${spaces?.xxxs}px;\n\n      ${props.shouldTextWrap?ShouldWrap(secondaryTextWrapLineCount):"\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n  "}\n    `})),TertiaryText=(0,emotion_styled_browser_esm.A)("span",{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rodtl67"})(styles.Pf," ",(props=>{const{tertiaryTextWrapLineCount=1}=props,spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return`\n      display: block;\n      color: ${semanticColors?.base?.textSecondary};\n      padding-top: ${spaces?.s}px;\n\n      ${props.shouldTextWrap?ShouldWrap(tertiaryTextWrapLineCount):"\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n  "}\n    `})),PrimaryTextComponentSlotBottomWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl68"})((props=>{const spaces=(0,styles.oZ)(props);return`\n      margin-top: ${spaces?.xxs}px;\n    `})),PrimaryTextComponentSlotRightWrapper=(0,emotion_styled_browser_esm.A)("div",{target:"e1rodtl69"})((props=>{const spaces=(0,styles.oZ)(props);return`\n      margin-left: ${spaces?.xs}px;\n    `})),CellBasicContent=props=>{const{primaryText,primaryTextWrapLineCount,secondaryText,secondaryTextWrapLineCount,tertiaryText,tertiaryTextWrapLineCount,shouldTextWrap=!0,icon,iconVerticalAlign,primaryTextComponentSlotRight,primaryTextComponentSlotBottom,horizontalAlign="left"}=props;return(0,jsx_runtime.jsxs)(StyledCellContent,{children:[icon&&(0,jsx_runtime.jsx)(StyledCellIconWrapper,{iconVerticalAlign,children:icon}),(0,jsx_runtime.jsxs)(StyledCellContentWrapper,{children:[(0,jsx_runtime.jsxs)(PrimaryTextWrapper,{horizontalAlign,children:[(0,jsx_runtime.jsx)(PrimaryText,{shouldTextWrap,primaryTextWrapLineCount,children:primaryText}),primaryTextComponentSlotRight&&(0,jsx_runtime.jsx)(PrimaryTextComponentSlotRightWrapper,{children:primaryTextComponentSlotRight})]}),!secondaryText&&!tertiaryText&&primaryTextComponentSlotBottom&&(0,jsx_runtime.jsx)(PrimaryTextComponentSlotBottomWrapper,{children:primaryTextComponentSlotBottom}),secondaryText&&(0,jsx_runtime.jsx)(SecondaryText,{shouldTextWrap,secondaryTextWrapLineCount,children:secondaryText}),tertiaryText&&(0,jsx_runtime.jsx)(TertiaryText,{shouldTextWrap,tertiaryTextWrapLineCount,children:tertiaryText})]})]})},CellBasic=(0,react.forwardRef)(((props,ref)=>{const{primaryText,secondaryText,shouldShowTooltipOnHover=!0,tooltipProps}=props;return shouldShowTooltipOnHover?(0,jsx_runtime.jsx)(Tooltip.A,{title:primaryText,subtitle:secondaryText,arrow:!0,leaveDelay:0,leaveTouchDelay:0,sdsStyle:"dark",...tooltipProps,children:(0,jsx_runtime.jsx)(StyledTableData,{ref,...props,children:(0,jsx_runtime.jsx)(CellBasicContent,{...props})})}):(0,jsx_runtime.jsx)(StyledTableData,{ref,...props,children:(0,jsx_runtime.jsx)(CellBasicContent,{...props})})})),core_CellBasic=CellBasic;CellBasic.__docgenInfo={description:"",methods:[],displayName:"CellBasic",props:{shouldShowTooltipOnHover:{required:!1,tsType:{name:"boolean"},description:""},tooltipProps:{required:!1,tsType:{name:"Partial",elements:[{name:"TooltipProps"}],raw:"Partial<TooltipProps>"},description:""},horizontalAlign:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},verticalAlign:{required:!1,tsType:{name:"union",raw:'"top" | "center" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"center"'},{name:"literal",value:'"bottom"'}]},description:""},iconVerticalAlign:{required:!1,tsType:{name:"union",raw:'"top" | "center" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"center"'},{name:"literal",value:'"bottom"'}]},description:""},shouldTextWrap:{required:!1,tsType:{name:"boolean"},description:""},primaryTextWrapLineCount:{required:!1,tsType:{name:"number"},description:""},secondaryTextWrapLineCount:{required:!1,tsType:{name:"number"},description:""},tertiaryTextWrapLineCount:{required:!1,tsType:{name:"number"},description:""},primaryText:{required:!0,tsType:{name:"string"},description:""},secondaryText:{required:!1,tsType:{name:"string"},description:""},tertiaryText:{required:!1,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactReactElement",raw:"React.ReactElement<CustomSVGProps>",elements:[{name:"CustomSVGProps"}]},description:""},primaryTextComponentSlotRight:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},primaryTextComponentSlotBottom:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["CommonThemeProps","Omit"]}},"./packages/components/src/core/Tag/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Tag});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),colorManipulator=__webpack_require__("./node_modules/@mui/system/esm/colorManipulator.js"),Chip=__webpack_require__("./node_modules/@mui/material/Chip/Chip.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");function generatePrimaryTagColors(intent,colors,semanticColors){return intent||colors.length?(intent=intent||"neutral",{background:colors.length>=2?colors[1]:semanticColors?.[intent].fillPrimary,backgroundClicked:colors.length>=2?(0,colorManipulator.e$)(colors[1],.3):semanticColors?.[intent].fillPressed,backgroundHover:colors.length>=2?(0,colorManipulator.e$)(colors[1],.15):semanticColors?.[intent].fillHover,iconColor:colors.length>2?colors[2]:semanticColors?.base?.ornamentOnFill,label:colors.length?colors[0]:semanticColors?.base?.textOnFill}):{background:semanticColors?.neutral.fillPrimary,backgroundClicked:semanticColors?.neutral.fillPressed,backgroundHover:semanticColors?.neutral.fillHover,iconColor:semanticColors?.base?.ornamentOnFill,label:semanticColors?.base?.textOnFill}}function generateSecondaryTagColors(intent,colors,semanticColors){return intent||colors.length?(intent=intent||"neutral",{background:colors.length>=2?colors[1]:semanticColors?.[intent].fillSecondary,backgroundClicked:colors.length>=2?(0,colorManipulator.e$)(colors[1],.3):semanticColors?.[intent].fillPressed,backgroundHover:colors.length>=2?(0,colorManipulator.e$)(colors[1],.15):semanticColors?.[intent].fillHover,iconColor:colors.length>2?colors[2]:semanticColors?.[intent].ornament,label:colors.length?colors[0]:semanticColors?.[intent].text}):{background:semanticColors?.neutral.fillSecondary,backgroundClicked:semanticColors?.neutral.fillPressed,backgroundHover:semanticColors?.neutral.fillHover,iconColor:semanticColors?.neutral.ornament,label:semanticColors?.neutral.fillPressed}}function createTypeCss(props,type){const semanticColors=(0,styles.Bd)(props),intent="string"==typeof props.tagColor?props.tagColor:null,colors=Array.isArray(props.tagColor)?[...props.tagColor]:[],typeColors={primary:generatePrimaryTagColors(intent,colors,semanticColors),secondary:generateSecondaryTagColors(intent,colors,semanticColors)}[type];return(0,emotion_react_browser_esm.AH)((0,styles.UT)(props),"    background-color:",typeColors.background,";position:relative;.MuiChip-label{color:",typeColors.label,";}svg{fill:",typeColors.iconColor,";}&:hover,&:active{.MuiChip-label{color:",semanticColors?.base?.textPrimaryInverse,";}svg{fill:",semanticColors?.base?.ornamentPrimaryInverse,";}}&:hover{background-color:",typeColors.backgroundHover,";}&:active{background-color:",typeColors.backgroundClicked,";}&.Mui-focusVisible{background-color:",typeColors.backgroundHover,";}x")}const typeToCss={primary:props=>createTypeCss(props,"primary"),secondary:props=>createTypeCss(props,"secondary")},doNotForwardProps=["sdsType","sdsStyle","sdsSize","tagColor","hover"],StyledTag=(0,emotion_styled_browser_esm.A)(Chip.A,{shouldForwardProp:prop=>!doNotForwardProps.includes(prop),target:"e1rh5br0"})("border:none;",(props=>{const{hover=!0,sdsType,sdsStyle,sdsSize="s"}=props,isRounded="rounded"===sdsStyle,type=sdsType||"primary";return(0,emotion_react_browser_esm.AH)("l"===sdsSize?(props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("height:unset;margin:0 ",spaces?.xxs,"px ",spaces?.xs,"px 0;.MuiChip-label{",(0,styles.Zo)(props),"      padding:0;}.MuiSvgIcon-root{height:",iconSizes?.l.height,"px;width:",iconSizes?.l.width,"px;margin:0 ",spaces?.xxs,"px 0 -",spaces?.xxxs,"px;}.MuiChip-deleteIcon{",(0,styles.Se)(props),"      color:",semanticColors?.base?.ornamentPrimaryInverse,";margin:0 0 0 ",spaces?.xxs,"px;height:",iconSizes?.s.height,"px;width:",iconSizes?.s.width,"px;}")})(props):(props=>{const spaces=(0,styles.oZ)(props),iconSizes=(0,styles.I7)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("height:unset;margin:0 ",spaces?.xxs,"px ",spaces?.xs,"px 0;.MuiChip-label{",(0,styles.jT)(props),"      padding:0;}.MuiSvgIcon-root{height:",iconSizes?.xs.height,"px;width:",iconSizes?.xs.width,"px;margin:0 ",spaces?.xxs,"px 0 -",spaces?.xxxs,"px;}.MuiChip-deleteIcon{",(0,styles.Se)(props),"      color:",semanticColors?.base?.ornamentPrimaryInverse,";margin:0 0 0 ",spaces?.xxs,"px;height:",iconSizes?.s.height,"px;width:",iconSizes?.s.width,"px;}")})(props)," ",typeToCss[type](props)," ",isRounded?(props=>{const corners=(0,styles.VP)(props),spaces=(0,styles.oZ)(props),{sdsSize="s",icon}=props,topBottomPadding="s"===sdsSize?spaces?.xxxs:icon?spaces?.xxs:spaces?.xs;return(0,emotion_react_browser_esm.AH)("border-radius:",corners?.l,"px;padding:",topBottomPadding,"px ",spaces?.s,"px;&:after{border-radius:",corners?.l,"px;}")})(props):(props=>{const corners=(0,styles.VP)(props),spaces=(0,styles.oZ)(props),{sdsSize="s",icon}=props,topBottomPadding="s"===sdsSize?spaces?.xxxs:icon?spaces?.xxs:spaces?.xs;return(0,emotion_react_browser_esm.AH)("border-radius:",corners?.m,"px;padding:",topBottomPadding,"px ",spaces?.s,"px;&:after{border-radius:",corners?.m,"px;}")})(props)," ",hover?(props=>{const semanticColors=(0,styles.Bd)(props);return(0,emotion_react_browser_esm.AH)("&:hover{cursor:pointer;}&:hover,&:focus-visible{color:",semanticColors?.base?.textPrimaryInverse,";}")})(props):"pointer-events: none;")})),Tag=props=>{const{color}=props;return(0,jsx_runtime.jsx)(StyledTag,{tagColor:color,...props,color:"primary"})},core_Tag=Tag;Tag.__docgenInfo={description:"@see https://mui.com/material-ui/react-chip/\n\n@props color: {string}                   - applies color for tag based on default theme color values\n              [string, string]           - applies custom colors for [font, background]\n              [string, string, string]   - applies custom colors for [font, background, icon]",methods:[],displayName:"Tag",props:{label:{required:!0,tsType:{name:"string"},description:""},color:{required:!1,tsType:{name:"union",raw:'| "info"\n| "positive"\n| "notice"\n| "negative"\n| "neutral"\n| "beta"\n| [string, string]\n| [string, string, string]',elements:[{name:"literal",value:'"info"'},{name:"literal",value:'"positive"'},{name:"literal",value:'"notice"'},{name:"literal",value:'"negative"'},{name:"literal",value:'"neutral"'},{name:"literal",value:'"beta"'},{name:"tuple",raw:"[string, string]",elements:[{name:"string"},{name:"string"}]},{name:"tuple",raw:"[string, string, string]",elements:[{name:"string"},{name:"string"},{name:"string"}]}]},description:""}},composes:["Omit"]}},"./packages/components/src/core/Tooltip/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>core_Tooltip});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),useTheme=__webpack_require__("./node_modules/@mui/material/styles/useTheme.js"),Tooltip_Tooltip=__webpack_require__("./node_modules/@mui/material/Tooltip/Tooltip.js"),react=__webpack_require__("./node_modules/react/index.js"),warnings=__webpack_require__("./packages/components/src/common/warnings.ts"),emotion_css_esm=__webpack_require__("./node_modules/@emotion/css/dist/emotion-css.esm.js"),Popper=__webpack_require__("./node_modules/@mui/material/Popper/Popper.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),styles=__webpack_require__("./packages/components/src/core/styles/index.ts");const Subtitle=(0,emotion_styled_browser_esm.A)("div",{target:"e1ibawlh0"})(styles.Pf," ",(props=>{const{hasInvertedStyle}=props,semanticColors=(0,styles.Bd)(props);return`\n      color: ${hasInvertedStyle?semanticColors?.base?.textSecondaryInverse:semanticColors?.base?.textSecondary};\n    `})),tooltipCss=props=>{const{hasInvertedStyle=!0,inverted,sdsStyle,width,followCursor}=props,shadows=(0,styles.CG)(props);return(0,emotion_css_esm.AH)("&.MuiTooltip-tooltip{box-shadow:",shadows?.m,";","dark"===sdsStyle||inverted||hasInvertedStyle?(props=>{const spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_css_esm.AH)((0,styles.Se)(props),"    background-color:",semanticColors?.base?.surfaceInverse,";color:",semanticColors?.base?.textPrimaryInverse,";text-align:center;max-width:250px;padding:",spaces?.s,"px ",spaces?.l,"px;")})(props):(props=>{const spaces=(0,styles.oZ)(props),semanticColors=(0,styles.Bd)(props);return(0,emotion_css_esm.AH)((0,styles.Zo)(props),"    background-color:",semanticColors?.base?.surface,";color:",semanticColors?.base?.textPrimary,";text-align:left;max-width:250px;padding:",spaces?.s,"px ",spaces?.l,"px;")})(props)," ","wide"===width&&"light"===sdsStyle&&(0,emotion_css_esm.AH)("max-width:550px;")," ",!0===followCursor&&(props=>{const spaces=(0,styles.oZ)(props);return(0,emotion_css_esm.AH)("padding:",spaces?.m,"px;")})(props),"}")},arrowCss=props=>{const{hasInvertedStyle,inverted,sdsStyle,arrowOffset}=props,semanticColors=(0,styles.Bd)(props);return(0,emotion_css_esm.AH)("&.MuiTooltip-arrow{left:",arrowOffset,"px !important;color:",hasInvertedStyle||inverted||"dark"===sdsStyle?semanticColors?.base?.surfaceInverse:semanticColors?.base?.surface,";&:before{box-sizing:border-box;width:12px;height:12px;}}")},StyledPopper=(0,emotion_styled_browser_esm.A)(Popper.A,{target:"e1ibawlh1"})('&[data-popper-placement*="top"] .MuiTooltip-arrow{width:24px !important;height:12px !important;margin-bottom:-12px !important;&:before{transform:rotate(45deg) translate(0px,-2px);border-bottom-right-radius:2px;box-shadow:0 0 3px 2px rgba(0,0,0,0.1);}}&[data-popper-placement*="bottom"] .MuiTooltip-arrow{width:24px !important;height:12px !important;margin-top:-12px !important;&:before{transform:rotate(45deg) translate(-1px,2px);border-top-left-radius:2px;box-shadow:0 0 2px 0px rgba(0,0,0,0.1);}}&[data-popper-placement*="left"] .MuiTooltip-arrow{width:12px !important;height:16px !important;margin-right:-12px !important;&:before{transform:rotate(45deg) translate(-1px,1px);border-top-right-radius:2px;box-shadow:0 0 4px 0px rgba(0,0,0,0.1);}}&[data-popper-placement*="right"] .MuiTooltip-arrow{width:12px !important;height:16px !important;margin-left:-12px !important;&:before{transform:rotate(45deg) translate(4px,2px);border-bottom-left-radius:2px;box-shadow:0 0 4px 0px rgba(0,0,0,0.1);}}'),Tooltip=(0,react.forwardRef)((function Tooltip(props,ref){const{arrowOffset,classes,hasInvertedStyle=!0,inverted,sdsStyle="dark",subtitle,title,width="default",PopperComponent=StyledPopper,...rest}=props,{children}=rest;(inverted||sdsStyle)&&(0,warnings.S7)(warnings.oq.TooltipInvertStyle),"wide"!==width||"dark"!==sdsStyle&&!hasInvertedStyle||(0,warnings.S7)(warnings.oq.TooltipWidth);const theme=(0,useTheme.A)(),extraProps={arrowOffset,classes,hasInvertedStyle:invertStyleValue(inverted,sdsStyle,hasInvertedStyle),theme,width},tooltip=mergeClass({className:tooltipCss(extraProps),key:"tooltip",props}),arrow=mergeClass({className:arrowCss(extraProps),key:"arrow",props});if(!title&&!subtitle)return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children});const content=(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[title,subtitle&&(0,jsx_runtime.jsx)(Subtitle,{hasInvertedStyle,children:subtitle})]}),leaveDelay=hasInvertedStyle||inverted||"dark"===sdsStyle?0:500;return(0,jsx_runtime.jsx)(Tooltip_Tooltip.A,{classes:{arrow,tooltip},leaveDelay,title:content,PopperComponent,tabIndex:0,ref,arrow:!0,...rest})}));function invertStyleValue(inverted,sdsStyle,hasInvertedStyle){return void 0!==hasInvertedStyle?hasInvertedStyle:"dark"===sdsStyle||"light"!==sdsStyle&&inverted}function mergeClass({props,className,key}){const{classes}=props;if(!classes)return className;const propClassName=classes[key];return propClassName?`${propClassName} ${className}`:className}const core_Tooltip=Tooltip;Tooltip.__docgenInfo={description:"@see https://mui.com/material-ui/react-tooltip/\n\n@warning If the tooltip wraps a disabled component, please make sure to\nwrap the children in a `<span>` tag.\nhttps://mui.com/components/tooltips/#disabled-elements",methods:[],displayName:"Tooltip",props:{arrowOffset:{required:!1,tsType:{name:"number"},description:""},followCursor:{required:!1,tsType:{name:"boolean"},description:""},inverted:{required:!1,tsType:{name:"boolean"},description:""},sdsStyle:{required:!1,tsType:{name:"union",raw:'"dark" | "light"',elements:[{name:"literal",value:'"dark"'},{name:"literal",value:'"light"'}]},description:""},hasInvertedStyle:{required:!1,tsType:{name:"boolean"},description:""},subtitle:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"union",raw:'"default" | "wide"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"wide"'}]},description:""}},composes:["CommonThemeProps"]}}}]);