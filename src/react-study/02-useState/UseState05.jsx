import React from 'react'
import { useState } from 'react'

export default function UseState05() {
    const [todos, setTodos] = useState([]);
    const [inputVal, setInputVal] = useState("");

    // 정의해놓은 상태들로
    // input에 to-do를 입력하면
    // ul안에 li들로 todo들이 보이게 만들어주세요.

    const handleChageInput = (e) => {
        const value = e.target.value;
        setInputVal(value);
    }

    const addTodoClick = () => {
        // [] -> ["빨래하기"]
        // push 원본이 수정되는 메서드
        // 1. setter에는 언제나 새객체를 넣어줘야함
        // 2. prev는 배열, 객체도 기억하고있으니 spread 권장
        setTodos((prev) => [...prev, inputVal]);
    };
    

  return (
    <div>
        <input 
        type="text" 
        // value가 inputval
        // 변경되면 inputval가 바뀌어야함
        value={inputVal}
        onChange={handleChageInput}
        placeholder="TO-DO 입력!"
        />
        <button onClick={addTodoClick}>TO-DO 추가</button>
        <ul>
            {
                todos.map((todo, i) => {
                    // index를 넣으면 안됨
                    // 리액트가 리스트로 렌더링할때
                    // 실제 데이터 기준으로 변경을 감지하는게 아니라
                    // key를 기준으로 변경을 감지함
                    return <li key={i}>{todo}</li>
                })
            }
        </ul>
    </div>
  )
}
