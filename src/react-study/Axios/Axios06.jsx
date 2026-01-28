
import { useState } from 'react'
import ProductItem from './ProductItem';
import { getAllProductApi } from './apis/productApi';
import { useEffect } from 'react';

export default function Axios06() {
    const [products, setProducts] = useState([]);
    const [refetch, setRefetch] = useState(true);

    // ui 테스트 가짜데이터
    const mockProducts = [
        {id:1, name:"가짜키보드", price: 10000},
        {id:2, name:"가짜마우스", price: 20000},
    ];

        const getProducts = async() => {
            try {

                const res = await getAllProductApi();
                const productData = res.data;
                setProducts(productData);
                // get요청이 끝나면 false로 바꿔줘야함
                setRefetch(false);
            } catch (error) {
                // 비워둘게요
            }
        }

        useEffect(() => {
            if (refetch) {
                getProducts();
            }
        },[refetch])

    return (
        <div>
            <h1>상품목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수정/삭제</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((p) => {
                  return <ProductItem 
                    key={p.id} 
                    product={p}
                    doRefetch={() => setRefetch(true)}
                    />
                })}
                </tbody>
            </table>
        </div>
    )
    }
    
    // 자식컴포넌트들이 get요청할 권한
    // -> refetch 상태생성
    // -> true일떄만 get요청을 하도록
    // useEffect는 refetch상태변경이 되면 실행
    // -> false가 되는 시점이 필요
    // -> get요청 이후에 false가 되게 만들었음
    // -> false가 되어서 useEffect가 실행이됨

