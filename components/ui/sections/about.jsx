import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="about-section padding-top-140">
      <div className="container">
        <div className="row gutter-x-40 align-items-center row align-items-center justify-content-center gutter-y-40">
          <div
            className="col-xl-5  col-lg-5 col-md-6 col-xs-7 col-8"
            data-aos-duration={1000}
            data-aos="fade-right"
          >
            <div className="about-image-3">
              <Image
                height={214}
                width={210}
                src="/image/AFEC/logo.png"
                alt="structure"
                className="w-100 h-auto"
              />
            </div>
          </div>
          <div
            className="offset-xl-1  col-xxl-6 col-xl-6 col-lg-7 col-md-8 col-auto"
            data-aos-duration={1000}
            data-aos="fade-left"
          >
            <div className="content-text-block-wrapper">
              <div className="content-text-block">
                <span className="anas-title text-uppercase  ">
                  A propos de AFEC{" "}
                </span>
                <h2 className="content-title heading-md mb-32">
                  Ingénierie et Innovation au Service du Génie Civil et de la
                  Sécurité Incendie
                </h2>
                <p>
                  <span className="afec-span"> AFEC</span> est un bureau
                  d'études et de développement spécialisé dans l’ingénierie et
                  les études de projets complexes de génie civil et de sécurité
                  incendie.
                  <br /> Nous intervenons sur une large gamme de secteurs,
                  notamment les projets pétroliers, industriels, hôteliers, les
                  ouvrages d'art, les ouvrages hydrauliques, maritimes,
                  géotechniques ainsi que les VRD .<br /> Notre expertise se
                  distingue par une approche axée sur la recherche et le
                  développement de solutions innovantes et écologiques.
                  <br /> Grâce à cette démarche,{" "}
                  <span className="afec-span"> AFEC</span> est en mesure
                  d'apporter des solutions à la fois performantes,
                  économiquement avantageuses et durables.
                </p>
              </div>
              <div className="content-button-block">
                <Link
                  href="/contact"
                  className="btn btn-primary hvr-fill-black"
                >
                  Contacter nous
                  <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
