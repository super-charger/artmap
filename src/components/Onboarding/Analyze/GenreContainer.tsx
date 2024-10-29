type GenreContainerProps = {
    children: React.ReactNode;
}
export default function GenreContainer({children}: GenreContainerProps) {
    return (
        <div className="items-start justify-start w-full h-[75%] mt-3 px-[15px] py-20 gap-4">{children}</div>
    )
}