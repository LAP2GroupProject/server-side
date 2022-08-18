async function postHabit (e) {
    e.preventDefault()
    try {
        const options = {
            method: 'POST',
            headers: { "Content-type": "application/json",
                       'authorization': localStorage.getItem("token") },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        await fetch('http://localhost:3000/habits', options)
        
    } catch (err) {
        console.log(err)
    }
}

async function loginRequest (e) {
    e.preventDefault()
    try {
        const options = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const response = await fetch('http://localhost:3000/login', options)
        const res = await response.json()
        if (res.success===true) {
            localStorage.setItem("token", res.token)
            window.location.assign("user_habit_completed.html")
        } else {
            throw "You are not authenticated. Please register!"
        }
    } catch (err) {
        alert(err)
    }

}

async function registerRequest (e) {
    console.log("i am here")
    e.preventDefault()
    try {
        const options = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }

        await fetch('http://localhost:3000/register', options)
        registerMessage()

        const response = await fetch('http://localhost:3000/register', options)
        if (response.status === 201) {
            document.getElementById("register-container").style.display = "none"
            document.getElementById("thank-you-message").style.display = "block"
        }

    } catch (err) {
        alert(err)
    }
}

async function completeHabit (e) {
    e.preventDefault()
    try {
        const options = {
            method: 'POST',
            headers: { "Content-type": "application/json",
                       'authorization': localStorage.getItem("token") },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        await fetch('http://localhost:3000/users/complete', options)
        window.location.reload()
    } catch (err) {
        alert(err)
    }
}

// register message for users
function registerMessage() {
    const registerMessage = document.getElementById("registerMessage");
    pElem = document.createElement("p");
    pElem.setAttribute("id", "registerMessage");
    pElem.textContent = "You have registered!";
    registerMessage.appendChild(pElem);
}
