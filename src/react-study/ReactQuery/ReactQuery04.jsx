import React from 'react'
import { useState } from 'react';
import { useToastStore } from '../Zustand/store/toastStore';
import { useAddBulkProducts } from './useProducts';

export default function ReactQuery04() {
    // 다건추가 -> dto의 모습 [{}, {}... , {}]
    const [productList, setProductList] = useState([
        {name: "", price: ""}, // 초기값 1개의 객체만
    ]) 

   const { showToast } = useToastStore();
   const addBulkMutation = useAddBulkProducts();

    // 한줄추가 핸들러
    const handleAddRow = () => {
        setProductList((prev) => {
            return [...prev, {name:"", price: ""}]
        })
    }


    // 1. e객체는 몇번째 input에 내가 입력하는지 모름
    // 2. 어떻게 정확하게 index를 특정할 수 있을까?
    const handleInputVal = (e, idx) => {
        // e객체로는 필드명과 값만 특정할 수 있음
        const {name, value} = e.target;

        // 새로운 객체로 set해줘야 setter 호출됨
        const newProductList = [...productList];

        // idx로 js객체를 불러와서 name에 해당하는 필드만 수정
        newProductList[idx] = {
            ...newProductList[idx],
            [name] : value
        };

        setProductList(newProductList);
    }

    const handleAddBulk = async () => {
        // mutate(정의한fn넘겨줄 매개변수, {옵션})
        addBulkMutation.mutate(productList, {
            onSuccess: () => {
                showToast("상품등록 완료!")
            },
            onError: (error) => {
                showToast(error.message);
            }
        })
    }

    const handleRowRemove = (idx) => {
        // ProductList에서 해당 idx만 제거
        // 이것만 빼고 다 ok
        // -> 매개변수로 들어온 idx빼고 다 ok
        const newProductList 
        = productList.filter((_,i) => idx !== i);
        setProductList(newProductList);
    }

  return (
    <div>
        <h1>상품 다건 추가</h1>
        <div>
            {productList.map((product, idx) => {
                return (
                    // key로 idx말고, product.id필요
                    <div key={idx}>
                        <input 
                        type="text" 
                        placeholder='상품명'
                        name='name'
                        value={product.name}
                        onChange={(e) => handleInputVal(e,idx)}
                        />
                        <input 
                        type="number" 
                        placeholder='가격'
                        name='price'
                        value={product.price}
                        onChange={(e) => handleInputVal(e,idx)}
                        />
                        <button 
                        onClick={() => handleRowRemove(idx)}
                        >
                            삭제
                        </button>
                    </div>
                )
            })}
        </div>

        <button onClick={handleAddRow}>한 줄 추가</button>
        <button onClick={handleAddBulk}>전체 등록</button>
    </div>
  )
}