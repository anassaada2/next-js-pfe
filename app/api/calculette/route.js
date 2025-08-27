import * as xlsx from "xlsx";
import { NextResponse } from "next/server";
import { fetchCalculateur } from "@/lib/fetchData";

export async function POST(req) {
  const body = await req.json();
  const { pression, classe, temperature } = body;

  // Validation des entrées
  if (!pression || !classe || !temperature) {
    return NextResponse.json(
      { error: "Pression, classe et température sont requis" },
      { status: 400 }
    );
  }

  try {
    // Récupérer l'URL du fichier Excel
    const fileUrl = await fetchCalculateur();
    if (!fileUrl?.url) {
      return NextResponse.json(
        { error: "Fichier Excel introuvable" },
        { status: 404 }
      );
    }

    // Récupérer le fichier via fetch
    const response = await fetch(fileUrl.url);
    if (!response.ok) {
      throw new Error(`Échec du chargement du fichier: ${response.statusText}`);
    }

    // Convertir en buffer
    const arrayBuffer = await response.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Lire le fichier Excel
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });

    // Mapper temperature aux noms des feuilles
    const sheetMapping = {
      "T<20": "T<20",
      "20<T<25": "20<T<25",
      "T>25": "T>25",
    };

    // Obtenir le nom de la feuille à partir de temperature
    const sheetName = sheetMapping[temperature];
    if (!sheetName) {
      return NextResponse.json(
        { error: `Température non valide: ${temperature}` },
        { status: 400 }
      );
    }

    // Vérifier si la feuille existe
    if (!workbook.SheetNames.includes(sheetName)) {
      return NextResponse.json(
        { error: `Feuille ${sheetName} non trouvée dans le fichier Excel` },
        { status: 404 }
      );
    }

    // Sélectionner la feuille
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      return NextResponse.json(
        { error: `Erreur lors de l'accès à la feuille ${sheetName}` },
        { status: 500 }
      );
    }

    // Convertir la feuille en JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    if (!data.length) {
      return NextResponse.json(
        { error: `La feuille ${sheetName} est vide` },
        { status: 404 }
      );
    }

    // Trouver la ligne où P === pression
    const result = data.find((row) => String(row.P) === String(pression));
    if (!result) {
      return NextResponse.json(
        {
          error: `Pression ${pression} non trouvée dans la feuille ${sheetName}`,
        },
        { status: 404 }
      );
    }

    // Vérifier si la classe demandée existe
    if (!(classe in result)) {
      return NextResponse.json(
        { error: `Classe ${classe} non trouvée dans les données` },
        { status: 400 }
      );
    }

    // Retourner la valeur
    return NextResponse.json({ valeur: result[classe] });
  } catch (error) {
    console.error("Erreur lecture Excel:", error);
    return NextResponse.json(
      { error: `Erreur serveur: ${error.message}` },
      { status: 500 }
    );
  }
}
