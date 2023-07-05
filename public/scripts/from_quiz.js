$(() => {
  const MAX_ANSWERS = 4;

  for (let i = 0; i < 3; i++) {
    addQuestion();
  }

  $('#quiz_form').on('submit', (event) => {
    event.preventDefault();
    submitQuiz($(event.currentTarget));
  });

  $(document).on('click', '.add_answer', (event) => {
    event.preventDefault();
    const $questionForm = $(event.currentTarget).closest('.question_form');
    addAnswer($questionForm);
  });

  $(document).on('click', '.delete_answer', (event) => {
    event.preventDefault();
    const $questionForm = $(event.currentTarget).closest('.question_form');
    deleteLast($questionForm, '.answer');
  });

  $(document).on('click', '.delete_question', (event) => {
    event.preventDefault();
    const $questionForm = $(event.currentTarget).closest('.question_form');
    deleteQuestion($questionForm);
  });

  $(document).on('click', 'input[type="radio"]', function () {
    formatCorrect($(this).closest('.answer'));
  });

  $(document).on('click', 'input[type="text"], textarea', function () {
    removeError($(this));
  });

  function addAnswer($questionForm) {
    const questionId = $questionForm.find('.question').attr('id');
    const $lastAnswer = $questionForm.find('.answer').last();
    const prevAnswerId = $lastAnswer.find('label').attr('for');
    const answerId = prevAnswerId ? Number(prevAnswerId.split('-')[1]) + 1 : 1;

    const answerHTML = `
      <div class="answer">
        <label for="${questionId}-${answerId}">Answer ${answerId}</label>
        <input type="text" name="${questionId}-${answerId}" id="${questionId}-${answerId}">
        <input type="radio" name="${questionId}-a" value="${questionId}-${answerId}">
      </div>`;

    $questionForm.find('.answer_container').append(answerHTML);
  }

  function deleteLast($questionForm, selector) {
    const $last = $questionForm.find(selector).last();
    if ($last.length) {
      deleteElementAnimate($last);
    }
  }

  function deleteElementAnimate($element) {
    $element.hide(400, () => {
      $element.remove();
    });
  }

  function deleteQuestion($questionForm) {
    deleteElementAnimate($questionForm);
  }

  function addQuestion() {
    const questionNum = $('#quiz_form .question').length + 1;

    const questionHTML = `
      <fieldset class="question_form">
        <legend>Question ${questionNum}</legend>
        <div class="question_form_main">
          <textarea class="question" name="${questionNum}" id="${questionNum}" placeholder="Your question here..."></textarea>
          <div class="answer_container">
          </div>
          <div class="question_form_foot">
            <button class="add_answer">Add Answer</button>
            <button class="delete_answer">Delete Answer</button>
            <button class="delete_question">Delete Question</button>
          </div>
        </div>
      </fieldset>`;

    const $newQuestion = $(questionHTML);

    for (let i = 0; i < MAX_ANSWERS; i++) {
      addAnswer($newQuestion);
    }

    $newQuestion.insertBefore('#form_questions').hide().show(400);
  }

  function formatCorrect($questionForm) {
    const $answers = $questionForm.find('.answer');
    $answers.removeClass('correct');

    const $selectedAnswer = $questionForm.find('input[type="radio"]:checked').closest('.answer');
    $selectedAnswer.addClass('correct');
  }

  function submitQuiz($form) {
    const quizObj = createQuizObj($form);
    if (quizObj) {
      // Simulating server request
      setTimeout(() => {
        renderConfirmation(quizObj);
      }, 1000);
    }
  }

  function createQuizObj($form) {
    const quizObj = {};
    const questions = [];

    $form.find('.question_form').each((index, element) => {
      const $questionForm = $(element);
      const questionText = $questionForm.find('.question').val().trim();
      const $correctAnswer = $questionForm.find('.answer.correct');

      if (questionText === '') {
        validationError($questionForm.find('.question'));
        return false;
      }

      const answers = [];
      $questionForm.find('.answer').each((i, answerElement) => {
        const $answer = $(answerElement);
        const answerText = $answer.find('input[type="text"]').val().trim();
        const answerId = $answer.find('label').attr('for');
        const isCorrect = $answer.hasClass('correct');

        if (answerText !== '') {
          answers.push({ id: answerId, text: answerText, correct: isCorrect });
        }
      });

      if (answers.length < 2) {
        validationError($questionForm.find('.answer_container'));
        return false;
      }

      const question = { question: questionText, answers: answers };
      if ($correctAnswer.length) {
        const correctAnswerId = $correctAnswer.find('label').attr('for');
        question.correctAnswer = correctAnswerId;
      }

      questions.push(question);
    });

    if (questions.length === 0) {
      validationError($form.find('.question_form'));
      return false;
    }

    quizObj.title = $form.find('#quiz_title').val().trim();
    quizObj.user = $form.find('#user').val().trim();
    quizObj.private = $form.find('#private_checkbox').prop('checked');
    quizObj.questions = questions;

    return quizObj;
  }

  function validationError($element) {
    $element.addClass('invalid');
    $element.on('input', function () {
      removeError($(this));
    });
  }

  function removeError($element) {
    $element.removeClass('invalid');
  }

  function renderConfirmation(quizObj) {
    const confirmationMessage = `
      <div class="confirmation">
        <h2>Quiz Created!</h2>
        <p>Title: ${quizObj.title}</p>
        <p>User: ${quizObj.user}</p>
        <p>${quizObj.private ? 'Private' : 'Public'}</p>
      </div>`;

    $('#quiz_form').replaceWith(confirmationMessage);
  }
});
