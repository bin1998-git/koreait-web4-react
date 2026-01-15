import React from 'react'
import NavItem from './NavItem';
import { useState } from 'react';

const NAV_ITEMS = [
    {id:1, label: "홈"},
    {id:2, label: "게시판"},
    {id:3, label: "마이페이지"},
    {id:4, label: "로그아웃"},
]

export default function NavBar() {
    // 선택되어지는 컴포넌트들
    // 선택된걸 식별할 수  있어야한다
    // map() 등으로 뿌려주는 컴포넌트에서 상태를 전달해줘야함
    const [activeId, setActiveId] = useState(0);


  return (
        <nav>
        <ul style={{listStyle: "none"}}>
          
            {NAV_ITEMS.map((item) => {
                return (
                <NavItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    // 여러개의 navitem 컴포넌트에
                    // 동일한 setter를 넘겨준다
                    onClick={setActiveId}
                    isActive={item.id === activeId}
                />
                )
            })}
        </ul>
    </nav>
  )
}
