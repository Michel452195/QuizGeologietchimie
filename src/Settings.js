import React, { useState } from 'react';

const Settings = ({ isDarkMode, toggleDarkMode, onClose }) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', label: 'Apparence', icon: '🎨' },
    { id: 'about', label: 'À propos', icon: 'ℹ️' }
  ];

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <div className="header-title">
            <div className="settings-icon">⚙️</div>
            <h2>Paramètres</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
        </div>

        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'appearance' && (
            <div className="setting-group">
              <div className="group-header">
                <h3>Apparence</h3>
                <p>Personnalisez l'apparence de l'application</p>
              </div>
              <div className="setting-item theme-setting">
                <div className="setting-info">
                  <div className="setting-icon">🌙</div>
                  <div className="setting-details">
                    <label htmlFor="darkMode" className="setting-label">Mode sombre</label>
                    <p className="setting-description">
                      Basculez entre le thème clair et sombre
                    </p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="darkMode"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="setting-group">
              <div className="group-header">
                <h3>À propos</h3>
                <p>Informations sur l'application</p>
              </div>

              <div className="about-content">
                <div className="app-info">
                  <div className="app-logo">
                    <span className="logo-icon">🧪</span>
                  </div>
                  <div className="app-details">
                    <h4>Quiz Géologie & Chimie</h4>
                    <p className="app-version">Version 1.0.0</p>
                    <p className="app-description">
                      Testez vos connaissances en géologie et chimie avec notre quiz interactif.
                      Deux modes disponibles : gratuit et premium.
                    </p>
                  </div>
                </div>

                <div className="features-list">
                  <h5>Fonctionnalités</h5>
                  <ul>
                    <li>📚 Plus de 200 questions</li>
                    <li>🎮 Deux modes de jeu</li>
                    <li>🌙 Mode sombre/clair</li>
                    <li>💰 Système de monétisation</li>
                    <li>🏆 Scores et corrections</li>
                  </ul>
                </div>

                <div className="contact-info">
                  <h5>Contact</h5>
                  <div className="contact-details">
                    <p><strong>Téléphone:</strong> 0826122119</p>
                    <p><strong>Email:</strong> katchuvamichael@gmail.com</p>
                    <p><strong>Développeur:</strong> Kachuva Lambya</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;