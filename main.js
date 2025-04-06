// main.js - Huvudmodul för spelet
import { showScreen, updateScoreDisplay, setupInputHandling, clearInputs } from './ui.js';
import { startGame, stopGame, checkAnswer } from './game.js';
import { loadSettings, saveSettings, updateSettingsForm, handleSpeedChange, 
         handleCSVImport } from './settings.js';
import { isHighScore, addHighScore, loadHighScores, displayHighScores } from './highscore.js';
import { initWordLists } from './wordhandler.js';

// Initialisering när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
  // Ladda inställningar, high scores och ordlistor
  loadSettings();
  loadHighScores();
  initWordLists();
  updateSettingsForm();

  // Event listeners för huvudmenyn
  document.getElementById('new-game-btn').addEventListener('click', () => {
    // Visa en dialogruta för att fråga om antal ord
    const wordCount = prompt('Hur många ord vill du spela med?', '15');
    
    // Kontrollera att det är ett giltigt nummer
    const numWords = parseInt(wordCount);
    
    if (isNaN(numWords) || numWords < 1) {
      alert('Vänligen ange ett giltigt antal ord (minst 1)');
      return;
    }
    
    showScreen('game-screen');
    startGame(numWords);
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    showScreen('settings-screen');
  });

  document.getElementById('highscore-btn').addEventListener('click', () => {
    showScreen('highscore-screen');
    displayHighScores();
  });

  // Event listeners för inställningar
  document.getElementById('speed-setting').addEventListener('input', handleSpeedChange);
  document.getElementById('csv-import').addEventListener('change', handleCSVImport);
  document.getElementById('save-settings-btn').addEventListener('click', () => {
    saveSettings();
    showScreen('main-menu');
  });
  document.getElementById('back-from-settings-btn').addEventListener('click', () => {
    showScreen('main-menu');
  });

  // Event listeners för high score
  document.getElementById('back-from-highscore-btn').addEventListener('click', () => {
    showScreen('main-menu');
  });

  // Event listeners för game over
  document.getElementById('back-to-menu-btn').addEventListener('click', () => {
    showScreen('main-menu');
  });
  document.getElementById('save-highscore-btn').addEventListener('click', () => {
    const initials = document.getElementById('highscore-initials').value.toUpperCase().substring(0, 3);
    if (initials.length > 0) {
      const score = parseInt(document.getElementById('score-display').textContent.split(':')[1].split('|')[0].trim());
      const language = loadSettings().language;
      addHighScore(initials, score, language);
      document.getElementById('highscore-entry').classList.add('hidden');
    }
  });

  // Konfigurera input-hantering för spelet
  setupInputHandling(checkAnswer);

  // Visa huvudmenyn
  showScreen('main-menu');
});