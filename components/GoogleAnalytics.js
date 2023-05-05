import Script from "next/script";

// Global Tag (gtag.js) - Google Analytics
const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-K85962EK07"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K85962EK07');`}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
