// game.js - Spellogik
import { updateScoreDisplay, createFallingWord, moveFallingWord, 
    removeFallingWord, showWordFeedback, showExplosion, 
    clearInputs, focusWordInput, shakeInputs } from './ui.js';
import { selectNextWord } from './wordhandler.js';
import { getSettings } from './settings.js';
import { showScreen } from './ui.js';
import { isHighScore } from './highscore.js';

let currentWord = null;
let wordElement = null;
let score = 0;
let gameLoopId = null;
let settings = null;
let gameStartTime = 0;
let wordStartTime = 0;
let wordCount = 0;
let maxWords = 10; // Standard antal ord

export function startGame(wordLimit = 10) {
// Nollställ spelläge
score = 0;
wordCount = 0;
maxWords = wordLimit;
updateScoreDisplay(0, wordCount, maxWords);
settings = getSettings();
gameStartTime = Date.now();

// Starta spelloopen
spawnNewWord();
gameLoopId = requestAnimationFrame(gameLoop);
}

export function stopGame() {
if (gameLoopId !== null) {
cancelAnimationFrame(gameLoopId);
gameLoopId = null;
}
}

export function handleGameOver(completed = false) {
if (!completed && (!wordElement || !currentWord)) {
stopGame();
showGameOverScreen();
return;
}

// Stoppa spelloop men behåll ordet synligt om inte komplett
if (gameLoopId !== null) {
cancelAnimationFrame(gameLoopId);
gameLoopId = null;
}

if (completed) {
// Spelet är klart med alla ord - visa bara game over
stopGame();
showGameOverScreen(true);
return;
}

// Lägg till en mörkare overlay på spelområdet
const gameArea = document.getElementById('game-area');
const overlay = document.createElement('div');
overlay.classList.add('game-over-overlay');
gameArea.appendChild(overlay);

// Visa information om ordet med isGameOver=true (centrerat i spelområdet)
showWordFeedback(currentWord, gameArea.clientWidth / 2, gameArea.clientHeight / 2, 0, true);

// Visa explosion där ordet var
const rect = wordElement.getBoundingClientRect();
const gameRect = gameArea.getBoundingClientRect();
const relativeX = rect.left + rect.width / 2 - gameRect.left;
const relativeY = rect.top + rect.height / 2 - gameRect.top;
showExplosion(relativeX, relativeY);

// Visa Game Over-skärmen efter en kort fördröjning
setTimeout(() => {
// Ta bort ordet och overlay
if (wordElement && wordElement.parentNode) {
 wordElement.parentNode.removeChild(wordElement);
}
if (overlay && overlay.parentNode) {
 overlay.parentNode.removeChild(overlay);
}
wordElement = null;
currentWord = null;

showGameOverScreen();
}, 2500);
}

function showGameOverScreen(completed = false) {
const gameOverMessage = document.getElementById('game-over-message');
const highscoreEntry = document.getElementById('highscore-entry');

if (completed) {
gameOverMessage.textContent = `Bra jobbat! Du klarade alla ${maxWords} ord!`;
} else if (isHighScore(score)) {
gameOverMessage.textContent = 'Grattis! Du kom in på High score-listan!';
} else {
gameOverMessage.textContent = 'Bra kämpat!';
}

if (isHighScore(score)) {
highscoreEntry.classList.remove('hidden');
document.getElementById('highscore-initials').focus();
} else {
highscoreEntry.classList.add('hidden');
}

showScreen('game-over-screen');
}

export function checkAnswer(userAnswer) {
if (!currentWord || !wordElement) return;

let isCorrect = false;

// Kontrollera om ordet är ett tecken utan översättning/konjugation
const isCharacter = !currentWord.Translation && !currentWord.Conjugation;

if (isCharacter) {
// För tecken: kontrollera att input-word matchar och övriga fält är tomma
isCorrect = (
 userAnswer.word === currentWord.Word &&
 userAnswer.form === '' &&
 userAnswer.translation === ''
);
} else {
// För ord: kontrollera att alla fält matchar
isCorrect = (
 userAnswer.word === currentWord.Word &&
 userAnswer.form === (currentWord.Conjugation || '') &&
 userAnswer.translation === (currentWord.Translation || '')
);
}

if (isCorrect) {
// Beräkna poäng baserat på position i spelområdet
const gameArea = document.getElementById('game-area');
const rect = wordElement.getBoundingClientRect();
const gameRect = gameArea.getBoundingClientRect();

// Beräkna hur långt texten har fallit relativt till spelområdets höjd (0 = topp, 1 = botten)
const totalHeight = gameRect.height;
const currentPosition = rect.top - gameRect.top;
const positionRatio = currentPosition / totalHeight;

// Beräkna baspoäng baserat på position
const maxPoints = 100;
const basePoints = Math.round(maxPoints * Math.pow(1 - positionRatio, 2));

// Multiplicera med hastighetsfaktorn för att få slutpoängen
const speedFactor = settings.speed;
let points = basePoints * speedFactor;

// Uppdatera totalpoängen
score += points;

// Öka ordräknaren
wordCount++;

// Beräkna position för visuell feedback
const relativeX = rect.left + rect.width / 2 - gameRect.left;
const relativeY = rect.top + rect.height / 2 - gameRect.top;

showExplosion(relativeX, relativeY);
showWordFeedback(currentWord, relativeX, relativeY, points);
updateScoreDisplay(score, wordCount, maxWords);
removeFallingWord(wordElement);
clearInputs();
focusWordInput();

// Kontrollera om max antal ord uppnåtts
if (wordCount >= maxWords) {
 handleGameOver(true); // true indikerar framgångsrik slutförande
 return;
}

// Nästa ord
spawnNewWord();
} else {
// Fel svar
shakeInputs();
}
}

function gameLoop(timestamp) {
if (!wordElement || !currentWord) {
gameLoopId = requestAnimationFrame(gameLoop);
return;
}

const gameArea = document.getElementById('game-area');
const maxY = gameArea.clientHeight;

// Beräkna new Y-position baserat på hastighet och tid
const elapsedTime = timestamp - gameStartTime;
const speedFactor = settings.speed;
const baseSpeed = 5; // pixlar per sekund vid hastighet 1 (sänkt från 50 för långsammare spel)
const speed = baseSpeed * speedFactor;

// Beräkna position
const timeSinceStart = (Date.now() - wordStartTime) / 1000;
const distance = timeSinceStart * speed;
const newY = distance;

// Uppdatera position
moveFallingWord(wordElement, newY);

// Kontrollera om ordet har nått botten
const rect = wordElement.getBoundingClientRect();
const gameRect = gameArea.getBoundingClientRect();

if (rect.bottom >= gameRect.bottom) {
handleGameOver();
return;
}

// Fortsätt loopen
gameLoopId = requestAnimationFrame(gameLoop);
}

function spawnNewWord() {
// Välj ett ord från listan
currentWord = selectNextWord();

if (!currentWord) {
console.error('Inga ord tillgängliga för valt språk!');
handleGameOver();
return;
}

// Slumpmässig X-position (15-85%)
const x = 15 + Math.random() * 70;

// Skapa elementet
wordElement = createFallingWord(currentWord, x);
wordStartTime = Date.now();
}