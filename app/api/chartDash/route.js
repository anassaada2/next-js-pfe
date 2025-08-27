import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export async function GET() {
  try {
    // --- 1) Downloads par jour
    const [downloadsRes] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "dayOfWeekName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { value: "download_pdf" },
        },
      },
    });

    const downloadsMap =
      downloadsRes.rows?.reduce((acc, row) => {
        acc[row.dimensionValues[0].value] = Number(row.metricValues[0].value);
        return acc;
      }, {}) || {};

    // --- 2) Vues par jour
    const [viewsRes] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "dayOfWeekName" }, { name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
    });

    const filtered =
      viewsRes.rows
        ?.map((row) => ({
          name: row.dimensionValues[0].value, // dayOfWeekName
          page: row.dimensionValues[1].value,
          views: Number(row.metricValues[0].value),
        }))
        .filter(
          (r) =>
            r.page === "/contact" ||
            r.page === "/" ||
            r.page === "/calculette" ||
            r.page === "/services" ||
            r.page === "/realisations" ||
            r.page === "/about" ||
            r.page.startsWith("/solutions/")
        ) || [];

    const viewsMap = filtered.reduce((acc, row) => {
      if (!acc[row.name]) acc[row.name] = 0;
      acc[row.name] += row.views;
      return acc;
    }, {});

    // --- 3) Fusion complète avec 0 si manquant
   const combined = DAYS.map((day) => ({
      name: day.slice(0, 3), // -> "Sun", "Mon", ...
      downloads: downloadsMap[day] || 0,
      views: viewsMap[day] || 0,
    }));
    return NextResponse.json({ success: true, data: combined });
  } catch (error) {
    console.error("Erreur API GA4:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
