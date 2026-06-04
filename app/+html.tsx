import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <title>Peyzajet | Profesyonel Peyzaj Tasarımı ve Bahçe Hizmetleri</title>
        <meta name="description" content="Peyzajet - Profesyonel peyzaj tasarımı, bahçe düzenleme ve bakım hizmetleri. Hayalinizdeki bahçeyi gerçeğe dönüştürüyoruz." />
        <meta name="keywords" content="peyzaj, bahçe tasarımı, bahçe bakımı, çim uygulaması, sulama sistemi, İstanbul peyzaj" />
        <meta name="author" content="Peyzajet" />

        <meta property="og:title" content="Peyzajet | Profesyonel Peyzaj Tasarımı" />
        <meta property="og:description" content="Hayalinizdeki bahçeyi gerçeğe dönüştürüyoruz. Profesyonel peyzaj tasarımı ve bakım hizmetleri." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="Peyzajet" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peyzajet | Profesyonel Peyzaj Tasarımı" />
        <meta name="twitter:description" content="Hayalinizdeki bahçeyi gerçeğe dönüştürüyoruz." />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          body { overflow-x: hidden; font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif; }
          #root { display: flex; flex-direction: column; min-height: 100vh; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #6FA43A; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #5A8A2E; }
          ::selection { background: rgba(111, 164, 58, 0.3); }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
