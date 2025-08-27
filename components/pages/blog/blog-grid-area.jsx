import ArticleCard from "@/components/ui/cards/article-card";
import Pagination from "@/components/ui/sections/pagination";
import { blogs } from "@/data/site";

export default function BlogGridArea() {
    return (
        <div className="blog-section bg-sand section-padding">
            <div className="container">
                <div className="row justify-content-center gutter-y-default mb-res-80">
                    {/* blog article start */}
                    {blogs?.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-8">
                            <ArticleCard data={item} />
                        </div>
                    ))}
                    {/* blog article end */}
                </div>
                <Pagination />
            </div>
        </div>
    );
}
