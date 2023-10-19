console.log('Im in');

document.getElementById('search').addEventListener('click', () => {

  const input = document.getElementById('input').value.toLowerCase();
  console.log(input);
  const rows = document.querySelectorAll('tr');
  for (let i = 0; i < rows.length; i++) {
    // Get the text content of each row and convert it to lowercase
    const rowText = rows[i].textContent.toLowerCase();
    
    // If the input value is found in the row text, highlight the row
    if (rowText.includes(input)) {
      rows[i].classList.add("highlight");
    } else {
      rows[i].classList.remove("highlight");
    }
  }
})