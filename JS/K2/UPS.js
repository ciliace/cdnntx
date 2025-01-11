const table = document.querySelector("div[name='Table Sections']");

// Handle click and hover
table.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    const step = event.target.getAttribute('data-step');
    console.log(`Circle ${step} clicked`);
    // Add your logic here
  }
});

table.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('circle')) {
    event.target.style.border = '2px solid #007bff'; // Highlight on hover
  }
});

table.addEventListener('mouseout', (event) => {
  if (event.target.classList.contains('circle')) {
    event.target.style.border = 'none'; // Reset on hover out
  }
});
