import { keyframes } from '@emotion/react';
import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import { useToastStore } from '../../Zustand/store/toastStore';


export default function Router05() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<OrderList />}/>
            <Route path='/order' element={<OrderDetail />}/>
        </Routes>
    </BrowserRouter>
  )
}

// url: "/"
function OrderList () {
    const {showToast} = useToastStore();
    const navigate = useNavigate();

    const orders = [
        {product: "노트북", quantity: 1, status:"배송중"},
        {product: "키보드", quantity: 2, status:"배송완료"},
        {product: "마우스", quantity: 3, status:"주문접수"},
    ]
    const detail = (order) => {
        navigate(`/order?product=${order.product}&quantity=${order.quantity}&status=${order.status}`)
    }

    return(
        <div>
            <h1>주문목록</h1>
            <button onClick={() => showToast("라우터공부중")}>토스트테스트</button>
            <div>
                {/* orders를 map을 사용하여 카드형식으로 뿌려주세요
                    상품이름만 보이면 됩니다
                    해당 이름 클릭시 orderdetail 컴포넌트 렌더링
                    이때 props로 데이터전달x -> url로 데이터 전달
                */}
                {orders.map((order, idx) => {
                    return (
                        <div
                            key={idx}
                            onClick={() => detail(order)}
                            >
                            {order.product}
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

// Url: /order
function OrderDetail() {
    // props가 아니라 url로 데이터를 전달받아
    // 각 정보를 렌더링해주세요
    const [SearchParams] = useSearchParams();
    const navigate = useNavigate();

    // 쿼리스트링에서 뽑아온 데이터 -> string
    const product = SearchParams.get("product");
    const quantity= SearchParams.get("quantity");
    const status = SearchParams.get("status");

    return (
        <div>
            <h1>주문 상세 페이지</h1>
            <div>
                <p>상품명: {product}</p>
                <p>주문 수량: {quantity}</p>
                <p>배송 상태: {status}</p>
            </div>
            <button onClick={() => navigate("/")}>목록으로</button>
        </div>
    )
}
