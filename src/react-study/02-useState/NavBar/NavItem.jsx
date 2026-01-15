import React from 'react'
// css -> css in JS
// emotion or styled-component



export default function NavItem({id, label, isActive, onClick}) {
  return (
    <li 
      onClick={() => onClick(id)}
      // 상태에따라 서로다른 스타일
      style={{cursor: "pointer", fontWeight: isActive ? "500" : "200"}}
    >
        {label}
    </li>
  );
}
