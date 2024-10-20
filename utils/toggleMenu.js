// Toggle menu
function toggleMenu(
  toggleMenuBtn,
  navLinks,
  toggleThemeBtn,
  userProfileCardInfo,
) {
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
}
export default toggleMenu;
//
