import Pagination from "react-js-pagination";
import { useState } from "react";

function PagiNation() {
  const [page, setPage] = useState(1);

  const handlePageChange = (page: any) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );

  //   https://cotak.tistory.com/112
}

export default PagiNation;
