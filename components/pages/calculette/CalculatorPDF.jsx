// components/PdfCalculator.jsx
"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Enregistrement d'une police personnalisée (optionnel)
Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/helvetica/v1/Helvetica-Regular.ttf",
});

// Styles adaptés de votre SCSS
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f8f9fa",
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    color: "#2c3e50",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  formSection: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    width: "40%",
    fontWeight: "bold",
    color: "#4a5568",
  },
  value: {
    width: "55%",
    borderBottom: "1px solid #cbd5e0",
    paddingBottom: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e0",
    marginVertical: 15,
  },
  hypothesisSection: {
    backgroundColor: "#fff7ed",
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  hypothesisTitle: {
    color: "#c05621",
    fontSize: 14,
    marginBottom: 10,
  },
  hypothesisItem: {
    marginBottom: 5,
    color: "#4a5568",
  },
  resultSection: {
    backgroundColor: "#ebf8ff",
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
    textAlign: "center",
  },
  resultTitle: {
    color: "#2b6cb0",
    fontSize: 14,
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2b6cb0",
  },
  notes: {
    fontSize: 10,
    color: "#718096",
    marginTop: 10,
  },
  disclaimer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e0",
    fontStyle: "italic",
  },
});

const temperatureLabels = {
  temp1: "T<20°C",
  temp2: "T<50°C",
};

const consistencyLabels = {
  cons1: "S1",
  cons2: "S2",
};

export default function PdfCalculator({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          CALCULATEUR DE VITESSE DE COULEE DU BETON FRAIS
        </Text>

        <View style={styles.formSection}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Date :</Text>
            <Text style={styles.value}>{data.date || "—"}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Références :</Text>
            <Text style={styles.value}>{data.references || "—"}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Norme :</Text>
            <Text style={styles.value}>{data.norme || "—"}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Client :</Text>
            <Text style={styles.value}>{data.client || "—"}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.formRow}>
            <Text style={styles.label}>Hauteur de bétonnage H (m) :</Text>
            <Text style={styles.value}>{data.hauteur || "—"} m</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pression* :</Text>
            <Text style={styles.value}>{data.pression || "—"} bars</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Température lors du bétonnage :</Text>
            <Text style={styles.value}>{data.temperature || "—"}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Classe de consistance du béton :</Text>
            <Text style={styles.value}>{data.consistency || "—"}</Text>
          </View>
        </View>

        <View style={styles.hypothesisSection}>
          <Text style={styles.hypothesisTitle}>Hypothèses :</Text>
          <Text style={styles.hypothesisItem}>
            • Le calcul de la pression selon DIN 18218 valable pour ±5°
            verticale
          </Text>
          <Text style={styles.hypothesisItem}>
            • Hauteur maximale de bétonnage : 10 m
          </Text>
          <Text style={styles.hypothesisItem}>
            • Densité du béton frais : 25 KN/m³
          </Text>
          <Text style={styles.hypothesisItem}>
            • Vitesse de montée max. : 7 m/h
          </Text>
        </View>

        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>RESULTAT</Text>
          <Text style={styles.resultValue}>
            VITESSE DE MONTEE V (m/h) : {data.vitesse || "—"}
          </Text>
        </View>

        <View style={styles.notes}>
          <Text>*Capacité du coffrage pour supporter la pression du béton</Text>
          <Text style={styles.disclaimer}>
            NB : Le client doit fournir des données fiables et respecter les
            hypothèses. Tout changement doit être signalé immédiatement.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
