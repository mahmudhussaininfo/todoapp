/**
 * Set Alert
 */

const setAlert = (msg, type = "danger") => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss = "alert" class="btn-close"></button></p>`;
};

/**
 * Create Ls data
 */

const createlsdata = (key, value) => {
    let data = [];

    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Read Ls data
 */

const readlsdata = (key) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
};

/**
 * time counter
 */

const futuretime = (date, time, counter, interval = null, alarm = null) => {


    let start_time = Date.now();
    let end_time = new Date(date + ' ' + time);
    let order_time = Math.floor(Math.abs(end_time.getTime() - start_time));

    let total_sec = Math.floor(order_time / 1000);
    let total_min = Math.floor(total_sec / 60);
    let total_hour = Math.floor(total_min / 60);
    let total_day = Math.floor(total_hour / 24);

    let hour = total_hour - (total_day * 24);
    let min = total_min - (total_day * 24 * 60) - (hour * 60);
    let sec = total_sec - (total_day * 24 * 60 * 60) - (hour * 60 * 60) - (min * 60);

    if (total_sec == 0) {

        alarm.play();

        clearInterval(interval);

    }

    counter.innerHTML = `<h2> ${total_day} Days : ${hour} Hours : ${min} Min : ${sec} Sec</h2>`
}


/**
 * percentage time
 */

const counterper = (start_time, end_time) => {

    let time_different = end_time - start_time;
    let time_change = end_time - Date.now();

    return Math.floor((100 * time_change) / time_different);
}
