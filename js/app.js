let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

// create option
function createOption(x, y, z) {
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value", toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}

function toNum(x) {
    return Number(x.replace(",", ""));
}

for (x in data.rates) {
    createOption(from, x, data.rates[x]);
    createOption(to, x, data.rates[x]);
}

// create table row
function createTr(x) {
    let tr = document.createElement("tr");

    x.map(function (el) {
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })

    historyList.appendChild(tr);

}

// to store in localStorage
function store() {
    localStorage.setItem("record", historyList.innerHTML);
}

document.getElementById("calc").addEventListener("submit", function (e) {
    e.preventDefault();

    // get state
    let x = input.value;
    let y = from.value;
    let z = to.value;

    // process
    let first = x * y;
    let second = first/z;
    let fromText = x + ' ' + from.options[from.selectedIndex].innerText;
    let toText = to.options[to.selectedIndex].innerText;
    let result = second.toFixed(2);
    let d = new Date().toLocaleString();
    let arr = [d, fromText, toText, result];
    createTr(arr);
    store();


    // set state
    result.innerHTML = result;
    input.value = '';
    input.focus();
    from.value = '';
    to.value = '1';
});

// to show output from localStorage (IIFE function)
(function () {
    if (localStorage.getItem("record")) {
        historyList.innerHTML = localStorage.getItem("record");
    }
})()

