const quizForm = document.getElementById('quizForm');
quizForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData(quizForm); // Collect form data
  const url = '/quizzes'; // The URL to send the POST request to

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      console.log(data); // You can do further processing or display a success message
    })
    .catch((error) => {
      console.error('Error:', error); // Handle any errors that occurred during the fetch request
    });
});
