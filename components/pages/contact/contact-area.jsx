import ContactForm from "./ui/contact-form";
import ContactInfo from "./ui/contact-info";

export default function ContactArea() {
    return (
        <div className="contact-section bg-sand section-padding-140">
            <div className="container">
                <div className="row gutter-x-60 gutter-y-50 justify-content-center align-items-center flex-lg-row-reverse">
                    <div className="offset xl-1 col-xl-5 col-lg-6 col-md-8 col-xs-10">
                        <ContactInfo />
                    </div>
                    <div className="col-lg-6 col-md-10">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
