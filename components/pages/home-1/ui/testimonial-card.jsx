export default function TestimonialCard({ data }) {
  return (
    <div className="single-slide">
      <div className="testimonial-widget">
        <div className="testimonial-widget__icon">
          <img src={data.icon} alt="icon" />
        </div>
        <div className="testimonial-widget__body    text-start">
          <p
            dangerouslySetInnerHTML={{
              __html: data.quote

                .replace(/\./g, ".<br/>")
                .replace(
                  /AFEC/g,
                  '<span style="color: yellow; font-weight: bold; font-size: 1em;text-transform">AFEC</span>'
                ),
            }}
          />

          <span>{data.name}</span>
        </div>
      </div>
    </div>
  );
}
