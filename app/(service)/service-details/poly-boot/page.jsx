import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import PolyBoot from "@/components/pages/service/PolyBoot";
import ServiceDetail from "@/components/pages/service/service-detail";
import Banner from "@/components/ui/sections/banner";
import React from "react";

function page() {
  return (
    <>
      <Header />
      <Banner title="POLY-BOOT" pathName="POLY-BOOT" />
      <PolyBoot />
      <Footer />
    </>
  );
}

export default page;
