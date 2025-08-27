import { getServiceById, getSolutionById } from "@/lib/fetchData";
import React from "react";
import Image from "next/image";
import { avantages, etape, certif } from "@/data/site";
import Etape from "@/components/pages/service/Etape";
import TableauPolyBoot from "@/components/pages/service/TableauPolyBoot";
import { formatDescription } from "@/lib/mesfonctions";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Banner from "@/components/ui/sections/banner";

async function page({ params }) {
  const service = await getSolutionById(params.id);
  if (!service) {
    return <div>Service non trouvé</div>;
  }

  return (
    <>
      <Header />
      <Banner title={service.name} pathName={service.name} />
      <div className="service-details_main-section section-padding-140 single-page-content">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-12">
              <div className="service-details_main-image">
                <Image
                  height={606}
                  width={1116}
                  src="/image/AFEC/equipe.jpg"
                  alt="service image"
                  className="w-100 h-auto"
                />
              </div>
            </div>
            <div className="">
              <h3>
                Une collaboration innovante pour la construction de demain
              </h3>
              <p>
                Notre produit est développé en partenariat avec{" "}
                <strong>POLYBAT</strong> , spécialiste de la transformation du
                polystyrène et acteur majeur du secteur du bâtiment.
                <br /> Grâce à son expertise, <strong>POLYBAT</strong> conçoit
                des solutions alliant économie, sécurité et rapidité, répondant
                aux exigences modernes de performance et de durabilité.
                <br /> Engagée dans l'innovation et la transition écologique,
                l'entreprise intègre des technologies avancées pour relever les
                défis environnementaux actuels.
                <br /> Fort de ce partenariat, nous introduisons aujourd’hui{" "}
                <strong> {service.name} </strong> , une réponse innovante aux
                défis de la construction moderne.
              </p>
            </div>
            <div className="col-lg-12">
              <div className="row service-details_main-image-row">
                {service.images?.map((img, index) => (
                  <div className="col-6" key={index}>
                    <Image
                      height={270}
                      width={170}
                      src={img}
                      alt={img.alt || `polyboot-${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <h3>A PROPOS {service.name}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: formatDescription(service) }}
              ></p>
            </div>
            <div className=" mt-5 ">
              <h3>Avantages de {service.name}</h3>
              <ul className="list-style-bullet">
                {service.avantages.map((item, index) => (
                  <li key={index} className="">
                    <p>
                      <strong>{item.titre}</strong> : {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="ecarteur mt-md-5">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8  mt-2 mt-md-3 mt-lg-5 ">
                <h3>
                  l'ecarteur : un élément clé pour la précision et l'efficacité
                </h3>

                <p className=" responsive-p   ">{service.ecarteur}</p>
              </div>

              <div className="col-12 col-md-4   mt-2 mt-md-3 mt-lg-4">
                <img
                  src="/image/AFEC/ecarteur.png"
                  alt="ecarteur"
                  className="image-ecarteur img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container  mt-5             ">
          <h3>Spécifications Techniques</h3>
          <TableauPolyBoot service={service.specifications} />
        </div>
        <div className="container">
          <div className="row service-details_main-image-row">
            <h3>Dessin Technique</h3>

            {service.dessinTechnique?.sectionBlocs && (
              <div className="col-6">
                <Image
                  height={470}
                  width={470}
                  src={service.dessinTechnique.sectionBlocs}
                  alt="Dessin technique - Section Blocs"
                />
              </div>
            )}

            {service.dessinTechnique?.sectionDalle && (
              <div className="col-6">
                <Image
                  height={470}
                  width={470}
                  src={service.dessinTechnique.sectionDalle}
                  alt="Dessin technique - Section Dalle"
                />
              </div>
            )}
          </div>
        </div>

        <div className="container  mt-5             ">
          <h3>Processus d'Installation</h3>
          <Etape service={service.processusInstallation} />
        </div>
        <div className="container ">
          <div className="row       ">
            <div className="  ">
              {" "}
              <h3>Certifications de POLY-BOOT </h3>
              <ul className="list-style-bullet">
                {service.certifications.map((item, index) => (
                  <li key={index} className="">
                    <p>
                      <strong>{item.titre}</strong> : {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row ">
            <div className="">
              <h3>Saviez-vous?</h3>
              <p>
                {service.saviezVous.includes(service.name) ? (
                  <>
                    {service.saviezVous
                      .split(service.name)
                      .map((part, index, array) => (
                        <React.Fragment key={index}>
                          {part}
                          {index !== array.length - 1 && (
                            <strong>{service.name}</strong>
                          )}
                        </React.Fragment>
                      ))}
                  </>
                ) : (
                  service.saviezVous
                )}
              </p>
            </div>
          </div>
        </div>
        {service.pdf && (
          <a
            href={service.pdf}
            target="_blank"
            download
            rel="noopener noreferrer"
            className="hvr-fill-black"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Télécharger le PDF
          </a>
        )}
      </div>
      <Footer />
    </>
  );
}

export default page;
