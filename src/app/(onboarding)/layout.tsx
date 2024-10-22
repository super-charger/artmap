import {ReactNode} from "react";


export default async function Layout({
                                             children,
                                         }: {
    children: ReactNode
}) {
    return (
        <div className="justify-center items-center flex bg-primary_sub h-dvh">{children}</div>
    )
}