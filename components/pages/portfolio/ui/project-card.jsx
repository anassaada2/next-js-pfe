import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ data }) {
    return (
        <div className="project-card project-card--v2 d-block">
            <Link
                href="/portfolio-details"
                className="project-card__image d-block"
            >
                <Image
                    height={260}
                    width={347}
                    src={data.img}
                    alt="card"
                    className="object-image"
                />
            </Link>
            <div className="project-card__body">
                <div className="project-card__body-top">
                    <div className="project-card__body-texts">
                        <h3 className="project-card__title">
                            <Link href="/portfolio-details" className="d-block">
                                Brutalist lobby
                            </Link>
                        </h3>
                        <span className="project-card__category">
                            <Link href="/portfolio-details" className="d-block">
                                building
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="project-card__body-bottom">
                    <span className="project-card__date">2019</span>
                    <Link href="/portfolio-details" className="btn-link">
                        View Details
                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
