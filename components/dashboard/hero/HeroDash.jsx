import { getUserSessions } from "@/lib/actions";
import styles from '@/components/dashboard/hero/heroDash.module.scss'

export default async function TableComponent() {
  const { details } = await getUserSessions(); // <-- récupérer details


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.titleText}>Statistiques détaillées par page</h2>
      </div>
      <div className="table-container shadow-sm rounded p-3 bg-white">
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead className="table-light">
              <tr className="d-flex">
                <th className="col-3">Page</th>
                <th className="col-2">Pays</th>
                <th className="col-2">Visiteurs</th>
                <th className="col-2">Vues</th>
                <th className="col-2">Sessions</th>
              </tr>
            </thead>
            <tbody>
              {details.map((row, i) => (
                <tr key={i} className="d-flex">
                  <td className="col-3">{row.page}</td>
                  <td className="col-2">{row.country}</td>
                  <td className="col-2">{row.users}</td>
                  <td className="col-2">{row.views}</td>
                  <td className="col-2">{row.sessions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
