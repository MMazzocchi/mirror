var count = 0;
var date;

function updateGreeting() {
    var greetingStr = "Hello, Max.";

    var hours = date.getHours();
    if(hours < 11) {
        greetingStr = "Good morning, Max.";
    } else if(hours < 18) {
        greetingStr = "Good afternoon, Max.";
    } else {
        greetingStr = "Good evening, Max.";
    }

    $('#greeting').html(greetingStr);
}

function updateDate() {
    var dateStr = "Today is "+date.toLocaleFormat("%A, %B %d %Y.")
    $('#date').html(dateStr);

    var colon = ":";
    if(date.getSeconds() % 2 == 0) { colon = " "; }
    var timeStr = "It is "+date.toLocaleFormat("%l"+colon+"%M %p.");
    $('#time').html(timeStr);
}

function updateWeather() {
    var weatherStr = "Could not retrieve weather information.";

    $('#weather').html(weatherStr);
}

function updateNews() {

}

function tick() {
    count++;

    date = new Date();

    updateGreeting();
    updateDate();

    if(count % 1000 == 0) {
        updateWeather();
    }

    if(count % 100000 == 0) {
        count = 0;

        updateNews();
    }
}

function setup() {
    date = new Date();

    updateGreeting();
    updateDate();
    updateWeather();
    updateNews();

    setInterval(tick, 100);
}

setup();
