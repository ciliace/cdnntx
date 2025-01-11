
const table = document.querySelector("div[name='Table Sections']");

table.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    const clickedCircleNumber = parseInt(event.target.textContent.trim(), 10); // Get the clicked circle number

    // Get all circles and lines in order
    const circles = Array.from(table.querySelectorAll('.circle'));
    const lines = Array.from(table.querySelectorAll('.line'));

    // Update circles' classes
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

    // Update lines' classes
    lines.forEach((line, index) => {
      const prevCircle = circles[index]; // Circle before the line
      const nextCircle = circles[index + 1]; // Circle after the line

      // If both connected circles are active, make the line active
      if (prevCircle.classList.contains('active') && nextCircle.classList.contains('active')) {
        line.classList.remove('future');
        line.classList.add('active'); // Set line as active
      } else {
        line.classList.remove('active');
        line.classList.add('future'); // Set line as future
      }
    });

    console.log(`Circle ${event.target.textContent.trim()} clicked and activated`);
  }
});



