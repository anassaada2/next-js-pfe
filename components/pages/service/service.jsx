import ServiceCard from "@/components/ui/cards/service-card";
import { fetchServices } from "@/lib/fetchData";

export default async function Service() {
    const {services} = await fetchServices() 
  
  return (
    <div className="blog-section section-padding bg-sand">
      <div className="container">
        <div className="row gutter-y-default">
          {services?.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="service-card__wrapper">
                <ServiceCard data={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
