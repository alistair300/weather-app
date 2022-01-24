// DOM Elements
const time = document.getElementById('time');
const meridiem = document.getElementById('meridiem');
const day = document.getElementById('day');

// set time with moment.js
const setTime = () => {
  const now = moment().format('hh:mm');
  const meridiemNow = moment().format('A');
  const dayNow = moment().format('dddd, LL');

  time.innerText = now;
  meridiem.innerText = meridiemNow;
  day.innerText = dayNow;
};

setInterval(setTime, 1000);
