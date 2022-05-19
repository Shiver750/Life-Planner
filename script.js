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

// this is the js for the time blocks to use
var timeBlockModal = document.querySelector(".days");
var timeSlotsContainer = document.querySelector(".timeslots-container");

timeBlockModal.addEventListener("click", function() {
  document.getElementById("gridSystemModal").style.display = "block";
  document.getElementById("gridSystemModal").classList.add("show");
  console.log("clicked");
});

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
                      <textarea name="appointment" id="${timeslot.id} cols="30" rows="1" class="appt col-8 col-sm-6 col-md-8 border border-dark"></textarea>
                    </div>`;
    timeslotHtml += template;
  }
  console.log(timeslotHtml);
  timeSlotsContainer.innerHTML = timeslotHtml;
}
generateTimeslots();

function closeModal() {
  
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
if(city){
displayWeather(city)
}

activateNews()
function activateNews(){
      var date = moment().format('YYYY-MM-DD')
        var newsRequestUrl = 'http://api.mediastack.com/v1/news?countries=us&languages=en&limit=3&date='+ date +'&categories=entertainment&access_key=11caaebeffcca14802210c1e3042098d'

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

    console.log(newsCard)

  }}

console.log(inputValue.value)



weatherBtn.addEventListener('click', activateWeather)

