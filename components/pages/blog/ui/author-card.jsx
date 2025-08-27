import Image from "next/image";

export default function AuthorCard() {
    return (
        <div className="author-card">
            <div className="author-card__image">
                <Image
                    height={140}
                    width={140}
                    src="/image/common/single-team-image.png"
                    alt="author"
                />
            </div>
            <div className="author-card__body">
                <p>
                    Legal expertise and is client focused we enhance
                    entrepreneurial environment flexible supportive, allowing
                </p>
                <h3 className="author-card__name">Mia Davis</h3>
                <span className="author-card__position">Writer</span>
            </div>
        </div>
    );
}
