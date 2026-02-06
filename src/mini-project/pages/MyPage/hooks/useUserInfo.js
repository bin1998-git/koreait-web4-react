import {getMeAPI} from "../../../apis/endpoints/user";
import { useQuery } from "@tanstack/react-query"

export const useMyInfo = () => {
    return useQuery({
        queryKey: ["getMyInfo"],
        queryFn: getMeAPI,
        staleTime: 5 * 60 * 1000 // 5분
        
    })
}
