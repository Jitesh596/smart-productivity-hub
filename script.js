const API_KEY = "PASTE_YOUR_API_KEY_HERE";

/* DARK MODE SAVE */
const themeBtn = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
}

themeBtn.onclick = () => {
  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){
    localStorage.setItem("theme","light");
  } else {
    localStorage.setItem("theme","dark");
  }
};

/* WEATHER */
document.getElementById("weather-form").addEventListener("submit", async (e)=>{
  e.preventDefault();
  let city = document.getElementById("city").value;

  try {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    let data = await res.json();

    if(data.cod !== 200){
      alert("City not found");
      return;
    }

    document.getElementById("weatherBox").innerHTML = `
      <h3>${data.name}</h3>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      <p>🌡 ${data.main.temp} °C</p>
      <p>${data.weather[0].description}</p>
    `;
  } catch {
    alert("Error fetching weather");
  }
});

/* AUTO LOCATION */
document.getElementById("autoLocation").onclick = ()=>{
  navigator.geolocation.getCurrentPosition(async pos=>{
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    let data = await res.json();

    document.getElementById("weatherBox").innerHTML = `
      <h3>${data.name}</h3>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      <p>🌡 ${data.main.temp} °C</p>
    `;
  });
};

/* EVENTS */
let events = JSON.parse(localStorage.getItem("events")) || [];

function saveEvents(){
  localStorage.setItem("events", JSON.stringify(events));
}

function renderEvents(){
  document.querySelector(".cards").innerHTML="";
  events.forEach((e,i)=>{
    let div = document.createElement("div");
    div.className="card";
    div.innerHTML = `
      <span class="dlt">×</span>
      <h3>${e.title}</h3>
      <p>${e.date}</p>
      <p>${e.desc}</p>
    `;

    div.querySelector(".dlt").onclick=()=>{
      events.splice(i,1);
      saveEvents();
      renderEvents();
    };

    document.querySelector(".cards").appendChild(div);
  });
}

renderEvents();

document.querySelector(".form").addEventListener("submit",(e)=>{
  e.preventDefault();

  let obj = {
    title:eventTitle.value,
    date:eventDate.value,
    desc:description.value
  };

  events.push(obj);
  saveEvents();
  renderEvents();

  e.target.reset();
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
  events=[];
  saveEvents();
  renderEvents();
};

/* TODO WITH STORAGE */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
  taskList.innerHTML="";
  tasks.forEach((t,i)=>{
    let li = document.createElement("li");
    li.innerHTML = `${t} <button>❌</button>`;

    li.querySelector("button").onclick=()=>{
      tasks.splice(i,1);
      saveTasks();
      renderTasks();
    };

    taskList.appendChild(li);
  });
}

renderTasks();

document.getElementById("todoForm").addEventListener("submit",(e)=>{
  e.preventDefault();

  tasks.push(taskInput.value);
  saveTasks();
  renderTasks();

  taskInput.value="";
});