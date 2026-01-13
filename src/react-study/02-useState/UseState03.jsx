import React from 'react'
import { useState } from 'react'

export default function UseState03() {
    const [formData, setFormData] = useState({
        name: "",
        major: "",
    });
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");

    // onClick, onChange 와 같은 이벤트 속성에
    // 등록된 함수는 첫번째 매개변수에
    // 리액트가 알아서 이벤트객체를 넣어준다
    const handleNameChange = (event) => {   
        const target = event.target;
        const value = target.value;
        setName(value);
    };

    const handleMajorChange = (e) => {
        const value = e.value;
        setMajor(value);
    };

        const handleInputChange = (e) => {
            // name속성을 잘 이용해보세요
            const { name, value} = e.target;
            // const name = e.target.name;
            // const value = e.target.value;
           // name === "name" - > name input
           // name === "major" -> major input
            // -> 두개의 Input중 어떤 input인지 식별

            // setformdata()에 js객체를 업데이트  
            const newFormData = {
                ...formData, // 기본값 복사(스프레드문법)
                [name]: value, // 바뀐 값만 업데이트
            };
            setFormData(newFormData);
        }

  return (
    <div>
        <input 
            type="text" 
            // value에 name을 넣어놨기때문에 
            // 업데이트 할때마다 setter로 name을 업데이트해줘야함
            value={formData.name}
            name="name"
            placeholder="이름입력"
            onChange={handleInputChange}
        />
        <input
            type="text"
            value={formData.major}
            name="major"
            placeholder="전공입력"
            onChange={handleInputChange}
         />
        <p>이름:{formData.name}</p>
        <p>전공:{formData.major}</p>
    </div>
  )
}
