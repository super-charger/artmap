import { object, string } from "zod"

export const signInSchema = object({
    email: string({ required_error: "이메일을 입력해야 합니다." })
        .min(1, "이메일을 입력해야 합니다.")
        .email("Invalid email"),
    password: string({ required_error: "비밀번호를 입력해야 합니다." })
        .min(1, "비밀번호를 입력해야 합니다.")
        .min(8, "비밀번호는 8글자 이상이어야 합니다.")
        .max(32, "비밀번호는 32글자 이하여야 합니다."),
})