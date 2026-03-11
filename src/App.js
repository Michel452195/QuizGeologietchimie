import React, { useState, useEffect } from 'react';
import Home from './Home';
import CategorySelector from './CategorySelector';
import Question from './Question';
import Result from './Result';
import PremiumBanner from './PremiumBanner';
import Login from './Login';
import Settings from './Settings';
import LoadingSpinner from './LoadingSpinner';
import { useAuth, useQuiz, useTheme, useAds } from './hooks';
import AdComponent from './AdComponent';

const App = () => {
  const { loading, error, isPremium, user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { canAccessPremium } = useAds();

  const [currentView, setCurrentView] = useState('home'); // 'home', 'category', 'quiz', 'settings'
  const [selectedCategory, setSelectedCategory] = useState('mixed');
  const [showSettings, setShowSettings] = useState(false);
  const [quizMode, setQuizMode] = useState(null); // null, 'free', 'premium'

  const {
    currentQuestionIndex,
    score,
    answers,
    timeLeft,
    quizFinished,
    selectedChoice,
    isAnswered,
    shuffledQuestions,
    handleAnswer,
    restartQuiz,
    currentQuestion
  } = useQuiz(quizMode === 'premium' || (quizMode === null && isPremium), selectedCategory);

  useEffect(() => {
    if (!(isPremium || canAccessPremium)) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore errors from ads script in development
      }
    }
  }, [isPremium, canAccessPremium]);

  const handleStartQuiz = (category) => {
    setSelectedCategory(category);
    setCurrentView('quiz');
  };

  const handleSelectMode = (isPremiumMode) => {
    setQuizMode(isPremiumMode ? 'premium' : 'free');
    setCurrentView('category');
  };

  const handleLogout = async () => {
    await logout();
    setCurrentView('home');
    setQuizMode(null);
    restartQuiz();
  };

  const handleUpgrade = () => {
    setShowSettings(true);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('mixed');
    setQuizMode(null);
    restartQuiz();
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="app error-container">
        <div className="error-card">
          <h2>Erreur de connexion</h2>
          <p>{error}</p>
          <button className="button" onClick={() => window.location.reload()}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (showSettings) {
    return (
      <Settings
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onClose={handleCloseSettings}
      />
    );
  }

  if (currentView === 'home') {
    return (
      <Home
        onStartQuiz={handleSelectMode}
        onGoPremium={handleUpgrade}
        isPremium={isPremium || canAccessPremium}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === 'category') {
    return (
      <CategorySelector
        onSelectCategory={handleStartQuiz}
        onBack={handleBackToHome}
        isPremium={isPremium || canAccessPremium}
      />
    );
  }

  if (quizFinished) {
    return (
      <div className="app">
        <Result
          score={score}
          total={shuffledQuestions.length}
          questions={shuffledQuestions}
          answers={answers}
          isPremium={isPremium || canAccessPremium}
          onRestart={() => setCurrentView('category')}
          onBackToHome={handleBackToHome}
        />
      </div>
    );
  }

 return (
  <div className="app">
    <div className="quiz-container">
      <header className="quiz-header">
        <button className="back-button" onClick={handleBackToHome}>
          ← Retour
        </button>
        <h1>
          Quiz {selectedCategory === 'geology' ? 'Géologie' : selectedCategory === 'chemistry' ? 'Chimie' : 'Mixte'} {isPremium || canAccessPremium ? '- Premium' : '- Gratuit'}
        </h1>
        <button className="settings-button" onClick={handleShowSettings}>
          ⚙️
        </button>
      </header>

      {/* Pub en haut */}
      {!isPremium && <AdComponent slot="1111111111" />}

      <Question
        question={currentQuestion?.question}
        choices={currentQuestion?.choices}
        onAnswer={handleAnswer}
        selectedChoice={selectedChoice}
        timeLeft={timeLeft}
        isPremium={isPremium || canAccessPremium}
        isAnswered={isAnswered}
        correctIndex={currentQuestion?.correctIndex}
      />

  {/* Pub après la première question */}
      {!isPremium && currentQuestionIndex === 0 && <AdComponent slot="2222222222" />}

      {!(isPremium || canAccessPremium) && currentQuestionIndex === 0 && (
        <PremiumBanner onUpgrade={handleUpgrade} />
      )}

      <div className="quiz-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
          ></div>
        </div>
        <span className="progress-text">
          Question {currentQuestionIndex + 1} sur {shuffledQuestions.length}
        </span>
      </div>

      {/* Pub en bas */}
      {!isPremium && <AdComponent slot="3333333333" />}

    </div>
  </div>
  );
  };
