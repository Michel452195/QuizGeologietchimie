import React, { useState } from 'react';

const CategorySelector = ({ onSelectCategory, onBack, isPremium }) => {
  const [selectedCategory, setSelectedCategory] = useState('mixed');
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = [
    {
      id: 'geology',
      name: 'Géologie',
      icon: '🗿',
      description: 'Roches, minéraux, tectonique',
      questions: 50,
      color: 'geology',
      gradient: 'linear-gradient(135deg, #8B4513, #A0522D)',
      isPremium: false
    },
    {
      id: 'chemistry',
      name: 'Chimie',
      icon: '⚗️',
      description: 'Éléments, réactions, formules',
      questions: 50,
      color: 'chemistry',
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      isPremium: false
    },
    {
      id: 'mixed',
      name: 'Mixte',
      icon: '🔬',
      description: 'Questions mélangées avancées',
      questions: 100,
      color: 'mixed',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      isPremium: true
    }
  ];

  const handleCategorySelect = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category.isPremium && !isPremium) {
      // Pour les utilisateurs non premium, on pourrait afficher un message ou rediriger
      // Pour l'instant, on permet la sélection mais on gère dans handleStartQuiz
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleStartQuiz = () => {
    if (selectedCategory) {
      setIsAnimating(true);
      setTimeout(() => {
        onSelectCategory(selectedCategory);
      }, 500);
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="category-selector">
      <div className="category-header">
        <button className="back-btn" onClick={onBack}>
          <span className="back-icon">←</span>
          <span>Retour</span>
        </button>
        <div className="header-content">
          <h2>Choisissez une catégorie</h2>
          <p>Sélectionnez le domaine qui vous intéresse</p>
        </div>
      </div>

      <div className="categories-container">
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'selected' : ''} ${category.color} ${category.isPremium && !isPremium ? 'premium-locked' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="card-background" style={{ background: category.gradient }}></div>
              {category.isPremium && (
                <div className="premium-badge">
                  <span className="premium-icon">⭐</span>
                  <span className="premium-text">Premium</span>
                </div>
              )}
              <div className="card-content">
                <div className="category-icon">
                  <span className="icon-bg">{category.icon}</span>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="question-badge">
                    <span className="question-count">{category.questions}</span>
                    <span className="question-label">questions</span>
                  </div>
                </div>
                <div className="selection-indicator">
                  {selectedCategory === category.id && (
                    <div className="checkmark">✓</div>
                  )}
                </div>
              </div>
              {category.isPremium && !isPremium && (
                <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                  <p>Premium requis</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="selection-summary">
            <div className="summary-content">
              <div className="selected-category-display">
                <div className="selected-icon" style={{ background: selectedCategoryData?.gradient }}>
                  {selectedCategoryData?.icon}
                </div>
                <div className="selected-info">
                  <h4>Catégorie sélectionnée</h4>
                  <p>{selectedCategoryData?.name}</p>
                  <span className="selection-note">
                    {selectedCategoryData?.questions} questions • Sélection aléatoire
                  </span>
                </div>
              </div>
              <button
                className="start-quiz-btn"
                onClick={handleStartQuiz}
                disabled={isAnimating}
              >
                <span className="btn-icon">🎯</span>
                <span className="btn-text">
                  {isAnimating ? 'Chargement...' : 'Commencer le Quiz'}
                </span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="category-footer">
        <div className="footer-content">
          <div className="info-icon">💡</div>
          <p>Les questions seront sélectionnées aléatoirement dans la catégorie choisie pour une expérience unique à chaque partie.</p>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;