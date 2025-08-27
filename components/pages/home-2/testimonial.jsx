import { testimonials2 } from "@/data/site";
import TestimonialCard from "../../ui/cards/testimonial-card";

export default function Testimonial() {
    return (
        <div
            className="testimonial-section-02 overlay bg-fixed section-padding-140"
            style={{
                backgroundImage:
                    'url("image/home-1/testimonial-background.png")',
            }}
        >
            <div className="container">
                <div className="row gutter-y-default justify-content-center justify-content-md-start">
                    {/* testimonial card start */}
                    {testimonials2?.slice(0, 3)?.map((item, i) => (
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
