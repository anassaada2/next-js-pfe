import Pagination from "@/components/ui/sections/pagination";
import ProjectCard from "./ui/project-card";
import { projects } from "@/data/site";

export default function Project() {
    return (
        <div className="project-section bg-sand section-padding">
            <div className="container">
                <div className="row gutter-y-default justify-content-center mb-res-80">
                    {/* portfolio service card start */}
                    {projects?.map((item, i) => (
                        <div key={i} className="col-md-6 col-sm-11">
                            <ProjectCard data={item} />
                        </div>
                    ))}
                    {/* portfolio service card end */}
                </div>
                <Pagination />
            </div>
        </div>
    );
}
