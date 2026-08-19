import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Eo as r}from"./iframe-s0DqqZ6S.js";import{n as i,t as a}from"./Pagination-CMS5Gjww.js";var o,s=e((()=>{o=[`pageSize`,`sdsStyle`,`siblingCount`,`totalCount`,`truncateDropdown`]})),c,l,u,d=e((()=>{c=t(n()),i(),l=t(r()),u=e=>{let{pageSize:t,totalCount:n,siblingCount:r,truncateDropdown:i,sdsStyle:o}=e,[s,u]=(0,c.useState)(1);return(0,l.jsx)(a,{sdsStyle:o,pageSize:t,onPageChange:e=>{u(e)},onNextPage:()=>u(s+1),onPreviousPage:()=>u(s-1),totalCount:n,siblingCount:r,currentPage:s,truncateDropdown:i})}})),f,p,m=e((()=>{i(),f=t(r()),p=e=>(0,f.jsxs)(`div`,{children:[(0,f.jsx)(a,{"data-testid":`Pagination`,pageSize:4,onPageChange:()=>{},onNextPage:()=>{},onPreviousPage:()=>{},totalCount:20,siblingCount:1,currentPage:2,truncateDropdown:!0,...e}),(0,f.jsx)(a,{"data-testid":`Pagination-disabled-left-arrow`,pageSize:4,onPageChange:()=>{},onNextPage:()=>{},onPreviousPage:()=>{},totalCount:20,siblingCount:1,currentPage:1,truncateDropdown:!0}),(0,f.jsx)(a,{"data-testid":`Pagination-with-left-dropdown`,pageSize:4,onPageChange:()=>{},onNextPage:()=>{},onPreviousPage:()=>{},totalCount:30,siblingCount:1,currentPage:5,truncateDropdown:!0}),(0,f.jsx)(a,{"data-testid":`Pagination-with-right-dropdown`,pageSize:4,onPageChange:()=>{},onNextPage:()=>{},onPreviousPage:()=>{},totalCount:60,siblingCount:1,currentPage:3,truncateDropdown:!0}),(0,f.jsx)(a,{"data-testid":`Pagination-with-both-dropdowns`,pageSize:4,onPageChange:()=>{},onNextPage:()=>{},onPreviousPage:()=>{},totalCount:30,siblingCount:1,currentPage:4,truncateDropdown:!0}),(0,f.jsx)(a,{"data-testid":`Pagination-disabled-dropdown`,pageSize:4,onPageChange:()=>{},onNextPage:()=>{},onPreviousPage:()=>{},totalCount:30,siblingCount:1,currentPage:7,truncateDropdown:!1})]})})),h,g,_,v,y;e((()=>{s(),d(),m(),h=t(r()),g={argTypes:{pageSize:{control:{type:`number`}},sdsStyle:{control:{type:`select`},options:[`round`,`square`]},siblingCount:{control:{type:`number`}},totalCount:{control:{type:`number`}},truncateDropdown:{control:{type:`boolean`}}},component:u,title:`Components/Table/Pagination`},_={args:{pageSize:5,siblingCount:1,totalCount:100}},v={parameters:{controls:{exclude:o},snapshot:{skip:!0}},render:e=>(0,h.jsx)(p,{...e})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    pageSize: 5,
    siblingCount: 1,
    totalCount: 100
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: PAGINATION_EXCLUDED_CONTROLS
    },
    snapshot: {
      skip: true
    }
  },
  render: (args: Args) => <TestDemo {...args} />
}`,...v.parameters?.docs?.source}}},y=[`Default`,`Test`]}))();export{_ as Default,v as Test,y as __namedExportsOrder,g as default};