function digitalClock() {
  let date = new Date();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  let hourString = String(h).padStart(2, '0') + ':' + 
                   String(m).padStart(2, '0') + ':' +
                   String(s).padStart(2, '0');

  console.log(hourString);

  document.getElementById("digital-clock").innerHTML = hourString;
  setTimeout(digitalClock, 1000);
}

function main() {
  console.log("index.js has been loaded.");
  onload = (event) => digitalClock();
}

main();