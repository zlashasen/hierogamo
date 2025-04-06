// ui.js - Användargränssnitt & DOM-hantering

export function showScreen(screenId) {
    // Dölj alla skärmar
    document.querySelectorAll('.container > div').forEach(screen => {
      screen.classList.add('hidden');
    });
    
    // Visa den valda skärmen
    document.getElementById(screenId).classList.remove('hidden');
    
    // Särskild hantering för vissa skärmar
    if (screenId === 'game-screen') {
      focusWordInput();
    }
  }
  
  export function updateScoreDisplay(score, currentWords = 0, totalWords = 0) {
    if (totalWords > 0) {
      document.getElementById('score-display').textContent = `Poäng: ${score} | Ord: ${currentWords}/${totalWords}`;
    } else {
      document.getElementById('score-display').textContent = `Poäng: ${score}`;
    }
  }
  
  export function createFallingWord(word, x) {
    const element = document.createElement('div');
    element.classList.add('falling-word');
    element.textContent = word.Word;
    element.dataset.id = word.Id;
    element.style.left = `${x}%`;
    element.style.top = '-50px';
    
    document.getElementById('game-area').appendChild(element);
    return element;
  }
  
  export function moveFallingWord(element, y) {
    element.style.top = `${y}px`;
  }
  
  export function removeFallingWord(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  
  export function showWordFeedback(word, x, y, score, isGameOver = false) {
    const gameArea = document.getElementById('game-area');
    const infoPopup = document.createElement('div');
    infoPopup.classList.add('info-popup');
    
    if (isGameOver) {
      infoPopup.classList.add('game-over-popup');
    }
    
    let popupContent = '';
    
    if (!isGameOver) {

      // Hämta aktuell hastighetsinställning för att visa i popup
      const speedFactor = parseInt(document.getElementById('speed-setting')?.value || 1);
      popupContent += `<strong>+${score} poäng</strong>`;
      
      // Visa hastighetsbonus om hastigheten > 1
      if (speedFactor > 1) {
        popupContent += ` <span class="speed-bonus">(${speedFactor}x bonus!)</span>`;
      }
      
      popupContent += `<br>`;
    } else {
      popupContent += `<strong>Spel slut!</strong><br>`;
      popupContent += `<span class="missed-word">${word.Word}</span><br>`;
    }
    
    if (word.Translation) {
      popupContent += `${word.Translation}<br>`;
    }
    
    if (word.Conjugation) {
      popupContent += `<em>${word.Conjugation}</em><br>`;
    }
    
    if (word.Transliteration) {
      popupContent += `(${word.Transliteration})`;
    }
    
    infoPopup.innerHTML = popupContent;
    infoPopup.style.left = `${x}px`;
    infoPopup.style.top = `${y}px`;
    
    gameArea.appendChild(infoPopup);
    
    // Ta bort popup efter animationen, men låt game over-popup stanna längre
    const delay = isGameOver ? 2000 : 1500;
    
    // Ta bort popup efter animationen
    setTimeout(() => {
      if (infoPopup.parentNode) {
        infoPopup.parentNode.removeChild(infoPopup);
      }
    }, delay);
  }
  
  export function showExplosion(x, y) {
    const gameArea = document.getElementById('game-area');
    const explosion = document.createElement('div');
    explosion.classList.add('word-explosion');
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    
    gameArea.appendChild(explosion);
    
    // Ta bort explosion efter animationen
    setTimeout(() => {
      if (explosion.parentNode) {
        explosion.parentNode.removeChild(explosion);
      }
    }, 500);
  }
  
  export function setupInputHandling(checkAnswerCallback) {
    const wordInput = document.getElementById('input-word');
    const formInput = document.getElementById('input-form');
    const translationInput = document.getElementById('input-translation');
    
    // Lyssna på Enter i alla input-fält
    [wordInput, formInput, translationInput].forEach(input => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          checkAnswerCallback({
            word: wordInput.value,
            form: formInput.value,
            translation: translationInput.value
          });
        }
      });
    });
  }
  
  export function clearInputs() {
    document.getElementById('input-word').value = '';
    document.getElementById('input-form').value = '';
    document.getElementById('input-translation').value = '';
  }
  
  export function focusWordInput() {
    document.getElementById('input-word').focus();
  }
  
  export function shakeInputs() {
    const inputArea = document.getElementById('input-area');
    inputArea.classList.add('shake');
    
    setTimeout(() => {
      inputArea.classList.remove('shake');
    }, 500);
  }