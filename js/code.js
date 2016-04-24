var count = 0;
var date;

var months = [ "January",  "February", "March",  "April",     "May", 
               "June",     "July",     "August", "September", "October",
               "November", "December" ];

var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
             "Saturday" ];

var weatherKey = "0f6098b528945499";

function updateGreeting() {
    var greetingStr = "Hello, Max.";

    var hours = date.getHours();
    if(hours < 12) {
        greetingStr = "Good morning, Max.";
    } else if(hours < 18) {
        greetingStr = "Good afternoon, Max.";
    } else {
        greetingStr = "Good evening, Max.";
    }

    $('#greeting').html(greetingStr);
}

function getDateString() {
    var dateStr = "Today is ";

    dateStr += days[date.getDay()];
    dateStr += ", ";
    dateStr += months[date.getMonth()];
    dateStr += " ";

    var day = date.getDate();
    var suffix = "th";
    if(day != 11 && day != 12 && day != 13) {
        if(day % 10 == 1) {
            suffix = "st";
        } else if(day % 10 == 2) {
            suffix = "nd";
        } else if(day % 10 == 3) {
            suffix = "rd";
        }
    }
    dateStr += day + suffix;

    dateStr += ", ";
    dateStr += date.getFullYear();
    dateStr += ".";

    return dateStr;
}

function getTimeString() {
    var timeStr = "It is ";

    var hour = date.getHours();
    var half = "AM";
    if(hour > 12) {
        hour -= 12;
        half = "PM";
    }

    timeStr += hour;

    var colon = ":";
    if(date.getSeconds() % 2 == 1) {
        var colon = " ";
    }
    timeStr += colon;

    timeStr += date.getMinutes();
    timeStr += " ";
    timeStr += half;
    timeStr += ".";

    return timeStr;
}

function updateDate() {
    var dateStr = getDateString();
    $('#date').html(dateStr);

    var timeStr = getTimeString();
    $('#time').html(timeStr);
}

function getWeatherData() {
    $.ajax("http://api.wunderground.com/api/"+weatherKey+"/conditions/q/CO/Lakewood.json"
    ).done(function (data) {
        var weatherData = {
            city: data.current_observation.display_location.full,
            temp: data.current_observation.feelslike_f
        };

        updateWeather(weatherData);
    }).error(function() { updateWeather(undefined); });
}

function updateWeather(data) {
    var weatherStr = "Could not retrieve weather information.";

    if(data) {
        weatherStr = ""+data.temp+" F in "+data.city+"."
    }

    $('#weather').html(weatherStr);
}

function updateNews() {

}

function tick() {
    count++;

    date = new Date();

    updateGreeting();
    updateDate();

    if(count % (60*60) == 0) {
        getWeatherData();
    }

    if(count % (60*60) == 0) {
        count = 0;

        updateNews();
    }
}

function setup() {
    date = new Date();

    updateGreeting();
    updateDate();
    getWeatherData()
    updateNews();

    setInterval(tick, 1000);
}

setup();
