import Brand from "@/components/pages/home-1/brand";
import Image from "next/image";
import "@/components/ui/sections/faq.scss";
import { fetchProjets } from "@/lib/fetchData";

export default async function Faq() {
  const { projets } = await fetchProjets();

  return (
    <div className="faq-section section-padding-100">
      <div className="container">
        <div className="faq-brand row row--custom gutter-y-40">
          <div className="col-xxl-4 col-lg-5 col-md-9">
            <div className="faq-content">
              <div className="faq-content__text-block">
                <span className="anas-title text-uppercase">Nos Projets</span>
                <h1 className="faq-content__title heading-md text-black mb-res-60">
                  L’Innovation à l’Épreuve de la Réalité
                </h1>
                <Image
                  height={180}
                  width={280}
                  src="/image/AFEC/projets.jpg"
                  alt="logo"
                />
              </div>
            </div>
          </div>

          <div className="col-xxl-7 offset-lg-1 col-lg-6">
            <div className="accordion-style" id="faq-02">
              {/* Projets dynamiques */}
              {projets.map((projet, index) => {
                const collapseId = `faq-02-item-${index}`;
                return (
                  <div className="accordion-item" key={projet._id}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded="false"
                      aria-controls={collapseId}
                    >
                      {projet.titre}
                    </button>
                    <div
                      id={collapseId}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-02"
                    >
                      <div className="accordion-item__body">
                        {projet.taches && projet.taches.length > 0 ? (
                          <ul>
                            {projet.taches.map((tache, i) => (
                              <li key={i}>● {tache}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>Aucune tâche définie</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

      
            </div>
          </div>
        </div>

        {/* Section partenaires */}
        <div className="text-center mb-5">
          <h4 className="anas-title text-uppercase">nos partenaires</h4>
          <h1>
            Nos principaux clients potentiels qui nous ont accordé leur
            confiance
          </h1>
        </div>
        <Brand />
      </div>
    </div>
  );
}
