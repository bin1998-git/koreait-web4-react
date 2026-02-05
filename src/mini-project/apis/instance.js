import axios from "axios";

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
            // 임의로 _retry라는 필드를 나중에 추가할것임
            originalReq._retry = true;
        }

    }
)

export default instance;