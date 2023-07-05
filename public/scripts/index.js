$(() => {
  // Refresh quizzes on page load
  refreshIndexQuizzes();

  // Refresh quizzes when the logo is clicked
  $('.logo').on('click', (event) => {
    event.preventDefault();
    refreshIndexQuizzes();
  });

  // Refresh quizzes when the filter dropdown value changes
  $('form select').on('change', function() {
    const request = $(this).find(":selected").val();
    refreshIndexQuizzes(request);
  });
});

/**
 * Refreshes the quizzes on the index page.
 * @param {string} request - The request from the filter dropdown (if present).
 * @return {none}
 */
const refreshIndexQuizzes = (request) => {
  $.ajax({
    url: '/api',
    type: "get",
    data: { request }
  })
    .then(data => {
      return data;
    }).then(quizzes => renderQuizContainer(quizzes, $('.quiz_container')))
    .catch(error => console.log(error));
};

/**
 * Renders the quiz cards into the $quizContainer element.
 * @param {sqlArray} quizzes - Array of quizzes to be rendered.
 * @param {jQueryElement} $quizContainer - Element that the quizzes are to be rendered into.
 * @return {none}
 */
const renderQuizContainer = (quizzes, $quizContainer) => {
  $quizContainer.empty();
  quizzes.forEach(quiz => {
    if (quiz) {
      const $quiz = createQuizCard(quiz);
      $quizContainer.prepend($quiz);
    }
  });
  $('time.timeago').timeago();
};

/**
 * Creates a quiz card for a single quiz.
 * @param {Object} quiz - Quiz object to be made into a card.
 * @return {$quiz} - jQuery object representing the quiz card.
 */
const createQuizCard = quiz => {
  const isoDate = new Date(quiz.created_at).toISOString();

  const $quiz = $(`
    <article class="quiz_card">
      <a href="/quizapp/quiz/${quiz.url}">
        <header>
          <h2></h2>
          <p class="author"></p>
        </header>
        <p class="quiz_description"></p>
        <footer>
          <p><span>${quiz.question_count}</span> Questions</p>
          <div class="footer_right">
            <p><span>${quiz.attempts_count} Global Attempts</span></p>
            <p>Created <time class="timeago" datetime="${isoDate}"></time></p>
          </div>
        </footer>
      </a>
    </article>
  `);

  $quiz.find('.quiz_description').text(quiz.description);
  $quiz.find('h2').text(quiz.title);
  $quiz.find('.author').text(quiz.author);

  return $quiz;
};
