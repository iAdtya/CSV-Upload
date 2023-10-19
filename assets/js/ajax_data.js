{
  // console.log("Hello from ajax_data.js");
  // In your client-side JavaScript file
  const urlParams = new URLSearchParams(window.location.search);
  const fileName = urlParams.get("filename");

  fetch(`/data/${fileName}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (!Array.isArray(data.data)) {
        throw new Error("Data is not an array");
      }

      // const validHeaders = ["DATE", "OPEN", "HIGH", "LOW", "CLOSE", "NEXT DAY"];
      // const headers = Object.keys(data.data[0]);
      // const isValidData = headers.every((header) => validHeaders.includes(header));

      // if (!isValidData) {
      //   throw new Error("Data headers are not valid");
      // }

      const labels = data.data.map((item) => item.Date);
      const marketPriceData = data.data.map((item) => item.Close); // Assuming Close is the market price

      const ctx = document.getElementById("myChart");
      // console.debug(ctx);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "# market price",
              data: marketPriceData,
              borderColor: "rgb(255, 99, 132)",
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
      // console.log(Chart);
    })
    .catch((error) => console.error(error));
}
