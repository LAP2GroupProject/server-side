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
        console.log(habit.value)
    })
})
    