import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => setIsAnimating(true), 100);
  }, []);

  const handleToggleSignUp = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setError('');
      // Animation spéciale pour nouveaux utilisateurs
      if (!isSignUp) {
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 2000);
      }
      setTimeout(() => setIsAnimating(true), 150);
    }, 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Plus besoin d'appeler onLogin - useAuth gère automatiquement l'état
    } catch (err) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('L\'authentification n\'est pas activée. Utilisez le système de tokens avec les pubs pour accéder au premium.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="login-container">
      {showWelcome && (
        <div className="welcome-animation">
          <div className="welcome-content">
            <div className="sparkle">✨</div>
            <h3>Bienvenue !</h3>
            <p>Créons votre compte premium</p>
          </div>
        </div>
      )}
      <div className={`login-card ${isAnimating ? 'animate-in' : 'animate-out'} ${isSignUp ? 'signup-mode' : 'login-mode'}`}>
        <div className="login-header">
          <div className="logo-animation">
            <span className="logo-icon">🧪</span>
          </div>
          <h2 className="login-title">
            {isSignUp ? 'Rejoignez Premium' : 'Bienvenue Premium'}
          </h2>
          <p className="login-subtitle">
            {isSignUp ? 'Accédez à toutes les fonctionnalités avancées' : 'Connectez-vous pour continuer'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-icon">📧</div>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">🔒</div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <button type="submit" className="login-btn">
            <span className="btn-text">
              {isSignUp ? 'Créer mon compte' : 'Se connecter'}
            </span>
            <span className="btn-arrow">→</span>
          </button>
        </form>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="login-footer">
          <button onClick={handleToggleSignUp} className="toggle-btn">
            <span className="toggle-text">
              {isSignUp ? 'Déjà membre ? Se connecter' : 'Nouveau ? Créer un compte'}
            </span>
            <span className="toggle-arrow">{isSignUp ? '←' : '→'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;