{
  console.log("Hello from ajax_data.js");
  // In your client-side JavaScript file
  fetch("/data/uploaded_file-1697497804392-369340767.csv")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (!Array.isArray(data.data)) {
        throw new Error('Data is not an array');
      }

      const labels = data.data.map((item) => item.Date); // Assuming Date is the label
      const marketPriceData = data.data.map((item) => item.Close); // Assuming Close is the market price

      const ctx = document.getElementById("myChart");
      console.debug(ctx);

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Date", "Open", "High", "Low", "Close", "Next Day'"],
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
      console.log(Chart);
    })
    .catch((error) => console.error(error));
}
