let transaction = [];
let balanceElement = document.getElementById("balance");
let incomeElement = document.getElementById("income");
let expenseElement = document.getElementById("expense");
let listElement = document.getElementById("list-items");
function showTransaction() {
    listElement.innerHTML = "";
    transaction.forEach(function (tx, index) {
        let li = document.createElement("li");
        let signClass = tx.amount >= 0 ? "pos" : "neg";
        li.innerHTML = `<span><b>${tx.title}</b> (${tx.category})</span> 
        <small>${tx.date}</small>
        <div class><span class="${signClass}">${tx.amount}$</span>
        <button onclick="deleteLi(${index})">Delete</button>
        </div>`;
        listElement.appendChild(li);
    })
    updatedata();
}
function deleteLi(index) {
    transaction.splice(index, 1);
    save();
    showTransaction();
}

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let title = form.title.value;
    let amount = Number(form.amount.value);
    let category = form.category.value;   
    let date = form.date.value;
    let tx = {
        title: title,
        amount: amount,
        category: category,
        date: date
    };
    transaction.push(tx);
    save();
    showTransaction();
    form.reset();
});
function save() {
    localStorage.setItem("transaction", JSON.stringify(transaction));
}
function load() {
    let data = localStorage.getItem("transaction");
    if (data) {
        transaction = JSON.parse(data);
    }

}
function updatedata() {
    let income = 0;
    let expense = 0;
    transaction.forEach(function (tx) {
        if (tx.amount > 0) {
            income += tx.amount;
        }
        else {
            expense += tx.amount;
        }
    })
    let balance = income + expense;
    balanceElement.innerHTML = `${balance}$`;
    incomeElement.innerHTML = `${income}$`;
    expenseElement.innerHTML = `${expense}$`;
}
load();
showTransaction();