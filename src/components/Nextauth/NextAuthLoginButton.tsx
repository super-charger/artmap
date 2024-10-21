import {signIn} from "@/auth";
import Image from "next/image";

type NextAuthLoginButtonProps = {
    provider: string
}
export default function NextAuthLoginButton({provider}: NextAuthLoginButtonProps) {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn(provider)
                }}
            >
                <button type="submit"><Image src={`/icons/sns/login/${provider}-login.svg`} alt={`${provider}-login`} width={44} height={44}/></button>
            </form>
        </>
    )
}