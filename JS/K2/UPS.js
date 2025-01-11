
const table = document.querySelector("div[name='Table Sections']");

table.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    const clickedCircleNumber = parseInt(event.target.textContent.trim(), 10); // Get the clicked circle number

    // Get all circles in order
    const circles = Array.from(table.querySelectorAll('.circle'));

    // Loop through each circle and update classes
    circles.forEach((circle) => {
      const circleNumber = parseInt(circle.textContent.trim(), 10); // Get the circle number

      if (circleNumber <= clickedCircleNumber) {
        circle.classList.remove('future');
        circle.classList.add('active'); // Keep or make active up to clicked number
      } else {
        circle.classList.remove('active');
        circle.classList.add('future'); // Deactivate beyond the clicked number
      }
    });

    console.log(`Circle ${event.target.textContent.trim()} clicked and activated`);
  }
});



