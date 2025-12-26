import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from '@/components/ReduxProvider'
import AuthRedirect from '@/components/AuthRedirect'
import { SidebarProvider } from '@/components/admin/ui/SidebarContext'
// Configure Inter font with proper subsets and weights
const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Rijschool Management",
  description: "Comprehensive admin dashboard for driving school management",
  icons : {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ReduxProvider>
          <SidebarProvider>
            <AuthRedirect />
            {children}
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
