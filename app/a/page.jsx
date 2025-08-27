import { 
  getActiveUsers, 
  getDownloadStats, 
  getDownloadStats2, 
  getTotalSessions, 
  getUserSessions 
} from "@/lib/actions";

export default async function Dashboard() {
  const stats = await getUserSessions();
  const statss = await getDownloadStats();
  const activeUser = await getActiveUsers();
  const TotalSessions = await getTotalSessions();
  const tt = await getDownloadStats2(); 

  console.log(statss);
  console.log(tt);

  // Récupérer ECO-BOOT & POLY-BOOT
  const ecoBootDownloads = statss.find(s => s.service === "ECO-BOOT")?.count || 0;
  const polyBootDownloads = statss.find(s => s.service === "POLY-BOOT")?.count || 0;

  return (
    <div className="container py-5">
      <h1 className="mb-4">📊 Dashboard Consultants</h1>

      {/* KPIs globales */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">👥 Consultants</h5>
              <p className="display-6">{activeUser}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">👀 Vues</h5>
              <p className="display-6">{stats.totals.views}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📌 Sessions</h5>
              <p className="display-6">{TotalSessions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Téléchargements principaux */}
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

      {/* Détails par page */}
      <h2 className="mb-3">📄 Statistiques détaillées par page</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Page</th>
            <th>Pays</th>
            <th>Consultants</th>
            <th>Vues</th>
            <th>Sessionss</th>
          </tr>
        </thead>
        <tbody>
          {stats.details.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">Aucune donnée</td>
            </tr>
          ) : (
            stats.details.map((d, i) => (
              <tr key={i}>
                <td>{d.page}</td>
                <td>{d.country}</td>
                <td>{d.users}</td>
                <td>{d.views}</td>
                <td>{d.sessions}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
