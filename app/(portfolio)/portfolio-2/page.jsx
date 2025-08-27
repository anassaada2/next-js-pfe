import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Project from "@/components/pages/portfolio/project";
import Banner from "@/components/ui/sections/banner";

export default function portfolio2() {
    return (
        <>
            <Header />
            <Banner title="PORTFOLIO V2" pathName="Portfolio V2" />
            <Project />
            <Footer />
        </>
    );
}
