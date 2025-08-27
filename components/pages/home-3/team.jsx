import TeamCard from "@/components/ui/cards/team-card";
import { teams } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

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
                <div className="row gutter-y-default justify-content-center">
                    {/* team cards start */}
                    {teams?.slice(0, 4).map((item, i) => (
                        <div key={i} className="col-xxl-3 col-lg-4 col-sm-6">
                            <TeamCard data={item} />
                        </div>
                    ))}
                    {/* team cards end */}
                    <div className="col-12">
                        <div className="section-note-text">
                            Do you have any project on your mind? Call Us:
                            <Link href="/home-3">+123 456789</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
