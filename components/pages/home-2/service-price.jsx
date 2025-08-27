import Link from "next/link";
import { service2 } from "@/data/site";
import ServicePriceCard from "@/components/ui/cards/service-price-card";

export default function ServicePrice() {
    return (
        <div className="service-section bg-sand section-padding-140">
            <div className="container">
                <div className="section-heading text-center">
                    <span className="subtitle">Pricing plans</span>
                    <h2 className="section-heading__title">
                        pricing for our projects
                    </h2>
                </div>
                <div className="row gutter-y-default justify-content-center justify-content-md-start">
                    {/* service card price start */}
                    {service2?.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-10">
                            <ServicePriceCard data={item} />
                        </div>
                    ))}
                    {/* service card price end */}
                </div>
                <div className="section-note-text">
                    If you have a large-scale project - Call Us:{" "}
                    <Link href="/">+123 456789</Link>
                </div>
            </div>
        </div>
    );
}
