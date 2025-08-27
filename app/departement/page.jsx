import Image from "next/image";
import "@/app/departement/Departement.scss";

function page() {
  return (
    <div className="container-departement">
      <div className=" container      ">
        {" "}
        <h1 className="text-center titre-departement     ">
          DÉCOUVREZ NOS DÉPARTEMENTS EXPERTISES
        </h1>
        <div className="d-flex  align-items-center  flex-column  flex-md-row  container  section-departement                 ">
          {" "}
          <Image
            src="/image/AFEC/equipe.jpg"
            width={250}
            height={250}
            className="img-fluid  image-departement        "
          />
          <div className="text-center hero-departement d-flex  flex-column   gap-2  mt-3    text-md-start    ">
            <h3>Département Génie Civil​</h3>
            <h6>"Expertise technique et innovation fondatrice"​</h6>
            <p className="aaa        ">
              Pilier historique d’ <span className="afec-span    "> AFEC </span>
              , ce département assure les études techniques, l’expertise
              structurelle et l’optimisation pluridisciplinaire des projets de
              construction.
              <br /> Nos ingénieurs conçoivent des solutions robustes,
              économiques et adaptatives, alliant normes réglementaires et défis
              terrain.​ À l’origine des premières innovations brevetées ({" "}
              <span className="span-ecoboot   "> POLY-BOOT™ </span> et{" "}
              <span className="span-ecoboot   "> ECO-BOOT™ </span> ), il incarne
              notre capacité à transformer les contraintes techniques en
              avancées concrètes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
