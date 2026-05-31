
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const balance = document.querySelector("#balance");

const type = document.querySelector("#type");
const itemName = document.querySelector("#item-name");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");

const foodTotal = document.querySelector("#food-total");
const shoppingTotal = document.querySelector("#shopping-total");
const petrolTotal = document.querySelector("#petrol-total");
const studyTotal = document.querySelector("#study-total");
const entertainmentTotal = document.querySelector("#entertainment-total");
const otherTotal = document.querySelector("#other-total");

const transactionList = document.querySelector("#transaction-list");

const highestBtn = document.querySelector("#highest-btn");
const lowestBtn = document.querySelector("#lowest-btn");
const newestBtn = document.querySelector("#newest-btn");
const oldestBtn = document.querySelector("#oldest-btn");
const filterCategory = document.querySelector("#filter-category");


// Update balance card
function updateBalance() {
    balance.textContent =
        Number(income.textContent) - Number(expense.textContent);
}


// Clear all form inputs
function clearInputs() {
    itemName.value = "";
    amount.value = "";
    category.value = "";
}

// Highest Transaction
highestBtn.addEventListener("click", function () {

    const highest = [...arr].sort(function (a, b) {
        return b.amount - a.amount;
    });

    renderTransactions(highest);
});

// Lowest Transaction
lowestBtn.addEventListener("click", function () {

    const lowest = [...arr].sort(function (a, b) {
        return a.amount - b.amount;
    });

    renderTransactions(lowest);
});

// Newest Transaction
newestBtn.addEventListener("click", function () {

    const newest = [...arr].sort(function (a, b) {
        return b.time - a.time;
    });

    renderTransactions(newest);
});

// Oldest Transaction
oldestBtn.addEventListener("click", function () {

    const oldest = [...arr].sort(function (a, b) {
        return a.time - b.time;
    });

    renderTransactions(oldest);
});

// Update category analytics
function updateCategoryAnalytics() {

    const value = Number(amount.value);

    if (category.value === "Food") {

        foodTotal.textContent =
            Number(foodTotal.textContent) + value;

    } else if (category.value === "Shopping") {

        shoppingTotal.textContent =
            Number(shoppingTotal.textContent) + value;

    } else if (category.value === "Petrol") {

        petrolTotal.textContent =
            Number(petrolTotal.textContent) + value;

    } else if (category.value === "Study Material") {

        studyTotal.textContent =
            Number(studyTotal.textContent) + value;

    } else if (category.value === "Entertainment") {

        entertainmentTotal.textContent =
            Number(entertainmentTotal.textContent) + value;

    } else if (category.value === "Other") {

        otherTotal.textContent =
            Number(otherTotal.textContent) + value;
    }
}


// Delete transaction
function deleteTransaction(li, transactionType, transactionAmount, transactionCategory) {

    li.remove();

    if (transactionType === "income") {

        income.textContent =
            Number(income.textContent) - transactionAmount;

    } else {

        expense.textContent =
            Number(expense.textContent) - transactionAmount;

        if (transactionCategory === "Food") {

            foodTotal.textContent =
                Number(foodTotal.textContent) - transactionAmount;

        } else if (transactionCategory === "Shopping") {

            shoppingTotal.textContent =
                Number(shoppingTotal.textContent) - transactionAmount;

        } else if (transactionCategory === "Petrol") {

            petrolTotal.textContent =
                Number(petrolTotal.textContent) - transactionAmount;

        } else if (transactionCategory === "Study Material") {

            studyTotal.textContent =
                Number(studyTotal.textContent) - transactionAmount;

        } else if (transactionCategory === "Entertainment") {

            entertainmentTotal.textContent =
                Number(entertainmentTotal.textContent) - transactionAmount;

        } else if (transactionCategory === "Other") {

            otherTotal.textContent =
                Number(otherTotal.textContent) - transactionAmount;
        }
    }

    updateBalance();
}

filterCategory.addEventListener("change", function () {

    if (this.value === "all") {

        renderTransactions(arr);

    } else {

        const filtered = arr.filter(function (transition) {

            return transition.category === filterCategory.value;

        });

        renderTransactions(filtered);
    }
});

function renderTransactions(data) {

    transactionList.innerHTML = "";

    data.forEach(function (transition) {

        const li = document.createElement("li");

        li.classList.add("transaction-item");

        li.innerHTML = `
        <div class="transaction-left">
            <h4>${transition.name}</h4>
            <p>${transition.category}</p>
        </div>

        <div class="transaction-center">
            ${transition.date}
        </div>

        <div class="transaction-right">
            <span class="transaction-amount">
                ₹${transition.amount}
            </span>
        </div>
        `;

        transactionList.append(li);
    });
}
const arr = [];

function history() {

    const transactionType = type.value;
    const transactionAmount = Number(amount.value);
    const transactionCategory = category.value;

    const transition = {
    name: itemName.value,
    type: transactionType,
    amount: transactionAmount,
    category: transactionCategory,
    date: new Date().toLocaleString(),
    time: Date.now()
};

    // Array me add karo
    arr.push(transition);

    const li = document.createElement("li");
    li.classList.add("transaction-item");

    const date = new Date();

    li.innerHTML = `
    <div class="transaction-left">
        <h4>${transition.name}</h4>
        <p>${transition.category}</p>
    </div>

    <div class="transaction-center">
        ${date.toLocaleString()}
    </div>

    <div class="transaction-right">
        <span class="transaction-amount">
            ₹${transition.amount}
        </span>

        <button class="delete-btn">
            Delete
        </button>
    </div>
    `;

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {

        const position = arr.indexOf(transition);

        arr.splice(position, 1);

        li.remove();

        console.log(arr);
    });

    transactionList.prepend(li);

    clearInputs();
}

// Handle income transaction
function Income(callback) {

    let currentIncome = Number(income.textContent);

    currentIncome += Number(amount.value);

    income.textContent = currentIncome;

    updateBalance();

    callback();
}


// Handle expense transaction
function Expense(callback) {

    let currentExpense = Number(expense.textContent);

    currentExpense += Number(amount.value);

    expense.textContent = currentExpense;

    updateCategoryAnalytics();

    updateBalance();

    callback();
}


// Main function
function check() {
    if (type.value === "expense" && category.value === "") {
        alert("Please select category");
        return;
    }

    if (itemName.value.trim() === "" || amount.value.trim() === "") {
        alert("Please fill all fields");
        return;
    }

    if (type.value === "income") {

        Income(history);

    } else {

        Expense(history);
    }
}

