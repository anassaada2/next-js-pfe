import { philosophyProgress } from "@/data/site";
import classNames from "classnames";
import "@/public/scss/sections/philosophy/philosophy.scss";

export default function Philosophy({ style }) {
  // style of philosophy section
  const className = classNames("content-section", {
    "padding-bottom-140": style === "home-1",
    "section-padding-140": style === "about",
  });

  return (
    <div className={className}>
      <div className="container">
        <div className="row align-items-center justify-content-center gutter-y-40">
          <div
            className="col-xl-5 col-lg-6 col-md-8 col-auto"
            data-aos-duration={1000}
            data-aos="fade-right"
          >
            <div className="content-text-block text-center text-lg-start">
              <span className="subtitle">Nos Services</span>
              <h2 className="content-title heading-md text-black mb-32">
                Expertise en Études, Conseils et Suivi de Projets de
                Construction{" "}
              </h2>
              <p>
                Nous offrons un large éventail de services adaptés aux besoins
                spécifiques de nos clients :
              </p>
            </div>
          </div>
          <div className=" offset-xl-1 col-xl-6  col-lg-6 col-12">
            <div className="progressbar-block">
              {philosophyProgress?.map((item, i) => (
                <div key={i} className="progressbar-single">
                  <div className="progressbar-label">
                    <span>{item.label}</span>
                  </div>
                  <div
                    className="progressbar aos-init aos-animate"
                    data-aos-duration="1000"
                    data-aos="animate-progress"
                  >
                    <span
                      className="bar"
                      style={{ width: item.value + "%" }}
                      data-aos-duration="1000"
                      data-aos="fade-right"
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" container">
          <div className="content-text-block text-center text-lg-start mt-5">
            <div className="ligne-horizontale"></div>
            <span className="subtitle">Expansion et avenir</span>

            <p>
              <span className="afec-span"> AFEC </span> opère principalement en
              Tunisie, tout en réalisant certaines missions d’études en France
              et en Afrique.
              <br /> Nous sommes actuellement en phase d’expansion vers le
              marché européen et prévoyons de participer activement au
              développement du secteur du génie civil en Afrique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
