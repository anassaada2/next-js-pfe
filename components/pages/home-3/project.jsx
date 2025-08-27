import ProjectCard from "@/components/ui/cards/project-card";
import { projects } from "@/data/site";

export default function Project() {
    return (
        <div className="project-section bg-black padding-top-140">
            <div className="container">
                <div className="section-heading text-center mb-res-60">
                    <span className="subtitle text-scorpion">
                        OUR PORTFOLIO
                    </span>
                    <h2 className="section-heading__title heading-md text-sand">
                        LAST PROJECTS WE DESIGNED
                    </h2>
                </div>
                <div className="row gutter-y-default justify-content-center">
                    {projects?.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-11">
                            <ProjectCard data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
