import ServicePriceCard from "@/components/ui/cards/service-price-card";
import { service2 } from "@/data/site";

export default function Service() {
    return (
        <div className="service-section bg-sand section-padding-140">
            <div className="container">
                <div className="row gutter-y-default justify-content-center justify-content-md-start">
                    {/* service card price start */}
                    {service2?.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-10">
                            <ServicePriceCard data={item} />
                        </div>
                    ))}
                    {/* service card price end */}
                </div>
            </div>
        </div>
    );
}
