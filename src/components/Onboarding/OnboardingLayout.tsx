type onboardingLayoutProps = {
    children: React.ReactNode;
}
export default function OnboardingLayout({children}: onboardingLayoutProps) {
    return (
        <div className="flex justify-center items-center bg-primary_sub overflow-hidden w-full h-dvh relative">
            <main className="h-full w-[600px] bg-background_primary absolute">
            {children}
            </main>
        </div>
    )
}