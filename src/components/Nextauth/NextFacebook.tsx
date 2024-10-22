import {signIn} from "@/auth";
import Image from "next/image";

export default function NextFacebook() {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("facebook")
                }}
            >
                <button type="submit"><Image src={`/icons/sns/login/facebook-login.svg`} alt={`facebook-login`} width={44} height={44}/></button>
            </form>
        </>
    )
}