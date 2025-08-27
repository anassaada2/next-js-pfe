import Link from "next/link";

export default function ServiceCard({ data }) {
  return (
    <div className="service-card h-100 service-card--small">
      <div className="service-card__icon">
        <img src={data.icon} alt="service icon" />
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">{data.title}</h3>
        <p>{data.description}</p>
               
      
      </div>
      <div className="service-card__footer">
        {/*  <Link
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
