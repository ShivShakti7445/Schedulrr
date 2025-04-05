import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import CreateEventDrawer from "@/components/create-event";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Schedulrr",
  description: " Meetings and Scheduling App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider >
        <html lang="en">
        <body className={inter.className}>
            {/* header */}
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
              {children}
            </main>
            <footer className="bg-blue-100 py-12 mt-8 shadow-md">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p className="text-lg font-semibold text-gray-700">
                  Made with 💗 by <span className="text-blue-600">Schedulrr</span>
                </p>
                <p className="text-sm mt-2 text-gray-500">© 2025 All rights reserved.</p>
              </div>
            </footer>

            <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider> 
  );
}
