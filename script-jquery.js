$(document).ready(function () {
  $('#getJokeBtn').click(function () {
    const programmingCheckbox = $('#programmingCheckbox');
    const christmasCheckbox = $('#christmasCheckbox');

    // rakentaa kategoriat riippuen valituista kategorioista
    const selectedCategories = [];
    if (programmingCheckbox.prop('checked')) {
      selectedCategories.push('Programming');
    }
    if (christmasCheckbox.prop('checked')) {
      selectedCategories.push('Christmas');
    }

    // tarkistaa onko ainakin 1 kategoria valittu
    if (selectedCategories.length > 0) {
      const apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategories.join()}?blacklistFlags=nsfw,racist,sexist&type=twopart`;

      // Lisää fadeIn- ja fadeOut-tehosteet
      $('#jokeSetup, #jokeDelivery').fadeOut(400, function () {
        $.getJSON(apiUrl)
          .done(function (data) {
            if (data.error) {
              $('#jokeSetup').text('Failed to fetch joke. Please try again.').fadeIn(400);
              $('#jokeDelivery').text('').fadeIn(400);
            } else {
              $('#jokeSetup').text(data.setup).fadeIn(400);
              $('#jokeDelivery').text(data.delivery).fadeIn(400);
            }
          })
          .fail(function () {
            $('#jokeSetup').text('An error occurred while fetching the joke.').fadeIn(400);
            $('#jokeDelivery').text('').fadeIn(400);
            console.error('Error fetching joke.');
          });
      });

    } else {
      $('#jokeSetup, #jokeDelivery').fadeOut(400, function () {
        $('#jokeSetup').text('Please select at least one category.').fadeIn(400);
        $('#jokeDelivery').text('').fadeIn(400);
      });
    }
  });
});