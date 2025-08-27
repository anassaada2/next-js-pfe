import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import BlogDetailArea from "@/components/pages/blog/blog-detail-area";
import Banner from "@/components/ui/sections/banner";

export default function BlogDetails() {
    return (
        <>
            <Header />
            <Banner
                title="EASY WAYS TO PREVENT GUTTER PROBLEMS"
                pathName="Easy Ways To Prevent Gutter Problems"
            />
            <BlogDetailArea />
            <Footer />
        </>
    );
}
