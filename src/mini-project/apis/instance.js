import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    },
    // 브라우저가 쿠키(RefreshToken)를 요청에 담을 수 있게
    withCredentials: true
})

// axios의 인터셉터 기능
instance.interceptors.request.use(
    (config) => {
        
        const accessToken = localStorage.getItem("accessToken")

        if(!!accessToken) {
            config
            .headers
            .Authorization  = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        // 요청 설정 하다가 에러가 발생한 경우
        // 실행할 함수
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => res, // 200번대 응답은 그냥 패스
    async (error) => {
        // 서버에서 내려준 에러 or 그냥 에러
        // accessToken 유효시간 3분
        // 사용자는 3분이라고 느끼지 못하게
        // 원래 사용자가 하려고 했던 요청을 다시 보내줘야함

        const originalReq = error.config; // 원요청의 설정
        
        if(
            error.response.status === 401
            && error.response.data.error === "ACCESS_TOKEN_EXPIRED" 
            // 이미 한번 인터셉터로 보내진 요청인지 확인용
            // 무한 재시도 방지
            && !originalReq._retry
        ) {
            // 임의로 _retry라는 필드추가
            originalReq._retry = true;
            try {
                // 쿠키에 refresh토큰이 있으므로
                // authorization 헤더없이 요청
                const url = "http://localhost:8080/auth/refresh";
               const response = await axios
               .post(url, {}, { withCredentials: true });

               // 서버에서 받아온 새로운 accessToken
               const newAccessToken = response.data;
               // Zustand의 전역훅을 컴포넌트가 아닌곳에서 호출할 때
               // 컴포넌트 생명주기와 무관한 곳이기 때문에 별도의 방식 
               // -> getState();
               const {setToken} = useAuthStore.getState();
               setToken(newAccessToken); // 업데이트!


               // 기존실패 요청의 헤더 교체
               originalReq
               .headers
               .Authorization = `Bearer ${newAccessToken}`;

               // 원래 요청한 곳으로 새 토큰으로 다시 실행
               return instance(originalReq);
            } catch (refreshError) {
              // refreshToken 마저 만료된 경우
              localStorage.removeItem("accessToken");
              // 로그인창으로 보낼지? (선택, 개발완료 전에는 x)
            //   window.location.href = "/signin";
              return Promise.reject(refreshError);
            }
        }
        // 그냥 401, 400.. - if문 밖/ 토큰이 아예x, 권한없거나 
        console.log("응답 인터셉터에서 에러 발생");
        console.log(error);
        return Promise.reject(error);

    }
)

export default instance;