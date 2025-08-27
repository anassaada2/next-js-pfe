import BlogCard from "@/components/ui/cards/blog-card";
import { blogs } from "@/data/site";

export default function Blog() {
    return (
        <div className="blog-section bg-sand">
            <div className="container">
                <div className=" section-padding border-bottom">
                    <div className="section-heading text-center">
                        <span className="subtitle">Latest Articles</span>
                        <h2 className="section-heading__title">
                            Our recent News &amp; articles
                        </h2>
                    </div>
                    <div className="row gutter-y-default">
                        {/* blog card start */}
                        {blogs?.slice(0, 4).map((item, i) => (
                            <div key={i} className="col-xl-6">
                                <BlogCard data={item} />
                            </div>
                        ))}
                        {/* blog card end */}
                    </div>
                </div>
            </div>
        </div>
    );
}
