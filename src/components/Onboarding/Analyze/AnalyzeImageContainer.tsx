'use client'
import { useEffect, useState } from 'react';
import { getAnalyzeImages } from "@/app/onboarding/analyze2/action";
import Image from "next/image";

export default function AnalyzeImageContainer() {
    const [imageData, setImageData] = useState<any>();

    useEffect(() => {
        async function fetchData() {
            const data = await getAnalyzeImages();
            console.log(data);
            setImageData(data);
        }
        fetchData();
    }, []);
if(!imageData) return null;
    return (
        <div className="overflow-auto h-full grid grid-cols-2 gap-6">
            {imageData.data.map((image: any,) => (
                <div key={image.id} className='relative w-[250px] h-[250px]'>
                    <Image src={image.thumbnail} alt={`image-${image.id}`} fill={true}/>
                </div>
            ))}
        </div>
    );
}