//// FREQUENCY SECTIONS ////
let sleepFrequencySection = document.getElementById("habitSleepContainer")
let waterFrequencySection = document.getElementById("habitWaterContainer")
let exerciseFrequencySection = document.getElementById("habitExerciseContainer")
let overviewSection = document.getElementById("displayHabitAndFrequencyBg")
let overviewHabit = document.getElementById("overviewHabit")
let overviewFrequency = document.getElementById("overviewFrequency")

//// SUBMIT FORM ////
let submitForm = document.getElementById("habitForm")
let formSubmitButton = document.getElementById("submitHabit")


//// HIDE CREATE SECTION AND SHOW HABITS SECTION ////
let noHabitsSection = document.getElementById("noHabitsBg")
let createHabitButton = document.getElementById("noHabitBtn")
let selectHabitSection = document.getElementById("habitsBg")
createHabitButton.addEventListener("click", () => {
    noHabitsSection.style.display = "none"
    selectHabitSection.style.display = "block"
})


let selectHabitButtons = document.querySelectorAll(".selectedHabit")
selectHabitButtons.forEach((habit) => {
    habit.addEventListener("click", () => {
        showFrequencySection(habit.value)
    })
})


function showFrequencySection(habit) {
    selectHabitSection.style.display = "none"
    if(habit === "Sleep") {
        sleepFrequencySection.style.display = "block"
        saveSelected(sleepFrequencySection, habit.toLowerCase())
    } else if (habit === "Water") {
        waterFrequencySection.style.display = "block"
        saveSelected(waterFrequencySection, habit.toLowerCase())
    } else if (habit === "Exercise") {
        exerciseFrequencySection.style.display = "block"
        saveSelected(exerciseFrequencySection, habit.toLowerCase())
    }

}

function saveSelected (section, habit) {
    let frequencyInput = document.getElementById(`${habit}Input`)
    let frequencyButton = document.getElementById(`${habit}`)

    frequencyButton.addEventListener("click", () => {
        showOverview(section, habit, frequencyInput.value)
    })
}

function showOverview (section, habit, frequency) {
    section.style.display = "none"
    overviewSection.style.display = "block"
    overviewHabit.textContent = `[${habit}]`
    overviewFrequency.textContent = `[${frequency}]`

    document.getElementById("habitInput").value = habit
    document.getElementById("habitFrequency").value = frequency

}

submitForm.addEventListener("submit", postHabit)


    

