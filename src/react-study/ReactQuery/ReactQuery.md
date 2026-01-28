설치 - npm install @tanstack/react-query

- 전역 서버의 상태 관리
- react hook 형태로 2가지 hook 함수를 제공
1. useQuery(get요청용 hook)
- 컴포넌트 마운트 시 자동으로 데이터를 조회
- 로딩, 에러에 대한 상태를 자동 관리
- refetch 시점을 자동으로 관리
- 데이터 캐싱
시간, useMutation의 함수가 실행시가 아닌 나머지경우 get요청 금지
-> "get요청의 주도권을 라이브러리에게 넘김"

useQuery() 호출시, 반환되는 것
    1. data - get요청 결과
    2. isLoading - 로딩상태(요청만 가고 응답이 안온상태)
    3. isError - 에러상태


2. useMutation(get요청 이외의 요청용 hook)
- onSuccess를 정의해서 성공시 작업 정의
- onError를 정의해서 실패시 작업 정의
useMutation() 호출시 반환되는 것
mutate --> (함수)
- mutate() 호출 시 실행