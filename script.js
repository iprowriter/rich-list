const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// data below is a local storage
let data = [];

// fetch random users from "randonusers.me" and then add money to them

async function getRandomUser() {
const res = fetch('https://randomuser.me/api');
const data = await (await res).json();

const user = data.results[0];


const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 2000000)
}

addData(newUser);
}

//Add new obj to data array

function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {

    //clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> 
        ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 

}

//the function below doubles the money.
//to achieve this, we map over the local storage called "data" which was already declared above with let data = [].
//then we update the dom by calling updateDOM()  function
//... below is a rest function used to copy everything inside data but returned only money.and then double it.
//using map function
function doubleMoney() {
data = data.map(user => {
    return {...user, money: user.money * 2};
})
    updateDOM();
}

//this function sort the people by their riches. using sort function
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

        updateDOM();
    }

//this function shows people who have certain amount of money. using filter function

function showOnlyMillionaires() {
    data = data.filter(user => user.money > 1000000 );

        updateDOM();
    } 

//the function below will calculate wealth. This is done using reduce function to add all the wealth together

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money),
    0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//Add a new user
addUserBtn.addEventListener('click', getRandomUser );
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);



getRandomUser();