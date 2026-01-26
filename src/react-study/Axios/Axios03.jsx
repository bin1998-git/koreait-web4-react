import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { getUsersApi } from "./apis/studyApi";

export default function Axios03() {
    // 작성한 api함수를 import해서 response들을
    // 아래에 return에 렌더링 시켜주세요
    const [users, setUsers] = useState([]);

    const getUsers = async() => {
        const res = await getUsersApi();
        console.log(res.data);
        setUsers(res.data);
    }

    useEffect(() => {
        getUsers();
    },[]);


  return (
    <div>
        <h2>사용자 목록</h2>
        {/* 아래의 div 카드 컴포넌트라고 생각하시고
            서버에서 받아온 데이터를 Map으로 렌더링 시켜주세요
        */}
           {users.map((u) => {
            const { id, name, username, email } = u;
            return (
            <div key={id}>
                <h3>이름: {name}</h3>
                <p>아이디: {username}</p>
                <p>이메일: {email}</p>
            </div>
        );
      })}
    </div>
  )
}
