import Image from "next/image";
import { teams } from "@/data/site";
import Link from "next/link";
import TeamCard from "@/components/ui/cards/team-card";

export default function Team() {
    return (
        <div className="team-section bg-sand section-padding">
            <div className="team-section__shape">
                <Image
                    height={566}
                    width={607}
                    src="/image/home-1/team-section-pattern.png"
                    alt="section pattern"
                    className="h-auto"
                    quality={75}
                />
            </div>
            <div className="container">
                <div className="section-heading text-center">
                    <span className="subtitle">Meet with team</span>
                    <h2 className="section-heading__title">
                        professional team members
                    </h2>
                </div>
                <div className="row gutter-y-default">
                    {/* team cards start */}
                    {teams?.slice(0, 7).map((item, i) => (
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
