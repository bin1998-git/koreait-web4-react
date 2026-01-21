
// url에서 정보를 담는방법
// 리소스에 대한 id, 위치..
// reservation/:id -> "id" key로 value를 전달
// 검색어, 설정값..

import { useState } from "react"
import { BrowserRouter, Route, Routes, useSearchParams } from "react-router-dom";

// reservation?keyword=value -> "keyword" key로 value를 전달
export default function Router04() {
  return (
    // BrowserRouter -> url 변경했을때 작동 담당
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SearchPage />} />
        </Routes>
    </BrowserRouter>
  )
}

function SearchPage() {
    const [inputVal, setInputVal] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    // 쿼리스트링을 읽어올 수 있음 -> searchParams에 있음
    const keyword = searchParams.get("keyword");

    // setSearchParams로 쿼리스트링 변경도 가능함
    const handleSearch = () => {
        //쿼리스트링: .com?key1=value2&key2=value2
        // 변경시 js 객체로 제공해야한다.
        setSearchParams({keyword: inputVal}); // 리렌더링 트리거
    }

    const handleClick = () => {
        setSearchParams({
            a: "공부많이 된다",
            b: "스트레스 많을거야"
        });
    }

    return (
        <div>
            <h2>검색</h2>
            <input
             type="text"
             value={inputVal}
             onChange={(e) => setInputVal(e.target.value)}
             placeholder="검색어 입력"
             />
             <button onClick={handleSearch}>검색</button>
             <button onClick={handleClick}>테스트</button>
            
            {
                keyword && (
                    <div>
                        <h3>검색한 값</h3>
                        <p>{keyword}</p>
                    </div>
                )
            }
        
        </div>

    )
}