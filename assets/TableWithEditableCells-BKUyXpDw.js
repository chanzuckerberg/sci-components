import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{t as n}from"./react-CK_LJ1AD.js";import{Ao as r,Eo as i,G as a,L as o,gn as s,ko as c,ln as l,lt as u,mn as d}from"./iframe-CLRePdsX.js";import{t as f}from"./Icon-Dm0VxswF.js";import{t as p}from"./Button-DCR2_tBD.js";import{t as m}from"./src-LTclIrci.js";import{t as h}from"./CellComponent-D_9M6nUN.js";import{t as g}from"./CellHeader-C5vc_2G6.js";import{c as _,i as v,o as y,r as b}from"./PreComposedTable-DMHXTxOO.js";import{t as x}from"./Table-BPm7QJ4h.js";import{t as S}from"./TableRow-1wiw8yrm.js";import{t as C}from"./TableHeader-PgmsYaib.js";import{i as w,n as T}from"./dist-DOKOnWAK.js";function E(e){return Array.from({length:e},()=>({age:w.number.int({max:80,min:18}),firstName:w.person.firstName(),lastName:w.person.lastName(),status:w.helpers.shuffle([`relationship`,`complicated`,`single`])[0],visits:w.number.int(1e3)}))}function D(e){let t=String(e.getValue()),[n,r]=k.useState(t);return k.useEffect(()=>r(t),[t]),(0,A.jsx)(h,{verticalAlign:`center`,children:(0,A.jsx)(j,{"aria-label":`${e.column.id}, row ${e.row.index+1}`,onBlur:()=>e.table.options.meta?.updateData(e.row.index,e.column.id,n),onChange:e=>r(e.target.value),value:n})})}function O(){let[e,t]=k.useState(()=>E(3)),[n,r]=k.useState([]),i=y({columns:I,data:e,defaultColumn:{cell:D},getCoreRowModel:_(),meta:{updateData:(e,n,i)=>{t(t=>t.map((t,a)=>{if(a!==e)return t;let o=String(t[n]);return o===i?t:(r(t=>[`row ${e+1}, ${n}: "${o}" → "${i}"`,...t]),{...t,[n]:i})}))}}});return(0,A.jsxs)(`div`,{className:`app`,children:[(0,A.jsxs)(x,{children:[(0,A.jsx)(C,{children:i.getFlatHeaders().map(e=>(0,A.jsx)(g,{hideSortIcon:!0,children:b(e.column.columnDef.header,e.getContext())},e.id))}),(0,A.jsx)(`tbody`,{children:i.getRowModel().rows.map(e=>(0,A.jsx)(S,{shouldShowTooltipOnHover:!1,children:e.getVisibleCells().map(e=>(0,A.jsx)(k.Fragment,{children:b(e.column.columnDef.cell,e.getContext())},e.id))},e.id))})]}),(0,A.jsx)(M,{children:(0,A.jsx)(p,{onClick:()=>{t(E(3)),r([])},sdsStyle:`solid`,sdsType:`primary`,startIcon:(0,A.jsx)(f,{sdsIcon:`Refresh`,sdsSize:`s`}),children:`Replace the data`})}),(0,A.jsxs)(N,{children:[(0,A.jsx)(P,{children:`Changes written back to the data`}),(0,A.jsx)(F,{children:n.length?n.join(`
`):`Edit a cell, then click outside it.`})]})]})}var k,A,j,M,N,P,F,I;e((()=>{r(),m(),T(),v(),k=t(n()),A=t(i()),j=c(`input`,{target:`e19gnnek4`})(o,` `,e=>{let t=l(e),n=d(e),r=s(e);return`
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
    `},`;`),M=c(`div`,{target:`e19gnnek3`})(e=>`
      display: flex;
      margin-top: ${s(e)?.l}px;
    `,`;`),N=c(`div`,{target:`e19gnnek2`})(e=>`
      margin-top: ${s(e)?.l}px;
    `,`;`),P=c(`h4`,{target:`e19gnnek1`})(u,` margin:0;`),F=c(`pre`,{target:`e19gnnek0`})(a,` `,e=>{let t=l(e),n=d(e),r=s(e);return`
      background: ${n?.base?.backgroundSecondary};
      border-radius: ${t?.m}px;
      color: ${n?.base?.textSecondary};
      margin: ${r?.xs}px 0 0;
      max-height: 160px;
      overflow: auto;
      padding: ${r?.s}px;
    `},`;`),I=[{accessorKey:`firstName`,header:`First Name`},{accessorKey:`lastName`,header:`Last Name`},{accessorKey:`age`,header:`Age`},{accessorKey:`visits`,header:`Visits`},{accessorKey:`status`,header:`Status`}]}))();export{O as default};