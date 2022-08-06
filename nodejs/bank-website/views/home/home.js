const depositInput = document.getElementById("deposit");
const withdrawInput = document.getElementById("withdraw");
const deleteInput = document.getElementById("delete");

const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const deleteBtn = document.getElementById("delete-btn");

const modal = document.getElementById("modal")
const modalBtn = document.getElementById("modal-btn")

depositInput.addEventListener('input', function (e) {
    const value = e.target.value;
    const char = e.target.value.slice(-1);

    if (value > 0) {
        validateInputValue(e, value, char);
    }

    if (value.length <= 4) {
        const amount = Number(value).toFixed(2);

        if (isNaN(amount)) return
        else document.getElementById('quantity-deposit').innerText = '$' + amount;
    }
    else {
        e.target.value = value.slice(0, 4);
    }
})

withdrawInput.addEventListener('input', function (e) {
    const value = e.target.value;
    const char = e.target.value.slice(-1);

    if (value > 0) {
        validateInputValue(e, value, char);
    }

    if (value.length <= 4) {
        const amount = Number(value).toFixed(2);

        if (isNaN(amount)) return
        else document.getElementById('quantity-withdraw').innerText = '$' + amount;
    }
    else {
        e.target.value = value.slice(0, 4);
    }
})

depositBtn.addEventListener('click', async (e) => {
    const quantity = depositInput.value

    if (!quantity) {
        depositInput.focus()
        depositInput.style.outline = '1px solid red'
    }
    else {
        resetInputStyle()

        try {
            const res = await fetch(`http://localhost:3000/api/users/deposit/${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if (res.status === 401) {
                window.location = '/login'
            }
            else {
                const data = await res.json();

                document.getElementById('quantity-deposit').innerText = '$0.00';
                depositInput.value = ''

                visibleModal(data)
            }

        } catch (error) {
            console.log(error)
        }
    }
})

withdrawBtn.addEventListener('click', async (e) => {
    const quantity = withdrawInput.value

    if (!quantity) {
        withdrawInput.focus()
        withdrawInput.style.outline = '1px solid red'
    }
    else {
        resetInputStyle()

        try {
            const res = await fetch(`http://localhost:3000/api/users/withdraw/${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if (res.status === 401) {
                window.location = '/login'
            }
            else {
                const data = await res.json();

                document.getElementById('quantity-withdraw').innerText = '$0.00';
                withdrawInput.value = ''

                visibleModal(data)
            }

        } catch (error) {
            console.log(error)
        }
    }
})

deleteBtn.addEventListener('click', async (e) => {
    if (!deleteInput.value) {
        deleteInput.focus()
        deleteInput.style.outline = '1px solid red'
    }
    else {
        try {
            resetInputStyle()

            const res = await fetch(`http://localhost:3000/api/users/delete/${deleteInput.value}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            
            if (res.ok || res.status === 401) {
                deleteInput.value = ''
                window.location = '/login'
            }
            else {
                const data = await res.json()
                visibleModal(data)
            }

        } catch (error) {
            console.log(error)
        }
    }
})

function resetInputStyle() {
    deleteInput.style.outline = 'none'
    withdrawInput.style.outline = 'none'
    depositInput.style.outline = 'none'
}

function visibleModal(data) {
    const modalTitle = document.createElement('h2')
    const modalMessage = document.createElement('p')
    const modalBtn = document.createElement('button')

    modalTitle.innerText = data.type;
    modalMessage.innerText = `${data.message} `;

    if (data.balance) {
        modalMessage.innerText += `current balance: $${data.balance}`
    }

    modalBtn.innerText = 'Ok'
    modalBtn.addEventListener('click', visibleModal)

    if (modal.classList.contains('hidden')) {
        modal.classList = ''
        modal.append(modalTitle, modalMessage, modalBtn)
    }
    else {
        modal.classList = 'hidden'

        while (modal.firstChild) {
            modal.removeChild(modal.lastChild);
        }
    }
}

function validateInputValue(input, value, char) {
    if (!value) {
        input.focus()
        input.style.border = '1px solid red'
    }
    if (isNaN(char)) {
        const indexOfChar = value.lastIndexOf(char);
        input.target.value = value.slice(0, indexOfChar);
    }
}