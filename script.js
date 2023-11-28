$(document).ready(function () {
  $('#getJokeBtn').click(function () {
    const programmingCheckbox = $('#programmingCheckbox');
    const christmasCheckbox = $('#christmasCheckbox');

    // Build the categories based on selected checkboxes
    const selectedCategories = [];
    if (programmingCheckbox.prop('checked')) {
      selectedCategories.push('Programming');
    }
    if (christmasCheckbox.prop('checked')) {
      selectedCategories.push('Christmas');
    }

    // Check if at least one category is selected
    if (selectedCategories.length > 0) {
      const apiUrl = https://v2.jokeapi.dev/joke/${selectedCategories.join()}?blacklistFlags=nsfw,racist,sexist&type=twopart;

      $.getJSON(apiUrl)
        .done(function (data) {
          if (data.error) {
            $('#jokeSetup').text('Failed to fetch joke. Please try again.');
            $('#jokeDelivery').text('');
          } else {
            $('#jokeSetup').text(data.setup);
            $('#jokeDelivery').text(data.delivery);
          }
        })
        .fail(function () {
          $('#jokeSetup').text('An error occurred while fetching the joke.');
          $('#jokeDelivery').text('');
          console.error('Error fetching joke.');
        });
    } else {
      $('#jokeSetup').text('Please select at least one category.');
      $('#jokeDelivery').text('');
    }
  });
});
