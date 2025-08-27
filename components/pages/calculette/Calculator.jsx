"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./calculator.module.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfCalculator from "./CalculatorPDF";
import toast, { Toaster } from "react-hot-toast";
import { fetchExcelData, fetchConsistencyClasses, fetchVitesse } from "./api";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";

const temperatureOptions = [
  { value: "T<20", label: "T<20°C" },
  { value: "20<T<25", label: "20°C < T < 25°C" },
  { value: "T>25", label: "T>25°C" },
];

export default function Calculator() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    references: "",
    norme: "",
    client: "",
    hauteur: "",
    pression: "",
    temperature: "",
    consistency: "",
    vitesse: "",
  });

  const [allData, setAllData] = useState([]);
  const [consistencyOptions, setConsistencyOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "hauteur") {
      if (value && (Number(value) <= 0 || Number(value) > 10)) {
        toast.error("La hauteur doit être entre 0 et 10 mètres !");
        return;
      }
    }

    if (name === "pression" && value && Number(value) <= 0) {
      toast.error("La pression doit être positive !");
      return;
    }

    if (name === "temperature") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        consistency: "",
        vitesse: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError(null);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchExcelData();
        setAllData(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        toast.error("Impossible de charger les données de pression.");
      }
    };

    const loadClasses = async () => {
      if (!formData.temperature) {
        setConsistencyOptions([]);
        return;
      }
      try {
        const classes = await fetchConsistencyClasses(formData.temperature);
        if (classes.length === 0) {
          toast.error(
            "Aucune classe de consistance disponible pour cette température."
          );
          setConsistencyOptions([]);
          return;
        }
        const formatted = classes.map((item) => ({ value: item, label: item }));
        setConsistencyOptions(formatted);
      } catch (err) {
        console.error("Erreur lors de la récupération des classes:", err);
        setConsistencyOptions([]);
        toast.error("Erreur lors du chargement des classes de consistance.");
      }
    };

    loadData();
    loadClasses();
  }, [formData.temperature]);

  const debouncedFetchVitesse = useCallback(
    debounce(async (pression, temperature, consistency) => {
      if (!pression || !temperature || !consistency) {
        setFormData((prev) => ({ ...prev, vitesse: "" }));
        return;
      }
      setIsLoading(true);
      try {
        const validTemperatures = ["T<20", "20<T<25", "T>25"];
        if (!validTemperatures.includes(temperature)) {
          throw new Error(`Valeur de température invalide: ${temperature}`);
        }
        const valeur = await fetchVitesse(pression, consistency, temperature);
        setFormData((prev) => ({ ...prev, vitesse: valeur }));
      } catch (err) {
        setError(err.message);
        setFormData((prev) => ({ ...prev, vitesse: "" }));
        toast.error(`Erreur: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetchVitesse(
      formData.pression,
      formData.temperature,
      formData.consistency
    );
  }, [
    formData.pression,
    formData.temperature,
    formData.consistency,
    debouncedFetchVitesse,
  ]);

  const pressureOptions = Array.from(
    new Set(
      allData
        .flatMap((sheet) => sheet.pressureData || [])
        .filter((pressure) => pressure != null)
    )
  ).sort((a, b) => a - b);

  const isFormComplete =
    formData.hauteur &&
    formData.pression &&
    formData.temperature &&
    formData.consistency &&
    formData.vitesse;

  return (
    <div className={styles.calculatorContainer}>
      <h3>CALCULATEUR DE VITESSE DE COULEE DU BETON FRAIS</h3>
      <Toaster position="top-center" reverseOrder={false} />

      <div className={styles.formSection}>
        <form>
          <div className={styles.formRow}>
            <label htmlFor="date">Date :</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              aria-describedby="date-error"
            />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="norme">Norme :</label>
            <p>DIN 18218</p>
          </div>

          <hr className={styles.separator} />

          <div className={styles.formRow}>
            <label htmlFor="hauteur">Hauteur de bétonnage H (m) :</label>
            <div className={styles.inputGroup}>
              <input
                type="number"
                id="hauteur"
                name="hauteur"
                value={formData.hauteur}
                onChange={handleChange}
                placeholder="Entrez la hauteur"
                aria-describedby="hauteur-error"
                aria-invalid={formData.hauteur && Number(formData.hauteur) > 10}
              />
              <span className={styles.unit}>m</span>
            </div>
            {formData.hauteur && Number(formData.hauteur) > 10 && (
              <span id="hauteur-error" className={styles.error}>
                La hauteur ne doit pas dépasser 10 mètres !
              </span>
            )}
          </div>

          <div className={styles.formRow}>
            <label htmlFor="pression">Pression* :</label>
            <div className={styles.inputGroup}>
              <select
                id="pression"
                name="pression"
                value={formData.pression}
                onChange={handleChange}
                aria-describedby="pression-error"
              >
                <option value="">-- Sélectionner --</option>
                {pressureOptions.map((pressure, index) => (
                  <option key={index} value={pressure}>
                    {pressure} bars
                  </option>
                ))}
              </select>
              <span className={styles.unit}>bars</span>
            </div>
            {formData.pression && Number(formData.pression) <= 0 && (
              <span id="pression-error" className={styles.error}>
                La pression doit être positive !
              </span>
            )}
          </div>

          <div className={styles.formRow}>
            <label htmlFor="temperature">Température lors du bétonnage :</label>
            <div className={styles.inputGroup}>
              <select
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
              >
                <option value="">-- Sélectionner --</option>
                {temperatureOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className={styles.unit}>°C</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="consistency">
              Classe de consistance du béton :
            </label>
            <div className={styles.inputGroup}>
              <select
                id="consistency"
                name="consistency"
                value={formData.consistency}
                onChange={handleChange}
                disabled={isLoading || !formData.temperature}
              >
                <option value="">-- Sélectionner --</option>
                {consistencyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.hypothesisSection}>
        <h4>Hypothèses :</h4>
        <ul>
          <li>Calcul selon DIN 18218 valable pour ±5° verticale</li>
          <li>Hauteur maximale : 10 m</li>
          <li>Densité béton : 25 KN/m³</li>
          <li>Vitesse montée max : 7 m/h</li>
        </ul>
      </div>

      <div className={styles.resultSection}>
        <h4>RESULTAT</h4>
        <div className={styles.resultValue}>
          <span>VITESSE DE MONTEE V (m/h) :</span>
          {isLoading ? (
            <strong>Calcul en cours...</strong>
          ) : error ? (
            <strong style={{ color: "red" }}>{error}</strong>
          ) : formData.vitesse ? (
            <strong>{formData.vitesse}</strong>
          ) : (
            <strong>Veuillez remplir tous les champs</strong>
          )}
        </div>
      </div>

      <div className={styles.notes}>
        <p>*Capacité du coffrage pour supporter la pression du béton</p>
        <p className={styles.disclaimer}>
          NB : Le client doit fournir des données fiables et respecter les
          hypothèses.
        </p>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        {isFormComplete ? (
          <PDFDownloadLink
            document={<PdfCalculator data={formData} />}
            fileName={`calculator-result-${formData.date}.pdf`}
          >
            {({ loading }) =>
              loading ? "Génération du PDF..." : "📄 Télécharger le PDF"
            }
          </PDFDownloadLink>
        ) : (
          <button disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
            📄 Télécharger le PDF (remplissez tous les champs)
          </button>
        )}
      </div>
    </div>
  );
}

Calculator.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.string,
    references: PropTypes.string,
    norme: PropTypes.string,
    client: PropTypes.string,
    hauteur: PropTypes.string,
    pression: PropTypes.string,
    temperature: PropTypes.string,
    consistency: PropTypes.string,
    vitesse: PropTypes.string,
  }),
};
