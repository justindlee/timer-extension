const nameInput = document.getElementById('name-input');
const notificationTimeInput = document.getElementById('notification-time-input');
const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', () => {
  const name = nameInput.value;
  const notificationTime = notificationTimeInput.value;
  chrome.storage.sync.set({ name, notificationTime }, () => {
    console.log(`Name is set to ${name}`);
  });
});

chrome.storage.sync.get(["name", "notificationTime"], (result) => {
  console.log(result);
  nameInput.value = result.name;
  notificationTimeInput.value = result.notificationTime ?? 1000;
});