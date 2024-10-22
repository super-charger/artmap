import {signIn} from "@/auth";
import Image from "next/image";

export default function NextNaver() {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("naver")
                }}
            >
                <button type="submit"><Image src={`/icons/sns/login/naver-login.svg`} alt={`naver-login`} width={44} height={44}/></button>
            </form>
        </>
    )
}