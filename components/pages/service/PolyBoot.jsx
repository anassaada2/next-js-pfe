import Image from "next/image";
import { avantages, etape, certif } from "@/data/site";
import Tableau from "./Tableau";
import Etape from "./Etape";
import TableauPolyBoot from "./TableauPolyBoot";

function PolyBoot() {
  return (
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
            <h3>Une collaboration innovante pour la construction de demain</h3>
            <p>
              Notre produit est développé en partenariat avec{" "}
              <strong>POLYBAT</strong> , spécialiste de la transformation du
              polystyrène et acteur majeur du secteur du bâtiment.
              <br /> Grâce à son expertise, <strong>POLYBAT</strong> conçoit des
              solutions alliant économie, sécurité et rapidité, répondant aux
              exigences modernes de performance et de durabilité.
              <br /> Engagée dans l'innovation et la transition écologique,
              l'entreprise intègre des technologies avancées pour relever les
              défis environnementaux actuels.
              <br /> Fort de ce partenariat, nous introduisons aujourd’hui{" "}
              <strong>POLY BOOT</strong> , une réponse innovante aux défis de la
              construction moderne.
            </p>
          </div>
          <div className="col-lg-12">
            <div className="row service-details_main-image-row">
              <div className="col-6">
                <Image
                  height={270}
                  width={170}
                  src="/image/AFEC/polyboot1.jpg"
                  alt="service image"
                />
              </div>
              <div className="col-6">
                <Image
                  height={270}
                  width={170}
                  src="/image/AFEC/polyboot2.jpg"
                  alt="service image"
                />
              </div>
            </div>
          </div>{" "}
          <div className="">
            <h3>A PROPOS POLY-BOOT</h3>
            <p>
              <strong> POLY-BOOT </strong> est un système de coffrage perdu en
              polystyrène destiné aux dalles réticulées en béton armé.
              <br /> Il permet de réduire l'utilisation de béton et d'acier tout
              en améliorant la capacité de charge et la résistance au feu.
              <br /> Conçu pour éviter les poutres apparentes, il facilite
              l'installation et offre une meilleure finition esthétique.
              <br /> <strong> POLY-BOOT </strong> se distingue par son
              optimisation structurelle et ses économies sur les matériaux, tout
              en répondant aux normes de construction modernes.
            </p>
          </div>
          <div className=" mt-5 ">
            <h3>Avantages de POLY-BOOT</h3>
            <ul className="list-style-bullet">
              {avantages.map((item, index) => (
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
              <p className=" responsive-p   ">
                <span className="fw-bold text-dark"> POLY-BOOT </span> est une
                solution innovante de coffrage conçu pour simplifier la
                construction de dalles réticulées.
                <br /> Fabriqué en polystyrène,{" "}
                <span className="fw-bold text-dark"> POLY-BOOT </span> rend les
                planchers plus légers et plus économiques.
                <br /> Idéal pour des projet variés,{" "}
                <span className="fw-bold text-dark"> POLY-BOOT </span> permet
                aux professionnels de réaliser des planchers élégants, sans
                compromis sur la qualité ou la durabilité.
                <br /> En offrant à la fois flexibilité et facilité
                d’installation,{" "}
                <span className="fw-bold text-dark"> POLY-BOOT </span> s’impose
                comme un choix privilégie pour des constructions innovantes,
                plus économiques et respectueuses de l’environnement.
              </p>
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
        {/*<TableauPolyBoot />  */}
      </div>
      <div className="container">
        <div className="row service-details_main-image-row">
          <h3>Dessin Technique</h3>
          <div className="col-6">
            <Image
              height={470}
              width={470}
              src="/image/AFEC/poly-dessin2.jpg"
              alt="service image"
            />
          </div>
          <div className="col-6">
            <Image
              height={470}
              width={470}
              src="/image/AFEC/poly-dessin.jpg"
              alt="service image"
            />
          </div>
        </div>{" "}
      </div>

      <div className="container  mt-5             ">
        <h3>Processus d'Installation</h3>
        {/* <Etape />*/}
      </div>
      <div className="container ">
        <div className="row       ">
          <div className="  ">
            {" "}
            <h3>Certifications de POLY-BOOT </h3>
            <ul className="list-style-bullet">
              {certif.map((item, index) => (
                <li key={index} className="">
                  <p>
                    <strong>{item.title}</strong> : {item.description}
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
              Les modules <span className="fw-bold text-dark">POLY-BOOT</span>{" "}
              permettent non seulement une économie de béton allant jusqu’à 40
              %, mais aussi une réduction des armatures de 10 à 15 %, tout en
              augmentant les portées des dalles jusqu’à 15 mètres.
              <br /> Grâce à leur légèreté et leur conception innovante, ils
              offrent une alternative durable et économique pour les projets de
              construction modernes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolyBoot;
