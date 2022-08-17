// fetching habit & streak
async function habitStreaksRequest() {
    try {
        const response = await fetch('http://localhost:3000/habits')
        const data = await response.json();

        data.map(singleObj => {
            console.log(singleObj);
            showHabits(singleObj)
        })

    } catch (err) {
        alert(err)
    }
}
habitStreaksRequest();

function showHabits(data) {
    const displayUserHabits = document.getElementById("displayUserHabits");
    const row = displayUserHabits.insertRow(1);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = data.habit;
    cell2.textContent = data.streak;

    if (true === true) { // needs toggling using 'completed' from other page
        cell3.innerHTML = `<i class="fa-solid fa-check"></i>`;        
    } else {
        cell3.innerHTML = `<i class="fa-solid fa-xmark"></i>`;           
    }
}
