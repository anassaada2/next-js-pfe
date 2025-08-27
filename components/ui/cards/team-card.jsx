import Link from "next/link";

export default function TeamCard({ data }) {
    return (
        <div className="team-card">
            <div className="team-card__image">
                <img src={data.img} className="object-image" alt="team user" />
                <div className="hover-elements">
                    <Link href="/">Fb</Link>
                    <Link href="/">Tw</Link>
                    <Link href="/">Li</Link>
                </div>
            </div>
            <div className="team-card__body">
                <h3 className="team-card__title">
                    <Link href="/team-details" className="anchor-color-reset">
                        {data.name}
                    </Link>
                </h3>
                <span>{data.designation}</span>
            </div>
        </div>
    );
}
