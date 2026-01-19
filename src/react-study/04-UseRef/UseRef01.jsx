import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';


export default function UseRef01() {
    
    const [value, setValue] = useState("");
    // 만약에 이전값을 기억해야하는 상황이 온다면..?
    // 일반변수 -> 렌더링 될 때 초기화 되버림
    // useState의 상태변수 -> 값이 변하니까 리렌더링 발생
    
    const prevValueRef = useRef("");
    // useRef -> 렌더링과 무관하게 값을 저장하는 변수제공 훅
    // 초기값을 생성자처럼 사용 useRef("") 가능
    
    
    useEffect(() => {
        // 변수에 저장된 값이 업데이트가 되긴되는데,
        // 렌더링과는 무관
        
        // 우리가 넣어준 값은 current에 있음
        console.log(prevValueRef.current);
        prevValueRef.current = value;
        console.log(prevValueRef.current);
    }, [value])
    
  return (
   <div>
      <input 
        type="text"
        onChange={(e) => setValue(e.target.value)} 
      />
      <p>현재: {value}</p>
      <p>이전: {prevValueRef.current}</p>
    </div>
  )
}
