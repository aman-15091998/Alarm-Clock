const setAlarmBtn = document.querySelector(".set-alarm-btn");
const alarmListDiv = document.querySelector(".alarm-list");
const h2 = document.querySelector("#current-time");
const inputHr = document.querySelector("#hr");
inputHr.insertAdjacentHTML("beforeend", `<option value="">Hours</option>`);
for (let i = 1; i <= 12; i++) {
  inputHr.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`);
}
const inputMin = document.querySelector("#min");
inputMin.insertAdjacentHTML("beforeend", `<option value="">Minutes</option>`);
for (let i = 0; i <= 59; i++) {
  inputMin.insertAdjacentHTML(
    "beforeend",
    `<option value="${i < 10 ? "0" + i : i}">${i}</option>`
  );
}
const inputSec = document.querySelector("#sec");
inputSec.insertAdjacentHTML("beforeend", `<option value="">Seconds</option>`);
for (let i = 0; i <= 59; i++) {
  inputSec.insertAdjacentHTML(
    "beforeend",
    `<option value="${i < 10 ? "0" + i : i}">${i}</option>`
  );
}
const setTime = setInterval(() => {
  // Showing current time
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let clockTime = `${hours > 12 ? hours - 12 : hours == 0 ? 12 : hours}:${
    currentTime.getMinutes() < 10
      ? "0" + currentTime.getMinutes()
      : currentTime.getMinutes()
  }:${
    currentTime.getSeconds() < 10
      ? "0" + currentTime.getSeconds()
      : currentTime.getSeconds()
  } ${hours > 12 ? "PM" : "AM"}`;
  h2.textContent = clockTime;

  // Checking existing alarms
  arr.forEach((alarm, index) => {
    let time = `${alarm.hr}:${alarm.min}:${alarm.sec} ${alarm.ampm}`;
    if (time == clockTime) {
      arr.splice(index, 1);
      insertAlarms();
      window.alert(time);
    }
  });
}, 1000);

const inputAMPM = document.querySelector("#ampm");
const arr = []; //alarms array

function setAlarm(hours, minutes, seconds, ampm) {
  const obj = {
    id: `id-${arr.length + 1}`,
    hr: hours,
    min: minutes,
    sec: seconds,
    ampm: ampm,
  };
  arr.push(obj);
  insertAlarms();
}
function insertAlarms() {
  if (arr.length == 0) {
    alarmListDiv.innerHTML = `<h3>No alarms set!</h3>`;
    return;
  }
  alarmListDiv.innerHTML = "";
  arr.forEach((element) => {
    const newAlarmDiv = document.createElement("div");
    newAlarmDiv.classList.add("alarm", "display-flex", `${element.id}`);
    const label = document.createElement("label");
    label.textContent = `${element.hr}:${element.min}:${element.sec} ${element.ampm}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete", "btn");
    newAlarmDiv.append(label, deleteBtn);
    alarmListDiv.appendChild(newAlarmDiv);

    // Event listener
    deleteBtn.addEventListener("click", (e) => {
      const alarmElement = e.target.parentElement;
      arr.forEach((alarm, index) => {
        if (alarm.id == alarmElement.classList[2]) arr.splice(index, 1);
      });
      insertAlarms();
    });
  });
}
// Event listener
setAlarmBtn.addEventListener("click", () => {
  let hr = inputHr.value;
  let min = inputMin.value;
  let sec = inputSec.value;
  let ampm = inputAMPM.value;
  if (hr != "" && min != "" && sec != "" && ampm != "") {
    let flag = false;
    arr.forEach((alarm) => {
      if (
        alarm.hr == hr &&
        alarm.min == min &&
        alarm.sec == sec &&
        alarm.ampm == ampm
      )
        flag = true;
    });
    if (flag == false) setAlarm(hr, min, sec, ampm);
  }
});
