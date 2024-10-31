type AnalyzeContainerProps = {
    children: React.ReactNode;
}
export default function AnalyzeContainer({children}: AnalyzeContainerProps) {
    return (
        <div className="flex items-center justify-center w-full h-[75%] mt-3 px-[15px]">{children}</div>
    )
}