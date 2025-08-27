import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import TeamItem from "@/components/pages/team/team-item";
import Banner from "@/components/ui/sections/banner";

export default function Team() {
    return (
        <>
            <Header />
            <Banner title="OUR TEAM" pathName="Our Team" />
            <TeamItem />
            <Footer />
        </>
    );
}
