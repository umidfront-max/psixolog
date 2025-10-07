import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BaseHeader from "../../components/BaseHeader";
import Footer from "../../components/Footer";
import ContactMap from "../../components/ContactMap";
import "./globals.css";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Психолог Онлайн",
		template: "%s | Психолог Онлайн",
	},
	description:
		"Профессиональная помощь психолога онлайн — консультации, поддержка, терапия.",
	metadataBase: new URL("https://psixolog-blush.vercel.app"),
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<BaseHeader />
				{children}
				<ContactMap />
				<Footer />
			</body>
		</html>
	);
}
