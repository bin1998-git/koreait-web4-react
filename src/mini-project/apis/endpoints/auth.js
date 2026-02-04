import instance from "../instance";


export const signupApi = async (dto) => {
    const response = await instance.post("/auth/signup", dto);
    return response.data;
}