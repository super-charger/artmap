type AnalyzeContainerProps = {
    children: React.ReactNode;
}
export default function AnalyzeContainer({children}: AnalyzeContainerProps) {
    return (
        <div className="w-full h-[75%] relative mt-3 px-2">{children}</div>
    )
}