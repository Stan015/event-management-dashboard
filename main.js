const toggleMenuBtn = document.querySelector(".toggle-menu");
const navLinks = document.querySelectorAll(".primary-nav a .nav-link-text");
const toggleThemeBtn = document.querySelector(".toggle-theme");
const userProfileCardInfo = document.querySelector(".user-info");

// Toggle menu
toggleMenuBtn.addEventListener("click", () => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-hidden");
  });
  toggleMenuBtn.querySelector("span").classList.toggle("is-hidden");
  toggleThemeBtn
    .querySelector(".theme-toggle-text")
    .classList.toggle("is-hidden");
  userProfileCardInfo.classList.toggle("is-hidden");

  const isCollapseTextHidden = toggleThemeBtn
    .querySelector(".theme-toggle-text")
    .classList.contains("is-hidden");

  toggleMenuBtn.setAttribute(
    "aria-expanded",
    isCollapseTextHidden ? "false" : "true",
  );

  // check if there are notifications
  const notificationCount = document.querySelector(".new-notification-count");
  const bellContainer = document.querySelector(".bell-container");

  const numberOfNotifications = Number(notificationCount.innerText);

  if (
    numberOfNotifications > 0 &&
    toggleMenuBtn.getAttribute("aria-expanded") === "false"
  ) {
    bellContainer.classList.add("bell-has-notification");
  } else {
    bellContainer.classList.remove("bell-has-notification");
  }
  //
});
//

// Toggle theme
const currentModeText = toggleThemeBtn.querySelector(".theme-toggle-text");
const themeToggleBtnBall = toggleThemeBtn.querySelector(
  ".theme-toggle-ball-container",
);

// Check user's preference on page load and apply the stored theme if available
const userPreferredTheme = localStorage.getItem("theme");

if (userPreferredTheme) {
  document.body.classList.add(userPreferredTheme);
}

toggleThemeBtn.addEventListener("click", () => {
  const manualTheme = localStorage.getItem("theme");

  if (manualTheme === "dark") {
    themeToggleBtnBall.classList.add("ballToggledToLightMode");
    themeToggleBtnBall.classList.remove("ballToggledToDarkMode");
    localStorage.setItem("theme", "light");
    currentModeText.innerText = "Light mode";
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  } else {
    themeToggleBtnBall.classList.remove("ballToggledToLightMode");
    themeToggleBtnBall.classList.add("ballToggledToDarkMode");
    localStorage.setItem("theme", "dark");
    currentModeText.innerText = "Dark mode";
    document.body.classList.toggle("dark");
    document.body.classList.remove("light");
  }
});
//
