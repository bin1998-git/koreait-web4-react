// 컴포넌트는 함수다.
// 매개변수를 받을 수 있음
// 부모 컴포넌트 자식컴포넌트로 넘기는 매개변수 props라고 한다

// 1. 부모 -> 자식만 전달 가능
// 2. js 객체({})로 데이터를 매개변수에 전달
// {title: title, menus: menus}

// 객체를 매개변수로 받는거라
// 비구조 할당으로 받을 수 있음 -권장-
export default function MenuList({title, menus}) {
  return (
    <div>
        <h2>{title}</h2>
        <ul>
            {menus.map((menu, i) => {
                return <li key={i}>{menu}</li>
            })}
        </ul>
    </div>
  )
}
