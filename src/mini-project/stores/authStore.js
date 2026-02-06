import { create } from "zustand";


// accessToken을 로그인 성공시 서버에서 받아옴
// localStorage에 저장


// 전역상태도 새로고침하면 사라짐
export const useAuthStore = create((set) => {
    // 초기화 시 localStorage 체크
    // 새로고침해도 ㅣocalStorage에 존재하면 로그인유지
    const accessToken = localStorage.getItem("accessToken")
    
    return {
        isAuthenticated: !!accessToken, // token존재시 true
        accessToken: accessToken,

        // 로그인, 로그아웃 mutation에서 onSuccess시 호출될것
        // setter를 활용한 로그인, 로그아웃 함수
        login: (accessToken) => {
            localStorage.setItem("accessToken", accessToken)
            set ({
                isAuthenticated: true,
                accessToken: accessToken
            })
        },
        logout: () => {
            localStorage.removeItem("accessToken");
            set({
                isAuthenticated: false,
                accessToken: null
            })
        },

        // 토큰업데이트 - 인터셉터용
        setToken: (newAccessToken) => {
            // 새로받아온 토큰이 있다면
            if (newAccessToken) {
                localStorage.setItem("accessToken", newAccessToken);
            } else { // 없다면
                console.log("리프레쉬 실패");
                localStorage.removeItem("accessToken");
            }

            set({accessToken: newAccessToken,
                 isAuthenticated: !!accessToken});
        }

    }
});