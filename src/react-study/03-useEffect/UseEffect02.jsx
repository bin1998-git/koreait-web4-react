import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function UseEffect02() {
    // 상태가 바뀐 이후 계산되어야 하는 것들
    // 검색어 -> 검색어 추천
   const [inputVal, setInpuVal] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const keywords = [
        "리액트", "자바스크립트", "리액트네이티브",
        "자바", "스프링", "파이썬",
        "스프링부트", "흑백요리사", "최강록", "최강희"
    ];

    // setInputVal호출 후 -> 업데이트가 완료된 이후에
    // 따로 계산되어야함
    useEffect(() => {
        // 최초실행시에도 함수가 호출되니까
        // inputVal이 ""이기때문에 모든 단어에 매칭
        if (inputVal === "") {
            return;
        }

        // inputVal이 포함된 문자열을 keywords에서
        // 골라내서 suggention의 상태를 업데이트
        let newSuggestions = []
        for(let keyword in keywords) {
            if(keyword.includes(inputVal)) {
                newSuggestions = [...newSuggestions, keyword];
            }
        }

        // filter : 해당 함수의 리턴값이 true인 요소들만 남김
        newSuggestions = keywords.filter((keyword) => {
            return keyword.includes(inputVal);
        });
        console.log("테스트")
        setSuggestions(newSuggestions);

    }, [inputVal]);

  return (
    <div>
        <h2>검색</h2>
        <input 
            type="text" 
            value={inputVal}
            onChange={(e) => setInpuVal(e.target.value)}
            placeholder="검색어 입력"
        />
        <ul>
            {/* 여러개의 li 태그들이 들어와야함 */}
            {/*suggestions들을 li들로 변환*/}
            {suggestions.map((keyword, i) => {
                return <li key={i}>
                    <button>
                        {keyword}
                    </button>
                </li>
            })}
        </ul>
    </div>
  )
}