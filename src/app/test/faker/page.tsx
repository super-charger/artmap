
import {faker} from "@faker-js/faker/locale/ar";
import Card from "@/app/test/faker/_components/Card";


export default function App() {

    return (
        <>
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
            <Card cardSrc={faker.image.avatarGitHub()} propSrc={faker.image.urlLoremFlickr({ category: 'cat' })} username={faker.animal.cat()} name={faker.animal.bird()} />
        </>

    )
}
