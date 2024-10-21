import {signIn} from "@/auth";
import Image from "next/image";

export default function NextGoogle() {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit"><Image src={`/icons/sns/login/google-login.svg`} alt={`google-login`} width={44} height={44}/></button>
            </form>
        </>
    )
}