import { blogs } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

export default function Categories2() {
    return (
        <div className="sidebar-post-wrapper">
            {/* category blog start */}
            {blogs?.slice(0, 3).map((item, i) => (
                <div key={i} className="blog-media h-100 blog-media--small">
                    <div className="blog-media__image">
                        <Image
                            height={96}
                            width={110}
                            src={item.img}
                            alt="blog"
                            className="object-image"
                        />
                    </div>
                    <div className="blog-media__body">
                        <h3 className="blog-media__title">
                            <Link href="/blog-details">{item.title}</Link>
                        </h3>
                        <span className="date">jan 19, 2023</span>
                    </div>
                </div>
            ))}
            {/* category blog end */}
        </div>
    );
}
