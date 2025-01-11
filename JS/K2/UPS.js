
const table = document.querySelector("div[name='Table Sections']");

table.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    console.log(`Circle clicked`);
  }
});

table.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('circle')) {
    event.target.style.border = '2px solid #007bff'; 
  }
});

table.addEventListener('mouseout', (event) => {
  if (event.target.classList.contains('circle')) {
    event.target.style.border = 'none'; 
  }
});

