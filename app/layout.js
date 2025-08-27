import "./globals.scss";
import { Space_Grotesk } from "next/font/google";
import Providers from "./providers"; // ton provider custom
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsUserId from "@/components/analytic/AnalyticsUserId";
import SessionProviders from "@/components/provider/SessionProviders"
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--space-grotesk",
});

export const metadata = {
  title: "AFEC",
  description: "AFEC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body>
        <SessionProviders>
          <Providers>{children}</Providers>
          <Toaster position="top-center" />
      
        </SessionProviders>
        <GoogleAnalytics gaId="G-6NNNFM6FQC" />
      </body>
    </html>
  );
}
