import {signOut} from "@/auth";

export default function NextAuthLogoutButton(props:any) {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="w-full"
        >
<button {...props}>sign out</button>
        </form>
    )
}