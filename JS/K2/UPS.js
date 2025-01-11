
const allSections = document.querySelector("div[name='AllSections']");

allSections.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    const allSections = document.querySelector("div[name='AllSections']");
    const clickedCircleNumber = parseInt(event.target.textContent.trim(), 10); 

    // Get all circles and lines in order
    const circles = Array.from(allSections.querySelectorAll('.circle'));
    const lines = Array.from(allSections.querySelectorAll('.line'));
    const sections = Array.from(document.querySelectorAll("div[name^='Section']"))
      .filter((section) => {
        const match = section.getAttribute('name').match(/^Section(\d+)$/);
        return match !== null;
      });

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
      const match = section.getAttribute('name').match(/^Section(\d+)$/);
      const sectionNumber = match ? parseInt(match[1], 10) : null; // Extract the section number
      if (sectionNumber === clickedCircleNumber) {
        section.style.display = 'inline-grid'; // Show the associated section
      } else {
        section.style.display = 'none'; // Hide other sections
      }
    });
    
    $("span[name='Section']").SFCLabel('option', 'text', clickedCircleNumber);
  }
});



