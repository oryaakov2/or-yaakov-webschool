const StopWatch = {
    interval: null,
    mili: 0,
    sec: 0,
    min: 0,
    hour: 0,
    start: function () {
        B.start.removeEventListener("click", StopWatch.start);
        StopWatch.interval = setInterval(function () {

            StopWatch.mili += 1;

            if (StopWatch.mili < 1000) {
                $.mili.innerText = StopWatch.mili;
            }
            else {
                StopWatch.sec += 1;

                if (StopWatch.sec > 59) {
                    StopWatch.sec = 0;
                    StopWatch.min += 1;
                    $.min.innerText = StopWatch.min < 10 ? "0" + StopWatch.min : StopWatch.min;

                    if (StopWatch.min > 59) {
                        StopWatch.min = 0;
                        StopWatch.hour += 1;
                        $.hour.innerText = StopWatch.hour;
                    }

                } else {
                    $.sec.innerText = StopWatch.sec < 10 ? "0" + StopWatch.sec : StopWatch.sec;
                    StopWatch.mili = 0;
                }
            }

        }, 1);
    },
    stop: function () {
        clearInterval(StopWatch.interval);
        B.start.addEventListener("click", StopWatch.start);
    },
    reset: function () {
        clearInterval(StopWatch.interval)
        B.start.addEventListener("click", StopWatch.start);

        StopWatch.mili = 0;
        StopWatch.sec = 0;
        StopWatch.min = 0;
        StopWatch.hour = 0;

        $.mili.innerText = "00"
        $.sec.innerText = "00"
        $.min.innerText = "00"
        $.hour.innerText = "00"
    },
};

const $ = {
    mili: document.querySelector("#mili"),
    sec: document.querySelector("#seconds"),
    min: document.querySelector("#minutes"),
    hour: document.querySelector("#hours"),
};

const B = {
    start: document.querySelector("#start"),
    stop: document.querySelector("#stop"),
    reset: document.querySelector("#reset"),
};

B.start.addEventListener("click", StopWatch.start);
B.stop.addEventListener("click", StopWatch.stop);
B.reset.addEventListener("click", StopWatch.reset);
