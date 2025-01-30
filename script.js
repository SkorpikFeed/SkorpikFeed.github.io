const startDate = new Date("2025-01-18");
const today = new Date();
const oneWeek = 7 * 24 * 60 * 60 * 1000;
const weeksGone = Math.floor((today - startDate) / oneWeek);
const days = [
  ".monday",
  ".tuesday",
  ".wednesday",
  ".thursday",
  ".friday",
  ".saturday",
];
const currentDay = days[today.getDay() - 1];
const tableDays = document.querySelectorAll(currentDay);

const isFirstWeek = weeksGone % 2 === 0;

// Add different style to current day
function addStyleToCurrentDay() {
  tableDays.forEach((day) => {
    day.classList.add("current-day");
  });
}

// Add badge to live element
function addBadgeToLiveElement() {
  const liveElements = document.querySelectorAll(".live");

  liveElements.forEach((element) => {
    const targetCol = element.querySelector(".badge-group");
    if (!targetCol.querySelector(".badge.text-bg-danger")) {
      const badge = document.createElement("span");
      badge.classList.add("text-bg-danger");
      badge.classList.add("badge");
      badge.textContent = "LIVE";
      targetCol.appendChild(badge);
    }
  });
}

// Remove badge from non-live elements
function removeBadgeFromNonLiveElements() {
  const allElements = document.querySelectorAll(".badge-group");

  allElements.forEach((element) => {
    const badge = element.querySelector(".badge.text-bg-danger");
    if (badge && !element.closest(".live")) {
      badge.remove();
    }
  });
}

// TODO: fix live badges remaining after the end of the lesson
// Assing live class to current lesson
function assignLiveClassToCurrentLesson() {
  const today = new Date();
  tableDays.forEach((day) => {
    const lessons = day.querySelectorAll(".list-group-item");
    lessons.forEach((lesson) => {
      const timeBadge = lesson.querySelector(".col-2 .badge.text-bg-secondary");
      if (!lesson.classList.contains("disabled")) {
        if (timeBadge) {
          const [start, end] = timeBadge.innerHTML
            .split('<hr class="my-2">\n')
            .map((time) => time.trim());
          const [startHours, startMinutes] = start.split(":").map(Number);
          const [endHours, endMinutes] = end.split(":").map(Number);
          const startTimeInMinutes = startHours * 60 + startMinutes;
          const endTimeInMinutes = endHours * 60 + endMinutes;
          const currentTime = today.getHours() * 60 + today.getMinutes();

          if (
            currentTime >= startTimeInMinutes &&
            currentTime <= endTimeInMinutes
          ) {
            lesson.classList.add("live");
          } else {
            lesson.classList.remove("live");
          }
        }
      }
    });
  });
  addBadgeToLiveElement();
  removeBadgeFromNonLiveElements();
}
document.getElementById("Week1Btn").addEventListener("click", function () {
  document.getElementById("Week2Btn").classList.remove("btn-style");
  document.getElementById("Week2").classList.remove("active");
  document.getElementById("Week1").classList.add("active");
  this.classList.add("btn-style");
});

document.getElementById("Week2Btn").addEventListener("click", function () {
  document.getElementById("Week1Btn").classList.remove("btn-style");
  document.getElementById("Week1").classList.remove("active");
  document.getElementById("Week2").classList.add("active");
  this.classList.add("btn-style");
});

if (isFirstWeek) {
  const firstWeek = document.getElementById("Week1Btn");
  firstWeek.classList.add("btn-style");
} else {
  const secondWeek = document.getElementById("Week2Btn");
  secondWeek.classList.add("btn-style");
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// Add event listener to the code element
document.querySelectorAll(".copyCode").forEach((element) => {
  element.addEventListener("click", function () {
    if (this.textContent != "Copied") {
      const text = this.textContent;
      copyToClipboard(text);
      this.textContent = "Copied";
      setTimeout(() => {
        this.textContent = text;
      }, 3000);
    }
  });
});

document.getElementById("Week1").classList.toggle("active", isFirstWeek);
document.getElementById("Week2").classList.toggle("active", !isFirstWeek);
setInterval(assignLiveClassToCurrentLesson, 60000);
assignLiveClassToCurrentLesson();
addStyleToCurrentDay();
