var weatherBtn = document.querySelector('#weatherBtn')
var inputValue = document.querySelector("#input-value");
var displayingWeather = document.querySelector('#displaying-weather')
var mainweather = document.querySelector('#mainWeather')





const date = new Date();

const renderCalendar = () => {
  date.setDate(1);
  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = new Date().toDateString();
  let days = "";
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});


renderCalendar();
var saveBtnEl = $(".btn");
let textareaEls = $("textarea");

setInterval(runEverySecond, 1000);
function runEverySecond(time) {
  var unix = moment().format("X");
  var time = moment(unix, "X").format("MMM DD, YYYY [at] h:mm:ss ");
  const currentHour = moment(unix, "X").format("H");
  $("#currentDay").text(time);

  for (let i = 0; i < textareaEls.length; i++) {
    const textarea = $(textareaEls[i]);
    const rowHour = i + 9;
    if (currentHour < rowHour) {
      // if in future
      textarea.css("background-color", "green");
    } else if (currentHour > rowHour) {
      // if in past
      textarea.css("background-color", "grey");
    } else {
      // current hour
      textarea.css("background-color", "red");
    }
  }
}
runEverySecond();

saveBtnEl.click(function (event) {
  let textarea = $(event.currentTarget).siblings("textarea");
  // console.log(textarea, textarea.attr("id"));
  let id = textarea.attr("id");
  let val = textarea.val();

  localStorage.setItem(id, val);
});

for (let i = 0; i < textareaEls.length; i++) {
  const textarea = $(textareaEls[i]);
  let id = textarea.attr("id");

  let valueFromStorage = localStorage.getItem(id);
  textarea.val(valueFromStorage);
}

function removeBadCity() {
  var element = document.querySelector('#bad-city')
  element.classList.remove('hide')
}

function addBadCity() {
  var element = document.querySelector('#bad-city')
  element.classList.add('hide')
}

// console.log(inputValue.value)


// var getCity = localStorage.getItem()


function activateWeather() {
  // var savedItem = localStorage.setItem('city', inputValue.value)

  console.log(inputValue.value)

  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&exclude=minutely,hourly,alerts&units=imperial&appid=c78c558b4a973e2264ce5c9d04ed7ac8"
  

  

  addBadCity()

  fetch(requestUrl) 
    .then(function (response) {
      if(response.status > 199 && response.status < 300){
        
      }else {
        removeBadCity()
        return;

      }
      return response.json()
    })

    .then((data) => displayWeather(data))  

    console.log(requestUrl)
}



function displayWeather(data) {
  var{ icon } = data.weather[0];
  var{ temp } = data.main;
  var{ main } = data.weather[0];

  var iconMain = icon
  var iconMainWeather = "https://openweathermap.org/img/wn/" + iconMain + ".png";
  var tempMain = document.querySelector('#mainTemp');
  var tempDescription = document.querySelector('#maindesc');
  var desMain = ' ' + main
  console.log(main)

  mainweather.setAttribute('src', iconMainWeather)
  tempMain.textContent =  temp + "°F"
  tempDescription.textContent = desMain

}

console.log(inputValue.value)



weatherBtn.addEventListener('click', activateWeather)