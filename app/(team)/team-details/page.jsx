import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import TeamDetail from "@/components/pages/team/team-detail";
import Banner from "@/components/ui/sections/banner";

export default function TeamDetails() {
    return (
        <>
            <Header />
            <Banner title="HALINA ZAJAC" pathName="Halina Zając" />
            <TeamDetail />
            <Footer />
        </>
    );
}
