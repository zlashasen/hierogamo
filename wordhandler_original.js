// wordhandler.js - Hantering av ord och tecken
import { getSettings } from './settings.js';

let standardWords = [];
let userWords = [];

export function initWordLists() {
  initStandardWords();
  loadUserWords();
}

export function loadUserWords() {
  try {
    const savedUserWords = localStorage.getItem('hierogamo_userwords');
    if (savedUserWords) {
      userWords = JSON.parse(savedUserWords);
    } else {
      userWords = [];
    }
  } catch (error) {
    console.error('Fel vid laddning av användarord:', error);
    userWords = [];
  }
}

export function selectNextWord() {
  const settings = getSettings();
  const languageFilter = settings.language;
  
  // Filtrera ordbas baserat på språkinställning
  let availableWords = [];
  
  if (languageFilter === 'All') {
    availableWords = [...standardWords, ...userWords];
  } else {
    availableWords = [
      ...standardWords.filter(word => word.Language === languageFilter),
      ...userWords.filter(word => word.Language === languageFilter)
    ];
  }
  
  if (availableWords.length === 0) {
    return null;
  }
  
  // Slumpa ett ord
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}

function initStandardWords() {
  // Hebreiska alfabetet
  const hebrewChars = [
    { Id: 1, Word: 'א', Translation: '', Conjugation: '', Transliteration: 'alef', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 2, Word: 'ב', Translation: '', Conjugation: '', Transliteration: 'bet', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 3, Word: 'בּ', Translation: '', Conjugation: '', Transliteration: 'bet+dagesh', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 4, Word: 'ג', Translation: '', Conjugation: '', Transliteration: 'gimel', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 5, Word: 'גּ', Translation: '', Conjugation: '', Transliteration: 'gimel+dagesh', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 6, Word: 'ד', Translation: '', Conjugation: '', Transliteration: 'dalet', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 7, Word: 'דּ', Translation: '', Conjugation: '', Transliteration: 'dalet+dagesh', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 8, Word: 'ה', Translation: '', Conjugation: '', Transliteration: 'he', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 9, Word: 'ו', Translation: '', Conjugation: '', Transliteration: 'vav', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 10, Word: 'ז', Translation: '', Conjugation: '', Transliteration: 'zayin', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 11, Word: 'ח', Translation: '', Conjugation: '', Transliteration: 'het', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 12, Word: 'ט', Translation: '', Conjugation: '', Transliteration: 'tet', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 13, Word: 'י', Translation: '', Conjugation: '', Transliteration: 'yod', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 14, Word: 'כ', Translation: '', Conjugation: '', Transliteration: 'kaf', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 15, Word: 'כּ', Translation: '', Conjugation: '', Transliteration: 'kaf+dagesh', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 16, Word: 'ך', Translation: '', Conjugation: '', Transliteration: 'kaf sofit', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 17, Word: 'ל', Translation: '', Conjugation: '', Transliteration: 'lamed', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 18, Word: 'מ', Translation: '', Conjugation: '', Transliteration: 'mem', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 19, Word: 'ם', Translation: '', Conjugation: '', Transliteration: 'mem sofit', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 20, Word: 'נ', Translation: '', Conjugation: '', Transliteration: 'nun', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 21, Word: 'ן', Translation: '', Conjugation: '', Transliteration: 'nun sofit', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 22, Word: 'ס', Translation: '', Conjugation: '', Transliteration: 'samekh', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 23, Word: 'ע', Translation: '', Conjugation: '', Transliteration: 'ayin', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 24, Word: 'פ', Translation: '', Conjugation: '', Transliteration: 'pe', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 25, Word: 'פּ', Translation: '', Conjugation: '', Transliteration: 'pe+dagesh', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 26, Word: 'ף', Translation: '', Conjugation: '', Transliteration: 'pe sofit', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 27, Word: 'צ', Translation: '', Conjugation: '', Transliteration: 'tsadi', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 28, Word: 'ץ', Translation: '', Conjugation: '', Transliteration: 'tsadi sofit', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 29, Word: 'ק', Translation: '', Conjugation: '', Transliteration: 'qof', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 30, Word: 'ר', Translation: '', Conjugation: '', Transliteration: 'resh', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 31, Word: 'שׁ', Translation: '', Conjugation: '', Transliteration: 'shin', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 32, Word: 'שׂ', Translation: '', Conjugation: '', Transliteration: 'sin', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 33, Word: 'ת', Translation: '', Conjugation: '', Transliteration: 'tav', Language: 'Hebrew', Metatag: '#alphabet' },
    { Id: 34, Word: 'תּ', Translation: '', Conjugation: '', Transliteration: 'tav+dagesh', Language: 'Hebrew', Metatag: '#alphabet' },
    // Hebreiska vokaler/niqqud
    { Id: 35, Word: 'ְ', Translation: '', Conjugation: '', Transliteration: 'sheva', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 36, Word: 'ֱ', Translation: '', Conjugation: '', Transliteration: 'hataf segol', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 37, Word: 'ֲ', Translation: '', Conjugation: '', Transliteration: 'hataf patah', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 38, Word: 'ֳ', Translation: '', Conjugation: '', Transliteration: 'hataf qamats', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 39, Word: 'ִ', Translation: '', Conjugation: '', Transliteration: 'hiriq', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 40, Word: 'ֵ', Translation: '', Conjugation: '', Transliteration: 'tsere', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 41, Word: 'ֶ', Translation: '', Conjugation: '', Transliteration: 'segol', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 42, Word: 'ַ', Translation: '', Conjugation: '', Transliteration: 'patah', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 43, Word: 'ָ', Translation: '', Conjugation: '', Transliteration: 'qamats', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 44, Word: 'ֹ', Translation: '', Conjugation: '', Transliteration: 'holam', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 45, Word: 'ֻ', Translation: '', Conjugation: '', Transliteration: 'qubuts', Language: 'Hebrew', Metatag: '#vowel' },
    { Id: 46, Word: 'ּ', Translation: '', Conjugation: '', Transliteration: 'dagesh', Language: 'Hebrew', Metatag: '#diacritic' },
    
    // Grekiska alfabetet
    { Id: 101, Word: 'α', Translation: '', Conjugation: '', Transliteration: 'alpha', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 102, Word: 'β', Translation: '', Conjugation: '', Transliteration: 'beta', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 103, Word: 'γ', Translation: '', Conjugation: '', Transliteration: 'gamma', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 104, Word: 'δ', Translation: '', Conjugation: '', Transliteration: 'delta', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 105, Word: 'ε', Translation: '', Conjugation: '', Transliteration: 'epsilon', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 106, Word: 'ζ', Translation: '', Conjugation: '', Transliteration: 'zeta', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 107, Word: 'η', Translation: '', Conjugation: '', Transliteration: 'eta', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 108, Word: 'θ', Translation: '', Conjugation: '', Transliteration: 'theta', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 109, Word: 'ι', Translation: '', Conjugation: '', Transliteration: 'iota', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 110, Word: 'κ', Translation: '', Conjugation: '', Transliteration: 'kappa', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 111, Word: 'λ', Translation: '', Conjugation: '', Transliteration: 'lambda', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 112, Word: 'μ', Translation: '', Conjugation: '', Transliteration: 'mu', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 113, Word: 'ν', Translation: '', Conjugation: '', Transliteration: 'nu', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 114, Word: 'ξ', Translation: '', Conjugation: '', Transliteration: 'xi', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 115, Word: 'ο', Translation: '', Conjugation: '', Transliteration: 'omicron', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 116, Word: 'π', Translation: '', Conjugation: '', Transliteration: 'pi', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 117, Word: 'ρ', Translation: '', Conjugation: '', Transliteration: 'rho', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 118, Word: 'σ', Translation: '', Conjugation: '', Transliteration: 'sigma', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 119, Word: 'ς', Translation: '', Conjugation: '', Transliteration: 'sigma final', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 120, Word: 'τ', Translation: '', Conjugation: '', Transliteration: 'tau', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 121, Word: 'υ', Translation: '', Conjugation: '', Transliteration: 'upsilon', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 122, Word: 'φ', Translation: '', Conjugation: '', Transliteration: 'phi', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 123, Word: 'χ', Translation: '', Conjugation: '', Transliteration: 'chi', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 124, Word: 'ψ', Translation: '', Conjugation: '', Transliteration: 'psi', Language: 'Greek', Metatag: '#alphabet' },
    { Id: 125, Word: 'ω', Translation: '', Conjugation: '', Transliteration: 'omega', Language: 'Greek', Metatag: '#alphabet' },
    // Grekiska accenter och andningsljud
    { Id: 126, Word: 'ά', Translation: '', Conjugation: '', Transliteration: 'alpha+acute', Language: 'Greek', Metatag: '#diacritic' },
    { Id: 127, Word: 'ὰ', Translation: '', Conjugation: '', Transliteration: 'alpha+grave', Language: 'Greek', Metatag: '#diacritic' },
    { Id: 128, Word: 'ᾶ', Translation: '', Conjugation: '', Transliteration: 'alpha+circumflex', Language: 'Greek', Metatag: '#diacritic' },
    { Id: 129, Word: 'ἀ', Translation: '', Conjugation: '', Transliteration: 'alpha+smooth', Language: 'Greek', Metatag: '#diacritic' },
    { Id: 130, Word: 'ἁ', Translation: '', Conjugation: '', Transliteration: 'alpha+rough', Language: 'Greek', Metatag: '#diacritic' }
  ];
  
  standardWords = hebrewChars;
}