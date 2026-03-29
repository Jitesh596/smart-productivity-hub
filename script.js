const API_KEY = "YOUR_API_KEY";

/* DARK MODE */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
};

/* WEATHER */
document.getElementById("weather-form").addEventListener("submit", async (e)=>{
  e.preventDefault();
  let city = document.getElementById("city").value;

  let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  let data = await res.json();

  document.getElementById("weatherBox").innerHTML = `
    <h3>${data.name}</h3>
    <p>${(data.main.temp-273.15).toFixed(1)} °C</p>
    <p>${data.weather[0].main}</p>
  `;
});

/* AUTO LOCATION */
document.getElementById("autoLocation").onclick = ()=>{
  navigator.geolocation.getCurrentPosition(async pos=>{
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    let data = await res.json();

    document.getElementById("weatherBox").innerHTML = `
      <h3>${data.name}</h3>
      <p>${(data.main.temp-273.15).toFixed(1)} °C</p>
    `;
  });
};

/* EVENTS */
let events = JSON.parse(localStorage.getItem("events")) || [];

function saveEvents(){
  localStorage.setItem("events", JSON.stringify(events));
}

function createCard(e){
  let div = document.createElement("div");
  div.className="card";
  div.innerHTML = `<span class="dlt">×</span><h3>${e.title}</h3><p>${e.date}</p><p>${e.desc}</p>`;

  div.querySelector(".dlt").onclick=()=>{
    div.remove();
  };

  document.querySelector(".cards").appendChild(div);
}

events.forEach(createCard);

document.querySelector(".form").addEventListener("submit",(e)=>{
  e.preventDefault();

  let obj = {
    title:eventTitle.value,
    date:eventDate.value,
    desc:description.value
  };

  events.push(obj);
  saveEvents();
  createCard(obj);
});

/* SEARCH */
document.getElementById("searchEvent").oninput = function(){
  let val = this.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display = c.innerText.toLowerCase().includes(val) ? "block":"none";
  });
};

/* CLEAR */
document.querySelector(".clearall").onclick=()=>{
  localStorage.removeItem("events");
  document.querySelector(".cards").innerHTML="";
};

/* TODO */
document.getElementById("todoForm").addEventListener("submit",(e)=>{
  e.preventDefault();

  let task = taskInput.value;

  let li = document.createElement("li");
  li.innerHTML = `${task} <button>Delete</button>`;

  li.querySelector("button").onclick=()=>li.remove();

  taskList.appendChild(li);
  taskInput.value="";
});