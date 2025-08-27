import TeamCard from "@/components/ui/cards/team-card";
import { teams } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

export default function TeamItem() {
    return (
        <div className="team-section bg-sand section-padding">
            <div className="container">
                <div className="row gutter-y-default">
                    {/* team cards start */}
                    {teams?.map((item, i) => (
                        <div key={i} className="col-xxl-3 col-lg-4 col-sm-6">
                            <TeamCard data={item} />
                        </div>
                    ))}
                    {/* team cards end */}
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <div className="team-join-widget">
                            <div className="team-join-widget__inner">
                                <div className="widget-icon">
                                    <Image
                                        height={40}
                                        width={40}
                                        src="/image/home-1/icon-team.png"
                                        alt="icon"
                                    />
                                </div>
                                <p>
                                    Get to know all of our fantastic Arcatec
                                    team members
                                </p>
                                <Link href="/team-details" className="btn-link">
                                    Join Our Team
                                    <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
