-- 02_quizzes.sql

-- Drop the existing "quizzes" table if it exists
DROP TABLE IF EXISTS quizzes CASCADE;

-- Create the "quizzes" table with the updated schema
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  quiz_type BOOLEAN DEFAULT false,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category TEXT,
  modified_date DATE DEFAULT NOW(),
  title TEXT,
  questions JSONB -- Add the "questions" column of type JSONB
);
