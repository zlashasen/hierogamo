// settings.js - Hantering av inställningar
import { loadUserWords } from './wordhandler.js';

const DEFAULT_SETTINGS = {
  speed: 1,
  language: 'Greek'
};

let currentSettings = { ...DEFAULT_SETTINGS };

export function loadSettings() {
  try {
    const savedSettings = localStorage.getItem('hierogamo_settings');
    if (savedSettings) {
      currentSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
    }
  } catch (error) {
    console.error('Fel vid laddning av inställningar:', error);
    currentSettings = { ...DEFAULT_SETTINGS };
  }
  
  return currentSettings;
}

export function saveSettings() {
  try {
    // Läs värden från formuläret
    const speedValue = parseInt(document.getElementById('speed-setting').value);
    const languageValue = document.querySelector('input[name="language"]:checked').value;
    
    // Uppdatera inställningar
    currentSettings.speed = speedValue;
    currentSettings.language = languageValue;
    
    // Spara i localStorage
    localStorage.setItem('hierogamo_settings', JSON.stringify(currentSettings));
  } catch (error) {
    console.error('Fel vid sparande av inställningar:', error);
  }
}

export function updateSettingsForm() {
  document.getElementById('speed-setting').value = currentSettings.speed;
  document.getElementById('speed-value').textContent = currentSettings.speed;
  
  const languageRadio = document.querySelector(`input[name="language"][value="${currentSettings.language}"]`);
  if (languageRadio) {
    languageRadio.checked = true;
  }
}

export function handleSpeedChange(event) {
  const speedValue = event.target.value;
  document.getElementById('speed-value').textContent = speedValue;
}

export function getSettings() {
  return { ...currentSettings };
}

export function handleCSVImport(event) {
  const file = event.target.files[0];
  const statusElement = document.getElementById('csv-status');
  
  if (!file) {
    return;
  }
  
  if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
    statusElement.textContent = 'Fel: Filen måste vara i CSV-format.';
    return;
  }
  
  const reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      const content = e.target.result;
      const lines = content.split('\n');
      let validCount = 0;
      let invalidCount = 0;
      const userWords = [];
      
      for (const line of lines) {
        if (!line.trim()) continue;
        
        const columns = line.split(',');
        
        if (columns.length !== 7) {
          invalidCount++;
          continue;
        }
        
        const id = parseInt(columns[0]);
        if (isNaN(id)) {
          invalidCount++;
          continue;
        }
        
        userWords.push({
          Id: id,
          Word: columns[1],
          Translation: columns[2],
          Conjugation: columns[3],
          Transliteration: columns[4],
          Language: columns[5],
          Metatag: columns[6]
        });
        
        validCount++;
      }
      
      // Spara ordlistan
      localStorage.setItem('hierogamo_userwords', JSON.stringify(userWords));
      statusElement.textContent = `Importerade ${validCount} ord (${invalidCount} rader ignorerades).`;
      
      // Uppdatera ordlistan
      loadUserWords();
    } catch (error) {
      console.error('Fel vid import av CSV:', error);
      statusElement.textContent = 'Fel vid import: ' + error.message;
    }
  };
  
  reader.onerror = function() {
    statusElement.textContent = 'Fel vid läsning av filen.';
  };
  
  reader.readAsText(file);
}