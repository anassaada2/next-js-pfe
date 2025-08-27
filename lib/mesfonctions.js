export function formatDescription(service) {
  const nameRegex = new RegExp(`(${service.name})`, "gi");
  const formatted = service.description
    .replace(nameRegex, "<strong> $1 </strong>")
    .replace(/\n/g, "<br />");
  return formatted;
}
// 🔧 Formatage d'un avantage avec <strong> sur item.titre
export function formatAvantage(item) {
  // Crée un regex pour rechercher le titre suivi de " : " et en tenir compte avec ou sans parenthèses
  const titreRegex = new RegExp(`(^|\\s)(${item.titre})(?=\\s*:)`, "gi");

  // Remplace le titre par sa version en gras dans la description
  const formatted = `${item.titre} : ${item.description}`.replace(
    titreRegex,
    (match, p1, p2) => `${p1}<strong>${p2}</strong>`
  );

  return formatted;
}
