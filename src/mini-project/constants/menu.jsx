import Home from "../pages/Home/Home"
import Signup from "../pages/Signup/Signup"

// 상단 header navbar 일반메뉴들
export const MENU_ITEMS = [
    {
        id: 1,
        name: "페이지1",
        path: "/page1",
        element: <>페이지1</>
    },
    {
        id: 2,
        name: "페이지2",
        path: "/page2",
        element: <>페이지2</>
    },
    {
        id: 3,
        name: "페이지3",
        path: "/page3",
        element: <>페이지3</>
    },
]

// 전체공개 라우트
export const PUBLIC_ROUTES = [
    ...MENU_ITEMS,
    {
        id: "home",
        path: "/",
        element: <Home />
    },
    {
        id: "signin",
        path: "/signin",
        element: <>로그인화면</>
    },
    {
        id: "signup",
        path: "/signup",
        element: <Signup />
    }
]

// 로그인해야 가능한 라우트
// Protected Routes
export const PROTECTED_ROUTES = [
    {
        id: "mypage",
        path: "/mypage",
        element: <>마이페이지</>
    }
]