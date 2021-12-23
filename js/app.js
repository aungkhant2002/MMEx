let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

// create option
function createOption(x, y, z) {
    // parameter x က ဘယ်ထဲကို ထည့်မှာလဲ။ y က ထည့်မယ့် option text။ z က option ရဲ့ value။
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value", toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}

// (,)ကိုဖြုတ်ပြီး string ကို number ပြောင်း
function toNum(x) {
    return Number(x.replace(",", ""));
}

// data.js က rate ကို loop ပတ် x က key, data.rates[x] က value
for (x in data.rates) {
    createOption(from, x, data.rates[x]);
    createOption(to, x, data.rates[x]);
}

// create table row
function createTr(x) { // parameter x is an array so it can loop with map

    // to delete rowSpacer when row is add
    let rowSpacer = document.getElementById("rowSpacer");
    if (rowSpacer) {
        rowSpacer.remove();
    }



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
    let toText = to.options[to.selectedIndex].innerText; // to get selected option text
    let result = second.toFixed(2); // to get result with two decimal point
    let d = new Date().toLocaleString();
    let arr = [d, fromText, toText, result];
    createTr(arr);
    store();


    // set state
    result.innerHTML = result;
    input.value = '';
    input.focus(); // to autofocus use focus() function
    from.value = '';
    to.value = '1';
});

// to show output from localStorage (IIFE function)
(function () {
    if (localStorage.getItem("record")) {
        historyList.innerHTML = localStorage.getItem("record");
    } else {  // adding row when row is empty
        historyList.innerHTML = `<tr id="rowSpacer"><td colspan="4" style="text-align: center">There is no record 🙂.</td></tr>`;
    }
})()

