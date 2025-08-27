import { stats } from "@/data/site";
import StateCard from "../../pages/home-2/ui/state-card";
import classNames from "classnames";

export default function Stats({ style }) {
    // style of stats section
    const className = classNames("stats-section", {
        "padding-bottom-140": style === "home-2",
        "padding-top-60 padding-bottom-140": style === "about",
    });

    return (
        <div className={className}>
            <div className="container">
                <div className="stats-wrapper">
                    <div className="row stats-single-row">
                        {stats?.map((item, i) => (
                            <div key={i} className="col-md-3 col-6 ">
                                <StateCard data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
