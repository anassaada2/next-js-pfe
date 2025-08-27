import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Calculator from "@/components/pages/calculette/Calculator";
import Calculators from "@/components/pages/calculette/Calculators";
import Cta from "@/components/pages/faq/cta";
import Banner from "@/components/ui/sections/banner";
import React from "react";

function Calculette() {
  return (
    <>
      <Header />
      <Banner title="CALCULETTE" pathName="calculette" />
      <Calculator />

      <Footer />
    </>
  );
}

export default Calculette;
