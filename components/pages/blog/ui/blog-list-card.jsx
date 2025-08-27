import Image from "next/image";
import Link from "next/link";

export default function BlogListCard({ data }) {
    return (
        <div className="single-slide">
            <div className="blog-card h-100 blog-card--large">
                <div className="blog-card__image">
                    <Image
                        height={520}
                        width={1116}
                        src={data.img}
                        alt="blog"
                        className="object-image"
                    />
                    <div className="blog-card__date">
                        <span className="day">19</span>
                        <span className="month">Jan</span>
                    </div>
                </div>
                <div className="blog-card__body">
                    <div className="blog-card__categories">
                        <Link
                            href="/blog-details"
                            className="blog-card__category"
                        >
                            ARCHITECTURE
                        </Link>
                        ,
                        <Link
                            href="/blog-details"
                            className="blog-card__category"
                        >
                            FURNITURE
                        </Link>
                    </div>
                    <h3 className="blog-card__title">
                        <Link href="/blog-details">
                            Easy ways to prevent gutter problems
                        </Link>
                    </h3>
                    <Link href="/blog-details" className="btn-link">
                        Read More
                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
