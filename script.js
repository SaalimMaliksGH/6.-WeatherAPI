const container = document.querySelector('.card-container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const background = document.querySelector('.wrapper');

search.addEventListener("click", () => {
    const APIKey = '83fa8e89cf11cdfb59eb380bc694d42f';
    const city = document.querySelector('.search-box input').value;

    if(city == ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        
        if(json.cod == '404'){
            container.style.height = "400px";
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = "555px";
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');


        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');




        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                background.style.background = 'linear-gradient(40deg, rgba(255,41,41,1) 0%, rgba(243,174,69,1) 41%, rgba(240,208,75,1) 57%, rgba(255,166,0,1) 79%)';
                break;
            
            case 'Rain':
                image.src = 'images/rain.png';
                background.style.background = 'linear-gradient(40deg, rgba(0,0,0,1) 0%, rgba(41,38,38,1) 31%, rgba(67,67,67,1) 52%, rgba(153,153,153,1) 80%, rgba(255,255,255,1) 100%)';
                break;

            case 'Mist':
                image.src = 'images/mist.png';
                background.style.background = 'linear-gradient(40deg, rgba(0,0,0,1) 6%, rgba(25,35,111,1) 40%, rgba(52,68,120,1) 72%, rgba(125,125,211,1) 100%, rgba(255,255,255,1) 100%)';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                background.style.background = 'linear-gradient(40deg, rgba(2,0,36,1) 0%, rgba(9,53,121,1) 48%, rgba(0,212,255,1) 100%)';
                break;

            case 'Cloud':
                image.src = 'images/cloud.png';
                background.style.background = 'linear-gradient(40deg, rgba(2,0,36,1) 0%, rgba(9,53,121,1) 48%, rgba(0,212,255,1) 100%)';
                break;
            
            case 'Haze':
                image.src = 'images/mist.png';
                background.style.background = 'linear-gradient(40deg, rgba(0,0,0,1) 6%, rgba(25,35,111,1) 40%, rgba(52,68,120,1) 72%, rgba(125,125,211,1) 100%, rgba(255,255,255,1) 100%)';
                break;

            default:
                image.src = 'images/cloud.png';
                background.style.background = 'linear-gradient(40deg, rgba(34,210,196,1) 0%, rgba(56,104,118,1) 40%, rgba(134,105,42,1) 61%, rgba(253,187,45,1) 93%)';
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
        description.innerHTML = `${(json.weather[0].description)}`;
        humidity.innerHTML = `${(json.main.humidity)}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/hr`;

    })
})