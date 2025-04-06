// highscore.js - Hantering av high scores

const HIGH_SCORE_LIST_SIZE = 10;
let highScores = [];

export function loadHighScores() {
  try {
    const savedHighScores = localStorage.getItem('hierogamo_highscores');
    if (savedHighScores) {
      highScores = JSON.parse(savedHighScores);
    } else {
      highScores = [];
    }
  } catch (error) {
    console.error('Fel vid laddning av high scores:', error);
    highScores = [];
  }
}

export function saveHighScores() {
  try {
    localStorage.setItem('hierogamo_highscores', JSON.stringify(highScores));
  } catch (error) {
    console.error('Fel vid sparande av high scores:', error);
  }
}

export function isHighScore(score) {
  if (highScores.length < HIGH_SCORE_LIST_SIZE) {
    return true;
  }
  
  return highScores.some(entry => entry.score < score);
}

export function addHighScore(initials, score, language) {
  // Hämta antal ord från game.js
  const wordCount = document.getElementById('score-display').textContent.split('|')[1]?.trim().split('/')[1] || '?';
  
  // Lägg till ny high score
  highScores.push({
    initials: initials.toUpperCase(),
    score: score,
    words: wordCount,
    language: language
  });
  
  // Sortera efter poäng (fallande)
  highScores.sort((a, b) => b.score - a.score);
  
  // Trimma till max storlek
  if (highScores.length > HIGH_SCORE_LIST_SIZE) {
    highScores = highScores.slice(0, HIGH_SCORE_LIST_SIZE);
  }
  
  // Spara
  saveHighScores();
}

export function getHighScores() {
  return [...highScores];
}

export function displayHighScores() {
  const highScoreList = document.getElementById('highscore-list');
  highScoreList.innerHTML = '';
  
  if (highScores.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Inga high scores ännu!';
    highScoreList.appendChild(li);
    return;
  }
  
  for (const score of highScores) {
    const li = document.createElement('li');
    
    const initialsSpan = document.createElement('span');
    initialsSpan.classList.add('highscore-initials');
    initialsSpan.textContent = score.initials;
    
    const scoreSpan = document.createElement('span');
    scoreSpan.classList.add('highscore-score');
    scoreSpan.textContent = score.score;
    
    const wordsSpan = document.createElement('span');
    wordsSpan.classList.add('highscore-words');
    wordsSpan.textContent = score.words || '?';
    
    const languageSpan = document.createElement('span');
    languageSpan.classList.add('highscore-language');
    languageSpan.textContent = score.language;
    
    li.appendChild(initialsSpan);
    li.appendChild(scoreSpan);
    li.appendChild(wordsSpan);
    li.appendChild(languageSpan);
    
    highScoreList.appendChild(li);
  }
}