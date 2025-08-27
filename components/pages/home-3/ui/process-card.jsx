import Link from "next/link";

export default function ProcessCard({ data }) {
    return (
        <div className="process-widget h-100">
            <h1 className="process-widget__single-count heading-xxl text-primary">
                {data.number}
            </h1>
            <div className="process-widget__body">
                <h3 className="process-widget__title heading-sm text-sand mb-16">
                    {data.title}
                </h3>
                <p>{data.description}</p>
                <Link href="/home-3" className="btn-link btn-link--sand  mt-32">
                    Read More
                    <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                </Link>
            </div>
        </div>
    );
}
