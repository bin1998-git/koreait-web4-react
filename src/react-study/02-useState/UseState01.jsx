import React from 'react'
import { useState } from 'react';

// js에서는 이벤트리스너를 사용해서 클릭을 감지했었음
export default function UseState01() {

  let myName = "홍길동";
  // 리액트는 컴포넌트마다 따로 데이터를 저장하는 곳이 있음
  // 그곳에 접근하게 만들어주는 함수가 UseState

  // 배열을 리턴해준다 [현재리액트가 저장하고있는값, setter]
  // 생성자처럼 초기데이터를 넣어줄 수 있음
  const [name, setName] = useState(myName);
  
  

  // 리액트는 가상 dom을 가지고 있음
  // 데이터변경이 되었을때, 컴포넌트를 재호출하는 식으로
  // 업데이트 한다.
   
  const handleChangeNameClick = () => {
      console.log("이름변경 버튼 클릭됨!");
      myName = "김길동";
      // 일반변수에 값은 변경되었으나 리액트가 감지x
      // setter를 호출하면 변경을 감지
      setName(myName);
      // 변경을 감지하면 값을 업데이트해서
      // 화면을 다시 그린다
      
      console.log(myName);
  };

  return (
    <div>
        <div>{name}</div>
        {/* onCilck or onChange.. */}
        {/* 이벤트 발생시 호출할 함수를 전달한다 */}
        <button onClick={handleChangeNameClick}>이름변경</button>
    </div>
  );
}
