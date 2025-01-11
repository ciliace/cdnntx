
const table = document.querySelector("div[name='Table Sections']");

table.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    // Deactivate all circles
    const circles = table.querySelectorAll('.circle');
    circles.forEach((circle) => {
      circle.classList.remove('active');
      circle.classList.add('future');
    });

    // Activate the clicked circle
    event.target.classList.remove('future');
    event.target.classList.add('active');

    console.log(`Circle ${event.target.textContent.trim()} clicked and activated`);
  }
});



