"use client";

import { useEffect, useState } from "react";
import styles from "./chartDash.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartDash = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/chartDash"); // 👈 ton API combinée
        const json = await res.json();

        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Erreur récupération stats :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
console.log(data)
  if (loading) {
    return <p className={styles.loading}>Chargement des statistiques...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.titleText}>Statistiques des Click et Vues</h2>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
        
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          {/* courbe des vues */}
          <Line
            type="monotone"
            dataKey="views"
            stroke="#82ca9d"
            strokeWidth={2}
          />
          {/* courbe des téléchargements */}
          <Line
            type="monotone"
            dataKey="downloads"
            stroke="#8884d8"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDash;
