// default로 export하면 값이 하나로 결정되어 있어서
//  Import하는 쪽에서 사용하기 편한 이름으로 지정가능
import Study from "./react-study/Study";
import MyToast from "./react-study/Zustand/MyToast";


function App() {
    return (
        <>
          <MyToast />
          <Study />
        </>
  );
}

export default App
