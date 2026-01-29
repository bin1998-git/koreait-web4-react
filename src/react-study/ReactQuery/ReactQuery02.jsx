import React from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from 'axios';

export default function ReactQuery02() {
    // useQuery만 사용하여서
    // https://jsonplaceholder.typicode.com/users
    // get요청하여 데이터를 map으로 뿌려주세요
    
    const {
    data: users, 
    error, 
    isLoading,
    isError, 
    } = useQuery({
        queryKey: ["users"],
        queryFn: async() => {
            const url = "https://jsonplaceholder.typicode.com/users"
            const response = await axios.get(url);
            return response.data;
        }
    });

    if (isError) {
        console.log(error.message);
        return (
            <h1>{error.message}</h1>
        );
    }

    if (isLoading) {
        return (
            <h1>로딩중입니다</h1>
        )
    }

  return (
    <div>
        <h1>유저목록</h1>
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>아이디</th>
                    <th>성명</th>
                    <th>이메일</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((u) => {
                    return (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}
