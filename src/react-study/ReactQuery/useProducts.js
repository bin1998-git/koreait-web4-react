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

// 전체상품 조회
export const useGetAllProducts = () => {
  const url = "http://localhost:8080/product/all";
  return useQuery({
    queryKey: ["getAllProduct"],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    }
  });
}


const updateProductApi = async (id, product) => {
    const url = `http://localhost:8080/product/${id}`
    const response = await axios.put(url, product);
    return response.data;
}

export const useUpdateProduct = () => {
    // put요청 이후에 자동으로 get요청?
    // -> 캐시무효화로 RQ라이브러리가 자동으로 요청하게
    const queryClient = useQueryClient();
    return useMutation({
        // mutate는 첫번째 매개변수만 활용가능
        // 두번째 매개변수 -> js객체(옵션설정) 고정
        // -> js객체에 인자 여러개 담아서 첫번째 매개변수로 전달
        mutationFn: ({id, product}) => updateProductApi(id, product),
        onSuccess: () => {
            // get요청으로 받아온 데이터 무효화(키를 전달)
            queryClient.invalidateQueries({queryKey: ["getAllProduct"]})
        }
    });

}
    
const deleteProductApi = async (id) => {
     const url = `http://localhost:8080/product/${id}`
    const response = await axios.delete(url);
    return response.data;
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteProductApi(id),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["getAllProduct"]})
        }
    });
}



