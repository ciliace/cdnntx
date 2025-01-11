
const table = document.querySelector("div[name='Table Sections']");

table.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    console.log(`Circle clicked`);
  }
});



