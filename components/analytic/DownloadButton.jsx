// components/analytics/DownloadButton.jsx
"use client";

import { sendGAEvent } from "@next/third-parties/google";

export default function DownloadButton({ serviceName, fileUrl }) {
  const handleClick = () => {
    sendGAEvent("event","download_pdf", {
      service: serviceName,
      file: fileUrl,
    });
  };

  return (
    <a
      href={fileUrl}
      target="_blank"
      download
      rel="noopener noreferrer"
      onClick={handleClick}
      className="hvr-fill-black"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        textDecoration: "none",
      }}
    >
      Télécharger le PDF
    </a>
  );
}
