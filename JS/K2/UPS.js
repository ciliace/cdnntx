
const navSections = document.querySelector("div[name='NavSections']");

navSections.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    const navSections = document.querySelector("div[name='NavSections']");
    const clickedCircleNumber = parseInt(event.target.textContent.trim(), 10); 

    // Get all circles and lines in order
    const circles = Array.from(navSections.querySelectorAll('.circle'));
    const lines = Array.from(navSections.querySelectorAll('.line'));
    const sections = Array.from(document.querySelectorAll("div[name^='NavSection']"))
      .filter((section) => {
        const match = section.getAttribute('name').match(/^NavSection(\d+)$/);
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
    //sections.forEach((section) => {
    //  const match = section.getAttribute('name').match(/^NavSection(\d+)$/);
    //  const sectionNumber = match ? parseInt(match[1], 10) : null; // Extract the section number
    //  if (sectionNumber === clickedCircleNumber) {
    //    section.style.display = 'inline-grid'; // Show the associated section
    //  } else {
    //    section.style.display = 'none'; // Hide other sections
    //  }
    //});
    
    $("span[name='Section']").SFCLabel('option', 'text', clickedCircleNumber);
  }
});

// Adding Previous and Next button functionality
const previousButton = document.querySelector("a[name='Previous']");
const nextButton = document.querySelector("a[name='Next']");

previousButton.addEventListener('click', () => {
  const circles = Array.from(navSections.querySelectorAll('.circle'));
  const activeCircle = circles.reverse().find(circle => circle.classList.contains('active'));
  const activeIndex = circles.indexOf(activeCircle);

  if (activeIndex > 0) {
    const previousCircle = circles[activeIndex];
    const higherCircles = circles.slice(activeIndex);

    // Make current and higher circles "future"
    higherCircles.forEach((circle) => {
      circle.classList.remove('active');
      circle.classList.add('future');
    });

    previousCircle.classList.remove('active');
    previousCircle.classList.add('future');

    // Trigger the click event on the new active circle
    circles[activeIndex - 1].click();
  }
});

nextButton.addEventListener('click', () => {
  const circles = Array.from(navSections.querySelectorAll('.circle'));
  const activeCircle = circles.reverse().find(circle => circle.classList.contains('active'));
  const activeIndex = circles.indexOf(activeCircle);

  if (activeIndex < circles.length - 1) {
    const nextCircle = circles[activeIndex + 1];
    const allPreviousCircles = circles.slice(0, activeIndex + 1);

    // Make next circle and all previous circles "active"
    allPreviousCircles.forEach((circle) => {
      circle.classList.remove('future');
      circle.classList.add('active');
    });

    nextCircle.classList.remove('future');
    nextCircle.classList.add('active');

    // Trigger the click event on the new active circle
    nextCircle.click();
  }
});
