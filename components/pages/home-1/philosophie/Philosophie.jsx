import Image from "next/image";
import Link from "next/link";
import "@/components/pages/home-1/philosophie/philosophie.scss";

export default function Philosophie() {
  return (
    <div className="about-section padding-top-140 philosophie-container    mb-5">
      <div className="container   ">
        <div className="row gutter-x-40 align-items-center   text-center d-flex  align-items-center justify-content-center     ">
          <span className="anas-title">Notre Philosophie </span>
          <h2 className="content-title heading-md mb-32    ">
            "Construire l'Avenir avec Responsabilité & Innovation"
          </h2>
          <p className="text-start philosophie-pa  ">
            Chez <span className="afec-span        "> AFEC </span> , nous
            croyons que l'ingénierie moderne doit allier{" "}
            <span className="fw-bold text-dark   ">
              {" "}
              rigueur technique, ambition environnementale{" "}
            </span>{" "}
            et <span className="fw-bold text-dark    "> vision humaine. </span>
            <br /> Notre mission va au-delà de la simple conception de
            structures :<br /> nous façonnons des écosystèmes résilients où la
            sécurité, la durabilité et l'efficacité coexistent harmonieusement.
          </p>
        </div>
      </div>
    </div>
  );
}
