// lib/pinata.js

export const extractCID = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

export const getPinataFileName = async (cid) => {
  try {
    const res = await fetch(`https://api.pinata.cloud/data/pinList?cid=${cid}`, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    if (!res.ok) throw new Error("Pinata API error");

    const data = await res.json();
    const file = data?.rows?.[0];

    return file?.metadata?.name || "Unnamed file";
  } catch (error) {
    console.error("Error fetching Pinata file:", error);
    return "N/A";
  }
};
