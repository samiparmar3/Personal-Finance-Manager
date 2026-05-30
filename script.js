
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


// Add transaction to history
function history() {

    const transactionType = type.value;
    const transactionAmount = Number(amount.value);
    const transactionCategory = category.value;

    const li = document.createElement("li");
    li.classList.add("transaction-item");

    const date = new Date();

   li.innerHTML = `
    <div class="transaction-left">
        <h4>${itemName.value}</h4>
        <p>${transactionCategory}</p>
    </div>

    <div class="transaction-center">
        ${date.toLocaleString()}
    </div>

    <div class="transaction-right">
        <span class="transaction-amount">
            ₹${transactionAmount}
        </span>

        <button class="delete-btn">
            Delete
        </button>
    </div>
`;
    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
        deleteTransaction(
            li,
            transactionType,
            transactionAmount,
            transactionCategory
        );
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

    if (
        itemName.value.trim() === "" ||
        amount.value.trim() === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    if (type.value === "income") {

        Income(history);

    } else {

        Expense(history);
    }
}

