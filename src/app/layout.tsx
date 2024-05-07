import type { Metadata } from "next";
import { Inter, Inconsolata} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const incon = Inconsolata({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "shorten",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={incon.className}>{children}</body>
    </html>
  );
}
