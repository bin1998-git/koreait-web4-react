import React from 'react'
import { useState } from 'react';

export default function UseState02() {
    // setter를 호출하면 컴포넌트를 재호출된다

        const [num, setNum ] = useState(10);

        const handlePlusNumClick = () => {
            console.log("클릭감지!");
            setNum(num + 1);
            
        }

        const handleminusNumClick = () => {
            console.log("클릭감지!");
            setNum(num - 1);
            
        }
  return (
    // +1 버튼을 누르면 h3태그에 있는 숫자가 +1
    // -1 버튼을 누르면 h3태그에 있는 숫자가 -1
    <div>
        <h1>카운터</h1>
        <h3>{num}</h3>
        <button onClick={() => setNum(num + 1)}>+1</button>
        <button onClick={handleminusNumClick}>-1</button>
    </div>
  )
}
