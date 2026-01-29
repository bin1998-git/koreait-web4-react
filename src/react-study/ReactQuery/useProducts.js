import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";
// 코드 분리
// -> 아토믹 컴포넌트
// 1. 로직(return 이전코드)은 커스텀 훅들로 js파일로 분리
// 2. return이후코드 -> 여러 컴포넌트
// 여러컴포넌트 !== 여러 jsx파일

// 커스텀 훅
// useQuery 코드를 js파일로 분리
export const useSearchProducts = (nameKeyword) => {
  const {data, isLoding, error, isError} = useQuery({
        // 컨트롤러 이름, 쿼리스트링변수들
        // 컨트롤러 이름, userId or contentId...
        queryKey: ["searchProducts", nameKeyword],
        queryFn: async () => {
            const url = "http://localhost:8080/product/search";
            const res = await axios.get(url, {
                params: { nameKeyword: nameKeyword } 
            });
            return res.data;
        },
        // 검색어가 빈값이 아닐때 get요청!
        enabled: !!nameKeyword
    });

    return [data, isLoding, error, isError];
}

// 상품다건 등록
export const useAddBulkProducts = () => {
    // 생성x, 부모컴포넌트에 있는 client를 참조
    const queryClient = useQueryClient();

    // get요청 이외의 요청의 주도권은 내가 가짐
    // useMutation은 정의만 되어있고
    // 실제로 호출하려면 mutate()
    // mutate가 mutationFn임
   return useMutation({
        mutationFn: async (products) => {
            const url = "http://localhost:8080/product/add/bulk"
            const res = await axios.post(url, products);
            return res.data;
        },
        // 성공시 실행할 함수
        onSuccess: () => {
            // "products"를 key로 포함한 모든 전역데이터들이
            // 무효화(stale(상한)상태) -> get요청 일어남
            queryClient.invalidateQueries({
                // 무효화할 key가 부분일치만 해도 무효화
                queryKey: ["searchProducts"] // 컨트롤러 이름이 오는게 이상적
            })
        },
        // 에러시 실행할 함수
        onError: () => {
            console.log("에러발생!");
        }
    });
}