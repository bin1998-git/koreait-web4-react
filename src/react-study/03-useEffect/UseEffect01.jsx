import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

// 렌더링 -> js 객체를 리액트가 해석
// -> 가상동(vdom)을 생성 -> usestate가 보관하는 상태 업데이트완료
// vdom을 브라우저 실제dom에 반영
// 반영되는 시점이 마운트
// 언마운트: 컴포넌트가 화면에서 제거되는 시점
export default function UseEffect01() {
    console.log("함수호출됨! (렌더링시작)")
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");

    const handleClick = () => {
        console.log("클릭 이벤트 발생!")
        setCount((prev) => prev + 1);
        
    }

    // 주의) 사용x
    // 2번이 먼저 실행된다
    // 왜? 렌더가 끝나고 난뒤 useEffect 함수가 호출되기때문
    useEffect(() => {
        console.log("누가 먼저 실행될까?");
        // 렌더이후라서 실제 dom 접근도 가능
        // -> 스크롤바..이벤트관련 조작코드


    }) // 의존성 배열없으면, 렌더 끝날때마다 실행
    console.log("누가먼저 실행 될까? 2번");


    // useEffect 함수는
    // 1. 마운트시점에 실행될 함수를 매개변수로 받는다
    useEffect(() => {
        // "마운트" 시점: 처음으로 컴포넌트가 실제 dom에 장착되는 순간
        console.log("처음으로 컴포넌트가 실제 dom에 장착되었습니다.")

        // fetch()를 useEffect에서 실행함
    }, [])

    // 2. 의존성배열에 담긴 값이 변경되면 함수가 실행됨
    // -> 이때도 최초마운트시에는 실행됨
    // 상태가 모두 업데이트 되고 실행될 함수
    useEffect(() => {
        console.log("count 변경감지")
        console.log(`실제 dom에 반영된 count=${count}`)

        if (count % 2 == 0) {
            setMessage("짝수!")
        } else {
            setMessage("홀수!")
        }
    }, [count]);

    console.log("이제 곧 jsx리턴됩니다! (렌더종료직전)")
  return (
    <div>
        <button onClick={handleClick}>클릭</button>
        <h2>count: {count}</h2>
        <h3>{message}</h3>
    </div>
  )
}
