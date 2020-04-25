'use strict';
let calculate = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    itemsExpenses = document.getElementsByClassName("expenses-item"),
    OptionalItemsExpenses = document.getElementsByClassName("optionalexpenses-item"),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],

    optionalExpenses = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeLabel = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');



let money,time;
expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

calculate.addEventListener('click', function(){
    time = prompt("Введите дату в формате YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?");

    while (isNaN(money) || money=="" || money ==null) {
        money = +prompt("Ваш бюджет на месяц?");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() +1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;
});

expensesBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < itemsExpenses.length; i++) {
        let a = itemsExpenses[i].value,
            b = itemsExpenses[++i].value;

        if ((typeof(a))==='string'&&(typeof(a)!=null)&&(typeof(b)!=null)&&a!=''&&b!=''&&a.length<50){
            console.log('done');
            appData.expenses[a] = b;
            sum += +b;
        } else {
            a = itemsExpenses[i].value;
            b = itemsExpenses[++i].value;
        }
    expensesValue.textContent = sum;
    }
    
});

optionalExpensesBtn.addEventListener('click', function(){

    for (let i = 0; i < OptionalItemsExpenses.length; i++) {
        let choose = OptionalItemsExpenses[i].value;
        appData.optionalExpenses[i] = choose;
        optionalexpensesValue.textContent += choose + ' ' ;
    }
});

countBudgetBtn.addEventListener('click', function (){
    appData.moneyPerDay = ((appData.budget - +expensesValue.textContent)/ 30).toFixed();
    daybudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
        levelValue.textContent = "Низкий уровень достатка!";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <2000) {
        levelValue.textContent = "Средний уровень достатка!";
    } else if (appData.moneyPerDay >= 2000) {
        levelValue.textContent = "высокий уровень достатка!";
    } else {
        levelValue.textContent = "что то пошло не так!";
    }
});
chooseIncomeLabel.addEventListener('input', function(){
    let items = chooseIncomeLabel.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function(){
    if (appData.saving == true) {
        appData.saving = false;
    }
    else {
        appData.saving = true;
    }
});

sumValue.addEventListener('input',function(){
    if (appData.saving == true) {
        let sums = +sumValue.value,
            percent = +percentValue.value;
    appData.monthIncome = (sums/100/12*percent).toFixed();
    appData.yearIncome = (sums/100*percent).toFixed();
    monthsavingsValue.textContent = appData.monthIncome;
    yearsavingsValue.textContent = appData.yearIncome;
    } else {
        monthsavingsValue.textContent = "Поставьте галочку 'Есть ли накопления'";
        yearsavingsValue.textContent = "Поставьте галочку 'Есть ли накопления'";
    }
});

percentValue.addEventListener('input',function(){
    if (appData.saving == true) {
        let sums = +sumValue.value,
            percent = +percentValue.value;
    appData.monthIncome = (sums/100/12*percent).toFixed();
    appData.yearIncome = (sums/100*percent).toFixed();
    }
    monthsavingsValue.textContent = appData.monthIncome;
    yearsavingsValue.textContent = appData.yearIncome;
});

let appData = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses:{},
    income : [],
    saving: false,
};