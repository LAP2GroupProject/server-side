async function postHabit (e) {
    e.preventDefault()
    try {
        const options = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        console.log(options)
        const response = await fetch('http://localhost:3000/habits', options)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

