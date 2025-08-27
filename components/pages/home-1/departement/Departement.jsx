import Image from "next/image";
import "@/app/departement/Departement.scss";

function Departement() {
  return (
    <div className="container-departement">
      <div className=" container      ">
        {" "}
        <h1 className="text-center titre-departement     ">
          DÉCOUVREZ NOS DÉPARTEMENTS EXPERTISES
        </h1>
        <div className="d-flex align-items-center  align-items-md-start   flex-column  flex-md-row  container  section-departement                 ">
          {" "}
          <Image
            src="/image/AFEC/equipe.jpg"
            width={250}
            height={250}
            className="img-fluid  image-departement        "
            alt="logo"
          />
          <div className=" hero-departement d-flex  flex-column  gap-3       text-md-start    ">
            <h3>Département Génie Civil​</h3>
            <h4>"Expertise technique et innovation fondatrice"​</h4>
            <p className="aaa        ">
              Pilier historique d’ <span className="afec-span    "> AFEC </span>
              , ce département assure les études techniques, l’expertise
              structurelle et l’optimisation pluridisciplinaire des projets de
              construction.
              <br /> Nos ingénieurs conçoivent des solutions{" "}
              <span className="fw-bold text-dark    ">
                {" "}
                robustes, économiques et adaptatives{" "}
              </span>{" "}
              , alliant normes réglementaires et défis terrain.​ À l’origine des
              premières innovations brevetées ({" "}
              <span className="fw-bold text-dark   "> POLY-BOOT™ </span> et{" "}
              <span className="fw-bold text-dark   "> ECO-BOOT™ </span> ), il
              incarne notre capacité à transformer les contraintes techniques en
              avancées concrètes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Departement;
