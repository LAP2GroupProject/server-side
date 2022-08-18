const form = document.getElementById("register-form")
const allHabitsComplete = document.getElementById("allHabitsComplete")
const uncompletedHabits = document.getElementById("userHabitCompletedPg")

async function renderHabits () {

    try {
        const options = {
        method: 'GET',
        headers: { "Content-type": "application/json",
                    'authorization': localStorage.getItem("token") 
            }
    }

    const response = await fetch("http://localhost:3000/users/habits", options)
    res = await response.json()
    console.log(res.length)

    if (res.length === 0) {
        uncompletedHabits.style.display = "none"
        allHabitsComplete.style.display = "block"
    } else {
        res.forEach(res => {
            createElement(res)
    });
    }

    addCompleteButton()
    } catch (error) {
        window.location.assign("/index.html")
    }

}

function createElement(res) {
    const elem = document.createElement("div")
        elem.className = "username-div"
        const habitLabel = document.createElement("label")
        habitLabel.htmlFor = res.habit
            if (res.habit === "sleep") {
                habitLabel.textContent = `I have slept for ${res.frequency} hours today`
            } else if (res.habit === "water") {
                 habitLabel.textContent = `I have drank ${res.frequency} litres of water today`
            } else if (res.habit === "exercise") {
                habitLabel.textContent = `I have exercised today`
        }
        elem.appendChild(habitLabel)
        const habitElem = document.createElement("input")
        habitElem.type = "checkbox"
        habitElem.name = "habit"
        habitElem.value = res.habit
        habitElem.id = "habitCheckBox"
        elem.appendChild(habitElem)
        form.appendChild(elem)
}

function addCompleteButton() {
    const button = document.createElement("button")
    button.type = "submit"
    button.textContent = "Complete"
    form.appendChild(button)
}

form.addEventListener("submit", completeHabit)

renderHabits()

