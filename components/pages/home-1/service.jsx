import ServiceCard from "./ui/service-card";
import { fetchServices } from "@/lib/fetchData";

export default async function Service() {
  const {services} = await fetchServices() 
  return (
    <div className="service-section        bg-sand section-padding-140">
      <div className="container">
        <div className="section-heading text-center">
          <span className="anas-title">Nos services</span>
          <h2 className="section-heading__title">
            L’excellence au service de demain
          </h2>
        </div>
        <div className="row gutter-y-default justify-content-center justify-content-md-start">
          {services?.map((item, i) => (
            <div
              key={i}
              className="col-lg-4 col-md-6 col-sm-10"
              data-aos="fade-up"
              data-aos-delay={item.animation}
            >
              <ServiceCard data={item} />
            </div>
          ))}
        </div>
        <div className="section-note-text">
          Faisons de votre idée une réalité, appelez-nous !{" "}
          <a>+216 97 760 754</a>
        </div>
      </div>
    </div>
  );
}
