import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import PortfolioItem from "@/components/pages/portfolio/portfolio-item";
import Banner from "@/components/ui/sections/banner";

export default function portfolio1() {
    return (
        <>
            <Header />
            <Banner title="PORTFOLIO V1" pathName="Portfolio V1" />
            <PortfolioItem />
            <Footer />
        </>
    );
}
