'use client'
type Cards = {
    cardSrc: string, propSrc: string, name: string, username: string
}
function Card({cardSrc, propSrc, name, username}: Cards) {
    const onClick = () => {
        alert(name);
    }
    return (
        <article className="card mt-3">
            <div>
                <img
                    className="card-img"
                    src={cardSrc}
                    alt="background-pic"
                />
            </div>
            <div className="profile">
                <img
                    className="prof-img"
                    src={propSrc}
                />
                <h3 className="alias">{name}</h3>
                <p className="username">{username}</p>
                <button onClick={onClick}>Follow</button>
            </div>
        </article>
    );
}

export default Card;