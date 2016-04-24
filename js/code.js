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

    var min = date.getMinutes();
    if(min < 10) {
        min = "0"+min;
    }
    timeStr += min;
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
            city:      data.current_observation.display_location.full,
            condition: data.current_observation.weather,
            icon:      data.current_observation.icon,
            temp:      data.current_observation.feelslike_f
        };

        updateWeather(weatherData);
    }).error(function() { updateWeather(undefined); });

    $.ajax("http://api.wunderground.com/api/"+weatherKey+"/hourly/q/CO/Lakewood.json"
    ).done(function (data) {
        var weatherData = {
            slots: []
        };

        for(var i = 0; i < data.hourly_forecast.length; i += 3) {
            var slotData = {
                cond: data.hourly_forecast[i].condition,
                hour: data.hourly_forecast[i].FCTTIME.hour,
                icon: data.hourly_forecast[i].icon,
                time: data.hourly_forecast[i].FCTTIME.civil,
                temp: data.hourly_forecast[i].feelslike.english
            };

            weatherData.slots.push(slotData);
        }

        updateHourlyWeather(weatherData);
    }).error(function() { updateHourlyWeather(undefined); });

}

function updateWeather(data) {
    var weatherStr = "<p>Could not retrieve weather information.</p>";

    if(data) {
        weatherStr  = "<p class=\"temp\">";
        weatherStr += getIcon(data.icon, date.getHours());
        weatherStr += data.temp+"&deg; F\n";
        weatherStr += "</p>\n";
        weatherStr += "<p>"+data.condition+"</p>\n";
    }

    $('#weather').html(weatherStr);
}

function updateHourlyWeather(data) {
    if(data) {
        var weatherStr = "";
        for(var i = 0; (i < data.slots.length) && (i < 4); i++) {
            weatherStr += "<div class=\"col-xs-3 slot\">"
            weatherStr += "<p class=\"details\">"+data.slots[i].time+"</p>";
            weatherStr += "<p class=\"med-icon\">"+getIcon(data.slots[i].icon, data.slots[i].hour)+"</p>";
            weatherStr += "<p class=\"details\">"+data.slots[i].cond+"</p>";
            weatherStr += "<p class=\"details\">"+data.slots[i].temp+"&deg; F</p>";
            weatherStr += "</div>\n";
        }

        $('#hourly').html(weatherStr);
    }
}

function updateNews() {

}

function tick() {
    date = new Date();

    updateGreeting();
    updateDate();

    if(date.getMinutes() == 0) {
        getWeatherData();
    }

    if(date.getMinutes() == 0) {
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
