const myname = document.getElementById("name");
const title = document.getElementById("title");

let yapjson = new Promise((res, rej) => { 
  fetch("http://192.168.1.177:5501/")
    .then(res => {
      if (!res.ok) { console.log("ouch"); }
      return res.json();
    })
    .then(data => res(data))
    .catch(err => rej(err));
});

yapjson.then((res) => { yapjson = res.json(); });

myname.innerHTML = yapjson.content.header.name;
title.innerHTML = yapjson.content.header.title;