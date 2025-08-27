import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

export async function GET() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: "today", endDate: "today" }],
      dimensions: [
        { name: "pagePath" },
        { name: "sessionSource" }
      ],
      metrics: [
        { name: "userEngagementDuration" }
      ],
    });

    // Regrouper par sessionSource
    const sessions = {};
    response.rows?.forEach(row => {
      const pagePath = row.dimensionValues[0]?.value || "";
      const sessionSource = row.dimensionValues[1]?.value || "unknown";
      const duration = parseInt(row.metricValues[0]?.value || "0", 10);

      if (!sessions[sessionSource]) {
        sessions[sessionSource] = {
          visitorId: sessionSource,
          pages: [],
          totalDuration: 0,
          visitedCalculator: false
        };
      }

      sessions[sessionSource].pages.push(pagePath);
      sessions[sessionSource].totalDuration += duration;
      if (pagePath === "/calculette") {
        sessions[sessionSource].visitedCalculator = true;
      }
    });

    return new Response(JSON.stringify(Object.values(sessions)), { status: 200 });
  } catch (error) {
    console.error("GA4 Error:", error);
    return new Response(JSON.stringify([]), { status: 200 }); // Retourne tableau vide
  }
}
