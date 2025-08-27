import Image from "next/image";
import Link from "next/link";


export default function ServiceCard({ data }) {
  return (
    <div className="service-card h-100">
      <div className="service-card__icon">
<Image src={data.icon} alt="icon" width={100} height={100} ></Image>
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">{data.title}</h3>
        <p>{data.brief}</p>
      </div>
      <div className="service-card__footer">
        {/*    <Link
          href="/service-details"
          className="btn btn-primary btn-small w-100 space-between hvr-fill-black"
        >
          voir details
          <i className="fa-solid fa-arrow-right icon-arrow-corner" />
        </Link>*/}
      </div>
    </div>
  );
}
