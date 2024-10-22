import {signIn} from "@/auth";
import Image from "next/image";

export default function NextKakao() {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("kakao")
                }}
            >
                <button type="submit"><Image src={`/icons/sns/login/kakao-login.svg`} alt={`kakao-login`} width={44} height={44}/></button>
            </form>
        </>
    )
}