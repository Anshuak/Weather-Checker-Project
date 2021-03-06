const subBtn = document.getElementById('subBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real = document.getElementById('temp_real');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');


const getCurrentDay = () => {
    let weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Satday";

    let currentTime = new Date();
    dat = weekdays[currentTime.getDay()];
    let day = document.getElementById('day');
    day.innerText = dat;
    let today_data = document.getElementById('today_data');
    let date = currentTime.getDate();
    // let month = currentTime.getMonth();
    let month = currentTime.toLocaleString('default', { month: 'short' })
    if (date < 10) {
        date = '0' + date;
    }
    today_data.innerText = `${date}  ${month}`;
};

getCurrentDay();



const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "plz enter your city name";
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7dba10c9e257808480fdab59a4714a0f`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            temp_real.innerText = arrData[0].main.temp;
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;

            tempMood = arrData[0].weather[0].main;
            if (tempMood == 'Clear') {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i> ";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i> ";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i> ";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i> ";
            }
            datahide.classList.remove('data_hide');

        } catch {
            city_name.innerText = "plz enter the city name properly";
            datahide.classList.add('data_hide');

        }
    }
}

subBtn.addEventListener('click', getInfo);