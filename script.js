// 🌦 WEATHER FUNCTION
async function getWeather() {
  let city = document.getElementById("city").value;

  if (city === "") {
    alert("Enter city name");
    return;
  }

  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
    );

    let data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = "City not found";
      return;
    }

    document.getElementById("weatherResult").innerHTML = `
      <h3>${data.name}</h3>
      <p>🌡 Temp: ${data.main.temp} °C</p>
      <p>🌥 Condition: ${data.weather[0].main}</p>
    `;
  } catch (error) {
    console.log(error);
  }
}


// 🎉 EVENT DASHBOARD

// Load saved events
window.onload = function () {
  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.forEach(showEvent);
};

// Add event
function addEvent() {
  let eventName = document.getElementById("eventName").value;

  if (eventName === "") return;

  showEvent(eventName);

  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(eventName);
  localStorage.setItem("events", JSON.stringify(events));

  document.getElementById("eventName").value = "";
}

