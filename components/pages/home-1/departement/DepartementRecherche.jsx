import Image from "next/image";
import "@/app/departement/Departement.scss";

function DepartementRecherche() {
  return (
    <div className="container-departement">
      <div className=" container      ">
        <div className="d-flex    align-items-center  align-items-md-start                    flex-column  flex-md-row  container  section-departement                 ">
          {" "}
          <Image
            src="/image/AFEC/departement-recherche.JPG"
            width={250}
            height={250}
            className="img-fluid  image-departement        "
            alt="logo"
          />
          <div className="hero-departement d-flex  flex-column   gap-3      text-md-start    ">
            <h3>Département Recherche & Développement </h3>
            <h4>""Passeur de technologies vers l'industrie du futur"</h4>
            <p className="aaa        ">
              Ce pôle stratégique développe des innovations opérationnelles et
              brevetables, en synergie étroite avec le Génie Civil.
              <br />
              Il a perfectionné les systèmes{" "}
              <span className="fw-bold text-dark  "> POLY-BOOT™ </span> et{" "}
              <span className="fw-bold text-dark"> ECO-BOOT™ </span> , et créé
              des outils pragmatiques comme la{" "}
              <span className="fw-bold text-dark  ">
                {" "}
                CALCULETTE VITESSE DE COULAGE®
              </span>
              .​ Nos recherches actuelles ciblent l’optimisation des procédés
              constructifs et l’élargissement de notre offre via une veille
              techno-environnementale active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartementRecherche;
