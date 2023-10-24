
document.addEventListener("DOMContentLoaded", function() {
    fetch("/data")
      .then(response => response.text())
      .then(data => {
        document.getElementById("data").innerHTML = data;
      });
  });
  