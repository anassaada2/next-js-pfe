import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import BlogListArea from "@/components/pages/blog/blog-list-area";
import Banner from "@/components/ui/sections/banner";

export default function BlogList() {
    return (
        <>
            <Header />
            <Banner title="Blog List" pathName="Blog List" />
            <BlogListArea />
            <Footer />
        </>
    );
}
