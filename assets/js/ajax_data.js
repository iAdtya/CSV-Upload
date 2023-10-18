{
  console.log("ajax_data.js");
  document.addEventListener("DOMContentLoaded", () => {
    // Make an Ajax request to fetch data
    fetch("/api/data") // Replace with your data endpoint
      .then((response) => response.json())
      .then((data) => {
        renderLineChart(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  function renderLineChart(data) {
    const labels = data.map((item) => item.Date);
    const marketPriceData = data.map((item) => item.Close);
  
    const ctx = document.getElementById("myChart");
  
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# market price",
            data: marketPriceData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}