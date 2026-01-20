// useParam
// url 경로에서 값을 추출하는 hook

import { BrowserRouter, Link, Route, Routes, useParams } from "react-router-dom";

export default function Router02() {

  return (
    <BrowserRouter>
    <Routes>
        {/* :id -> 나중에 useParams의 key값이 id가 됨 */}
        <Route path="/user/:id" element={<UserDetail />}/>
        <Route />
    </Routes>
    </BrowserRouter>
  )
}

// url에 정보를 담는경우
// localhost:5173/user/3
// -> id가 3번인 사용자 조회
function UserDetail() {
    const { id }= useParams(); // url에서 id 추출

    return (
        <div>
            <h1>사용자 정보</h1>
            <p>사용자 ID: {id}</p>
            <Link to="/">목록으로</Link>
        </div>
    )
}
