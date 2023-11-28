const getJokeBtn = document.getElementById('getJokeBtn');
const jokeSetup = document.getElementById('jokeSetup');
const jokeDelivery = document.getElementById('jokeDelivery');

getJokeBtn.addEventListener('click', () => {
  const programmingCheckbox = document.getElementById('programmingCheckbox');
  const christmasCheckbox = document.getElementById('christmasCheckbox');

  // Katsotaan valitut kategoriat
  const selectedCategories = [];
  if (programmingCheckbox.checked) {
    selectedCategories.push('Programming');
  }
  if (christmasCheckbox.checked) {
    selectedCategories.push('Christmas');
  }

  // kategorian checkaus
  if (selectedCategories.length > 0) {
    const apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategories.join()}?blacklistFlags=nsfw,racist,sexist&type=twopart`;

    //Api kutsu
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          jokeSetup.textContent = `Failed to fetch joke. Please try again.`;
          jokeDelivery.textContent = '';
        } else {
          jokeSetup.textContent = data.setup;
          jokeDelivery.textContent = data.delivery;
        }
      })
      .catch(error => {
        jokeSetup.textContent = 'An error occurred while fetching the joke.';
        jokeDelivery.textContent = '';
        console.error('Error fetching joke:', error);
      });
  } else {
    jokeSetup.textContent = 'Please select at least one category.';
    jokeDelivery.textContent = '';
  }
});