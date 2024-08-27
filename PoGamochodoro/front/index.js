class Pomodoro {
  #clock = document.getElementById("pomodoroTimer");
  #date;
  intervalId;

  constructor(date) {
    this.#date = date;
    this.h = date.getHours();
    this.m = date.getMinutes() 
    this.s = date.getSeconds();
    this.#clock.innerText = "00:00:00";
  }

  refreshTimer() {
    this.h = this.#date.getHours();
    this.m = this.#date.getMinutes() 
    this.s = this.#date.getSeconds();
  }

  start() {
    let hourString = String(this.h).padStart(2, '0') + ':' + 
                    String(this.m).padStart(2, '0') + ':' +
                    String(this.s).padStart(2, '0');
    
    
    this.#date.setSeconds(this.#date.getSeconds + 1);
    this.refreshTimer();

    this.#clock.innerText = hourString;
    console.log(hourString);
  }

  pause() {}
 
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
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  let pomodoro = new Pomodoro(date);

  pomodoro.intervalId = setInterval(() => pomodoro.start(), 1000);
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