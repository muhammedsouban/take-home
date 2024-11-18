
import "./globals.css";
import LayoutClientComponent from "@/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutClientComponent>{children}</LayoutClientComponent>;
}
