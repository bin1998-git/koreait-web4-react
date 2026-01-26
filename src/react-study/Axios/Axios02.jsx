import React from 'react'
import { useState } from 'react'
import { getSearchProductApi } from './apis/productApi';


// api 요청할 때 쿼리스트링 조립
export default function Axios02() {
  const [inputVal, setInputVal] = useState("");
  const [products, setProducts] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const handelSearchClick = async() => {
      // 상품검색 api 호출함수 import 
    try {
        const response = await getSearchProductApi(inputVal);
        console.log(response.data);
        /*
            데이터의 생명주기가 같다?
            -> 상태를 합치는게 맞다.

        */
        setProducts(response.data);
        setErrMsg("");
    } catch (error) {
        // 우리가 백엔드에서 만든 커스텀에러들이 모이는 곳
        console.log(error);
        if (error.response) {
            // 에러메세지
            // error.response.data -> 에러 응답 바디
            const resErrMsg = error.response.data;
            setErrMsg(resErrMsg);
            setErrMsg([]);
        }
    }

    }

  return (
    <div>
        <input 
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)} 
        />
        <button onClick={handelSearchClick}>검색</button>
        {
            errMsg && (
                <div>
                    {errMsg}
                </div>
            )
        }
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>상품명</th>
                    <th>가격</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((p) => {
                     return (
                        <tr id={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
