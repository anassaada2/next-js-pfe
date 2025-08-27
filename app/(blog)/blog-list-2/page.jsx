import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import BlogList2Area from "@/components/pages/blog/blog-list2-area";
import Banner from "@/components/ui/sections/banner";

export default function BlogList2() {
    return (
        <>
            <Header />
            <Banner
                title="BLOG LIST WITH SIDEBAR"
                pathName="Blog List With Sidebar"
            />
            <BlogList2Area />
            <Footer />
        </>
    );
}
