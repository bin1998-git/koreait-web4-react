import instance from "../instance"

export const getMeAPI = async () => {
    const response = await instance.get("/user/me");
    return response.data;
}

// 마이페이지 내정보수정
export const updateUserAPI = async (dto) => {
    const response = await instance.patch("/user/me", dto);
    return response.data;
}

// 마이페이지 패스워드 수정
export const updatePasswordAPI = async (dto) => {
    const response = await instance.patch("/user/me/password", dto);
    return response.data;
}