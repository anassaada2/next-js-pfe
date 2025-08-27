import { fetchCalculateur } from "@/lib/fetchData";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

const extractCID = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export default async function Page() {
  const calculateurData = await fetchCalculateur();
  const calculateur = calculateurData || null;
  console.log(calculateur)
  return <>
  <div>
    hello
  </div>
  </>
}