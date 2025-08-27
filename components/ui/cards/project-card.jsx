import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ data }) {
    return (
        <Link href="/portfolio-details" className="project-card d-block">
            <div className="project-card__image">
                <Image
                    height={331}
                    width={402}
                    src={data.img}
                    alt="card"
                    className="object-image h-auto"
                />
            </div>
            <div className="project-card__body">
                <div className="project-card__body-top">
                    <div className="project-card__body-texts">
                        <h3 className="project-card__title">Brutalist lobby</h3>
                        <span className="project-card__category">building</span>
                    </div>
                    <span className="project-card__date">2019</span>
                </div>
                <div className="project-card__body-bottom">
                    <span className="project-card__button  hvr-fill-black">
                        view details
                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
