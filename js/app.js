let from = document.getElementById("from");
let to = document.getElementById("to");

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