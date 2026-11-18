-- 1. Курсы длиннее 30 часов: по убыванию часов, топ-3
SELECT id, title, hours
FROM courses
WHERE hours > 30
ORDER BY hours DESC
LIMIT 3;

-- 2. Курсы вместе с преподавателями (INNER JOIN)
SELECT c.title, t.full_name AS teacher
FROM courses c
INNER JOIN teachers t ON t.id = c.teacher_id;

-- 3. Курсы, на которые никто не записан (LEFT JOIN)
SELECT c.id, c.title
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE e.course_id IS NULL;

-- 4. Студент, курс, оценка (JOIN трёх таблиц)
SELECT s.full_name AS student, c.title AS course, e.grade
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
ORDER BY s.full_name;

-- 5. Средняя оценка по курсам, только курсы со средней выше 70 (GROUP BY + HAVING)
SELECT c.title, ROUND(AVG(e.grade), 1) AS avg_grade
FROM courses c
JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
HAVING AVG(e.grade) > 70;

-- 6. Студенты с оценкой выше средней по всем записям (подзапрос)
SELECT DISTINCT s.full_name, e.grade
FROM enrollments e
JOIN students s ON s.id = e.student_id
WHERE e.grade > (SELECT AVG(grade) FROM enrollments);

-- 7. UPDATE с условием: поставить оценку, где её ещё нет
UPDATE enrollments
SET grade = 80
WHERE student_id = 3 AND course_id = 5 AND grade IS NULL;

-- 8. DELETE с условием: удалить запись о записи на курс
DELETE FROM enrollments
WHERE student_id = 4 AND course_id = 1;

-- 9. Транзакция: записать студента на курс и сразу поставить оценку
BEGIN;
INSERT INTO enrollments (student_id, course_id, grade)
VALUES (5, 2, 88);
COMMIT;
-- Если что-то пошло не так, вместо COMMIT выполняют ROLLBACK;