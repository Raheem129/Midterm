<<<<<<< HEAD


INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, '<h1>', TRUE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, '<head>', FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, '<header>', FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, '<main>', FALSE);


INSERT INTO answers (question_id, answer, isCorrect) VALUES (2, '<a>', TRUE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (2, '<link>', FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (2, '<href>', FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (2, '<hyperlink>', FALSE);


INSERT INTO answers (question_id, answer, isCorrect) VALUES (3, '<ul>', TRUE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (3, ' <ol>', FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (3, '<li>', FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (3, '<list>',FALSE);


INSERT INTO answers (question_id, answer, isCorrect) VALUES (4, 'src',TRUE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (4, 'alt',FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (4, 'href',FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (4, 'img',FALSE);


INSERT INTO answers (question_id, answer, isCorrect) VALUES (5, '<tr>',TRUE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (5, '<td>',FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (5, '<table>',FALSE);
INSERT INTO answers (question_id, answer, isCorrect) VALUES (5, '<th>',FALSE);
=======
-- Users table seeds here (Example)
INSERT INTO answers (user_id,quiz_id,question_id,result_id,user_answer) VALUES (1,1,1,1,'HTML is the standard markup language for Web pages.');
INSERT INTO answers (user_id,quiz_id,question_id,result_id,user_answer) VALUES (1,1,2,1,'Apple');
INSERT INTO answers (user_id,quiz_id,question_id,result_id,user_answer) VALUES (2,1,1,2,'HTML is the standard markup language for Web pages.');
INSERT INTO answers (user_id,quiz_id,question_id,result_id,user_answer) VALUES (2,1,2,2,'Apple');
INSERT INTO answers (user_id,quiz_id,question_id,result_id,user_answer) VALUES (2,2,2,3,'A');
>>>>>>> origin/quizzapp
