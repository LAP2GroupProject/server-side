// fetching habit & streak
async function habitStreaksRequest() {
    try {
        const options = {
            method: 'GET',
            headers: { "Content-type": "application/json",
                    'authorization': localStorage.getItem("token") 
            }
        }
        const response = await fetch('http://localhost:3000/habits', options)
        const data = await response.json();

        data.forEach(habit => {
            console.log(habit)
            showHabits(habit)
        });

    } catch (err) {
        window.location.assign("/")
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
    
    if (!data.completeToday) {
        cell3.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    } else {
        cell3.innerHTML = `<i class="fa-solid fa-check"></i>`;       
    }
}
