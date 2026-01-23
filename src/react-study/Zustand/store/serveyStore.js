    import { create } from "zustand";

    export const useSurveyStore = create((set) => {
        return {
            surveyData: {
                // step1
                name: "",
                age: "",
                gender: "",

                // setp2
                satisfaction: "",
                recommend: "",
                email: "",
            },

            setSurveyInfo: (objData) => set((prev) => {
                // js 객체는 key중복시 이후값이 이전값 덮어쓴다
                return {
                    ...prev,
                    // ... 스프레드로 뿌려줘야지 여러개 가능
                    surveyData: {...prev.surveyData, ...objData} // 이전값두고 또 업데이트
                }
            }),
            // 이메일만 업데이트 할 수 있는 set
            setEmail: (email) => set((prev) => {
                return {
                    ...prev,
                    surveyData: {...prev.surveyData, email}
                }
            }),

        }
    })