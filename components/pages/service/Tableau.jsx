const Tableau = () => {
  const data = [
    { label: "Matériau", value: "Polystyrène expansé (PSE)" },
    { label: "Densité", value: "20 kg/m³" },
    { label: "Dimensions", value: "30 x 60 x 15 cm" },
    { label: "Poids par bloc", value: "0.499 kg" },
    { label: "Volume du bloc", value: "0.0249 m³/pièce" },
    { label: "Temps de pose", value: "35 m²/h/ouvrier" },
    { label: "Espacement entre les blocs", value: "10-12-14-16-18-20 cm" },
    { label: "Entraxes", value: "90-92-94-96-98-100 kg" },
    { label: "Résistance au poinçonnement en flexion", value: "150 daN" },
  ];

  return (
    <div className="container-fluid p-4">
      <div className="table-responsive">
        <table className="table table-bordered table-striped w-100">
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="p-3 fw-bold text-success">{row.label}</td>
                <td className="p-3">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tableau;
