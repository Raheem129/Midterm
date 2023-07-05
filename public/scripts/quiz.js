//Functionality of quiz submission form
$(() => {
  $('.question_card li').on('click', function() {
    selectChildRadioButton($(this));
  });

  $('#quiz_submit').on('click', () => {
    submitQuiz($('.quiz_container'));
  });
});

const selectChildRadioButton = ($element) => {
  const $radioButton = $element.find('input:radio');
  $radioButton.prop('checked', true);
};

const submitQuiz = ($quizContainer) => {
  const answerIds = $quizContainer.find('input:checked').map((index, input) => {
    return Number($(input).attr('data-id'));
  }).get();

  if (answerIds.length < 1) {
    displaySubmitError('You must answer at least one question');
    return;
  }

  const submission = {
    quiz_id: $quizContainer.attr('data-id'),
    answerIds
  };

  $.post('/api/quiz/attempt', submission)
    .then(redirect => {
      window.location.href = redirect;
    });
};

const displaySubmitError = (message) => {
  $('#quiz_submit').text(message).addClass('error');
  setTimeout(() => {
    clearSubmitError();
  }, 3000);
};

const clearSubmitError = () => {
  $('#quiz_submit').text('Submit').removeClass('error');
};  