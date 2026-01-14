import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// js로 실제 dom요소들이 렌더링된다.
// main.jsx가 그 진입점이 된다.
createRoot(document.getElementById('root')).render(<App />)

// github에 올라갈때는 node_modules가 업로드 안됨
// 타 pc에 실행할때는 clone하고
// 터미널에 npm install 입력하여 node_modules를 생성하고 실행
