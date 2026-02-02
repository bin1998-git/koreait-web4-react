/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import * as s from "./styles"
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


// 전체페이지의 레이아웃 구조를 정의
export default function MainLayout() {
    // children -> props로 컴포넌트를 전달하는 방식
    // Outlet -> url에 따라 라우팅된 컴포넌트
  return (
    <div>
        <Header />
        <main css={s.main}>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}
