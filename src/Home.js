import React, { useState, useEffect } from 'react';

const Home = ({ onStartQuiz, onGoPremium, isPremium, user, onLogout }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <div className="welcome-screen">
        <div className="welcome-content">
          <div className="logo-container">
            <div className="logo-icon">🧪</div>
            <h1 className="welcome-title">Quiz Géologie & Chimie</h1>
          </div>
          <div className="welcome-subtitle">
            <span>Testez vos connaissances</span>
            <span>scientifiques</span>
          </div>
          <div className="loading-animation">
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            <p>Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🧪</div>
            <div className="title-section">
              <h1>Quiz Géologie & Chimie</h1>
              <p className="subtitle">Testez vos connaissances scientifiques</p>
            </div>
            {user && (
              <button className="logout-btn" onClick={onLogout}>
                <span className="logout-icon">🚪</span>
                <span>Déconnexion</span>
              </button>
            )}
          </div>
          <div className="header-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
          <div className="quick-start">
            <button
              className="quick-start-btn"
              onClick={() => onStartQuiz(false)}
            >
              <span className="quick-icon">🎯</span>
              <span>Commencer le Quiz</span>
              <span className="quick-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="quiz-modes-grid">
          <div className="quiz-mode-card free-mode">
            <div className="card-header">
              <div className="mode-icon">
                <span className="icon-bg">🆓</span>
              </div>
              <div className="mode-badge free">GRATUIT</div>
            </div>
            <div className="card-content">
              <h3>Mode Gratuit</h3>
              <ul className="features-list">
                <li>
                  <span className="feature-icon">📚</span>
                  <span>10 questions de base</span>
                </li>
                <li>
                  <span className="feature-icon">⏱️</span>
                  <span>Chronomètre 15 secondes</span>
                </li>
                <li>
                  <span className="feature-icon">🎯</span>
                  <span>Score final</span>
                </li>
              </ul>
            </div>
            <div className="card-footer">
              <button
                className="play-btn free"
                onClick={() => onStartQuiz(false)}
              >
                <span className="play-icon">▶</span>
                <span>Commencer</span>
              </button>
            </div>
          </div>

          <div className="quiz-mode-card premium-mode">
            <div className="card-header">
              <div className="mode-icon">
                <span className="icon-bg">⭐</span>
              </div>
              <div className="mode-badge premium">PREMIUM</div>
            </div>
            <div className="card-content">
              <h3>Mode Premium</h3>
              <ul className="features-list">
                <li>
                  <span className="feature-icon">🎓</span>
                  <span>Questions avancées niveau universitaire</span>
                </li>
                <li>
                  <span className="feature-icon">⏱️</span>
                  <span>Chronomètre 20 secondes</span>
                </li>
                <li>
                  <span className="feature-icon">📖</span>
                  <span>Corrections détaillées</span>
                </li>
                <li>
                  <span className="feature-icon">🏆</span>
                  <span>Score avec analyse</span>
                </li>
              </ul>
            </div>
            <div className="card-footer">
              {isPremium ? (
                <button
                  className="play-btn premium"
                  onClick={() => onStartQuiz(true)}
                >
                  <span className="play-icon">▶</span>
                  <span>Commencer Premium</span>
                </button>
              ) : (
                <button
                  className="play-btn premium locked"
                  onClick={onGoPremium}
                >
                  <span className="lock-icon">🔒</span>
                  <span>Débloquer Premium</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="features-showcase">
          <div className="showcase-item">
            <div className="showcase-icon">🗿</div>
            <h4>Géologie</h4>
            <p>Roches, minéraux, tectonique</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-icon">⚗️</div>
            <h4>Chimie</h4>
            <p>Éléments, réactions, formules</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-icon">🔬</div>
            <h4>Mixte</h4>
            <p>Questions combinées</p>
          </div>
        </div>
      </div>

      <div className="home-footer">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <span className="stat-number">200+</span>
              <span className="stat-label">Questions</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-content">
              <span className="stat-number">2</span>
              <span className="stat-label">Modes</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <span className="stat-number">∞</span>
              <span className="stat-label">Fun</span>
            </div>
          </div>
        </div>
        <div className="footer-decoration">
          <div className="decoration-wave"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;