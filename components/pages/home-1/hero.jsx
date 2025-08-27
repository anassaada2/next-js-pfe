import C from "@/assets/plugins/highlight.js/languages/1c";
import CircularTextSvg from "@/components/ui/circularText/CircularTextSvg";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  return (
    <section className="hero-section-01 bg-black">
      <div className="container">
        <div className="row row--hero-content">
          <div className="col-xxl-auto ">
            <div className="hero-content mb-140">
              <h1 className="hero-content__title heading-xl text-sand">
                Accuracy For Exceptionnel Construction{" "}
              </h1>
              <p className="p-hero-content           ">
                <span> AFEC</span> est un bureau d'études et de développement
                spécialisé dans l’ingénierie et les études de projets complexes
                de génie civil et de sécurité incendie
              </p>
              <p></p>
            </div>
          </div>
        </div>
        <div className="col-xxl-auto">
          <div className="hero-content__image">
            <img
              src="/image/AFEC/anas.jpg"
              alt="hero image"
              className="img-fluid home-image  "
            />
            <div className="hero-content__navigation-circle-wrapper">
              <div className="hero-content__navigation-circle">
                <Image
                  height={258}
                  width={258}
                  src="/image/home-1/navigation-image.png"
                  alt="icon"
                  className="w-100 h-auto"
                />
                <Link
                  href="/calculette"
                  className="hero-content__navigation-circle-text d-block"
                >
                  <CircularTextSvg />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
