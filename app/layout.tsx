import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AppProviders from "./providers";

const inter = Inter({
	display: "swap",
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Peerlist - Form Builder",
	description: "A form builder for creating forms",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<div className="relative border-x border-borderGray md:w-2/3 lg:w-1/2 mx-auto h-screen ">
					<AppProviders>{children}</AppProviders>
				</div>
				<Toaster />
			</body>
		</html>
	);
}
