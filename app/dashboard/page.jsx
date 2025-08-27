import CardDash from "@/components/dashboard/card/CardDash";
import ChartDash from "@/components/dashboard/chart/ChartDash";
import styles from "@/components/dashboard/dashboard.module.scss";
import HeroDash from "@/components/dashboard/hero/HeroDash";
import { getDownloadStats } from "@/lib/actions";
import { fetchCardDash } from "@/lib/fetchData";
async function page() {
  const  cards = await fetchCardDash()
    const statss = await getDownloadStats();
  
  // Récupérer ECO-BOOT & POLY-BOOT
  const ecoBootDownloads = statss.find(s => s.service === "ECO-BOOT")?.count || 0;
  const polyBootDownloads = statss.find(s => s.service === "POLY-BOOT")?.count || 0;
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <CardDash item={item} key={item.id} />
          ))}
        </div>
              <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card text-center border-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Téléchargements Ecoboot</h5>
              <p className="display-6 text-success">{ecoBootDownloads}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center border-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Téléchargements Polyboot</h5>
              <p className="display-6 text-primary">{polyBootDownloads}</p>
            </div>
          </div>
        </div>
      </div>
        <HeroDash />
        <ChartDash />
      </div>
    </div>
  );
}

export default page;
