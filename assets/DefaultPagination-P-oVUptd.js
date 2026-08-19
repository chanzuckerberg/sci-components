import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import { Pagination } from "@czi-sds/components";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="app">
      <Pagination
        pageSize={5}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        onNextPage={() => setCurrentPage(currentPage + 1)}
        onPreviousPage={() => setCurrentPage(currentPage - 1)}
        totalCount={250}
        siblingCount={2}
        currentPage={currentPage}
        truncateDropdown
      />
    </div>
  );
}

export default App;
`}))();export{t as default};