import React from 'react'
import { useState } from 'react'
import { useCurrentBook } from './store/bookStore';


export default function Zustand02() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: 0
  });
  const { setNewBook } = useCurrentBook();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => {
        return {
            ...prev,
            [name]: name === "price" ? parseInt(value) : value
        }
    })
  }

  const handleSubmit = () => {
    setNewBook({...form});

    setForm({
        title: "",
        author: "",
        price: 0
    });
  }

    return (
    <div>
        <h2>책 정보 입력</h2>
        <input 
        type="text" 
        name='title'
        placeholder='책제목'
        onChange={handleChange}
        value={form.title}
        />
        <input 
        type="text" 
        name='author'
        placeholder='저자'
        onChange={handleChange}
        value={form.author}
        />
        <input 
        type="number" 
        name='price'
        placeholder='가격'
        onChange={handleChange}
        value={form.price}
        />
        <button onClick={handleSubmit}>입력완료</button>
        <ShowBook />
    </div>
  )
}

// 전역 상태에서 정보 가져오기
function ShowBook() {
    const { book } = useCurrentBook();
    const { title, author, price } = book;
    return (
        <div>
            <h3>현재 저장된 책 정보</h3>
            <p>제목: {title}</p>
            <p>저자: {author}</p>
            <p>가격: {price}원</p>
        </div>
    )
}
