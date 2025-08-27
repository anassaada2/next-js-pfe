import Image from "next/image";

export default function Contact() {
  return (
    <div className="contact-section section-padding">
      <div className="container">
        <div className="row gutter-y-default justify-content-center justify-content-lg-between">
          <div className="col-lg-5 col-md-7 col-sm-8 col-xs-9">
            <div className="contact-content__image">
              <Image
                height={701}
                width={526}
                src="/image/home-2/contact-image-1.png"
                alt="contact image"
                className="w-100 h-auto"
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="contact-content__heading text-center text-lg-start">
              <span className="subtitle">CONTACTEZ NOUS</span>
              <h2 className="content-title heading-md mb-32">
                Joignez-nous en un clic{" "}
              </h2>
            </div>
            <div className="contact-form">
              <form action="/">
                <div className="row gutter-y-default">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      name="message"
                      placeholder="Write Your Message"
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-12 ">
                    <button className="btn btn-primary hvr-fill-black">
                      Send message
                      <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
