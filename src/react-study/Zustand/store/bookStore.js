import { create } from "zustand";

export const useCurrentBook = create((set) => {
    return {
        book: {
            title: "",
            author: "",
            price: 0
        },

        // book을 교체할 수 있도록
        // setter를 이용하여 함수를 만들어 주세요
        // zustand의 set또한 useState처럼 함수형 업데이트 ok
        // -> prev값을 기억한다!
        setNewBook: (newBook) => set({book: newBook}),
        setNewBook2: (newBook) => set((prev) => {
            return {
                ...prev,
                book: newBook
            }
        })
    }
})