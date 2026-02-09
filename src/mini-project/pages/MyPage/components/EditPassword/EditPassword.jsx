/** @jsxImportSource @emotion/react */
// 패스워드 변경 버튼을 누르면 보이게
import { useForm } from "../../../../hooks/useForm";
import { useState } from "react"
import { useUpdatePasswordMutation } from "../../hooks/useMyPage";
import * as s from "./styles";
import { toast } from "react-toastify";

// 취소버튼 누르면 closeEdit호출해서 이전화면으로
export default function EditPassword({closeEdit}) {
  const [erros, setErros] = useState({});
  const {formVal, handleChange}= useForm({
    currentPassword: "",
    newPassword: ""
  });

  const {mutate, isPending} = useUpdatePasswordMutation();
  const handleSubmit = () => {
    if (isPending) return;

    mutate(formVal, {
      onSuccess: () => closeEdit(),
      onError: (error) => {
        if (error.response) {
          const errorRes = error.response.data;
          if (Array.isArray(errorRes)) {
            let backendError = {};
            for (let errorObj of errorRes) {
              backendError = {...backendError, errorObj};
            }
            setErros(backendError);
            return;
          }
        }
  
        console.log(error);
        toast.error("비밀번호 변경 실패");
      }
    });
  }

  return (
   <>
      <h3 css={s.title}>비밀번호 변경</h3>
      <div css={s.inputGroup}>
        <label css={s.label}>현재 비밀번호</label>
        <input 
          css={s.input}
          type="password" 
          name="currentPassword"
          value={formVal.currentPassword}
          onChange={handleChange}
          placeholder="현재 비밀번호를 입력하세요"
        />
        {erros.currentPassword && (
          <div css={s.errorMessage}>{erros.currentPassword}</div>
        )}
      </div>
       <div css={s.inputGroup}>
        <label css={s.label}>새 비밀번호</label>
        <input 
        css={s.input}
        type="password"
        name="newPassword"
        value={formVal.newPassword}
        onChange={handleChange}
        placeholder="새 비밀번호를 입력하세요" 
        />
        {erros.newPassword && (
          <div css={s.errorMessage}>{erros.newPassword}</div>
        )
        }
        </div>
      <div css={s.buttonGroup}>
        <button 
        css={s.cancelButton}
        onClick={closeEdit}
        disabled={isPending}
        >취소</button>
        <button
        css={s.saveButton}
        disabled={isPending}
        onClick={handleSubmit}
        >변경완료</button>
      </div>
   </>
  )
}
