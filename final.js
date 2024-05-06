document.querySelectorAll('.destination').forEach(function(destination) {
  destination.addEventListener('mouseenter', function(event) {
    var price = event.currentTarget.querySelector('.price');
    price.style.display = 'block';
    updatePricePosition(event, price);
  });

  destination.addEventListener('mousemove', function(event) {
    var price = event.currentTarget.querySelector('.price');
    updatePricePosition(event, price);
  });

  destination.addEventListener('mouseleave', function(event) {
    var price = event.currentTarget.querySelector('.price');
    price.style.display = 'none';
  });
});

function updatePricePosition(event, price) {
  price.style.left = (event.pageX) + 'px';
  price.style.top = (event.pageY - 500) + 'px';
}

/* Dark Mode */

document.addEventListener("DOMContentLoaded", function() {
  const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
  const body = document.body;

  if (darkModeCheckbox) { // Check if the checkbox exists
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';

    darkModeCheckbox.checked = darkModeEnabled;
    if (darkModeEnabled) {
      body.classList.add('dark-mode');
    }

    darkModeCheckbox.addEventListener('change', () => {
      if (darkModeCheckbox.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  } else { // If checkbox doesn't exist, check localStorage directly
    const aboutPageDarkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    
    if (aboutPageDarkModeEnabled) {
      body.classList.add('dark-mode');
    }
  }
});

/* Currency Converter */

async function convert() {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  const data = await response.json();
  const rate = data.rates[to];
  const result = (amount * rate).toFixed(2);

  document.getElementById('result').innerText = `${amount} ${from} = ${result} ${to}`;
}

async function populateCurrencies() {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  const currencies = Object.keys(data.rates);

  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');

  currencies.forEach(currency => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.innerText = currency;
      fromSelect.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = currency;
      option2.innerText = currency;
      toSelect.appendChild(option2);
  });
}

populateCurrencies();

/* Desirability Retrieval and Calcuations */

async function getDesirability(destinationName) {
  const response = await fetch('./votes.json');
  const votesData = await response.json();
  const destination = votesData.find(dest => dest.name === destinationName);
  if (!destination) {
    return 'Unknown';
  } else if (destination.votes <= 3) {
    return 'Low';
  } else if (destination.votes <= 10) {
    return 'Medium';
  } else if (destination.votes <= 20) {
    return 'High';
  } else {
    return 'Very High';
  }
}

/* Drive Time Calculator*/

function haversine(lon1, lat1, lon2, lat2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function calculateDriveTime() {
  const currentLat = parseFloat(document.getElementById('currentLat').value);
  const currentLon = parseFloat(document.getElementById('currentLon').value);
  const destLat = parseFloat(document.getElementById('destLat').value);
  const destLon = parseFloat(document.getElementById('destLon').value);

  const distance = haversine(currentLon, currentLat, destLon, destLat);
  const driveTime = distance / 80; // Assuming average speed of 80 km/h

  document.getElementById('driveTime').innerHTML = `Estimated drive time: ${driveTime.toFixed(2)} hours`;
}

/* Sales Timer */
const saleEndDate = new Date(2024, 5, 10, 23, 59, 59).getTime();

const timer = setInterval(function() {
  const now = new Date().getTime();
  const distance = saleEndDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById('timer').innerHTML = 'Sale has ended!';
  }
}, 1000);