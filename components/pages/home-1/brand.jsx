import { brands } from "@/data/site";
import Image from "next/image";
import "@/components/ui/sections/faq.scss";

export default function Brand() {
  return (
    <div className="brand-section padding-bottom-130">
      <div className="container">
        <div className="row">
          <div className="col-12  overflow-hidden">
            <div className="brand-wrapper">
              {brands.map((item, i) => (
                <div key={i} className="icon-single ">
                  <Image
                    height={180}
                    width={180}
                    key={i}
                    src={item.img}
                    alt="logo"
                    className=""
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
