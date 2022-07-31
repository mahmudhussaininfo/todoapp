

const todo_form = document.getElementById('todo_form');
const do_name = document.getElementById('do_name');
const do_client = document.getElementById('do_client');
const do_date = document.getElementById('do_date');
const do_time = document.getElementById('do_time');
const list_group = document.querySelector('.list-group');


todo_form.onsubmit = (e) => {
    e.preventDefault();

    let day1 = new Date(do_date.value + ' ' + do_time.value);
    let day2 = new Date();

    let storegeval = localStorage.getItem('todoapps');
    let doarray;

    if (storegeval == null) {
        doarray = [];
    } else {
        doarray = JSON.parse(storegeval);
    }

    doarray.push({

        Name: do_name.value,
        client: do_client.value,
        Remain: (day1.getTime() - day2.getTime()),
        deadline: day1.getTime()

    });

    localStorage.setItem('todoapps', JSON.stringify(doarray));
    todo_form.reset();
    listshow();

}

setInterval(() => {

    listshow();

}, 1000);

listshow();
function listshow() {


    let day = new Date();

    let storegeval = localStorage.getItem('todoapps');
    let doarray;
    let data = '';

    if (storegeval == null) {
        doarray = [];
    } else {
        doarray = JSON.parse(storegeval)
    }

    doarray.map((val, index) => {

        data += ` <li class="list-group-item shadow">
        ${val.name} | Client : ${val.client} | Remain time : <strong>[ ${reamainTime(val.dead_line, day.getTime())} ]</strong>
        <button onclick="deleteList(${index})" class="close">&times;</button>
        <span style="${rangeBar(val.remain, val.dead_line)}" class="status"></span>
      </li>`

    });

    list_group.innerHTML = data;
}

function rangeBar(remain, dead_line) {
    let day = new Date();
    let current_remain = dead_line - day.getTime();

    let remainper = (100 * current_remain) / remain;
    let width = Math.floor(remainper);

    if (width <= 0) {
        width = `width:100%; background-color:red;`;
    } else if (width >= 0 && width <= 30) {
        width = `width:${width}%; background-color:pink;`;
    } else if (width >= 30 && width <= 40) {
        width = `width:${width}%; background-color:orange;`;
    } else if (width >= 41 && width <= 70) {
        width = `width:${width}%; background-color:blue;`;
    } else if (width >= 71 && width <= 100) {
        width = `width:${width}%; background-color:green;`;
    }

    return width;
}

function remainTime(dead_line, current_time) {
    let total_sec = Math.floor((dead_line - current_time) / 1000);
    let total_min = Math.floor(total_sec / 60);
    let total_hour = Math.floor(total_min / 60);
    let total_days = Math.floor(total_hour / 24);

    let hours = total_hour - (total_days * 24);
    let min = total_min(total_days * 24 * 60) - (hours * 60);
    let sec = total_sec - (total_days * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60);

    if (dead_line > current_time) {
        return ` ${total_days} Days ${hours} hours ${min} min ${sec} sec`
    } else {
        return ` <strong style = "color:red;">Time Over</strong>`
    }
}

function delatelist(index) {
    let storegeval = localStorage.getItem('todoapps');
    let doarray;

    if (storegeval == null) {
        doarray = [];
    } else {
        doarray = JSON.parse(storegeval);
    }

    doarray.splice(index, 1);
    localStorage.setItem('todoapps', JSON.stringify(doarray));
    listshow();
}