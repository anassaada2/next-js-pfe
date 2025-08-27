import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ data }) {
    return (
        <div className="blog-media h-100">
            <div className="blog-media__image">
                <Image
                    height={305}
                    width={219}
                    src={data.img}
                    alt="blog"
                    className="object-image"
                />
                <div className="blog-media__date">
                    <span className="day">19</span>
                    <span className="month">Jan</span>
                </div>
            </div>
            <div className="blog-media__body">
                <div className="blog-media__categories">
                    <Link href="/home-3" className="blog-media__category">
                        ARCHITECTURE
                    </Link>
                    ,
                    <Link href="/home-3" className="blog-media__category">
                        FURNITURE
                    </Link>
                </div>
                <h3 className="blog-media__title">
                    <Link href="/blog-details">{data.title}</Link>
                </h3>
                <Link href="/blog-details" className="btn-link">
                    Read More
                    <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                </Link>
            </div>
        </div>
    );
}
