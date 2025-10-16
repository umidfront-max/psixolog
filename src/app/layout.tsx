
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BaseHeader from "../../components/BaseHeader";
import Footer from "../../components/Footer";
import ContactMap from "../../components/ContactMap";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Онлайн консультация с психологом | Психолог Онлайн",
	description:
		"Запишитесь на онлайн-консультацию с профессиональным психологом. Поддержка, понимание и помощь в преодолении тревоги и стресса.",
	openGraph: {
		title: "Онлайн консультация с психологом",
		description:
			"Получите профессиональную психологическую помощь онлайн уже сегодня.",
		url: "https://psixolog-blush.vercel.app",
		siteName: "Психолог Онлайн",
		images: [
			{
				url: "https://psixolog-blush.vercel.app/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Психолог Онлайн консультация",
			},
		],
		locale: "ru_RU",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<BaseHeader />
				{children}
				<Toaster position="top-center" reverseOrder={false} />
				<ContactMap />
				<Footer />
			</body>
		</html>
	);
}
