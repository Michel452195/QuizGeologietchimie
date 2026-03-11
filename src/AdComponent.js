// AdComponent.js
import React, { useEffect } from "react";

export default function AdComponent({ slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
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

import AdComponent from "./AdComponent";

function QuizPage() {
  return (
    <div>
      <h1>Quiz Géologie & Chimie</h1>

      {/* Pub en haut */}
      <AdComponent slot="1111111111" />

      {/* Contenu du quiz */}
      <QuizQuestions />

      {/* Pub après le quiz */}
      <AdComponent slot="2222222222" />

      {/* Footer */}
      <Footer />
    </div>
  );
}
