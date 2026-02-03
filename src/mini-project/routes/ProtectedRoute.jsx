import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function ProtectedRoute() {
    // zustand로 권한훅 - token, 로그인여부 저장
    const { isAuthenticated } = useAuthStore();

    // 권한이 없다면
    if(!isAuthenticated) {
        // 라우터라이브러리에서 제공하는 컴포넌트
        // url 이동(변경)만 담당
        // replace: /mypage로 이동한 히스토리 /signin으로 대체
        return <Navigate to="/signin" replace /> // 로그인 url로 보낸다라는 것
    }

    // 자식 Route의 element를 Outlet에 주입한다.
  return <Outlet />
}
