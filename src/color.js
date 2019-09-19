let Color = {};

Color.getClockColor = function () {
    let now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds(),
        formattedHours = (hours > 9) ? hours : '0' + hours,
        formattedMinutes = (minutes > 9) ? minutes : '0' + minutes,
        formattedSeconds = (seconds > 9) ? seconds : '0' + seconds;
    
    return '#' + formattedHours + formattedMinutes + formattedSeconds;
}

Color.getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = Color;