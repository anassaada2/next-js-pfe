import Image from "next/image";

export default function TestimonialCard({ data }) {
    return (
        <div className="testimonial-card">
            <div className="rating-block">
                <Image
                    height={22}
                    width={126}
                    src="/image/common/rating-image.png"
                    alt="start"
                />
            </div>
            <p>{data.quote}</p>
            <div className="user-block">
                <h3 className="user-name">{data.name}</h3>
                <span>{data.designation}</span>
            </div>
        </div>
    );
}
