import { create } from "zustand";

// create() => 전역 저장소를 리턴받을 수 있음
// -> App 어디서든 접근가능함


// 1. create함수는 매개변수로 콜백 함수를 받는다.
// 2. 이 콜백함수에는 Zustand가 
// 1번째 매개변수 자리에 setter를 넣어줌
// 3. setter는 이 create 함수가 리턴하는 객체에 대한 setter
// 4. 저장하고 싶은 상태나 메서드 등을 key-value 형태로 객체에 정의하면
// 5. import하는 측에서 해당 key로 value를 훅형태로 받아서 사용할 수 있음


export const useModalStore = create((set) => {
    return {
        isModalOpen: false,
        openModal: () => set({isModalOpen: true}),
        closeModal: () => set({isModalOpen: false})
    }
    // set은 리턴값인 js객체를
    // {...prev, key: value}로 조작하여 대입해주는 역할
});