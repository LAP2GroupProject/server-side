async function postHabit (e) {
    e.preventDefault()
    try {
        const options = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
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
        response.json()
        if (response.success) {
            console.log(response)
        } else {
            throw "You are not authenticated. Please register!"
        }
    } catch (err) {
        console.log(err)
    }


}
