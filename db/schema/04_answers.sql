

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  answer TEXT NOT NULL,
  isCorrect BOOLEAN NOT NULL DEFAULT FALSE
=======
  user_id INTEGER REFERENCES users(id),
  quiz_id INTEGER REFERENCES quizzes(id),
  question_id INTEGER REFERENCES questions(id),
  result_id INTEGER REFERENCES results(id),
  user_answer TEXT NOT NULL,
  test_date DATE DEFAULT NOW()
>>>>>>> origin/quizzapp
);
