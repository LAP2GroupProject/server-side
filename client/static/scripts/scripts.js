$("document").ready(() => {
  // toggle mobile nav bar
  $("#bars").click(() => {
    $("#mobileNavLinksBg").slideToggle();
  });

  // flashes submitted message
  const submitHabit = document.getElementById("submitHabit");
  submitHabit.addEventListener("click", flashSubmitMessage)

  function flashSubmitMessage() {
    const flashSubmitMessage = document.getElementById("flashSubmitMessage");
    const pElem = document.createElement("p");
    pElem.textContent = "You have successfully submitted!";
    flashSubmitMessage.appendChild(pElem);  
    setTimeout(() => {
      flashSubmitMessage.style.display = 'none'
    }, 3000);
  } 

});

