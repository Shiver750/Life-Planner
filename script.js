var weatherBtn = document.querySelector('#weatherBtn')
var inputValue = document.querySelector("#input-value");
var displayingWeather = document.querySelector('#displaying-weather')
var mainweather = document.querySelector('#mainWeather')
var weatherTextTitle = document.querySelector('#weather-title-text')

// this is the js for the time blocks to use
var timeSlotsContainer = document.querySelector(".timeslots-container");
var timeSlotsTextareas;
var modal = document.getElementById("gridSystemModal");
var dayPlannerModalTitle = document.querySelector("#gridSystemModal .modal-title");
var dayPlannerSaveBtn = document.querySelector(".btn-primary")
var modalCloseBtn = document.querySelector('.btn-secondary')
var modalXBtn = document.querySelector(".btn-close")





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
  monthDays.innerHTML = "";

  for (let x = firstDayIndex; x > 0; x--) {
    let prevMonthDay = document.createElement("div");
    prevMonthDay.classList.add("prev-date");
    prevMonthDay.innerText = prevLastDay - x + 1;
    monthDays.appendChild(prevMonthDay);
  }

  for (let i = 1; i <= lastDay; i++) {
    let isToday = i === new Date().getDate() && date.getMonth() === new Date().getMonth();
    let day = document.createElement("div");
    day.setAttribute("id", i);
    day.classList.add("day", isToday ? "today" : null);
    day.innerText = i;

    let dayDate = new Date();
    dayDate.setMonth(date.getMonth());
    dayDate.setFullYear(date.getFullYear());
    dayDate.setDate(i);

    day.addEventListener("click", () => {
      openDayPlanner(dayDate);
      dayPlannerSaveBtn.onclick = function () {
        saveDayPlanner(dayDate);
      }
    });
    monthDays.appendChild(day);
  }

  for (let j = 1; j <= nextDays; j++) {
    let nextMonthDay = document.createElement("div");
    nextMonthDay.classList.add("next-date");
    nextMonthDay.innerText = j;
    monthDays.appendChild(nextMonthDay);
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




const timeSlots = [
  {
    label: "6:00am",
    id: "apptSixA"
  },
  {
    label: "7:00am",
    id: "apptSevenA"
  },
  {
    label: "8:00am",
    id: "apptEightA"
  },
  {
    label: "9:00am",
    id: "apptNineA"
  },
  {
    label: "10:00am",
    id: "apptTenA"
  },
  {
    label: "11:00am",
    id: "apptElevenA"
  },
  {
    label: "12:00pm",
    id: "apptTwelveP"
  },
  {
    label: "1:00pm",
    id: "apptOneP"
  },
  {
    label: "2:00pm",
    id: "apptTwoP"
  },
  {
    label: "3:00pm",
    id: "apptThreeP"
  },
  {
    label: "4:00pm",
    id: "apptFourP"
  },
  {
    label: "5:00pm",
    id: "apptFiveP"
  },
  {
    label: "6:00pm",
    id: "apptSixP"
  },
  {
    label: "7:00pm",
    id: "apptSevenP"
  },
  {
    label: "8:00pm",
    id: "apptEightP"
  },
  {
    label: "9:00pm",
    id: "apptNineP"
  },
]

function generateTimeslots() {
  let timeslotHtml = "";
  for (let i = 0; i < timeSlots.length; i++) {
    let timeslot = timeSlots[i];
    let template = `<div class="row my-1">
                      <div class="col-2 col-sm-3 col-md-2 border border-dark text-align-center time-block">${timeslot.label}</div>
                      <textarea name="appointment" id="${timeslot.id}" cols="30" rows="1" class="appt col-10 border border-dark"></textarea>
                    </div>`;
    timeslotHtml += template;
  }
  timeSlotsContainer.innerHTML = timeslotHtml;
  timeSlotsTextareas  = document.querySelectorAll(".timeslots-container textarea");
}
generateTimeslots();

function closeModal() {
  document.getElementById("gridSystemModal").style.display = "none"
  document.getElementById("gridSystemModal").classList.remove("show")
}



modal.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}

function openDayPlanner(dayDate) {
  dayPlannerModalTitle.innerText = dayDate.toDateString();
  let key = `${dayDate.getFullYear()}-${dayDate.getMonth() + 1}-${dayDate.getDate()}`;
  let todosFromStorage = JSON.parse(localStorage.getItem(key)) || {};

  for (let i = 0; i < timeSlotsTextareas.length; i++) {
    let element = timeSlotsTextareas[i];
    let id = element.getAttribute("id");
    element.value = todosFromStorage[id] || "";
  }


  document.getElementById("gridSystemModal").style.display = "block";
  document.getElementById("gridSystemModal").classList.add("show");
}

function saveDayPlanner(dayDate) {
  let textareaObj = {}
  let textareas = timeSlotsContainer.querySelectorAll("textarea");
  for (let i = 0; i < textareas.length; i++) {
    const textarea = textareas[i];
    let id = textarea.getAttribute("id");
    let val = textarea.value;
    textareaObj[id] = val;
  }
  let key = `${dayDate.getFullYear()}-${dayDate.getMonth() + 1}-${dayDate.getDate()}`;

  localStorage.setItem(key, JSON.stringify(textareaObj));

  closeModal();
}

modalCloseBtn.onclick = function(event){

  closeModal();
}
modalXBtn.onclick = function (event) {

  closeModal();
}







function removeBadCity() {
  var element = document.querySelector('#bad-city')
  element.classList.remove('hide')
}

function addBadCity() {
  var element = document.querySelector('#bad-city')
  element.classList.add('hide')
}






function activateWeather() {
  
    var cityvalue = inputValue.value


    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityvalue + "&exclude=minutely,hourly,alerts&units=imperial&appid=c78c558b4a973e2264ce5c9d04ed7ac8"
  
  addBadCity()
// fetches and returns your city's weather
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
  localStorage.setItem('titlename', inputValue.value)
  weatherTextTitle.textContent = inputValue.value.charAt(0).toUpperCase() + inputValue.value.slice(1);
}

function displayWeather(data) {
  var{ icon } = data.weather[0];
  var{ temp } = data.main;
  var{ main } = data.weather[0];

  localStorage.setItem('city', JSON.stringify(data))


  var iconMain = icon
  var iconMainWeather = "https://openweathermap.org/img/wn/" + iconMain + ".png";
  var tempMain = document.querySelector('#mainTemp');
  var tempDescription = document.querySelector('#maindesc');
  var desMain = ' ' + main



  mainweather.setAttribute('src', iconMainWeather)
  tempMain.textContent =  temp + "°F"
  tempDescription.textContent = desMain

}

var city = JSON.parse(localStorage.getItem("city"))
var titleCity = localStorage.getItem('titlename')
if(city){
displayWeather(city)
weatherTextTitle.textContent = titleCity.charAt(0).toUpperCase() + titleCity.slice(1);
}

activateNews()
function activateNews(){
      var date = moment().format('YYYY-MM-DD')
        var newsRequestUrl = 'http://api.mediastack.com/v1/news?countries=us&languages=en&limit=3&date='+ date +'&categories=entertainment&access_key=4c3f70130542f8c63893bb2f89eab82e'

        fetch(newsRequestUrl)
          .then(function (response){

            return response.json()
          })
          .then((datas) => displayNews(datas))


}


function displayNews(datas) {

  var newsDiv = document.querySelector('#news-div')



  for (i = 0; i <= 2; i++) {

    var { title } = datas.data[i]
    var { description } = datas.data[i]
    var { url } = datas.data[i]

    var newsCard = document.createElement('div')
    var titleEl = document.createElement('p')
    var descEl = document.createElement('p')
    var linkEl = document.createElement('p')
    var pageLinkEl = document.createElement('a')

    newsCard.classList.add('bg-light', 'my-1')
    titleEl.classList.add('text-dark', 'fw-bolder', 'text-center')
    descEl.classList.add('text-dark', 'text-center')
    linkEl.classList.add('text-dark', 'text-center')

    linkEl.textContent = 'For more information '
    pageLinkEl.textContent = 'click here'
    titleEl.textContent = 'Title: ' + title
    descEl.textContent = description

    newsCard.appendChild(titleEl);
    newsCard.appendChild(descEl);
    newsCard.appendChild(linkEl);
    newsDiv.appendChild(newsCard)
    pageLinkEl.setAttribute('href', url)
    pageLinkEl.setAttribute('target', '_blank')
    linkEl.appendChild(pageLinkEl)



  }}



 var todolist = document.getElementsByTagName('LI')

for (var i = 0; i < todolist.length; i++) {
  var span = document.createElement('span');
  var text = document.createTextNode('\u00d7');
  span.className = "close";
  span.appendChild(text);
  todolist[i].appendChild(span)
}

var closeTodoList = document.getElementsByClassName('close');

for (var i = 0; i < closeTodoList.length; i++) {
  closeTodoList[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = 'none';
  }
}

var todoListName = document.querySelector('ul');
todoListName.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked')
  }
}, false);

function newElement() {
  var liList = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var tList = document.createTextNode(inputValue);
  liList.appendChild(tList);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(liList);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  liList.appendChild(span);

  for (i = 0; i < closeTodoList.length; i++) {
    closeTodoList[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

weatherBtn.addEventListener('click', activateWeather)


