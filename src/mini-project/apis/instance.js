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

export default instance;