import { useState } from 'react'

export default function UseState08() {
    const [todos, setTodos] = useState([]);
    const [inputval, setInputVal] = useState("");

    const addTodoClick = () => {
        setTodos((prev) => [...prev, inputval]);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputVal(value);
    }   

  return (
    <div>

        <input 
        type="text" 
        value={inputval}
        onChange={handleInputChange}
        placeholder="할 일 입력"
        />
        <button onClick={addTodoClick}>할 일 추가</button>
        {/* 추가된게 없다면 p태그로 할일이 없습니다 */}
        {/* 간접적인 상태 -> useState로 보관하지x */}
        {/* {todos.length === 0 && <p>할일이 없습니다</p>} */}
        {
            todos.length > 0
            ?
            <ul>
                {todos.map((todo, i) => {
                    return <li key={i}>{todo}</li>
                })}
            </ul>
            : <p>할일이 없습니다!</p>
        }
        {/* 요소가 하나이상 이라면 ul에 li들이 나오게 */}
    </div>
  )
}
