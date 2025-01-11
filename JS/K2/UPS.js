
const sections = document.querySelector("div[name='Sections']");

sections.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    const clickedCircleNumber = parseInt(event.target.textContent.trim(), 10); 

    // Get all circles and lines in order
    const circles = Array.from(table.querySelectorAll('.circle'));
    const lines = Array.from(table.querySelectorAll('.line'));
    const sections = Array.from(document.querySelectorAll("div[name^='Section ']")); 

    // Update circles' classes
    circles.forEach((circle) => {
      const circleNumber = parseInt(circle.textContent.trim(), 10); 

      if (circleNumber <= clickedCircleNumber) {
        circle.classList.remove('future');
        circle.classList.add('active'); 
      } else {
        circle.classList.remove('active');
        circle.classList.add('future'); 
      }
    });

    // Update lines' classes
    lines.forEach((line, index) => {
      const prevCircle = circles[index]; 
      const nextCircle = circles[index + 1]; 

      // Ensure both circles exist before applying classes
      if (prevCircle && nextCircle) {
        if (prevCircle.classList.contains('active') && nextCircle.classList.contains('active')) {
          line.classList.remove('future');
          line.classList.add('active'); 
        } else {
          line.classList.remove('active');
          line.classList.add('future'); 
        }
      }
    });

    // Show or hide sections
    sections.forEach((section) => {
      const sectionNumber = parseInt(section.getAttribute('name').split(' ')[1]);
      if (sectionNumber === clickedCircleNumber) {
        section.style.display = 'grid'; 
      } else {
        section.style.display = 'none'; 
      }
    });
    
    $("span[name='Section']").SFCLabel('option', 'text', clickedCircleNumber);
  }
});



