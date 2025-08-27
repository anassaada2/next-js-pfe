export const fetchExcelData = async () => {
  const response = await fetch("/api/pinata-excel/excel");
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  const data = await response.json();
  return data.allData || [];
};

export const fetchConsistencyClasses = async (temperature) => {
  const response = await fetch("/api/pinata-excel/excel/get-classe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nomFeuille: temperature }),
  });
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  const data = await response.json();
  return data.allKeys && Array.isArray(data.allKeys) ? data.allKeys : [];
};

export const fetchVitesse = async (pression, consistency, temperature) => {
  const response = await fetch("/api/calculette", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pression, classe: consistency, temperature }),
  });
  if (!response.ok) {
    throw new Error(
      (await response.json()).error || "Erreur lors de la requête"
    );
  }
  const data = await response.json();
  return data.valeur;
};
