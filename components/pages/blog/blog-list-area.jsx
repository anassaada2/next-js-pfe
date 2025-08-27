import BlogCard from "@/components/ui/cards/blog-card";
import Pagination from "@/components/ui/sections/pagination";
import { blogs } from "@/data/site";

export default function BlogListArea() {
    return (
        <div className="bg-sand section-padding border-bottom">
            <div className="container">
                <div className="row gutter-y-default mb-res-80">
                    {/* blog card start */}
                    {blogs?.slice(0, 8).map((item, i) => (
                        <div key={i} className="col-xl-6">
                            <BlogCard data={item} />
                        </div>
                    ))}
                    {/* blog card end */}
                </div>
                <Pagination />
            </div>
        </div>
    );
}
