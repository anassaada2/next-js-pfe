import Link from "next/link";
import BillingDetail from "./ui/billing-detail";
import Order from "./ui/order";
import Image from "next/image";

export default function CheckoutArea() {
    return (
        <div className="checkout-section section-padding-140">
            <div className="container">
                <div className="redeem-block mb-res-60">
                    <Image
                        height={19}
                        width={20}
                        src="/image/icons/redeem.svg"
                        alt="icon"
                    />
                    <span>
                        <span>Have a coupon? </span>{" "}
                        <Link href="/">
                            <span>Click here to enter your code</span>
                        </Link>
                    </span>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <BillingDetail />
                    </div>
                    <div className="offset-lg-1 col-lg-5">
                        <Order />
                    </div>
                </div>
            </div>
        </div>
    );
}
