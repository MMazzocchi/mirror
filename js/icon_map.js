var day_icon_map = {
    "chanceflurries": "wi-day-snow",
    "chancerain":     "wi-day-rain",
    "chancesleet":    "wi-day-sleet",
    "chancesnow":     "wi-day-snow",
    "chancetstorms":  "wi-day-thunderstorm",
    "clear":          "wi-day-sunny",
    "cloudy":         "wi-cloudy",
    "flurries":       "wi-snow",
    "fog":            "wi-fog",
    "hazy":           "wi-day-haze",
    "mostlycloudy":   "wi-cloudy",
    "mostlysunny":    "wi-day-sunny-overcast",
    "partlycloudy":   "wi-day-cloudy",
    "partlysunny":    "wi-day-sunny-overcast",
    "sleet":          "wi-sleet",
    "rain":           "wi-rain",
    "snow":           "wi-snow",
    "sunny":          "wi-day-sunny",
    "tstorms":        "wi-thunderstorms"
};

var night_icon_map = {
    "chanceflurries": "wi-night-snow",
    "chancerain":     "wi-night-rain",
    "chancesleet":    "wi-night-sleet",
    "chancesnow":     "wi-night-snow",
    "chancetstorms":  "wi-night-thunderstorm",
    "clear":          "wi-night-clear",
    "cloudy":         "wi-cloudy",
    "flurries":       "wi-snow",
    "fog":            "wi-fog",
    "hazy":           "wi-night-fog",
    "mostlycloudy":   "wi-cloudy",
    "mostlysunny":    "wi-night-partly-cloudy",
    "partlycloudy":   "wi-night-cloudy",
    "partlysunny":    "wi-night-partly-cloudy",
    "sleet":          "wi-sleet",
    "rain":           "wi-rain",
    "snow":           "wi-snow",
    "sunny":          "wi-night-clear",
    "tstorms":        "wi-thunderstorms"
};


function getIcon(condition, hours) {
    var icon_map = day_icon_map;
    if(hours < 6 || hours > 18) {
        icon_map = night_icon_map;
    }

    if(icon_map[condition]) {
        return "<i class=\"wi "+icon_map[condition]+"\"/> ";      
    } else {
        return "<p>No icon for \""+condition+"\"</p>";
    }
}
