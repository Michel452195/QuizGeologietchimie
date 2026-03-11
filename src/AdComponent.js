import React, { useEffect } from "react";

export default function AdComponent({ slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: "block", margin: "20px 0" }}
         data-ad-client="ca-pub-3226991016772326"
         data-ad-slot={slot}
         data-ad-format="auto"></ins>
  );
}
