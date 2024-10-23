import { toggleMenu, toggleMobileMenu } from "./utils/toggleMenu.js";
import toggleTheme from "./utils/toggleTheme.js";
import Chart from "chart.js/auto";

const toggleMenuBtn = document.querySelector(".toggle-menu");
const navLinks = document.querySelectorAll(".primary-nav a .nav-link-text");
const toggleThemeBtn = document.querySelector(".toggle-theme");
const userProfileCardInfo = document.querySelector(".user-info");

// toggle menu collapse
toggleMenu(toggleMenuBtn, navLinks, toggleThemeBtn, userProfileCardInfo);

// toggle mobile menu drop down
const mobileMenuBtn = document.querySelector(".mobile-menu");
const navLinksContainer = document.querySelector(".nav-wrapper");

toggleMobileMenu(mobileMenuBtn, navLinksContainer);
//

// toggle theme
toggleTheme(toggleThemeBtn);

// Event registrations per month's bar chart
(function eventBarChart() {
  const ctx = document.getElementById("bar-chart");

  const data = [
    { month: "Jan", count: 770 },
    { month: "Feb", count: 670 },
    { month: "Mar", count: 894 },
    { month: "Apr", count: 499 },
    { month: "May", count: 390 },
    { month: "Jun", count: 859 },
    { month: "Jul", count: 890 },
    { month: "Aug", count: 489 },
    { month: "Sep", count: 799 },
    { month: "Oct", count: 600 },
    { month: "Nov", count: 578 },
    { month: "Dec", count: 990 },
  ];

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        {
          data: data.map((row) => row.count),
          borderWidth: 0,
          backgroundColor: "#8576FF",
          borderRadius: 2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 200,
          },
          grid: {
            color: "#ADA9BB",
            drawTicks: false,
            drawOnChartArea: true,
          },
          border: {
            display: false,
            dash: [3, 8],
          },
        },
        x: {
          grid: {
            color: "#ADA9BB",
            drawTicks: false,
            drawOnChartArea: true,
          },
          border: {
            display: false,
            dash: [3, 8],
          },
        },
      },
      legend: {
        display: false,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
})();
