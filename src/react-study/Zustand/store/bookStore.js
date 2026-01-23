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
        // set을써서 전역상태인 book의 필드 
        // 일부만 업데이트 가능할까?
    }
});

export const useBookList = create((set) => {
    return {

        // R
        books: [{
            id: 1,
            title: "자바의정석",
            author: "남궁성",
            price: "30000"
        }],

        // c - add
        addBook: (book) => set((prev) => {
            return {
                ...prev,
                // spread로 없던 id key 추가
                books: [...prev.books, {...book, id: Date.now()}]
            }
        }),
        // u - update
        updateBook: (id, updatePrice) => set((prev) => {
            return {
                ...prev,
                // map(), filter() -> 새로운 []을 리턴
                books: prev.books.map((book) => {
                    return book.id === id 
                    ? {...book, "price": updatePrice}
                    : book
                })
            }
        }),


        // d - remove
        // 내가 전달해준 이것만 뺴고 나머지만 남겨줘
        removeBook: (id) => set((prev) => {
            return {
                ...prev,
                books: prev.books.filter((book) => book.id !== id)
            }
        })
    }
})

