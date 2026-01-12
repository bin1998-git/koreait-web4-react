import MenuList from "./menuList";
export default function App04() {
    const age = 20;
    const forAdults = ["맥주", "와인", "위스키"];
    const forChildren = ["우유", "당근주스", "사이다"];
    

    // age가 19세 초과면, 성인 else 어린이 
    const isAdult = age > 19;
    const menuTitle = isAdult ? "성인매뉴" : "어린이메뉴";
    let menus = [];
    if (isAdult) {
      menus = forAdults;
    } else {
      menus = forChildren;
    }
  return (
    <div>
        <h1>메뉴</h1>
        {/* App04가 MenuList의 부모가 된다 */}
        {
        //자식컴포넌트에게 데이터 전달
        // key-value 형식으로 전달해야 객체로 포장되서 전달
        }

        <MenuList title={menuTitle} menus={menus} />
    </div>
  )
}
