/*
    리액트에서는 실제 dom조작을 사용하지 않길 바람
    (VDOM <-> DOM 비교하는 매커니즘 때문)
    브라우저 기능을 써야 가능한 경우가 존재
    -> 대표적으로: focus(), click()

*/

import { useRef } from "react";
import { useState } from "react"

export default function UseRef02() {
    const [value, setValue] = useState("");
  
  // dom객체에 직접 접근할 때 사용된다.
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);

  

  const handleKeyDown = (e) => {
    // 실제 dom객체? current에 있음
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;
    const div3 = div3Ref.current;

    const key = e.key;
    if (key !== "Enter") {
      return;
    }

    // 엔터키 일때
    if (value === "1") {
      div1.focus();
    } else if (value === "2") {
      div2.focus();
    } else if (value === "3") {
      div3.focus();
    }

  }
  
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  const handleKeyDown2 = (e) => {
    // dom객체를 가져오는 방법
    // 1. 이벤트
    // 2. ref의 current로 가져오기

    if(e.key !== "Enter") {
      return;
    }


    const target = e.target;
    if (target === input1Ref.current) {
      input2Ref.current.focus();
    } else if (target === input2Ref.current) {
      input3Ref.current.focus();
    }


  }

  // 이벤트핸들러에 매개변수 하나더!
  const handelKeyDown3 = (e, nextRef) => {
    if (e.key === "Enter" && nextRef) {
      nextRef.current.focus();
    }
  }
  
  return (
    <>
      <div>
        <input 
          type="number"
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="1 ~ 3 입력"
        />

        {/* jsx 태그에 ref속성으로 
        실제 dom객체를 useRef변수에 대입 
        div태그는 원래 focus 대상이 아님
        */}
        <div ref={div1Ref} tabIndex={0}>1번</div>
        <div ref={div2Ref} tabIndex={0}>2번</div>
        <div ref={div3Ref} tabIndex={0}>3번</div>
      </div>
      <div>
        {/* 1번에서 enter -> 2번으로 focus */}
        {/* 2번에서 enter -> 3번으로 focus */}
        <input 
        type="text" 
        placeholder="1번" 
        onKeyDown={(e) => handelKeyDown3(e, input2Ref)} 
        ref={input1Ref} 
        />
        <input 
        type="text" 
        placeholder="2번" 
        onKeyDown={(e) => handelKeyDown3(e, input3Ref)}
        ref={input2Ref}
        />
        <input 
        type="text" 
        placeholder="3번" 
        ref={input3Ref}
        />
      </div>

    </>
  )
}
