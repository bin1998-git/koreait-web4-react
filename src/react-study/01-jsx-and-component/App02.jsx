import React from 'react'

export default function App02() {
    const person =  {
        name : "홍길동",
        age : 20
    }

    const fruits = ["사과", "바나나", "포도", "수박"]

    let fruitItems = [];
    for (let i = 0; i < fruits.length; i++) {
        const myLi = <li key={i}>{fruits[i]}</li>
        // fruitItems.push(myLi);
        // spread 문법 사용
        fruitItems = [...fruitItems, myLi];
    }

    // jsx에서는 if 사용불가 -> 삼항연산자
    // for문 사용불가 -> map(), foreach(), filter()... / map을 많이사용
  return (
    <div>
        <div>이름: {person.name}</div>
        <div>나이: {person.age > 19 ? person.age : "미성년자"}</div>
        <h2>좋아하는 과일</h2>
        <ul>
            {
                fruits.map((fruit, index) => {
                    return <li key={index}>{fruit}</li>
                })
            }
        </ul>
        <h2>좋아하는 과일ver2</h2>
        <ul>
            {/* 각 태그가 담긴 리스트를 중괄호안에 선언하면 된다. */}
            {fruitItems}
        </ul>
    </div>
  )
}
