let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".display");
let int = null;
const lap = document.getElementById("lap"),
    laps = document.getElementById("laps"),
    start = document.getElementById("start"),
    pause = document.getElementById("pause"),
    reset = document.getElementById("reset");

start.onclick = () => {
    if(int !== null){
        clearInterval(int);
    }
    int = setInterval(displayTime, 10);

    start.setAttribute("style", "display:none");
    pause.setAttribute("style", "display:block");
    lap.setAttribute("style", "display:block");
    reset.setAttribute("style", "display:none");
};

let count = 0;
lap.onclick = () => {
    count++;
    let li = document.createElement("li");
    li.innerHTML = `${"#" + count} - ${zeroPad(hours)} : ${zeroPad(minutes)} : ${zeroPad(seconds)} : ${zeroPad(milliseconds)}`;
    laps.appendChild(li);
}

pause.onclick = () => {
    clearInterval(int);

    pause.setAttribute("style", "display:none");
    start.setAttribute("style", "display:block");
    start.innerHTML = "Resume";
    lap.setAttribute("style", "display:none");
    reset.setAttribute("style", "display:block");
};

reset.onclick = () => {
    laps.innerHTML = "";
    count = 0;
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0,0,0,0];
    timeRef.innerHTML = "00 : 00 : 00 : 000";

    reset.setAttribute("style", "display:none");
    pause.setAttribute("style", "display:none");
    start.setAttribute("style", "display:block");
    start.innerHTML = "Start";
    lap.setAttribute("style", "display:block");
};

function displayTime() {
    milliseconds += 10;
    if(milliseconds == 1000) {
        milliseconds = 0;
        seconds++;

        if(seconds == 60) {
            seconds = 0;
            minutes++;

            if(minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    timeRef.innerHTML = `${zeroPad(hours)} : ${zeroPad(minutes)} : ${zeroPad(seconds)} : ${zeroPad(milliseconds)}`;
}

const zeroPad = (num) => {
    return String(num).padStart(2,"0");
}

