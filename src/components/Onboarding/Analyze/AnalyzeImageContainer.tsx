'use client'
import { useEffect, useState } from 'react';
import { getAnalyzeImages } from "@/app/onboarding/analyze2/action";
import Image from "next/image";

export default function AnalyzeImageContainer() {
    const [imageData, setImageData] = useState<any>();
    const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAnalyzeImages();
            console.log(data);
            setImageData(data);
        }
        fetchData();
    }, []);

    const toggleImageSelection = (id: number) => {
        setSelectedImageIds(prevSelectedImageIds =>
            prevSelectedImageIds.includes(id)
                ? prevSelectedImageIds.filter(imageId => imageId !== id)
                : [...prevSelectedImageIds, id]
        );
        console.log(selectedImageIds);
    };

    if (!imageData) return null;

    return (
        <div className="overflow-auto h-full grid grid-cols-2 gap-6">
            {imageData.data.map((image: any) => (
                <div
                    key={image.id}
                    className={`relative w-[250px] h-[250px] ${selectedImageIds.includes(image.id) ? 'border-4 border-purple-500' : ''}`}
                    onClick={() => toggleImageSelection(image.id)}
                >
                    <Image src={image.thumbnail} alt={`image-${image.id}`} fill={true} />
                </div>
            ))}
        </div>
    );
}