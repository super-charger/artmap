import {signIn} from "@/auth";
import Image from "next/image";

export default function NextApple() {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("apple")
                }}
            >
                <button type="submit"><Image src={`/icons/sns/login/apple-login.svg`} alt={`apple-login`} width={44} height={44}/></button>
            </form>
        </>
    )
}