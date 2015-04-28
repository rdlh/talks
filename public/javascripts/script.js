function startTime() {
    var today   = new Date();
    var h       = today.getHours();
    var m       = today.getMinutes();
    var s       = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    displayedHours = checkHours(h);

    document.getElementById('hours-and-minutes').innerHTML  = displayedHours[0] + ':' + m + '&nbsp;';
    document.getElementById('day-moment').innerHTML         = displayedHours[1];

    var t = setTimeout(function(){startTime()},500);
}

var seconds = 0;
function startTimer() {

    var m = Math.floor(seconds/60);
    var h = Math.floor(m/60);

    h = checkTime(h);
    m = checkTime(m - (h * 60));
    displayedSeconds = checkTime(seconds - (m * 60) - (h * 60));

    document.getElementById('hours').innerHTML = h + ':';
    if (h > 0) {
        document.getElementById("hours").className = '';
    }
    document.getElementById('minutes').innerHTML = m + ':';
    if (m > 0) {
        document.getElementById("minutes").className = '';
    }
    document.getElementById('seconds').innerHTML = displayedSeconds;
    if (seconds > 0) {
        document.getElementById("seconds").className = '';
    }

    seconds++;
}

var countdownTimer = setInterval('startTimer()', 1000);

function checkTime(i) {
    if (i < 10) { i = '0' + i };
    return i;
}

function checkHours(i) {
    if (i > 12) {
        i = i - 12
        var text = 'PM'
    } else {
        var text = 'AM'
    }
    return [i, text];
}
