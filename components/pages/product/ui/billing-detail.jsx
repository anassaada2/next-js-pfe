import SelectTheme1 from "@/components/ui/selects/select-theme1";

export default function BillingDetail() {
    return (
        <>
            <h3 className="checkout-title heading-sm mb-32">Billing details</h3>
            <div className="checkout-form">
                <form action="/">
                    <div className="row gutter-y-default">
                        <div className="col-lg-12">
                            <h4>
                                First name <span>*</span>
                            </h4>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                Last name <span>*</span>
                            </h4>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="form-control"
                            />
                        </div>
                        <div className="col-lg-12">
                            <h4>Company name (optional)</h4>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                Country / Region <span>*</span>
                            </h4>
                            <SelectTheme1
                                data={[
                                    { value: "usa", label: "United State" },
                                    { value: "bd", label: "Bangladesh" },
                                    { value: "uk", label: "United Kingdom" },
                                    { value: "ind", label: "India" },
                                    { value: "pk", label: "Pakistan" },
                                    { value: "cd", label: "Canada" },
                                ]}
                            />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                Street address <span>*</span>
                            </h4>
                            <input
                                type="text"
                                placeholder="House number and street name"
                                className="form-control"
                            />
                        </div>
                        <div className="col-lg-12">
                            <input
                                type="email"
                                placeholder="Apartment, suite, unit, etc. (optional)"
                                className="form-control"
                            />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                Town / City <span>*</span>
                            </h4>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                State <span>*</span>
                            </h4>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                Zip code <span>*</span>
                            </h4>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                Phone <span>*</span>
                            </h4>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-lg-12">
                            <h4>
                                Email address <span>*</span>
                            </h4>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="col-lg-12">
                            <div className="checkout-form-bottom">
                                <h3 className="checkout-title heading-sm mb-32">
                                    Additional information
                                </h3>
                                <h4>Order notes (optional)</h4>
                                <textarea
                                    name="notes"
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
