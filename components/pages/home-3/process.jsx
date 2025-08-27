import { processes } from "@/data/site";
import ProcessCard from "./ui/process-card";

export default function Process() {
    return (
        <div className="process-section section-padding-140 bg-black">
            <div className="container">
                <div className="row justify-content-center gutter-y-default process-widget-devider">
                    {processes?.map((item, i) => (
                        <div
                            key={i}
                            className="col-lg-4 col-md-6"
                            data-aos-duration={1000}
                            data-aos="fade-left"
                            data-aos-delay
                        >
                            <ProcessCard data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
