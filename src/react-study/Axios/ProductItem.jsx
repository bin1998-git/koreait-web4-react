import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { deleteProductApi, updateProductApi } from './apis/productApi';
import { useToastStore } from '../Zustand/store/toastStore';

// 상품하나당 ProductItem 컴포넌트 한개
export default function ProductItem({product, doRefetch}) {
    // 수정상태에 따라 달라지는 조건부 렌더링
    // 수정인지 아닌지 판단하는 상태
    const [isEditing, setIsEditing] = useState(false);
    // 수정시, input들의 값을 저장하는 상태
    const [editVal, setEditVal] = useState({
        name: product.name,
        price: product.price
    }); // get으로 받아온 데이터를 초기값으로 지정

    const {showToast} = useToastStore();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditVal((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }


    // get요청을 제외한 나머지 요청
    // -> db를 수정 -> 서버의 상태가 수정
    // -> 다시 get요청

    // 삭제버튼 핸들러
    const handleDelete = async () => {
        const agree = confirm("삭제 하시겠습니까?")
        if (!agree) return;

        try {
            await deleteProductApi(product.id);
            // 삭제완료 토스트
            showToast(`${product.name} 삭제완료!`)
            // 부모컴포넌트에게 refetch요청
            doRefetch();
            
        } catch (error) {
            if (error.response) {
                const msg = error.response.data;
                // 토스트로 표시
                showToast(msg);
            }
        }
    }
    // 업데이트버튼 핸들러
    const handleUpdate = async () => {
        const agree = confirm("업데이트 하시겠습니까?")
        if (!agree) return;
        try {
            // js객체 -> JSON -> dto객체
            await updateProductApi(product.id, editVal);
            setIsEditing(false); // 조건부렌더링 교체
            showToast("수정 완료!");
            doRefetch();

        } catch (error) {
            // 왜 성공응답 body는 response.data에 있고
            // 실패응답 body는 error.response.data에 있지?
            // js는 서버가 에러응답이건 성공응답이건
            // 성공으로 간주 -> axios가 알아서 에러응답을 예외로 던져줌
            if(error.response) {
              
            } else { // 서버가 아닌 기타 에러
                // 서버와 연결할 수 없음

            }
        }
    }
  

  return (
    <tr>
        <td>{product.id}</td>
        <td>
            {
                isEditing
                ? <input 
                    type='text'
                    name='name'
                    value={editVal.name}
                    onChange={(e) =>handleChange(e)}
                />
                : product.name
            }
        </td>
        <td>
             {
                isEditing
                ? <input 
                    type='number'
                    name='price'
                    value={editVal.price}
                    onChange={(e) =>handleChange(e)}
                />
                : product.price
            }
        </td>
        <td>
            {
                isEditing
                ?  <>
                        <button onClick={handleUpdate}>완료</button>
                        <button 
                        onClick={() => setIsEditing(false)}
                        >취소
                        </button>
                    </>
                :  <>
                        <button 
                        onClick={() => setIsEditing(true)}
                        >수정
                        </button>
                        <button onClick={handleDelete}>삭제</button>
                    </>
            }
        </td>
    </tr>
  )
}
