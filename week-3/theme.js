document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const theme = document.getElementById("theme");
  const footer = document.querySelector("footer");

  // Check for saved user preference, if any, on load of the website
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    theme.className = currentTheme;
    footer.className = currentTheme.includes("bg-white")
      ? "bg-gray-200 text-gray-900 text-center py-4"
      : "bg-gray-800 text-white text-center py-4";
  }

  themeToggleBtn.addEventListener("click", () => {
    // Toggle between light and dark mode
    if (theme.classList.contains("bg-gray-900")) {
      theme.classList.remove("bg-gray-900", "text-white");
      theme.classList.add("bg-white", "text-gray-900");
      footer.classList.remove("bg-gray-800", "text-white");
      footer.classList.add("bg-gray-200", "text-gray-900");
      localStorage.setItem("theme", "bg-white text-gray-900");
    } else {
      theme.classList.remove("bg-white", "text-gray-900");
      theme.classList.add("bg-gray-900", "text-white");
      footer.classList.remove("bg-gray-200", "text-gray-900");
      footer.classList.add("bg-gray-800", "text-white");
      localStorage.setItem("theme", "bg-gray-900 text-white");
    }
  });
});
