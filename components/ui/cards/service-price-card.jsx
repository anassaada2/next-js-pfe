import Link from "next/link";

export default function ServicePriceCard({ data }) {
    return (
        <div className="pricing-card">
            <div className="pricing-card__inner">
                <h3 className="pricing-card__title">{data.title}</h3>
                <p>{data.description}</p>
                <ul className="list-style-bullet">
                    <li>Architect Hourly Rate</li>
                    <li>Combination</li>
                    <li>Architectural Plans</li>
                    <li>Fixed Fees</li>
                </ul>
                <div className="pricing-card__bottom">
                    <span className="pricing-card__price">${data.price}</span>
                    <Link
                        href="/pricing"
                        className="btn btn-primary w-100 space-between btn-small hvr-fill-black"
                    >
                        Get started
                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
