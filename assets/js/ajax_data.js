{
  console.log("Hello from ajax_data.js");
  const fileId = document
    .querySelector(".data-link")
    .getAttribute("data-file-id");

  const url = `/data/${fileId}`;

  fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then((dataFromServer) => {
    console.log("Data received from the server:", dataFromServer); // Add this line
    createChart(dataFromServer);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  function createChart(data) {
    console.log("Received data:", data);
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
