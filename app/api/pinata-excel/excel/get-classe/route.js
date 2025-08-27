//get classe
import * as xlsx from "xlsx";
import { NextResponse } from "next/server";
import { fetchCalculateur } from "@/lib/fetchData";

export async function POST(req) {
  try {
    const { nomFeuille } = await req.json();

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

    // ✅ Vérifier si la feuille demandée existe
    if (!sheetNames.includes(nomFeuille)) {
      return NextResponse.json(
        { error: `La feuille "${nomFeuille}" n'existe pas.` },
        { status: 404 }
      );
    }

    // ✅ Extraire les données de la feuille spécifiée
    const sheet = workbook.Sheets[nomFeuille];
    const data = xlsx.utils.sheet_to_json(sheet);

    // ✅ Extraire toutes les clés de cette feuille
    const allKeys = [...new Set(data.flatMap(Object.keys))];

    // ✅ Retourner les clés sous forme JSON
    return NextResponse.json({ allKeys });
  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json(
      { error: `Erreur interne du serveur: ${err.message}` },
      { status: 500 }
    );
  }
}
