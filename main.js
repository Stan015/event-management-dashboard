import { toggleMenu, toggleMobileMenu } from "./utils/toggleMenu.js";
import toggleTheme from "./utils/toggleTheme.js";
import Chart from "chart.js/auto";
import "./utils/downloadTable.js";

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

// Event history table
// search by text input
const searchInput = document.getElementById("search-event");
const eventHistoryTable = document.querySelector(".event-history-table");
const displayTotalNumberOfResults =
  document.querySelector(".number-of-results");

searchInput.addEventListener("keyup", () => {
  const filter = searchInput.value.trim().toLowerCase();
  let totalResult = [];

  const rows = eventHistoryTable.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    let rowContainsText = false;

    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      if (cell) {
        const cellText = cell.textContent || cell.innerText;
        if (cellText.toLowerCase().includes(filter)) {
          rowContainsText = true;
          break;
        }
      }
    }

    if (filter === "") {
      row.style.display = "";
      totalResult.push(row);
    } else if (rowContainsText) {
      row.style.display = "";
      totalResult.push(row);
    } else {
      row.style.display = "none";
    }
  }

  const noResultsMessage = document.querySelector(".noResults");
  totalResult.length === 0
    ? (noResultsMessage.style.display = "block")
    : (noResultsMessage.style.display = "none");

  displayTotalNumberOfResults.innerText = `Displaying ${totalResult.length} results`;
});

// search by date
const dateInput = document.getElementById("select-date");

dateInput.addEventListener("change", () => {
  const filter = dateInput.value;
  let totalResult = [];

  console.log(filter);
  const rows = eventHistoryTable.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const dateCell = row.getElementsByTagName("td")[1];

    if (dateCell) {
      const cellDate = dateCell.textContent || dateCell.innerText;

      if (filter === "") {
        row.style.display = "";
        totalResult.push(row);
      } else if (cellDate === filter) {
        row.style.display = "";
        totalResult.push(row);
      } else {
        row.style.display = "none";
      }
    }
  }

  const noResultsMessage = document.querySelector(".noResults");
  totalResult.length === 0
    ? (noResultsMessage.style.display = "block")
    : (noResultsMessage.style.display = "none");

  displayTotalNumberOfResults.innerText = `Displaying ${totalResult.length} results`;
});

// Search based of status
const selectStatus = document.getElementById("select-status");

selectStatus.addEventListener("change", () => {
  const filter = selectStatus.value.trim();
  let totalResult = [];
  const rows = eventHistoryTable.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const statusCell = row.getElementsByTagName("td")[3];

    if (statusCell) {
      const statusText = statusCell.textContent || statusCell.innerText;

      if (filter === "") {
        row.style.display = "";
        totalResult.push(row);
      } else if (statusText === filter) {
        row.style.display = "";
        totalResult.push(row);
      } else {
        row.style.display = "none";
      }
    }
  }

  const noResultsMessage = document.querySelector(".noResults");
  totalResult.length === 0
    ? (noResultsMessage.style.display = "block")
    : (noResultsMessage.style.display = "none");

  displayTotalNumberOfResults.innerText = `Displaying ${totalResult.length} results`;
});

// Sort table
const sortOptions = document.getElementById("sort-events");

// Save a copy of the original rows
const tbody = eventHistoryTable.querySelector("tbody");
const originalRows = Array.from(tbody.querySelectorAll("tr")).slice(0);

sortOptions.addEventListener("change", () => {
  const filter = sortOptions.value.trim();
  let totalResult = [];
  const rows = Array.from(tbody.querySelectorAll("tr"));

  if (filter === "") {
    tbody.innerHTML = "";
    originalRows.forEach((row) => tbody.appendChild(row.cloneNode(true)));
    totalResult = Array.from(tbody.querySelectorAll("tr"));
  } else {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const dateOfEvent = row.getElementsByTagName("td")[1];

      if (dateOfEvent) {
        if (filter === "most recent") {
          row.style.display = "";
          totalResult.push(row);
        } else {
          row.style.display = "none";
        }
      }
    }

    // Sort the results based on date (newest to oldest)
    totalResult.sort((a, b) => {
      const dateA = new Date(a.getElementsByTagName("td")[1].textContent);
      const dateB = new Date(b.getElementsByTagName("td")[1].textContent);
      return dateB - dateA; // Sort in descending order for most recent
    });

    tbody.innerHTML = "";
    totalResult.forEach((row) => tbody.appendChild(row));
  }

  const noResultsMessage = document.querySelector(".noResults");
  totalResult.length === 0
    ? (noResultsMessage.style.display = "block")
    : (noResultsMessage.style.display = "none");

  displayTotalNumberOfResults.innerText = `Displaying ${totalResult.length} results`;
});
//

// Event detail popover
const popoverInfoCard = document.getElementById("event-detail-popover");
const closePopoverBtn = document.querySelector(".po-close-btn");

const togglePopover = () => {
  if (popoverInfoCard.style.display === "grid") {
    popoverInfoCard.style.display = "none";
  } else {
    popoverInfoCard.style.display = "grid";
  }
}

closePopoverBtn.addEventListener("click", togglePopover);

const rows = eventHistoryTable.getElementsByTagName("tr");

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  row.addEventListener("click", () => {
    const eventName = row.getElementsByTagName("td")[0];
    const eventDate = row.getElementsByTagName("td")[1];
    // const speaker = row.getElementsByTagName("td")[2];
    // const statusCell = row.getElementsByTagName("td")[3];
    // const eventDescription = row.getElementsByTagName("td")[4];

    popoverInfoCard.querySelector(".po-event-name").innerText = eventName.innerText;
    popoverInfoCard.querySelector(".po-event-date").innerText = eventDate.innerText;
    // popoverInfoCard.querySelector(".po-event-description").innerText = eventDescription.innerText;
    // popoverInfoCard.querySelector(".po-event-name").innerText = eventName.innerText;

    togglePopover()
  });
}
