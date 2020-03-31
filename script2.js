const betButtons = document.getElementsByTagName('td');
const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
Array.from(betButtons).forEach((betButton) => {
    for (let i = 0; i < black.length; i++) {
        if (betButton.innerText == black[i]) {
            betButton.setAttribute('class', 'black');
            betButton.setAttribute('data-bet-id', `${betButton.innerText}`);
        }
        if (betButton.innerText == red[i]) {
            betButton.setAttribute('class', 'red');
            betButton.setAttribute('data-bet-id', `${betButton.innerText}`);
        }
    }

});

//выбор числа/ставки
let selectedBet;
const table = document.getElementById('table')
const tbody = document.getElementById('tbody');
const betPanel = document.getElementById('bet-panel');
let counter = 0;
Array.from(betButtons).forEach((betButton) => {
    betButton.addEventListener('click', function (e) {
        if (e.target.nodeName == "TD") {
            betButton.classList.add("select");
            counter++;
            selectedBet = betButton.innerText;
            isBetSelected = true;
            console.log(`Ставка на ${selectedBet}`);
        }
        if (counter >= 2) {
            Array.from(betButtons).forEach((betButton) => {
                if (betButton.hasAttribute('class', 'selected')) {
                    betButton.classList.remove("select");
                }
            })
            betButton.classList.add("select");
        }

    });
});

//установка суммы ставки
let selectedAmount;
let counterAmount = 0;
const selectedAmountButtons = document.getElementsByClassName('bet-buttons');
const betAmountHolder = document.getElementById('bet-amount-holder')
Array.from(selectedAmountButtons).forEach((selectedAmountButton) => {
    selectedAmountButton.addEventListener('click', function (e) {
        if (e.target.nodeName == "BUTTON") {
            selectedAmountButton.classList.add("select");
            counterAmount++;
            selectedAmount = selectedAmountButton.innerText;
            betAmountHolder.innerText = `Bet amount ${selectedAmountButton.innerText}`;
            isAmountSelected = true;
            console.log(`${selectedAmount} монет`);
        }
        if (counterAmount >= 2) {
            Array.from(selectedAmountButtons).forEach((selectedAmountButton) => {
                if (selectedAmountButton.hasAttribute('class', 'selected')) {
                    selectedAmountButton.classList.remove('select');
                }
            })
            selectedAmountButton.classList.add('select');
        }
    });
});

//сброс всех выбранных ставок
const resetButton = document.getElementById('reset');
const resetSelections = function () {
    
    Array.from(selectedAmountButtons).forEach((selectedAmountButton) => {
        if (selectedAmountButton.hasAttribute('class', 'selected')) {
            selectedAmountButton.classList.remove('select');
        }
    });
    Array.from(betButtons).forEach((betButton) => {
        if (betButton.hasAttribute('class', 'selected')) {
            betButton.classList.remove("select");
        }
    })
    betAmountHolder.innerText = `Bet amount `;
    selectedAmount = 0;
    selectedBet = null;
    isBetSelected = false;
    isAmountSelected = false;
}
resetButton.addEventListener('click', function () {
    resetSelections();
})

//функция выбора числа
const rollNumber = document.getElementById('roll-number');
const getRollNumber = function () {
    let rollTimer = setInterval(() => {
        for (let i = 0; i < 35; i++) {
            buttonRoll.setAttribute("disabled", "disabled");
            rollNumber.innerText = `${getRandomNumber(0, 36)}`;
        }
    }, 50);
    setTimeout(() => {
        clearInterval(rollTimer);
        buttonRoll.removeAttribute("disabled");
        n = Number(rollNumber.innerText);
        console.log(n);
    }, 2000);
}

isBetSelected = false;
isAmountSelected = false;
const getRandomNumber = (from, to) => Math.round(Math.random() * (to - from) + from);
const buttonRoll = document.getElementById('button-roll');
const balancePanel = document.getElementById('balance');
const history = document.getElementById('history');
let balance = 100;
balancePanel.innerText = `Balance = ${balance}`;
let n = Number(rollNumber.innerText);

//обработка ситуации
buttonRoll.addEventListener('click', function (e) {
    if (isAmountSelected == false || isBetSelected == false) {
        getRollNumber();
        resetSelections();
    }
    if (isAmountSelected == true && isBetSelected == true && Number(selectedAmount) <= balance) {
        balance -= selectedAmount;
        balancePanel.innerText = `Balance = ${balance}`;
        history.innerText = ``;
        getRollNumber();

        setTimeout(() => {
            let n = Number(rollNumber.innerText);
            if (selectedBet == n) {
                balance += selectedAmount * 35;
                history.innerText = `You have won ${selectedAmount * 34}`
            }
            if (selectedBet == 'Red' && red.includes(n)) {
                balance += selectedAmount * 2;
                history.innerText = `You have won ${selectedAmount}`
            }
            if (selectedBet == 'Black' && black.includes(n)) {
                balance += selectedAmount * 2;
                history.innerText = `You have won ${selectedAmount}`
            }
            if (selectedBet == 'Even' && n % 2 == 0) {
                balance += selectedAmount * 2;
                history.innerText = `You have won ${selectedAmount}`
            }
            if (selectedBet == 'Odd' && n % 2 == 1) {
                balance += selectedAmount * 2;
                history.innerText = `You have won ${selectedAmount}`
            }
            if (selectedBet == '1to18' && (n > 0 && n <= 18)) {
                balance += selectedAmount * 2;
                history.innerText = `You have won ${selectedAmount}`
            }
            if (selectedBet == '19to36' && (n > 18 && n <= 36)) {
                balance += selectedAmount * 2;
                history.innerText = `You have won ${selectedAmount}`
            }
            if (selectedBet == '1st Dozen' && (n > 0 && n <= 12)) {
                balance += selectedAmount * 3;
                history.innerText = `You have won ${selectedAmount * 2}`
            }
            if (selectedBet == '2nd Dozen' && (n > 12 && n <= 24)) {
                balance += selectedAmount * 3;
                history.innerText = `You have won ${selectedAmount * 2}`
            }
            if (selectedBet == '3rd Dozen' && (n > 24 && n <= 36)) {
                balance += selectedAmount * 3;
                history.innerText = `You have won ${selectedAmount * 2}`
            }
            if (selectedBet == '2to1') {
                if (selectedBet.parentNode.rowIndex == 0 && selectedBet.parentNode.innerText.includes(n)) {
                    balance += selectedAmount * 3;
                    history.innerText = `You have won ${selectedAmount * 2}`
                }
            }
            if (selectedBet == 0) {
                history.innerText = ``;
            }
            balancePanel.innerText = `Balance = ${balance}`;
            resetSelections();
        }, 2050)
    }
    else if (Number(selectedAmount) > balance) {
        alert('You dont have enough coins');
    }

});