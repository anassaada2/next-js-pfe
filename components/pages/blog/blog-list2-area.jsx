import { blogs } from "@/data/site";
import BlogListCard from "./ui/blog-list-card";
import FindBox from "./ui/find-box";
import Categories from "./ui/categories";
import Categories2 from "./ui/categories-2";
import Categories3 from "./ui/categories-3";

export default function BlogList2Area() {
    return (
        <div className="blog-list-section bg-sand section-padding">
            <div className="container">
                <div className="row gutter-60">
                    <div className="col-xxl-8">
                        <div className="blog-list-wrapper">
                            {/* blog article card start  */}
                            {blogs?.slice(0, 5).map((item, i) => (
                                <BlogListCard key={i} data={item} />
                            ))}
                            {/* blog article card end  */}
                        </div>
                    </div>
                    <div className="col-xxl-4">
                        <div className="blog-sidebar">
                            {/* find box start */}
                            <FindBox />
                            {/* find box end */}
                            <div className="single-sidebar">
                                <h3 className="blog-sidebar__title">
                                    Categories
                                </h3>
                                {/* categories 1 start */}
                                <Categories />
                                {/* categories 1 end */}
                            </div>
                            <div className="single-sidebar">
                                <h3 className="blog-sidebar__title">
                                    Categories
                                </h3>
                                {/* categories 2 start */}
                                <Categories2 />
                                {/* categories 2 end */}
                            </div>
                            <div className="single-sidebar">
                                <h3 className="blog-sidebar__title">
                                    Categories
                                </h3>
                                {/* categories 3 start */}
                                <Categories3 />
                                {/* categories 3 end */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
