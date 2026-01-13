import React from 'react'
import MenuList from './MenuList';

export default function App06({ children} ) {
    const menus = {
        adults: ["맥주", "와인", "위스키"],
        child: ["우유", "주스", "사이다"]
    }

    const user = {
        name: "홍길동",
        age: "17"
    };

    let title; // 어른용메뉴, 어린이용메뉴
    let menuKey;

    if(user.age >19) {
        title = "어른용메뉴"
        menuKey = "adults"
    } else {
        title = "어린이 메뉴"
        menuKey = "child"
    }

    
  return (
    <div>
        <h1>연습문제</h1>
        
        {/* menulist에 user의 age를 고려하여 props를 전달하는 코드 작성 */}
        <MenuList title={title} menus={menus[menuKey]}/>
    </div>
  )
}
