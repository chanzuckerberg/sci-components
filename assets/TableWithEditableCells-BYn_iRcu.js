import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{t as n}from"./react-9SMi-QmY.js";import{t as r}from"./jsx-runtime-f3rHp9ZU.js";import{Gt as i,R as a,Rt as o,Ut as s,b as c,f as l,io as u,ro as d}from"./iframe-BPFLG940.js";import{t as f}from"./Icon-DpYImm5o.js";import{t as p}from"./Button-CvZmp_f8.js";import{t as m}from"./src-DGdb4UFx.js";import{t as h}from"./CellComponent-CufHvhl3.js";import{t as g}from"./CellHeader-CEH0kCMc.js";import{c as _,i as v,o as y,r as b}from"./PreComposedTable-BQgDAE46.js";import{t as x}from"./Table-CnhkKR7p.js";import{t as S}from"./TableRow-E7cF2_1X.js";import{t as C}from"./TableHeader-lAuJdEGL.js";import{i as w,n as T}from"./dist-C7s2x5rv.js";function E(e){return Array.from({length:e},()=>({age:w.number.int({max:80,min:18}),firstName:w.person.firstName(),lastName:w.person.lastName(),status:w.helpers.shuffle([`relationship`,`complicated`,`single`])[0],visits:w.number.int(1e3)}))}function D(e){let t=String(e.getValue()),[n,r]=k.useState(t);return k.useEffect(()=>r(t),[t]),(0,A.jsx)(h,{verticalAlign:`center`,children:(0,A.jsx)(j,{"aria-label":`${e.column.id}, row ${e.row.index+1}`,onBlur:()=>e.table.options.meta?.updateData(e.row.index,e.column.id,n),onChange:e=>r(e.target.value),value:n})})}function O(){let[e,t]=k.useState(()=>E(3)),[n,r]=k.useState([]),i=y({columns:I,data:e,defaultColumn:{cell:D},getCoreRowModel:_(),meta:{updateData:(e,n,i)=>{t(t=>t.map((t,a)=>{if(a!==e)return t;let o=String(t[n]);return o===i?t:(r(t=>[`row ${e+1}, ${n}: "${o}" → "${i}"`,...t]),{...t,[n]:i})}))}}});return(0,A.jsxs)(`div`,{className:`app`,children:[(0,A.jsxs)(x,{children:[(0,A.jsx)(C,{children:i.getFlatHeaders().map(e=>(0,A.jsx)(g,{hideSortIcon:!0,children:b(e.column.columnDef.header,e.getContext())},e.id))}),(0,A.jsx)(`tbody`,{children:i.getRowModel().rows.map(e=>(0,A.jsx)(S,{shouldShowTooltipOnHover:!1,children:e.getVisibleCells().map(e=>(0,A.jsx)(k.Fragment,{children:b(e.column.columnDef.cell,e.getContext())},e.id))},e.id))})]}),(0,A.jsx)(M,{children:(0,A.jsx)(p,{onClick:()=>{t(E(3)),r([])},sdsStyle:`solid`,sdsType:`primary`,startIcon:(0,A.jsx)(f,{sdsIcon:`Refresh`,sdsSize:`s`}),children:`Replace the data`})}),(0,A.jsxs)(N,{children:[(0,A.jsx)(P,{children:`Changes written back to the data`}),(0,A.jsx)(F,{children:n.length?n.join(`
`):`Edit a cell, then click outside it.`})]})]})}var k,A,j,M,N,P,F,I;e((()=>{u(),m(),T(),v(),k=t(n()),A=t(r()),j=d(`input`,{target:`e19gnnek4`})(l,` `,e=>{let t=o(e),n=s(e),r=i(e);return`
      background: transparent;
      border: 1px solid transparent;
      border-radius: ${t?.m}px;
      color: ${n?.base?.textPrimary};
      padding: ${r?.xxs}px ${r?.xs}px;
      width: 100%;

      &:hover {
        border-color: ${n?.base?.borderPrimary};
      }

      &:focus {
        border-color: ${n?.accent?.borderSelected};
        outline: none;
      }
    `},`;`),M=d(`div`,{target:`e19gnnek3`})(e=>`
      display: flex;
      margin-top: ${i(e)?.l}px;
    `,`;`),N=d(`div`,{target:`e19gnnek2`})(e=>`
      margin-top: ${i(e)?.l}px;
    `,`;`),P=d(`h4`,{target:`e19gnnek1`})(a,` margin:0;`),F=d(`pre`,{target:`e19gnnek0`})(c,` `,e=>{let t=o(e),n=s(e),r=i(e);return`
      background: ${n?.base?.backgroundSecondary};
      border-radius: ${t?.m}px;
      color: ${n?.base?.textSecondary};
      margin: ${r?.xs}px 0 0;
      max-height: 160px;
      overflow: auto;
      padding: ${r?.s}px;
    `},`;`),I=[{accessorKey:`firstName`,header:`First Name`},{accessorKey:`lastName`,header:`Last Name`},{accessorKey:`age`,header:`Age`},{accessorKey:`visits`,header:`Visits`},{accessorKey:`status`,header:`Status`}]}))();export{O as default};