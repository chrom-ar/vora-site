import "./globals.css";

const redirectScript = `(function () {
  try {
    if (location.pathname !== "/") return;
    var stored = localStorage.getItem("vora-lang");
    if (stored === "en") return;
    if (stored === "es") { location.replace("/es/"); return; }
    var lang = (navigator.language || "").toLowerCase();
    if (lang.indexOf("es") === 0) location.replace("/es/");
  } catch (_) {}
})();`;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <head>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
