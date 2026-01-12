// JSX?? js의 확장 문법
// HTML태그 처럼 보이지만, 실제로는 JS코드다.

// 컴포넌트 - JSX를 리턴하는 함수를 의미한다.
function App01() {
    console.log("App01 호출되었습니다.");
    const title = "React 수업시작!";
    const content = "jsx가 무엇인지 알아봅시다";
    const name ="리액트";
    const myTag = <h1>{name}</h1>;

    // JSX의 규칙
    // 1. return되는 것은 반드시 하나의 태그여야 한다.
    // 2. 모든 태그는 닫혀야 한다.
    // 3. 태그사이에 혹은 태그 안에 js코드를 삽입할 경우 {} 이용



    return (
        // 태그가 js코드로 변환될 건데,
        // 이를 Jsx라고 한다. 
        // 리턴하는 것은 실제 HTML이 아니다!
        <div>
            {myTag}
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

// export: 외부에서 접근하게 하겠다.
// default: 해당 파일에서 대표로 내보낼 값 하나
export default App01;