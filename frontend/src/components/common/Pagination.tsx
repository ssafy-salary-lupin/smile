import Pagination from "react-js-pagination";
import { useState } from "react";

interface PropsType {
  page: number;
  size: number;
  totalElements: number;
}

function PagiNation(props: PropsType) {
  // const [page, setPage] = useState(1);

  // const handlePageChange = (page: any) => {
  //   setPage(page);
  // };

  return null;
  // return (
  //   <Pagination
  //     activePage={props.page} // 현재 페이지 result.page
  //     itemsCountPerPage={props.size} // 한 페이지당 보여줄 리스트 개수 result.size
  //     totalItemsCount={props.totalElements} //  총 아이템 개수 result.totalElements
  //     pageRangeDisplayed={5} // paginator내에 보여줄 페이지 범위
  //     prevPageText={"‹"} // 이전 텍스트
  //     nextPageText={"›"} // 이후 텍스트
  //     onChange={handlePageChange} // 페이지가 바뀔 떄 헨들링 해 줄 함수 => api 요청시 page 요청
  //   />
  // );

  //   https://cotak.tistory.com/112
}

export default PagiNation;
