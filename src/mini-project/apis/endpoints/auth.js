    import instance from "../instance";


    export const signupApi = async (dto) => {
        const response = await instance.post("/auth/signup", dto);
        return response.data;
        
    }

    export const signinAPI = async (dto) => {
        const response = await instance.post("/auth/signin", dto);
        return response.data;
    }

    export const refreshTokenAPI = async () => {
        const response = await instance.post(
            "/auth/refresh",    
            {},
            {withCredentials: true});
        return response.data // 새 accessToken 담겨있음
    }