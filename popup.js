const timeElement = document.getElementById('time');
const nameElement = document.getElementById('name');
const timerElement = document.getElementById('timer');
const startBtnElement = document.getElementById('start-timer');
const stopBtnElement = document.getElementById('stop-timer');
const resetBtnElement = document.getElementById('reset-timer');

function updateTimeElements() {
  chrome.storage.local.get(['timer'], (result) => {
    const timerValue = result.timer ?? 0;
    timerElement.textContent = `Timer is at ${timerValue} seconds`;
  })

  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The time is ${currentTime}`;
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.action.setBadgeText({
  text: "TIME",
}, () => {
  console.log('finished setting badge time');
});

chrome.storage.sync.get(["name"], (result) => {
  const name = result.name ?? '???';
  nameElement.textContext = `Your name is ${name}`;
});

startBtnElement.addEventListener('click', () => {
  chrome.storage.local.set({
    shouldUpdateTime: true,
  })
});

stopBtnElement.addEventListener('click', () => {
  chrome.storage.local.set({
    shouldUpdateTime: false,
  })
});

resetBtnElement.addEventListener('click', () => {
  chrome.storage.local.set({
    timer: 0,
  })
})