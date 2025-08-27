import Image from "next/image";

export default function ContactInfo() {
  return (
    <div className="contact-text-block__wrapper">
      <div className="contact-text-block">
        <div className="contact-content__heading ">
          <span className="subtitle">CONTACTEZ NOUS</span>
          <h2 className="content-title heading-md">
            Rejoignez-nous en un clic{" "}
          </h2>
        </div>
      </div>
      <div className="contact-widgets-02">
        <div className="contact-widget-02">
          <div className="contact-widget-02__icon">
            <Image
              height={22}
              width={22}
              src="/image/common/location.svg"
              alt="icon"
            />
          </div>
          <span className="contact-widget-02__text">
            ZI Menzel Chaker - BP Nº14 3020 / Menzel Chaker Sfax - TUNISIE
          </span>
        </div>
        <div className="contact-widget-02">
          <div className="contact-widget-02__icon">
            <Image
              height={22}
              width={22}
              src="/image/common/phone.svg"
              alt="icon"
            />
          </div>
          <span className="contact-widget-02__text">+216 97 760 754</span>
        </div>
        <div className="contact-widget-02">
          <div className="contact-widget-02__icon">
            <Image
              height={22}
              width={22}
              src="/image/common/mail.svg"
              alt="icon"
            />
          </div>
          <span className="contact-widget-02__text">
            fendri.ayman@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
