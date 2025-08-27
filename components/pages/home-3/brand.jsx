import { brands2 } from "@/data/site";
import Image from "next/image";

export default function Brand() {
    return (
        <div className="brand-section padding-bottom-140 ">
            <div className="container">
                <div className="row">
                    <div className="col-12 overflow-hidden">
                        <div className="brand-wrapper padding-top-60">
                            {brands2.map((item, i) => (
                                <div key={i} className="icon-single">
                                    <Image
                                        height={80}
                                        width={80}
                                        key={i}
                                        src={item.img}
                                        alt="logo"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
