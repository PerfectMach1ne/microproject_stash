let currentPomodoro = null;

class Pomodoro {
  #date;
  #isPaused = false;
  intervalId;

  constructor(date) {
    this.#date = date;
    this.h = date.getHours();
    this.m = date.getMinutes() 
    this.s = date.getSeconds();
    document.getElementById("pomodoroTimer").innerText = "00:00:00";
  }

  getIsPaused = () => this.#isPaused;

  #refreshTimer() {
    this.h = this.#date.getHours();
    this.m = this.#date.getMinutes() 
    this.s = this.#date.getSeconds();
  }

  run() {
    let hourString = String(this.h).padStart(2, '0') + ':' + 
                    String(this.m).padStart(2, '0') + ':' +
                    String(this.s).padStart(2, '0');
    
    
    // ToDo: this needs to decrement the time, as opposed to stopwatch functionality.
    this.#date.setSeconds(this.#date.getSeconds() == 59 ? 0 : this.#date.getSeconds() + 1);
    this.#refreshTimer();

    document.getElementById("pomodoroTimer").innerText = hourString;
    console.log(hourString);
  }

  pause() {
    if (this.#isPaused) {
      this.#isPaused = false;
      document.getElementById("pause").innerText = "Pause!";
      currentPomodoro.intervalId = setInterval(() => currentPomodoro.run(), 1000); 
    } else {
      if (currentPomodoro !== null) {
        clearInterval(currentPomodoro.intervalId);
        currentPomodoro.intervalId = null;
      }

      this.#isPaused = true;
      document.getElementById("pause").innerText = "Unpause!";
    }
  }
 
  cease() {}
}

function digitalClock() {
  clearTimeout(); // Emergency timeout clock memory freeing. But its impact is tiny!
  let date = new Date();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  let hourString = String(h).padStart(2, '0') + ':' + 
                   String(m).padStart(2, '0') + ':' +
                   String(s).padStart(2, '0');

  document.getElementById("digital-clock").innerText = hourString;
  setTimeout(digitalClock, 1000);
}

function start() {
  if (currentPomodoro == null) { // To prevent the button from being used to just restart it. Cease does that!
    if (currentPomodoro !== null) {
      clearInterval(currentPomodoro.intervalId);
      currentPomodoro.intervalId = null;
    }
    
    let date = new Date();
    // ToDO: this needs to start from a time passed via Pomodoro settings to the app!!!
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0 + 1); // It's gotta be 1, as otherwise the "zeroth second lasts two seconds". Odd fix for an odd bug.
    date.setMilliseconds(0);

    currentPomodoro = new Pomodoro(date);

    currentPomodoro.intervalId = setInterval(() => currentPomodoro.run(), 1000);
  }
}

function pause() {
  if (currentPomodoro !== null) {
    currentPomodoro.pause();
  }
}

function cease() {

}

class PomodoroSettings {
  constructor(timeStr) {
    let timeArr = timeStr.split(':');

    this.date = new Date();

    this.date.setHours(Number(timeArr[0]));
    this.date.setMinutes(Number(timeArr[1]));
    this.date.setSeconds(Number(timeArr[2]) + 1); // It's gotta be 1, as otherwise the "zeroth second lasts two seconds". Odd fix for an odd bug.
    this.date.setMilliseconds(0);

    this.h = this.date.getHours();
    this.m = this.date.getMinutes() 
    this.s = this.date.getSeconds();
  }

  toString = () => String(this.h).padStart(2, '0') + ':' + 
                   String(this.m).padStart(2, '0') + ':' +
                   String(this.date.getSeconds() - 1).padStart(2, '0');
  
}

function submitPomodoroSettings() {
  let pomodoroLengthInput = document.getElementById("pomodoroLength").value;
  console.log(pomodoroLengthInput);

  let pomodoroSettings = new PomodoroSettings(pomodoroLengthInput);
  console.log(pomodoroSettings.toString())
}

function main() {
  console.log("index.js has been loaded.");

  window.addEventListener("load", (event) => {
    digitalClock();
  });

  fetch("http://127.0.0.1:3057/")
      .then((res) => res.json())
      .then((data) => (console.log(data.msg)));
}

main();