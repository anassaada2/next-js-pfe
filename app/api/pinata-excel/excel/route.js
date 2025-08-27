import * as xlsx from "xlsx";
import { NextResponse } from "next/server";
import { fetchCalculateur } from "@/lib/fetchData";

export async function GET(req) {
  try {
    // ✅ Récupération de l'URL du fichier Excel
    const fileMeta = await fetchCalculateur();
    const fileUrl = fileMeta?.url;
    if (!fileUrl) {
      return NextResponse.json(
        { error: "Fichier Excel introuvable." },
        { status: 404 }
      );
    }

    // ✅ Téléchargement du fichier Excel
    const fileRes = await fetch(fileUrl);
    if (!fileRes.ok) {
      return NextResponse.json(
        {
          error: `Erreur de téléchargement du fichier Excel: ${fileRes.statusText}`,
        },
        { status: 502 }
      );
    }

    // ✅ Lecture du fichier Excel depuis le buffer
    const arrayBuffer = await fileRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = xlsx.read(buffer, { type: "buffer" });

    // ✅ Récupérer les noms des feuilles
    const sheetNames = workbook.SheetNames;
    if (!sheetNames.length) {
      return NextResponse.json(
        { error: "Aucune feuille trouvée dans le fichier Excel." },
        { status: 404 }
      );
    }
    console.log("Noms des feuilles:", sheetNames);
    // ✅ Extraire les données de chaque feuille, mais seulement la colonne P
    const allData = sheetNames.map((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      // Extraire uniquement les valeurs de la colonne "P"
      const pressureData = data
        .map((row) => row.P)
        .filter((p) => p !== undefined);

      return { sheetName, pressureData };
    });

    // ✅ Retourner les résultats sous forme JSON
    return NextResponse.json({ allData });
  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json(
      { error: `Erreur interne du serveur: ${err.message}` },
      { status: 500 }
    );
  }
}
