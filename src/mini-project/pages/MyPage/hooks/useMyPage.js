import { updatePasswordAPI, updateUserAPI } from "../../../apis/endpoints/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

// 이미지 훅
// 임시로 로컬(브라우저)에 저장 - localstorage
export const useProfileImage = () => {
    const[isImgLoading, setIsImgLoading] = useState(false);
    const [profileImg, setProfileImg] = useState(null);


    // 기존에 업로드 한 이미지가 있다면
    useEffect(() => {
        const saved = localStorage.getItem("profileImg")
        if(saved) {
            setProfileImg(saved);
        }
    }, [])

    const handleImgChange = (e) => {
          if (e.target.files.length === 0) {
        return;
    }


    const file = e.target.files[0];
    const type = file.type



    if (!type.startsWith("image/")) {
        toast.error("이미지 파일만 선택가능합니다");
        return;
    }



    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
        toast.error("이미지는 3MB 초과 불가능합니다");
        return;
    }

    setIsImgLoading(true);
    // 파일리더 -> 파일들을 ram으로 로딩하는 객체
    // 정석) Blob방식
    const reader = new FileReader();


    // 파일 다 읽었을때 정의
    reader.onload = (e) => {
        // 이미지를 url로 변환
        const dataURL = e.target.result;

        try {
            localStorage.setItem("profileImg", dataURL);
            setProfileImg(dataURL);
            toast.success("이미지 저장 완료");
        } catch(error) {
            toast.error("이미지 저장 실패");
            console.log(error);
        } finally {
            setIsImgLoading(false);
        }

    }
    // firebase 구글 서비스
    // 부분유료 - 해외결제 카드 필요
    // 5기가 까지는 무료


    // 읽다 실패했을경우 정의
    reader.onerror = () => {
        toast.error("이미지 업로드에 실패했습니다");
        setIsImgLoading(false);
    }

    // 실제 실행 - 이미지 -> url로 읽어옴
    reader.readAsDataURL(file);
    }

    return {handleImgChange, isImgLoading, profileImg}

}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserAPI,
        onSuccess: () => {
            toast.success("수정완료 되었습니다.");
            // get해온 데이터 get요청 트리거
            queryClient.invalidateQueries(["getMyInfo"]);
        },
        onError: (error) => {
            if (error.response) {
                const errorMsg = error.response.data;
                toast.error(errorMsg);
            } else {
                console.log(error);
                toast.error("수정에 실패했습니다");
            }
        }
    })
}

export const useUpdatePasswordMutation = () => {
    return useMutation({
        mutationFn: updatePasswordAPI(),
        onSuccess: () => {
            toast.success("비밀번호가 변경되었습니다");
        },
        onError: (error) => {
            const resErrData = error?.response?.data;
            // typeof 연산자 -> 해당데이터의 타입을 문자열로 반환
            if (typeof resErrData === `string`) {
                toast.error(resErrData);
                return;
            }
        }
        
    })
}