export default function ReplayForm() {
    return (
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
                        type="email"
                        placeholder="Email address"
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
                    <button className="btn btn-primary">
                        Send message
                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </button>
                </div>
            </div>
        </form>
    );
}
