export default function FaqItem({ data, index }) {
    return (
        <div className="accordion-item">
            <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faq-item-${index}`}
                aria-expanded="true"
                aria-controls="faq-item"
            >
                {data.title}
            </button>
            <div
                id={`faq-item-${index}`}
                className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                }`}
                data-bs-parent="#faq"
            >
                <div className="accordion-item__body">{data.description}</div>
            </div>
        </div>
    );
}
