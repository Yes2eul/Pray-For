import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata = {
  title: "Pray For",
  description:
    "Pray For - 기독교 온라인 공동체로 서로의 감사와 기도제목 공유하기",
  verification: {
    google: "XIsRXS6AFkwK7jZTBa9rDYbx_l1qZ1Q4W0JLST5hbgc",
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta
            name="google-site-verification"
            content={metadata.verification.google}
          />
        </head>
        <body id="container">
          <Header id="header" />
          <main id="main">{children}</main>
          <Footer id="footer" />
        </body>
      </html>
    </AuthProvider>
  );
}
