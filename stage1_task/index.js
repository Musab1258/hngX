function getDOM_elements(numbers, element) {
    if (numbers === "one") {
        return document.querySelector(element);
    } else if (numbers === "all") {
        return document.querySelectorAll(element);
    } else {
        return "No type was specified for getDOM_element function";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    jsFunctionalities();
})

function jsFunctionalities() {
    let day = getDOM_elements("one", ".current_day");
        time = getDOM_elements("one", ".current_time");

    date = new Date();

    function displayDay() {

        let dayName = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        }

        let today = dayName[date.getDay()];

        day.textContent = today;
    }

    displayDay();

    function displayTime() {
        let presentTime = `${date.getUTCHours() + 1}:${date.getUTCMinutes()}:${date.getUTCSeconds()}:${date.getUTCMilliseconds()}`;

        time.textContent = presentTime;
    }

    setInterval(() =>  {
        displayTime();
    }, 1);
}