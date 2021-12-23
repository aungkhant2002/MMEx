let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");

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

document.getElementById("calc").addEventListener("submit", function (e) {
    e.preventDefault();

    // get state
    let x = input.value;
    let y = from.value;
    let z = to.value;

    console.log(x, y, z);

    // process
    let first = x * y;
    let second = first/z;

    // set state
    result.innerHTML = second.toFixed(2);
    input.value = '';
    input.focus();
    from.value = '';
    to.value = '1';
})
