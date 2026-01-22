import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import SessionProviderWrapper from "@/components/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NextShop",
    description:
        "Shop your favorite products online with ease - discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
    openGraph: {
        title: "NextShop",
        description:
            "Shop your favorite products online with ease - discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
        url: "https://next-shop-iota-one.vercel.app/",
        siteName: "NextShop",
        images: [
            {
                url: "https://next-shop-iota-one.vercel.app/og.png",
                width: 1200,
                height: 630,
                alt: "NextShop",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`flex flex-col min-h-screen ${inter.className}`}>
                <SessionProviderWrapper>
                    <ReactQueryProvider>
                        <Header />
                        <main className="flex-1 flex flex-col items-center">
                            {children}
                        </main>
                        <Footer />
                    </ReactQueryProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
