import Link from "next/link";

export default function AwardWidget({ data }) {
    const { title, brief, year } = data;

  // Formatage de la date si elle existe
  const formattedYear = year
    ? new Date(year).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
      })
    : "Date inconnue";
  return (
    <div className="award-widget">
      <span className="date">{formattedYear}</span>
      <h6 className="award-widget__title">{data.title}</h6>
      <p>{data.brief}</p>
      <Link href="/home-2" className="award-widget__link">
        <i className="fa-solid fa-arrow-right" />
      </Link>
    </div>
  );
}
