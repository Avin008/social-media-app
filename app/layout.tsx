import "./globals.css";
import { Poppins } from "next/font/google";
import Toast from "@/components/Toast";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Picco | Social Media App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans`}
    >
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toast />
      </body>
    </html>
  );
}
