import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{Aa as n,Gi as r}from"./iframe-Bjh1LYUt.js";import{n as i,t as a}from"./Icon-D5aq3JJF.js";import{n as o,t as s}from"./Button-BT0OC4_c.js";import{n as c,t as l}from"./Tag-B6vZjc0G.js";import{n as u,t as d}from"./CellComponent-CYXGOiaa.js";import{n as f,t as p}from"./CellHeader-3ED9iVHn.js";import{n as m,t as h}from"./CellBasic-BzYtvfRb.js";import{n as g,t as _}from"./Dropdown-JVKDwffg.js";import{n as v,t as y}from"./InputText-ClQKTjkg.js";import{n as b,t as x}from"./Link-DWe--q-q.js";import{n as S,t as C}from"./PreComposedTable-Bzr3suN9.js";function w({column:e}){let t=e.getFilterValue()??[void 0,void 0];return(0,T.jsxs)(`div`,{style:{display:`flex`,gap:4,alignItems:`center`},children:[(0,T.jsx)(y,{id:`${e.id}-min`,label:`Min`,hideLabel:!0,placeholder:`Min`,type:`number`,sdsType:`textField`,value:t[0]??``,onChange:t=>e.setFilterValue(e=>[t.target.value?Number(t.target.value):void 0,e?.[1]]),size:`small`}),(0,T.jsx)(`span`,{style:{flexShrink:0},children:`—`}),(0,T.jsx)(y,{id:`${e.id}-max`,label:`Max`,hideLabel:!0,placeholder:`Max`,type:`number`,sdsType:`textField`,value:t[1]??``,onChange:t=>e.setFilterValue(e=>[e?.[0],t.target.value?Number(t.target.value):void 0]),size:`small`})]})}var T,E,D,O,k,A,j,M=t((()=>{n(),o(),m(),u(),f(),i(),v(),b(),c(),g(),T=r(),E=[{department:`Engineering`,email:`john.doe@example.com`,id:`1`,lastActive:`2024-01-15`,location:`San Francisco`,name:`John Doe`,projects:5,role:`Software Engineer`,salary:85e3,startDate:`2022-03-15`,status:`Active`},{department:`Product`,email:`jane.smith@example.com`,id:`2`,lastActive:`2024-01-14`,location:`New York`,name:`Jane Smith`,projects:3,role:`Product Manager`,salary:95e3,startDate:`2021-08-20`,status:`Active`},{department:`Design`,email:`bob.johnson@example.com`,id:`3`,lastActive:`2024-01-10`,location:`Austin`,name:`Bob Johnson`,projects:2,role:`Designer`,salary:75e3,startDate:`2023-01-10`,status:`Inactive`},{department:`Data`,email:`alice.brown@example.com`,id:`4`,lastActive:`2024-01-16`,location:`Seattle`,name:`Alice Brown`,projects:7,role:`Data Scientist`,salary:9e4,startDate:`2022-11-05`,status:`Active`},{department:`Engineering`,email:`charlie.wilson@example.com`,id:`5`,lastActive:`2024-01-15`,location:`Remote`,name:`Charlie Wilson`,projects:4,role:`DevOps Engineer`,salary:88e3,startDate:`2023-06-12`,status:`Active`}],D=[{accessorKey:`name`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),secondaryText:`${e()} is a test`,shouldShowTooltipOnHover:!1,shouldShowUnderlineOnHover:!0,link:`https://www.google.com`,linkComponent:`a`,linkProps:{target:`_blank`},...t}),enableSorting:!1,header:({header:e,...t})=>(0,T.jsx)(p,{hideSortIcon:!0,hover:!0,shouldShowTooltipOnHover:!0,tooltipProps:{componentSlot:(0,T.jsx)(x,{href:`https://www.google.com`,sdsStyle:`dashed`,sdsSize:`xs`,children:`A sample link to Google`}),placement:`top`,textAlign:`left`,width:`wide`},tooltipSubtitle:`Measures the model's ability to distinguish between classes. Represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative one. Higher values indicate better discriminative performance across thresholds.`,tooltipText:`Name`,...t,children:`Name`}),meta:{isGrow:!0,pinning:`left`},minSize:150},{accessorKey:`email`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),secondaryText:e(),shouldShowUnderlineOnHover:!0,link:`mailto:${e()}`,linkProps:{target:`_blank`},shouldShowTooltipOnHover:!1,primaryTextWrapLineCount:1,...t}),header:`Email`,meta:{isGrow:!0},minSize:200},{accessorKey:`role`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Role`,meta:{verticalAlign:`middle`},minSize:150},{accessorKey:`department`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Department`,minSize:120},{accessorKey:`status`,cell:({getValue:e,...t})=>(0,T.jsx)(d,{...t,children:(0,T.jsx)(l,{label:e(),color:e()===`Active`?`positive`:`negative`,sdsStyle:`rounded`,sdsType:`secondary`,hover:!1})}),header:`Status`,minSize:100},{accessorKey:`lastActive`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),tabularNums:!0,shouldShowTooltipOnHover:!1,horizontalAlign:`right`,extraRightPadding:t?.column?.getCanSort()?20:0,...t}),header:`Last Active`,meta:{headerCellProps:{horizontalAlign:`right`}},minSize:120},{accessorKey:`projects`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),tabularNums:!0,shouldShowTooltipOnHover:!1,horizontalAlign:`right`,extraRightPadding:t?.column?.getCanSort()?20:0,...t}),header:`Projects`,meta:{headerCellProps:{horizontalAlign:`right`}},minSize:100},{accessorKey:`salary`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:`$${e().toLocaleString()}`,tabularNums:!0,extraRightPadding:t?.column?.getCanSort()?20:0,horizontalAlign:`right`,...t}),header:`Salary`,meta:{headerCellProps:{horizontalAlign:`right`}},minSize:120},{accessorKey:`location`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,tabularNums:!0,...t}),header:`Location`,minSize:150},{accessorKey:`startDate`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),tabularNums:!0,shouldShowTooltipOnHover:!1,horizontalAlign:`right`,extraRightPadding:t?.column?.getCanSort()?20:0,...t}),header:`Start Date`,meta:{headerCellProps:{horizontalAlign:`right`}},minSize:120},{cell:({row:e,...t})=>(0,T.jsx)(d,{horizontalAlign:`center`,...t,children:(0,T.jsxs)(`div`,{style:{display:`flex`,justifyContent:`end`},children:[(0,T.jsx)(s,{sdsStyle:`minimal`,sdsType:`secondary`,size:`medium`,"aria-label":`Edit ${e.original.name}`,onClick:()=>console.log(`Edit`,e.original),children:(0,T.jsx)(a,{sdsIcon:`Edit`,sdsSize:`s`})}),(0,T.jsx)(s,{sdsStyle:`minimal`,sdsType:`secondary`,size:`medium`,"aria-label":`More options for ${e.original.name}`,onClick:()=>console.log(`Downlaod`,e.original),children:(0,T.jsx)(a,{sdsIcon:`Download`,sdsSize:`s`})})]})}),enableSorting:!1,header:`Actions`,id:`actions`,meta:{headerCellProps:{horizontalAlign:`right`},pinning:`right`,verticalAlign:`middle`},size:100}],O=[{accessorKey:`name`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Name`,meta:{isGrow:!0,pinning:`left`},minSize:150},{accessorKey:`email`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Email`,meta:{isGrow:!0},minSize:200},{accessorKey:`role`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Role`,minSize:150},{accessorKey:`department`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Department`,minSize:120},{accessorKey:`status`,cell:({getValue:e,...t})=>(0,T.jsx)(d,{...t,children:(0,T.jsx)(l,{label:e(),color:e()===`Active`?`positive`:`negative`,sdsStyle:`rounded`,sdsType:`secondary`,hover:!1})}),filterFn:`equalsString`,header:`Status`,meta:{filterComponent:({column:e})=>(0,T.jsx)(_,{label:`Status`,options:[{name:`All`},{name:`Active`},{name:`Inactive`}],onChange:(t,n)=>{e.setFilterValue(n?.name===`All`?void 0:n?.name)},InputDropdownProps:{width:`100%`}})},minSize:140},{accessorKey:`salary`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:`$${e().toLocaleString()}`,tabularNums:!0,horizontalAlign:`right`,...t}),enableColumnFilter:!1,header:`Salary`,meta:{headerCellProps:{horizontalAlign:`right`}},minSize:120},{accessorKey:`startDate`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),tabularNums:!0,shouldShowTooltipOnHover:!1,horizontalAlign:`right`,...t}),enableColumnFilter:!1,header:`Start Date`,meta:{headerCellProps:{horizontalAlign:`right`},pinning:`right`},minSize:120}],k=[{accessorKey:`name`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Name`,meta:{isGrow:!0,pinning:`left`},minSize:150},{accessorKey:`role`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),shouldShowTooltipOnHover:!1,...t}),header:`Role`,minSize:150},{accessorKey:`status`,cell:({getValue:e,...t})=>(0,T.jsx)(d,{...t,children:(0,T.jsx)(l,{label:e(),color:e()===`Active`?`positive`:`negative`,sdsStyle:`rounded`,sdsType:`secondary`,hover:!1})}),filterFn:`equalsString`,header:`Status`,meta:{filterComponent:({column:e})=>(0,T.jsx)(_,{label:`Status`,options:[{name:`All`},{name:`Active`},{name:`Inactive`}],onChange:(t,n)=>{e.setFilterValue(n?.name===`All`?void 0:n?.name)},InputDropdownProps:{width:`100%`}})},minSize:100},{accessorKey:`salary`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:`$${e().toLocaleString()}`,tabularNums:!0,horizontalAlign:`right`,...t}),filterFn:`inNumberRange`,header:`Salary`,meta:{filterComponent:w,headerCellProps:{horizontalAlign:`right`}},minSize:180},{accessorKey:`projects`,cell:({getValue:e,...t})=>(0,T.jsx)(h,{primaryText:e(),tabularNums:!0,horizontalAlign:`right`,...t}),filterFn:`inNumberRange`,header:`Projects`,meta:{filterComponent:w,headerCellProps:{horizontalAlign:`right`}},minSize:180}],A=[e=>{console.log(e)},void 0],j=[`data`,`border`,`tableWidth`,`tableRowProps`,`columns`,`tableOptions`,`onRowSelect`,`paginationConfig`,`shouldPinSelectRowToLeft`,`sdsStyle`,`enableColumnFiltering`,`enableGlobalFiltering`,`enablePagination`,`enableRowSelection`,`enableSorting`,`enableRowPinning`,`tableMaxHeight`,`enableStickyHeader`]})),N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J;t((()=>{N=e(n()),S(),M(),o(),P=r(),F={argTypes:{border:{control:`boolean`,description:`Show border`},columns:{control:!1,description:`Table column definitions with React components - not editable in controls`},enableColumnFiltering:{control:`boolean`,description:`Enable column filtering`},enableGlobalFiltering:{control:`boolean`,description:`Enable global search`},enablePagination:{control:`boolean`,description:`Enable pagination`},enableRowSelection:{control:`boolean`,description:`Enable row selection with checkboxes`},enableSorting:{control:`boolean`,description:`Enable column sorting`},onRowSelect:{control:{labels:[`log selected rows`,`none`],type:`select`},description:`Callback function when rows are selected`,mapping:A,options:Object.keys(A)},paginationConfig:{control:`object`,description:`Pagination configuration`},shouldPinSelectRowToLeft:{control:`boolean`,description:`Pin the select row to the left`},sdsStyle:{control:`inline-radio`,description:`Style of the table`,options:[`lined`,`striped`]},tableOptions:{control:`object`,description:`Pass-through TanStack Table options. Any option from useReactTable can be provided here (e.g. autoResetPageIndex, globalFilterFn, meta, etc.).`},tableRowProps:{control:`object`,description:`Props to pass to the table row`}},component:C,tags:[`beta`],title:`Components/Table/PreComposedTable`,parameters:{axe:{disabledRules:[`empty-table-header`]}}},I={args:{columns:D,data:E,enableGlobalFiltering:!1,enablePagination:!0,enableRowSelection:!0,enableSorting:!0,onRowSelect:void 0,paginationConfig:{pageSize:10},shouldPinSelectRowToLeft:!0,tableWidth:`100%`,border:!0,sdsStyle:`lined`},render:({data:e,columns:t,...n})=>(0,P.jsx)(C,{data:e,columns:t,...n})},L={args:{columns:D,data:E,enableGlobalFiltering:!0,enablePagination:!1,enableRowSelection:!0,enableSorting:!0,tableWidth:`100%`},parameters:{controls:{exclude:j}},render:({data:e,columns:t,...n})=>(0,P.jsx)(C,{data:e,columns:t,...n})},R={args:{columns:D,data:E,enableGlobalFiltering:!1,enablePagination:!0,enableRowSelection:!0,enableSorting:!0,paginationConfig:{pageSize:3},tableWidth:`100%`},parameters:{controls:{exclude:j}},render:({data:e,columns:t,...n})=>(0,P.jsx)(C,{data:e,columns:t,...n})},z={args:{columns:D,data:E,enableGlobalFiltering:!1,enablePagination:!0,enableRowSelection:!0,enableSorting:!0,paginationConfig:{pageSize:10},tableWidth:`600px`},parameters:{controls:{exclude:j}},render:({data:e,columns:t,...n})=>(0,P.jsx)(C,{data:e,columns:t,...n})},B=e=>{let[t,n]=(0,N.useState)([]);return(0,P.jsx)(C,{...e,data:E,columns:D,enableColumnFiltering:!0,enableSorting:!0,tableWidth:`100%`,tableOptions:{onColumnFiltersChange:e=>{let r=typeof e==`function`?e(t):e;n(r),console.log(`Column filters changed:`,r)},state:{columnFilters:t}}})},V={parameters:{controls:{exclude:j}},render:e=>(0,P.jsx)(B,{...e})},H={args:{columns:O,data:E,enableColumnFiltering:!0,enablePagination:!1,enableRowSelection:!0,enableSorting:!0,tableWidth:`100%`},parameters:{controls:{exclude:j}},render:({data:e,columns:t,...n})=>(0,P.jsx)(C,{data:e,columns:t,...n})},U=e=>{let t=(0,N.useRef)(null);return(0,P.jsxs)(`div`,{children:[(0,P.jsxs)(`div`,{style:{marginBottom:16},children:[(0,P.jsxs)(`p`,{style:{margin:`0 0 8px`},children:[`Use the `,(0,P.jsx)(`code`,{children:`ref`}),` prop to access the underlying TanStack Table instance. This gives you full control over sorting, filtering, pagination, row selection, and more.`]}),(0,P.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,P.jsx)(s,{sdsStyle:`outline`,sdsType:`primary`,size:`small`,onClick:()=>t.current?.table.resetColumnFilters(),children:`Clear All Filters`}),(0,P.jsx)(s,{sdsStyle:`outline`,sdsType:`primary`,size:`small`,onClick:()=>t.current?.table.resetSorting(),children:`Reset Sorting`}),(0,P.jsx)(s,{sdsStyle:`outline`,sdsType:`primary`,size:`small`,onClick:()=>t.current?.table.toggleAllRowsSelected(!0),children:`Select All Rows`}),(0,P.jsx)(s,{sdsStyle:`outline`,sdsType:`primary`,size:`small`,onClick:()=>t.current?.table.toggleAllRowsSelected(!1),children:`Deselect All Rows`}),(0,P.jsx)(s,{sdsStyle:`outline`,sdsType:`secondary`,size:`small`,onClick:()=>{t.current?.table.resetColumnFilters(),t.current?.table.resetSorting(),t.current?.table.toggleAllRowsSelected(!1)},children:`Reset Everything`})]})]}),(0,P.jsx)(C,{ref:t,data:E,columns:D,enableColumnFiltering:!0,enableSorting:!0,enableRowSelection:!0,enablePagination:!0,paginationConfig:{pageSize:5},tableWidth:`100%`,...e})]})},W={parameters:{controls:{exclude:j}},render:e=>(0,P.jsx)(U,{...e})},G=e=>{let t=(0,N.useRef)(null);return(0,P.jsxs)(`div`,{children:[(0,P.jsxs)(`div`,{style:{marginBottom:16},children:[(0,P.jsxs)(`p`,{style:{margin:`0 0 8px`},children:[`Use the `,(0,P.jsx)(`code`,{children:`tableOptions`}),` prop to pass any TanStack Table option directly to the underlying table instance. This example uses`,` `,(0,P.jsx)(`code`,{children:`autoResetPageIndex: false`}),` so filtering does not jump back to page 1, and `,(0,P.jsx)(`code`,{children:`debugTable: true`}),` to show console output.`]}),(0,P.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,P.jsx)(s,{sdsStyle:`outline`,sdsType:`primary`,size:`small`,onClick:()=>t.current?.table.resetColumnFilters(),children:`Clear All Filters`}),(0,P.jsx)(s,{sdsStyle:`outline`,sdsType:`primary`,size:`small`,onClick:()=>t.current?.table.resetSorting(),children:`Reset Sorting`})]})]}),(0,P.jsx)(C,{ref:t,data:E,columns:D,enableColumnFiltering:!0,enableSorting:!0,enableRowSelection:!0,enablePagination:!0,paginationConfig:{pageSize:3},tableWidth:`100%`,tableOptions:{autoResetPageIndex:!1,debugTable:!0},...e})]})},K={parameters:{controls:{exclude:j}},render:e=>(0,P.jsx)(G,{...e})},q={args:{columns:k,data:E,enableColumnFiltering:!0,enableSorting:!0,enableRowSelection:!0,tableWidth:`100%`},parameters:{controls:{exclude:j}},render:({data:e,columns:t,...n})=>(0,P.jsx)(C,{data:e,columns:t,...n})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
    enableGlobalFiltering: false,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    onRowSelect: undefined,
    paginationConfig: {
      pageSize: 10
    },
    shouldPinSelectRowToLeft: true,
    tableWidth: "100%",
    border: true,
    sdsStyle: "lined"
  },
  render: ({
    data: _data,
    columns: _columns,
    ...args
  }: Args) => <PreComposedTable data={_data} columns={_columns} {...args} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
    enableGlobalFiltering: true,
    enablePagination: false,
    enableRowSelection: true,
    enableSorting: true,
    tableWidth: "100%"
  },
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: ({
    data: _data,
    columns: _columns,
    ...args
  }: Args) => <PreComposedTable data={_data} columns={_columns} {...args} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
    enableGlobalFiltering: false,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    paginationConfig: {
      pageSize: 3
    },
    tableWidth: "100%"
  },
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: ({
    data: _data,
    columns: _columns,
    ...args
  }: Args) => <PreComposedTable data={_data} columns={_columns} {...args} />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
    enableGlobalFiltering: false,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    paginationConfig: {
      pageSize: 10
    },
    tableWidth: "600px"
  },
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: ({
    data: _data,
    columns: _columns,
    ...args
  }: Args) => <PreComposedTable data={_data} columns={_columns} {...args} />
}`,...z.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: (props: Args) => <ColumnFilteringDemo {...props} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    columns: COLUMNS_WITH_SELECTIVE_FILTERS,
    data: SAMPLE_DATA,
    enableColumnFiltering: true,
    enablePagination: false,
    enableRowSelection: true,
    enableSorting: true,
    tableWidth: "100%"
  },
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: ({
    data: _data,
    columns: _columns,
    ...args
  }: Args) => <PreComposedTable data={_data} columns={_columns} {...args} />
}`,...H.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: (props: Args) => <TableActionsDemo {...props} />
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: (props: Args) => <TableOptionsDemo {...props} />
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    columns: COLUMNS_WITH_CUSTOM_FILTERS,
    data: SAMPLE_DATA,
    enableColumnFiltering: true,
    enableSorting: true,
    enableRowSelection: true,
    tableWidth: "100%"
  },
  parameters: {
    controls: {
      exclude: PRE_COMPOSED_TABLE_EXCLUDED_CONTROLS
    }
  },
  render: ({
    data: _data,
    columns: _columns,
    ...args
  }: Args) => <PreComposedTable data={_data} columns={_columns} {...args} />
}`,...q.parameters?.docs?.source}}},J=[`Default`,`WithGlobalFiltering`,`WithPagination`,`FixedWidth`,`WithColumnFiltering`,`WithSelectiveColumnFiltering`,`WithTableActions`,`WithTableOptions`,`WithCustomColumnFilters`]}))();export{I as Default,z as FixedWidth,V as WithColumnFiltering,q as WithCustomColumnFilters,L as WithGlobalFiltering,R as WithPagination,H as WithSelectiveColumnFiltering,W as WithTableActions,K as WithTableOptions,J as __namedExportsOrder,F as default};