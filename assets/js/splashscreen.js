document.addEventListener("DOMContentLoaded", function () {
  const splash = document.getElementById("splash");
  const navbar = document.getElementById("navbar");
  const content = document.getElementById("content");

  setTimeout(function () {
    splash.style.display = "none"; 
    navbar.style.display = "block"; 
    content.style.display = "block"; 
  }, 1500); 
});
