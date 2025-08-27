const Etape = ({ service }) => {
  return (
    <div className="container-fluid p-4">
      <div className="table-responsive">
        <table className="table table-bordered table-striped w-100">
          <thead className="thead-dark">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Étapes</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {service.map((row, index) => (
              <tr key={index}>
                <td className="p-3 fw-bold">{row.etape}</td>
                <td className="p-3 fw-bold text-success">{row.titre}</td>
                <td className="p-3">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Etape;
