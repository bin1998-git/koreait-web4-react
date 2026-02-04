import {css} from "@emotion/react";

export const container = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

export const cardSection = css`
    display: flex;
    flex-wrap: wrap;
    max-width: 1400px;


`;

export const card = css`
    height: 450px;
    overflow: hidden;
    flex-basis: 20%; // 정렬된 상태에서 공간점유 20%만
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3 );
    cursor: pointer;
    transition: transform 0.15s ease-in-out;
    border-radius: 12px;
    &:hover {
        transform: translateY(-10px);
    }

`

export const cardImage = css`
    width: 100%;
    height: 100%;
    object-fit: cover; // 요소 크기만큼만 보여짐
    object-position: center; // 이미지 center로 기준변경

`