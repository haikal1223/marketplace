import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-XKPD36JXY0";

export const geist = Geist({
  subsets: ["latin"]
});

import "overlayscrollbars/overlayscrollbars.css";

// THEME PROVIDER
import ThemeProvider from "theme/theme-provider";

// PRODUCT CART PROVIDER
import CartProvider from "contexts/CartContext";

// SITE SETTINGS PROVIDER
import SettingsProvider from "contexts/SettingContext";

// GLOBAL CUSTOM COMPONENTS
import RTL from "components/rtl";
import ProgressBar from "components/progress";

// IMPORT i18n SUPPORT FILE
import "i18n";

// ==============================================================
interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
// ==============================================================

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="body" className={geist.className}>
        <SessionProvider>
          <CartProvider>
            <SettingsProvider>
              <ThemeProvider>
                <RTL>
                  {modal}
                  {children}
                </RTL>

                <ProgressBar />
              </ThemeProvider>
            </SettingsProvider>
          </CartProvider>
        </SessionProvider>

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
