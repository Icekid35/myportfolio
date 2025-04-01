import "./globals.css";
import Head from "next/head";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <Head>
        <title>Bello Habeebullahi Ajetola - Full-Stack Developer & Blockchain Enthusiast</title>
        <meta name="description" content="Explore the portfolio of Bello Habeebullahi Ajetola, a skilled full-stack developer specializing in Node.js, Next.js, TypeScript, MongoDB, and blockchain technologies." />
        <meta name="keywords" content="Bello Habeebullahi Ajetola,bello habeebullahi,bellohabeeb, bello habeeb,bello ajetola, javascriptpro1, Full-Stack Developer, Blockchain Developer, Node.js, Next.js, TypeScript, MongoDB, React, Web Development, Sui Blockchain, Portfolio" />
        <meta name="author" content="Bello Habeebullahi Ajetola" />
        <meta name="robots" content="index, follow" />

        {/* Viewport & Theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a192f" />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:title" content="Bello Habeebullahi Ajetola - Full-Stack Developer & Blockchain Enthusiast" />
        <meta property="og:description" content="Explore the portfolio of Bello Habeebullahi Ajetola, a skilled full-stack developer specializing in Node.js, Next.js, TypeScript, MongoDB, and blockchain technologies." />
        <meta property="og:image" content="https://icefolio.vercel.app/me/me.jpg" />
        <meta property="og:image" content="https://icefolio.vercel.app/me/profile1.JPG" />
        <meta property="og:url" content="https://icefolio.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bello Habeebullahi Ajetola" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bello Habeebullahi Ajetola - Full-Stack Developer & Blockchain Enthusiast" />
        <meta name="twitter:description" content="Explore the portfolio of Bello Habeebullahi Ajetola, a skilled full-stack developer specializing in Node.js, Next.js, TypeScript, MongoDB, and blockchain technologies." />
        <meta name="twitter:image" content="https://icefolio.vercel.app/me/me.jpg" />

        {/* Pinterest Meta */}
        <meta name="pinterest-rich-pin" content="true" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://icefolio.vercel.app" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Security & Performance Headers */}
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="format-detection" content="telephone=no" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Bello Habeebullahi Ajetola",
          "url": "https://icefolio.vercel.app",
          "image": "https://icefolio.vercel.app/me/me.jpg",
          "jobTitle": "Full-Stack Developer",
          "worksFor": { "@type": "Organization", "name": "Freelancer" },
          "sameAs": [
            "https://github.com/Icekid35",
            "https://instagram.com/javascriptpro1",
            "https://bellohabeeb.vercel.app"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nigeria",
            "addressCountry": "NG"
          },
          "knowsAbout": [
            "Node.js", "Next.js", "TypeScript", "MongoDB", "React", "Blockchain",
            "Web Development", "Sui Blockchain", "Progressive Web Apps"
          ],
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Fedral University Of Technology Minna",
            "url": "https://futminna.edu.ng"
          },
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Full-Stack Developer",
            "skills": ["Web Development", "Blockchain", "AI", "PWA", "Automation"]
          }
        })}} />
      </Head>
      <body  >
        {children}
      </body>
    </html>
  );
}
