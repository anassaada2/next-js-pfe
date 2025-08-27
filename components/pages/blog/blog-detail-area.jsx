import Image from "next/image";
import Link from "next/link";
import Categories3 from "./ui/categories-3";
import Categories2 from "./ui/categories-2";
import Categories from "./ui/categories";
import FindBox from "./ui/find-box";
import ReplayForm from "./ui/replay-form";
import CommentInfo from "./ui/comment-info";
import { comments } from "@/data/site";
import AuthorCard from "./ui/author-card";

export default function BlogDetailArea() {
    return (
        <div className="blog-details-section section-padding single-page-content">
            <div className="container">
                <div className="row gutter-60">
                    <div className="col-xxl-8 ">
                        <div className="blog-details-content mb-res-80">
                            <Image
                                height={681}
                                width={1116}
                                src="/image/blog/thumbnail-large-1.png"
                                alt="blog main thumbnail"
                                className="mb-res-60 w-100"
                            />
                            <div className="blog-meta mb-30">
                                <Link href="/">
                                    <Image
                                        height={22}
                                        width={22}
                                        src="/image/icons/icon-calender.svg"
                                        alt="icon"
                                    />
                                    <span>October 28, 20121</span>
                                </Link>
                                <Link href="/">
                                    <Image
                                        height={22}
                                        width={22}
                                        src="/image/icons/icon-bookmark.svg"
                                        alt="icon"
                                    />
                                    <span>Infrastructure</span>
                                </Link>
                                <Link href="/">
                                    <span>BY Kia Mastai</span>
                                </Link>
                            </div>
                            <p>
                                In a professional context it often happens that
                                private or corporate clients corder a
                                publication to be made and presented with the
                                actual content still not being ready. Think of a
                                news blog that’s filled with content hourly on
                                the day of going live. However, reviewers tend
                                to be distracted by comprehensible content, say,
                                a random text copied from a newspaper or the
                                internet. There are many variations of passages
                                of Lorem Ipsum available, but the majority have
                                suffered alteration in some form, by injected
                                humour
                            </p>
                            <p>
                                Morbi accumsan ipsum venec tellus a odio
                                tincidunt auctor Sed non mauris vitae erat
                                consequat auctor eu in elit. Class aptent taciti
                                sociosqu ad litora torquent per conubia nostra,
                                per inceptos himenaeos. Mauris in erat justo.
                                Nullam ac urna eu felispibus condimentum sit
                                amet a augue. Sed non neque elit
                            </p>
                            <blockquote>
                                &quot;Diam sollicitudin tempor id eu nisl nunc.
                                senectus et netus et malesuada fames ac turpis
                                egestas. Sed cras ornare arcu dui vivamus.&quot;
                            </blockquote>
                            <p>
                                In a professional context it often happens that
                                private or corporate clients corder a
                                publication to be made and presented with the
                                actual content still not being ready. Think of a
                                news blog that’s filled with content hourly on
                                the day of going live. However, reviewers tend
                                to be distracted by comprehensible content, say,
                                a random text copied from a newspaper or the
                                internet. There are many variations of passages
                                of Lorem
                            </p>
                            <div className="blog-details-content__footer">
                                <div className="tags">
                                    <Link href="/" className="btn-tag">
                                        Accessories
                                    </Link>
                                    <Link href="/" className="btn-tag">
                                        Decor
                                    </Link>
                                    <Link href="/" className="btn-tag">
                                        Material
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mb-res-80">
                            {/* author card start */}
                            <AuthorCard />
                            {/* author card end */}
                        </div>
                        <div className="mb-res-80">
                            <h3 className="heading-sm text-uppercase mb-30">
                                Comments
                            </h3>
                            <div className="gap-y-40">
                                {/* comments start */}
                                {comments?.map((item, i) => (
                                    <CommentInfo key={i} data={item} />
                                ))}
                                {/* comments end */}
                            </div>
                        </div>
                        <div className="contact-form">
                            <h3 className="heading-sm text-uppercase mb-30">
                                Leave a Reply
                            </h3>
                            {/* replay form start */}
                            <ReplayForm />
                            {/* replay form end */}
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
