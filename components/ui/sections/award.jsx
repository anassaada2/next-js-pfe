import Image from "next/image";
import AwardWidget from "../../pages/home-2/ui/award-widget";
import classNames from "classnames";
import { fetchRealisations } from "@/lib/fetchData";
export default async function Award({ style }) {
  // style of award section
  const className = classNames("award-section bg-sand section-padding-140", {});
const { realisations: awards } = await fetchRealisations();

  return (
    <div className={className}>
      <div className="award-section__shape">
        <Image
          height={354}
          width={369}
          src="/image/AFEC/logo.png"
          alt="shape"
          className="h-auto"
        />
      </div>
      <div className="container">
        <div className="section-heading text-center mb-res-60">
          <span className="anas-title text-uppercase ">nos réalisations</span>
          <h2 className="section-heading__title heading-md">
            Réalisations Inspirantes
          </h2>
        </div>
        <div className="award-content-wrapper">
          {awards
            ?.slice()
            .reverse()
            .map((item, i) => (
              <AwardWidget key={i} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
}
