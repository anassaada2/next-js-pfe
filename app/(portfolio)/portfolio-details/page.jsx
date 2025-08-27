import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import PortfolioDetail from "@/components/pages/portfolio/portfolio-detail";
import Banner from "@/components/ui/sections/banner";

export default function PortfolioDetails() {
    return (
        <>
            <Header />
            <Banner title="Brutalist lobby" pathName="Brutalist Lobby" />
            <PortfolioDetail />
            <Footer />
        </>
    );
}
