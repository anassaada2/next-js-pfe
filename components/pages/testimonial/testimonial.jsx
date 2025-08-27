import TestimonialCard from "@/components/ui/cards/testimonial-card";
import { testimonials2 } from "@/data/site";

export default function Testimonial() {
    return (
        <div className="testimonial-section-02 bg-sand section-padding-140">
            <div className="container">
                <div className="row gutter-y-default justify-content-center justify-content-md-start">
                    {/* testimonial card start */}
                    {testimonials2?.map((item, i) => (
                        <div
                            key={i}
                            className="col-lg-4 col-md-6 col-sm-10"
                            data-aos-duration={item.animation}
                            data-aos="fade-right"
                        >
                            <TestimonialCard data={item} />
                        </div>
                    ))}
                    {/* testimonial card end */}
                </div>
            </div>
        </div>
    );
}
