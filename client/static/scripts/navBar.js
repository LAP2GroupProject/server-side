// toggles nav width & links appearance
navBarIcon.addEventListener("click", () => {
  if (navBarSmallBg.style.height === "4rem") {
    navBarSmallBg.style.height = "10rem";
    navLinksSmall.style.display = "grid";
  } else {
    navBarSmallBg.style.height = "4rem";
    navLinksSmall.style.display = "none";
  }
});
