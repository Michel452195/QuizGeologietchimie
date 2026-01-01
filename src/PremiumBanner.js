import React from 'react';

const PremiumBanner = ({ onUpgrade }) => {
  return (
    <div className="premium-banner">
      <h2>🔒 Accès Premium</h2>
      <p>Débloquez des questions avancées de niveau universitaire, un chronomètre étendu et des corrections détaillées.</p>
      <button className="button" onClick={onUpgrade}>Se connecter pour accéder</button>
      <p><em>Authentification requise pour les fonctionnalités premium</em></p>
    </div>
  );
};

export default PremiumBanner;