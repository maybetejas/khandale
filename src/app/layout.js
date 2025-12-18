import "./globals.css";

export const metadata = {
  title: "tejas.lab",
  description: "Selected work and experiments by Tejas",

  // openGraph: {
  //   title: "tejas.lab",
  //   description: "Selected work and experiments by Tejas",
  //   url: "https://tejas.lab",
  //   siteName: "tejas.lab",
  //   images: [
  //     {
  //       url: "/og.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "tejas.lab — Selected work and experiments by Tejas",
  //     },
  //   ],
  //   type: "website",
  // },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "tejas.lab",
  //   description: "Selected work and experiments by Tejas",
  //   images: ["/og.jpg"],
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Electrolize&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
