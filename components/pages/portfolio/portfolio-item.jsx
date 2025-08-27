import ProjectCard from "@/components/ui/cards/project-card";
import Pagination from "@/components/ui/sections/pagination";
import { portfolio1 } from "@/data/site";

export default function PortfolioItem() {
    return (
        <div className="project-section section-padding">
            <div className="container">
                <div className="row gutter-y-default justify-content-center mb-res-80">
                    {/* portfolio item start */}
                    {portfolio1?.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-11">
                            <ProjectCard data={item} />
                        </div>
                    ))}
                    {/* portfolio item end */}
                </div>
                <Pagination />
            </div>
        </div>
    );
}
