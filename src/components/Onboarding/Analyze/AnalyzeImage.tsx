import Image from "next/image";
import {faker} from "@faker-js/faker/dist/locale/ar";

export default function AnalyzeImage() {
    return (
        <Image src={faker.image.urlLoremFlickr({ category: 'cat' })} alt={"analyze image"} width={166} height={166}/>
    )
}