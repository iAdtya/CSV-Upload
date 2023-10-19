const recordsPerPage = 100;
let currentPage = 1;

function renderTable(data) {
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';
  for (let row of pageData) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${row.Date}</td>
      <td class="px-6 py-4 whitespace-nowrap">${row.Open}</td>
      <td class="px-6 py-4 whitespace-nowrap">${row.High}</td>
      <td class="px-6 py-4 whitespace-nowrap">${row.Low}</td>
      <td class="px-6 py-4 whitespace-nowrap">${row.Close}</td>
    `;
    tableBody.appendChild(tr);
  }

  const totalPages = Math.ceil(data.length / recordsPerPage);
  const pagination = document.querySelector('#pagination');
  pagination.innerHTML = `
    <button ${currentPage === 1 ? 'disabled' : ''} onclick="prevPage()">Prev</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button ${currentPage === totalPages ? 'disabled' : ''} onclick="nextPage()">Next</button>
  `;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable(data);
  }
}

function nextPage() {
  const totalPages = Math.ceil(data.length / recordsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable(data);
  }
}

// Call renderTable with the initial data
renderTable(data);