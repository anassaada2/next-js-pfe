import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import BlogGridArea from "@/components/pages/blog/blog-grid-area";
import Banner from "@/components/ui/sections/banner";

export default function BlogGrid() {
    return (
        <>
            <Header />
            <Banner title="Blog Grid" pathName="Blog Grid" />
            <BlogGridArea />
            <Footer />
        </>
    );
}
