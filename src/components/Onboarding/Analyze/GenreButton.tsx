'use client'
import { useState } from 'react';

type GenreButtonProps = {
    children: React.ReactNode;
};

export default function GenreButton({ children }: GenreButtonProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <button
            onClick={handleClick}
            className={`rounded-3xl border border-[#f0f0f0] justify-center items-center inline-flex p-3 m-2 ${
                isActive ? 'bg-black text-white' : 'bg-white text-[#808080]'
            }`}
        >
            <div className="text-xl font-bold font-['Noto Sans KR'] leading-[18px]">{children}</div>
        </button>
    );
}