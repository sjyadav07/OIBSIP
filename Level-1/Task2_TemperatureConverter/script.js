const tempInput = document.getElementById('temp');
const scaleOptions = document.querySelectorAll('.scale-option');
const inputUnitBadge = document.getElementById('inputUnitBadge');
const convertBtn = document.getElementById('convertBtn');
const celsiusVal = document.getElementById('celsiusVal');
const fahrenheitVal = document.getElementById('fahrenheitVal');
const kelvinVal = document.getElementById('kelvinVal');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');

let currentUnit = 'C';

scaleOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    scaleOptions.forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    currentUnit = opt.dataset.unit;
    if (currentUnit === 'C') inputUnitBadge.textContent = '°C';
    if (currentUnit === 'F') inputUnitBadge.textContent = '°F';
    if (currentUnit === 'K') inputUnitBadge.textContent = 'K';
    if (tempInput.value.trim() !== '') convert();
  });
});

function convert() {
  const raw = tempInput.value.trim();
  if (raw === '') {
    showError('enter temperature');
    resetDisplays();
    return;
  }
  const num = Number(raw);
  if (isNaN(num) || !isFinite(num)) {
    showError('invalid number');
    resetDisplays();
    return;
  }
  hideError();

  let celsius, fahrenheit, kelvin;

  if (currentUnit === 'C') {
    celsius = num;
    fahrenheit = celsius * 9/5 + 32;
    kelvin = celsius + 273.15;
  } else if (currentUnit === 'F') {
    fahrenheit = num;
    celsius = (fahrenheit - 32) * 5/9;
    kelvin = celsius + 273.15;
  } else {
    kelvin = num;
    celsius = kelvin - 273.15;
    fahrenheit = celsius * 9/5 + 32;
  }

  celsiusVal.textContent = formatNumber(celsius);
  fahrenheitVal.textContent = formatNumber(fahrenheit);
  kelvinVal.textContent = formatNumber(kelvin);
}

function formatNumber(value) {
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(2);
}

function resetDisplays() {
  celsiusVal.textContent = '—';
  fahrenheitVal.textContent = '—';
  kelvinVal.textContent = '—';
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorContainer.classList.remove('error-hidden');
}

function hideError() {
  errorContainer.classList.add('error-hidden');
}

convertBtn.addEventListener('click', convert);
tempInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') convert();
});
tempInput.addEventListener('input', () => {
  if (tempInput.value.trim() !== '') hideError();
});

tempInput.value = '0';
convert();